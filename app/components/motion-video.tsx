"use client";

import { useEffect, useRef } from "react";

/** Background video: WebM first, MP4 fallback, and playback only while the frame is on screen. */
export function MotionVideo({ src, poster, className, priority = false }: { src: string; poster?: string; className?: string; priority?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;
    const motionRoot = element.closest("[data-motion-paused]");

    const sync = () => {
      if (!onScreen || reduced.matches || document.hidden || motionRoot?.getAttribute("data-motion-paused") === "true") {
        element.pause();
        return;
      }
      element.play().catch(() => {});
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    }, { rootMargin: "12% 0px" });
    observer.observe(element);
    const pauseObserver = new MutationObserver(sync);
    if (motionRoot) pauseObserver.observe(motionRoot, { attributes: true, attributeFilter: ["data-motion-paused"] });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      pauseObserver.disconnect();
      element.pause();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [src]);

  const webm = src.replace(/\.mp4$/i, ".webm");
  return <video ref={video} className={className} poster={poster} muted loop playsInline preload={priority ? "metadata" : "none"} aria-hidden="true">
    {webm !== src ? <source src={webm} type="video/webm" /> : null}
    <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
  </video>;
}
