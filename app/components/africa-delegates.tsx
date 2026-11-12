"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "./travel-image";
import { Arrow, TravelIcon } from "./icons";
import "./africa-delegates.css";

const origins = [
  { city: "Nairobi", code: "NBO", y: 14 },
  { city: "Kampala", code: "EBB", y: 32 },
  { city: "Juba", code: "JUB", y: 50 },
  { city: "Khartoum", code: "KRT", y: 68 },
  { city: "Tanzania", code: "DAR", y: 86 },
];

const acts = [
  { stage: "Before departure", services: ["Group flights", "Visa assistance"], photo: "/images/library/africa-delegates-flight-v1.webp", position: "62% center" },
  { stage: "On arrival", services: ["Hotels", "Airport transfers"], photo: "/images/library/africa-delegates-hotel-v1.webp", position: "62% center" },
  { stage: "At the event", services: ["Venue transportation", "Delegate travel"], photo: "/images/library/africa-delegates-conference-v1.webp", position: "65% center" },
];

// Route geometry lives in a 1000×400 box stretched over the map.
const hub = { x: 700, y: 200 };
const routePath = (y: number) => {
  const start = y * 4;
  return `M190 ${start} C 420 ${start}, 500 ${hub.y}, ${hub.x} ${hub.y}`;
};

export function AfricaDelegates() {
  const map = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const element = map.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setLive(true);
      observer.disconnect();
    }, { threshold: .35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dl">
      <header className="dl-head">
        <div>
          <span className="j-eyebrow dl-eyebrow">07 / Exhibitions &amp; delegations</span>
          <h2 id="delegates-heading">Bringing your team<br /><em>to Dubai?</em></h2>
        </div>
        <div className="dl-intro">
          <p className="dl-promise">We&apos;ll coordinate the travel.<br />You focus on the event.</p>
          <p>For organisations travelling from Africa to exhibitions, conferences and corporate events in the UAE, W&amp;W brings the travel arrangements together.</p>
        </div>
      </header>

      <figure ref={map} className={`dl-map${live ? " is-live" : ""}`} aria-label="Delegates departing from Nairobi, Kampala, Juba, Khartoum and Tanzania, all arriving in Dubai">
        <Image className="dl-map-photo" src="/images/library/africa-delegates-arrival-v1.webp" alt="" fill sizes="(max-width: 800px) 100vw, 92vw" />
        <div className="dl-map-shade" aria-hidden="true" />

        <svg className="dl-routes" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
          {origins.map((origin, i) => (
            <g key={origin.city} className="dl-route" style={{ "--i": i } as CSSProperties}>
              <path className="dl-route-base" d={routePath(origin.y)} pathLength={1} vectorEffect="non-scaling-stroke" />
              <path className="dl-route-light" d={routePath(origin.y)} pathLength={1} vectorEffect="non-scaling-stroke" />
            </g>
          ))}
        </svg>

        <ul className="dl-cities">
          {origins.map((origin, i) => (
            <li key={origin.city} className="dl-city" style={{ "--y": `${origin.y}%`, "--i": i } as CSSProperties}>
              <span className="dl-city-name">{origin.city}<small>{origin.code}</small></span>
              <i className="dl-city-dot" aria-hidden="true" />
            </li>
          ))}
        </ul>

        <div className="dl-hub">
          <span className="dl-hub-node" aria-hidden="true"><i /><i /><i /></span>
          <div className="dl-hub-label">
            <span>Arriving in</span>
            <strong>Dubai</strong>
            <small>United Arab Emirates · DXB</small>
          </div>
        </div>

        <figcaption className="dl-map-caption">Different departure points. <span>One event.</span></figcaption>
      </figure>

      <ol className="dl-acts" aria-label="Your travel arrangements">
        {acts.map((act, i) => (
          <li key={act.stage} className="dl-act" tabIndex={0}>
            <Image className="dl-act-photo" src={act.photo} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectPosition: act.position }} />
            <span className="dl-act-shade" aria-hidden="true" />
            <span className="dl-act-number" aria-hidden="true">0{i + 1}</span>
            <div className="dl-act-copy">
              <h3>{act.stage}</h3>
              <div className="dl-act-reveal">
                <ul>{act.services.map(service => <li key={service}>{service}</li>)}</ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <footer className="dl-close">
        <div className="dl-support">
          <span className="dl-support-icon" aria-hidden="true"><TravelIcon kind="support" size={24} /></span>
          <div>
            <h3>Changes &amp; support</h3>
            <p>Assistance when your team&apos;s plans change.</p>
          </div>
        </div>
        <div className="dl-actions">
          <a className="j-button j-button-cream" href="#africa-enquiry">Plan delegate travel<Arrow /></a>
          <Link className="j-text-link dl-link" href="/groups-mice">Explore Groups &amp; MICE<Arrow /></Link>
        </div>
      </footer>
    </div>
  );
}
