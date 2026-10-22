"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Scroll choreography for chapter pages (travel services, Africa); content stays readable without JavaScript. */
export function ChapterMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = root.current;
    if (!page) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      page.querySelectorAll("video").forEach(video => video.pause());
    }
    let disposed = false;
    let revert = () => {};

    async function setup() {
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      await document.fonts.ready;
      if (disposed || !page) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      const media = gsap.matchMedia(page);
      revert = () => media.revert();

      media.add({
        desktop: "(min-width: 801px)",
        tall: "(min-height: 620px)",
        reduced: "(prefers-reduced-motion: reduce)",
      }, context => {
        if (context.conditions?.reduced) return;
        const desktop = !!context.conditions?.desktop;
        const stacked = desktop && !!context.conditions?.tall;
        const select = gsap.utils.selector(page);
        const cleanups: Array<() => void> = [];
        const visible = (element: Element) => element.getBoundingClientRect().top < window.innerHeight * .9;

        // The opening lines rise into place once, as the page loads.
        const heroLines = select(".s-hero [data-hero]");
        if (heroLines.length) gsap.from(heroLines, {
          yPercent: 40, opacity: 0, duration: 1.1, stagger: .09, delay: .1,
          ease: "power3.out", clearProps: "opacity,transform",
        });
        const heroPhotos = select(".s-hero .j-hero-photo");
        if (heroPhotos.length) gsap.fromTo(heroPhotos, { scale: 1.14 }, { scale: 1.06, duration: 2.4, ease: "power2.out" });

        // Every chapter holds still and darkens while the next one tears over it.
        const chapters = select("main > section") as HTMLElement[];
        chapters.slice(0, -1).forEach((section, i) => {
          if (!stacked) return;
          const next = chapters[i + 1];
          // The masked header pins itself while the map opens.
          if (section.classList.contains("au-hero") || section.classList.contains("sv-final")) return;
          const hero = section.classList.contains("s-hero");
          if (hero && section.offsetHeight > window.innerHeight + 1) return;
          const tearIn = { "--top-tear-x": "-16px", "--top-tear-scale": 1.35 };
          const tearOut = { "--top-tear-x": "16px", "--top-tear-scale": 1, ease: "none" };
          const pinStart = () => section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top";
          // Chapters that hold the page for their own scene are covered once the scene is done.
          const coverAfter = () => {
            gsap.timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true } })
              .to(section, { "--cover": .62, ease: "none" }, 0)
              .fromTo(next, tearIn, tearOut, 0);
          };

          // A sideways chapter holds the page while its track travels.
          const track = section.hasAttribute("data-hscroll") ? section.querySelector<HTMLElement>("[data-hscroll-track]") : null;
          if (track) {
            const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
            section.classList.add("is-hscroll");
            gsap.fromTo(track, { scrollLeft: 0 }, {
              scrollLeft: distance, ease: "none",
              scrollTrigger: {
                trigger: section, start: pinStart, end: () => `+=${distance()}`, pin: section, pinSpacing: true,
                scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
                onRefresh: self => { track.dataset.scrollStart = String(self.start); track.dataset.scrollEnd = String(self.end); },
              },
            });
            coverAfter();
            cleanups.push(() => {
              section.classList.remove("is-hscroll");
              delete track.dataset.scrollStart;
              delete track.dataset.scrollEnd;
            });
            return;
          }

          // A stepped chapter holds the page and announces each step as the scroll reaches it.
          const steps = Number(section.dataset.steps ?? 0);
          if (steps > 1) {
            let current = -1;
            section.classList.add("is-stepped");
            ScrollTrigger.create({
              trigger: section, start: pinStart, end: () => `+=${window.innerHeight * .75 * steps}`, pin: section, pinSpacing: true,
              anticipatePin: 1, invalidateOnRefresh: true,
              onRefresh: self => { section.dataset.stepsStart = String(self.start); section.dataset.stepsEnd = String(self.end); },
              onUpdate: self => {
                section.style.setProperty("--steps-progress", String(self.progress));
                const index = Math.min(steps - 1, Math.floor(self.progress * steps));
                if (index === current) return;
                current = index;
                section.dispatchEvent(new CustomEvent("chapter-step", { detail: index }));
              },
            });
            coverAfter();
            cleanups.push(() => {
              section.classList.remove("is-stepped");
              section.style.removeProperty("--steps-progress");
              delete section.dataset.stepsStart;
              delete section.dataset.stepsEnd;
            });
            return;
          }

          const cover = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: () => section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
              endTrigger: next, end: "top top", pin: section, pinSpacing: false,
              scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
            },
          });
          if (hero) {
            cover.to(section.querySelector(".j-hero-cover-shade"), { opacity: .6, ease: "none" }, 0)
              .to(section.querySelector(".j-hero-content"), { y: -40, opacity: .2, ease: "none" }, 0)
              .to(section.querySelector(".j-scroll-note"), { opacity: 0, duration: .2, ease: "none" }, 0);
          } else {
            cover.to(section, { "--cover": .62, ease: "none" }, 0)
              .to(section.querySelectorAll(":scope > .j-shell"), { y: -60, scale: .97, transformOrigin: "50% 0%", ease: "none" }, 0);
          }
          cover.fromTo(next, tearIn, tearOut, 0);
        });

        // Headings rise line by line out of a mask; lead paragraphs follow more softly.
        const splitText = (selector: string, vars: gsap.TweenVars) => select(selector).forEach((element: HTMLElement) => {
          if (visible(element)) return;
          SplitText.create(element, {
            type: "lines", mask: "lines", autoSplit: true,
            onSplit(self) {
              self.masks.forEach(mask => { (mask as HTMLElement).style.paddingBottom = ".12em"; (mask as HTMLElement).style.marginBottom = "-.12em"; });
              return gsap.from(self.lines, { ...vars, scrollTrigger: { trigger: element, start: "top 88%", once: true } });
            },
          });
        });
        splitText(".s-title, .s-statement, .s-principle-title, .s-final h2", { yPercent: 115, duration: 1.15, stagger: .11, ease: "power4.out" });
        splitText(".s-lead, .s-lead-body", { yPercent: 100, opacity: 0, duration: .9, stagger: .07, delay: .15, ease: "power3.out" });

        // Short, one-time entrances. Anything already on screen stays visible.
        const reveal = (elements: Element[], trigger: Element, options: gsap.TweenVars = {}) => {
          if (!elements.length || visible(trigger)) return;
          const tween = gsap.from(elements, {
            opacity: 0, y: desktop ? 32 : 16, duration: .9, stagger: .08, ease: "power3.out",
            clearProps: "opacity,transform", scrollTrigger: { trigger, start: "top 90%", once: true }, ...options,
          });
          const show = () => { tween.progress(1); };
          trigger.addEventListener("focusin", show);
          cleanups.push(() => trigger.removeEventListener("focusin", show));
        };
        select("[data-enter]").forEach((item: HTMLElement) => reveal([item], item));
        select(".s-eyebrow, .s-section-label > span, .j-section-label > span").forEach((item: HTMLElement) => reveal([item], item, { y: 12 }));
        select(".s-stops, .s-tickets, .s-phases, .j-pillars, .s-principle-copy, [data-stagger]").forEach((group: HTMLElement) => {
          reveal(Array.from(group.children).filter(child => !child.matches("h2, .s-principle-rule")), group, { stagger: Number(group.dataset.stagger) || .08 });
        });
        select(".s-service-body, .s-reason-copy, .s-network-copy > :not(h2, p, .s-eyebrow), .s-final-content > :not(h2, p)").forEach((item: HTMLElement) => reveal([item], item));

        // Lines draw from left to right as they arrive.
        const draw = (elements: HTMLElement[], trigger: Element) => {
          if (!elements.length || visible(trigger)) return;
          gsap.fromTo(elements, { "--draw": 0 }, {
            "--draw": 1, duration: 1.3, stagger: .07, ease: "power3.inOut",
            scrollTrigger: { trigger, start: "top 90%", once: true },
          });
        };
        select(".j-section-label.s-draw, .s-approach-close.s-draw").forEach((line: HTMLElement) => draw([line], line));
        select(".s-service ul, .s-phase ul, .s-plan-contact, [data-draw-group]").forEach((list: HTMLElement) => {
          draw([list, ...Array.from(list.querySelectorAll<HTMLElement>(".s-draw"))].filter(el => el.classList.contains("s-draw")), list);
        });

        // Photographs open like a window while the scroll moves through them.
        select(".s-service-photo, [data-frame]").forEach((frame: HTMLElement) => {
          const photo = frame.querySelector("img");
          const badge = frame.querySelector(".s-service-icon");
          const timeline = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top bottom", end: "top 35%", scrub: .8 } })
            .fromTo(frame, { clipPath: "inset(18% 14% 18% 14% round 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0);
          if (photo) timeline.fromTo(photo, { scale: 1.35 }, { scale: 1.06, ease: "none" }, 0);
          if (badge) timeline.from(badge, { scale: 0, rotate: -90, ease: "back.out(2)", duration: .3 }, .6);
        });
        select(".s-reason-panels").forEach((panels: HTMLElement) => {
          gsap.timeline({ scrollTrigger: { trigger: panels, start: "top bottom", end: "top 25%", scrub: .8 } })
            .fromTo(panels.children, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", stagger: .15, ease: "none" }, 0)
            .fromTo(panels.querySelectorAll(".s-reason-photo"), { scale: 1.3 }, { scale: 1, stagger: .15, ease: "none" }, 0);
        });
        select(".s-principle").forEach((section: HTMLElement) => {
          const frame = section.querySelector(".s-principle-frame");
          gsap.timeline({ scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: .8 } })
            .fromTo(frame, { clipPath: desktop ? "inset(16% 26% 16% 26% round 240px)" : "inset(14% 8% 14% 8% round 120px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
            .fromTo(frame?.querySelector("img") ?? [], { scale: 1.3 }, { scale: 1, ease: "none" }, 0);
          gsap.from(section.querySelector(".s-principle-rule"), {
            scaleY: 0, duration: 1.2, ease: "power3.inOut",
            scrollTrigger: { trigger: section, start: "top 30%", once: true },
          });
        });
        select(".s-final").forEach((section: HTMLElement) => {
          const photo = section.querySelector(".s-final-photo");
          if (!photo) return;
          gsap.timeline({ scrollTrigger: { trigger: section, start: "top bottom", end: "top top", scrub: .8 } })
            .fromTo(photo, { clipPath: "inset(10% 6% 10% 6% round 24px)", scale: 1.25 }, { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, ease: "none" }, 0);
        });
        select(".s-beyond-video").forEach((video: HTMLElement) => {
          gsap.fromTo(video, { scale: 1.08, yPercent: -2 }, {
            scale: 1.04, yPercent: 2, ease: "none",
            scrollTrigger: { trigger: video.parentElement, start: "top bottom", end: "bottom top", scrub: .7 },
          });
        });

        // A plane follows the six stops; each stop lights up as it is reached.
        const route = page.querySelector<HTMLElement>(".s-route");
        if (route && desktop) {
          const stops = Array.from(route.querySelectorAll<HTMLElement>(".s-stop"));
          route.classList.add("is-live");
          const state = { p: 0 };
          route.style.setProperty("--route-progress", "0");
          gsap.to(state, {
            p: 1, ease: "none",
            scrollTrigger: { trigger: route, start: "top 80%", end: "bottom 62%", scrub: .6 },
            onUpdate: () => {
              route.style.setProperty("--route-progress", String(state.p));
              stops.forEach((stop, i) => stop.classList.toggle("is-reached", state.p >= i / (stops.length - 1) - .001));
            },
          });
          cleanups.push(() => {
            route.classList.remove("is-live");
            route.style.removeProperty("--route-progress");
            stops.forEach(stop => stop.classList.remove("is-reached"));
          });
        }

        select(".s-phases").forEach((phases: HTMLElement) => {
          const line = phases.parentElement?.querySelector(".s-phase-line > span");
          if (!line) return;
          gsap.fromTo(line, { scaleX: 0 }, {
            scaleX: 1, ease: "none",
            scrollTrigger: { trigger: phases, start: "top 85%", end: "bottom 60%", scrub: .6 },
          });
        });
        select(".s-ticket-route").forEach((ticket: HTMLElement) => {
          gsap.fromTo(ticket, { "--ticket-draw": 0 }, {
            "--ticket-draw": 1, duration: 1.4, ease: "power2.inOut",
            scrollTrigger: { trigger: ticket, start: "top 88%", once: true },
          });
        });
        // Numbers count up once; scenes read their scroll position from --progress.
        select("[data-count]").forEach((counter: HTMLElement) => {
          if (visible(counter)) return;
          const target = Number(counter.dataset.count);
          const state = { value: 0 };
          counter.textContent = "0";
          gsap.to(state, {
            value: target, duration: 1.6, ease: "power2.out",
            scrollTrigger: { trigger: counter, start: "top 90%", once: true },
            onUpdate: () => { counter.textContent = String(Math.round(state.value)); },
          });
          cleanups.push(() => { counter.textContent = String(target); });
        });
        select("[data-progress]").forEach((scene: HTMLElement) => {
          gsap.fromTo(scene, { "--progress": 0 }, {
            "--progress": 1, ease: "none",
            scrollTrigger: { trigger: scene, start: scene.dataset.progress || "top 75%", end: scene.dataset.progressEnd || "bottom 55%", scrub: .6 },
          });
        });
        select("[data-trace]").forEach((path: Element) => {
          gsap.fromTo(path, { "--trace-offset": 1 }, {
            "--trace-offset": 0, ease: "none",
            scrollTrigger: { trigger: path.closest("svg"), start: "top 85%", end: "center 45%", scrub: .8 },
          });
        });
        select(".j-map").forEach((map: Element) => {
          gsap.to(map.querySelectorAll(".j-map-route"), {
            strokeDashoffset: -35, ease: "none",
            scrollTrigger: { trigger: map, start: "top 85%", end: "bottom 15%", scrub: 1 },
          });
        });

        // The reading line along the page edge.
        gsap.fromTo(page, { "--page-progress": 0 }, {
          "--page-progress": 1, ease: "none",
          scrollTrigger: { trigger: page, start: "top top", end: "bottom bottom", scrub: .4 },
        });

        let active = true;
        // Expanding an answer changes chapter heights and the positions of later scenes.
        const refreshDetails = () => ScrollTrigger.refresh();
        select("details").forEach(details => {
          details.addEventListener("toggle", refreshDetails);
          cleanups.push(() => details.removeEventListener("toggle", refreshDetails));
        });
        document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
        return () => {
          active = false;
          cleanups.forEach(cleanup => cleanup());
        };
      });
    }

    setup().catch(error => {
      console.error("Services motion could not initialize", error);
      revert();
    });
    return () => { disposed = true; revert(); };
  }, []);

  return <div ref={root} className={`journey-page services-page ${className}`.trim()}>{children}</div>;
}
