"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "./travel-image";
import { Arrow, TravelIcon, type IconKind } from "./icons";

const origins = ["Nairobi", "Kampala", "Juba", "Khartoum", "Tanzania"];
const services: { icon: IconKind; label: string }[] = [
  { icon: "plane", label: "Group flights" },
  { icon: "document", label: "Visa assistance" },
  { icon: "bed", label: "Hotels" },
  { icon: "car", label: "Airport transfers" },
  { icon: "route", label: "Venue transportation" },
  { icon: "people", label: "Delegate travel" },
  { icon: "support", label: "Changes & support" },
];

const curve = (index: number) => {
  const y = 50 + index * 90;
  return `M 8 ${y} C 280 ${y}, 430 230, 760 230`;
};

/** Five departure cities fly into one Dubai event. Hover or arrow keys choose the route. */
export function AfricaDelegates() {
  const [active, setActive] = useState(2);
  const paths = useRef<Array<SVGPathElement | null>>([]);
  const plane = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = paths.current[active];
    const craft = plane.current;
    if (!path || !craft || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const length = path.getTotalLength();
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = ((now - start) % 2600) / 2600;
      const at = length * progress;
      const point = path.getPointAtLength(at);
      const ahead = path.getPointAtLength(Math.min(length, at + 4));
      const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180 / Math.PI;
      craft.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const move = (key: string) => {
    if (key !== "ArrowDown" && key !== "ArrowUp") return;
    setActive(current => (current + (key === "ArrowDown" ? 1 : -1) + origins.length) % origins.length);
  };

  return <div className="a-hall">
    <Image src="/images/library/exhibition.webp" alt="Visitors meeting at a professional trade exhibition" fill sizes="(max-width: 900px) 100vw, 90vw" />
    <div className="a-hall-shade" aria-hidden="true" />
    <div className="a-hall-board">
      <div className="a-hall-cities">
        <span className="a-plan-label">Different departure points. One event.</span>
        <ol onKeyDown={event => move(event.key)}>
          {origins.map((city, index) => <li key={city}>
            <button type="button" className={index === active ? "is-active" : ""} aria-pressed={index === active} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
              <i>{String(index + 1).padStart(2, "0")}</i>{city}
            </button>
          </li>)}
        </ol>
      </div>
      <svg className="a-hall-routes" viewBox="0 0 820 460" aria-hidden="true">
        {origins.map((city, index) => <path key={city} ref={node => { paths.current[index] = node; }} d={curve(index)} className={index === active ? "is-active" : ""} />)}
        <g className="a-hall-plane" ref={plane}><path d="M-13 -5 L14 0 L-13 5 L-7 0 Z" /></g>
      </svg>
      <div className="a-hall-event">
        <span>One coordinated arrival</span>
        <strong>Dubai<br />event</strong>
      </div>
    </div>
    <div className="a-hall-foot">
      <ul>{services.map(service => <li key={service.label}><TravelIcon kind={service.icon} size={16} />{service.label}</li>)}</ul>
      <div className="a-hall-actions">
        <a className="j-button j-button-cream" href="#africa-enquiry">Plan delegate travel<Arrow /></a>
        <Link className="j-text-link" href="/groups-mice">Explore Groups &amp; MICE<Arrow /></Link>
      </div>
    </div>
  </div>;
}
