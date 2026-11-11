"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./section-overlaps.css";

// One opening transition, plus a deliberately chosen chapter on longer pages.
// Forms, galleries with their own pins, and long articles keep their own flow.
const chapters = [
  ".au-hero",
  ".africa-page .s-hero",
  ".africa-page .s-hero",
  ".home-page .e-together-hero",
  ".about-page .au-split",
  ".services-page .s-principle",
  ".corporate-page .k-sides",
  ".groups-page .g-expo",
  ".destinations-page .d-africa",
  ".africa-page .a-business",
  ".franchise-page .f-network",
  ".partnership-page .p-regions",
].join(", ");

/** Hold a chapter's final view while the following sheet covers it. */
export function SectionOverlaps() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let disposed = false;
    let frame = 0;
    let generation = 0;
    let media: gsap.MatchMedia | undefined;
    const findSections = () => Array.from(document.querySelectorAll<HTMLElement>(`main :is(${chapters})`))
      .filter(section => section.getClientRects().length > 0);
    let sections = findSections();

    const setup = async () => {
      const current = ++generation;
      await document.fonts.ready;
      if (disposed || current !== generation) return;
      cancelAnimationFrame(frame);
      // Existing scenes first establish their pin spacers and responsive layout.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (disposed || current !== generation) return;
          media?.revert();
          media = gsap.matchMedia();
          media.add("(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
            if (document.querySelector('[data-motion-paused="true"]')) return;
            const cleanups: (() => void)[] = [];

            sections = findSections();
            sections.forEach(section => {
              const flow = section.parentElement?.classList.contains("pin-spacer") ? section.parentElement : section;
              const sibling = flow.nextElementSibling;
              const next = sibling?.classList.contains("pin-spacer") ? sibling.firstElementChild : sibling;
              if (!(next instanceof HTMLElement) || !next.getClientRects().length) return;

              const layer = next.style.getPropertyValue("--section-cover-layer");
              const underLayer = section.style.getPropertyValue("--section-cover-under-layer");
              const outgoingLayer = Number.parseInt(getComputedStyle(section).zIndex) || 0;
              const incomingLayer = Math.max(2, outgoingLayer + 1, Number.parseInt(getComputedStyle(next).zIndex) || 0);
              section.classList.add("section-cover-under");
              section.style.setProperty("--section-cover-under-layer", String(outgoingLayer));
              next.classList.add("section-cover-over");
              next.style.setProperty("--section-cover-layer", String(incomingLayer));

              // Counter the outgoing section's natural movement, without adding
              // another pin or extra scroll distance to an existing hero scene.
              // At the start, all outgoing content has had time to scroll past.
              gsap.fromTo(section, { "--section-cover-y": "0px" }, {
                "--section-cover-y": () => `${window.innerHeight}px`,
                ease: "none",
                scrollTrigger: {
                  trigger: next, start: "top bottom", end: "top top",
                  scrub: true, invalidateOnRefresh: true,
                },
              });

              cleanups.push(() => {
                section.classList.remove("section-cover-under");
                if (underLayer) section.style.setProperty("--section-cover-under-layer", underLayer);
                else section.style.removeProperty("--section-cover-under-layer");
                next.classList.remove("section-cover-over");
                if (layer) next.style.setProperty("--section-cover-layer", layer);
                else next.style.removeProperty("--section-cover-layer");
              });
            });

            ScrollTrigger.refresh();
            return () => cleanups.forEach(cleanup => cleanup());
          });
        });
      });
    };

    void setup();
    const pauseObserver = new MutationObserver(() => { void setup(); });
    pauseObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-motion-paused"] });
    // Client navigation can stream the new page after its pathname changes.
    // Rebind only when the chosen sections themselves are replaced or appear.
    const contentObserver = new MutationObserver(() => {
      const current = findSections();
      if (current.length !== sections.length || current.some((section, index) => section !== sections[index])) {
        sections = current;
        void setup();
      }
    });
    contentObserver.observe(document.body, { subtree: true, childList: true });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      pauseObserver.disconnect();
      contentObserver.disconnect();
      media?.revert();
    };
  }, [pathname]);

  return null;
}
