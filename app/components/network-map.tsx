"use client";

import { useId, useState } from "react";
import Image from "./travel-image";
import { PillCta } from "./about-cta";
import { Arrow } from "./icons";
import { storyRegions } from "./story-regions";
import "./masked-hero.css";
import "./services-network.css";
import "./network-map.css";

const at = (longitude: number, latitude: number) => ({ x: (longitude + 180) / .36, y: (85 - latitude) / 145 * 440 });
const dubai = at(55.3, 25.2);
const destinations = [
  { name: "Khartoum", country: "Sudan", ...at(32.56, 15.5), labelX: 555, labelY: 205, text: "Travel coordination between Dubai and Sudan, with a single point of contact for your plans and onward arrangements.", photo: "/images/africa/network/khartoum-v1.webp", alt: "Blue Nile riverbanks and warm city buildings inspired by Khartoum", caption: "Khartoum · Sudan", mapPhoto: "/images/africa/network/khartoum-v1.webp" },
  { name: "Juba", country: "South Sudan", ...at(31.58, 4.85), labelX: 553, labelY: 236, text: "Bring your Dubai and South Sudan travel arrangements together, with support for the details before, during and after your journey.", photo: "/images/africa/network/juba-v1.webp", alt: "White Nile flowing beside green riverbanks and a low-rise city inspired by Juba", caption: "Juba · South Sudan", mapPhoto: "/images/africa/network/juba-v1.webp" },
  { name: "Kampala", country: "Uganda", ...at(32.58, .35), labelX: 551, labelY: 264, text: "Connect your Uganda journey with our Dubai team. Flights, stays and ground arrangements, considered as one coordinated plan.", photo: "/images/africa/network/kampala-v1.webp", alt: "Kampala city buildings among lush green hills and red roofs", caption: "Kampala · Uganda", mapPhoto: "/images/africa/network/kampala-v1.webp" },
  { name: "Nairobi", country: "Kenya", ...at(36.82, -1.29), labelX: 634, labelY: 278, text: "City meetings, onward travel or time on safari. We bring your Dubai and Kenya plans together with local knowledge and personal support.", photo: "/images/africa/network/nairobi-v1.webp", alt: "Nairobi skyline rising above a leafy urban park canopy", caption: "Nairobi · Kenya", mapPhoto: "/images/africa/network/nairobi-v1.webp" },
  { name: "Tanzania", country: "Tanzania", ...at(35, -6), labelX: 630, labelY: 305, text: "From mainland Tanzania to Zanzibar, coordinate your flights, accommodation and onward arrangements with one familiar team in Dubai.", photo: "/images/africa/network/tanzania-v1.webp", alt: "Elephants on golden savannah beneath snow-capped Mount Kilimanjaro", caption: "Tanzania", mapPhoto: "/images/africa/network/tanzania-v1.webp" },
];

export function NetworkMap() {
  const [selected, setSelected] = useState(3);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const point = destinations[selected];

  return <div className="sn-explorer an-explorer">
    <div className="sn-atlas">
      <div className="sn-map-label"><span><i /> Connected through Dubai</span><span>Dubai ↔ Africa</span></div>
      <svg className="an-map" viewBox="440 118 270 240" role="group" aria-label="Interactive map connecting Dubai with Khartoum, Juba, Kampala, Nairobi and Tanzania">
        <defs><clipPath id={`${uid}-africa`}><path d={storyRegions.africa.d} /></clipPath><clipPath id={`${uid}-continent`}><rect x="440" y="147" width="210" height="210" /></clipPath></defs>
        <g className="an-africa-land" aria-hidden="true">
          <g clipPath={`url(#${uid}-continent)`}><image className="an-map-photo" href={point.mapPhoto} x="451" y="125" width="197" height="221" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${uid}-africa)`} key={point.mapPhoto} /><path className="an-land" d={storyRegions.africa.d} /></g><path className="an-gulf" d={storyRegions.gulf.d} />
          <text className="an-region-label" x="480" y="210">AFRICA</text><text className="an-ocean-label" x="655" y="337" textAnchor="middle">INDIAN OCEAN</text>
        </g>
        {destinations.map((place, index) => <path key={place.name} className={`an-route${selected === index ? " is-active" : ""}`} d={`M${dubai.x} ${dubai.y} Q${(dubai.x + place.x) / 2} ${Math.min(dubai.y, place.y) - 28} ${place.x} ${place.y}`} aria-hidden="true" />)}
        {destinations.map((place, index) => <g key={place.name} className={`an-point${selected === index ? " is-active" : ""}`} role="button" tabIndex={0} aria-label={`Explore Dubai to ${place.name}`} aria-pressed={selected === index} aria-controls="africa-network-details" onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelected(index); } }}>
          <title>{`Dubai to ${place.name}, ${place.country}`}</title><path className="an-leader" d={`M${place.x} ${place.y}L${place.labelX + (place.labelX < place.x ? 4 : -4)} ${place.labelY - 2}`} />
          <circle className="an-hit" cx={place.x} cy={place.y} r="8" /><circle className="an-halo" cx={place.x} cy={place.y} r="6" /><circle className="an-dot" cx={place.x} cy={place.y} r="2.7" />
          <text x={place.labelX} y={place.labelY} textAnchor={place.labelX < place.x ? "end" : "start"}>{place.name}</text>
        </g>)}
        <g className="an-home" aria-hidden="true"><circle className="an-home-ring" cx={dubai.x} cy={dubai.y} r="10" /><circle className="an-dot" cx={dubai.x} cy={dubai.y} r="3.5" /><text x={dubai.x + 14} y={dubai.y - 2}>Dubai</text><text className="an-home-note" x={dubai.x + 14} y={dubai.y + 5}>UAE BASE</text></g>
      </svg>
      <div className="sn-map-foot"><span className="sn-hover-hint">Hover over a destination to explore</span><span className="sn-touch-hint">Tap a destination to explore</span><span>One team. Across borders.</span></div>
      <nav className="sn-regions" aria-label="Africa network destinations">{destinations.map((place, index) => <button key={place.name} type="button" aria-pressed={selected === index} aria-controls="africa-network-details" onMouseEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)}><span>0{index + 1}</span>{place.name}<Arrow diagonal /></button>)}</nav>
    </div>
    <article className="sn-detail" id="africa-network-details" aria-label={`${point.name} connection details`}>
      <div className="sn-photo"><Image key={point.name} src={point.photo} alt={point.alt} fill sizes="(max-width: 800px) 90vw, 33vw" className="is-active" /><span>{point.caption}</span></div>
      <div className="sn-detail-copy" key={point.name}><span className="j-eyebrow">Dubai ↔ {point.country}</span><h3>{point.name}<br /><em>Connected through Dubai.</em></h3><p>{point.text}</p><ul aria-label="Travel coordination"><li>Flights &amp; stays</li><li>Ground arrangements</li><li>Personal support</li></ul><PillCta light href="/contact#form">Our Africa offices</PillCta></div>
    </article>
  </div>;
}
