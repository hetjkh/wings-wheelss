"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import createGlobe, { type Globe, type Marker, type Arc } from "cobe";
import { TravelIcon } from "./icons";
import "./franchise-globe.css";

type Place = {
  id: string;
  city: string;
  country: string;
  code: string;
  location: [number, number];
  hub?: boolean;
  connective?: boolean;
};

/** UAE hub + Saudi / Africa / India focus, plus connective cities across the network. */
const places: Place[] = [
  { id: "dubai", city: "Dubai", country: "United Arab Emirates", code: "DXB", location: [25.2, 55.27], hub: true },
  { id: "riyadh", city: "Riyadh", country: "Saudi Arabia", code: "RUH", location: [24.71, 46.68] },
  { id: "nairobi", city: "Nairobi", country: "Kenya", code: "NBO", location: [-1.29, 36.82] },
  { id: "mumbai", city: "Mumbai", country: "India", code: "BOM", location: [19.08, 72.88] },
  { id: "london", city: "London", country: "United Kingdom", code: "LHR", location: [51.47, -.45], connective: true },
  { id: "singapore", city: "Singapore", country: "Singapore", code: "SIN", location: [1.35, 103.82], connective: true },
  { id: "capetown", city: "Cape Town", country: "South Africa", code: "CPT", location: [-33.92, 18.42], connective: true },
];

const hub = places[0];
const focusMarkets = places.filter(place => !place.hub && !place.connective);
const networkPlaces = places.filter(place => !place.hub);
const longitudeToPhi = (longitude: number) => Math.PI * 1.5 - longitude * Math.PI / 180;
type GlobePalette = { ink: [number, number, number]; ochre: [number, number, number]; brown: [number, number, number]; paper: [number, number, number] };

// Read the same six-digit hex tokens used by the surrounding page.
function readPalette(canvas: HTMLCanvasElement): GlobePalette {
  const styles = getComputedStyle(canvas);
  const rgb = (name: string): [number, number, number] => {
    const hex = styles.getPropertyValue(name).trim().replace("#", "");
    return [0, 2, 4].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255) as [number, number, number];
  };
  return { ink: rgb("--ink"), ochre: rgb("--ochre"), brown: rgb("--brown"), paper: rgb("--paper") };
}

function buildMarkers(activeId: string, palette: GlobePalette): Marker[] {
  return places.map(place => ({
    id: place.id,
    location: place.location,
    size: place.hub ? .06 : place.id === activeId ? .05 : place.connective ? .032 : .042,
    color: place.hub || place.id === activeId ? palette.ink : palette.ochre,
  }));
}

function buildArcs(activeId: string, palette: GlobePalette): Arc[] {
  return networkPlaces.map(place => ({
    id: `arc-${place.id}`,
    from: hub.location,
    to: place.location,
    color: place.id === activeId ? palette.ink : place.connective ? palette.ochre : palette.brown,
  }));
}

function anchorStyle(id: string): CSSProperties {
  return {
    positionAnchor: `--cobe-${id}`,
    opacity: `var(--cobe-visible-${id}, 0)`,
  } as CSSProperties;
}

export function FranchiseGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const rotation = useRef({ phi: longitudeToPhi(40), theta: .2 });
  const drag = useRef<{ x: number; y: number; phi: number; theta: number } | null>(null);
  const activeRef = useRef(focusMarkets[0].id);
  const [selected, setSelected] = useState(focusMarkets[0].id);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const palette = readPalette(canvas);
    let globe: Globe;
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: canvas.clientWidth * dpr,
        height: canvas.clientWidth * dpr,
        ...rotation.current,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 18000,
        mapBrightness: .85,
        mapBaseBrightness: 0,
        baseColor: palette.paper,
        markerColor: palette.ink,
        glowColor: palette.paper.map((channel, index) => channel * .85 + palette.brown[index] * .15) as [number, number, number],
        scale: 1.12,
        markerElevation: .025,
        markers: buildMarkers(activeRef.current, palette),
        arcs: buildArcs(activeRef.current, palette),
        arcColor: palette.brown,
        arcWidth: .85,
        arcHeight: .32,
        context: { alpha: true, antialias: true },
      });
    } catch {
      canvas.parentElement?.classList.add("is-unavailable");
      return;
    }
    globeRef.current = globe;
    const resize = new ResizeObserver(() => {
      globe.update({ width: canvas.clientWidth * dpr, height: canvas.clientWidth * dpr });
    });
    resize.observe(canvas);

    let visible = false;
    let frame = 0;
    let last = 0;
    let cycle = 0;
    const focusIds = focusMarkets.map(place => place.id);

    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      const dt = Math.min((now - last) / 1000, .05);
      last = now;

      if (!drag.current && !reduced.matches) {
        rotation.current.phi += dt * .045;
        cycle += dt;
        if (cycle > 3.2) {
          cycle = 0;
          const next = focusIds[(focusIds.indexOf(activeRef.current) + 1) % focusIds.length];
          activeRef.current = next;
          setSelected(next);
          globe.update({
            ...rotation.current,
            markers: buildMarkers(next, palette),
            arcs: buildArcs(next, palette),
          });
        } else {
          globe.update(rotation.current);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (visible && !document.hidden && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }, { rootMargin: "100px" });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", start);
    canvas.classList.add("is-ready");

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", start);
      globe.destroy();
      globeRef.current = null;
    };
  }, []);

  const release = () => {
    drag.current = null;
    canvasRef.current?.classList.remove("is-grabbing");
  };

  return <div className="f-globe">
    <div className="f-globe-stage">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="img"
        aria-label="Spinning globe showing Wings and Wheels connections from Dubai across Saudi Arabia, Africa, India, the UK, Singapore and South Africa. Drag to explore."
        onPointerDown={e => {
          drag.current = { x: e.clientX, y: e.clientY, ...rotation.current };
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.classList.add("is-grabbing");
        }}
        onPointerMove={e => {
          if (!drag.current) return;
          rotation.current = {
            phi: drag.current.phi + (e.clientX - drag.current.x) / 180,
            theta: Math.max(-.7, Math.min(.7, drag.current.theta + (e.clientY - drag.current.y) / 240)),
          };
          globeRef.current?.update(rotation.current);
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        onKeyDown={e => {
          if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
          e.preventDefault();
          rotation.current.phi += e.key === "ArrowLeft" ? -.12 : e.key === "ArrowRight" ? .12 : 0;
          rotation.current.theta = Math.max(-.7, Math.min(.7, rotation.current.theta + (e.key === "ArrowUp" ? .08 : e.key === "ArrowDown" ? -.08 : 0)));
          globeRef.current?.update(rotation.current);
        }}
      />
      {places.map(place => (
        <div
          key={place.id}
          className={`f-globe-pin${place.hub ? " is-hub" : ""}${place.id === selected ? " is-on" : ""}${place.connective ? " is-link" : ""}`}
          style={anchorStyle(place.id)}
        >
          <i className="f-globe-pulse" aria-hidden="true" />
          <span>{place.city}</span>
        </div>
      ))}
      {networkPlaces.map(place => (
        <div key={`arc-${place.id}`} className={`f-globe-arc${place.id === selected ? " is-on" : ""}`} style={anchorStyle(`arc-${place.id}`)}>
          DXB → {place.code}
        </div>
      ))}
      <div className="f-globe-fallback"><TravelIcon kind="globe" size={100} /><span>Drag to explore the network</span></div>
    </div>
  </div>;
}
