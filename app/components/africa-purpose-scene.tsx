"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import "./africa-purpose-scene.css";

const chapters = [
  { title: "Business", text: "Meetings, projects and regional travel.", detail: "Across borders. Ahead of business.", photo: "/images/africa-purposes/business-background-v2.webp", subject: "/images/africa-purposes/business-travellers-v2.webp", foreground: "/images/africa-purposes/business-frame.webp", alt: "An open airport lounge overlooking the apron at dawn", position: "50% 50%", href: "/corporate-travel", link: "Explore business travel" },
  { title: "Safari", text: "Wildlife and extraordinary landscapes.", detail: "A little closer to the extraordinary.", photo: "/images/africa-scene/savannah.webp", subject: "/images/africa-purposes/safari-zebras-v2.webp", foreground: "/images/africa-scene/grasses.webp", alt: "Golden East African savannah beneath distant mountains at dawn", position: "50% 50%", href: "/destinations/kenya", link: "Discover safari journeys" },
  { title: "Family", text: "Holidays and journeys together.", detail: "The moments you take home together.", photo: "/images/africa-purposes/family-background-v2.webp", subject: "/images/africa-purposes/family-travellers-v2.webp", foreground: "/images/africa-purposes/family-palms.webp", alt: "A quiet Zanzibar beach beside the turquoise Indian Ocean", position: "50% 50%", href: "/destinations/tanzania", link: "Explore family escapes" },
  { title: "Groups & MICE", text: "Conferences, exhibitions and delegations.", detail: "Shared ambitions. Connected journeys.", photo: "/images/africa-purposes/groups-background-v2.webp", subject: "/images/africa-purposes/groups-delegates-v2.webp", foreground: null, alt: "A spacious conference hotel foyer with warm timber and tropical gardens", position: "50% 50%", href: "/groups-mice", link: "Plan a group journey" },
];

export function AfricaPurposeScene() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const scene = root.current;
    if (!scene) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let visible = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    const paint = () => {
      frame = 0;
      if (!visible || reduced.matches) return;
      const bounds = scene.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - window.innerHeight)));
      const chapter = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      const local = Math.min(1, progress * chapters.length - chapter);
      setActive(previous => previous === chapter ? previous : chapter);
      x += (targetX - x) * .08;
      y += (targetY - y) * .08;
      scene.style.setProperty("--purpose-x", `${x.toFixed(3)}px`);
      scene.style.setProperty("--purpose-y", `${y.toFixed(3)}px`);
      scene.style.setProperty("--purpose-drift", `${((local - .5) * 100).toFixed(2)}px`);
      scene.style.setProperty("--purpose-progress", String(local));
      scene.style.setProperty("--purpose-reveal", String(Math.min(1, local / .38)));
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .03) schedule();
    };
    const schedule = () => {
      if (!frame && visible && !reduced.matches) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType === "touch") return;
      targetX = (event.clientX / window.innerWidth - .5) * 28;
      targetY = (event.clientY / window.innerHeight - .5) * 20;
      schedule();
    };
    const leave = () => { targetX = 0; targetY = 0; schedule(); };
    const preference = () => {
      setEnhanced(!reduced.matches);
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        ["--purpose-x", "--purpose-y", "--purpose-drift", "--purpose-progress", "--purpose-reveal"].forEach(name => scene.style.removeProperty(name));
      } else schedule();
    };
    preference();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(scene);
    scene.addEventListener("pointermove", move, { passive: true });
    scene.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", preference);
    };
  }, []);

  const jump = (index: number) => {
    const scene = root.current;
    if (!scene) return;
    const bounds = scene.getBoundingClientRect();
    const distance = Math.max(0, bounds.height - window.innerHeight);
    window.scrollTo({ top: window.scrollY + bounds.top + distance * ((index + .12) / chapters.length), behavior: "smooth" });
  };

  return <div ref={root} className={`a-purpose-scene${enhanced ? " is-interactive" : ""}`} role="region" aria-label="Four ways to travel Africa">
    <div className="a-purpose-stage">
      {chapters.map((chapter, index) => <article key={chapter.title} className={`a-purpose-slide a-purpose-slide-${index}`} data-active={active === index} aria-hidden={enhanced && active !== index} inert={enhanced && active !== index} aria-labelledby={`africa-purpose-${index}`} style={{ "--purpose-position": chapter.position } as CSSProperties}>
        <div className="a-purpose-background"><Image src={chapter.photo} alt={chapter.alt} fill sizes="100vw" quality={90} loading="eager" /></div>
        <div className="a-purpose-shade" aria-hidden="true" />
        <div className="a-purpose-heading">
          <span className="a-purpose-kicker">{String(index + 1).padStart(2, "0")} / Find your reason</span>
          <h3 id={`africa-purpose-${index}`}>{chapter.title}</h3>
        </div>
        <div className="a-purpose-subject" aria-hidden="true"><Image src={chapter.subject} alt="" fill sizes="(max-width: 700px) 250vw, 110vw" quality={90} loading="eager" /></div>
        {chapter.foreground && <div className="a-purpose-depth" aria-hidden="true"><Image src={chapter.foreground} alt="" fill sizes="100vw" loading="eager" /></div>}
        <div className="a-purpose-description">
          <span>{chapter.detail}</span>
          <p>{chapter.text}</p>
          <a href={chapter.href}>{chapter.link}<span aria-hidden="true">↗</span></a>
        </div>
      </article>)}
      <nav className="a-purpose-navigation" aria-label="Choose a travel chapter">
        {chapters.map((chapter, index) => <button type="button" key={chapter.title} aria-current={active === index ? "step" : undefined} onClick={() => jump(index)} onKeyDown={event => {
          const target = event.key === "ArrowRight" ? (index + 1) % chapters.length : event.key === "ArrowLeft" ? (index + chapters.length - 1) % chapters.length : event.key === "Home" ? 0 : event.key === "End" ? chapters.length - 1 : -1;
          if (target < 0) return;
          event.preventDefault();
          (event.currentTarget.parentElement?.children[target] as HTMLButtonElement)?.focus();
          jump(target);
        }}><span className="a-purpose-nav-number">{String(index + 1).padStart(2, "0")}</span><span>{chapter.title}</span><span className="a-purpose-nav-track" aria-hidden="true"><span /></span></button>)}
      </nav>
      <span className="a-purpose-scroll" aria-hidden="true">Scroll to explore <span>↓</span></span>
    </div>
  </div>;
}
