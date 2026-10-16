"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import type { LogoFont } from "./fonts";
import { travelLayouts } from "./travel-layouts";

const themes = [
  { id: "cream", label: "Cream", bg: "#f7f1e6", fg: "#2b2119", accent: "#b5462a" },
  { id: "ink", label: "Ink", bg: "#2b2119", fg: "#f3e7cf", accent: "#ecd9ad" },
  { id: "terra", label: "Terracotta", bg: "#b5462a", fg: "#fff3e0", accent: "#2b2119" },
  { id: "sand", label: "Sand", bg: "#ecd9ad", fg: "#2b2119", accent: "#8e3a22" },
  { id: "forest", label: "Forest", bg: "#1d2a22", fg: "#f3ead8", accent: "#f2d7a0" },
];

const Amp = () => <span className="lb-amp">&amp;</span>;

const monogramLayouts: { id: string; name: string; render: () => ReactNode }[] = [
  { id: "classic", name: "Classic", render: () => <span className="lb-row">W<Amp />W</span> },
  { id: "stacked", name: "Stacked", render: () => <span className="lb-stack"><span>W</span><Amp /><span>W</span></span> },
  { id: "overlap", name: "Interlocked", render: () => <span className="lb-overlap"><span>W</span><span>W</span><Amp /></span> },
  { id: "circle", name: "Circle monogram", render: () => <span className="lb-circle"><span className="lb-row">W<Amp />W</span></span> },
  { id: "diamond", name: "Diamond", render: () => <span className="lb-diamond"><span className="lb-row">W<Amp />W</span></span> },
  {
    id: "crest", name: "Crest", render: () => <span className="lb-crest">
      <svg viewBox="0 0 100 120" aria-hidden="true"><path d="M50 4 94 18v38c0 30-20 50-44 60C26 106 6 86 6 56V18Z" /><path d="M50 12 86 24v32c0 25-16 42-36 51-20-9-36-26-36-51V24Z" /></svg>
      <span className="lb-row">W<Amp />W</span><small>Est. Dubai</small>
    </span>,
  },
  { id: "reflect", name: "Reflection", render: () => <span className="lb-reflect"><span className="lb-row">W<Amp />W</span><span className="lb-row" aria-hidden="true">W<Amp />W</span></span> },
  { id: "big-amp", name: "Grand ampersand", render: () => <span className="lb-bigamp"><span className="lb-bigamp-bg">&amp;</span><span className="lb-row">W<span className="lb-gap" />W</span></span> },
  { id: "outline", name: "Outline", render: () => <span className="lb-row lb-outline"><span>W</span><Amp /><span>W</span></span> },
  { id: "split", name: "Solid & line", render: () => <span className="lb-row lb-split"><span>W</span><Amp /><span>W</span></span> },
  { id: "pill", name: "Badge", render: () => <span className="lb-pill"><span className="lb-row">W<Amp />W</span><small>Wings · Wheels</small></span> },
  {
    id: "wing-wheel", name: "Wing & wheel", render: () => <span className="lb-ww">
      <span className="lb-ww-wing"><svg viewBox="0 0 60 40" aria-hidden="true"><path d="M58 30C40 30 18 24 2 6M58 22C42 22 24 17 12 6M58 14C46 14 34 11 24 5" /></svg>W</span>
      <Amp />
      <span className="lb-ww-wheel"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" /><circle cx="50" cy="50" r="40" /><path d="M50 10v80M10 50h80M22 22l56 56M78 22 22 78" /></svg>W</span>
    </span>,
  },
  {
    id: "postmark", name: "Postmark", render: () => <span className="lb-post">
      <span className="lb-post-ring"><span className="lb-row">W<Amp />W</span><small>Dubai · UAE</small></span>
      <svg className="lb-post-waves" viewBox="0 0 120 60" aria-hidden="true"><path d="M0 10q10-8 20 0t20 0 20 0 20 0 20 0 20 0M0 30q10-8 20 0t20 0 20 0 20 0 20 0 20 0M0 50q10-8 20 0t20 0 20 0 20 0 20 0 20 0" /></svg>
    </span>,
  },
  { id: "framed", name: "Framed wordmark", render: () => <span className="lb-framed"><span>W</span><span className="lb-framed-word"><b>Wings</b><Amp /><b>Wheels</b></span><span>W</span></span> },
  { id: "italic", name: "Swash", render: () => <span className="lb-swash"><span className="lb-row">W<Amp />W</span><svg viewBox="0 0 200 30" aria-hidden="true"><path d="M4 22C50 4 120 2 196 14" /></svg></span> },
  { id: "tile", name: "Diagonal tile", render: () => <span className="lb-tile"><span>W</span><Amp /><span>W</span></span> },
];

