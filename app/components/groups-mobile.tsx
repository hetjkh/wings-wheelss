"use client";

import { useRef, useState } from "react";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import Image from "./travel-image";

const serviceGroups = [
  { title: "Flights & preparation", icon: "plane", photo: "/images/library/journey-above-clouds.webp", text: "Individual and group flights across departure cities, with visa assistance and pre-travel document support." },
  { title: "Stays & transfers", icon: "bed", photo: "/images/library/services-hotels-v3.webp", text: "Hotel rooms, airport pickups and transport between your hotel, venue and event, arranged around the group." },
  { title: "People & support", icon: "support", photo: "/images/library/services-support-v4.webp", text: "A clear itinerary for executives, speakers and delegates, with someone to help when timings or plans change." },
] satisfies { title: string; icon: IconKind; photo: string; text: string }[];

export function MobileGroupServices() {
  return <div className="gm-services g-mobile-only">
    <p className="gm-intro">Flights, stays and every journey in between. All taken care of by one team.</p>
    <div className="gm-disclosures" data-stagger>{serviceGroups.map(group => <details key={group.title} name="group-mobile-services">
      <summary>
        <span className="gm-service-photo" aria-hidden="true"><Image src={group.photo} alt="" fill sizes="(max-width: 767px) 90vw, 1px" /></span>
        <span className="gm-service-icon"><TravelIcon kind={group.icon} size={23} /></span>
        <span className="gm-service-title">{group.title}</span><span className="gm-plus" aria-hidden="true" />
      </summary>
      <p>{group.text}</p>
    </details>)}</div>
    <div className="gm-service-journey" aria-hidden="true">
      <svg viewBox="0 0 340 88" fill="none"><path d="M12 69C65 44 105 17 148 25S225 90 322 44" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" /></svg>
      <span className="gm-service-plane"><TravelIcon kind="plane" size={27} /></span>
      <span className="gm-service-pin"><TravelIcon kind="pin" size={19} /></span>
    </div>
  </div>;
}

export function MobileGroupChanges() {
  return <div className="gm-changes g-mobile-only">
    <p className="gm-intro">When timings change, we adjust the arrangements and keep your whole group informed.</p>
    <details className="gm-change-example">
      <summary>A flight delay, handled.<span className="gm-plus" aria-hidden="true" /></summary>
      <p>A Nairobi flight is delayed. We arrange a later pickup, hold the hotel rooms and share the revised schedule with the group and event team.</p>
    </details>
  </div>;
}

type ProcessStep = { icon: IconKind; phase: string; title: string; text: string };

export function MobileGroupProcess({ steps }: { steps: ProcessStep[] }) {
  const rail = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const go = (index: number) => {
    const element = rail.current;
    const slide = element?.children[index] as HTMLElement | undefined;
    if (!element || !slide) return;
    element.scrollTo({ left: slide.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return <div className="gm-process g-mobile-only">
    <ol className="gm-process-slides" ref={rail} tabIndex={0} aria-label="The six stages of planning your group travel"
      onScroll={event => {
        const element = event.currentTarget;
        if (element.clientWidth) setActive(Math.min(steps.length - 1, Math.max(0, Math.round(element.scrollLeft / element.clientWidth))));
      }}
      onKeyDown={event => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        go(Math.min(steps.length - 1, Math.max(0, active + (event.key === "ArrowRight" ? 1 : -1))));
      }}>
      {steps.map((step, index) => <li key={step.title} aria-label={`Step ${index + 1} of ${steps.length}`}>
        <span className="gm-process-phase">{step.phase}</span>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </li>)}
    </ol>
    <div className="gm-process-controls">
      <span aria-live="polite" aria-atomic="true"><span className="gm-sr-only">Step </span>{String(active + 1).padStart(2, "0")} <i>/ {String(steps.length).padStart(2, "0")}</i></span>
      <div>
        <button type="button" aria-label="Previous planning step" disabled={active === 0} onClick={() => go(active - 1)}><Arrow back /></button>
        <button type="button" aria-label="Next planning step" disabled={active === steps.length - 1} onClick={() => go(active + 1)}><Arrow /></button>
      </div>
    </div>
  </div>;
}
