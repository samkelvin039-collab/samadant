import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <p className="container-site flex h-8 items-center justify-center gap-2 text-[0.65rem] font-semibold tracking-[0.22em] uppercase">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          Book promotion · Creative assets · Author visibility
        </p>
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-border bg-background/90 shadow-soft backdrop-blur-md"
            : "border-transparent bg-background",
        )}
      >
        <div className={cn("container-site flex items-center justify-between transition-all", scrolled ? "h-16" : "h-20")}>
          <a href="#top" aria-label="StoryReach home" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={cn(
                  "link-underline py-1 text-sm transition-colors hover:text-accent",
                  active === link.href ? "text-accent" : "text-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="hero" size="xl" className="hidden sm:inline-flex">
              <a href="#contact">
                Get Started <ArrowRight />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>

      </header>
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background transition-all duration-300 lg:hidden",
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <div className="container-site flex h-20 items-center justify-between border-b">
          <a href="#top" aria-label="StoryReach home" onClick={() => setOpen(false)}>
            <Logo />
          </a>
          <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X />
          </Button>
        </div>
        <nav aria-label="Mobile" className="container-site flex flex-1 flex-col gap-1 overflow-y-auto pt-4 pb-10">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-baseline justify-between border-b py-5 font-display text-3xl text-foreground transition-all duration-500 hover:text-accent",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              {link.label}
              <span className="font-sans text-xs tracking-[0.2em] text-muted-foreground">0{i + 1}</span>
            </a>
          ))}
          <Button asChild variant="hero" size="xl" className="mt-8 w-full">
            <a href="#contact" onClick={() => setOpen(false)}>
              Get Started <ArrowRight />
            </a>
          </Button>
        </nav>
      </div>
    </>
  );
}
