import { cn } from "@/lib/utils";

/** StoryReach quill-in-circle brand mark. Uses currentColor so it adapts to any surface. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={cn("size-10", className)}>
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.2" />
      <path
        d="M33.5 13.5c-6.8.6-12.6 5.2-15 11.6l-1.9 5.1 5.1-1.9c6.4-2.4 11-8.2 11.6-15l.2-1-1 .2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16.5 31.5l9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 35.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="size-10 text-accent" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-2xl font-semibold tracking-tight",
            inverted ? "text-primary-foreground" : "text-foreground",
          )}
        >
          StoryReach
        </span>
        <span
          className={cn(
            "mt-1 text-[0.58rem] font-medium uppercase tracking-[0.2em]",
            inverted ? "text-primary-foreground/60" : "text-muted-foreground",
          )}
        >
          Book marketing &amp; author visibility
        </span>
      </span>
    </span>
  );
}
