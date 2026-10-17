import { Arrow, TravelIcon } from "./icons";
import { DestinationEnquiry } from "./destination-enquiry";
import Image from "./travel-image";
import { destinationGuides } from "./destination-guides";

const journeys = [
  ["Dubai", "Nairobi", "City to safari"], ["Nairobi", "Zanzibar", "Safari to island time"],
  ["Kampala", "Dubai", "Regional to international"], ["Dubai", "Maldives", "City to sea"],
  ["Nairobi", "London", "Business and beyond"], ["Juba", "Dubai", "Your onward journey"],
];
const support = ["Flights", "Hotels", "Visas", "Transfers", "Experiences", "Support"];

export function DestinationConnections() {
  return <section className="d-connections j-torn-top" id="onward" aria-labelledby="onward-heading">
    <div className="j-shell">
      <div className="j-section-label s-draw"><span>07 / Your journey can start in more than one place</span><span>Every part connected</span></div>
      <div className="s-split-head"><h2 className="s-title" id="onward-heading">Wherever you&apos;re starting from.<br /><span className="d-title-soft">We can help connect what comes next.</span></h2><p className="s-lead">One team to bring the places, plans and practical details together.</p></div>
      <div className="d-departure-board">
        <div className="d-board-head" aria-hidden="true"><span>From</span><span>To</span><span>Your journey</span></div>
        <ol>{journeys.map(([from, to, reason], index) => <li key={`${from}-${to}`}>
          <span className="d-board-origin"><small>{String(index + 1).padStart(2, "0")}</small>{from}</span><span className="d-board-arrival"><Arrow />{to}</span><span className="d-board-reason">{reason}</span>
        </li>)}</ol>
        <p>Journey ideas we can coordinate, with flight connections and availability checked for your dates.</p>
      </div>
      <div className="d-connection-foot"><ul>{support.map(item => <li key={item}>{item}</li>)}</ul><a className="j-text-link" href="#destination-enquiry">Connect my journey <Arrow /></a></div>
    </div>
  </section>;
}

export function DestinationPlanning({ destination, detail = false }: { destination?: string; detail?: boolean }) {
  const guide = destinationGuides.find(item => item.name === destination);
  return <section className="d-destination-plan j-torn-top" id="destination-enquiry" aria-labelledby="destination-enquiry-heading">
    <div className="j-shell d-destination-plan-grid">
      <div className="d-destination-plan-copy">
        <span className="j-eyebrow s-eyebrow">{detail ? "Your journey starts here" : "08 / Destination enquiry"}</span>
        <h2 id="destination-enquiry-heading" className="s-title">{destination ? <>Thinking about<br />{destination}?</> : <>A place in mind.<br /><span>Or just an idea.</span></>}</h2>
        <p className="d-body">Tell us who you&apos;re travelling with and how you want the trip to feel. We&apos;ll help shape the journey around you.</p>
        <div className="d-planning-photo">
          <Image src={guide?.photo ?? "/images/library/maldives-jetty.webp"} alt={guide?.alt ?? "A wooden jetty leading across turquoise water to a Maldivian island"} fill sizes="(max-width: 991px) 92vw, 38vw" />
          <div className="d-planning-photo-shade" />
          <span className="d-planning-photo-note">{destination ?? "Somewhere that feels like you"}</span>
          <div className="d-planning-photo-caption"><TravelIcon kind="compass" size={32} /><p>Not just a place.<br /><em>Your kind of journey.</em></p></div>
        </div>
        <div className="d-planning-assurance"><span><TravelIcon kind="people" size={18} />A real team, from the first hello</span><span>Dubai &amp; beyond <Arrow /></span></div>
      </div>
      <DestinationEnquiry destination={destination} />
    </div>
  </section>;
}
