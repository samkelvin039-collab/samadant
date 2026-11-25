import { createFileRoute } from "@tanstack/react-router";

import { PageBanner } from "@/components/site/PageBanner";
import { About } from "@/components/site/About";

const TITLE = "About Samad \u2014 Book Marketing Agency";
const DESCRIPTION = "Learn about Samad, a book marketing and author-promotion agency helping authors present their books thoughtfully to the right readers.";
const URL = "https://samadant.lovable.app/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageBanner eyebrow="About Samad" title="Thoughtful promotion, rooted in your story." />
      <About />
    </>
  );
}
