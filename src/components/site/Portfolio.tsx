import { useState } from "react";
import { ArrowUpRight, Play, Star } from "lucide-react";

import conceptMockup from "@/assets/concept-mockup.jpg";
import conceptSocial from "@/assets/concept-social.jpg";
import conceptTiktok from "@/assets/concept-tiktok.jpg";
import conceptTrailer from "@/assets/concept-trailer.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TRAILER_REFERENCES } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type Category = "All" | "TikTok" | "Mockups" | "Trailers" | "Goodreads" | "Social";
const CATEGORIES: Category[] = ["All", "TikTok", "Mockups", "Trailers", "Goodreads", "Social"];

interface ConceptItem {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  span: string;
  render: () => React.ReactNode;
}

const CONCEPTS: ConceptItem[] = [
  {
    id: "tiktok",
    title: "TikTok book feature",
    category: "TikTok",
    description: "A vertical, mood-led feature built around a fantasy book's strongest hook.",
    span: "lg:row-span-2",
    render: () => (
      <img src={conceptTiktok} alt="Concept: a phone playing a candlelit fantasy book video in front of a cosy bookshelf" width={1024} height={1280} loading="lazy" className="size-full object-cover" />
    ),
  },
  {
    id: "mockup",
    title: "Hardcover & paperback mockup",
    category: "Mockups",
    description: "A realistic 3D-style presentation for launch posts and author websites.",
    span: "",
    render: () => (
      <img src={conceptMockup} alt="Concept: navy and gold constellation book cover shown as hardcover and paperback mockups" width={1024} height={1024} loading="lazy" className="size-full object-cover" />
    ),
  },
  {
    id: "listopia",
    title: "Goodreads list promotion",
    category: "Goodreads",
    description: "How a title might sit among relevant reader-curated lists for its genre.",
    span: "",
    render: () => <ListopiaConcept />,
  },
  {
    id: "trailer",
    title: "Book trailer storyboard",
    category: "Trailers",
    description: "Frame-by-frame mood planning for an atmospheric mystery trailer.",
    span: "lg:col-span-2",
    render: () => (
      <img src={conceptTrailer} alt="Concept: six moody storyboard frames for a book trailer laid out on a table" width={1280} height={960} loading="lazy" className="size-full object-cover" />
    ),
  },
  {
    id: "social",
    title: "Social media post set",
    category: "Social",
    description: "A cohesive grid of quote, launch and mood posts in the book's palette.",
    span: "",
    render: () => (
      <img src={conceptSocial} alt="Concept: navy, sage and sand social media book graphics beside a phone showing a matching grid" width={1024} height={1024} loading="lazy" className="size-full object-cover" />
    ),
  },
  {
    id: "graphic",
    title: "Launch promotional graphic",
    category: "Social",
    description: "An announcement graphic template ready for your title, cover and date.",
    span: "",
    render: () => <PromoGraphicConcept />,
  },
];

function ListopiaConcept() {
  const rows = [
    { w: "w-3/4", rank: 1 },
    { w: "w-2/3", rank: 2, highlight: true },
    { w: "w-4/5", rank: 3 },
    { w: "w-1/2", rank: 4 },
  ];
  return (
    <div className="flex size-full flex-col justify-center gap-3 bg-secondary p-7" aria-label="Concept: an illustrated reader list with one highlighted book">
      <p className="eyebrow">Best atmospheric mysteries</p>
      <p className="text-xs text-muted-foreground">Illustrative reader-curated list</p>
      <ul className="mt-2 space-y-2.5">
        {rows.map((r) => (
          <li
            key={r.rank}
            className={cn(
              "flex items-center gap-3 rounded-sm border bg-card p-2.5",
              r.highlight && "border-accent shadow-soft",
            )}
          >
            <span className="w-4 text-center font-display text-sm text-muted-foreground">{r.rank}</span>
            <span className={cn("h-10 w-7 shrink-0 rounded-[2px]", r.highlight ? "bg-primary" : "bg-sand")} aria-hidden="true" />
            <span className="flex-1 space-y-1.5">
              <span className={cn("block h-2 rounded-full", r.w, r.highlight ? "bg-foreground/70" : "bg-foreground/20")} />
              <span className="flex gap-0.5 text-accent" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-2.5 fill-current" />
                ))}
              </span>
            </span>
            {r.highlight && <span className="rounded-full bg-accent px-2 py-0.5 text-[0.6rem] font-semibold text-accent-foreground">Your book</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PromoGraphicConcept() {
  return (
    <div className="relative flex size-full flex-col items-center justify-center overflow-hidden bg-primary p-8 text-center text-primary-foreground">
      <div className="absolute inset-4 rounded-sm border border-gold-soft/30" aria-hidden="true" />
      <p className="text-[0.6rem] tracking-[0.3em] text-gold-soft uppercase">Now available</p>
      <p className="mt-4 font-display text-3xl leading-tight">Your Story.</p>
      <p className="font-display text-3xl leading-tight text-gold-soft italic">Your Readers.</p>
      <span className="my-4 text-accent" aria-hidden="true">✦</span>
      <p className="text-xs tracking-[0.2em] text-primary-foreground/70 uppercase">Book title · Author name</p>
    </div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<Category>("All");
  const items = CONCEPTS.filter((c) => filter === "All" || c.category === filter);

  return (
    <section id="portfolio" className="py-24 md:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Portfolio & promotional concepts"
          index="03"
          title={
            <>
              Ideas that help a book <span className="display-italic">set the scene.</span>
            </>
          }
          intro="A look at the kinds of creative and promotional work we prepare. Every example below is an illustrative concept created for this site — not a client project."
        />

        <div role="tablist" aria-label="Filter concepts" className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-all",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-accent hover:text-accent",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid auto-rows-[20rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                "group relative animate-fade-up overflow-hidden rounded-md border bg-card shadow-soft",
                filter === "All" && item.span,
              )}
            >
              <div className="size-full transition-transform duration-700 group-hover:scale-[1.03]">{item.render()}</div>
              <span className="absolute top-4 left-4 rounded-full bg-card/95 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] text-foreground uppercase shadow-soft">
                Concept · {item.category}
              </span>
              <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-primary via-primary/85 to-transparent p-6 pt-16 opacity-95 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-xl text-primary-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-primary-foreground/75">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="eyebrow">Trailer inspiration</p>
            <h3 className="mt-4 text-3xl leading-tight text-foreground md:text-4xl">
              Book trailers that <span className="display-italic">set a mood.</span>
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              These publicly available trailers are shared as creative references to show different ways a book can
              be presented on screen. They are not StoryReach client projects.
            </p>
            <Button asChild variant="hero" size="xl" className="mt-8">
              <a href="#contact">
                Discuss a trailer for your book <ArrowUpRight />
              </a>
            </Button>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {TRAILER_REFERENCES.map((t, i) => (
              <li key={t.url} data-reveal>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-md border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lift"
                  aria-label={`Watch the ${t.title} book trailer on YouTube (opens in a new tab)`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                      Reference {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-accent">
                      <Play className="size-3.5 fill-current" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-5 font-display text-2xl text-foreground">{t.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.author} · {t.genre}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-accent">
                    Watch trailer <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
