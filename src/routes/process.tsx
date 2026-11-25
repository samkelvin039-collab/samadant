import { createFileRoute } from "@tanstack/react-router";

import { PageBanner } from "@/components/site/PageBanner";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Process } from "@/components/site/Process";

const TITLE = "Our Process \u2014 Why Choose Samad and How It Works";
const DESCRIPTION = "See why authors choose Samad and how our four-step book promotion process works, from first inquiry to delivery.";
const URL = "https://samadant.lovable.app/process";

export const Route = createFileRoute("/process")({
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
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <>
      <PageBanner eyebrow="Our process" title="Why Samad, and how we work together." />
      <WhyChoose />
      <Process />
    </>
  );
}
