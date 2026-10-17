"use client";

import { useId, useState } from "react";
import "./network-map.css";

// Match the geographic projection used by the existing world-map.svg.
const at = (longitude: number, latitude: number) => ({
  x: (longitude + 180) / .36,
  y: (85 - latitude) / 145 * 440,
});
const dubai = at(55.3, 25.2);
const destinations = [
  { name: "Khartoum", country: "Sudan", ...at(32.56, 15.5), labelX: 558, labelY: 207 },
  { name: "Juba", country: "South Sudan", ...at(31.58, 4.85), labelX: 550, labelY: 239 },
  { name: "Kampala", country: "Uganda", ...at(32.58, .35), labelX: 550, labelY: 266 },
  { name: "Nairobi", country: "Kenya", ...at(36.82, -1.29), labelX: 644, labelY: 274 },
  { name: "Tanzania", country: "East Africa", ...at(35, -6), labelX: 639, labelY: 307 },
  { name: "India", country: "South Asia", ...at(78, 22), labelX: 744, labelY: 216 },
];

export function NetworkMap() {
  const [selected, setSelected] = useState("Nairobi");
  const descriptionId = useId();

  return <div className="network-map">
    <div className="network-map-heading"><span>Connected through Dubai</span><span>Africa &amp; India</span></div>
    <svg className="network-map-canvas" viewBox="425 110 360 270" role="group" aria-label="Interactive map connecting Dubai with Khartoum, Juba, Kampala, Nairobi, Tanzania and India" aria-describedby={descriptionId}>
      <image className="network-map-land" href="/images/world-map.svg" x="0" y="0" width="1000" height="440" />
      <text className="network-map-region" x="485" y="185">AFRICA</text>
      <text className="network-map-ocean" x="673" y="337" textAnchor="middle">INDIAN OCEAN</text>
      {destinations.map(point => <path key={point.name} className={`network-map-route${selected === point.name ? " is-selected" : ""}`} d={`M${dubai.x} ${dubai.y} Q${(dubai.x + point.x) / 2} ${Math.min(dubai.y, point.y) - 34} ${point.x} ${point.y}`} />)}
      {destinations.map(point => <g key={point.name} className={`network-map-point${selected === point.name ? " is-selected" : ""}`} role="button" tabIndex={0} aria-label={`Explore Dubai to ${point.name}`} aria-pressed={selected === point.name} onClick={() => setSelected(point.name)} onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(point.name); }
      }}>
        <title>{`Dubai to ${point.name}`}</title>
        <path className="network-map-leader" d={`M${point.x} ${point.y} L${point.labelX + (point.labelX < point.x ? 5 : -5)} ${point.labelY - 3}`} />
        <circle className="network-map-hit" cx={point.x} cy={point.y} r="13" />
        <circle className="network-map-ring" cx={point.x} cy={point.y} r="7" />
        <circle className="network-map-dot" cx={point.x} cy={point.y} r="3" />
        <text x={point.labelX} y={point.labelY} textAnchor={point.labelX < point.x ? "end" : "start"}>{point.name}</text>
      </g>)}
      <g className="network-map-home">
        <circle className="network-map-halo" cx={dubai.x} cy={dubai.y} r="12" />
        <circle className="network-map-dot" cx={dubai.x} cy={dubai.y} r="4" />
        <text x={dubai.x + 13} y={dubai.y - 9}>Dubai</text>
        <text className="network-map-home-note" x={dubai.x + 13} y={dubai.y + 2}>UAE BASE</text>
      </g>
    </svg>
    <p className="network-map-hint" id={descriptionId}>Select a destination to explore its connection.</p>
    <div className="network-map-options" aria-label="Network destinations">
      {destinations.map(point => <button key={point.name} type="button" aria-pressed={selected === point.name} onClick={() => setSelected(point.name)}>{point.name}</button>)}
    </div>
  </div>;
}
