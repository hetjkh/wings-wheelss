"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./icons";
import { pageLinks, siteLinks } from "./data";
import { NavDropdown } from "./nav-dropdown";
import { animateHomeEditorial } from "./home-editorial-motion";

export function HomeExperience({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(root);
    media.add({ desktop: "(min-width: 1000px) and (min-height: 760px)", motion: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      const animate = conditions?.motion && !paused;
      const video = root.current?.querySelector("video");
      if (animate) video?.play().catch(() => {}); else video?.pause();
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
          .from(".n-panel-copy", { y: 20, opacity: .55, stagger: .08 }, 0);
      }
      const cleanupEditorial = animateHomeEditorial(root.current!, !!desktop);
      gsap.utils.toArray<HTMLElement>("[data-home-reveal]").forEach(el => gsap.from(el, { y: 35, opacity: .15, duration: .85, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 93%", once: true } }));
      gsap.utils.toArray<HTMLElement>("[data-home-parallax]").forEach(el => gsap.fromTo(el, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: .6 } }));
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      return cleanupEditorial;
    });
    let live = true;
    document.fonts.ready.then(() => { if (live) ScrollTrigger.refresh(); });
    return () => { live = false; media.revert(); };
  }, [paused]);
  return <div ref={root} className="home-page" data-motion-paused={paused}>{children}<button type="button" className="n-motion" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Enable animations" : "Pause animations"}>{paused ? "▷" : "Ⅱ"}<span>{paused ? "Play motion" : "Pause motion"}</span></button></div>;
}

export function HomeHeader() {
  const menu = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => {
      const masked = document.querySelector(".home-page .au-hero");
      setScrolled(window.scrollY > (masked ? window.innerHeight * 1.2 : 80));
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return <><header className={`n-header${scrolled ? " is-scrolled" : ""}`}><div className="n-shell n-header-inner"><nav aria-label="Main navigation" className="n-nav">{siteLinks.slice(0,6).map(l=>l.children?<NavDropdown key={l.href} link={l} />:<Link href={l.href} key={l.href}>{l.label}</Link>)}</nav><Link href="/" className="n-brand" aria-label="Wings and Wheels home">Wings & Wheels</Link><Link className="n-button n-header-contact" href="/contact">Contact <Arrow /></Link><button type="button" className="n-menu-button" onClick={() => { menu.current?.showModal(); setOpen(true); }} aria-expanded={open} aria-controls="home-menu" aria-haspopup="dialog" aria-label="Open navigation"><span /><span /></button></div></header><dialog ref={menu} id="home-menu" className="n-menu" aria-label="Site navigation" onClose={() => setOpen(false)} onClick={e=>{if(e.target===e.currentTarget)menu.current?.close();}}><div><span className="n-brand">Wings & Wheels</span><button type="button" onClick={()=>menu.current?.close()} aria-label="Close navigation">×</button></div><nav>{pageLinks.map(l=><Link href={l.href} key={l.href} onClick={()=>menu.current?.close()}>{l.label}<Arrow /></Link>)}</nav><p>People. Places. Further together.</p></dialog></>;
}
