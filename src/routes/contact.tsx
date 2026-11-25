import { createFileRoute } from "@tanstack/react-router";

import { PageBanner } from "@/components/site/PageBanner";
import { Contact } from "@/components/site/Contact";

const TITLE = "Contact Samad \u2014 Start Your Book Promotion";
const DESCRIPTION = "Send Samad a project inquiry about your book. Share your title, link and the service you are interested in, or email samad@fourthgroup.co.";
const URL = "https://samadant.lovable.app/contact";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageBanner eyebrow="Contact" title="Let's promote your book." />
      <Contact />
    </>
  );
}
