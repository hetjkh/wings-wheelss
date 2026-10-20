"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./partnership-hero-scene.css";

export function PartnershipHeroScene() {
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = backdrop.current?.closest("section");
    if (!hero) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let visible = true;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      frame = 0;
      if (!visible || reduced.matches) return;
      x += (targetX - x) * .065;
      y += (targetY - y) * .065;
      hero.style.setProperty("--partner-x", `${x.toFixed(3)}px`);
      hero.style.setProperty("--partner-y", `${y.toFixed(3)}px`);
      hero.style.setProperty("--partner-scroll", String(Math.max(0, Math.min(1, window.scrollY / window.innerHeight))));
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .03) schedule();
    };
    const schedule = () => {
      if (!frame && visible && !reduced.matches) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType === "touch") return;
      const bounds = hero.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 28;
      targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 20;
      schedule();
    };
    const leave = () => { targetX = 0; targetY = 0; schedule(); };
    const preference = () => {
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        ["--partner-x", "--partner-y", "--partner-scroll"].forEach(name => hero.style.removeProperty(name));
      } else schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(hero);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", preference);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", preference);
      ["--partner-x", "--partner-y", "--partner-scroll"].forEach(name => hero.style.removeProperty(name));
    };
  }, []);

  return <>
    <div className="j-hero-photo p-hero-scene" ref={backdrop} aria-hidden="true">
      <div className="p-hero-lounge"><Image src="/images/partnership-hero/editorial-lounge-v2.webp" alt="" fill sizes="100vw" quality={90} preload /></div>
      <div className="p-hero-room"><Image src="/images/partnership-hero/grounded-room-v2.webp" alt="" fill sizes="100vw" quality={90} loading="eager" /></div>
    </div>
    <div className="p-hero-foreground" aria-hidden="true"><Image src="/images/partnership-hero/foliage-v2.webp" alt="" fill sizes="100vw" loading="eager" /></div>
  </>;
}
