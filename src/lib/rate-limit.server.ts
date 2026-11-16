// Server-only: per-visitor rate limiting backed by the database (workers are stateless).

async function sha256(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** A hashed, non-reversible key for the caller so raw IP addresses are never stored. */
export async function getClientKey(headers: Headers) {
  const ip =
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const ua = (headers.get("user-agent") ?? "").slice(0, 200);
  return sha256(`${ip}|${ua}`);
}

/**
 * Returns true when the caller is within the limit. Fails open (returns true) if the
 * rate-limit store is unreachable, so a database hiccup never blocks real visitors.
 */
export async function checkRateLimit(
  bucket: string,
  clientKey: string,
  max: number,
  windowSeconds: number,
) {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.rpc("check_rate_limit", {
      _bucket: bucket,
      _client_key: clientKey,
      _max: max,
      _window_seconds: windowSeconds,
    });
    if (error) {
      console.error("rate limit check failed", error.message);
      return true;
    }
    return data === true;
  } catch (err) {
    console.error("rate limit check threw", err);
    return true;
  }
}
