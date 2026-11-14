"use client";

import { useEffect, useRef, useState } from "react";
import {
  resolveVideoSources,
  shouldDeferHeavyVideo,
  warmVideoCache,
  type VideoSources,
} from "./video-sources";

/** Shared looping background video — mobile gets `.mobile` encodes; Cache Storage warms repeats. */
export function MotionVideo({ src, poster, className, priority = false }: { src: string; poster?: string; className?: string; priority?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<VideoSources | null>(null);

  useEffect(() => {
    if (shouldDeferHeavyVideo()) return;
    const resolved = resolveVideoSources(src);
    setSources(resolved);
    warmVideoCache([resolved.webm, resolved.mp4].filter(Boolean) as string[]);
  }, [src]);

  useEffect(() => {
    const element = video.current;
    if (!element || !sources) return;
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
  }, [src, sources]);

  if (!sources) return null;

  return <video ref={video} className={className} {...(poster ? { poster } : {})} muted loop playsInline preload={priority ? "metadata" : "none"} aria-hidden="true">
    {sources.webm ? <source src={sources.webm} type="video/webm" /> : null}
    <source src={sources.mp4} type="video/mp4" />
  </video>;
}
