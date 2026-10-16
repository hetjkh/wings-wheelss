"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";

export type PartnerLevel = {
  id: string; name: string; for: string; text: string; items: string[];
  scale: { label: string; value: number }[]; featured?: boolean;
};

function Card({ name, id }: { name: string; id: string }) {
  return <>
    <span className="p-card-brand">Wings &amp; Wheels</span>
    <span className="p-card-chip" />
    <span className="p-card-name">{name}</span>
    <span className="p-card-foot"><span>Corporate partner</span><span>{id === "bespoke" ? "By invitation" : "Dubai · Africa · Worldwide"}</span></span>
  </>;
}

/** Three partnership levels: the cards fan out on the left, the chosen level reads out on the right. */
export function PartnerLevels({ levels }: { levels: PartnerLevel[] }) {
  const [active, setActive] = useState(Math.max(0, levels.findIndex(level => level.featured)));
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const level = levels[active];

  const onKey = (event: KeyboardEvent) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + levels.length) % levels.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return <div className="p-tiers">
    <div className="p-tiers-stage" aria-hidden="true">
      <div className="p-tiers-orbit" />
      <div className="p-stack">{levels.map((item, i) => {
        const pos = (i - active + levels.length) % levels.length;
        return <button key={item.id} type="button" tabIndex={-1} className={`p-card p-card-${item.id}`} data-pos={pos} onClick={() => setActive(i)}>
          <Card name={item.name} id={item.id} />
        </button>;
      })}</div>
      <div className="p-tiers-dots">{levels.map((item, i) => <span key={item.id} className={i === active ? "is-on" : undefined} />)}</div>
    </div>

    <div className="p-tiers-side">
      <div className="p-tiers-tabs" role="tablist" aria-label="Partnership levels" onKeyDown={onKey}>
        {levels.map((item, i) => <button key={item.id} ref={el => { tabs.current[i] = el; }} type="button" role="tab" id={`tier-tab-${item.id}`} aria-selected={i === active} aria-controls="tier-panel" tabIndex={i === active ? 0 : -1} className={i === active ? "is-on" : undefined} onClick={() => setActive(i)}>
          <span className="p-tiers-num">0{i + 1}</span>
          <strong>{item.name}</strong>
          <small>{item.for}</small>
        </button>)}
      </div>

      <div className="p-tiers-panel" id="tier-panel" role="tabpanel" aria-labelledby={`tier-tab-${level.id}`} key={level.id}>
        <div className="p-tiers-head">
          <h3>Corporate {level.name}</h3>
          {level.featured && <span className="p-tiers-badge">Most chosen</span>}
        </div>
        <p className="p-tiers-text">{level.text}</p>

        <dl className="p-tiers-scale">{level.scale.map(row => <div key={row.label}>
          <dt>{row.label}</dt>
          <dd aria-label={`${row.value} of 3`}>{[1, 2, 3].map(n => <i key={n} className={n <= row.value ? "is-on" : undefined} />)}</dd>
        </div>)}</dl>

        <span className="p-tiers-label">What&apos;s included</span>
        <ul className="p-tiers-list">{level.items.map(item => <li key={item}><TravelIcon kind="check" size={16} />{item}</li>)}</ul>

        <div className="p-tiers-actions">
          <EnquiryButton className="j-button j-button-olive" service={`Corporate ${level.name} partnership`}>Enquire about {level.name}</EnquiryButton>
          <a className="p-tiers-link" href="#proposal">Request a proposal <Arrow /></a>
        </div>
      </div>
    </div>
  </div>;
}
