"use client";

import { useEffect, useState } from "react";
import Image from "./travel-image";
import { Arrow } from "./icons";
import "./home-testimonials.css";

const voices = [
  {
    quote: "They didn’t just book the flights. They understood why I needed to be in Nairobi by Monday — and made the whole week feel effortless.",
    name: "Amira Hassan",
    role: "Operations Director",
    route: "Dubai → Nairobi",
    kind: "Corporate travel",
    photo: "/images/library/executive-lounge.webp",
    alt: "A traveller waiting in a quiet airport lounge overlooking the city",
    position: "center",
  },
  {
    quote: "From the first call to the last transfer, everything felt personal. Our Maldives week was the first holiday in years where we didn’t think about logistics once.",
    name: "James & Priya Cole",
    role: "Family travellers",
    route: "Dubai → Maldives",
    kind: "Private travel",
    photo: "/images/library/maldives-jetty.webp",
    alt: "A wooden jetty leading across turquoise water to a tropical island",
    position: "center",
  },
  {
    quote: "Thirty-two colleagues, four arrival cities, one exhibition. Wings & Wheels held every moving part — so we could focus on the event.",
    name: "Daniel Okello",
    role: "Event lead",
    route: "Multi-city → Dubai",
    kind: "Groups & MICE",
    photo: "/images/library/exhibition.webp",
    alt: "Business delegates networking in a modern trade exhibition hall",
    position: "center",
  },
  {
    quote: "Going home shouldn’t feel complicated. Their team in Dubai and the connections on the ground made the journey to Kampala feel close again.",
    name: "Grace Namutebi",
    role: "Frequent traveller",
    route: "Dubai → Kampala",
    kind: "Africa travel",
    photo: "/images/library/uganda-gorilla.webp",
    alt: "A mountain gorilla in a green Ugandan forest landscape",
    position: "center",
  },
] as const;

export function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const current = voices[active];
  const total = voices.length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const section = document.getElementById("testimonials");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (event.key === "ArrowRight") setActive(i => (i + 1) % total);
      if (event.key === "ArrowLeft") setActive(i => (i + total - 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const go = (direction: -1 | 1) => setActive(i => (i + direction + total) % total);

  return (
    <section className="e-voices" id="testimonials" aria-labelledby="testimonials-title">
      <div className="e-shell e-voices-head">
        <div className="e-section-bar">
          <span className="e-label"><span>06</span><span>Voices from the journey</span></span>
          <span className="n-kicker">People before everything</span>
        </div>
        <h2 id="testimonials-title" data-editorial-title>
          <span className="e-line"><span>Heard along</span></span>
          <span className="e-line"><span>the way.</span></span>
        </h2>
      </div>

      <div className="e-voices-stage">
        <div className="e-voices-visual" aria-hidden="true">
          {voices.map((voice, index) => (
            <figure key={voice.name} className={`e-voices-frame${index === active ? " is-active" : ""}`}>
              <Image
                src={voice.photo}
                alt=""
                fill
                sizes="(max-width: 999px) 100vw, 48vw"
                className="n-cover"
                style={{ objectPosition: voice.position }}
                priority={index === 0}
              />
            </figure>
          ))}
          <div className="e-voices-shade" />
          <div className="e-voices-route">
            <span>{current.kind}</span>
            <span>{current.route}</span>
          </div>
        </div>

        <div className="e-voices-copy">
          <span className="e-voices-mark" aria-hidden="true">“</span>
          <blockquote key={current.name} className="e-voices-quote">
            <p>{current.quote}</p>
          </blockquote>
          <footer className="e-voices-person">
            <div>
              <strong>{current.name}</strong>
              <span>{current.role}</span>
            </div>
            <span className="e-voices-index" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </footer>

          <div className="e-voices-controls">
            <button type="button" className="e-voices-nav" onClick={() => go(-1)} aria-label="Previous testimonial">
              <Arrow back />
            </button>
            <div className="e-voices-dots" role="tablist" aria-label="Choose a testimonial">
              {voices.map((voice, index) => (
                <button
                  key={voice.name}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`Show testimonial from ${voice.name}`}
                  className={index === active ? "is-active" : undefined}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
            <button type="button" className="e-voices-nav" onClick={() => go(1)} aria-label="Next testimonial">
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
