"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import Image from "./travel-image";
import { Arrow, TravelIcon } from "./icons";
import "./africa-corridor.css";

const journeys = [
  { region: "Africa", from: "UAE", to: "AFRICA", caption: "A different rhythm. A warmer welcome.", description: "From boardrooms in Nairobi to the wide-open savannah. Arrive with every connection considered.", photo: "/images/library/africa-corridor-arrival-v2.webp", alt: "Travellers being welcomed after arriving by regional aircraft in East Africa", items: ["Business travel", "Safari & leisure", "Family travel", "Groups", "Projects", "Regional travel"], cta: "Explore Africa", href: "#destinations" },
  { region: "the UAE", from: "AFRICA", to: "UAE", caption: "New horizons. Familiar care.", description: "Business, family, or your next international connection. Your Dubai arrival is just the beginning.", photo: "/images/library/uae-corridor-arrival-v2.webp", alt: "A business traveller being welcomed by a chauffeur outside a Dubai airport terminal", items: ["Business meetings", "Exhibitions & conferences", "Family travel", "Medical / personal travel", "Groups", "International connections"], cta: "Plan UAE travel", href: "#africa-enquiry" },
];

export function AfricaCorridor() {
  const [active, setActive] = useState(0);
  const atlas = useRef<HTMLDivElement>(null);
  const flightPath = useRef<SVGPathElement>(null);
  const aircraft = useRef<SVGGElement>(null);
  const journey = journeys[active];

  useEffect(() => {
    const path = flightPath.current;
    const plane = aircraft.current;
    const element = atlas.current;
    if (!path || !plane || !element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 761px)");
    const length = path.getTotalLength();
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let visible = false;

    const position = (progress: number) => {
      const distance = (active === 0 ? 1 - progress : progress) * length;
      const point = path.getPointAtLength(distance);
      const before = path.getPointAtLength(Math.max(0, distance - 1));
      const after = path.getPointAtLength(Math.min(length, distance + 1));
      const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI + (active === 0 ? 180 : 0);
      plane.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
    };
    const tick = (time: number) => {
      if (previous) elapsed += time - previous;
      previous = time;
      const progress = (elapsed % 14000) / 14000;
      position(progress);
      plane.style.opacity = String(Math.min(1, progress * 25, (1 - progress) * 25));
      frame = requestAnimationFrame(tick);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (reduced.matches) {
        position(.5);
        plane.style.opacity = "1";
      } else if (visible && desktop.matches && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };
    position(.5);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    reduced.addEventListener("change", update);
    desktop.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [active]);

  useEffect(() => {
    const element = atlas.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => element.toggleAttribute("data-visible", entry.isIntersecting), { threshold: .2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const moveScene = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--drift-x", `${(x - .5) * -18}px`);
    event.currentTarget.style.setProperty("--drift-y", `${(y - .5) * -12}px`);
  };

  const resetScene = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
    event.currentTarget.style.setProperty("--drift-x", "0px");
    event.currentTarget.style.setProperty("--drift-y", "0px");
  };

  return <div ref={atlas} className="ac-atlas" data-destination={active === 0 ? "africa" : "uae"} style={{ "--pointer-x": "50%", "--pointer-y": "50%", "--drift-x": "0px", "--drift-y": "0px" } as CSSProperties}>
    <div className="ac-worlds" onPointerMove={moveScene} onPointerLeave={resetScene}>
      {journeys.map((item, index) => <div className={`ac-world ac-world-${index}`} key={item.to}>
        <Image src={item.photo} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 75vw" />
        <div className="ac-world-shade" />
        <span className="ac-world-note">{index === 0 ? "01 / The African welcome" : "02 / The Dubai arrival"}</span>
        <span className="ac-world-name" aria-hidden="true">{item.to}</span>
      </div>)}
      <svg className="ac-flightpath" viewBox="0 0 1400 650" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path className="ac-flight-line-underlay" d="M160 420C440 120 900 100 1240 160" />
        <path ref={flightPath} className="ac-flight-line" d="M160 420C440 120 900 100 1240 160" />
        <circle cx="160" cy="420" r="5" /><circle cx="1240" cy="160" r="5" />
        <text className="ac-route-label" x="160" y="447">AFRICA</text>
        <text className="ac-route-label" x="1240" y="139" textAnchor="end">UAE</text>
        <g ref={aircraft} transform="translate(700 169) rotate(-9)">
          <path className="ac-route-aircraft" d="M30 0C30-2 24-4 19-4H7L-9-25H-15L-7-4H-20L-27-12H-31L-27 0-31 12H-27L-20 4H-7L-15 25H-9L7 4H19C24 4 30 2 30 0Z" />
          <path className="ac-aircraft-detail" d="M22-1.5V1.5M-21 0H15" />
        </g>
      </svg>
      <div className="ac-selector" role="group" aria-label="Choose your direction of travel">
        {journeys.map((item, index) => <button key={item.to} type="button" aria-pressed={active === index} aria-controls="ac-journey" onClick={() => setActive(index)}><span>0{index + 1}</span>Into {item.region}<Arrow diagonal /></button>)}
      </div>
    </div>
    <div className="ac-boarding" id="ac-journey">
      <div className="ac-ticket-route"><span className="ac-micro">Your next chapter</span><div><strong>{journey.from}</strong><TravelIcon kind="plane" size={26} /><strong>{journey.to}</strong></div><span className="ac-micro">Wings &amp; Wheels / Connected travel</span></div>
      <div className="ac-ticket-story" key={journey.to} aria-live="polite" aria-atomic="true"><span className="ac-micro">Travelling into {journey.region}</span><h3>{journey.caption}</h3><p>{journey.description}</p></div>
      <a className="ac-ticket-link" href={journey.href}><span>{journey.cta}</span><Arrow diagonal /></a>
    </div>
    <div className="ac-purposes"><span>Whatever brings you here</span><ul aria-label={`Travel options for ${journey.region}`}>{journey.items.map(item => <li key={item}>{item}</li>)}</ul></div>
  </div>;
}
