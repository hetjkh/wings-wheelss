"use client";

import { useEffect, useRef, useState } from "react";
import Image from "./travel-image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./icons";
import "./home-services.css";

const services = [
  { title: "Flights", phase: "Fly", photo: "/images/library/home-flights-wing-v2.webp", alt: "A silver aircraft wing above crisp white clouds and turquoise ocean reefs", position: "center", line: "Bookings, multi-city itineraries and international connections.", note: "The journey begins" },
  { title: "Visas & documentation", phase: "Arrive", photo: "/images/library/passport-preparation.webp", alt: "A traveller holding a passport while packing a bag for a journey", position: "center", line: "Visa assistance, travel documents and pre-departure checks.", note: "Paperwork, handled" },
  { title: "Hotels", phase: "Stay", photo: "/images/library/home-palm-suite.webp", alt: "A sunlit hotel suite overlooking Palm Jumeirah and the Dubai coastline", position: "center", line: "Business hotels, resorts, family stays and longer stays.", note: "Somewhere to land" },
  { title: "Airport & ground transfers", phase: "Move", photo: "/images/library/airport-transfer.webp", alt: "A chauffeur helping a traveller load luggage into an executive airport transfer vehicle", position: "center", line: "Airport transfers, private vehicles and chauffeur services.", note: "Door to door" },
  { title: "Holidays & experiences", phase: "Feel", photo: "/images/library/holiday-arrival.webp", alt: "Two holiday travellers with suitcases arriving beside turquoise water", position: "center", line: "Family holidays, safari, beach escapes and city breaks.", note: "Time that is yours" },
  { title: "Travel support", phase: "Return", photo: "/images/library/home-personal-support.webp", alt: "A concierge helping a traveller review documents at a hotel desk", position: "56% center", line: "Changes, rebooking, cancellations and onward travel.", note: "All the way home" },
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
    media.add({ desktop: "(min-width: 1000px)", mobileStory: "(max-width: 767px) and (min-height: 600px)", motion: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      const el = root.current;
      if (!el || !conditions?.motion) return;
      const cards = gsap.utils.toArray<HTMLElement>(".n-services-card", el);

      const mobileStory = Boolean(conditions.mobileStory);
      if (!conditions.desktop && !mobileStory) {
        cards.forEach((card, i) => {
          gsap.from(card, { y: 40, opacity: 0, duration: .9, ease: "power2.out", delay: (i % 2) * .08, scrollTrigger: { trigger: card, start: "top 88%", once: true } });
        });
        return;
      }

      if (mobileStory) el.classList.add("is-mobile-story");
      el.classList.add("is-scroll-deck");
      const pin = el.querySelector<HTMLElement>(".n-services-pin")!;
      const rail = el.querySelector<HTMLElement>(".n-services-rail")!;
      const fill = el.querySelector<HTMLElement>(".n-services-track-fill")!;
      const plane = el.querySelector<HTMLElement>(".n-services-plane")!;
      let railWidth = rail.clientWidth;
      let activeIndex = -1;
      gsap.set(fill, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(plane, { x: 0, y: 0, xPercent: -50, yPercent: -50 });
      const setFill = gsap.quickSetter(fill, "scaleX");
      const setPlane = gsap.quickSetter(plane, "x", "px");
      const setAltitude = gsap.quickSetter(plane, "y", "px");
      const setBank = gsap.quickSetter(plane, "rotation", "deg");
      // Static overflow clips translated layers; no per-frame clip-path or filter paints.
      gsap.set(cards.slice(1), { autoAlpha: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate() {
          const t = this.time();
          const progress = Math.min(1, Math.max(0, (t + .3) / chapters));
          setFill(progress);
          setPlane(progress * railWidth);
          // Lift off between stops, then touch down at the next chapter.
          const flight = progress * total;
          const arc = (flight % 1) * Math.PI;
          const altitude = mobileStory ? 9 : 18;
          setAltitude(-Math.sin(arc) * altitude);
          setBank(Math.atan2(-Math.cos(arc) * altitude * Math.PI * total, railWidth) * 180 / Math.PI);
          const next = Math.min(total - 1, Math.max(0, Math.floor(t + .3)));
          if (next !== activeIndex) {
            activeIndex = next;
            setActive(next);
          }
        },
        scrollTrigger: {
          id: "home-services",
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * (mobileStory ? .72 : .85) * chapters}`,
          pin: true,
          // Lenis already eases wheel input. Follow it directly rather than lagging again.
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 3.5,
          onRefresh: () => { railWidth = rail.clientWidth; },
        },
      });
      trigger.current = tl.scrollTrigger ?? null;

      cards.forEach((card, i) => {
        if (i === 0) return;
        const at = i - .6;
        tl.set(card, { autoAlpha: 1 }, at)
          .fromTo(card, { y: () => card.offsetHeight }, { y: 0, duration: .6 }, at)
          .fromTo(card.querySelector(".n-services-card-photo"), { y: () => -card.offsetHeight }, { y: 0, duration: .6 }, at)
          .to(cards[i - 1].querySelector(".n-services-card-caption"), { opacity: 0, y: -10, duration: .3 }, at)
          .set(cards[i - 1], { autoAlpha: 0 }, at + .6);
      });
      tl.to({}, { duration: .6 });

      // Decode the deck as it approaches, so the first reveal doesn't pay that cost.
      const warmImages = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        el.querySelectorAll<HTMLImageElement>(".n-services-card img").forEach(image => {
          image.loading = "eager";
          void image.decode().catch(() => {});
        });
        warmImages.disconnect();
      }, { rootMargin: "100% 0px" });
      warmImages.observe(el);

      return () => { warmImages.disconnect(); trigger.current = null; el.classList.remove("is-mobile-story", "is-scroll-deck"); };
    });
    return () => media.revert();
  }, []);

  const jump = (index: number) => {
    const st = trigger.current;
    if (!st) {
      setActive(index);
      return;
    }
    // Land just inside the hold so whole-pixel scroll rounding can't leave a sliver of the previous card.
    const progress = Math.min(1, (index === 0 ? 0 : index + .02) / chapters);
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
            <h2 id="home-services-title" data-motion-text>
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
              <figure key={item.title} className={`n-services-card${index === active ? " is-active" : ""}`} style={{ zIndex: index + 1 }}>
                <div className="n-services-card-photo">
                  <Image reveal src={item.photo} alt={item.alt} fill sizes="(max-width: 999px) 92vw, 44vw" className="n-cover" style={{ objectPosition: item.position }} priority={index === 0} />
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
            <span className="n-services-plane">
              <span className="n-services-plane-flight">
                <span className="n-services-plane-trail" />
                <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                  <path d="M43 22.3 30 20l-12-15h-5l7 15-10 1-5-6H2l3 9-3 9h3l5-6 10 1-7 15h5l12-15 13-2.3c4-.7 4-2.7 0-3.4Z" />
                </svg>
              </span>
            </span>
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
