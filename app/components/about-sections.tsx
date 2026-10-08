"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Arrow, TravelIcon, type IconKind } from "./icons";

const reasons: { icon: IconKind; title: string; copy: string; before: string; after: string; image: string; alt: string }[] = [
  { icon: "briefcase", title: "Business", copy: "Meetings, projects and regional travel.", before: "A CEO has a meeting", after: "tomorrow.", image: "/images/corporate.png", alt: "A business traveller checking his phone in an airport lounge at sunset" },
  { icon: "heart", title: "Leisure", copy: "Holidays and memorable journeys.", before: "A family has been planning a holiday", after: "for months.", image: "/images/maldives.jpg", alt: "Turquoise water and white sand in the Maldives" },
  { icon: "people", title: "Groups & MICE", copy: "Organised travel across multiple travellers.", before: "A company is bringing delegates", after: "to an exhibition.", image: "/images/groups.png", alt: "A group of colleagues walking through an airport with luggage" },
  { icon: "route", title: "Connections", copy: "Between the UAE, Africa and worldwide.", before: "A traveller is connecting between Africa, Dubai", after: "and somewhere beyond.", image: "/images/dubai.jpg", alt: "The Dubai skyline at dusk" },
];

const needs = ["Clear information", "Good coordination", "Someone there when it matters"];

export function WhoWeAre() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => setActive(a => (a + 1) % reasons.length), 4200);
    return () => clearTimeout(timer);
  }, [active, paused]);
  return <section className="who section-shell section-space" id="who" aria-labelledby="who-heading" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="who-head" data-reveal>
      <div><span className="eyebrow eyebrow-rule">Who we are</span><h2 id="who-heading">More than <em>a booking.</em></h2></div>
      <p className="who-lead"><span className="script">People travel for</span> different reasons.</p>
    </div>
    <div className="who-body">
      <ol className="who-lines" data-reveal>
        {reasons.map((r, i) => <li key={r.title} className={i === active ? "is-active" : undefined}>
          <button type="button" onClick={() => setActive(i)} onFocus={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-pressed={i === active}>
            <span className="who-index">0{i + 1}</span>
            <span className="who-sentence">{r.before} {r.after}</span>
          </button>
        </li>)}
      </ol>
      <figure className="who-visual" data-reveal>
        <div className="who-frame">{reasons.map((r, i) => <Image key={r.title} src={r.image} alt={i === active ? r.alt : ""} fill sizes="(max-width: 1150px) 100vw, 380px" className={i === active ? "is-active" : undefined} />)}</div>
        <span className="who-count">0{active + 1} <i>/ 0{reasons.length}</i></span>
        <figcaption key={active}>
          <span className="who-tag"><TravelIcon kind={reasons[active].icon} size={14} />{reasons[active].title}</span>
          <span>{reasons[active].copy}</span>
        </figcaption>
      </figure>
    </div>
    <div className="who-foot" data-reveal>
      <p><span className="script">Different journeys.</span> The same&nbsp;need&nbsp;—</p>
      <ul>{needs.map((n, i) => <li key={n}><span>{String.fromCharCode(97 + i)}.</span>{n}</li>)}</ul>
    </div>
  </section>;
}

const ways = [
  { href: "#services", label: "Business", index: "01", title: ["Business when it", "needs to ", "work."], copy: "Meetings, projects and regional travel, coordinated so nothing gets missed.", tags: ["Flights", "Hotels", "Visas", "Transfers"], cta: "Explore corporate travel", image: "/images/corporate.png", alt: "A business traveller with luggage looking out over the Dubai skyline at sunset" },
  { href: "#map", label: "Leisure", index: "02", title: ["Leisure when it needs", "to feel ", "different."], copy: "Holidays and memorable journeys, shaped around the way you like to travel.", tags: ["Holidays", "Safaris", "Islands", "Experiences"], cta: "Explore destinations", image: "/images/dubai-terrace.png", alt: "A traveller relaxing on a terrace overlooking the water at sunset" },
];

