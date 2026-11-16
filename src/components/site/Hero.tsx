import { ArrowDownRight, ArrowRight, BookOpen } from "lucide-react";

import heroBooks from "@/assets/hero-books.jpg";
import { Button } from "@/components/ui/button";

const CHANNELS = ["Goodreads", "BookTok", "Trailers", "Mockups", "Reviewers", "Social"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden paper-grain">
      <div className="container-site grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-28">
        <div>
          <p className="flex animate-fade-up items-center gap-3">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            <span className="eyebrow">Book marketing &amp; author promotion</span>
          </p>
          <h1
            className="mt-7 animate-fade-up text-5xl leading-[1.02] font-medium text-foreground text-balance sm:text-6xl xl:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Your Story Deserves to Be <span className="display-italic">Discovered.</span>
          </h1>
          <p
            className="mt-7 max-w-xl animate-fade-up text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Helping authors strengthen their book visibility, connect with readers, and create
            meaningful opportunities for their stories through strategic book marketing and creative
            promotion.
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Button asChild variant="hero" size="xl">
              <a href="#services">
                Explore Our Services <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="quiet" size="xl">
              <a href="#contact">
                Let&apos;s Promote Your Book <ArrowDownRight />
              </a>
            </Button>
          </div>

          <div
            className="mt-12 flex animate-fade-up items-center gap-4"
            style={{ animationDelay: "320ms" }}
          >
            <span className="grid size-11 place-items-center rounded-full border border-accent/40 text-accent">
              <BookOpen className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Personal attention. Practical plans.
              </p>
              <p className="text-sm text-muted-foreground">
                Reader-aware creative work, explained clearly.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            className="absolute -inset-6 animate-spin-slow rounded-full border border-dashed border-accent/30"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-1 rounded-full border border-accent/20"
            aria-hidden="true"
          />
          <div className="relative aspect-square overflow-hidden rounded-full border-8 border-card shadow-float">
            <img
              src={heroBooks}
              alt="Three elegant hardcover books in navy, sage and sand standing on cream linen beside an olive branch"
              width={1200}
              height={1408}
              fetchPriority="high"
              className="size-full object-cover object-center"
            />
          </div>

          <div className="absolute -bottom-4 -left-2 animate-float rounded-md border bg-card/95 px-5 py-4 shadow-lift backdrop-blur sm:left-0">
            <p className="font-display text-3xl text-foreground">9</p>
            <p className="text-xs tracking-wide text-muted-foreground">
              promotion &amp; creative services
            </p>
          </div>
          <div
            className="absolute top-6 -right-2 animate-float rounded-md bg-primary px-5 py-4 text-primary-foreground shadow-lift sm:right-0"
            style={{ animationDelay: "-3s" }}
          >
            <p className="font-display text-lg italic text-gold-soft">Made for your book</p>
            <p className="text-xs text-primary-foreground/70">Creative with purpose</p>
          </div>
        </div>
      </div>

      <div className="border-y bg-paper">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5">
          <span className="text-[0.65rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Where your book can shine
          </span>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {CHANNELS.map((c, i) => (
              <li
                key={c}
                className="flex items-center gap-6 font-display text-lg text-foreground/80 italic"
              >
                {c}
                {i < CHANNELS.length - 1 && (
                  <span className="text-accent not-italic" aria-hidden="true">
                    ✦
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
