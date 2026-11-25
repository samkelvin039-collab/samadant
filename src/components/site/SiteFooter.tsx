import { Mail } from "lucide-react";

import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/site/Logo";
import { NAV_LINKS } from "@/components/site/SiteHeader";
import { CONTACT_EMAIL, SERVICES } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo inverted />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Book marketing and creative promotion for authors who want their stories presented with
            care and discovered by the right readers.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="link-underline mt-6 inline-flex items-center gap-2 text-sm text-gold-soft"
          >
            <Mail className="size-4" aria-hidden="true" /> {CONTACT_EMAIL}
          </a>
        </div>
        <nav aria-label="Footer">
          <p className="text-[0.65rem] tracking-[0.2em] text-gold-soft uppercase">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-underline text-primary-foreground/80 hover:text-primary-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-[0.65rem] tracking-[0.2em] text-gold-soft uppercase">Services</p>
          <ul className="mt-5 grid gap-3 text-sm text-primary-foreground/80">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to="/services" className="link-underline hover:text-primary-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-primary-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Samad · Book Promotion &amp; Creative Studio</p>
          <p>
            Portfolio items are illustrative concepts. Results vary by book; no outcomes are
            guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
