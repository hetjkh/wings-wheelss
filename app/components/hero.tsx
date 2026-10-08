"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { destinations } from "./data";
import { Arrow, TravelIcon } from "./icons";
import { Brand, MenuButton } from "./site-controls";

const slides = ["santorini", "tanzania", "maldives", "paris"].map(id => destinations.find(d => d.id === id)!);

export function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[active];
  const next = slides[(active + 1) % slides.length];

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => setActive(i => (i + 1) % slides.length), 6500);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return <header className="hero-wrap" id="top">
    <section className="hero-frame" aria-roledescription="carousel" aria-label="Featured destinations" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-card">
        {slides.map((s, i) => <div key={s.id} className={i === active ? "hero-slide is-active" : "hero-slide"} aria-hidden={i !== active}><Image src={s.image} alt={s.alt} fill sizes="100vw" preload={i === 0} /></div>)}
        <div className="hero-shade" />

        <div className="hero-notch hero-notch-logo"><Brand /></div>
        <div className="hero-top-right"><MenuButton /></div>

        <a href="#who" className="scroll-badge" aria-label="Scroll down">
          <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="badge-circle" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" /></defs><text><textPath href="#badge-circle" textLength="222" lengthAdjust="spacing">Scroll down · Scroll down · </textPath></text></svg>
          <span>↓</span>
        </a>

        <div className="hero-copy">
          <div className="hero-place" aria-live="polite"><span className="hero-count">0{active + 1}<em> / 0{slides.length}</em></span><span className="hero-line" /><span key={slide.id} className="hero-place-name">{slide.name}, {slide.country}</span></div>
          <h1>Where Your Next<br />Horizon <em>Begins</em></h1>
          <div className="hero-progress" role="group" aria-label="Choose a destination">
            {slides.map((s, i) => <button key={s.id} type="button" aria-label={`Show ${s.name}`} aria-pressed={i === active} className={i === active ? (paused ? "is-active is-paused" : "is-active") : ""} onClick={() => setActive(i)}><span /></button>)}
          </div>
        </div>

        <div className="hero-notch hero-dock">
          <button type="button" className="dock-card" onClick={() => setActive((active + 1) % slides.length)} aria-label={`Next destination: ${next.name}`}>
            <span className="dock-thumb"><Image src={next.image} alt="" fill sizes="110px" /><span className="dock-next">Next <Arrow /></span></span>
            <span className="dock-info">
              <span className="dock-label"><TravelIcon kind="plane" size={15} /> Flight from Dubai</span>
              <span className="dock-value" key={slide.id}>{slide.flight.replace("≈ ", "")}</span>
              <span className="dock-sub">{slide.name} · best {slide.season}</span>
            </span>
          </button>
          <div className="dock-chips">
            <a href="#map"><TravelIcon kind="route" size={14} /> Destinations</a>
            <a href="#spotlight"><TravelIcon kind="compass" size={14} /> Safaris</a>
            <a href="#map"><TravelIcon kind="globe" size={14} /> Our world</a>
          </div>
        </div>
      </div>
    </section>
  </header>;
}
