"use client";

import { useEffect, useRef, useState } from "react";
import Image from "./travel-image";
import Link from "next/link";
import { storyLand, storyRegions } from "./story-regions";
import "./home-stories.css";

type ZoneId = keyof typeof storyRegions;

const zones: { id: ZoneId; name: string; pin: [number, number]; kicker: string; title: string; text: string; photo: string; photoAlt: string; inset: string; insetAlt: string; href: string; cta: string }[] = [
  {
    id: "gulf", name: "Middle East", pin: [654, 181], kicker: "Where every journey starts", title: "Dubai",
    text: "Our home, and the place most journeys begin. Skyline stays, desert evenings and a team that knows every arrival gate by heart.",
    photo: "/images/library/dubai-panorama.webp", photoAlt: "Dubai skyline and the Burj Khalifa in clear daylight", inset: "/images/library/dubai-marina.webp", insetAlt: "Modern towers and waterfront buildings at Dubai Marina", href: "/destinations", cta: "Plan a Dubai stay",
  },
  {
    id: "africa", name: "Africa", pin: [602, 262], kicker: "Closer than you think", title: "Kenya & Tanzania",
    text: "Sunrise game drives, business weeks in Nairobi and the long-awaited journey home. Planned locally, by people who know the roads.",
    photo: "/images/library/nairobi-city.webp", photoAlt: "Nairobi city centre above a green urban canopy", inset: "/images/library/zanzibar.webp", insetAlt: "A dhow sailing off a palm-lined Zanzibar beach", href: "/africa", cta: "Explore our Africa network",
  },
  {
    id: "europe", name: "Europe", pin: [566, 143], kicker: "Slow summers", title: "The Mediterranean",
    text: "Island light, coastal drives and long lunches by the water. Every connection timed so the holiday starts the moment you land.",
    photo: "/images/library/santorini-blue.webp", photoAlt: "Blue-domed churches and whitewashed houses above the Aegean in Santorini", inset: "/images/library/greek-waterfront.webp", insetAlt: "A sunlit waterfront dining terrace beside a Greek island beach", href: "/destinations", cta: "Find your summer",
  },
  {
    id: "asia", name: "Asia & Pacific", pin: [877, 152], kicker: "Far, made simple", title: "Kyoto & beyond",
    text: "Lantern-lit streets, tropical islands and Australian coastlines. Long-haul made easy, with every transfer arranged before you ask.",
    photo: "/images/library/kyoto-garden.webp", photoAlt: "Kyoto Golden Pavilion among green trees beside its garden pond", inset: "/images/library/sydney-harbour.webp", insetAlt: "Sydney Harbour and its waterfront landmarks", href: "/destinations", cta: "Discover Asia & the Pacific",
  },
  {
    id: "indian-ocean", name: "Indian Ocean", pin: [703, 248], kicker: "A little further from the everyday", title: "Maldives & island escapes",
    text: "Overwater mornings, warm lagoons and unhurried island stays. Discover the Maldives, Mauritius, Seychelles and Sri Lanka, with the connections taken care of.",
    photo: "/images/library/maldives-aerial.webp", photoAlt: "Overwater villas and a tropical island surrounded by a Maldivian lagoon", inset: "/images/library/maldives-villas.webp", insetAlt: "Overwater villas beside clear turquoise water in the Maldives", href: "/destinations/maldives", cta: "Discover island escapes",
  },
  {
    id: "americas", name: "The Americas", pin: [222, 116], kicker: "Across the Atlantic", title: "Mountains & cities",
    text: "Wild national parks, city weeks and conferences across the ocean. Planned from Dubai, looked after end to end.",
    photo: "/images/library/canada-lake.webp", photoAlt: "Turquoise water and pine forest beneath rugged Canadian mountain peaks", inset: "/images/library/city-taxi.webp", insetAlt: "A yellow taxi on a tree-lined city street", href: "/destinations", cta: "Plan the long haul",
  },
];

// Draw the open-water region first so country shapes keep their own hover targets.
const mapZones = zones.map((item, index) => ({ item, index })).sort((a, b) => Number(b.item.id === "indian-ocean") - Number(a.item.id === "indian-ocean"));

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
    <section className={`h-stories${open ? " is-open" : ""}`} aria-labelledby="stories-title" data-active-region={zone.id}>
      <div className="h-stories-intro">
        <span className="n-kicker" data-motion-reveal>Wings &amp; Wheels stories</span>
        <h2 id="stories-title" data-motion-text>Discover <em>stories</em><br />from every corner.</h2>
        <p data-editorial-reveal>Every journey we plan becomes a story. Choose a region to see where our travellers have been.</p>
      </div>

      <svg className="h-stories-map" viewBox="0 0 1000 440" aria-hidden="true">
        <defs>
          {zones.map(item => <clipPath id={`h-clip-${item.id}`} key={item.id}><path d={storyRegions[item.id].d} fillRule="evenodd" />{storyRegions[item.id].oceanD ? <path d={storyRegions[item.id].oceanD ?? undefined} /> : null}</clipPath>)}
          <mask id="h-ocean-water" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="440" style={{ maskType: "luminance" }}>
            <path d={storyRegions["indian-ocean"].oceanD ?? ""} fill="white" />
            <path d={storyLand} fill="black" />
            <path d={storyRegions["indian-ocean"].d} fill="white" />
          </mask>
        </defs>
        {mapZones.map(({ item, index }) => {
          const [x, y, w, h] = storyRegions[item.id].box;
          return (
            <g key={item.id} data-region={item.id} data-cursor="View story" className={`h-zone${index === active ? " is-active" : ""}`} onMouseEnter={() => setActive(index)} onClick={() => openZone(index)}>
              {storyRegions[item.id].oceanD ? <path className="h-zone-ocean-hit" d={storyRegions[item.id].oceanD ?? undefined} /> : null}
              <image className="h-zone-photo" href={optimized(item.photo)} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#h-clip-${item.id})`} mask={item.id === "indian-ocean" ? "url(#h-ocean-water)" : undefined} />
              <path className="h-zone-shape" d={storyRegions[item.id].d} />
            </g>
          );
        })}
        {zones.map((item, index) => (
          <g key={item.id} data-cursor="View story" className={`h-pin${index === active ? " is-active" : ""}`} transform={`translate(${item.pin[0]} ${item.pin[1]})`} onMouseEnter={() => setActive(index)} onClick={() => openZone(index)}>
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
        <ul data-motion-stagger>
          {zones.map((item, index) => (
            <li key={item.id}>
              <button type="button" aria-pressed={index === active} className={index === active ? "is-active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => openZone(index)}>{item.name}</button>
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
