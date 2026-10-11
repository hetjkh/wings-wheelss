import Image from "next/image";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import { office } from "./data";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./corporate.css";

const verbs = [
  { word: "Plan", text: "Understand your travel requirements." },
  { word: "Coordinate", text: "Bring the details together." },
  { word: "Manage", text: "Keep your travellers moving." },
  { word: "Support", text: "Be there when plans change." },
];

const services: { icon: IconKind; title: string; photo: string; position?: string; items: string[]; service: string }[] = [
  { icon: "plane", title: "Business flights", photo: "/images/about/business-airport.jpg", items: ["Domestic & international", "Multi-city itineraries", "Flexible tickets & fares", "Group bookings"], service: "Flights" },
  { icon: "bed", title: "Hotels", photo: "/images/about/story-traveller.jpg", position: "65% center", items: ["Business hotels", "Extended stays", "Corporate rates", "Group accommodation"], service: "Hotels" },
  { icon: "document", title: "Visas & documentation", photo: "/images/about/lounge.jpg", position: "60% center", items: ["Visa assistance", "Travel documentation", "Travel insurance support", "Pre-departure checks"], service: "Visa assistance" },
  { icon: "car", title: "Airport & ground transfers", photo: "/images/about/coast-road.jpg", position: "85% center", items: ["Airport transfers", "Chauffeur services", "Group transportation", "Hotel & venue transfers"], service: "Airport & ground transfers" },
  { icon: "people", title: "Meetings & events travel", photo: "/images/about-airport.png", items: ["Conference travel", "Exhibitions & events", "Delegate movements", "Venue transportation"], service: "Groups & MICE" },
  { icon: "support", title: "Travel support", photo: "/images/about/team.jpg", position: "35% center", items: ["Changes & rebooking", "Emergency assistance", "Onward travel", "Dedicated support"], service: "Travel support" },
];

const day = [
  { time: "06:00", label: "Departure", photo: "/images/airport.png" },
  { time: "09:00", label: "Meeting", photo: "/images/journey/story-original.png" },
  { time: "12:30", label: "Client visit", photo: "/images/dubai.jpg" },
  { time: "15:00", label: "Team meeting", photo: "/images/about/business.jpg" },
  { time: "19:30", label: "Return flight", photo: "/images/about/hero-lounge.jpg" },
];

const companies = [
  { title: "Executive travel", text: "Individual journeys with flexibility and careful coordination.", people: 1 },
  { title: "SME & company travel", text: "Ongoing travel for employees, management and business teams.", people: 7 },
  { title: "Project & rotational", text: "Travel for teams working across multiple locations or markets.", people: 4, rotating: true },
  { title: "Event & exhibition", text: "Flights, hotels, transfers and travel coordination for meetings, conferences and exhibitions.", people: 21 },
];

const teamList: { icon: IconKind; label: string }[] = [
  { icon: "people", label: "Multiple travellers" },
  { icon: "route", label: "Multiple destinations" },
  { icon: "plane", label: "Flights & hotels" },
  { icon: "document", label: "Visa support" },
  { icon: "car", label: "Transfers & logistics" },
  { icon: "check", label: "One coordinated itinerary" },
];

const rings = [
  { title: "UAE base", scope: "Where we start", text: "Regional coordination and international access.", photo: "/images/dubai.jpg" },
  { title: "Africa network", scope: "Where we know the ground", text: "Local knowledge and on-ground connections.", photo: "/images/kenya-safari.png" },
  { title: "Global reach", scope: "Wherever you need to be", text: "International travel planning and coordination.", photo: "/images/about/globe.jpg" },
];

const statuses: { label: string; note: string; icon: IconKind }[] = [
  { label: "Flight delayed", note: "We are alerted and get in touch with the traveller.", icon: "plane" },
  { label: "Options reviewed", note: "Alternative flights and connections are checked.", icon: "search" },
  { label: "Itinerary updated", note: "New bookings, hotels and transfers are confirmed.", icon: "calendar" },
  { label: "Journey continues", note: "Your traveller carries on with an updated plan.", icon: "check" },
];

