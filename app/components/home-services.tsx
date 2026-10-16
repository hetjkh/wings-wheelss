"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import "./home-services.css";

const services = [
  { title: "Flights", phase: "Fly", photo: "/images/airport.png", alt: "Travellers walking through a terminal toward a waiting aircraft at sunset", position: "70% center", line: "Bookings, multi-city itineraries and international connections." },
  { title: "Hotels", phase: "Stay", photo: "/images/about/story-traveller.jpg", alt: "A traveller arriving at a hotel room overlooking the Dubai skyline", position: "center 40%", line: "Business hotels, resorts, family stays and longer stays." },
  { title: "Visas & documentation", phase: "Arrive", photo: "/images/about/lounge.jpg", alt: "A passport and boarding pass on a lounge table beside a suitcase", position: "35% center", line: "Visa assistance, travel documents and pre-departure checks." },
  { title: "Airport & ground transfers", phase: "Move", photo: "/images/about/coast-road.jpg", alt: "A car on a coastal road winding toward the sunset", position: "88% center", line: "Airport transfers, private vehicles and chauffeur services." },
  { title: "Holidays & experiences", phase: "Feel", photo: "/images/maldives-villa.png", alt: "An overwater villa with a private pool at sunset", position: "center", line: "Family holidays, safari, beach escapes and city breaks." },
  { title: "Travel support", phase: "Return", photo: "/images/about/hero-lounge.jpg", alt: "A traveller waiting in an airport lounge as the sun sets over the city", position: "60% center", line: "Changes, rebooking, cancellations and onward travel." },
] as const;

export function HomeServices() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="n-services" id="home-services" aria-labelledby="home-services-title">
      <div className="n-services-stage">
        <div className="n-services-copy">
          <span className="n-kicker" data-home-reveal>Travel services</span>
          <h2 id="home-services-title" data-home-reveal>
            Whatever the<br />journey needs.
          </h2>
          <p className="n-services-lead" data-home-reveal>
            Flights, hotels, visas, transfers and holidays, coordinated around where you need to go. Choose one part, or let us bring every part together.
          </p>

          <ol className="n-services-index" aria-label="Our travel services">
            {services.map((item, index) => {
              const selected = index === active;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    className={selected ? "is-active" : undefined}
                    aria-pressed={selected}
                    aria-controls="home-service-panel"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    <span className="n-services-num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="n-services-name">{item.title}</span>
                    <span className="n-services-phase">{item.phase}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="n-services-detail" id="home-service-panel" aria-live="polite">
            <p>{current.line}</p>
            <Link href="/travel-services#services" className="n-button n-button-white">
              Explore {current.title.toLowerCase()} <Arrow />
            </Link>
          </div>
        </div>

        <div className="n-services-visual" aria-hidden="true">
          {services.map((item, index) => (
            <figure
              key={item.title}
              className={`n-services-frame${index === active ? " is-active" : ""}`}
            >
              <Image
                src={item.photo}
                alt=""
                fill
                sizes="(max-width: 999px) 100vw, 52vw"
                className="n-cover"
                style={{ objectPosition: item.position }}
                priority={index === 0}
              />
            </figure>
          ))}
          <div className="n-services-shade" />
          <div className="n-services-caption">
            <span>{String(active + 1).padStart(2, "0")} / 06</span>
            <span>{current.phase}</span>
          </div>
          <div className="n-services-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(active + 1) / services.length})` }} />
          </div>
        </div>
      </div>

      <div className="n-shell n-services-foot">
        <span className="n-kicker">One journey. Every part connected.</span>
        <Link href="/travel-services" className="n-services-all">
          All travel services <Arrow />
        </Link>
      </div>
    </section>
  );
}
