"use client";

import { useState } from "react";
import Image from "./travel-image";
import { Arrow, TravelIcon } from "./icons";

const directions = [
  { title: "Travelling into Africa", photo: "/images/library/kenya-game-drive.webp", alt: "Travellers arriving for a safari in an African grassland landscape", items: ["Business travel", "Safari & leisure", "Family travel", "Groups", "Projects", "Regional travel"], route: "Dubai → Africa", href: "#destinations" },
  { title: "Travelling into the UAE", photo: "/images/library/airport-transfer.webp", alt: "A traveller being welcomed by a driver on arrival at an airport", items: ["Business meetings", "Exhibitions & conferences", "Family travel", "Medical / personal travel", "Groups", "International connections"], route: "Africa → Dubai", href: "#dubai-arrival" },
];

export function AfricaCorridor() {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="a-corridor-grid">
    {directions.map((side, i) => <article className="a-corridor-card" key={side.title} data-open={open === i}
      onMouseEnter={() => { if (matchMedia("(hover: hover)").matches) setOpen(i); }}
      onMouseLeave={() => { if (matchMedia("(hover: hover)").matches) setOpen(null); }}
      onFocusCapture={event => { if (event.target.matches(":focus-visible")) setOpen(i); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}>
      <Image src={side.photo} alt={side.alt} fill sizes="(max-width: 700px) 92vw, 46vw" />
      <div className="a-corridor-card-shade" />
      <div className="a-corridor-card-copy">
        <h3><button type="button" aria-expanded={open === i} aria-controls={`corridor-details-${i}`} onClick={() => setOpen(open === i ? null : i)}>{side.title}<span aria-hidden="true">{open === i ? "−" : "+"}</span></button></h3>
        <div className="a-corridor-reveal" id={`corridor-details-${i}`} inert={open !== i} aria-hidden={open !== i}>
          <div><ul>{side.items.map(item => <li key={item}><TravelIcon kind="check" size={16} />{item}</li>)}</ul>
          <a className="j-button j-button-cream" href={side.href}>{side.route}<Arrow /></a></div>
        </div>
      </div>
    </article>)}
    <div className="a-corridor-bridge" aria-hidden="true"><span>W</span><p>One connected<br />travel network.</p></div>
  </div>;
}
