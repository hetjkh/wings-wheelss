"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";

type Point = [number, number];

function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tornEdge([x0, y0]: Point, [x1, y1]: Point, seed: number, amp = 5): Point[] {
  const next = random(seed);
  const length = Math.hypot(x1 - x0, y1 - y0);
  const steps = Math.max(2, Math.round(length / 7));
  const nx = -(y1 - y0) / length, ny = (x1 - x0) / length;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const offset = (next() - 0.5) * amp * 2 + Math.sin(t * 9 + seed) * amp * 1.2;
    return [x0 + (x1 - x0) * t + nx * offset, y0 + (y1 - y0) * t + ny * offset];
  });
}

function tornBand(top: [Point, Point], bottom: [Point, Point], seed: number, amp?: number) {
  const points = [...tornEdge(top[0], top[1], seed, amp), ...tornEdge(bottom[1], bottom[0], seed + 7, amp)];
  return "M" + points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L") + "Z";
}

const shapes = {
  sand: tornBand([[-30, 300], [630, 70]], [[-30, 392], [630, 178]], 3),
  forest: tornBand([[-30, 372], [630, 160]], [[-30, 470], [630, 262]], 11, 6),
  photo: tornBand([[-30, 452], [630, 244]], [[-30, 640], [630, 640]], 19, 6),
  clay: tornBand([[60, 448], [300, 378]], [[52, 498], [296, 432]], 29, 4),
  moss: tornBand([[-30, 560], [190, 530]], [[-30, 640], [190, 640]], 41, 4),
};

export function Collage() {
  const root = useRef<HTMLDivElement>(null);
  const photo = getImageProps({ src: "/images/tanzania.png", alt: "", width: 1200, height: 800 }).props.src;

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.setProperty("--p", Math.max(-1, Math.min(1, progress)).toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return <div className="collage" ref={root}>
    <svg viewBox="0 0 600 600" role="img" aria-label="A torn-paper collage of a rising sun over Kilimanjaro and the savannah">
      <defs>
        <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="4" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
          <feComponentTransfer in="mono" result="grain"><feFuncA type="table" tableValues="0 .22" /></feComponentTransfer>
          <feComposite in="grain" in2="SourceGraphic" operator="in" result="clipped" />
          <feBlend in="clipped" in2="SourceGraphic" mode="multiply" />
        </filter>
        <clipPath id="photo-tear"><path d={shapes.photo} /></clipPath>
      </defs>
      <g className="layer" style={{ "--depth": -24 } as React.CSSProperties}><circle cx="440" cy="142" r="104" fill="#c8663c" filter="url(#paper-grain)" /></g>
      <g className="layer" style={{ "--depth": -30 } as React.CSSProperties}><path d={shapes.sand} fill="#e4d6bf" stroke="#fbf6ee" strokeWidth="4" filter="url(#paper-grain)" /></g>
      <g className="layer" style={{ "--depth": -14 } as React.CSSProperties}><path d={shapes.forest} fill="#3e4a37" stroke="#fbf6ee" strokeWidth="4" filter="url(#paper-grain)" /></g>
      <g className="layer" style={{ "--depth": 0 } as React.CSSProperties}>
        <path d={shapes.photo} fill="none" stroke="#fbf6ee" strokeWidth="9" />
        <image href={photo} x="-30" y="226" width="660" height="420" preserveAspectRatio="xMidYMid slice" clipPath="url(#photo-tear)" />
      </g>
      <g className="layer" style={{ "--depth": 22 } as React.CSSProperties}><path d={shapes.clay} fill="#c8663c" stroke="#fbf6ee" strokeWidth="3" filter="url(#paper-grain)" /></g>
      <g className="layer" style={{ "--depth": 36 } as React.CSSProperties}><path d={shapes.moss} fill="#55634a" stroke="#fbf6ee" strokeWidth="3" filter="url(#paper-grain)" /></g>
    </svg>
    <span className="script collage-script">More than<br />a destination</span>
    <span className="collage-words" aria-hidden="true">Nature<br />Culture<br />People<br />A brighter<br />tomorrow</span>
  </div>;
}
