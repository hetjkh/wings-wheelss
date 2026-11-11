"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import Image from "./travel-image";
import { TravelIcon, type IconKind } from "./icons";

export type ConvergeOrigin = {
  city: string;
  who: string;
  code: string;
  arrives: string;
  path: string;
  photo: string;
  alt: string;
};

export type ConvergeStep = { icon: IconKind; label: string };

/** Orbit-hub stage inspired by React Bits Orbit Images + Yachtlux featured panels. */
export function GroupsConverge({
  origins,
  sequence,
}: {
  origins: ConvergeOrigin[];
  sequence: ConvergeStep[];
}) {
  const [active, setActive] = useState(0);
  const fine = useRef(false);
  const cards = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    fine.current = matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  const move = (event: KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const back = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !back) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + origins.length) % origins.length;
    setActive(next);
    cards.current[next]?.focus();
  };

  const glare = (event: PointerEvent<HTMLButtonElement>) => {
    if (!fine.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--glare-x", `${x}%`);
    event.currentTarget.style.setProperty("--glare-y", `${y}%`);
  };

  const current = origins[active];

  return <div className="g-converge-orbit" style={{ "--active": active } as CSSProperties}>
    <figure
      className="g-orbit-stage"
      data-progress="top 85%"
      data-progress-end="top 30%"
      aria-label="Executives from London, a sales team from Riyadh, delegates from Nairobi and suppliers from Mumbai, all travelling to one event in Dubai"
    >
      <div className="g-orbit-rings" aria-hidden="true">
        <i className="g-orbit-halo g-orbit-halo-a" />
        <i className="g-orbit-halo g-orbit-halo-b" />
        <i className="g-orbit-halo g-orbit-halo-c" />
      </div>

      <svg className="g-orbit-lines" viewBox="0 0 1000 620" aria-hidden="true">
        {origins.map((origin, i) => <g key={origin.city} data-city={i} className={i === active ? "is-active" : ""}>
          <path className="g-orbit-track" d={origin.path} />
          <path className="g-orbit-route" data-trace pathLength={1} d={origin.path} />
          <circle className="g-orbit-light" r="5">
            <animateMotion dur="4.2s" begin={`${i * .85}s`} repeatCount="indefinite" path={origin.path} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".42 0 .2 1" />
          </circle>
        </g>)}
      </svg>

      <div className="g-orbit-hub">
        <span className="g-orbit-hub-spin" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="g-orbit-hub-path" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
            </defs>
            <text><textPath href="#g-orbit-hub-path" startOffset="0%">Many cities · One venue · Many cities · One venue · </textPath></text>
          </svg>
        </span>
        <div className="g-orbit-hub-core">
          <Image src="/images/library/dubai-panorama.webp" alt="" fill sizes="(max-width: 991px) 55vw, 28vw" />
          <div className="g-orbit-hub-copy">
            <span>The venue</span>
            <strong>Dubai</strong>
            <em>One event.</em>
          </div>
        </div>
      </div>

      <div
        className="g-orbit-passes"
        role="tablist"
        aria-label="Arrival cities"
        onKeyDown={move}
      >
        {origins.map((origin, index) => {
          const open = index === active;
          return <button
            key={origin.city}
            type="button"
            ref={node => { cards.current[index] = node; }}
            className={`g-orbit-pass${open ? " is-active" : ""}`}
            data-city={index}
            role="tab"
            aria-selected={open}
            tabIndex={open ? 0 : -1}
            style={{ "--i": index } as CSSProperties}
            onPointerEnter={() => { if (fine.current) setActive(index); }}
            onPointerMove={glare}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <span className="g-orbit-pass-photo" aria-hidden="true">
              <Image src={origin.photo} alt="" fill sizes="(max-width: 991px) 42vw, 18vw" />
            </span>
            <span className="g-orbit-pass-glare" aria-hidden="true" />
            <span className="g-orbit-pass-body">
              <span className="g-orbit-pass-route">{origin.code} <TravelIcon kind="plane" size={13} /> DXB</span>
              <strong>{origin.city}</strong>
              <span className="g-orbit-pass-foot">
                <span>{origin.who}</span>
                <span>Arr {origin.arrives}</span>
              </span>
            </span>
          </button>;
        })}
      </div>

      <figcaption className="g-orbit-caption">
        <span className="g-orbit-caption-index">{String(active + 1).padStart(2, "0")} / {String(origins.length).padStart(2, "0")}</span>
        <p>
          <strong>{current.who}</strong> from <em>{current.city}</em> arrive at <em>{current.arrives}</em>
        </p>
      </figcaption>
    </figure>

    <div className="g-route" data-progress="top 95%" data-progress-end="top 70%">
      <p>We bring every movement into one plan</p>
      <ol>{sequence.map((step, i) => <li key={step.label} style={{ "--i": i } as CSSProperties}><TravelIcon kind={step.icon} size={16} />{step.label}</li>)}</ol>
      <p className="g-route-close">One coordinated journey.</p>
    </div>
  </div>;
}
