"use client";

import { useState } from "react";
import Image from "./travel-image";
import { Arrow } from "./icons";

const trips = [
  { time: "48 hours", kind: "Business trip", text: "Meetings, a well-placed hotel and transfers that work around your schedule." },
  { time: "5 days", kind: "City break", text: "Neighbourhoods, skyline views and time to discover the city at your own pace." },
  { time: "7 days", kind: "Family holiday", text: "Space to explore together, with days that work for everyone travelling." },
  { time: "4 days", kind: "Exhibition + leisure", text: "The event comes first. A little extra time makes room for the city around it." },
  { time: "Weekend", kind: "Stopover", text: "Turn the time between journeys into a short stay worth remembering." },
];

export function DubaiTrips() {
  const [active, setActive] = useState(0);
  return <div className="d-dubai-trips">
    <div className="d-dubai-scene">
      <Image src="/images/library/dubai-panorama.webp" alt="Dubai skyline and the Burj Khalifa, one city with many ways to experience it" fill sizes="100vw" />
      <div className="d-dubai-shade" aria-hidden="true" />
      <div className="d-dubai-strips" aria-label="Ways to experience Dubai">{trips.map((trip, index) => <button key={trip.kind} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
        <span className="d-dubai-number">0{index + 1}</span><span className="d-dubai-time">{trip.time}</span><strong>{trip.kind}</strong><span className="d-dubai-select" aria-hidden="true">↗</span>
      </button>)}</div>
    </div>
    <div className="d-dubai-selected" aria-live="polite"><p><strong>{trips[active].kind}.</strong> {trips[active].text}</p><a className="j-text-link" href="#destination-enquiry">Shape my Dubai journey <Arrow /></a></div>
  </div>;
}
