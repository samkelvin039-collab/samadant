import { Link } from "@tanstack/react-router";
import {
  BookMarked,
  HandHeart,
  Layers,
  Lightbulb,
  MessageCircleMore,
  Telescope,
  UserRoundPen,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import { WHY_CHOOSE } from "@/lib/site-content";

const ICONS: LucideIcon[] = [
  UserRoundPen,
  Lightbulb,
  Layers,
  BookMarked,
  Telescope,
  HandHeart,
  MessageCircleMore,
];

export function WhyChoose() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32"
    >
      <div
        className="absolute -top-40 -right-40 size-[32rem] rounded-full border border-gold-soft/15"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -right-24 size-[22rem] rounded-full border border-gold-soft/10"
        aria-hidden="true"
      />
      <div className="container-site relative">
        <SectionHeading
          inverted
          eyebrow="Why choose Samad"
          index="04"
          title={
            <>
              Care for the book.{" "}
              <span className="italic text-gold-soft">Clarity for the author.</span>
            </>
          }
          intro="We combine creative presentation with considered research, so every promotional step makes sense for your story."
        />
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = ICONS[i] ?? Lightbulb;
            return (
              <li
                key={item.title}
                data-reveal
                className="group rounded-md border border-primary-foreground/10 bg-primary-soft/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-soft/40 hover:bg-primary-soft/70"
              >
                <Icon className="size-6 text-gold-soft" aria-hidden="true" />
                <h3 className="mt-6 text-xl text-primary-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                  {item.body}
                </p>
              </li>
            );
          })}
          <li
            data-reveal
            className="flex flex-col justify-between rounded-md bg-accent p-7 text-accent-foreground"
          >
            <p className="font-display text-2xl leading-snug italic">
              Have a book that deserves a closer look?
            </p>
            <Link to="/contact" className="link-underline mt-6 self-start text-sm font-semibold">
              Start a conversation →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
