"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "./travel-image";
import { TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";

export type CorporateService = { icon: IconKind; title: string; photo: string; alt: string; position?: string; items: string[]; service: string };

/** Six services as one expanding strip: hover, click or arrow keys open a panel. */
export function CorporateServices({ services }: { services: CorporateService[] }) {
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

  return <div className="k-strip" role="tablist" aria-label="Corporate travel services" onKeyDown={move} style={{ "--open": active } as CSSProperties}>
    {services.map((item, index) => {
      const open = index === active;
      return <div
        key={item.title}
        ref={node => { panels.current[index] = node; }}
        className={`k-panel${open ? " is-active" : ""}`}
        role="tab"
        aria-selected={open}
        aria-label={item.title}
        tabIndex={open ? 0 : -1}
        onPointerEnter={() => { if (fine.current) setActive(index); }}
        onClick={() => setActive(index)}
      >
        <Image src={item.photo} alt="" fill sizes="(max-width: 991px) 92vw, 60vw" style={item.position ? { objectPosition: item.position } : undefined} />
        <span className="k-panel-shade" aria-hidden="true" />
        <span className="k-panel-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="k-panel-rail" aria-hidden={open}>
          <TravelIcon kind={item.icon} size={18} />
          {item.title}
        </span>
        <div className="k-panel-copy" inert={!open}>
          <span className="k-panel-kicker"><TravelIcon kind={item.icon} size={16} />{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <ul>{item.items.map((line, n) => <li key={line} style={{ "--n": n } as CSSProperties}>{line}</li>)}</ul>
          <EnquiryButton className="k-panel-cta" service={item.service}>Ask about this</EnquiryButton>
        </div>
      </div>;
    })}
  </div>;
}
