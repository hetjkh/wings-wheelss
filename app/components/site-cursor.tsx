"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import "./site-cursor.css";

/** Tweak these two values. Fluid wake lives in fluid-cursor.tsx. */
const PLANE_SIZE = 42;
const FOLLOW_LAG = .22;

/** Plane + expanding hover ring. The fluid wake renders behind this. */
export function SiteCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const orbit = useRef<SVGTextPathElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ring = cursor.current!;
    const craft = plane.current!;
    const text = label.current!;
    const orbitText = orbit.current!;
    const html = document.documentElement;
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let ringOn = false;
    let planeOn = false;
    let inside = false;
    let x = 0, y = 0;
    let planeX = 0, planeY = 0;
    let angle = 0, targetAngle = 0;
    let lastX = 0, lastY = 0;
    let previousTarget: Element | null = null;
    let previousMessage = "";

    const hideRing = () => {
      ringOn = false;
      previousTarget = null;
      ring.dataset.visible = "false";
      ring.dataset.mode = "idle";
      ring.dataset.pressed = "false";
    };
    const hidePlane = () => {
      planeOn = false;
      craft.dataset.visible = "false";
    };
    const hideAll = () => {
      hideRing();
      hidePlane();
      html.classList.remove("has-art-cursor");
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const permitted = () => fine.matches && !document.hidden && !document.querySelector('[data-motion-paused="true"]');
    const overNative = (target: Element | null) =>
      !target || !!target.closest('input, textarea, select, [contenteditable="true"], iframe, video[controls], dialog[open], [data-cursor="native"]');

    const targetAtPointer = () => {
      const target = document.elementFromPoint(x, y);
      if (overNative(target)) {
        hideAll();
        return false;
      }

      if (target !== previousTarget) {
        previousTarget = target;
        const action = target?.closest<HTMLElement>('a, button, summary, [role="button"], [data-cursor]');
        const disabled = action?.matches(':disabled, [aria-disabled="true"]');
        const explicit = action?.getAttribute("data-cursor");
        const href = action?.getAttribute("href") ?? "";
        const message = disabled ? "" : explicit ?? (action?.matches("a") && action.querySelector("img") ? (href.startsWith("/blog/") ? "Read story" : "View") : "");
        text.textContent = message;
        if (message !== previousMessage) {
          previousMessage = message;
          const unit = `${(message || "Explore").trim()} · `;
          orbitText.textContent = unit.repeat(Math.max(3, Math.ceil(28 / Math.max(unit.length, 1))));
        }
        ring.dataset.mode = message ? "label" : action && !disabled ? "link" : "idle";
      }

      const interactive = ring.dataset.mode !== "idle";
      if (interactive) {
        if (!ringOn) {
          ringOn = true;
          ring.dataset.visible = "true";
        }
      } else if (ringOn) hideRing();

      if (!planeOn) {
        planeX = x;
        planeY = y;
        lastX = x;
        lastY = y;
        planeOn = true;
        craft.dataset.visible = "true";
      }
      html.classList.add("has-art-cursor");
      craft.dataset.boost = interactive && ring.dataset.mode === "link" ? "true" : "false";
      craft.dataset.hidden = ring.dataset.mode === "label" ? "true" : "false";
      return true;
    };

    const draw = () => {
      frame = 0;
      if (!inside || !permitted()) { hideAll(); return; }
      if (!targetAtPointer()) return;

      const dx = x - lastX;
      const dy = y - lastY;
      if (dx * dx + dy * dy >= 4) {
        targetAngle = Math.atan2(dy, dx) * 180 / Math.PI;
        lastX = x;
        lastY = y;
      }

      planeX += (x - planeX) * FOLLOW_LAG;
      planeY += (y - planeY) * FOLLOW_LAG;

      let delta = ((targetAngle - angle + 540) % 360) - 180;
      angle += delta * .25;

      craft.style.transform = `translate3d(${planeX}px, ${planeY}px, 0) rotate(${angle}deg)`;
      if (ringOn) ring.style.transform = `translate3d(${planeX}px, ${planeY}px, 0)`;

      frame = requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!frame && inside && permitted()) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") { inside = false; hideAll(); return; }
      inside = true;
      x = event.clientX;
      y = event.clientY;
      schedule();
    };
    const leave = () => { inside = false; hideAll(); };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") leave(); };
    const press = () => { ring.dataset.pressed = "true"; };
    const release = () => { ring.dataset.pressed = "false"; };
    const sync = () => { if (!permitted()) hideAll(); else schedule(); };

    const observer = new MutationObserver(sync);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-motion-paused"] });
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("keydown", keyboard);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("blur", leave);
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      hideAll();
      observer.disconnect();
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("blur", leave);
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [pathname]);

  return <>
    <div
      ref={plane}
      className="site-cursor-plane"
      aria-hidden="true"
      data-visible="false"
      data-hidden="false"
      data-boost="false"
      style={{ "--plane-size": `${PLANE_SIZE}px` } as CSSProperties}
    >
      <svg className="site-cursor-jet" viewBox="0 0 48 48" width={PLANE_SIZE} height={PLANE_SIZE} aria-hidden="true">
        <path
          d="M47 24C47 25.2 44.5 26 42 26.2L27 26.2L16 41L11 41L16 26.2L8 26.2L5 31L2 31L4 24L2 17L5 17L8 21.8L16 21.8L11 7L16 7L27 21.8L42 21.8C44.5 22 47 22.8 47 24Z"
          fill="#fff"
          stroke="rgba(18,48,74,.6)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div ref={cursor} className="site-cursor" aria-hidden="true" data-mode="idle" data-visible="false">
      <div className="site-cursor-face">
        <span ref={label} />
        <svg className="site-cursor-arrow" viewBox="0 0 16 16" fill="none"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.25" /></svg>
        <svg className="site-cursor-orbit" viewBox="0 0 140 140" aria-hidden="true">
          <defs>
            <path id="site-cursor-orbit-path" d="M70 70 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
          </defs>
          <g className="site-cursor-spin">
            <text>
              <textPath ref={orbit} href="#site-cursor-orbit-path">Explore · Explore · Explore · Explore ·</textPath>
            </text>
          </g>
          <circle cx="70" cy="70" r="30" />
          <path d="M62 78 78 62M64 62h16v16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  </>;
}
