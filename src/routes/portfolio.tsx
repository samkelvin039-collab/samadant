import { createFileRoute } from "@tanstack/react-router";

import { PageBanner } from "@/components/site/PageBanner";
import { Portfolio } from "@/components/site/Portfolio";

const TITLE = "Portfolio & Promotional Concepts | Samad";
const DESCRIPTION = "Explore Samad's illustrative book promotion concepts: TikTok features, book mockups, Goodreads concepts, social graphics and trailer references.";
const URL = "https://samadant.lovable.app/portfolio";

export const Route = createFileRoute("/portfolio")({
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
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <PageBanner eyebrow="Portfolio" title="Promotional concepts and creative work." />
      <Portfolio />
    </>
  );
}
