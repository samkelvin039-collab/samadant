import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Clapperboard,
  Film,
  ListOrdered,
  Mail,
  Megaphone,
  Newspaper,
  Palette,
  Smartphone,
  UserRoundCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/site/SectionHeading";
import { selectServiceForInquiry } from "@/lib/inquiry-store";
import { SERVICES, mailtoForService, type Service, type ServiceId } from "@/lib/site-content";

export const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  listopia: ListOrdered,
  bookclub: UsersRound,
  profile: UserRoundCheck,
  tiktok: Smartphone,
  trailer: Film,
  mockup: BookOpenCheck,
  cover: Palette,
  review: Newspaper,
  social: Megaphone,
};

export function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" className="bg-paper py-24 md:py-32">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Nine ways we can help"
            index="02"
            title={
              <>
                Make your book <span className="display-italic">easier to discover.</span>
              </>
            }
            intro="Explore each service to understand what the work involves and how it supports your book's presentation, discovery and reader connection."
          />
          <Button asChild variant="quiet" size="lg" className="self-start lg:self-auto">
            <a href="#contact">
              Not sure which fits? Ask us <ArrowUpRight />
            </a>
          </Button>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.id];
            return (
              <li
                key={service.id}
                data-reveal
                className="group relative flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-background"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-full border border-accent/30 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-2xl leading-snug text-foreground">{service.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center gap-5 border-t pt-5">
                  <button
                    type="button"
                    onClick={() => setActive(service)}
                    className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
                  >
                    Learn more <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => selectServiceForInquiry(service.title)}
                    className="link-underline text-sm text-muted-foreground hover:text-accent"
                  >
                    Get started
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-xl rounded-md border-border bg-card p-0 sm:rounded-md">
          {active && <ServiceDetail service={active} onClose={() => setActive(null)} />}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ServiceDetail({ service, onClose }: { service: Service; onClose: () => void }) {
  const Icon = SERVICE_ICONS[service.id] ?? Clapperboard;
  return (
    <div>
      <div className="rounded-t-md bg-primary px-8 pt-8 pb-7 text-primary-foreground">
        <span className="grid size-12 place-items-center rounded-full border border-gold-soft/40 text-gold-soft">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <DialogHeader className="mt-5 text-left">
          <DialogTitle className="font-display text-3xl font-medium text-primary-foreground">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/70">
            {service.summary}
          </DialogDescription>
        </DialogHeader>
      </div>
      <div className="space-y-6 px-8 py-7">
        <div>
          <h4 className="eyebrow">How it works</h4>
          <p className="mt-2 leading-relaxed text-foreground">{service.howItWorks}</p>
        </div>
        <div>
          <h4 className="eyebrow">How it helps your book</h4>
          <p className="mt-2 leading-relaxed text-foreground">{service.howItHelps}</p>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Results depend on each book and platform; we never promise specific sales, rankings,
          reviews or placements.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            variant="hero"
            size="xl"
            onClick={() => {
              onClose();
              selectServiceForInquiry(service.title);
            }}
          >
            Get Started <ArrowRight />
          </Button>
          <Button asChild variant="outlineGold" size="xl">
            <a href={mailtoForService(service.title)}>
              <Mail /> Email about this
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
