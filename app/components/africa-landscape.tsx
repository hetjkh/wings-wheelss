"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import "./africa-landscape.css";

/** A photographic depth scene: sky, type, wildlife, copy, then foreground. */
export function AfricaLandscape() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = root.current;
    if (!scene) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let visible = false;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      if (reduced.matches || !visible) return;
      const bounds = scene.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - window.innerHeight)));
      x += (targetX - x) * .075;
      y += (targetY - y) * .075;
      scene.style.setProperty("--scene-progress", String(progress));
      scene.style.setProperty("--scene-x", `${x.toFixed(3)}px`);
      scene.style.setProperty("--scene-y", `${y.toFixed(3)}px`);
      scene.style.setProperty("--scene-reveal", String(Math.min(1, progress / .48)));
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .03) schedule();
    };
    const schedule = () => {
      if (!frame && visible && !reduced.matches) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      const bounds = scene.getBoundingClientRect();
      targetX = (event.clientX / window.innerWidth - .5) * 26;
      targetY = ((event.clientY - Math.max(0, bounds.top)) / window.innerHeight - .5) * 18;
      schedule();
    };
    const leave = () => { targetX = 0; targetY = 0; schedule(); };
    const preferences = () => {
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        scene.style.removeProperty("--scene-progress");
        scene.style.removeProperty("--scene-reveal");
        scene.style.removeProperty("--scene-x");
        scene.style.removeProperty("--scene-y");
      } else schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(scene);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    scene.addEventListener("pointermove", move, { passive: true });
    scene.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", preferences);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", preferences);
    };
  }, []);

  return <section className="a-landscape s-hero" id="top" ref={root} aria-labelledby="africa-landscape-heading">
    <div className="a-landscape-stage">
      <div className="a-landscape-backdrop" aria-hidden="true">
        <Image src="/images/africa-scene/savannah.webp" alt="" fill sizes="100vw" preload />
      </div>
      <div className="a-landscape-atmosphere" aria-hidden="true" />
      <div className="a-landscape-title">
        <span className="a-landscape-eyebrow" data-hero>A continent of possibilities</span>
        <h1 id="africa-landscape-heading" data-hero>AFRICA</h1>
      </div>
      <div className="a-landscape-wildlife" aria-hidden="true">
        <Image src="/images/africa-scene/elephants.webp" alt="" fill sizes="100vw" loading="eager" />
      </div>
      <div className="a-landscape-story">
        <span className="a-landscape-eyebrow">Beyond the expected</span>
        <p>One continent.<br /><em>Endless ways to feel alive.</em></p>
        <a href="#destinations">Find your Africa <span aria-hidden="true">↗</span></a>
      </div>
      <div className="a-landscape-foreground" aria-hidden="true">
        <Image src="/images/africa-scene/grasses.webp" alt="" fill sizes="100vw" loading="eager" />
      </div>
      <div className="a-landscape-footer">
        <span>Wild places. Real connections.</span>
        <span className="a-landscape-scroll">Scroll to discover <span aria-hidden="true">↓</span></span>
        <span>East Africa &amp; beyond</span>
      </div>
    </div>
  </section>;
}
