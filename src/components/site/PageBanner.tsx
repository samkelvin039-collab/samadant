import type { ReactNode } from "react";

/** Navy page-title banner shared by every inner page, in the LATIF style. */
export function PageBanner({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-site py-20 md:py-28">
        <p className="flex animate-fade-up items-center gap-3">
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          <span className="eyebrow text-accent">{eyebrow}</span>
        </p>
        <h1
          className="mt-6 max-w-3xl animate-fade-up text-5xl leading-[1.05] font-medium text-balance text-primary-foreground md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="mt-6 max-w-2xl animate-fade-up leading-relaxed text-primary-foreground/75 md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
