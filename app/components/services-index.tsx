"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "./travel-image";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";

export type IndexedService = { icon: IconKind; title: string; line: string; photo: string; alt: string; position?: string; items: string[]; cta: string; service?: string };

/** A sticky photograph on the left reads along with the six services on the right as you scroll. */
export function ServicesIndex({ services }: { services: IndexedService[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const current = services[active];

  useEffect(() => {
    const rows = Array.from(list.current?.children ?? []) as HTMLElement[];
    if (!rows.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * .42;
      let best = 0, distance = Infinity;
      rows.forEach((row, i) => {
        const box = row.getBoundingClientRect();
        const d = box.top <= line && box.bottom >= line ? 0 : Math.min(Math.abs(box.top - line), Math.abs(box.bottom - line));
        if (d < distance) { distance = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return <div className="s-index" style={{ "--index-progress": (active + 1) / services.length } as React.CSSProperties}>
    <div className="s-index-media" data-enter>
      <div className="s-index-frame">
        {services.map((item, i) => <figure key={item.title} className={`s-index-photo${i === active ? " is-active" : ""}`} aria-hidden={i !== active}>
          <Image src={item.photo} alt={i === active ? item.alt : ""} fill sizes="(max-width: 991px) 1px, 42vw" style={item.position ? { objectPosition: item.position } : undefined} />
        </figure>)}
        <div className="s-index-frame-shade" aria-hidden="true" />
        <span className="s-index-count">{String(active + 1).padStart(2, "0")} <i>/</i> {String(services.length).padStart(2, "0")}</span>
        <div className="s-index-frame-caption" key={active}>
          <span className="s-index-pill"><TravelIcon kind={current.icon} size={18} />{current.title}</span>
          <p>{current.line}</p>
        </div>
      </div>
      <div className="s-index-track" aria-hidden="true"><span /></div>
    </div>

    <ol className="s-index-list" ref={list}>
      {services.map((item, i) => <li key={item.title} className={`s-index-row${i === active ? " is-active" : ""}${i < active ? " is-passed" : ""}`} aria-labelledby={`service-${i}`}>
        <div className="s-index-row-photo" aria-hidden="true">
          <Image src={item.photo} alt="" fill sizes="(max-width: 991px) 92vw, 1px" style={item.position ? { objectPosition: item.position } : undefined} />
        </div>
        <span className="s-index-num"><i>{String(i + 1).padStart(2, "0")}</i></span>
        <div className="s-index-row-body">
          <div className="s-index-row-head">
            <span className="s-index-icon" aria-hidden="true"><TravelIcon kind={item.icon} size={20} /></span>
            <h3 id={`service-${i}`}>{item.title}</h3>
          </div>
          <p className="s-index-line">{item.line}</p>
          <ul className="s-index-items">{item.items.map(line => <li key={line}>{line}</li>)}</ul>
          {item.service
            ? <EnquiryButton className="j-journey-enquiry s-index-cta" service={item.service}>{item.cta}</EnquiryButton>
            : <Link className="j-journey-enquiry s-index-cta" href="/contact">{item.cta}<Arrow /></Link>}
        </div>
      </li>)}
    </ol>
  </div>;
}
