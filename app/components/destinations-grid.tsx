"use client";

import { useState } from "react";
import Image from "next/image";
import { destinations } from "./data";
import { TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";

const regions = ["All", ...Array.from(new Set(destinations.map(d => d.region)))];

export function Destinations() {
  const [region, setRegion] = useState("All");
  const shown = region === "All" ? destinations : destinations.filter(d => d.region === region);

  return <section className="section" id="destinations" aria-labelledby="destinations-heading">
    <div className="shell">
      <div className="dest-head" data-reveal>
        <div className="section-head">
          <span className="eyebrow">Popular destinations</span>
          <h2 id="destinations-heading">Where our clients travel</h2>
          <p>A selection of the destinations we plan most often. Ask us about anywhere else you have in mind.</p>
        </div>
        <div className="dest-filter" role="group" aria-label="Filter destinations by region">
          {regions.map(r => <button key={r} type="button" aria-pressed={r === region} className={r === region ? "is-active" : ""} onClick={() => setRegion(r)}>{r}</button>)}
        </div>
      </div>
      <div className="dest-grid">
        {shown.map(d => <article className="dest-card" key={d.id}>
          <div className="dest-photo"><Image src={d.image} alt={d.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1150px) 50vw, 33vw" /><span className="dest-region">{d.region}</span></div>
          <div className="dest-body">
            <h3>{d.name}<small>{d.country}</small></h3>
            <p>{d.description}</p>
            <dl>
              <div><dt><TravelIcon kind="plane" size={14} />Flight from Dubai</dt><dd>{d.flight}</dd></div>
              <div><dt><TravelIcon kind="calendar" size={14} />Best time</dt><dd>{d.season}</dd></div>
            </dl>
            <EnquiryButton className="text-link" destination={d.name} service={d.region === "Africa" ? "Africa travel" : "Leisure & holidays"}>Get a quote</EnquiryButton>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
