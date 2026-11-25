import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { Hero } from "@/components/site/Hero";
import { HomePreviews } from "@/components/site/HomePreviews";

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
      { property: "og:url", content: "https://samadant.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://samadant.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <HomePreviews />
    </>
  );
}
