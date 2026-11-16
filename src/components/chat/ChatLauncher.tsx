import { lazy, Suspense, useEffect, useState } from "react";
import { MessageCircleMore, X } from "lucide-react";

import { cn } from "@/lib/utils";

// The chat window (and its markdown renderer) loads only when a visitor first opens it.
const ChatPanel = lazy(() => import("@/components/chat/ChatPanel"));

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {mounted && (
        <Suspense fallback={null}>
          <ChatPanel open={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="storyreach-chat"
        aria-label={open ? "Close the StoryReach AI assistant" : "Ask the StoryReach AI assistant"}
        className={cn(
          "group fixed right-4 bottom-4 z-50 flex items-center gap-2.5 rounded-full border border-gold-soft/40 bg-primary py-3 pr-5 pl-3.5 text-primary-foreground shadow-float transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:right-6 sm:bottom-6",
          open && "max-sm:hidden",
        )}
      >
        <span className="relative grid size-8 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-300 group-hover:rotate-12">
          {open ? (
            <X className="size-4" aria-hidden="true" />
          ) : (
            <MessageCircleMore className="size-4" aria-hidden="true" />
          )}
          {!open && (
            <span
              className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-primary bg-gold-soft"
              aria-hidden="true"
            />
          )}
        </span>
        <span className="text-sm font-semibold tracking-wide">{open ? "Close" : "Ask AI"}</span>
      </button>
    </>
  );
}
