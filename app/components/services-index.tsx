"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "./travel-image";
import { TravelIcon, type IconKind } from "./icons";
import { PillCta } from "./about-cta";

export type IndexedService = { icon: IconKind; title: string; line: string; photo: string; alt: string; position?: string; items: string[]; cta: string; service?: string };

/** Six services as one expanding strip: hover, click or arrow keys open a panel. */
export function ServicesIndex({ services }: { services: IndexedService[] }) {
  const [active, setActive] = useState(0);
  const fine = useRef(false);
  const panels = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    fine.current = matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const move = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + services.length) % services.length;
    setActive(next);
    panels.current[next]?.focus();
  };

  return <div className="s-strip" role="tablist" aria-label="Travel services" onKeyDown={move}>
    {services.map((item, index) => {
      const open = index === active;
      return <div
        key={item.title}
        ref={node => { panels.current[index] = node; }}
        className={`s-strip-panel${open ? " is-active" : ""}`}
        role="tab"
        aria-selected={open}
        aria-label={item.title}
        tabIndex={open ? 0 : -1}
        onPointerEnter={() => { if (fine.current) setActive(index); }}
        onClick={() => setActive(index)}
      >
        <Image src={item.photo} alt="" fill sizes="(max-width: 991px) 92vw, 60vw" style={item.position ? { objectPosition: item.position } : undefined} />
        <span className="s-strip-shade" aria-hidden="true" />
        <span className="s-strip-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="s-strip-rail" aria-hidden={open}>
          <TravelIcon kind={item.icon} size={18} />
          {item.title}
        </span>
        <div className="s-strip-copy" inert={!open}>
          <span className="s-strip-kicker"><TravelIcon kind={item.icon} size={16} />{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.line}</p>
          <ul>{item.items.map((line, n) => <li key={line} style={{ "--n": n } as CSSProperties}>{line}</li>)}</ul>
          <PillCta light service={item.service}>{item.cta}</PillCta>
        </div>
      </div>;
    })}
  </div>;
}
