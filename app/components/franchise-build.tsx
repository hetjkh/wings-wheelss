"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "./travel-image";
import { Arrow, TravelIcon, type IconKind } from "./icons";

export type FranchiseBuildItem = {
  title: string;
  text: string;
  photo: string;
  alt: string;
  position?: string;
  icon: IconKind;
};

/** Yachtlux-style accordion: quiet paper cards open into a cinematic stage. */
export function FranchiseBuild({ items }: { items: FranchiseBuildItem[] }) {
  const [active, setActive] = useState(0);
  const fine = useRef(false);
  const panels = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    fine.current = matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const move = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + items.length) % items.length;
    setActive(next);
    panels.current[next]?.focus();
  };

  return <div className="f-build-stage" style={{ "--open": active, "--count": items.length } as CSSProperties}>
    <div
      className="f-build-strip"
      role="tablist"
      aria-label="What you can build"
      onKeyDown={move}
    >
      {items.map((item, index) => {
        const open = index === active;
        return <button
          key={item.title}
          type="button"
          ref={node => { panels.current[index] = node; }}
          className={`f-build-panel${open ? " is-active" : ""}`}
          role="tab"
          aria-selected={open}
          aria-label={`${item.title}. ${item.text}`}
          tabIndex={open ? 0 : -1}
          onPointerEnter={() => { if (fine.current) setActive(index); }}
          onFocus={() => setActive(index)}
          onClick={() => setActive(index)}
        >
          <span className="f-build-photo" aria-hidden={!open}>
            <Image
              src={item.photo}
              alt=""
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1199px) 70vw, 55vw"
              style={item.position ? { objectPosition: item.position } : undefined}
            />
          </span>
          <span className="f-build-shade" aria-hidden="true" />

          <span className="f-build-orb" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id={`f-build-ring-${index}`} d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
              </defs>
              <text><textPath href={`#f-build-ring-${index}`} startOffset="0%">Explore · Build · Expand · </textPath></text>
            </svg>
            <i><Arrow diagonal /></i>
          </span>

          <span className="f-build-rest" aria-hidden={open}>
            <span className="f-build-rest-icon"><TravelIcon kind={item.icon} size={28} /></span>
            <span className="f-build-rest-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </span>

          <span className="f-build-open" aria-hidden={!open}>
            <span className="f-build-open-index">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </span>
        </button>;
      })}
    </div>

    <div className="f-build-nav" aria-hidden="true">
      {items.map((item, index) => <button
        key={item.title}
        type="button"
        className={`f-build-dot${index === active ? " is-active" : ""}`}
        tabIndex={-1}
        onClick={() => setActive(index)}
        aria-label={item.title}
      />)}
      <span className="f-build-nav-label">
        {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </span>
    </div>
  </div>;
}
