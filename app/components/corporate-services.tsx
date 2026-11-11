"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "./travel-image";
import { getImageProps } from "next/image";
import { TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";

export type CorporateService = { icon: IconKind; title: string; photo: string; photoMobile?: string; originalQuality?: boolean; alt: string; position?: string; items: string[]; service: string };

/** Six services as one expanding strip: hover, click or arrow keys open a panel. */
export function CorporateServices({ services }: { services: CorporateService[] }) {
  const [active, setActive] = useState(0);
  const fine = useRef(false);
  const panels = useRef<Array<HTMLDivElement | null>>([]);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fine.current = matchMedia("(hover: hover) and (pointer: fine)").matches;
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const open = (index: number, immediate = false) => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    if (immediate) {
      setActive(index);
      return;
    }
    // Brief pause so sweeping the cursor doesn't thrash mid-animation.
    hoverTimer.current = setTimeout(() => setActive(index), 90);
  };

  const move = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + services.length) % services.length;
    open(next, true);
    panels.current[next]?.focus();
  };

  return <div
    className="k-strip"
    role="tablist"
    aria-label="Corporate travel services"
    onKeyDown={move}
    style={{ "--open": active, "--count": services.length } as CSSProperties}
  >
    {services.map((item, index) => {
      const isOpen = index === active;
      const mobileImage = item.photoMobile ? getImageProps({ src: item.photoMobile, alt: "", fill: true, sizes: "92vw", quality: 90 }).props : null;
      return <div
        key={item.title}
        ref={node => { panels.current[index] = node; }}
        className={`k-panel${isOpen ? " is-active" : ""}`}
        role="tab"
        aria-selected={isOpen}
        aria-label={item.title}
        tabIndex={isOpen ? 0 : -1}
        onPointerEnter={() => { if (fine.current) open(index); }}
        onFocus={() => open(index, true)}
        onClick={() => open(index, true)}
      >
        <picture>
          {mobileImage ? <source media="(max-width: 767px)" srcSet={item.originalQuality ? item.photoMobile : mobileImage.srcSet} sizes={mobileImage.sizes} /> : null}
          <Image src={item.photo} alt="" fill unoptimized={item.originalQuality} lockSizes={item.originalQuality} sizes="(max-width: 991px) 92vw, 60vw" style={item.position ? { objectPosition: item.position } : undefined} />
        </picture>
        <span className="k-panel-shade" aria-hidden="true" />
        <span className="k-panel-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="k-panel-rail" aria-hidden={isOpen}>
          <TravelIcon kind={item.icon} size={18} />
          {item.title}
        </span>
        <div className="k-panel-copy" inert={!isOpen}>
          <span className="k-panel-kicker"><TravelIcon kind={item.icon} size={16} />{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <ul>{item.items.map((line, n) => <li key={line} style={{ "--n": n } as CSSProperties}>{line}</li>)}</ul>
          <EnquiryButton className="k-panel-cta" service={item.service}>Ask about this</EnquiryButton>
        </div>
      </div>;
    })}
  </div>;
}
