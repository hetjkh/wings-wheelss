"use client";

import Image from "./travel-image";
import { useEffect, useRef, useState } from "react";

export type ValuePanel = { note: string; title: [string, string]; text: string; photo: string; alt: string; position?: string };

/** Two photo panels at a time; while the chapter is pinned, the scroll swaps the first pair for the second. */
export function ValuePanels({ items }: { items: ValuePanel[] }) {
  const list = useRef<HTMLUListElement>(null);
  const [step, setStep] = useState(0);
  const [stepped, setStepped] = useState(false);

  useEffect(() => {
    const section = list.current?.closest("section");
    if (!section) return;
    const onStep = (event: Event) => setStep((event as CustomEvent<number>).detail);
    const watch = new MutationObserver(() => setStepped(section.classList.contains("is-stepped")));
    section.addEventListener("chapter-step", onStep);
    watch.observe(section, { attributes: true, attributeFilter: ["class"] });
    return () => { section.removeEventListener("chapter-step", onStep); watch.disconnect(); };
  }, []);
  const hidden = (i: number) => stepped && Math.floor(i / 2) !== step;

  return <div className="p-panels-wrap">
    <ul ref={list} className="p-panels" data-step={step}>{items.map((item, i) => <li key={item.note} className="p-panel" aria-hidden={hidden(i) || undefined}>
      <div className="p-panel-photo"><Image src={item.photo} alt={item.alt} fill sizes="(max-width: 767px) 100vw, 50vw" style={{ objectPosition: item.position }} /></div>
      <div className="p-panel-shade" />
      <span className="p-panel-note">{String(i + 1).padStart(2, "0")} / {item.note}</span>
      <div className="p-panel-copy">
        <div><a className="p-panel-link" href="#proposal" tabIndex={hidden(i) ? -1 : undefined}>Ask about it <span>↗</span></a><h3>{item.title[0]}<br />{item.title[1]}</h3></div>
        <p>{item.text}</p>
      </div>
    </li>)}</ul>
    <div className="p-panels-count" aria-hidden="true"><span>0{step * 2 + 1}–0{step * 2 + 2}</span><i><b style={{ width: `${(step + 1) * 50}%` }} /></i><span>04</span></div>
    <div className="p-panels-edge" aria-hidden="true" />
  </div>;
}
