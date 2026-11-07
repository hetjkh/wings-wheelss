"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

/** One eased scroll for every page, driven by GSAP's ticker so pinned chapters move in step with it. */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);
    const sync = () => {
      const muted = reduced.matches || !!document.querySelector('[data-motion-paused="true"]');
      document.documentElement.classList.toggle("is-motion-muted", muted);
      if (muted) {
        gsap.ticker.remove(tick);
        lenis?.destroy();
        lenis = null;
      } else if (!lenis) {
        lenis = new Lenis({
          lerp: .075,
          wheelMultiplier: 1,
          anchors: { offset: -100 },
          allowNestedScroll: true,
          autoRaf: false,
          // Touch retains its native momentum; only wheel input is eased.
          syncTouch: false,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
      }
    };
    const pauseBackground = () => document.documentElement.classList.toggle("is-backgrounded", document.hidden);
    pauseBackground();
    document.addEventListener("visibilitychange", pauseBackground);
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-motion-paused"] });
    reduced.addEventListener("change", sync);
    sync();
    gsap.ticker.lagSmoothing(0);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", pauseBackground);
      document.documentElement.classList.remove("is-backgrounded", "is-motion-muted");
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, [pathname]);
  return null;
}
