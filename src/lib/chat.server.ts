// Server-only: validates visitor chat requests and streams answers from Lovable AI.
import { createOpenAI } from "@ai-sdk/openai";
import { APICallError, convertToModelMessages, streamText, type UIMessage } from "ai";
import { z } from "zod";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai-gateway/run-id.server";
import { buildStoryReachInstructions } from "@/lib/chat-prompt.server";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit.server";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

export const CHAT_LIMITS = {
  maxUserChars: 1500,
  maxAssistantChars: 4000,
  maxHistory: 16,
  maxRequestBytes: 64_000,
  ratePerWindow: 20,
  windowSeconds: 600,
};

const partSchema = z
  .object({ type: z.string().max(40), text: z.string().optional() })
  .passthrough();
const messageSchema = z.object({
  id: z.string().max(200),
  role: z.enum(["user", "assistant"]),
  parts: z.array(partSchema).max(40),
});
const bodySchema = z.object({ messages: z.array(messageSchema).min(1).max(100) }).passthrough();

function jsonError(status: number, error: string) {
  return Response.json({ error }, { status });
}

/** Keeps only plain text parts, enforces length limits and trims history. Exported for tests. */
export function sanitizeMessages(raw: z.infer<typeof messageSchema>[]) {
  const cleaned: UIMessage[] = [];
  for (const m of raw) {
    const text = m.parts
      .filter((p) => p.type === "text" && typeof p.text === "string")
      .map((p) => p.text as string)
      .join("")
      .trim();
    if (!text) continue;
    if (m.role === "user" && text.length > CHAT_LIMITS.maxUserChars) {
      return { error: `Messages are limited to ${CHAT_LIMITS.maxUserChars} characters.` } as const;
    }
    cleaned.push({
      id: m.id,
      role: m.role,
      parts: [{ type: "text", text: text.slice(0, CHAT_LIMITS.maxAssistantChars) }],
    });
  }
  const recent = cleaned.slice(-CHAT_LIMITS.maxHistory);
  // History must open with a visitor turn and end with the new question.
  while (recent.length && recent[0]?.role !== "user") recent.shift();
  if (!recent.length || recent[recent.length - 1]?.role !== "user") {
    return { error: "Please send a question." } as const;
  }
  return { messages: recent } as const;
}

function friendlyError(error: unknown) {
  const status = APICallError.isInstance(error) ? error.statusCode : undefined;
  if (status === 429)
    return "The assistant is getting a lot of questions right now. Please try again in a minute.";
  if (status === 402 || status === 403)
    return `The assistant is temporarily unavailable. You can still reach the team at storyreach.us@gmail.com.`;
  if (error instanceof Error && error.name === "AbortError") return "Request cancelled.";
  return "Sorry, something went wrong while answering. Please try again, or email storyreach.us@gmail.com.";
}

export async function handleChat(request: Request) {
  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > CHAT_LIMITS.maxRequestBytes)
    return jsonError(413, "This conversation is too long. Please start a new one.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "Invalid request.");
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) return jsonError(400, "Invalid request.");

  const sanitized = sanitizeMessages(parsed.data.messages);
  if ("error" in sanitized) return jsonError(400, sanitized.error ?? "Invalid request.");

  const clientKey = await getClientKey(request.headers);
  const allowed = await checkRateLimit(
    "chat",
    clientKey,
    CHAT_LIMITS.ratePerWindow,
    CHAT_LIMITS.windowSeconds,
  );
  if (!allowed) {
    return jsonError(
      429,
      "You've sent a lot of messages in a short time. Please wait a few minutes and try again.",
    );
  }

  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error("LOVABLE_API_KEY is not configured");
    return jsonError(
      500,
      "The assistant isn't configured yet. Please email storyreach.us@gmail.com.",
    );
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: buildStoryReachInstructions(),
    messages: await convertToModelMessages(sanitized.messages),
    abortSignal: request.signal,
    maxRetries: 1,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
    onError: ({ error }) => {
      console.error("chat stream error", error);
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: sanitized.messages,
      sendReasoning: false,
      onError: friendlyError,
    }),
    runIdFetch,
  );
}
