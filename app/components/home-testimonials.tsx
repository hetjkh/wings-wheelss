"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const root = useRef<HTMLElement>(null);
  const current = voices[active];
  const total = voices.length;

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(section);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(section.querySelectorAll("[data-voice-reveal]"), {
        y: 30, opacity: 0, stagger: .12, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
    });
    return () => media.revert();
  }, []);

  const go = (direction: -1 | 1) => setActive(index => (index + direction + total) % total);

  return (
    <section className="e-voices" id="testimonials" aria-labelledby="testimonials-title" ref={root}
      onKeyDown={event => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          go(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
      <div className="e-shell">
        <div className="e-section-bar">
          <span className="e-label"><span>06</span><span>Voices from the journey</span></span>
          <span className="n-kicker">People before everything</span>
        </div>
        <div className="e-voices-spread">
          <div className="e-voices-story">
            <div className="e-voices-heading" data-voice-reveal>
              <span className="e-voices-eyebrow">The journeys stay with us.</span>
              <h2 id="testimonials-title" data-editorial-title>
                <span className="e-line"><span>Heard along</span></span>
                <span className="e-line"><span>the way.</span></span>
              </h2>
            </div>
            <div className="e-voices-letter" data-voice-reveal>
              <span className="e-voices-quote-mark" aria-hidden="true">“</span>
              <div id="e-voices-current" aria-live="polite" aria-atomic="true">
                <blockquote key={current.name} className="e-voices-quote"><p>{current.quote}</p></blockquote>
                <div className="e-voices-person">
                  <span className="e-voices-person-rule" aria-hidden="true" />
                  <div><strong>{current.name}</strong><span>{current.role}</span></div>
                </div>
              </div>
            </div>
            <div className="e-voices-controls" data-voice-reveal>
              <span className="e-voices-index"><b>{String(active + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}</span>
              <div>
                <button type="button" className="e-voices-nav" onClick={() => go(-1)} aria-label="Previous testimonial" aria-controls="e-voices-current"><Arrow back /></button>
                <button type="button" className="e-voices-nav" onClick={() => go(1)} aria-label="Next testimonial" aria-controls="e-voices-current"><Arrow /></button>
              </div>
            </div>
          </div>
          <div className="e-voices-visual" data-voice-reveal>
            {voices.map((voice, index) => (
              <figure key={voice.name} className={`e-voices-frame${index === active ? " is-active" : ""}`} aria-hidden={index !== active}>
                <Image src={voice.photo} alt={voice.alt} fill sizes="(max-width: 700px) 90vw, 48vw" className="n-cover" style={{ objectPosition: voice.position }} />
              </figure>
            ))}
            <div className="e-voices-shade" />
            <span className="e-voices-photo-note">Field notes / {String(active + 1).padStart(2, "0")}</span>
            <div className="e-voices-destination" aria-hidden="true">
              <span>{current.kind}</span><strong>{current.route.split(" → ").at(-1)}</strong>
              <span className="e-voices-photo-route">{current.route}</span>
            </div>
            <span className="e-voices-photo-corner" aria-hidden="true">↗</span>
          </div>
        </div>
        <div className="e-voices-bottom">
          <span className="e-voices-select-label">Every journey.<br /><em>A different story.</em></span>
          <ol className="e-voices-rail" aria-label="Choose a testimonial">
            {voices.map((voice, index) => <li key={voice.name}>
              <button type="button" className={index === active ? "is-active" : ""} aria-pressed={index === active} aria-controls="e-voices-current" aria-label={`Read ${voice.name}'s testimonial: ${voice.route}`} onClick={() => setActive(index)}>
                <span className="e-voices-tab-number">{String(index + 1).padStart(2, "0")}</span>
                <span><b>{voice.kind}</b><i>{voice.route}</i></span>
                <span className="e-voices-tab-arrow" aria-hidden="true">↗</span>
              </button>
            </li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}