import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import { PARTNERS, PROCESS_STEPS } from "@/lib/site-content";

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          index="05"
          title={
            <>
              From first idea to <span className="display-italic">reader discovery.</span>
            </>
          }
          intro="A simple, collaborative process that keeps the work focused and aligned with your book."
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span
            className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-border lg:block"
            aria-hidden="true"
          />
          {PROCESS_STEPS.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className="relative text-center"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="relative mx-auto grid size-14 place-items-center rounded-full border border-accent bg-background font-display text-xl text-accent shadow-soft">
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl text-foreground">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div
          data-reveal
          className="mt-24 flex flex-col items-center justify-between gap-6 rounded-md border bg-paper p-8 md:flex-row md:p-10"
        >
          <div>
            <p className="eyebrow">Collaboration &amp; partners</p>
            <p className="mt-2 font-display text-2xl text-foreground">
              Working together with creative partners.
            </p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {PARTNERS.map((p) => (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {p.name} <span className="text-muted-foreground">· TikTok</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
