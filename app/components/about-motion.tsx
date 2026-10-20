"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = root.current;
    if (!page) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = <T extends Element = HTMLElement>(selector: string) => Array.from(page.querySelectorAll<T>(selector));
    const one = <T extends Element = HTMLElement>(selector: string) => page.querySelector<T>(selector);
    const media = gsap.matchMedia(page);

    media.add({
      desktop: "(min-width: 992px) and (min-height: 640px)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, context => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const cleanups: (() => void)[] = [];

      // The ink and cream hero copies must animate in lockstep, so stagger within each copy.
      gsap.from(q(".au-hero-title .au-line > span"), { yPercent: 110, duration: 1.15, stagger: index => (index % 5) * .08, ease: "power4.out", delay: .1 });
      gsap.from(q(".au-hero-eyebrow, .au-hero-aside > *"), { y: 24, opacity: 0, duration: .9, stagger: index => (index % 3) * .1, ease: "power3.out", delay: .45 });
      gsap.from(q(".au-hero-photo img"), { scale: 1.3, duration: 1.8, ease: "power3.out" });

      const hero = one(".au-hero");
      const heroInner = one(".au-hero-photo-inner");
      const shell = one(".au-hero-inner");
      if (hero && heroInner && shell && desktop) {
        // Centred text in the map slides out to the page's left edge; offsetLeft ignores the title's scale.
        const travellers = q(".au-hero-eyebrow, .au-hero-title .au-line, .au-hero-aside");
        gsap.timeline({ scrollTrigger: { id: "about-hero", trigger: hero, start: "top top", end: "+=120%", pin: true, scrub: .8, anticipatePin: 1, invalidateOnRefresh: true } })
          .fromTo(q(".au-hero-photo, .au-hero-ghost"), { "--map": 1 }, { "--map": 34, ease: "power2.in", duration: 1 }, 0)
          .fromTo(page, { "--hero-fg": "#3d2d20" }, { "--hero-fg": "#fff8e9", ease: "none", duration: .25 }, .3)
          .fromTo(heroInner, { scale: 1.16 }, { scale: 1, ease: "none", duration: 1 }, 0)
          .fromTo(one(".au-hero-shade"), { opacity: .35 }, { opacity: 1, ease: "none", duration: 1 }, 0)
          .fromTo(one(".au-hero-title"), { scale: .74 }, { scale: 1, ease: "power2.inOut", duration: .7 }, .28)
          .fromTo(travellers, { x: 0 }, { x: (_, element: HTMLElement) => -element.offsetLeft, ease: "power2.inOut", duration: .7, stagger: .03 }, .28)
          .to(one(".au-hero-scroll"), { opacity: 0, duration: .15 }, 0);

        const xTo = gsap.quickTo(heroInner, "x", { duration: 1, ease: "power3" });
        const yTo = gsap.quickTo(heroInner, "y", { duration: 1, ease: "power3" });
        const drift = (event: PointerEvent) => {
          const box = hero.getBoundingClientRect();
          xTo(((event.clientX - box.left) / box.width - .5) * -28);
          yTo(((event.clientY - box.top) / box.height - .5) * -18);
        };
        hero.addEventListener("pointermove", drift);
        cleanups.push(() => hero.removeEventListener("pointermove", drift));
      }

      const heroCta = one(".au-hero-inner .au-cta");
      const ghostCta = one(".au-hero-ghost .au-cta");
      if (heroCta && ghostCta) {
        const on = () => ghostCta.classList.add("is-hover");
        const off = () => ghostCta.classList.remove("is-hover");
        heroCta.addEventListener("pointerenter", on);
        heroCta.addEventListener("pointerleave", off);
        heroCta.addEventListener("focus", on);
        heroCta.addEventListener("blur", off);
        cleanups.push(() => {
          heroCta.removeEventListener("pointerenter", on);
          heroCta.removeEventListener("pointerleave", off);
          heroCta.removeEventListener("focus", on);
          heroCta.removeEventListener("blur", off);
        });
      }

      q("[data-lines]").forEach(heading => gsap.from(heading.querySelectorAll(".au-line > span"), {
        yPercent: 110, duration: 1.1, stagger: .1, ease: "power4.out",
        scrollTrigger: { trigger: heading, start: "top 88%", once: true },
      }));
      q("[data-au-reveal]").forEach(element => gsap.from(element, {
        y: 34, opacity: 0, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 92%", once: true },
      }));

      const ink = one(".au-who-ink");
      if (ink) gsap.fromTo(ink.querySelectorAll(".au-ink"), { color: "#cdbfac" }, {
        color: "#3d2d20", stagger: .05, ease: "none",
        scrollTrigger: { trigger: ink, start: "top 80%", end: "bottom 45%", scrub: .5 },
      });
      gsap.from(q(".au-aud-row"), { y: 40, opacity: 0, duration: .8, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: one(".au-aud"), start: "top 85%", once: true } });

      const process = one(".au-process");
      const track = one(".au-process-track");
      if (process && track && desktop) {
        process.classList.add("is-pinned");
        const passes = q(".au-pass-wrap");
        const counter = one(".au-process-count");
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const move = gsap.to(track, {
          x: () => -distance(), ease: "none",
          scrollTrigger: {
            id: "about-process", trigger: process, start: "top top", end: () => `+=${distance()}`,
            pin: true, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: self => {
              process.style.setProperty("--p", self.progress.toFixed(4));
              const current = Math.min(passes.length - 1, Math.round(self.progress * (passes.length - 1)));
              if (counter) counter.textContent = `0${current + 1} / 0${passes.length}`;
              passes.forEach((pass, index) => pass.classList.toggle("is-current", index === current));
            },
          },
        });
        passes.forEach((pass, index) => gsap.fromTo(pass, { rotate: index % 2 ? 4 : -4, y: 60, scale: .9 }, {
          rotate: 0, y: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: pass, containerAnimation: move, start: "left 100%", end: "center 62%", scrub: true },
        }));
        cleanups.push(() => {
          process.classList.remove("is-pinned");
          process.style.removeProperty("--p");
          passes.forEach(pass => pass.classList.remove("is-current"));
        });
      }

      const story = one(".au-story");
      const stack = one(".au-story-stack");
      if (story && stack && desktop) {
        story.classList.add("is-pinned");
        const photos = Array.from(stack.querySelectorAll<HTMLElement>(".au-polaroid"));
        const chapters = q(".au-chapter");
        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "about-story", trigger: story, start: "top top", end: "+=180%", pin: true, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: self => {
              const current = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length * .999));
              chapters.forEach((chapter, index) => chapter.classList.toggle("is-active", index === current));
            },
          },
        });
        timeline.fromTo(photos[0], { scale: .9, rotate: -6 }, { scale: 1, rotate: 0, ease: "power2.out", duration: .6 }, 0);
        photos.slice(1).forEach((photo, offset) => {
          const at = offset + 1;
          timeline
            .fromTo(photo, { xPercent: 130, yPercent: 50, rotate: 28, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: 0, opacity: 1, ease: "power3.out", duration: .7 }, at - .2)
            .to(photos.slice(0, at), { scale: index => .94 - (at - 1 - index) * .03, yPercent: -3, ease: "power2.out", duration: .7 }, at - .2);
        });
        timeline.to({}, { duration: .4 });
        cleanups.push(() => {
          story.classList.remove("is-pinned");
          chapters.forEach((chapter, index) => chapter.classList.toggle("is-active", index === 0));
        });
      } else if (stack) gsap.from(stack.querySelectorAll(".au-polaroid"), {
        xPercent: index => [70, 0, -70][index] ?? 0, yPercent: index => [26, 40, 18][index] ?? 0,
        rotate: index => [12, -8, -14][index] ?? 0, opacity: 0, stagger: .1, ease: "none",
        scrollTrigger: { trigger: stack, start: "top 88%", end: "center 52%", scrub: .8 },
      });
      q(".au-words li").forEach(row => gsap.fromTo(row, { "--f": 0 }, {
        "--f": 1, ease: "none",
        scrollTrigger: { trigger: row, start: "top 90%", end: "top 48%", scrub: .6 },
      }));

      const map = one(".au-map");
      if (map) gsap.fromTo(map.querySelectorAll(".au-map-draw"), { strokeDashoffset: 1 }, {
        strokeDashoffset: 0, stagger: .14, ease: "none",
        scrollTrigger: { trigger: map, start: "top 82%", end: "center 48%", scrub: .8 },
      });
      q(".au-net-row").forEach((row, index) => gsap.fromTo(row, { xPercent: index ? 14 : -14 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: row, start: "top bottom", end: "top 50%", scrub: .8 },
      }));

      const principles = one(".au-principles");
      if (principles) {
        const items = q(".au-principle");
        const cards = items.map(item => item.querySelector<HTMLElement>(".au-principle-card"));
        const steps = q(".au-values-steps li");
        let stickTops: number[] = [];
        const measure = () => { stickTops = items.map(item => parseFloat(getComputedStyle(item).top) || 0); };
        const stackCards = () => {
          let current = 0;
          items.forEach((item, index) => {
            if (item.getBoundingClientRect().top < window.innerHeight * .6) current = index;
            const next = items[index + 1];
            const card = cards[index];
            if (!next || !card) return;
            const span = Math.max(1, window.innerHeight - (stickTops[index + 1] ?? 0));
            const amount = gsap.utils.clamp(0, 1, (window.innerHeight - next.getBoundingClientRect().top) / span);
            card.style.transform = `scale(${1 - amount * .08})`;
            card.style.filter = `brightness(${1 - amount * .14})`;
          });
          steps.forEach((step, index) => step.classList.toggle("is-active", index === current));
        };
        measure();
        ScrollTrigger.create({ trigger: principles, start: "top bottom", end: "bottom top", onUpdate: stackCards, onRefresh: () => { measure(); stackCards(); } });
        cleanups.push(() => cards.forEach(card => { if (card) { card.style.transform = ""; card.style.filter = ""; } }));
      }

      const core = one(".au-core");
      if (core) {
        const skew = { value: 0 };
        const paint = () => core.style.setProperty("--skew", `${skew.value.toFixed(2)}deg`);
        ScrollTrigger.create({
          trigger: core, start: "top bottom", end: "bottom top",
          onUpdate: self => {
            const value = gsap.utils.clamp(-9, 9, self.getVelocity() / -260);
            gsap.to(skew, { value, duration: .25, overwrite: true, onUpdate: paint, onComplete: () => { gsap.to(skew, { value: 0, duration: .9, ease: "power3.out", onUpdate: paint }); } });
          },
        });
        cleanups.push(() => core.style.removeProperty("--skew"));
      }

      const stage = one(".au-split-stage");
      if (stage && desktop) gsap.fromTo(stage, { clipPath: "inset(9% 6% 9% 6% round 32px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: stage, start: "top bottom", end: "top top", scrub: .6 },
      });
      gsap.from(q(".au-split-copy > *"), { y: 40, opacity: 0, duration: .9, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: stage, start: "top 45%", once: true } });

      q(".au-crew-photo").forEach((photo, index) => gsap.fromTo(photo, { clipPath: "inset(100% 0% 0% 0%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", ease: "none",
        scrollTrigger: { trigger: photo, start: `top ${96 - index * 4}%`, end: "top 45%", scrub: .7 },
      }));
      if (desktop) q(".au-crew-card").forEach((card, index) => gsap.fromTo(card, { y: [40, 110, 70][index] ?? 60 }, {
        y: [-20, -60, -35][index] ?? -30, ease: "none",
        scrollTrigger: { trigger: one(".au-crew"), start: "top bottom", end: "bottom top", scrub: true },
      }));
      const stamp = one(".au-people-stamp");
      if (stamp) gsap.from(stamp, { scale: 0, rotate: -120, duration: 1.1, ease: "back.out(1.6)", scrollTrigger: { trigger: stamp, start: "top 85%", once: true } });

      q<HTMLElement>("[data-count]").forEach(element => {
        const end = Number(element.dataset.count);
        const suffix = element.dataset.suffix ?? "";
        const counter = { value: 0 };
        element.textContent = `0${suffix}`;
        gsap.to(counter, {
          value: end, duration: 1.8, ease: "power2.out",
          onUpdate: () => { element.textContent = `${Math.round(counter.value)}${suffix}`; },
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
        cleanups.push(() => { element.textContent = `${end}${suffix}`; });
      });

      const closing = one(".au-closing");
      if (closing) q(".au-closing-line").forEach((line, index) => gsap.fromTo(line, { xPercent: index ? 22 : -22 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: closing, start: "top bottom", end: "bottom 75%", scrub: .8 },
      }));

      // Triggers below the pins were created first; sort so pin spacing is applied before their starts are measured.
      ScrollTrigger.sort();
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => cleanups.forEach(cleanup => cleanup());
    });

    return () => media.revert();
  }, []);

  return <div ref={root} className="journey-page about-page">{children}</div>;
}
