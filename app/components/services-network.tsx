"use client";

import { useId, useState } from "react";
import Image from "./travel-image";
import { PillCta } from "./about-cta";
import { TravelIcon } from "./icons";
import { storyRegions } from "./story-regions";
import "./services-network.css";

type RegionId = keyof typeof storyRegions;
const regions: { id: RegionId; name: string; title: string; note: string; text: string; pin: [number, number]; photo: string; alt: string; connections: string[]; cta: string; href: string }[] = [
  { id: "gulf", name: "Dubai & the UAE", title: "Our home. Your starting point.", note: "UAE base", text: "Our Dubai team brings the details together, from your first booking to your arrival and onward journey.", pin: [654, 162], photo: "/images/library/dubai-panorama.webp", alt: "Dubai skyline with the Burj Khalifa", connections: ["Dubai", "UAE arrivals", "Onward travel"], cta: "Plan your Dubai journey", href: "/contact" },
  { id: "africa", name: "Africa", title: "Closer connections. Further possibilities.", note: "Our African connections", text: "A growing network across key African markets, connecting your travel plans with regional knowledge and on-ground support.", pin: [561, 227], photo: "/images/library/nairobi-city.webp", alt: "Nairobi city centre surrounded by green trees", connections: ["Nairobi · Kenya", "Tanzania", "Kampala · Uganda", "Khartoum · Sudan", "Juba · South Sudan"], cta: "Explore our Africa network", href: "/africa" },
  { id: "asia", name: "Asia & Indian Ocean", title: "New places. A familiar point of contact.", note: "India & beyond", text: "From India to an island escape, we coordinate flights, stays and transfers around the journey you have in mind.", pin: [778, 143], photo: "/images/library/maldives-aerial.webp", alt: "A Maldivian island and overwater villas in turquoise water", connections: ["India", "Asian destinations", "Indian Ocean escapes"], cta: "Discover destinations", href: "/destinations" },
  { id: "europe", name: "Europe", title: "Every connection considered.", note: "International travel", text: "Business visits, city stays and multi-destination holidays. One coordinated plan from Dubai to wherever you need to be.", pin: [533, 99], photo: "/images/library/santorini-blue.webp", alt: "Blue-domed churches overlooking the sea in Santorini", connections: ["Business travel", "City breaks", "Multi-city itineraries"], cta: "Explore the possibilities", href: "/destinations" },
  { id: "americas", name: "The Americas", title: "A longer journey. The same care.", note: "Global reach", text: "Travel across the Atlantic, with your flights, accommodation and onward arrangements brought together by our Dubai team.", pin: [222, 116], photo: "/images/library/canada-lake.webp", alt: "A turquoise Canadian lake surrounded by mountains and pine trees", connections: ["International flights", "Accommodation", "Onward arrangements"], cta: "Plan your next journey", href: "/contact" },
];

export function ServicesNetwork() {
  const [active, setActive] = useState(1);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const region = regions[active];
  const home = regions[0].pin;
  const select = (index: number) => setActive(index);

  return <section className="s-network sn-network j-torn-top" id="network" aria-labelledby="network-heading">
    <div className="sn-shell">
      <header className="sn-heading">
        <div><span className="j-eyebrow">06 / Our network</span><h2 id="network-heading">Local connections.<br /><em>A world within reach.</em></h2></div>
        <p>Our home is Dubai. Our connections go further. Explore the places and people behind your next journey.</p>
      </header>

      <div className="sn-explorer">
        <div className="sn-atlas">
          <div className="sn-map-label"><span><i /> Connected through Dubai</span><span>Explore our world ↗</span></div>
          <svg className="sn-map" viewBox="0 0 1000 440" role="group" aria-label="Explore our travel network by region">
            <defs>{regions.map(item => <clipPath id={`${uid}-clip-${item.id}`} key={item.id}><path d={storyRegions[item.id].d} /></clipPath>)}</defs>
            {regions.map((item, index) => {
              const [x, y, width, height] = storyRegions[item.id].box;
              return <g key={item.id} className={`sn-region${active === index ? " is-active" : ""}`} onMouseEnter={() => select(index)} onClick={() => select(index)} role="button" tabIndex={0} aria-label={`Explore ${item.name}`} aria-pressed={active === index} aria-controls="network-region-details" onFocus={() => select(index)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(index); } }}>
                <title>{item.name}</title>
                <image className="sn-map-photo" href={item.photo} x={x} y={y} width={width} height={height} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${uid}-clip-${item.id})`} />
                <path className="sn-land" d={storyRegions[item.id].d} />
              </g>;
            })}
            {regions.map((item, index) => index === 0 ? null : <path key={item.id} className={`sn-connection${active === index ? " is-active" : ""}`} d={`M${home[0]} ${home[1]} Q${(home[0] + item.pin[0]) / 2} ${Math.min(home[1], item.pin[1]) - 65} ${item.pin[0]} ${item.pin[1]}`} />)}
            {regions.map((item, index) => <g key={item.id} className={`sn-pin${active === index ? " is-active" : ""}`} transform={`translate(${item.pin.join(" ")})`} onMouseEnter={() => select(index)} onClick={() => select(index)} aria-hidden="true">
              <circle className="sn-pin-hit" r="32" /><circle className="sn-pin-halo" r="16" /><circle className="sn-pin-dot" r="6" />
              <g className="sn-pin-ring"><path id={`${uid}-ring-${item.id}`} d="M-28 0a28 28 0 1 1 56 0a28 28 0 1 1-56 0" fill="none" /><text><textPath href={`#${uid}-ring-${item.id}`}>EXPLORE · CONNECT · EXPLORE · CONNECT ·</textPath></text></g>
              <path className="sn-pin-plus" d="M-4 0h8M0-4v8" />
            </g>)}
            <text className="sn-dubai-label" x="675" y="183">DUBAI</text>
          </svg>
          <div className="sn-map-foot"><span className="sn-hover-hint">Hover over the map to explore</span><span className="sn-touch-hint">Tap a region to explore</span><span>25.20° N / 55.27° E</span></div>
          <nav className="sn-regions" aria-label="Choose a network region">{regions.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} aria-controls="network-region-details" onMouseEnter={() => select(index)} onFocus={() => select(index)} onClick={() => select(index)}><span>0{index + 1}</span>{item.name}<span aria-hidden="true">↗</span></button>)}</nav>
        </div>

        <article className="sn-detail" id="network-region-details" aria-label={`${region.name} network details`}>
          <div className="sn-photo">{regions.map((item, index) => <Image key={item.id} src={item.photo} alt={active === index ? item.alt : ""} fill sizes="(max-width: 800px) 90vw, 33vw" className={active === index ? "is-active" : ""} />)}<span>{region.name}</span></div>
          <div className="sn-detail-copy" key={region.id}>
            <span className="j-eyebrow">{region.note}</span><h3>{region.title}</h3><p>{region.text}</p>
            <ul aria-label={`${region.name} connections`}>{region.connections.map(place => <li key={place}>{place}</li>)}</ul>
            <PillCta light href={region.href}>{region.cta}</PillCta>
          </div>
        </article>
      </div>
      <ul className="sn-pillars">
        <li><TravelIcon kind="pin" size={26} /><div><h3>UAE base</h3><p>One team to bring it together.</p></div></li>
        <li><TravelIcon kind="people" size={26} /><div><h3>Africa network</h3><p>Local knowledge. Closer connections.</p></div></li>
        <li><TravelIcon kind="globe" size={26} /><div><h3>Global reach</h3><p>Journeys that go further.</p></div></li>
      </ul>
    </div>
  </section>;
}
