import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Hero } from "@/components/site/Hero";
import { Portfolio } from "@/components/site/Portfolio";
import { Process } from "@/components/site/Process";
import { RevealObserver } from "@/components/site/RevealObserver";
import { Services } from "@/components/site/Services";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { WhyChoose } from "@/components/site/WhyChoose";

const TITLE = "Samad | Professional Book Marketing and Author Promotion";
const DESCRIPTION =
  "Discover professional book marketing services with Samad. Explore Goodreads promotion, TikTok book features, book trailers, creative book presentation, and author-focused promotional support.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyChoose />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
