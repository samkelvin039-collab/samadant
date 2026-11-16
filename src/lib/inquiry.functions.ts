import { createServerFn } from "@tanstack/react-start";

import { inquirySchema } from "@/lib/inquiry-schema";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { getRequest } = await import("@tanstack/react-start/server");
    const { checkRateLimit, getClientKey } = await import("@/lib/rate-limit.server");

    const clientKey = await getClientKey(getRequest().headers);
    const allowed = await checkRateLimit("inquiry", clientKey, 5, 3600);
    if (!allowed) {
      return {
        ok: false as const,
        error:
          "You've sent several inquiries recently. Please wait a little while, or email samad@fourthgroup.co directly.",
      };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("inquiries").insert({
      full_name: data.fullName,
      email: data.email,
      book_title: data.bookTitle,
      book_link: data.bookLink || null,
      service: data.service,
      message: data.message,
    });
    if (error) {
      console.error("inquiry insert failed", error.message);
      return {
        ok: false as const,
        error:
          "We couldn't send your inquiry just now. Please try again, or email samad@fourthgroup.co.",
      };
    }
    return { ok: true as const };
  });
