import { ArrowRight, Compass, MessagesSquare, PenTool } from "lucide-react";

import aboutStudio from "@/assets/about-studio.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";

const PILLARS = [
  {
    icon: PenTool,
    title: "Made for your book",
    body: "Creative choices guided by your genre, tone and voice.",
  },
  {
    icon: Compass,
    title: "Research with purpose",
    body: "Relevant communities and opportunities, thoughtfully selected.",
  },
  {
    icon: MessagesSquare,
    title: "Clear communication",
    body: "Agreed scope, understandable updates and organised delivery.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-site">
        <div
          data-reveal
          className="mb-20 flex flex-col gap-2 border-l-2 border-accent pl-6 md:pl-8"
        >
          <p className="font-display text-3xl text-foreground md:text-4xl">
            Every book has its own character.
          </p>
          <p className="display-italic text-3xl md:text-4xl">
            Its promotion should feel just as distinctive.
          </p>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="relative">
            <div className="overflow-hidden rounded-md shadow-lift">
              <img
                src={aboutStudio}
                alt="An author's workspace with a navy hardcover book, open notebook, fountain pen and colour swatches"
                width={1200}
                height={1408}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -bottom-6 max-w-[16rem] rounded-md bg-primary p-6 text-primary-foreground shadow-float md:-right-8">
              <p className="font-display text-xl leading-snug italic">
                &ldquo;Every detail should help readers understand the story waiting inside.&rdquo;
              </p>
              <p className="mt-3 text-[0.65rem] tracking-[0.2em] text-gold-soft uppercase">
                The StoryReach approach
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="About StoryReach"
              index="01"
              title={
                <>
                  Thoughtful promotion, rooted in{" "}
                  <span className="display-italic">your story.</span>
                </>
              }
              intro="StoryReach is a book marketing and author-promotion agency. A book is a world of its own — the right presentation helps readers understand what makes it worth exploring."
            />
            <p data-reveal className="mt-5 leading-relaxed text-muted-foreground">
              We support authors with Goodreads discovery, reader-community outreach, TikTok
              features, trailers, mockups, cover refinement and social content. Each project begins
              with the book itself: its genre, intended readers, tone, and the goals you want to
              work toward.
            </p>

            <ul className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {PILLARS.map(({ icon: Icon, title, body }) => (
                <li key={title} data-reveal className="border-t pt-5">
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  <p className="mt-3 font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ul>

            <Button asChild variant="outlineGold" size="xl" className="mt-10">
              <a href="#process">
                See how we work together <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
