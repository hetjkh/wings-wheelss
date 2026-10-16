import type { LayoutGroup } from "./logo-lab";
import { Plane, Seal } from "./travel-layouts";
import "./logo-single.css";

const W = ({ className = "" }: { className?: string }) => <span className={`sw-w ${className}`}>W</span>;
const wing = "M118 8C80 8 40 4 4 0M118 18C84 18 50 16 14 10M118 28C88 28 60 28 26 22M118 38c-26 0-46 1-72-2M118 48c-20 0-36 0-54-3";

const classic: LayoutGroup["layouts"] = [
  { id: "sw-solo", name: "Full stop", render: () => <span className="sw-solo">W<i /></span> },
  { id: "sw-circle", name: "Ring", render: () => <span className="sw-circle"><W /></span> },
  { id: "sw-box", name: "Heavy frame", render: () => <span className="sw-box"><W /></span> },
  { id: "sw-disc", name: "Solid disc", render: () => <span className="sw-disc"><W /></span> },
  { id: "sw-app", name: "App icon", render: () => <span className="sw-app"><W /><i /></span> },
  { id: "sw-hex", name: "Hexagon", render: () => <span className="sw-hex"><span><W /></span></span> },
  { id: "sw-arch", name: "Arch", render: () => <span className="sw-arch"><i /><W /></span> },
  {
    id: "sw-crest", name: "Crest", render: () => <span className="sw-crest">
      <svg viewBox="0 0 100 120" aria-hidden="true"><path d="M50 4 94 18v38c0 30-20 50-44 60C26 106 6 86 6 56V18Z" /><path d="M50 12 86 24v32c0 25-16 42-36 51-20-9-36-26-36-51V24Z" /></svg>
      <W />
    </span>,
  },
  { id: "sw-shadow", name: "Offset shadow", render: () => <span className="sw-shadow"><span aria-hidden="true">W</span><span>W</span></span> },
  { id: "sw-split", name: "Two-tone", render: () => <span className="sw-split">W</span> },
  { id: "sw-stripes", name: "Striped", render: () => <span className="sw-stripes">W</span> },
  { id: "sw-echo", name: "Echo", render: () => <span className="sw-echo"><span aria-hidden="true">W</span><span aria-hidden="true">W</span><span aria-hidden="true">W</span><span>W</span></span> },
  { id: "sw-word", name: "With wordmark", render: () => <span className="sw-word"><W /><span className="sw-word-line"><i /><b>Wings &amp; Wheels</b><i /></span><small>Travel · Dubai</small></span> },
];

const travel: LayoutGroup["layouts"] = [
  {
    id: "sw-wings", name: "Winged", render: () => <span className="sw-wings">
      <svg viewBox="0 0 120 50" aria-hidden="true"><path d={wing} /></svg><W /><svg className="lb-flip" viewBox="0 0 120 50" aria-hidden="true"><path d={wing} /></svg>
    </span>,
  },
  {
    id: "sw-wheel", name: "Wheel", render: () => <span className="sw-wheel">
      <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" /><circle cx="50" cy="50" r="40" /><path d="M50 10v80M10 50h80M22 22l56 56M78 22 22 78" /></svg>
      <W />
    </span>,
  },
  {
    id: "sw-flight", name: "Flight loop", render: () => <span className="sw-flight">
      <svg viewBox="0 0 200 160" aria-hidden="true"><path d="M10 140C60 160 170 150 176 80 180 30 120 30 130 70 138 100 180 70 186 30" /></svg>
      <W /><Plane className="sw-flight-plane" />
    </span>,
  },
  {
    id: "sw-compass", name: "Compass", render: () => <span className="sw-compass">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="47" /><circle className="lb-thin" cx="50" cy="50" r="38" />
        <path className="sw-compass-star" d="M50 2 58 42 98 50 58 58 50 98 42 58 2 50 42 42Z" />
        <text x="50" y="13">N</text><text x="91" y="53">E</text><text x="50" y="94">S</text>
      </svg>
      <W />
    </span>,
  },
  {
    id: "sw-globe", name: "Globe", render: () => <span className="sw-globe">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <g className="lb-thin"><circle cx="60" cy="60" r="50" /><ellipse cx="60" cy="60" rx="20" ry="50" /><ellipse cx="60" cy="60" rx="38" ry="50" /><path d="M10 60h100M16 35h88M16 85h88" /></g>
        <ellipse className="sw-globe-orbit" cx="60" cy="60" rx="62" ry="18" transform="rotate(-18 60 60)" />
      </svg>
      <W /><Plane className="sw-globe-plane" />
    </span>,
  },
  { id: "sw-pin", name: "Map pin", render: () => <span className="sw-pin"><svg viewBox="0 0 60 80" aria-hidden="true"><path d="M30 78S4 46 4 28a26 26 0 0 1 52 0c0 18-26 50-26 50Z" /></svg><W /></span> },
  { id: "sw-stamp", name: "Passport stamp", render: () => <span className="sw-stamp"><small>Dubai · Arrived</small><W /><small>14 Oct 2026</small></span> },
  { id: "sw-ticket", name: "Ticket stub", render: () => <span className="sw-ticket"><small>Gate</small><W /><i /><small>DXB → NBO</small></span> },
  {
    id: "sw-sunrise", name: "Sunrise", render: () => <span className="sw-sunrise">
      <svg viewBox="0 0 200 100" aria-hidden="true"><path className="lb-sun-rays" d="M100 22V2M58 36 44 20M142 36l14-16M36 70H14M164 70h22" /><path className="lb-sun" d="M44 100a56 56 0 0 1 112 0Z" /></svg>
      <W />
    </span>,
  },
  { id: "sw-seal", name: "Travel seal", render: () => <Seal className="sw-seal"><W /></Seal> },
  {
    id: "sw-swash", name: "Swash & plane", render: () => <span className="sw-swash">
      <W /><svg viewBox="0 0 200 40" aria-hidden="true"><path d="M4 30C60 4 130 2 182 16" /></svg><Plane className="sw-swash-plane" />
    </span>,
  },
];

export const singleGroups: LayoutGroup[] = [
  { id: "mark", label: "Marks", layouts: classic },
  { id: "travel", label: "Travel", layouts: travel },
];
