"use client";

import { useState } from "react";

// Same projection as /images/world-map.svg (1000 × 440).
const at = (longitude: number, latitude: number) => ({
  x: (longitude + 180) / .36,
  y: (85 - latitude) / 145 * 440,
});

const dubai = at(55.3, 25.2);
const cities = [
  { name: "Khartoum", country: "Sudan", ...at(32.56, 15.5), side: -1 },
  { name: "Juba", country: "South Sudan", ...at(31.58, 4.85), side: -1 },
  { name: "Kampala", country: "Uganda", ...at(32.58, .35), side: -1 },
  { name: "Nairobi", country: "Kenya", ...at(36.82, -1.29), side: 1 },
  { name: "Tanzania", country: "East Africa", ...at(39.28, -6.8), side: 1 },
];
const route = (city: { x: number; y: number }) => `M${dubai.x} ${dubai.y} Q${(dubai.x + city.x) / 2 + 8} ${Math.min(dubai.y, city.y) - 22} ${city.x} ${city.y}`;

export function AboutNetwork() {
  const [selected, setSelected] = useState(3);
  const city = cities[selected];

  return <div className="au-map">
    <svg className="au-map-canvas" viewBox="548 150 140 150" role="img" aria-label="Map of the Wings & Wheels network connecting Dubai with Khartoum, Juba, Kampala, Nairobi and Tanzania">
      <image className="au-map-land" href="/images/world-map.svg" x="0" y="0" width="1000" height="440" />
      {cities.map((item, index) => <g key={item.name} className={`au-map-link${index === selected ? " is-selected" : ""}`}>
        <path className="au-map-route" d={route(item)} />
        <path className="au-map-draw" d={route(item)} pathLength={1} />
      </g>)}
      <g key={city.name} className="au-map-plane">
        <path d="M0 -2.4 L5 0 L0 2.4 L1.2 0 Z" />
        <animateMotion dur="2.6s" repeatCount="indefinite" rotate="auto" path={route(city)} />
      </g>
      {cities.map((item, index) => <g key={item.name} className={`au-map-city${index === selected ? " is-selected" : ""}`} onPointerEnter={() => setSelected(index)} onClick={() => setSelected(index)}>
        <circle className="au-map-hit" cx={item.x} cy={item.y} r="7" />
        <circle className="au-map-pulse" cx={item.x} cy={item.y} r="3" />
        <circle className="au-map-dot" cx={item.x} cy={item.y} r="1.6" />
        <text x={item.x + item.side * 4.5} y={item.y + 1.5} textAnchor={item.side < 0 ? "end" : "start"}>{item.name}</text>
      </g>)}
      <g className="au-map-home">
        <circle className="au-map-pulse" cx={dubai.x} cy={dubai.y} r="4" />
        <circle className="au-map-dot" cx={dubai.x} cy={dubai.y} r="2.2" />
        <text x={dubai.x + 4.5} y={dubai.y - 3}>Dubai</text>
        <text className="au-map-note" x={dubai.x + 4.5} y={dubai.y + 3}>UAE base</text>
      </g>
    </svg>
    <div className="au-map-panel">
      <div className="au-map-ticket" aria-live="polite">
        <span>Dubai</span>
        <span className="au-map-ticket-line" aria-hidden="true" />
        <strong>{city.name}</strong>
        <small>{city.country}</small>
      </div>
      <div className="au-map-options" role="group" aria-label="Network locations">
        {cities.map((item, index) => <button key={item.name} type="button" aria-pressed={index === selected} onPointerEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)}>{item.name}</button>)}
      </div>
    </div>
  </div>;
}
