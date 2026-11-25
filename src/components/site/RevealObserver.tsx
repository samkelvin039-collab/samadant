import { useEffect } from "react";

/**
 * Adds gentle scroll-reveal to any element marked with data-reveal.
 * Watches the DOM so elements on pages opened later (client navigation) are revealed too.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");
    const reveal = (el: Element) => el.classList.add("is-visible");
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  reveal(entry.target);
                  io?.unobserve(entry.target);
                }
              }
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
          )
        : null;
    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-visible):not([data-reveal-watched])").forEach((el) => {
        el.setAttribute("data-reveal-watched", "");
        if (io) io.observe(el);
        else reveal(el);
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io?.disconnect();
    };
  }, []);
  return null;
}
