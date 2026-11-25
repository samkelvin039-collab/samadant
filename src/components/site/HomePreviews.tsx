import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import conceptMockup from "@/assets/concept-mockup.jpg";
import conceptSocial from "@/assets/concept-social.jpg";
import conceptTiktok from "@/assets/concept-tiktok.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SERVICE_ICONS } from "@/components/site/Services";
import { SERVICES } from "@/lib/site-content";

const FEATURED = SERVICES.slice(0, 6);
const CONCEPTS = [
  { src: conceptTiktok, label: "TikTok book feature", alt: "Concept TikTok book feature on a phone" },
  { src: conceptMockup, label: "Book mockup", alt: "Concept hardcover book mockup" },
  { src: conceptSocial, label: "Social media graphic", alt: "Concept social media book graphic" },
];

/** Homepage teasers that point visitors to the full Services and Portfolio pages. */
export function HomePreviews() {
  return (
    <>
      <section className="bg-paper py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Services"
              index="02"
              title={
                <>
                  Book marketing, <span className="display-italic">thoughtfully made.</span>
                </>
              }
            />
            <Button asChild variant="outlineGold" size="lg" className="self-start lg:self-auto">
              <Link to="/services">
                View all nine services <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="mt-14 grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((s, i) => {
              const Icon = SERVICE_ICONS[s.id];
              return (
                <li key={s.id} data-reveal className="bg-card p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="size-5 text-accent" aria-hidden="true" />
                    <span className="font-display text-lg text-accent">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl leading-snug text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Portfolio & promotional concepts"
              index="03"
              title={
                <>
                  Ideas that bring <span className="display-italic">books to life.</span>
                </>
              }
            />
            <Button asChild variant="outlineGold" size="lg" className="self-start lg:self-auto">
              <Link to="/portfolio">
                See the portfolio <ArrowRight />
              </Link>
            </Button>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {CONCEPTS.map((c) => (
              <li key={c.label} data-reveal>
                <Link to="/portfolio" className="group block">
                  <div className="overflow-hidden bg-card p-2 shadow-soft">
                    <img
                      src={c.src}
                      alt={c.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-display text-xl text-foreground">{c.label}</span>
                    <span className="eyebrow">Concept</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
