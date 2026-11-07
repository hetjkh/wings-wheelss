"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteNavigation } from "./site-navigation";
import { animateHomeEditorial } from "./home-editorial-motion";
import { animateHomeReveals } from "./home-reveals";
import { observeScrollThreshold } from "./observe-scroll-threshold";

export function HomeExperience({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(root);
    media.add({ desktop: "(min-width: 1000px) and (min-height: 760px)", mobileStory: "(max-width: 767px) and (min-height: 600px)", motion: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      const animate = conditions?.motion && !paused;
      if (!animate) return;
      const desktop = conditions?.desktop;
      if (root.current?.querySelector(".n-hero")) {
        const hero = gsap.timeline({ scrollTrigger: { id: "home-hero", trigger: ".n-hero", start: "top top", end: () => `+=${window.innerHeight * (desktop ? .7 : .6)}`, pin: !!desktop, scrub: .7, invalidateOnRefresh: true, refreshPriority: 4 } });
        hero.to(".n-hero-visual", { scale: 1.12, ease: "none" }, 0).to(".n-hero-copy", { y: -70, opacity: .15, ease: "none" }, 0).to(".n-hero-shade", { opacity: .75 }, 0);
      }
      gsap.from(".n-travel-heading h2", { y: 35, ease: "none", scrollTrigger: { trigger: ".n-travel-heading", start: "top bottom", end: "center center", scrub: .6 } });
      if (desktop) {
        // Let the heading and both panels enter before holding this taller-than-screen chapter.
        const pair = gsap.timeline({ scrollTrigger: { id: "home-travel", trigger: ".n-travel-chapter", start: "bottom bottom", end: () => `+=${window.innerHeight * .75}`, pin: true, scrub: .65, invalidateOnRefresh: true, refreshPriority: 3 } });
        pair.fromTo(".n-travel-panel:first-child .n-panel-photo", { yPercent: -4, scale: 1.05 }, { yPercent: 4, scale: 1, ease: "none" }, 0)
          .fromTo(".n-travel-panel:last-child .n-panel-photo", { yPercent: 4, scale: 1.05 }, { yPercent: -4, scale: 1, ease: "none" }, 0)
          .from(".n-panel-copy", { y: 20, stagger: .08 }, 0);
      } else if (conditions?.mobileStory) {
        gsap.utils.toArray<HTMLElement>(".n-travel-panel", root.current).forEach(panel => {
          const photo = panel.querySelector<HTMLElement>(".n-panel-photo");
          const copy = panel.querySelector<HTMLElement>(".n-panel-copy");
          if (photo) gsap.fromTo(photo, { yPercent: -5, scale: 1.08 }, { yPercent: 5, scale: 1, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: .7 } });
          if (copy) gsap.from(copy, { y: 35, ease: "none", scrollTrigger: { trigger: panel, start: "top 85%", end: "top 35%", scrub: .6 } });
        });
      }
      const cleanupEditorial = animateHomeEditorial(root.current!, !!desktop);
      const cleanupReveals = animateHomeReveals(root.current!);
      gsap.utils.toArray<HTMLElement>("[data-home-reveal]").forEach(el => gsap.from(el, { y: 28, opacity: 0, duration: .95, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 93%", once: true } }));
      gsap.utils.toArray<HTMLElement>("[data-home-parallax]").forEach(el => gsap.fromTo(el, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: .6 } }));
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      return () => { cleanupReveals(); cleanupEditorial(); };
    });
    let live = true;
    const page = root.current;
    const refresh = () => ScrollTrigger.refresh();
    page?.addEventListener("home-layout-change", refresh);
    document.fonts.ready.then(() => { if (live) ScrollTrigger.refresh(); });
    return () => { live = false; page?.removeEventListener("home-layout-change", refresh); media.revert(); };
  }, [paused]);
  return <div ref={root} className="home-page" data-motion-paused={paused}>{children}<button type="button" className="n-motion" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Enable animations" : "Pause animations"}>{paused ? "▷" : "Ⅱ"}<span>{paused ? "Play motion" : "Pause motion"}</span></button></div>;
}

export function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const masked = document.querySelector(".home-page .au-hero");
    return observeScrollThreshold(
      () => masked ? masked.getBoundingClientRect().bottom <= 80 : window.scrollY > 80,
      setScrolled,
    );
  }, []);
  return <SiteNavigation scrolled={scrolled} />;
}
