import { describe, expect, it } from "vitest";

import { CHAT_LIMITS, sanitizeMessages } from "@/lib/chat.server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { SERVICES, SERVICE_OPTIONS } from "@/lib/site-content";

const valid = {
  fullName: "Jane Author",
  email: "jane@example.com",
  bookTitle: "The Quiet Shore",
  bookLink: "",
  service: "TikTok Book Features",
  message: "I'd love a TikTok feature for my debut novel.",
};

const userMsg = (id: string, text: string) => ({
  id,
  role: "user" as const,
  parts: [{ type: "text", text }],
});
const botMsg = (id: string, text: string) => ({
  id,
  role: "assistant" as const,
  parts: [{ type: "text", text }],
});

describe("StoryReach services", () => {
  it("offers exactly the nine agreed services", () => {
    expect(SERVICES).toHaveLength(9);
  });
});

describe("Inquiry form rules", () => {
  it("accepts a complete inquiry without a book link", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("requires full name, email, book title, service and message", () => {
    for (const key of ["fullName", "email", "bookTitle", "service", "message"] as const) {
      expect(inquirySchema.safeParse({ ...valid, [key]: "" }).success).toBe(false);
    }
  });

  it("rejects a malformed email address", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "jane-at-example" }).success).toBe(false);
  });

  it("only accepts services from the published list", () => {
    expect(SERVICE_OPTIONS).toContain("I'm not sure yet");
    expect(
      inquirySchema.safeParse({ ...valid, service: "Guaranteed bestseller package" }).success,
    ).toBe(false);
  });

  it("rejects submissions that fill the hidden spam-trap field", () => {
    expect(inquirySchema.safeParse({ ...valid, website: "http://spam.example" }).success).toBe(
      false,
    );
  });
});

describe("AI chat request limits", () => {
  it("limits visitor messages to 1500 characters", () => {
    expect(CHAT_LIMITS.maxUserChars).toBe(1500);
    expect("error" in sanitizeMessages([userMsg("a", "x".repeat(1500))])).toBe(false);
    expect("error" in sanitizeMessages([userMsg("a", "x".repeat(1501))])).toBe(true);
  });

  it("keeps only the most recent 16 messages of history", () => {
    const history = Array.from({ length: 30 }, (_, i) =>
      i % 2 === 0 ? userMsg(`u${i}`, `q${i}`) : botMsg(`b${i}`, `a${i}`),
    );
    history.push(userMsg("last", "latest question"));
    const result = sanitizeMessages(history);
    if ("error" in result) throw new Error("unexpected error");
    expect(result.messages.length).toBeLessThanOrEqual(16);
    expect(result.messages.at(-1)?.parts[0]).toEqual({ type: "text", text: "latest question" });
  });

  it("requires the conversation to end with a visitor question", () => {
    expect("error" in sanitizeMessages([userMsg("a", "hi"), botMsg("b", "hello")])).toBe(true);
  });

  it("drops non-text parts such as reasoning before sending to the model", () => {
    const result = sanitizeMessages([
      {
        id: "u",
        role: "user",
        parts: [
          { type: "text", text: "Hello" },
          { type: "reasoning", text: "secret" },
        ],
      },
    ]);
    if ("error" in result) throw new Error("unexpected error");
    expect(result.messages[0]?.parts).toEqual([{ type: "text", text: "Hello" }]);
  });
});
