"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Enhance the server-rendered page; content stays readable without JavaScript. */
export function JourneyMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = root.current;
    if (!page) return;
    let disposed = false;
    let revert = () => {};

    async function setup() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed || !page) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia(page);
      revert = () => media.revert();

      media.add({
        desktop: "(min-width: 801px)",
        compact: "(max-width: 800px)",
        tall: "(min-height: 620px)",
        reduced: "(prefers-reduced-motion: reduce)",
      }, context => {
        if (context.conditions?.reduced) return;
        const desktop = context.conditions?.desktop;
        const select = gsap.utils.selector(page);

        const hero = page.querySelector<HTMLElement>(".j-hero");
        const intro = page.querySelector<HTMLElement>(".j-intro");
        const openingPinned = !!(hero && intro && context.conditions?.tall && hero.offsetHeight <= window.innerHeight + 1);
        // The following paper section keeps its natural position in the document
        // and covers the pinned hero. No extra pin space or scroll interception.
        if (hero && intro && openingPinned) {
          const cover = gsap.timeline({
            scrollTrigger: {
              id: "journey-opening-cover", trigger: hero, start: "top top",
              endTrigger: intro, end: "top top", pin: hero, pinSpacing: false,
              scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
            },
          });
          cover.to(select(".j-hero-cover-shade"), { opacity: .58, ease: "none" }, 0)
            .fromTo(select(".j-hero-photo"), { scale: 1.09, yPercent: 0 }, {
              scale: 1.03, yPercent: -1, ease: "none",
            }, 0)
            .to(select(".j-hero-content"), { y: -30, opacity: .25, ease: "none" }, 0)
            .to(select(".j-scroll-note"), { opacity: 0, duration: .2, ease: "none" }, 0)
            .fromTo(intro, { "--top-tear-x": "-16px", "--top-tear-scale": 1.3 }, {
              "--top-tear-x": "16px", "--top-tear-scale": 1, ease: "none",
            }, 0);
        }

        const process = page.querySelector<HTMLElement>(".j-process");
        if (intro && process) {
          gsap.timeline({
            scrollTrigger: {
              id: "journey-services-cover", trigger: intro,
              // Let taller mobile content scroll fully before holding its last view.
              start: () => intro.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
              endTrigger: process, end: "top top", pin: intro, pinSpacing: false,
              scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
            },
          })
            .to(select(".j-intro-cover-shade"), { opacity: .16, ease: "none" }, 0)
            .to(select(".j-intro > .j-shell"), { y: -20, opacity: .6, ease: "none" }, 0)
            .fromTo(process, { "--top-tear-x": "-14px", "--top-tear-scale": 1.3 }, {
              "--top-tear-x": "14px", "--top-tear-scale": 1, ease: "none",
            }, 0);
        }

        // The story waits behind the services chapter and is uncovered as it lifts away.
        // Sections overlap by the tear height, so the story starts that much higher.
        const tear = () => parseFloat(getComputedStyle(page).getPropertyValue("--tear")) || 0;
        const story = page.querySelector<HTMLElement>(".j-story");
        if (process && story) {
          gsap.fromTo(story, { y: () => tear() - window.innerHeight }, {
            y: 0, ease: "none",
            scrollTrigger: {
              id: "journey-story-reveal", trigger: process,
              start: "bottom bottom", end: () => `bottom top+=${tear()}`,
              scrub: true, invalidateOnRefresh: true,
            },
          });
        }

        // Business and leisure slide over the values, which hold still and dim beneath.
        const values = page.querySelector<HTMLElement>(".j-values");
        const split = page.querySelector<HTMLElement>(".j-split");
        if (values && split) {
          gsap.timeline({
            scrollTrigger: {
              id: "journey-values-cover", trigger: values,
              start: () => values.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
              endTrigger: split, end: "top top", pin: values, pinSpacing: false,
              scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
            },
          })
            .to(values, { "--values-shade": .16, ease: "none" }, 0)
            .to(select(".j-values > .j-shell"), { y: -20, opacity: .6, ease: "none" }, 0)
            .fromTo(split, { "--top-tear-x": "-14px", "--top-tear-scale": 1.3 }, {
              "--top-tear-x": "14px", "--top-tear-scale": 1, ease: "none",
            }, 0);
        }

        // The team scene then slides over business and leisure in the same way.
        const team = page.querySelector<HTMLElement>(".j-team");
        if (split && team) {
          gsap.timeline({
            scrollTrigger: {
              id: "journey-split-cover", trigger: split,
              start: () => split.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
              endTrigger: team, end: "top top", pin: split, pinSpacing: false,
              scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
            },
          })
            .to(split, { "--split-shade": .35, ease: "none" }, 0)
            .fromTo(team, { "--top-tear-x": "-14px", "--top-tear-scale": 1.3 }, {
              "--top-tear-x": "14px", "--top-tear-scale": 1, ease: "none",
            }, 0);
        }

        // Short, one-time entrances. Anything already on screen stays visible.
        const reveal = (elements: HTMLElement[], trigger: Element) => {
          if (trigger.getBoundingClientRect().top < window.innerHeight * .92) return;
          const tween = gsap.from(elements, {
            opacity: 0, y: desktop ? 24 : 14, duration: .8,
            stagger: .09, ease: "power2.out", clearProps: "opacity,transform",
            scrollTrigger: { trigger, start: "top 92%", once: true },
          });
          // Keyboard navigation must never focus an invisible control.
          const show = () => { tween.progress(1); };
          trigger.addEventListener("focusin", show);
          focusCleanups.push(() => trigger.removeEventListener("focusin", show));
        };
        const focusCleanups: Array<() => void> = [];
        select(".j-intro-heading, .j-story-copy, .j-team-copy, .j-faq-grid > div:first-child").forEach((block: HTMLElement) => {
          reveal(Array.from(block.children).filter((child): child is HTMLElement => child instanceof HTMLElement && child.tagName !== "DIALOG"), block);
        });
        select(".j-audience, .j-steps li, .j-values-grid li, .j-pillars li, .j-faq-list details, .j-network-content h2, .j-values h2, .j-process-content h2, .j-split-copy").forEach((item: HTMLElement) => reveal([item], item));

        // Overscan keeps every edge covered while photographs move independently.
        select(".j-hero, .j-process, .j-story-photo, .j-team-photo, .j-split-photo").forEach((frame: HTMLElement) => {
          const photo = frame.querySelector(":scope > .j-photo");
          if (!photo) return;
          const hero = frame.classList.contains("j-hero");
          if (hero && openingPinned) return;
          gsap.fromTo(photo,
            { yPercent: hero ? 0 : (desktop ? -3 : -1.5), scale: desktop ? 1.09 : 1.05 },
            { yPercent: desktop ? 3 : 1.5, ease: "none", scrollTrigger: {
              trigger: frame, start: hero ? "top top" : "top bottom", end: "bottom top", scrub: .7,
            } },
          );
        });

        // Bottom tears drift slightly as they pass through the viewport.
        select(".j-torn-bottom").forEach((section: HTMLElement) => {
          // Stretch stays at or below 1 so a tear never reaches past its overlap.
          gsap.fromTo(section, { "--tear-drift": "-12px", "--tear-stretch": .8 }, {
            "--tear-drift": "12px", "--tear-stretch": 1, ease: "none",
            scrollTrigger: { trigger: section, start: "bottom bottom", end: "bottom top", scrub: .8 },
          });
        });

        if (desktop) {
          select(".j-network-landscape").forEach((landscape: HTMLElement, i: number) => {
            gsap.fromTo(landscape, { y: i ? 16 : -16 }, {
              y: i ? -16 : 16, ease: "none",
              scrollTrigger: { trigger: ".j-network", start: "top bottom", end: "bottom top", scrub: 1 },
            });
          });
          gsap.fromTo(select(".j-flight-plane"), { x: -18, y: 5, rotation: -14 }, {
            x: 18, y: -5, rotation: -4, ease: "none",
            scrollTrigger: { trigger: ".j-audiences", start: "top bottom", end: "bottom 25%", scrub: 1 },
          });
          gsap.to(select(".j-map-route"), { strokeDashoffset: -35, ease: "none",
            scrollTrigger: { trigger: ".j-network", start: "top 70%", end: "bottom 30%", scrub: 1 },
          });
        }

        // Recalculate after fonts load and accordions change the document height.
        let active = true;
        const refresh = () => { if (active) ScrollTrigger.refresh(); };
        page.addEventListener("toggle", refresh, true);
        document.fonts.ready.then(refresh);
        return () => {
          active = false;
          focusCleanups.forEach(cleanup => cleanup());
          page.removeEventListener("toggle", refresh, true);
        };
      });
    }

    setup().catch(() => { revert(); });
    return () => { disposed = true; revert(); };
  }, []);

  return <div ref={root} className="journey-page">{children}</div>;
}
