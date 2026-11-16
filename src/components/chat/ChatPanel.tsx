import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { AlertCircle, Mail, RotateCcw, X } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Suggestion } from "@/components/ai-elements/suggestion";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/site/Logo";
import {
  ASSISTANT_DISCLOSURE,
  ASSISTANT_NAME,
  ASSISTANT_WELCOME,
  CONTACT_EMAIL,
  SUGGESTED_QUESTIONS,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

const MAX_CHARS = 1500;

/** Turns transport errors (often a JSON body) into a short, visitor-friendly sentence. */
function readableError(error: Error | undefined) {
  if (!error) return "";
  const raw = error.message ?? "";
  try {
    const parsed = JSON.parse(raw) as { error?: string };
    if (parsed?.error) return parsed.error;
  } catch {
    /* not JSON */
  }
  if (/failed to fetch|network/i.test(raw))
    return "You appear to be offline. Check your connection and try again.";
  return raw && raw.length < 220 ? raw : "Sorry, something went wrong. Please try again.";
}

function textOf(message: UIMessage) {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [session, setSession] = useState(0);

  return (
    <div
      id="storyreach-chat"
      role="dialog"
      aria-modal="false"
      aria-label={ASSISTANT_NAME}
      className={cn(
        "fixed z-50 flex flex-col overflow-hidden border border-border bg-background shadow-float transition-all duration-300 ease-out",
        "inset-2 rounded-2xl sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(680px,calc(100dvh-8rem))] sm:w-[400px]",
        open
          ? "visible translate-y-0 scale-100 opacity-100"
          : "pointer-events-none invisible translate-y-4 scale-[0.97] opacity-0",
      )}
      style={{ transformOrigin: "bottom right" }}
    >
      <ChatSession
        key={session}
        open={open}
        onClose={onClose}
        onReset={() => setSession((s) => s + 1)}
      />
    </div>
  );
}

function ChatSession({
  open,
  onClose,
  onReset,
}: {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState("");
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error, stop, regenerate, clearError } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";
  const hasUserMessages = messages.some((m) => m.role === "user");
  const last = messages[messages.length - 1];
  const waiting =
    status === "submitted" ||
    (status === "streaming" && (!last || last.role !== "assistant" || !textOf(last)));

  useEffect(() => {
    if (open && !busy) {
      const t = setTimeout(() => textareaRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open, busy]);

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    if (error) clearError();
    void sendMessage({ text: trimmed.slice(0, MAX_CHARS) });
    setDraft("");
  };

  const handleSubmit = (message: PromptInputMessage) => ask(message.text ?? "");

  const newConversation = () => {
    if (busy) void stop();
    onReset();
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 bg-primary px-4 py-3.5 text-primary-foreground">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-gold-soft ring-1 ring-gold-soft/30">
          <LogoMark className="size-8" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base leading-tight">{ASSISTANT_NAME}</p>
          <p className="flex items-center gap-1.5 text-xs text-primary-foreground/65">
            <span className="size-1.5 rounded-full bg-gold-soft" aria-hidden="true" />
            Answers about StoryReach services
          </p>
        </div>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={newConversation}
          aria-label="Start a new conversation"
          title="New conversation"
          className="text-primary-foreground/80 hover:bg-primary-soft hover:text-primary-foreground"
        >
          <RotateCcw />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={onClose}
          aria-label="Close chat"
          className="text-primary-foreground/80 hover:bg-primary-soft hover:text-primary-foreground"
        >
          <X />
        </Button>
      </div>
      <div className="h-0.5 bg-accent" aria-hidden="true" />

      {/* Conversation */}
      <Conversation className="min-h-0 flex-1 paper-grain">
        <ConversationContent className="gap-5 px-4 py-5">
          <Message from="assistant">
            <MessageContent className="leading-relaxed">
              <p>{ASSISTANT_WELCOME}</p>
            </MessageContent>
          </Message>

          {!hasUserMessages && (
            <div className="flex flex-col items-start gap-2" aria-label="Suggested questions">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Popular questions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <Suggestion
                    key={q}
                    suggestion={q}
                    onClick={ask}
                    disabled={busy}
                    className="h-auto rounded-full border-accent/40 bg-card px-3.5 py-2 text-left text-xs whitespace-normal text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
                  />
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const text = textOf(m);
            if (!text) return null;
            return (
              <Message key={m.id} from={m.role}>
                <MessageContent
                  className={cn(
                    "leading-relaxed",
                    "group-[.is-user]:rounded-2xl group-[.is-user]:rounded-br-sm group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground",
                  )}
                >
                  {m.role === "assistant" ? (
                    <MessageResponse className="text-sm [&_a]:text-accent [&_a]:underline [&_li]:my-0.5 [&_p]:my-2 [&_strong]:text-foreground [&_ul]:my-2">
                      {text}
                    </MessageResponse>
                  ) : (
                    <p className="whitespace-pre-wrap">{text}</p>
                  )}
                </MessageContent>
              </Message>
            );
          })}

          {waiting && (
            <Message from="assistant" aria-live="polite">
              <MessageContent>
                <Shimmer className="text-sm">Thinking…</Shimmer>
              </MessageContent>
            </Message>
          )}

          {error && !busy && (
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-lg border border-destructive/25 bg-destructive/5 p-3.5 text-sm text-destructive"
            >
              <p className="flex gap-2">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {readableError(error)}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => void regenerate()}
                >
                  Try again
                </Button>
                <Button asChild size="sm" variant="ghost" className="rounded-full text-foreground">
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <Mail /> Email us
                  </a>
                </Button>
              </div>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton className="bg-card" />
      </Conversation>

      {/* Composer */}
      <div className="border-t bg-card px-3 pt-3 pb-2">
        <PromptInput
          onSubmit={handleSubmit}
          className="rounded-xl border-input bg-background shadow-none"
        >
          <PromptInputTextarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about services, pricing, getting started…"
            maxLength={MAX_CHARS}
            aria-label="Type your question"
            className="max-h-32 min-h-11 text-base sm:text-sm"
          />
          <PromptInputFooter className="justify-between px-3 pb-2">
            <span
              className={cn(
                "text-[0.65rem] text-muted-foreground",
                draft.length > MAX_CHARS * 0.9 && "text-destructive",
              )}
            >
              {draft.length > 0
                ? `${draft.length}/${MAX_CHARS}`
                : "Enter to send · Shift+Enter for a new line"}
            </span>
            <PromptInputSubmit
              status={status}
              onStop={() => void stop()}
              disabled={!busy && !draft.trim()}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary-soft"
            />
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 px-1 text-[0.65rem] leading-snug text-muted-foreground">
          {ASSISTANT_DISCLOSURE}
        </p>
      </div>
    </>
  );
}