export function BusinessLeisure() {
  return <section className="ways section-shell" aria-labelledby="ways-heading">
    <div className="ways-head" data-reveal>
      <span className="eyebrow">Two ways to travel</span>
      <h2 id="ways-heading">Same team. Same attention <em>to the journey.</em></h2>
    </div>
    <div className="ways-grid" data-reveal>
      {ways.map(w => <a key={w.label} href={w.href} className="way-card">
        <Image src={w.image} alt={w.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
        <span className="way-shade" />
        <span className="way-label"><b>{w.index}</b>{w.label}</span>
        <span className="way-content">
          <span className="way-title">{w.title[0]}<br />{w.title[1]}<em>{w.title[2]}</em></span>
          <span className="way-copy">{w.copy}</span>
          <span className="way-tags">{w.tags.map(t => <span key={t}>{t}</span>)}</span>
          <span className="way-cta">{w.cta} <span className="way-arrow"><Arrow diagonal /></span></span>
        </span>
      </a>)}
      <div className="ways-badge" aria-hidden="true">
        <svg viewBox="0 0 100 100"><defs><path id="ways-circle" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" /></defs><text><textPath href="#ways-circle" textLength="228" lengthAdjust="spacing">Same team · Same attention · </textPath></text></svg>
        <span><TravelIcon kind="plane" size={26} /></span>
      </div>
    </div>
  </section>;
}

const steps: [IconKind, string, string][] = [
  ["plane", "You tell us where you need to be", "A meeting, a holiday or a team event. It starts with where you need to be, and when."],
  ["search", "We understand the journey", "Who's travelling, what matters most, and what could change along the way."],
  ["document", "We coordinate the details", "Flights, hotels, visas and transfers, planned to work together as one journey."],
  ["briefcase", "You travel", "Everything is in place, so you can focus on why you're going."],
  ["support", "We stay available", "If plans change, a real person is there to help you through it."],
];

const parts = ["Flights", "Hotels", "Visas", "Transfers", "Groups", "Experiences", "Support"];

export function WhatWeDo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => setActive(i => (i + 1) % steps.length), 3200);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return <section className="what-we-do" id="what-we-do" aria-labelledby="what-heading">
    <Image src="/images/mountains.jpg" alt="" fill sizes="100vw" />
    <div className="what-shade" />
    <div className="section-shell what-layout">
      <div className="what-intro" data-reveal>
        <span className="eyebrow">What we do</span>
        <h2 id="what-heading">We connect the parts of <em>the journey.</em></h2>
        <p>The booking is one part.<br />The journey is the whole picture.</p>
      </div>
      <div className="what-steps" data-reveal onMouseLeave={() => setPaused(false)}>
        <div className="what-track" role="tablist" aria-label="How we work" style={{ "--progress": active / (steps.length - 1) } as React.CSSProperties}>
          {steps.map(([icon, title], i) => <button key={title} type="button" role="tab" aria-selected={i === active} className={i <= active ? (i === active ? "what-step is-active" : "what-step is-done") : "what-step"} onMouseEnter={() => { setPaused(true); setActive(i); }} onFocus={() => { setPaused(true); setActive(i); }} onClick={() => setActive(i)}>
            <span className="what-icon"><TravelIcon kind={icon} size={26} /></span>
            <span className="what-title">{title}</span>
          </button>)}
        </div>
        <p className="what-detail" key={active} aria-live="polite"><span>0{active + 1}</span>{steps[active][2]}</p>
        <ul className="what-parts" aria-label="What we coordinate">{parts.map(p => <li key={p}>{p}</li>)}</ul>
      </div>
    </div>
  </section>;
}

const pillars = [
  { word: "People", caption: "Travellers, teams and families, each with their own reason to go.", image: "/images/groups.png", alt: "Travellers walking together through an airport" },
  { word: "Places", caption: "From our home in Dubai to East Africa, Europe and far beyond.", image: "/images/tanzania.png", alt: "Sunrise over the savannah beneath Kilimanjaro" },
  { word: "Connections", caption: "Local knowledge and regional partners, joined up into one journey.", image: "/images/airport.png", alt: "Travellers in an airport terminal at sunset" },
  { word: "Opportunities", caption: "Journeys that can begin almost anywhere, and continue almost anywhere.", image: "/images/maldives-villa.png", alt: "An overwater villa at sunset" },
];

export function OurStory() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => setActive(i => (i + 1) % pillars.length), 4000);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return <section className="our-story section-shell section-space" id="story" aria-labelledby="story-heading">
    <div className="story-visual" data-reveal>
      <div className="story-arch"><Image src="/images/about-airport.png" alt="A traveller with her suitcase walking through Dubai airport at sunset" fill sizes="(max-width: 900px) 90vw, 40vw" /></div>
      <div className="story-circle">
        {pillars.map((p, i) => <Image key={p.word} src={p.image} alt={i === active ? p.alt : ""} fill sizes="240px" className={i === active ? "is-active" : ""} />)}
      </div>
      <div className="story-est" aria-label="Established 2013">
        <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="est-circle" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" /></defs><text><textPath href="#est-circle" textLength="228" lengthAdjust="spacing">Wings &amp; Wheels · Dubai, UAE · </textPath></text></svg>
        <span><small>Est.</small>2013</span>
      </div>
      <span className="script story-note">Built around<br />real journeys</span>
    </div>

    <div className="story-content" data-reveal onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <span className="eyebrow eyebrow-rule">Our story</span>
      <h2 id="story-heading">Built around <em>real journeys.</em></h2>
      <blockquote className="story-quote">Wings &amp; Wheels was built around a simple idea: travel should feel easier to manage.</blockquote>
      <p>Not because every journey is simple, but because the traveller shouldn&apos;t have to manage every moving part alone.</p>
      <p>Today, Wings &amp; Wheels combines local knowledge, regional connections and international travel capability to support journeys that can begin almost anywhere and continue almost anywhere.</p>

      <div className="story-pillars">
        <div className="story-words" role="tablist" aria-label="What we bring together">
          {pillars.map((p, i) => <button key={p.word} type="button" role="tab" aria-selected={i === active} className={i === active ? "is-active" : ""} onClick={() => setActive(i)} onFocus={() => setActive(i)}>{p.word}</button>)}
        </div>
        <p className="story-caption" key={active} aria-live="polite"><span>0{active + 1}</span>{pillars[active].caption}</p>
      </div>
    </div>
  </section>;
}