export type LayoutGroup = { id: string; label: string; layouts: { id: string; name: string; render: () => ReactNode }[] };

export const pairGroups: LayoutGroup[] = [
  { id: "monogram", label: "Monogram", layouts: monogramLayouts },
  { id: "travel", label: "Travel", layouts: travelLayouts },
];

export function LogoLab({ fonts, groups, sample = "W&W", className = "" }: { fonts: LogoFont[]; groups: LayoutGroup[]; sample?: string; className?: string }) {
  const layouts = groups.flatMap(group => group.layouts.map(item => ({ ...item, group: group.id })));
  const filters = [{ id: "all", label: `All · ${layouts.length}` }, ...groups.map(group => ({ id: group.id, label: `${group.label} · ${group.layouts.length}` }))];
  const [font, setFont] = useState(fonts[0]);
  const [theme, setTheme] = useState(themes[0]);
  const [layout, setLayout] = useState(layouts[0]);
  const [filter, setFilter] = useState("all");
  const [spacing, setSpacing] = useState(0);
  const vars = { "--lf": font.family, "--lbg": theme.bg, "--lfg": theme.fg, "--lac": theme.accent, "--lsp": `${spacing / 100}em` } as CSSProperties;

  return <div className={`lb ${className}`} style={vars}>
    <div className="lb-controls">
      <div className="lb-group">
        <span className="lb-group-label">Font · {font.label}</span>
        <div className="lb-fonts" role="radiogroup" aria-label="Font">
          {fonts.map(item => <button key={item.id} type="button" role="radio" aria-checked={item.id === font.id} className={item.id === font.id ? "is-on" : ""} onClick={() => setFont(item)}>
            <span style={{ fontFamily: item.family }}>{sample}</span>
            <small>{item.label}</small>
          </button>)}
        </div>
      </div>
      <div className="lb-row-controls">
        <div className="lb-group">
          <span className="lb-group-label">Colour</span>
          <div className="lb-themes" role="radiogroup" aria-label="Colour">
            {themes.map(item => <button key={item.id} type="button" role="radio" aria-checked={item.id === theme.id} className={item.id === theme.id ? "is-on" : ""} onClick={() => setTheme(item)}>
              <i style={{ background: item.bg, boxShadow: `inset -8px 0 0 ${item.accent}` }} />{item.label}
            </button>)}
          </div>
        </div>
        <label className="lb-group lb-spacing">
          <span className="lb-group-label">Letter spacing · {spacing > 0 ? "+" : ""}{spacing}</span>
          <input type="range" min={-15} max={30} value={spacing} onChange={event => setSpacing(Number(event.target.value))} />
        </label>
      </div>
    </div>

    <figure className="lb-stage" aria-label={`${layout.name} layout in ${font.label}`}>
      <div className="lb-art lb-art-stage">{layout.render()}</div>
      <figcaption><span>{String(layouts.findIndex(item => item.id === layout.id) + 1).padStart(2, "0")} · {layout.name}</span><span>{font.label} · {theme.label}</span></figcaption>
    </figure>

    {groups.length > 1 && <div className="lb-filters" role="radiogroup" aria-label="Layout group">
      {filters.map(item => <button key={item.id} type="button" role="radio" aria-checked={item.id === filter} className={item.id === filter ? "is-on" : ""} onClick={() => setFilter(item.id)}>{item.label}</button>)}
    </div>}

    <ul className="lb-grid">
      {layouts.map((item, i) => (filter === "all" || item.group === filter) && <li key={item.id}>
        <button type="button" className={item.id === layout.id ? "is-on" : ""} onClick={() => { setLayout(item); window.scrollTo({ top: document.querySelector(".lb-stage")!.getBoundingClientRect().top + window.scrollY - 24, behavior: "smooth" }); }}>
          <span className="lb-art">{item.render()}</span>
          <span className="lb-card-name">{String(i + 1).padStart(2, "0")} · {item.name}</span>
        </button>
      </li>)}
    </ul>
  </div>;
}
