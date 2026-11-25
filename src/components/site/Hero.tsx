import { ArrowDownRight, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";

import heroBooks from "@/assets/hero-books.jpg";
import { Button } from "@/components/ui/button";

const CHANNELS = ["Goodreads", "BookTok", "Trailers", "Mockups", "Reviewers", "Social"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative bg-primary text-primary-foreground">
        <img
          src={heroBooks}
          alt="Three elegant hardcover books in navy, sage and sand standing on cream linen beside an olive branch"
          width={1200}
          height={1408}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45 lg:opacity-70"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/30"
          aria-hidden="true"
        />
        <div className="container-site relative py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="flex animate-fade-up items-center gap-3">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              <span className="eyebrow text-accent">Book marketing &amp; author promotion</span>
            </p>
            <h1
              className="mt-8 animate-fade-up text-5xl leading-[1.02] font-medium text-primary-foreground text-balance sm:text-6xl xl:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              Your Story Deserves to Be{" "}
              <span className="font-display text-accent italic">Discovered.</span>
            </h1>
            <p
              className="mt-8 max-w-xl animate-fade-up text-base leading-relaxed text-primary-foreground/75 md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Helping authors strengthen their book visibility, connect with readers, and create
              meaningful opportunities for their stories through strategic book marketing and
              creative promotion.
            </p>
            <div
              className="mt-11 flex animate-fade-up flex-wrap items-center gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <Button asChild variant="gold" size="xl">
                <Link to="/services">
                  Explore Our Services <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="outlineGold"
                size="xl"
                className="text-primary-foreground hover:border-accent"
              >
                <Link to="/contact">
                  Let&apos;s Promote Your Book <ArrowDownRight />
                </Link>
              </Button>
            </div>

            <div
              className="mt-14 flex animate-fade-up items-center gap-4"
              style={{ animationDelay: "320ms" }}
            >
              <span className="h-px w-10 bg-primary-foreground/30" aria-hidden="true" />
              <BookOpen className="size-4 text-accent" aria-hidden="true" />
              <p className="text-sm text-primary-foreground/70">
                <span className="font-display text-base text-primary-foreground">
                  Personal attention. Practical plans.
                </span>{" "}
                · Reader-aware creative work, explained clearly.
              </p>
            </div>
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
