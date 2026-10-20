"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./africa-hero-scene.css";

export function AfricaHeroScene() {
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
      if (reduced.matches || !visible) return;
      x += (targetX - x) * .065;
      y += (targetY - y) * .065;
      hero.style.setProperty("--hero-x", `${x.toFixed(3)}px`);
      hero.style.setProperty("--hero-y", `${y.toFixed(3)}px`);
      hero.style.setProperty("--hero-scroll", String(Math.min(1, Math.max(0, window.scrollY / window.innerHeight))));
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
        ["--hero-x", "--hero-y", "--hero-scroll"].forEach(name => hero.style.removeProperty(name));
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
      ["--hero-x", "--hero-y", "--hero-scroll"].forEach(name => hero.style.removeProperty(name));
    };
  }, []);

  return <>
    <div className="a-hero-scene" ref={backdrop} aria-hidden="true">
      <Image src="/images/africa-hero/waterhole-master.webp" alt="" fill sizes="100vw" preload quality={90} />
    </div>
    <div className="a-hero-waterhole-ground" aria-hidden="true">
      <Image src="/images/africa-hero/waterhole-ground.webp" alt="" fill sizes="100vw" quality={90} loading="eager" />
    </div>
    <div className="a-hero-reeds" aria-hidden="true">
      <Image src="/images/africa-hero/waterhole-reeds.webp" alt="" fill sizes="100vw" loading="eager" />
    </div>
  </>;
}
