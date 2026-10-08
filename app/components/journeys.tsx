"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services } from "./data";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";

export function Services() {
  const [active, setActive] = useState(0);
  return <section className="services section-shell section-space" id="services" aria-labelledby="services-heading">
    <div className="section-heading" data-reveal>
      <div><span className="eyebrow">Different reasons to go. The same care.</span><h2 id="services-heading">Your world. <em>Your way.</em></h2></div>
      <div className="section-aside"><p>For the work, for the wonder, and everything in between. Hover a journey to open it up.</p></div>
    </div>
    <div className="service-panels" data-reveal>
      {services.map((s, i) => <article key={s.id} className={i === active ? "service-panel is-active" : "service-panel"} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
        <Image src={s.image} alt={s.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
        <div className="service-shade" />
        <span className="service-number">{s.number}</span>
        <span className="service-vertical" aria-hidden={i === active}>{s.label}</span>
        <div className="service-content" aria-hidden={i !== active}>
          <span className="eyebrow">{s.label}</span>
          <h3>{s.title}</h3>
          <p>{s.copy}</p>
          <ul>{s.points.map(p => <li key={p}><TravelIcon kind="check" size={15} />{p}</li>)}</ul>
          <EnquiryButton className="button button-light" service={s.label}>Make it your journey</EnquiryButton>
        </div>
      </article>)}
    </div>
  </section>;
}

const stats = [
  { value: 6, suffix: "", label: "Regional locations" },
  { value: 100, suffix: "+", label: "Travel partners" },
];

function CountUp({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1800);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value]);
  return <>{shown.toLocaleString("en-US")}{suffix}</>;
}

export function Numbers() {
  const root = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setRun(true); observer.disconnect(); } }, { threshold: 0.35 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const seals = [
    ...stats.map(s => ({ label: s.label, center: <CountUp value={s.value} suffix={s.suffix} run={run} /> })),
    { label: "Global destinations", center: <TravelIcon kind="globe" size={38} /> },
  ];
  return <section className="people section-shell section-space" ref={root} aria-labelledby="numbers-heading">
    <div className="people-head" data-reveal>
      <div>
        <span className="eyebrow eyebrow-rule">The people behind W&amp;W</span>
        <h2 id="numbers-heading">Travel is still <em>a people business.</em></h2>
      </div>
      <p>Behind every Wings &amp; Wheels journey is a team coordinating the details, communicating with travellers and helping keep plans moving.</p>
    </div>

    <div className="people-stage" data-reveal>
      <figure className="people-frame">
        <Image src="/images/groups.png" alt="The Wings & Wheels team travelling together through an airport" fill sizes="(max-width: 1200px) 100vw, 1200px" />
        <figcaption><span className="script">One team.</span>Multiple markets.</figcaption>
      </figure>
      <span className="people-notch"><a className="button button-dark" href="#story">Meet our team <Arrow /></a></span>

      <ul className="people-seals">
        {seals.map((s, i) => <li key={s.label}>
          <svg viewBox="0 0 160 160" aria-hidden="true">
            <defs><path id={`seal-${i}`} d="M80 80m-62 0a62 62 0 1 1 124 0a62 62 0 1 1-124 0" /></defs>
            <text><textPath href={`#seal-${i}`} textLength="386" lengthAdjust="spacing">{`${s.label} • ${s.label} • `}</textPath></text>
          </svg>
          <strong>{s.center}</strong>
          <span className="sr-only">{s.label}</span>
        </li>)}
      </ul>
    </div>
  </section>;
}
