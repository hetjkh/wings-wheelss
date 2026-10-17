"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, TravelIcon } from "./icons";
import "./home-services.css";

const services = [
  { title: "Flights", phase: "Fly", photo: "/images/airport.png", alt: "Travellers walking through a terminal toward a waiting aircraft at sunset", position: "70% center", line: "Bookings, multi-city itineraries and international connections.", note: "The journey begins" },
  { title: "Hotels", phase: "Stay", photo: "/images/about/story-traveller.jpg", alt: "A traveller arriving at a hotel room overlooking the Dubai skyline", position: "center 40%", line: "Business hotels, resorts, family stays and longer stays.", note: "Somewhere to land" },
  { title: "Visas & documentation", phase: "Arrive", photo: "/images/about/lounge.jpg", alt: "A passport and boarding pass on a lounge table beside a suitcase", position: "35% center", line: "Visa assistance, travel documents and pre-departure checks.", note: "Paperwork, handled" },
  { title: "Airport & ground transfers", phase: "Move", photo: "/images/about/coast-road.jpg", alt: "A car on a coastal road winding toward the sunset", position: "88% center", line: "Airport transfers, private vehicles and chauffeur services.", note: "Door to door" },
  { title: "Holidays & experiences", phase: "Feel", photo: "/images/maldives-villa.png", alt: "An overwater villa with a private pool at sunset", position: "center", line: "Family holidays, safari, beach escapes and city breaks.", note: "Time that is yours" },
  { title: "Travel support", phase: "Return", photo: "/images/about/hero-lounge.jpg", alt: "A traveller waiting in an airport lounge as the sun sets over the city", position: "60% center", line: "Changes, rebooking, cancellations and onward travel.", note: "All the way home" },
] as const;

const total = services.length;
/** Timeline length in "chapters": one hold for the opening card, then one chapter per reveal, plus a short final hold. */
const chapters = total - 1 + .6;

export function HomeServices() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const current = services[active];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(root);
    media.add({ desktop: "(min-width: 1000px)", motion: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      const el = root.current;
      if (!el || !conditions?.motion) return;
      const cards = gsap.utils.toArray<HTMLElement>(".n-services-card", el);

      if (!conditions.desktop) {
        cards.forEach((card, i) => {
          gsap.from(card, { y: 40, opacity: 0, duration: .9, ease: "power2.out", delay: (i % 2) * .08, scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        });
        return;
      }

      const pin = el.querySelector<HTMLElement>(".n-services-pin")!;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          id: "home-services",
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * .85 * chapters}`,
          pin: true,
          scrub: .6,
          invalidateOnRefresh: true,
          refreshPriority: 3.5,
          onUpdate: self => {
            const t = self.progress * chapters;
            el.style.setProperty("--n-services-progress", String(Math.min(1, Math.max(0, (t + .3) / (total - 1 + .6)))));
            setActive(Math.min(total - 1, Math.max(0, Math.floor(t + .3))));
          },
        },
      });
      trigger.current = tl.scrollTrigger ?? null;

      cards.forEach((card, i) => {
        if (i === 0) return;
        const at = i - .6;
        tl.fromTo(card, { clipPath: "inset(100% 0 0 0 round var(--n-services-radius))", y: 40 }, { clipPath: "inset(0% 0 0 0 round var(--n-services-radius))", y: 0, duration: .6 }, at)
          .fromTo(card.querySelector(".n-services-card-photo"), { scale: 1.12 }, { scale: 1, duration: .6 }, at)
          .to(cards[i - 1], { scale: .94, y: -28, filter: "brightness(.72)", duration: .6 }, at)
          .to(cards[i - 1].querySelector(".n-services-card-caption"), { opacity: 0, y: -10, duration: .3 }, at);
      });
      tl.to({}, { duration: .6 });

      return () => { trigger.current = null; };
    });
    return () => media.revert();
  }, []);

  const jump = (index: number) => {
    const st = trigger.current;
    if (!st) return;
    const progress = Math.min(1, index / chapters);
    window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: "instant" });
  };

  return (
    <section className="n-services" id="home-services" aria-labelledby="home-services-title" ref={root}>
      <div className="n-services-pin">
        <div className="n-services-bar n-shell">
          <span className="n-kicker"><span className="n-services-bar-num">01 /</span> Travel services</span>
          <span className="n-kicker n-services-bar-list" aria-hidden="true">{services.map(s => s.phase).join(" · ")}</span>
        </div>

        <div className="n-services-stage n-shell">
          <div className="n-services-copy">
            <h2 id="home-services-title" data-home-reveal>
              Whatever the<br />journey needs.
            </h2>
            <p className="n-services-lead" data-home-reveal>
              Flights, hotels, visas, transfers and holidays, coordinated around where you need to go. Choose one part, or let us bring every part together.
            </p>

            <div className="n-services-now" aria-live="polite">
              <div className="n-services-now-head">
                <span className="n-services-now-index">{String(active + 1).padStart(2, "0")} <i>/</i> {String(total).padStart(2, "0")}</span>
                <span className="n-services-now-note" key={`note-${active}`}>{current.note}</span>
              </div>
              <span className="n-services-phase" key={`phase-${active}`}>{current.phase}<i>.</i></span>
              <div className="n-services-detail" key={`detail-${active}`}>
                <h3>{current.title}</h3>
                <p>{current.line}</p>
                <Link href="/travel-services#services" className="n-button">
                  Explore {current.title.toLowerCase()} <Arrow />
                </Link>
              </div>
            </div>
          </div>

          <div className="n-services-deck">
            {services.map((item, index) => (
              <figure key={item.title} className="n-services-card" style={{ zIndex: index + 1 }}>
                <div className="n-services-card-photo">
                  <Image src={item.photo} alt={item.alt} fill sizes="(max-width: 999px) 92vw, 44vw" className="n-cover" style={{ objectPosition: item.position }} priority={index === 0} />
                </div>
                <div className="n-services-card-shade" aria-hidden="true" />
                <figcaption className="n-services-card-caption">
                  <span className="n-kicker">{String(index + 1).padStart(2, "0")} / {item.phase}</span>
                  <strong>{item.title}</strong>
                  <span className="n-services-card-line">{item.line}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="n-services-rail n-shell" role="list" aria-label="Travel services in the order of a journey">
          <div className="n-services-track" aria-hidden="true">
            <span className="n-services-track-fill" />
            <span className="n-services-plane"><TravelIcon kind="plane" size={18} /></span>
          </div>
          {services.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="listitem"
              className={`n-services-stop${index === active ? " is-active" : ""}${index < active ? " is-passed" : ""}`}
              aria-current={index === active ? "step" : undefined}
              onClick={() => jump(index)}
            >
              <i aria-hidden="true" />
              <span className="n-services-stop-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="n-services-stop-name">{item.phase}</span>
            </button>
          ))}
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
