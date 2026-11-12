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
        phone: "(max-width: 767px)",
        tall: "(min-height: 620px)",
        reduced: "(prefers-reduced-motion: reduce)",
      }, context => {
        if (context.conditions?.reduced) return;
        const desktop = !!context.conditions?.desktop;
        const stacked = desktop && !!context.conditions?.tall;
        const select = gsap.utils.selector(page);
        const cleanups: Array<() => void> = [];
        const visible = (element: Element) => element.getBoundingClientRect().top < window.innerHeight * .9;
        // Finish illustrations before the next paper edge enters the viewport.
        // Measure in document coordinates on every refresh, including after pin spacing changes.
        const readingRange = (scene: Element, start: string, end: string) => {
          const position = (spec: string) => {
            const [edge, viewport] = spec.split(" ");
            const box = scene.getBoundingClientRect();
            const offset = edge === "bottom" ? box.height : edge === "center" ? box.height / 2 : 0;
            return box.top + window.scrollY + offset - window.innerHeight * parseFloat(viewport) / 100;
          };
          const finish = () => {
            const section = scene.closest("section");
            if (!section || section.parentElement?.classList.contains("pin-spacer")) return position(end);
            const lip = parseFloat(getComputedStyle(section, "::before").height) || 0;
            return Math.min(position(end), section.getBoundingClientRect().bottom + window.scrollY - window.innerHeight - lip - 24);
          };
          return { start: () => Math.min(position(start), finish() - window.innerHeight * .25), end: finish, invalidateOnRefresh: true };
        };

        // The opening lines rise into place once, as the page loads.
        const heroLines = select(".s-hero [data-hero]");
        if (heroLines.length) gsap.from(heroLines, {
          yPercent: 40, opacity: 0, duration: 1.1, stagger: .09, delay: .1,
          ease: "power3.out", clearProps: "opacity,transform",
        });
        const heroPhotos = select(".s-hero .j-hero-photo");
        if (heroPhotos.length) gsap.fromTo(heroPhotos, { scale: 1.14 }, { scale: 1.06, duration: 2.4, ease: "power2.out" });

        // Only interactive scenes pin. Ordinary chapters stay in document flow so
        // their final rows and scroll-driven illustrations can finish before the next tear.
        const chapters = select("main > section") as HTMLElement[];
        chapters.slice(0, -1).forEach((section, i) => {
          if (!stacked) return;
          const next = chapters[i + 1];
          // The masked header pins itself while the map opens.
          if (section.classList.contains("au-hero") || section.classList.contains("sv-final")) return;
          const hero = section.classList.contains("s-hero");
          if (hero && section.offsetHeight > window.innerHeight + 1) return;
          const tearIn = { "--top-tear-x": "-12px", "--top-tear-scale": .92 };
          const tearOut = { "--top-tear-x": "12px", "--top-tear-scale": 1, ease: "none" };
          const pinStart = () => section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top";
          // Chapters that hold the page for their own scene are covered once the scene is done.
          const coverAfter = () => {
            gsap.fromTo(next, tearIn, { ...tearOut,
              scrollTrigger: { trigger: next, start: "top 75%", end: "top 25%", scrub: true },
            });
          };

          // Interactive chapters keep scrolling; the next tear only begins after they leave.
          if (section.dataset.cover === "after") {
            coverAfter();
            return;
          }

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
            const stepAnchor = section.dataset.stepAnchor ? section.querySelector<HTMLElement>(section.dataset.stepAnchor) : null;
            // Let the larger heading scroll away, then hold the tabs below the navbar.
            // Short viewports keep native scrolling so the full film and controls remain reachable.
            if (stepAnchor && stepAnchor.offsetHeight + (section.querySelector<HTMLElement>(".sb-stage")?.offsetHeight ?? 0) + 160 > window.innerHeight) return;
            // Hold from the top so taller close copy below the stage does not delay the pin.
            const stepStart = stepAnchor
              ? () => `top+=${stepAnchor.getBoundingClientRect().top - section.getBoundingClientRect().top - 108} top`
              : "top top";
            let current = -1;
            section.classList.add("is-stepped");
            const route = section.querySelector<HTMLElement>(".s-route");
            if (route && route.offsetHeight > window.innerHeight - 140) {
              section.classList.remove("is-stepped");
              return;
            }
            const routeStage = route?.closest<HTMLElement>(".s-approach-stage");
            const routePin = routeStage && routeStage.offsetHeight <= window.innerHeight - 140 ? routeStage : route;
            const stops = route ? Array.from(route.querySelectorAll<HTMLElement>(".s-stop")) : [];
            if (route) {
              route.classList.add("is-live");
              route.style.setProperty("--route-progress", "0");
            }
            ScrollTrigger.create({
              trigger: routePin ?? section, start: route ? "top 100px" : stepStart,
              end: () => `+=${window.innerHeight * .9 * steps}`, pin: routePin ?? section, pinSpacing: true,
              anticipatePin: 1, invalidateOnRefresh: true,
              onRefresh: self => { section.dataset.stepsStart = String(self.start); section.dataset.stepsEnd = String(self.end); },
              onUpdate: self => {
                const progress = Math.min(1, self.progress / .9);
                section.style.setProperty("--steps-progress", String(progress));
                if (route && stops.length) {
                  route.style.setProperty("--route-progress", String(progress));
                  stops.forEach((stop, i) => stop.classList.toggle("is-reached", progress >= i / (stops.length - 1) - .001));
                }
                const index = Math.min(steps - 1, Math.floor(progress * steps));
                if (index === current) return;
                current = index;
                section.dispatchEvent(new CustomEvent("chapter-step", { detail: index }));
              },
            });
            coverAfter();
            cleanups.push(() => {
              section.classList.remove("is-stepped", "is-pin-active");
              section.style.removeProperty("--steps-progress");
              delete section.dataset.stepsStart;
              delete section.dataset.stepsEnd;
              if (route) {
                route.classList.remove("is-live");
                route.style.removeProperty("--route-progress");
                stops.forEach(stop => stop.classList.remove("is-reached"));
              }
            });
            return;
          }

          coverAfter();
        });

        // Growing beyond borders: editorial clip reveals — tiles stay framed, open bottom→top.
        if (page.classList.contains("franchise-page")) {
          const beyond = page.querySelector<HTMLElement>(".f-beyond");
          if (beyond && !visible(beyond)) {
            const tiles = [
              beyond.querySelector<HTMLElement>(".f-beyond-tile-main"),
              beyond.querySelector<HTMLElement>(".f-beyond-tile-top"),
              beyond.querySelector<HTMLElement>(".f-beyond-tile-bottom"),
            ].filter((tile): tile is HTMLElement => !!tile);
            const copyBits = Array.from(beyond.querySelectorAll<HTMLElement>(".f-beyond-copy > :not(h2)"));
            const caption = beyond.querySelector<HTMLElement>(".f-beyond-tile-main figcaption");
            const entrance = gsap.timeline({
              defaults: { ease: "expo.out" },
              scrollTrigger: { trigger: beyond, start: "top 75%", once: true },
            });
            tiles.forEach((tile, index) => {
              const photo = tile.querySelector("img");
              const at = index * .16;
              entrance.fromTo(tile, { clipPath: "inset(100% 0 0 0)" }, {
                clipPath: "inset(0% 0 0 0)",
                duration: desktop ? 1.35 : 1.05,
                clearProps: "clipPath",
              }, at);
              if (photo) {
                entrance.fromTo(photo, { scale: 1.14, yPercent: 8 }, {
                  scale: 1,
                  yPercent: 0,
                  duration: desktop ? 1.55 : 1.2,
                  ease: "power2.out",
                }, at);
              }
            });
            if (caption) {
              entrance.from(caption, {
                y: 18,
                opacity: 0,
                duration: .85,
                clearProps: "opacity,transform",
              }, .55);
            }
            if (copyBits.length) {
              entrance.from(copyBits, {
                y: desktop ? 22 : 16,
                opacity: 0,
                duration: .9,
                stagger: .07,
                ease: "power3.out",
                clearProps: "opacity,transform",
              }, .28);
            }
          }
        }

        // Franchise phones: markets gallery can pin; build uses a tap accordion instead.
        if (page.classList.contains("franchise-page") && context.conditions?.phone) {
          [".f-markets"].forEach(selector => {
            const section = page.querySelector<HTMLElement>(selector);
            const track = section?.querySelector<HTMLElement>(".f-market-grid");
            if (!section || !track) return;
            const count = track.children.length;
            const maps = Array.from(track.querySelectorAll<SVGSVGElement>(".f-market-map"));
            const originalViews = maps.map(map => map.getAttribute("viewBox") ?? "");
            const fitMaps = () => maps.forEach(map => {
              if (!map.clientWidth || !map.clientHeight) return;
              const height = 230 * map.clientHeight / map.clientWidth;
              map.setAttribute("viewBox", `450 ${150 - height / 2} 230 ${height}`);
            });
            const mapResize = maps.length ? new ResizeObserver(fitMaps) : null;
            maps.forEach(map => mapResize?.observe(map));
            const counter = section.querySelector<HTMLElement>("[data-gallery-count]");
            const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
            const paint = (progress: number) => {
              section.style.setProperty("--gallery-progress", String(progress));
              if (counter) counter.textContent = `${String(Math.round(progress * (count - 1)) + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
            };
            const nativeScroll = () => paint(distance() ? track.scrollLeft / distance() : 0);
            track.addEventListener("scroll", nativeScroll, { passive: true });
            if (context.conditions?.tall) {
              section.classList.add("f-mobile-pinned");
              // Enlarged type can make a gallery too short; retain the native layout then.
              if (track.clientHeight >= 270) {
                gsap.to(track, {
                  scrollLeft: distance, ease: "none",
                  scrollTrigger: {
                    id: `franchise-${section.id}`, trigger: section, start: "top top",
                    end: () => `+=${Math.max(window.innerHeight * .8, distance())}`,
                    pin: true, pinSpacing: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
                  },
                });
              } else section.classList.remove("f-mobile-pinned");
            }
            paint(0);
            cleanups.push(() => {
              track.removeEventListener("scroll", nativeScroll);
              mapResize?.disconnect();
              maps.forEach((map, index) => map.setAttribute("viewBox", originalViews[index]));
              section.classList.remove("f-mobile-pinned");
              section.style.removeProperty("--gallery-progress");
              track.scrollLeft = 0;
              if (counter) counter.textContent = `01 / ${String(count).padStart(2, "0")}`;
            });
          });
          select(".f-network-photo img").forEach((photo: HTMLElement) => {
            gsap.fromTo(photo, { scale: 1.12 }, {
              scale: 1, ease: "none",
              scrollTrigger: { trigger: photo.parentElement, start: "top bottom", end: "bottom top", scrub: .7 },
            });
          });
          select(".f-step-row li").forEach((step: HTMLElement) => {
            gsap.from(step, {
              opacity: .3, x: 18, duration: .65, ease: "power2.out",
              scrollTrigger: { trigger: step, start: "top 78%", once: true },
            });
          });
        }

        // The group arrival scene opens with the scroll; its controls remain native.
        if (page.classList.contains("groups-page") && context.conditions?.phone) {
          const scene = page.querySelector<HTMLElement>(".gm-arrival");
          if (scene) {
            gsap.fromTo(scene.querySelector(".gm-arrival-photo img"), { scale: 1.08, yPercent: -2 }, {
              scale: 1.08, yPercent: 2, ease: "none",
              scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: .7 },
            });
            gsap.fromTo(scene.querySelector(".gm-arrival-wave-top"), { scaleY: .88, transformOrigin: "100% 0%" }, {
              scaleY: 1, ease: "none",
              scrollTrigger: { trigger: scene, start: "top 90%", end: "top 25%", scrub: .65 },
            });
            gsap.fromTo(scene.querySelector(".gm-arrival-wave-bottom"), { y: 18 }, {
              y: 0, ease: "none",
              scrollTrigger: { trigger: scene.querySelector(".gm-arrival-finale"), start: "top 65%", end: "bottom 85%", scrub: .65 },
            });
            const headline = scene.querySelector(".gm-arrival-finale em");
            gsap.fromTo(headline, { y: 26, opacity: .4 }, {
              y: 0, opacity: 1, ease: "none",
              scrollTrigger: { trigger: headline, start: "top 94%", end: "top 65%", scrub: .5 },
            });
            const caption = scene.querySelector("figcaption");
            const captionReveal = gsap.fromTo(scene.querySelectorAll(".gm-arrival-summary, .gm-arrival-cta"), { y: 18, opacity: .25 }, {
              y: 0, opacity: 1, duration: .8, stagger: .12, ease: "power2.out", clearProps: "opacity,transform",
              scrollTrigger: { trigger: caption, start: "top 92%", once: true },
            });
            const showCaption = () => { captionReveal.progress(1); };
            caption?.addEventListener("focusin", showCaption);
            cleanups.push(() => caption?.removeEventListener("focusin", showCaption));
          }
        }

        // ── Corporate travel: rich mobile scroll choreography ──────────────────
        if (page.classList.contains("corporate-page") && context.conditions?.phone) {

          // 01 · Verb list: ink-fill cards slide up one by one.
          select(".k-verb-list li").forEach((item: HTMLElement, i: number) => {
            gsap.from(item, {
              opacity: 0, y: 28, duration: .75, ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 88%", once: true },
              delay: i * .06,
            });
          });

          // 02 · Services strip: swipeable dot indicator driven by native scroll.
          (() => {
            const strip = page.querySelector<HTMLElement>(".k-strip");
            if (!strip) return;
            const panels = Array.from(strip.querySelectorAll<HTMLElement>(".k-panel"));
            // Inject dot bar below the strip
            const dotsWrap = document.createElement("div");
            dotsWrap.className = "k-strip-dots";
            panels.forEach(() => dotsWrap.appendChild(Object.assign(document.createElement("span"), {})));
            strip.insertAdjacentElement("afterend", dotsWrap);
            const dots = Array.from(dotsWrap.children) as HTMLElement[];
            const paint = () => {
              const center = strip.getBoundingClientRect().left + strip.clientWidth / 2;
              const index = panels.reduce((closest, panel, i) => {
                const distance = (item: HTMLElement) => Math.abs(item.getBoundingClientRect().left + item.offsetWidth / 2 - center);
                return distance(panel) < distance(panels[closest]) ? i : closest;
              }, 0);
              dots.forEach((d, i) => d.classList.toggle("is-on", i === index));
            };
            strip.addEventListener("scroll", paint, { passive: true });
            paint();
            cleanups.push(() => { strip.removeEventListener("scroll", paint); dotsWrap.remove(); });
          })();

          // 03 · Day photos: subtle scale parallax on each card as it scrolls into view.
          select(".k-day-photos li").forEach((card: HTMLElement) => {
            const img = card.querySelector("img");
            if (!img) return;
            gsap.fromTo(img, { scale: 1.1 }, {
              scale: 1.02, ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: .6 },
            });
          });

          // Crowd icons hover entrance on companies.
          select(".k-crowd").forEach((crowd: HTMLElement) => {
            gsap.from(crowd.querySelectorAll("svg:not(.k-rotate)"), {
              opacity: 0, scale: .4, stagger: .04, duration: .5, ease: "back.out(1.8)",
              scrollTrigger: { trigger: crowd, start: "top 85%", once: true },
            });
          });

          // 05 · Team map: gentle scale-in parallax on the SVG.
          const mapFig = page.querySelector<HTMLElement>(".k-team-map");
          if (mapFig) {
            gsap.fromTo(mapFig, { scale: 1.06, opacity: .7 }, {
              scale: 1, opacity: 1, ease: "none",
              scrollTrigger: { trigger: mapFig, start: "top 90%", end: "top 35%", scrub: .7 },
            });
          }

          // 06 · Network reach cards: staggered clip-path reveal from bottom.
          select(".k-reach li").forEach((card: HTMLElement, i: number) => {
            gsap.from(card, {
              clipPath: "inset(100% 0 0 0)", opacity: .4,
              duration: .9, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 92%", once: true },
              delay: i * .08,
            });
            const img = card.querySelector("img");
            if (img) gsap.fromTo(img, { scale: 1.18 }, {
              scale: 1.04, ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: .6 },
            });
          });

          // 07 · Sides: parallax travellers only — business framing uses a fixed top offset for the face.
          select(".k-side-travellers .k-side-photo").forEach((photo: HTMLElement) => {
            gsap.fromTo(photo, { yPercent: -4 }, {
              yPercent: 4, ease: "none",
              scrollTrigger: {
                trigger: photo.closest(".k-side"),
                start: "top bottom", end: "bottom top", scrub: .8,
              },
            });
          });

          // Itinerary steps appear as the reader reaches them.
          select(".k-stair").forEach((card: HTMLElement, i: number) => {
            gsap.from(card, {
              opacity: 0, y: 20, duration: .65, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 95%", once: true },
              delay: i * .05,
            });
          });

          // Partner section: subtle entrance.
          const partner = page.querySelector<HTMLElement>(".k-partner");
          if (partner) {
            gsap.from(partner.querySelector(".k-partner-grid"), {
              y: 28, opacity: .3, duration: .9, ease: "power3.out",
              scrollTrigger: { trigger: partner, start: "top 88%", once: true },
            });
          }
        }

        // Phone scenes stay scoped to destinations and leave short screens swipeable.
        if (page.classList.contains("destinations-page") && context.conditions?.phone) {
          const section = page.querySelector<HTMLElement>(".d-featured");
          const track = section?.querySelector<HTMLElement>("[data-hscroll-track]");
          if (section && track && context.conditions?.tall) {
            section.classList.add("d-phone-pinned");
            if (section.scrollHeight <= window.innerHeight + 2) {
              gsap.to(track, {
                scrollLeft: () => Math.max(0, track.scrollWidth - track.clientWidth), ease: "none",
                scrollTrigger: {
                  trigger: section, start: "top top", end: () => `+=${track.scrollWidth - track.clientWidth}`,
                  pin: true, pinSpacing: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true,
                  onRefresh: self => { track.dataset.scrollStart = String(self.start); track.dataset.scrollEnd = String(self.end); },
                },
              });
            } else section.classList.remove("d-phone-pinned");
            cleanups.push(() => {
              section.classList.remove("d-phone-pinned");
              delete track.dataset.scrollStart;
              delete track.dataset.scrollEnd;
              track.scrollLeft = 0;
            });
          }
          select(".d-departure-board li").forEach((row: HTMLElement) => {
            gsap.from(row, { x: 20, opacity: .25, duration: .65, clearProps: "opacity,transform",
              scrollTrigger: { trigger: row, start: "top 85%", once: true } });
          });
          select(".d-dubai-scene > img, .d-planning-photo > img").forEach((photo: HTMLElement) => {
            gsap.fromTo(photo, { scale: 1.12 }, { scale: 1, ease: "none",
              scrollTrigger: { trigger: photo.parentElement, start: "top bottom", end: "bottom top", scrub: .7 } });
          });
          const season = page.querySelector<HTMLElement>(".d-seasons");
          if (season && context.conditions?.tall) {
            season.classList.add("d-phone-season");
            if (season.scrollHeight <= window.innerHeight + 2) {
              let current = -1;
              ScrollTrigger.create({
                trigger: season, start: "top top", end: () => `+=${window.innerHeight * 2.4}`,
                pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
                onRefresh: self => { season.dataset.stepsStart = String(self.start); season.dataset.stepsEnd = String(self.end); },
                onUpdate: self => {
                  season.style.setProperty("--phone-season-progress", String(self.progress));
                  const index = Math.min(3, Math.floor(self.progress * 4));
                  if (index !== current) { current = index; season.dispatchEvent(new CustomEvent("chapter-step", { detail: index })); }
                },
              });
            } else season.classList.remove("d-phone-season");
            cleanups.push(() => {
              season.classList.remove("d-phone-season");
              delete season.dataset.stepsStart; delete season.dataset.stepsEnd;
              season.style.removeProperty("--phone-season-progress");
            });
          }
          const africa = page.querySelector<HTMLElement>(".d-africa");
          if (africa) {
            gsap.fromTo(africa.querySelector(".d-africa-photo"), { scale: 1.15 }, {
              scale: 1, ease: "none", scrollTrigger: { trigger: africa, start: "top bottom", end: "bottom top", scrub: .8 },
            });
            gsap.from(africa.querySelector(".d-arcs"), {
              y: 35, opacity: .15, ease: "none", scrollTrigger: { trigger: africa, start: "top 55%", end: "center center", scrub: .6 },
            });
          }
          select(".d-mood-stage, .d-quiz, .dp-stops, .sv-pass").forEach((panel: HTMLElement) => {
            gsap.from(panel, { y: 25, opacity: .3, duration: .8, clearProps: "opacity,transform",
              scrollTrigger: { trigger: panel, start: "top 92%", once: true } });
          });
          const closing = page.querySelector<HTMLElement>(".sv-final .sv-view img");
          if (closing) gsap.fromTo(closing, { scale: 1.12 }, { scale: 1, ease: "none",
            scrollTrigger: { trigger: closing.closest(".sv-final"), start: "top bottom", end: "bottom top", scrub: .8 } });
        }

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
        splitText(".s-title, .s-statement, .s-principle-title, .s-final h2", { yPercent: 105, duration: .85, stagger: .06, ease: "power4.out" });
        splitText(".s-lead, .s-lead-body", { yPercent: 100, opacity: 0, duration: .65, stagger: { amount: .12 }, delay: .05, ease: "power3.out" });

        // Short, one-time entrances. Anything already on screen stays visible.
        const reveal = (elements: Element[], trigger: Element, options: gsap.TweenVars = {}) => {
          if (!elements.length || visible(trigger)) return;
          const tween = gsap.from(elements, {
            opacity: 0, y: desktop ? 24 : 16, duration: .7, stagger: .05, ease: "power3.out",
            clearProps: "opacity,transform", scrollTrigger: { trigger, start: "top 90%", once: true }, ...options,
          });
          const show = () => { tween.progress(1); };
          trigger.addEventListener("focusin", show);
          cleanups.push(() => trigger.removeEventListener("focusin", show));
        };
        select("[data-enter]").forEach((item: HTMLElement) => reveal([item], item));
        select(".s-eyebrow, .s-section-label > span, .j-section-label > span").forEach((item: HTMLElement) => {
          if (item.closest(".f-beyond")) return;
          reveal([item], item, { y: 12 });
        });
        select(".s-stops, .s-tickets, .s-phases, .j-pillars, .s-principle-copy, [data-stagger]").forEach((group: HTMLElement) => {
          if (group.closest(".f-beyond")) return;
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
          const destinationPhone = page.classList.contains("destinations-page") && context.conditions?.phone;
          const timeline = gsap.timeline({ scrollTrigger: { trigger: frame, start: "top bottom", end: "top 35%", scrub: .8 } })
            .fromTo(frame, { clipPath: destinationPhone ? "inset(6% 0% 6% 0%)" : "inset(18% 14% 18% 14% round 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0);
          if (photo) timeline.fromTo(photo, { scale: destinationPhone ? 1.12 : 1.35 }, { scale: 1.06, ease: "none" }, 0);
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

        // Route progress is driven by the stepped pin when data-steps is set on .s-approach.
        // Fallback scrub for pages that show the route without a pin.
        const route = page.querySelector<HTMLElement>(".s-route");
        const approach = route?.closest<HTMLElement>(".s-approach");
        if (route && desktop && !(approach && Number(approach.dataset.steps ?? 0) > 1)) {
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
            scrollTrigger: { trigger: scene, ...readingRange(scene, scene.dataset.progress || "top 75%", scene.dataset.progressEnd || "bottom 55%"), scrub: .6 },
          });
        });
        select("[data-trace]").forEach((path: Element) => {
          const drawing = path.closest("svg");
          if (!drawing) return;
          gsap.fromTo(path, { "--trace-offset": 1 }, {
            "--trace-offset": 0, ease: "none",
            scrollTrigger: { trigger: drawing, ...readingRange(drawing, "top 85%", "center 45%"), scrub: .8 },
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
        document.fonts.ready.then(() => {
          if (!active) return;
          if (page.matches(".franchise-page, .destinations-page") && context.conditions?.phone) ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
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
