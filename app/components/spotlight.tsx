"use client";

import { useState } from "react";
import Image from "next/image";
import { spotlights } from "./data";
import { Arrow } from "./icons";
import { EnquiryButton } from "./site-controls";

export function Spotlight() {
  const [active, setActive] = useState(0);
  const s = spotlights[active];
  const go = (step: number) => setActive((active + step + spotlights.length) % spotlights.length);

  return <section className="spotlight" id="spotlight" aria-labelledby="spotlight-heading">
    <div className="section-shell">
      <div className="spotlight-tabs" role="tablist" aria-label="Spotlight regions" data-reveal>
        {spotlights.map((item, i) => <button key={item.id} role="tab" type="button" aria-selected={i === active} className={i === active ? "is-active" : ""} onClick={() => setActive(i)}><span>{item.index}</span>{item.title}</button>)}
      </div>

      <div className="spotlight-stage" key={s.id}>
        <div className="spotlight-title">
          <h2 id="spotlight-heading" className="spaced-title">{s.title}</h2>
          <span className="spaced-sub"><i />{s.subtitle}<i /></span>
          <span className="spotlight-side" aria-hidden="true">{s.side.map(w => <span key={w}>{w}</span>)}</span>
        </div>

        <div className="spotlight-grid">
          <div className="spotlight-copy">
            <h3>{s.heading[0]}<br />{s.heading[1]}</h3>
            <p>{s.copy}</p>
            <EnquiryButton className="text-link" service={s.id === "africa" ? "Africa travel" : "Leisure & holidays"} destination={s.title}>Discover {s.title}</EnquiryButton>
            <div className="spotlight-nav">
              <span>{s.index} <em>/ 0{spotlights.length}</em></span>
              <button type="button" className="round-button round-small" aria-label="Previous region" onClick={() => go(-1)}><Arrow back /></button>
              <button type="button" className="round-button round-small" aria-label="Next region" onClick={() => go(1)}><Arrow /></button>
            </div>
          </div>
          {s.images.map((img, i) => <figure key={img.src} className={`spotlight-figure figure-${i}`}>
            <div className="spotlight-photo"><Image src={img.src} alt={img.alt} fill sizes="(max-width: 760px) 90vw, 28vw" /></div>
            {i === 0 && <span className="script spotlight-script">{s.script}</span>}
            <figcaption>{img.caption}</figcaption>
          </figure>)}
        </div>
      </div>
      <div className="spotlight-foot"><span>Travel deeper</span><i /><span>Live brighter</span></div>
    </div>
  </section>;
}
