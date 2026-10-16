import { useId, type ReactNode } from "react";
import "./logo-travel.css";

const Amp = () => <span className="lb-amp">&amp;</span>;
const Mark = () => <span className="lb-row">W<Amp />W</span>;

export const Plane = ({ className = "" }: { className?: string }) => <svg className={`lb-plane ${className}`} viewBox="0 0 24 24" aria-hidden="true">
  <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5Z" />
</svg>;

const Car = ({ className = "" }: { className?: string }) => <svg className={`lb-car ${className}`} viewBox="0 0 24 24" aria-hidden="true">
  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8ZM6.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM5 11l1.5-4.5h11L19 11Z" />
</svg>;

export function Seal({ children = <Mark />, className = "" }: { children?: ReactNode; className?: string }) {
  const id = useId().replace(/:/g, "");
  return <span className={`lb-seal ${className}`}>
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <defs><path id={`${id}-ring`} d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" /></defs>
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="58" />
      <g className="lb-seal-spin">
        <text><textPath href={`#${id}-ring`} textLength="470">WINGS &amp; WHEELS · TRAVEL &amp; TOURISM · DUBAI ·</textPath></text>
      </g>
    </svg>
    {children}
  </span>;
}

export const travelLayouts: { id: string; name: string; render: () => ReactNode }[] = [
  {
    id: "flight", name: "Flight path", render: () => <span className="lb-fp">
      <svg viewBox="0 0 200 70" aria-hidden="true"><path d="M14 66Q100-14 186 66" /></svg>
      <Plane className="lb-fp-plane" />
      <span>W</span><Amp /><span>W</span>
    </span>,
  },
  {
    id: "pass", name: "Boarding pass", render: () => <span className="lb-pass">
      <span className="lb-pass-main">
        <small>Boarding pass</small>
        <Mark />
        <span className="lb-pass-route"><b>DXB</b><Plane /><b>NBO</b></span>
      </span>
      <span className="lb-pass-stub"><small>Gate</small><b>W1</b><i /></span>
    </span>,
  },
  { id: "stamp", name: "Passport stamp", render: () => <span className="lb-stamp"><small>Arrived · Dubai</small><Mark /><small>14 · Oct · 2026</small></span> },
  {
    id: "compass", name: "Compass", render: () => <span className="lb-compass">
      <span>W</span>
      <span className="lb-compass-rose">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="47" /><circle className="lb-thin" cx="50" cy="50" r="40" />
          <path className="lb-compass-star" d="M50 4 57 43 96 50 57 57 50 96 43 57 4 50 43 43Z" />
          <text x="50" y="17">N</text><text x="50" y="91">S</text>
        </svg>
        <Amp />
      </span>
      <span>W</span>
    </span>,
  },
  {
    id: "globe", name: "Globe & orbit", render: () => <span className="lb-globe">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <g className="lb-thin"><circle cx="60" cy="60" r="44" /><ellipse cx="60" cy="60" rx="18" ry="44" /><ellipse cx="60" cy="60" rx="34" ry="44" /><path d="M16 60h88M22 38h76M22 82h76" /></g>
        <ellipse className="lb-globe-orbit" cx="60" cy="60" rx="58" ry="17" transform="rotate(-16 60 60)" />
      </svg>
      <Plane className="lb-globe-plane" />
      <Mark />
    </span>,
  },
  {
    id: "tag", name: "Luggage tag", render: () => <span className="lb-tag">
      <svg viewBox="0 0 220 100" aria-hidden="true">
        <path className="lb-tag-string" d="M30 50C14 22-10 30-26 6" />
        <path className="lb-tag-body" d="M42 6h166a8 8 0 0 1 8 8v72a8 8 0 0 1-8 8H42L6 62V38Z" />
        <circle cx="30" cy="50" r="7" />
      </svg>
      <span className="lb-tag-text"><Mark /><small>Dubai · UAE</small></span>
    </span>,
  },
  {
    id: "pin", name: "Map pin", render: () => <span className="lb-pin">
      <span>W</span>
      <span className="lb-pin-drop"><svg viewBox="0 0 60 80" aria-hidden="true"><path d="M30 78S4 46 4 28a26 26 0 0 1 52 0c0 18-26 50-26 50Z" /></svg><Amp /></span>
      <span>W</span>
    </span>,
  },
  {
    id: "sunrise", name: "Sunrise", render: () => <span className="lb-sunrise">
      <svg viewBox="0 0 200 90" aria-hidden="true">
        <path className="lb-sun-rays" d="M100 26V4M62 38 48 22M138 38l14-16M40 66H18M160 66h22M78 30l-6-20M122 30l6-20" />
        <path className="lb-sun" d="M50 90a50 50 0 0 1 100 0Z" />
      </svg>
      <Mark />
    </span>,
  },
  {
    id: "road", name: "Open road", render: () => <span className="lb-road">
      <Mark />
      <svg viewBox="0 0 200 60" aria-hidden="true"><path className="lb-road-edge" d="M90 0 16 60M110 0l74 60" /><path className="lb-road-mid" d="M100 2v58" /></svg>
    </span>,
  },
  {
    id: "trail", name: "Contrail", render: () => <span className="lb-trail">
      <svg viewBox="0 0 240 100" preserveAspectRatio="none" aria-hidden="true"><path d="M4 78C70 104 160 92 214 24" /></svg>
      <Plane className="lb-trail-plane" />
      <Mark />
    </span>,
  },
  {
    id: "window", name: "Plane window", render: () => <span className="lb-window">
      <span className="lb-window-glass">
        <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40V26c8-8 18-8 24-2 6-10 22-10 28 0 6-6 16-6 22 0 8-8 20-6 26 2v14Z" /></svg>
        <Mark />
      </span>
    </span>,
  },
  {
    id: "tail", name: "Tail fin", render: () => <span className="lb-tail">
      <svg viewBox="0 0 170 130" aria-hidden="true"><path className="lb-tail-fin" d="M12 120h106L156 8h-52Z" /><path className="lb-tail-body" d="M0 121h170" /></svg>
      <span className="lb-tail-text"><Mark /></span>
    </span>,
  },
  {
    id: "pilot", name: "Pilot wings", render: () => <span className="lb-pilot">
      <svg viewBox="0 0 120 50" aria-hidden="true"><path d="M118 8C80 8 40 4 4 0M118 18C84 18 50 16 14 10M118 28C88 28 60 28 26 22M118 38c-26 0-46 1-72-2M118 48c-20 0-36 0-54-3" /></svg>
      <span className="lb-pilot-badge"><Mark /></span>
      <svg className="lb-flip" viewBox="0 0 120 50" aria-hidden="true"><path d="M118 8C80 8 40 4 4 0M118 18C84 18 50 16 14 10M118 28C88 28 60 28 26 22M118 38c-26 0-46 1-72-2M118 48c-20 0-36 0-54-3" /></svg>
    </span>,
  },
  {
    id: "runway", name: "Take-off", render: () => <span className="lb-runway">
      <Plane className="lb-runway-plane" />
      <Mark />
      <svg viewBox="0 0 260 30" aria-hidden="true">
        <rect className="lb-runway-strip" x="0" y="4" width="260" height="22" rx="2" />
        <path className="lb-runway-keys" d="M8 9v12M14 9v12M20 9v12M26 9v12M234 9v12M240 9v12M246 9v12M252 9v12" />
        <path className="lb-runway-mid" d="M40 15h180" />
      </svg>
    </span>,
  },
  {
    id: "route", name: "Route map", render: () => <span className="lb-route">
      <span className="lb-route-top">
        <span>W</span>
        <span className="lb-route-line"><svg viewBox="0 0 120 20" preserveAspectRatio="none" aria-hidden="true"><path d="M8 10h104" /></svg><i /><Amp /><i /></span>
        <span>W</span>
      </span>
      <span className="lb-route-codes"><b>DXB</b><b>NBO</b></span>
    </span>,
  },
  { id: "board", name: "Departure board", render: () => <span className="lb-board"><small>Departures · DXB</small><span className="lb-board-row"><i>W</i><i className="lb-board-amp">&amp;</i><i>W</i></span></span> },
  { id: "coord", name: "Coordinates", render: () => <span className="lb-coord"><Mark /><span className="lb-coord-line"><small>25.20° N</small><i /><small>55.27° E</small></span></span> },
  {
    id: "peaks", name: "Mountains", render: () => <span className="lb-peaks">
      <svg viewBox="0 0 200 64" aria-hidden="true"><circle className="lb-peaks-sun" cx="140" cy="18" r="10" /><path d="M0 62 40 22l20 18 32-36 32 40 18-14 58 32" /></svg>
      <Mark />
    </span>,
  },
  {
    id: "duo", name: "Plane & car", render: () => <span className="lb-duo">
      <span className="lb-duo-l">W<Plane /><svg viewBox="0 0 60 20" aria-hidden="true"><path d="M2 18C20 18 40 12 58 2" /></svg></span>
      <Amp />
      <span className="lb-duo-r">W<Car /><i /></span>
    </span>,
  },
  { id: "seal", name: "Travel seal", render: () => <Seal /> },
  {
    id: "postcard", name: "Postcard", render: () => <span className="lb-postcard">
      <span className="lb-postcard-l"><Mark /><small>Greetings from Dubai</small></span>
      <span className="lb-postcard-r"><i className="lb-postcard-stamp"><Plane /></i><i /><i /><i /></span>
    </span>,
  },
  {
    id: "case", name: "Suitcase", render: () => <span className="lb-case">
      <svg viewBox="0 0 160 136" aria-hidden="true">
        <path className="lb-case-handle" d="M58 24V12a6 6 0 0 1 6-6h32a6 6 0 0 1 6 6v12" />
        <rect className="lb-case-body" x="4" y="24" width="152" height="100" rx="14" />
        <path className="lb-case-strap" d="M36 24v100M124 24v100" />
        <circle cx="30" cy="130" r="5" /><circle cx="130" cy="130" r="5" />
      </svg>
      <span className="lb-case-text"><Mark /></span>
    </span>,
  },
  {
    id: "balloon", name: "Hot-air balloon", render: () => <span className="lb-balloon">
      <svg viewBox="0 0 120 170" aria-hidden="true">
        <path className="lb-balloon-env" d="M60 4C28 4 6 28 6 56c0 26 22 44 38 60h32c16-16 38-34 38-60C114 28 92 4 60 4Z" />
        <path className="lb-balloon-gore" d="M60 4c-18 20-22 70-14 112M60 4c18 20 22 70 14 112" />
        <path className="lb-balloon-rope" d="M46 116l4 32M74 116l-4 32" />
        <rect className="lb-balloon-basket" x="46" y="146" width="28" height="20" rx="3" />
      </svg>
      <span className="lb-balloon-text"><Mark /></span>
    </span>,
  },
  {
    id: "paper", name: "Paper plane", render: () => <span className="lb-paper">
      <svg viewBox="0 0 260 120" aria-hidden="true">
        <path className="lb-paper-trail" d="M6 112C90 116 128 86 146 58c14-22-12-38-22-16-10 22 42 30 84-12" />
        <path className="lb-paper-plane" d="M206 30 254 8 236 54 224 38Z" /><path className="lb-paper-fold" d="M224 38 254 8" />
      </svg>
      <Mark />
    </span>,
  },
  {
    id: "clouds", name: "Above the clouds", render: () => <span className="lb-clouds">
      <svg viewBox="0 0 260 120" aria-hidden="true">
        <path d="M20 90c0-14 16-22 28-14 6-16 30-18 38-2 12-6 26 2 24 16Z" />
        <path d="M150 104c0-12 14-20 26-12 6-14 28-16 34-2 12-4 24 4 22 14Z" />
        <path d="M120 40c0-8 9-12 16-8 4-9 17-10 21-1 7-3 14 2 13 9Z" />
      </svg>
      <Plane className="lb-clouds-plane" />
      <Mark />
    </span>,
  },
  {
    id: "sign", name: "Signpost", render: () => <span className="lb-sign">
      <i className="lb-sign-post" />
      <span className="lb-sign-arrow lb-sign-left">W</span>
      <span className="lb-sign-arrow lb-sign-right">W</span>
      <Amp />
    </span>,
  },
  {
    id: "skyline", name: "Dubai skyline", render: () => <span className="lb-skyline">
      <Mark />
      <svg viewBox="0 0 200 60" aria-hidden="true"><path d="M0 60V48h12v-8h10v20h6V34h12v26h6V44l6-6 6 6v16h8V42h8v18h6V36h8v-6h5V20h3l2-12 2-8 2 8 2 12h3v10h5v6h8v24h6V40h10v20h6V30l8-6 8 6v30h6V46h12v14h6V38h10v22Z" /></svg>
    </span>,
  },
  { id: "postage", name: "Postage stamp", render: () => <span className="lb-postage"><span className="lb-postage-in"><small>Dubai · UAE</small><Mark /><span className="lb-postage-foot"><Plane /><b>5</b></span></span></span> },
  {
    id: "speed", name: "In motion", render: () => <span className="lb-speed">
      <svg viewBox="0 0 80 60" aria-hidden="true"><path d="M78 12H30M78 24H8M78 36H22M78 48H40" /></svg>
      <Mark />
    </span>,
  },
  {
    id: "orbit", name: "Orbit", render: () => <span className="lb-orbit">
      <svg className="lb-orbit-back" viewBox="0 0 300 120" aria-hidden="true"><path d="M12 64C12 30 288 30 288 64" /></svg>
      <Mark />
      <svg className="lb-orbit-front" viewBox="0 0 300 120" aria-hidden="true"><path d="M288 64C288 98 12 98 12 64" /></svg>
      <Plane className="lb-orbit-plane" />
    </span>,
  },
];
