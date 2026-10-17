"use client";

import { useEffect, useRef, useState } from "react";
import Image from "./travel-image";
import Link from "next/link";
import { storyRegions } from "./story-regions";
import "./home-stories.css";

type ZoneId = keyof typeof storyRegions;

const zones: { id: ZoneId; name: string; pin: [number, number]; kicker: string; title: string; text: string; photo: string; photoAlt: string; inset: string; insetAlt: string; href: string; cta: string }[] = [
  {
    id: "gulf", name: "The Gulf", pin: [654, 162], kicker: "Where every journey starts", title: "Dubai",
    text: "Our home, and the place most journeys begin. Skyline stays, desert evenings and a team that knows every arrival gate by heart.",
    photo: "/images/library/dubai-panorama.webp", photoAlt: "Dubai skyline and the Burj Khalifa in clear daylight", inset: "/images/library/dubai-marina.webp", insetAlt: "Modern towers and waterfront buildings at Dubai Marina", href: "/destinations", cta: "Plan a Dubai stay",
  },
  {
    id: "africa", name: "Africa", pin: [561, 227], kicker: "Closer than you think", title: "Kenya & Tanzania",
    text: "Sunrise game drives, business weeks in Nairobi and the long-awaited journey home. Planned locally, by people who know the roads.",
    photo: "/images/library/nairobi-city.webp", photoAlt: "Nairobi city centre above a green urban canopy", inset: "/images/library/zanzibar.webp", insetAlt: "A dhow sailing off a palm-lined Zanzibar beach", href: "/africa", cta: "Explore our Africa network",
  },
  {
    id: "europe", name: "Europe", pin: [533, 99], kicker: "Slow summers", title: "The Mediterranean",
    text: "Island light, coastal drives and long lunches by the water. Every connection timed so the holiday starts the moment you land.",
    photo: "/images/library/santorini-blue.webp", photoAlt: "Blue-domed churches and whitewashed houses above the Aegean in Santorini", inset: "/images/library/greek-waterfront.webp", insetAlt: "A sunlit waterfront dining terrace beside a Greek island beach", href: "/destinations", cta: "Find your summer",
  },
  {
    id: "asia", name: "Asia & Indian Ocean", pin: [778, 143], kicker: "Far, made simple", title: "Kyoto to the Maldives",
    text: "Lantern-lit streets one week, an overwater villa the next. Long-haul made easy, with every transfer arranged before you ask.",
    photo: "/images/library/kyoto-garden.webp", photoAlt: "Kyoto Golden Pavilion among green trees beside its garden pond", inset: "/images/library/maldives-aerial.webp", insetAlt: "An aerial view of overwater villas surrounding a Maldivian island", href: "/destinations", cta: "Discover Asia",
  },
  {
    id: "americas", name: "The Americas", pin: [222, 116], kicker: "Across the Atlantic", title: "Mountains & cities",
    text: "Wild national parks, city weeks and conferences across the ocean. Planned from Dubai, looked after end to end.",
    photo: "/images/library/canada-lake.webp", photoAlt: "Turquoise water and pine forest beneath rugged Canadian mountain peaks", inset: "/images/library/city-taxi.webp", insetAlt: "A yellow taxi on a tree-lined city street", href: "/destinations", cta: "Plan the long haul",
  },
];

const optimized = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=2048&q=90`;

export function HomeStories() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const zone = zones[active];
  const region = storyRegions[zone.id];

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive(i => (i + 1) % zones.length);
      if (event.key === "ArrowLeft") setActive(i => (i + zones.length - 1) % zones.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openZone = (index: number) => {
    setActive(index);
    setOpen(true);
  };

  return (
    <section className={`h-stories${open ? " is-open" : ""}`} aria-labelledby="stories-title">
      <div className="h-stories-intro">
        <span className="n-kicker">Wings &amp; Wheels stories</span>
        <h2 id="stories-title">Discover <em>stories</em><br />from every corner.</h2>
        <p>Every journey we plan becomes a story. Choose a region to see where our travellers have been.</p>
      </div>

      <svg className="h-stories-map" viewBox="0 0 1000 440" aria-hidden="true">
        <defs>
          {zones.map(item => <clipPath id={`h-clip-${item.id}`} key={item.id}><path d={storyRegions[item.id].d} /></clipPath>)}
        </defs>
        {zones.map((item, index) => {
          const [x, y, w, h] = storyRegions[item.id].box;
          return (
            <g key={item.id} className={`h-zone${index === active ? " is-active" : ""}`} onMouseEnter={() => setActive(index)} onClick={() => openZone(index)}>
              <image className="h-zone-photo" href={optimized(item.photo)} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#h-clip-${item.id})`} />
              <path className="h-zone-shape" d={storyRegions[item.id].d} />
            </g>
          );
        })}
        {zones.map((item, index) => (
          <g key={item.id} className={`h-pin${index === active ? " is-active" : ""}`} transform={`translate(${item.pin[0]} ${item.pin[1]})`} onMouseEnter={() => setActive(index)} onClick={() => openZone(index)}>
            <circle className="h-pin-dot" r="7" />
            <g className="h-pin-ring">
              <path id={`h-ring-${item.id}`} d="M -27 0 a 27 27 0 1 1 54 0 a 27 27 0 1 1 -54 0" fill="none" />
              <text><textPath href={`#h-ring-${item.id}`}>DISCOVER · STORIES · DISCOVER · STORIES ·</textPath></text>
            </g>
            <path className="h-pin-plus" d="M -5 0 H 5 M 0 -5 V 5" />
          </g>
        ))}
      </svg>

      <nav className="h-stories-zones" aria-label="Choose a region">
        <span>Choose a region</span>
        <ul>
          {zones.map((item, index) => (
            <li key={item.id}>
              <button type="button" className={index === active ? "is-active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => openZone(index)}>{item.name}</button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="h-story" aria-hidden={!open} inert={!open}>
        <button type="button" className="h-story-scrim" aria-label="Close story" tabIndex={-1} onClick={() => setOpen(false)} />
        <div className="h-story-backdrop">
          {zones.map((item, index) => <Image key={item.id} src={item.photo} alt={item.photoAlt} fill sizes="50vw" className={index === active ? "is-active" : ""} />)}
        </div>
        <article className="h-story-panel" key={zone.id}>
          <svg className="h-story-outline" viewBox={region.box.join(" ")} aria-hidden="true"><path d={region.d} /></svg>
          <header className="h-story-bar">
            <span>0{active + 1} <i /> 0{zones.length}</span>
            <button ref={closeRef} type="button" className="h-story-close" aria-label="Close story" onClick={() => setOpen(false)}><span /><span /></button>
          </header>
          <div className="h-story-inset"><Image src={zone.inset} alt={zone.insetAlt} fill sizes="(max-width: 767px) 90vw, 30vw" /></div>
          <div className="h-story-copy">
            <span className="n-kicker">{zone.kicker}</span>
            <h3>{zone.title}</h3>
            <p>{zone.text}</p>
            <Link href={zone.href} className="h-story-link">{zone.cta} <span aria-hidden="true">→</span></Link>
          </div>
          <footer className="h-story-nav">
            <button type="button" onClick={() => setActive((active + zones.length - 1) % zones.length)}>← {zones[(active + zones.length - 1) % zones.length].name}</button>
            <button type="button" onClick={() => setActive((active + 1) % zones.length)}>{zones[(active + 1) % zones.length].name} →</button>
          </footer>
        </article>
      </div>
    </section>
  );
}
