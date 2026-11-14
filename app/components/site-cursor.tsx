"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "./site-cursor.css";

/** A quiet pointer companion; delegated targets also work in dynamic galleries. */
export function SiteCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const orbit = useRef<SVGTextPathElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ring = cursor.current!;
    const point = dot.current!;
    const text = label.current!;
    const orbitText = orbit.current!;
    const html = document.documentElement;
    const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let visible = false;
    let inside = false;
    let x = 0, y = 0, trailingX = 0, trailingY = 0, pointX = 0, pointY = 0, lastTime = 0;
    let previousTarget: Element | null = null;
    let previousMessage = "";

    const hide = () => {
      visible = false;
      previousTarget = null;
      ring.dataset.visible = point.dataset.visible = "false";
      html.classList.remove("has-art-cursor");
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      ring.dataset.pressed = "false";
    };
    const permitted = () => media.matches && !document.hidden && !document.querySelector('[data-motion-paused="true"]');
    const targetAtPointer = () => {
      const target = document.elementFromPoint(x, y);
      if (!target || target.closest('input, textarea, select, [contenteditable="true"], iframe, video[controls], dialog[open], [data-cursor="native"]')) {
        hide();
        return;
      }
      if (target !== previousTarget) {
        previousTarget = target;
        const action = target.closest<HTMLElement>('a, button, summary, [role="button"], [data-cursor]');
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
      // Idle uses the system arrow; custom cursor only appears on interactive hover.
      if (ring.dataset.mode === "idle") {
        if (visible) {
          visible = false;
          ring.dataset.visible = point.dataset.visible = "false";
          html.classList.remove("has-art-cursor");
        }
        return;
      }
      if (!visible) {
        trailingX = x; trailingY = y;
        pointX = x; pointY = y;
        visible = true;
        ring.dataset.visible = point.dataset.visible = "true";
        html.classList.add("has-art-cursor");
      }
    };
    const draw = (time: number) => {
      frame = 0;
      if (!inside || !permitted()) { hide(); return; }
      targetAtPointer();
      if (!visible) return;
      const delta = Math.min(time - lastTime || 16.67, 48);
      lastTime = time;
      // Time-based damping feels consistent on both 60 Hz and high-refresh screens.
      // The point stays responsive while the outer ring has a softer glide.
      const ease = 1 - Math.exp(-delta / 105);
      const pointEase = 1 - Math.exp(-delta / 24);
      trailingX += (x - trailingX) * ease;
      trailingY += (y - trailingY) * ease;
      pointX += (x - pointX) * pointEase;
      pointY += (y - pointY) * pointEase;
      ring.style.transform = `translate3d(${trailingX}px, ${trailingY}px, 0)`;
      point.style.transform = `translate3d(${pointX}px, ${pointY}px, 0)`;
      if (Math.abs(x - trailingX) + Math.abs(y - trailingY) + Math.abs(x - pointX) + Math.abs(y - pointY) > .08) frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (!frame && inside) {
        // Restart the clock after resting; idle time must not cause a first-frame jump.
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") { inside = false; hide(); return; }
      inside = true;
      x = event.clientX; y = event.clientY;
      schedule();
    };
    const leave = () => { inside = false; hide(); };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") leave(); };
    const press = () => { ring.dataset.pressed = "true"; };
    const release = () => { ring.dataset.pressed = "false"; };
    const sync = () => { if (!permitted()) hide(); else schedule(); };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-motion-paused"] });
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerup", release, { passive: true });
    document.addEventListener("keydown", keyboard);
    document.addEventListener("scroll", schedule, { passive: true, capture: true });
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("blur", leave);
    media.addEventListener("change", sync);
    return () => {
      hide();
      observer.disconnect();
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("scroll", schedule, true);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("blur", leave);
      media.removeEventListener("change", sync);
    };
  }, [pathname]);

  return <>
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
    <div ref={dot} className="site-cursor-dot" aria-hidden="true" data-visible="false" />
  </>;
}
