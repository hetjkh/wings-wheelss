"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import createGlobe from "cobe";
import "./africa-globe.css";

type Place = { id: string; label: string; location: [number, number]; side: "left" | "right" | "below-left" | "below-right"; hub?: boolean };

const places: Place[] = [
  { id: "dubai", label: "Dubai", location: [25.2, 55.27], side: "right", hub: true },
  { id: "khartoum", label: "Khartoum", location: [15.5, 32.56], side: "left" },
  { id: "juba", label: "Juba", location: [4.85, 31.58], side: "left" },
  { id: "kampala", label: "Kampala", location: [0.35, 32.58], side: "below-left" },
  { id: "nairobi", label: "Nairobi", location: [-1.29, 36.82], side: "right" },
  { id: "dar", label: "Dar es Salaam", location: [-6.79, 39.21], side: "below-right" },
];

const hub = places[0].location;
const focusLon = 38;
const focusLat = 8;
const basePhi = Math.PI - ((focusLon * Math.PI) / 180 - Math.PI / 2);
const theta = (focusLat * Math.PI) / 180;

export function AfricaGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ x: number; offset: number } | null>(null);
  const offset = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = canvas.offsetWidth;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi: basePhi,
      theta,
      dark: 0,
      diffuse: 1.3,
      mapSamples: 18000,
      mapBrightness: 5.5,
      mapBaseBrightness: 0.02,
      baseColor: [1, 0.97, 0.92],
      markerColor: [0.71, 0.27, 0.16],
      glowColor: [0.98, 0.93, 0.85],
      markerElevation: 0.02,
      markers: places.map(place => ({ location: place.location, size: place.hub ? 0.07 : 0.04, id: place.id })),
      arcs: places.slice(1).map(place => ({ from: hub, to: place.location, id: `arc-${place.id}` })),
      arcColor: [0.64, 0.5, 0.3],
      arcWidth: 0.6,
      arcHeight: 0.22,
    });

    const resize = new ResizeObserver(() => {
      size = canvas.offsetWidth;
      globe.update({ width: size * dpr, height: size * dpr });
    });
    resize.observe(canvas);

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const sway = still ? 0 : Math.sin((now - start) / 4200) * 0.32;
      globe.update({ phi: basePhi + sway + offset.current });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const fade = window.setTimeout(() => canvas.classList.add("is-ready"), 60);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(fade);
      resize.disconnect();
      globe.destroy();
    };
  }, []);

  const release = () => {
    drag.current = null;
    canvasRef.current?.classList.remove("is-grabbing");
  };

  return (
    <div className="h-globe">
      <canvas
        ref={canvasRef}
        aria-label="Globe showing routes from Dubai to Khartoum, Juba, Kampala, Nairobi and Dar es Salaam"
        role="img"
        onPointerDown={event => {
          drag.current = { x: event.clientX, offset: offset.current };
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.classList.add("is-grabbing");
        }}
        onPointerMove={event => {
          if (!drag.current) return;
          const delta = (event.clientX - drag.current.x) / 180;
          offset.current = Math.max(-1.4, Math.min(1.4, drag.current.offset + delta));
        }}
        onPointerUp={release}
        onPointerCancel={release}
      />
      {places.map(place => (
        <span
          key={place.id}
          className={`h-globe-label is-${place.side}${place.hub ? " is-hub" : ""}`}
          style={{ positionAnchor: `--cobe-${place.id}`, opacity: `var(--cobe-visible-${place.id}, 0)` } as CSSProperties}
          aria-hidden="true"
        >
          {place.label}
        </span>
      ))}
    </div>
  );
}
