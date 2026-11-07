"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "./site-cursor.css";

/** A quiet pointer companion; delegated targets also work in dynamic galleries. */
export function SiteCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const ring = cursor.current!;
    const point = dot.current!;
    const text = label.current!;
    const html = document.documentElement;
    const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let visible = false;
    let inside = false;
    let x = 0, y = 0, trailingX = 0, trailingY = 0, lastTime = 0;
    let previousTarget: Element | null = null;

    const hide = () => {
      visible = false;
      previousTarget = null;
      ring.dataset.visible = point.dataset.visible = "false";
      html.classList.remove("has-art-cursor");
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const permitted = () => media.matches && !document.hidden && !document.querySelector('[data-motion-paused="true"]');
    const targetAtPointer = () => {
      const target = document.elementFromPoint(x, y);
      if (!target || target.closest('input, textarea, select, [contenteditable="true"], iframe, video[controls], dialog[open], [data-cursor="native"]')) {
        hide();
        return;
      }
      if (!visible) {
        trailingX = x; trailingY = y;
        visible = true;
        ring.dataset.visible = point.dataset.visible = "true";
        html.classList.add("has-art-cursor");
      }
      if (target === previousTarget) return;
      previousTarget = target;
      const action = target.closest<HTMLElement>('a, button, summary, [role="button"], [data-cursor]');
      const disabled = action?.matches(':disabled, [aria-disabled="true"]');
      const explicit = action?.getAttribute("data-cursor");
      const href = action?.getAttribute("href") ?? "";
      const message = disabled ? "" : explicit ?? (action?.matches("a") && action.querySelector("img") ? (href.startsWith("/blog/") ? "Read story" : "View") : "");
      text.textContent = message;
      ring.dataset.mode = message ? "label" : action && !disabled ? "link" : "idle";
    };
    const draw = (time: number) => {
      frame = 0;
      if (!inside || !permitted()) { hide(); return; }
      targetAtPointer();
      if (!visible) return;
      const delta = Math.min(time - lastTime || 16.67, 64);
      lastTime = time;
      const ease = 1 - Math.exp(-delta / 75);
      trailingX += (x - trailingX) * ease;
      trailingY += (y - trailingY) * ease;
      ring.style.transform = `translate3d(${trailingX}px, ${trailingY}px, 0)`;
      point.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(x - trailingX) + Math.abs(y - trailingY) > .08) frame = requestAnimationFrame(draw);
    };
    const schedule = () => { if (!frame && inside) frame = requestAnimationFrame(draw); };
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
      <div className="site-cursor-face"><span ref={label} /><svg viewBox="0 0 16 16" fill="none"><path d="M4 12 12 4M4 4h8v8" stroke="currentColor" strokeWidth="1.25" /></svg></div>
    </div>
    <div ref={dot} className="site-cursor-dot" aria-hidden="true" data-visible="false" />
  </>;
}
