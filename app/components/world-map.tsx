"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { countryPaths } from "./country-paths";
import { destinations, hub } from "./data";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";

const places = destinations.filter(d => d.id !== hub.id);

function route(x: number, y: number) {
  const mx = (hub.map.x + x) / 2, my = (hub.map.y + y) / 2;
  const dx = x - hub.map.x, dy = y - hub.map.y;
  const length = Math.hypot(dx, dy);
  const bend = Math.min(40, length * 0.28);
  const cx = mx + (-dy / length) * bend, cy = my + (dx / length) * bend - 4;
  return { d: `M${hub.map.x},${hub.map.y} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x},${y}`, mid: [0.25 * hub.map.x + 0.5 * cx + 0.25 * x, 0.25 * hub.map.y + 0.5 * cy + 0.25 * y] };
}

export function WorldMap() {
  const [active, setActive] = useState(3);
  const [touring, setTouring] = useState(false);
  const place = places[active];

  useEffect(() => {
    if (!touring) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % places.length), 3200);
    return () => window.clearInterval(timer);
  }, [touring]);

  const choose = (i: number) => { setTouring(false); setActive(i); };

  return <section className="map-section" id="map" aria-labelledby="map-heading">
    <div className="section-shell">
      <div className="map-head" data-reveal>
        <div>
          <span className="eyebrow eyebrow-rule">Our network</span>
          <h2 id="map-heading">Local where it matters. <em>Connected where you&apos;re going.</em></h2>
        </div>
        <div className="map-head-aside">
          <p>Wings &amp; Wheels operates from the UAE with a growing network and regional presence across key African markets and international destinations.</p>
          <button type="button" className={touring ? "tour-button is-on" : "tour-button"} onClick={() => setTouring(!touring)} aria-pressed={touring}>
            <span className="tour-icon" aria-hidden="true">{touring ? "❚❚" : "▶"}</span>{touring ? "Pause the tour" : "Explore our network"}
          </button>
        </div>
      </div>

      <div className="map-panel" data-reveal>
      <div className="map-visual">
        <svg viewBox="440 62 470 250" className="map-svg" role="group" aria-label="Map of the Wings & Wheels network, connected through Dubai">
          <defs>
            <pattern id="sea-dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".55" fill="#5d8fc4" /></pattern>
            <filter id="wash" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="8" /><feDisplacementMap in="SourceGraphic" scale="34" /><feGaussianBlur stdDeviation="6" /></filter>
            <mask id="wash-mask"><g filter="url(#wash)" fill="white"><ellipse cx="610" cy="235" rx="140" ry="70" /><ellipse cx="535" cy="150" rx="60" ry="35" /><ellipse cx="840" cy="205" rx="80" ry="55" /><ellipse cx="700" cy="270" rx="90" ry="40" /></g></mask>
          </defs>
          <g mask="url(#wash-mask)"><rect x="440" y="62" width="470" height="250" fill="#cfe0f0" /><rect x="440" y="62" width="470" height="250" fill="url(#sea-dots)" opacity=".55" /></g>
          <image href="/images/world-map.svg" x="0" y="0" width="1000" height="440" opacity=".9" />
          {places.filter(d => d.iso).map(d => <path key={d.iso} d={countryPaths[d.iso]} className={d.id === place.id ? "country is-active" : "country"} />)}
          <path d={countryPaths.ARE} className="country country-hub" />

          {places.map((d, i) => { const r = route(d.map.x, d.map.y); return <path key={d.id} d={r.d} className={i === active ? "route is-active" : "route"} />; })}

          {places.map((d, i) => <g key={d.id} className={i === active ? "pin is-active" : "pin"} onClick={() => choose(i)} onMouseEnter={() => !touring && setActive(i)} role="button" tabIndex={0} aria-label={`Show ${d.name}`} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(i); } }}>
            <line x1={d.map.x} y1={d.map.y} x2={d.map.x + d.map.dx * 0.82} y2={d.map.y + d.map.dy * 0.7} />
            <circle className="pin-halo" cx={d.map.x} cy={d.map.y} r="6" />
            <circle className="pin-dot" cx={d.map.x} cy={d.map.y} r="2.6" />
            <text x={d.map.x + d.map.dx} y={d.map.y + d.map.dy + 3} textAnchor={d.map.dx < 0 ? "end" : "start"}>{d.name}</text>
          </g>)}

          <g className="hub">
            <circle cx={hub.map.x} cy={hub.map.y} r="9" className="hub-ring" />
            <circle cx={hub.map.x} cy={hub.map.y} r="4" className="hub-dot" />
            <text x={hub.map.x + 12} y={hub.map.y - 8}>Dubai</text>
            <text x={hub.map.x + 12} y={hub.map.y + 1} className="hub-sub">UAE base</text>
          </g>

          {(() => { const [x, y] = route(place.map.x, place.map.y).mid; const label = place.flight; const w = label.length * 4.1 + 18; return <g className="flight-pill" key={place.id}><rect x={x - w / 2} y={y - 7.5} width={w} height="15" rx="7.5" /><text x={x + 4} y={y + 2.8} textAnchor="middle">{label}</text><path d={`M${x - w / 2 + 6},${y} l4,-2.4 v4.8z`} /></g>; })()}

          <g className="compass" transform="translate(880 92)"><circle r="13" /><path d="M0-10 3 0 0 10-3 0Z" /><text y="-16" textAnchor="middle">N</text></g>
        </svg>

        <span className="map-footnote"><TravelIcon kind="pin" size={14} /> Regional presence · Global reach <Arrow diagonal /></span>
        <div className="map-chips" role="group" aria-label="Choose a destination">
          {places.map((d, i) => <button key={d.id} type="button" aria-pressed={i === active} className={i === active ? "is-active" : ""} onClick={() => choose(i)} onMouseEnter={() => !touring && setActive(i)}>
            {d.name}<small>{d.flight}</small>
          </button>)}
        </div>
      </div>

      <aside className="map-card" aria-live="polite">
        <div className="map-card-photo" key={place.id}><Image src={place.image} alt={place.alt} fill sizes="(max-width: 1100px) 90vw, 360px" /><span className="map-card-count">0{active + 1} <em>/ 0{places.length}</em></span></div>
        <div className="map-card-body" key={`${place.id}-body`}>
          <span className="eyebrow">{place.region} · {place.country}</span>
          <h3>{place.name}</h3>
          <p>{place.description}</p>
          <div className="map-card-meta"><span><TravelIcon kind="plane" size={14} /> {place.flight}</span><span><TravelIcon kind="calendar" size={14} /> {place.season}</span></div>
        </div>
        <div className="map-card-actions">
          <EnquiryButton className="button button-dark button-small" destination={place.name} service={place.region === "Africa" ? "Africa travel" : "Leisure & holidays"}>Take me there</EnquiryButton>
          <span>
            <button type="button" className="round-button round-small" aria-label="Previous destination" onClick={() => choose((active - 1 + places.length) % places.length)}><Arrow back /></button>
            <button type="button" className="round-button round-small" aria-label="Next destination" onClick={() => choose((active + 1) % places.length)}><Arrow /></button>
          </span>
        </div>
      </aside>
      </div>
    </div>
  </section>;
}