type Point = { x: number; y: number };
/** Positions on world-map.svg: longitude is linear across 1000 units, latitude roughly 3.03 units per degree. */
const at = (lon: number, lat: number): Point => ({ x: +((lon + 180) / .36).toFixed(1), y: +(4.1 + (83.6 - lat) * 3.03).toFixed(1) });
/** A gentle arc through each point, bowing north like a flight path. */
const flight = (points: Point[], bend = .22) => points.slice(1).reduce((d, b, i) => {
  const a = points[i];
  const dx = b.x - a.x, dy = b.y - a.y, k = dx >= 0 ? -bend : bend;
  return `${d} Q${((a.x + b.x) / 2 - dy * k).toFixed(1)} ${((a.y + b.y) / 2 + dx * k).toFixed(1)} ${b.x} ${b.y}`;
}, `M${points[0].x} ${points[0].y}`);

const dubai = at(55.3, 25.2);
const origins = [
  { city: "London", ...at(-.13, 51.5), side: "end" },
  { city: "Paris", ...at(2.35, 48.86), side: "end" },
  { city: "Frankfurt", ...at(8.68, 50.11), side: "start" },
  { city: "Istanbul", ...at(28.98, 41), side: "start" },
  { city: "Cairo", ...at(31.24, 30.04), side: "end" },
  { city: "Lagos", ...at(3.38, 6.52), side: "end" },
  { city: "Nairobi", ...at(36.8, -1.29), side: "start" },
  { city: "Johannesburg", ...at(28.05, -26.2), side: "start" },
  { city: "Mumbai", ...at(72.88, 19.07), side: "start" },
  { city: "Singapore", ...at(103.8, 1.35), side: "end" },
];

const forTravellers = ["Clear itineraries", "Flexible bookings", "Reliable transfers", "Traveller assistance", "Support when plans change"];
const forBusiness = ["Centralised travel coordination", "Clear communication", "Consistent booking process", "Travel records and reporting", "Dedicated point of contact"];

const steps = [
  { title: "Share your requirements", text: "Tell us who is travelling, where and when." },
  { title: "Receive options", text: "We bring together suitable travel options." },
  { title: "Confirm", text: "Your itinerary is booked and coordinated." },
  { title: "Travel", text: "Your team travels with the information they need." },
  { title: "We stay available", text: "For support when it's required." },
];

function Person() {
  return <svg viewBox="0 0 20 28" aria-hidden="true"><circle cx="10" cy="6" r="5" /><path d="M1 28v-6a9 9 0 0 1 18 0v6Z" /></svg>;
}

function WhatsAppLink({ className }: { className: string }) {
  return <a className={className} href={office.whatsapp} target="_blank" rel="noreferrer"><TravelIcon kind="chat" size={16} />WhatsApp us</a>;
}

