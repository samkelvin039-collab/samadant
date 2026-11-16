import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  align = "left",
  inverted = false,
  className,
}: {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}
    >
      <p className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="eyebrow">{eyebrow}</span>
        {index && (
          <span
            className={cn(
              "text-xs tracking-[0.2em]",
              inverted ? "text-primary-foreground/50" : "text-muted-foreground",
            )}
          >
            — {index}
          </span>
        )}
      </p>
      <h2
        className={cn(
          "mt-5 text-4xl leading-[1.08] font-medium text-balance md:text-5xl",
          inverted ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            inverted ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
