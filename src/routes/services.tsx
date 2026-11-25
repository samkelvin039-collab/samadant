import { createFileRoute } from "@tanstack/react-router";

import { PageBanner } from "@/components/site/PageBanner";
import { Services } from "@/components/site/Services";

const TITLE = "Services \u2014 Goodreads, BookTok, Trailers & More | Samad";
const DESCRIPTION = "Nine book marketing services from Samad: Goodreads promotion, TikTok book features, book trailers, mockups, cover editing, review outreach and social media.";
const URL = "https://samadant.lovable.app/services";

export const Route = createFileRoute("/services")({
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
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageBanner eyebrow="Services" title="What we offer authors." />
      <Services />
    </>
  );
}