export default function CorporatePage() {
  return <ChapterMotion className="corporate-page">
    <a className="skip-link" href="#people">Skip to content</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="people" />
    <main>
      <section className="j-hero s-hero k-hero" id="top" aria-labelledby="corporate-hero-heading">
        <video className="j-photo j-hero-photo" src="/hero.mp4" poster="/images/journey/hero.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow" data-hero>Corporate travel</span>
            <h1 id="corporate-hero-heading"><span className="s-line"><span data-hero>Business</span></span><span className="s-line"><span data-hero>moves fast.</span></span><span className="s-hero-accent" data-hero>So do we.</span></h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" data-hero />
            <p data-hero>From one executive trip to company-wide travel, we handle the details so your people keep moving.</p>
            <div className="s-actions" data-hero>
              <EnquiryButton className="j-button j-button-cream" service="Corporate travel">Talk to our corporate team</EnquiryButton>
              <WhatsAppLink className="j-button j-button-outline-light" />
            </div>
          </div>
        </div>
        <a href="#people" className="j-scroll-note">More than bookings <span>↓</span></a>
      </section>

      <section className="k-verbs j-torn-top" id="people" aria-labelledby="people-heading">
        <div className="j-shell k-verbs-grid">
          <div>
            <span className="j-eyebrow s-eyebrow">01 / More than bookings</span>
            <h2 id="people-heading" className="s-title">Corporate travel is about people,<span className="k-soft">plans and progress.</span></h2>
            <p className="s-lead-body k-body">Whether it&apos;s a meeting, a project, an event or ongoing travel, corporate journeys involve more than just a flight. We bring flights, accommodation, visas, transfers and traveller support together — with one team coordinating the journey from planning to return.</p>
          </div>
          <ol className="k-verb-list" data-progress="top 75%" data-progress-end="bottom 60%">{verbs.map((verb, i) => <li key={verb.word} style={{ "--i": i } as React.CSSProperties}>
            <span className="k-verb-number">{String(i + 1).padStart(2, "0")}</span>
            <strong className="k-verb">{verb.word}</strong>
            <span className="k-verb-text">{verb.text}</span>
          </li>)}</ol>
        </div>
      </section>

      <section className="k-services j-torn-top" id="services" aria-labelledby="services-heading">
        <div className="j-shell">
          <div className="s-split-head k-services-head">
            <div><span className="j-eyebrow s-eyebrow">02 / Our corporate travel services</span><h2 id="services-heading" className="s-title">Everything your<br />business trip needs.</h2></div>
            <div className="k-services-aside">
              <p>A complete travel service, coordinated around your people, your schedules and your business requirements.</p>
              <EnquiryButton className="j-button j-button-cream" service="Corporate travel">Discuss your requirements</EnquiryButton>
            </div>
          </div>
          <ul className="k-cards" data-stagger>{services.map((item, i) => <li key={item.title} className="k-card">
            <Image src={item.photo} alt="" fill sizes="(max-width: 800px) 92vw, 30vw" style={{ objectPosition: item.position }} />
            <span className="k-card-top">
              <span className="k-card-icon"><TravelIcon kind={item.icon} size={20} /></span>
              <span className="k-card-number">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <div className="k-card-body">
              <h3>{item.title}</h3>
              <div className="k-card-more">
                <div>
                  <ul>{item.items.map((line, n) => <li key={line} style={{ "--n": n } as React.CSSProperties}>{line}</li>)}</ul>
                  <EnquiryButton className="k-card-link" service={item.service}>Ask about this</EnquiryButton>
                </div>
              </div>
            </div>
          </li>)}</ul>
        </div>
      </section>

      <section className="k-day j-torn-top" id="day" data-steps={day.length} aria-labelledby="day-heading">
        <ol className="j-shell k-day-photos" data-stagger="0.1">{day.map((stop, i) => <li key={stop.time} style={{ "--i": i } as React.CSSProperties}>
          <Image src={stop.photo} alt="" fill sizes="(max-width: 800px) 92vw, 100vw" />
          <span className="k-day-caption"><b>{stop.time}</b>{stop.label}</span>
        </li>)}</ol>
        <div className="k-day-shade" aria-hidden="true" />
        <div className="j-shell k-day-grid">
          <div className="k-day-copy">
            <span className="j-eyebrow s-eyebrow">03 / A day in corporate travel</span>
            <h2 id="day-heading" className="s-title s-rows"><span>Different roles.</span><span>Different destinations.</span><span className="k-soft">One team.</span></h2>
            <p className="k-body">From early morning meetings to multi-city trips, we coordinate the details so your team can focus on what&apos;s ahead.</p>
          </div>
          <div className="k-clock" aria-hidden="true">
            <span className="k-clock-window k-clock-time"><span className="k-clock-track">{day.map(stop => <span key={stop.time}>{stop.time}</span>)}</span></span>
            <span className="k-clock-window k-clock-label"><span className="k-clock-track">{day.map(stop => <span key={stop.time}>{stop.label}</span>)}</span></span>
          </div>
        </div>
        <div className="j-shell k-dayline-shell" aria-hidden="true">
          <ol className="k-dayline">{day.map((stop, i) => <li key={stop.time} style={{ "--i": i } as React.CSSProperties}><b>{stop.time}</b>{stop.label}</li>)}</ol>
        </div>
      </section>

      <section className="k-companies j-torn-top" id="companies" aria-labelledby="companies-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">04 / Travel for real business needs</span><h2 id="companies-heading" className="s-title">Every company<br />travels differently.</h2></div>
            <p className="s-lead">We support businesses of all sizes across different industries, with travel solutions that fit their exact requirements.</p>
          </div>
          <ul className="k-scale" data-stagger="0.12">{companies.map(company => <li key={company.title}>
            <div className={company.rotating ? "k-crowd is-rotating" : "k-crowd"} aria-hidden="true" data-size={company.people > 10 ? "many" : company.people > 1 ? "some" : "one"}>
              {Array.from({ length: company.people }, (_, i) => <Person key={i} />)}
              {company.rotating && <svg className="k-rotate" viewBox="0 0 120 120"><path d="M60 8a52 52 0 1 1-52 52" /><path d="m2 52 6 9 8-8" /></svg>}
            </div>
            <h3>{company.title}</h3>
            <p>{company.text}</p>
          </li>)}</ul>
        </div>
      </section>

      <section className="k-team j-torn-top" id="teams" aria-labelledby="team-heading">
        <div className="j-shell s-split-head k-team-head-row">
          <div>
            <span className="j-eyebrow s-eyebrow">05 / Business teams on the move</span>
            <h2 id="team-heading" className="s-title">Travelling as a team shouldn&apos;t mean managing ten different journeys.</h2>
          </div>
          <div className="k-team-intro">
            <p className="k-body">From management retreats to sales meetings and exhibitions, we keep every traveller, booking and movement connected.</p>
            <a className="j-button j-button-cream" href="/groups-mice">Explore Groups &amp; MICE <Arrow /></a>
          </div>
        </div>
        <div className="j-shell k-team-grid" data-progress="top 75%" data-progress-end="top 10%">
          <div className="k-team-copy">
            <span className="k-team-head">We coordinate for your team</span>
            <ul className="k-team-list">{teamList.map((item, i) => <li key={item.label} style={{ "--i": i } as React.CSSProperties}><TravelIcon kind={item.icon} size={18} />{item.label}</li>)}</ul>
          </div>
          <figure className="k-team-map" aria-label={`Ten journeys, from ${origins.map(o => o.city).join(", ")}, coming together in Dubai`}>
            <svg viewBox="434 62 378 300" aria-hidden="true">
              <image className="k-map-land" href="/images/world-map.svg" x="0" y="0" width="1000" height="440" />
              {origins.map((o, i) => <path key={o.city} className="k-map-route" pathLength={1} d={flight([o, dubai], .2)} style={{ "--i": i } as React.CSSProperties} />)}
              {origins.map((o, i) => <g key={o.city} className="k-map-city" style={{ "--i": i } as React.CSSProperties}>
                <circle cx={o.x} cy={o.y} r="2.4" />
                <text x={o.x + (o.side === "end" ? -5 : 5)} y={o.y + 2.4} textAnchor={o.side === "end" ? "end" : "start"}>{o.city}</text>
              </g>)}
              <g className="k-map-hub">
                <circle className="k-map-pulse" cx={dubai.x} cy={dubai.y} r="9" />
                <circle cx={dubai.x} cy={dubai.y} r="4.5" />
                <text x={dubai.x + 8} y={dubai.y + 3}>Dubai</text>
              </g>
            </svg>
            <figcaption className="k-team-count">
              <span><b>10</b> journeys</span><Arrow /><span><b>1</b> itinerary</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="k-network j-torn-top" id="network" aria-labelledby="network-heading">
        <div className="j-shell">
          <div className="s-split-head k-network-head">
            <div><span className="j-eyebrow s-eyebrow">06 / UAE → Africa → Worldwide</span><h2 id="network-heading" className="s-title">A connected network<br />for a global business.</h2></div>
            <div className="k-network-intro">
              <p className="k-body">With our UAE base and regional network across key African markets, we support business travel within the region and beyond — connecting your teams to where they need to be.</p>
              <a className="j-button j-button-outline-light" href="/africa">Explore our Africa network <Arrow /></a>
            </div>
          </div>
          <ol className="k-reach" data-progress="top 85%" data-progress-end="top 25%">{rings.map((ring, i) => <li key={ring.title} style={{ "--i": i } as React.CSSProperties}>
            <Image src={ring.photo} alt="" fill sizes="(max-width: 991px) 92vw, 40vw" />
            <span className="k-reach-number">{String(i + 1).padStart(2, "0")}</span>
            <div className="k-reach-copy">
              <span className="k-reach-scope">{ring.scope}</span>
              <h3>{ring.title}</h3>
              <p>{ring.text}</p>
            </div>
          </li>)}</ol>
        </div>
      </section>

      <section className="k-support j-torn-top" id="support" aria-labelledby="support-heading">
        <div className="j-shell">
          <div className="s-split-head k-support-head">
            <div><span className="j-eyebrow s-eyebrow">07 / Travel support</span><h2 id="support-heading" className="s-title">Plans change.<br />Your business still needs to move.</h2></div>
            <div className="k-support-intro">
              <p className="k-body">When flights are delayed, meetings move or plans change, our team can help review available options and coordinate the next steps.</p>
              <EnquiryButton className="j-button j-button-olive" service="Travel support">Contact travel support</EnquiryButton>
            </div>
          </div>
          <ol className="k-flow" data-progress="top 85%" data-progress-end="top 35%">{statuses.map((status, i) => <li key={status.label} style={{ "--i": i } as React.CSSProperties}>
            <span className="k-flow-dot" aria-hidden="true"><TravelIcon kind={status.icon} size={20} /></span>
            <span className="k-flow-step">Step {String(i + 1).padStart(2, "0")}</span>
            <strong>{status.label}</strong>
            <span className="k-flow-note">{status.note}</span>
          </li>)}</ol>
        </div>
      </section>

      <section className="k-sides j-torn-top" id="benefits" aria-labelledby="sides-heading">
        <h2 id="sides-heading" className="k-sides-title">One journey, two sides.</h2>
        <div className="k-sides-grid">
          <div className="k-side k-side-travellers">
            <div className="k-side-photo" data-frame><Image src="/images/about/story-walk.jpg" alt="A business traveller arriving at her hotel room with a view of the city" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
            <div className="k-side-copy">
              <span className="j-eyebrow">For your travellers</span>
              <ul>{forTravellers.map(item => <li key={item}><svg viewBox="0 0 24 24" aria-hidden="true"><path data-trace pathLength={1} d="M5 12.5 10 17.5 19 7" /></svg>{item}</li>)}</ul>
            </div>
          </div>
          <div className="k-side k-side-business">
            <div className="k-side-photo" data-frame><Image src="/images/about/team.jpg" alt="A Wings & Wheels coordinator reviewing company travel at her desk" fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectPosition: "35% center" }} /></div>
            <div className="k-side-copy">
              <span className="j-eyebrow">For your business</span>
              <ul>{forBusiness.map(item => <li key={item}><svg viewBox="0 0 24 24" aria-hidden="true"><path data-trace pathLength={1} d="M5 12.5 10 17.5 19 7" /></svg>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="k-steps j-torn-top" id="how" aria-labelledby="how-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">09 / How it works</span><h2 id="how-heading" className="s-title s-rows"><span>Simple for your team.</span><span>Managed by ours.</span></h2></div>
            <p className="s-lead">Five steps from the first message to the journey home.</p>
          </div>
          <ol className="k-stairs" data-stagger="0.12">{steps.map((step, i) => <li key={step.title} style={{ "--i": i } as React.CSSProperties}>
            <div className="k-stair">
              <span className="k-stair-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>)}</ol>
        </div>
      </section>

      <section className="s-final k-final j-torn-top" aria-labelledby="final-heading">
        <Image className="j-photo s-final-photo" src="/images/journey/business-original.png" alt="" fill sizes="100vw" />
        <div className="s-final-shade" />
        <div className="j-shell s-final-content">
          <span className="j-eyebrow">Wings &amp; Wheels</span>
          <h2 id="final-heading">Your people have<br />somewhere to be.</h2>
          <p className="s-lead-body">Let us take care of what happens in between.</p>
          <div className="s-actions">
            <EnquiryButton className="j-button j-button-cream" service="Corporate travel">Talk to our corporate team</EnquiryButton>
            <WhatsAppLink className="j-button j-button-outline-light" />
          </div>
        </div>
      </section>
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
