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
  { title: "UAE base", text: "Regional coordination and international access." },
  { title: "Africa network", text: "Local knowledge and on-ground connections." },
  { title: "Global reach", text: "International travel planning and coordination." },
];

const statuses: { label: string; tone: string; icon: IconKind }[] = [
  { label: "Flight delayed", tone: "alert", icon: "plane" },
  { label: "Options reviewed", tone: "work", icon: "search" },
  { label: "Itinerary updated", tone: "work", icon: "calendar" },
  { label: "Journey continues", tone: "good", icon: "check" },
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
        <Image className="j-photo j-hero-photo" src="/images/corporate.png" alt="" fill preload sizes="100vw" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow" data-hero>Corporate travel</span>
            <h1 id="corporate-hero-heading"><span className="s-line"><span data-hero>Business</span></span><span className="s-line"><span data-hero>moves fast.</span></span><span className="s-hero-accent" data-hero>So do we.</span></h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" data-hero />
            <p data-hero>From a single executive journey to ongoing company travel, we manage the details so your people can keep moving.</p>
            <div className="s-actions" data-hero>
              <EnquiryButton className="j-button j-button-cream" service="Corporate travel">Talk to our corporate team</EnquiryButton>
              <WhatsAppLink className="j-button j-button-outline-light" />
            </div>
            <ul className="s-hero-tags" data-hero>{["Flights", "Hotels", "Visas", "Transfers", "Support"].map(tag => <li key={tag}>{tag}</li>)}</ul>
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
          <ul className="k-cards" data-stagger>{services.map(item => <li key={item.title} className="k-card">
            <div className="k-card-inner">
              <div className="k-card-front">
                <Image src={item.photo} alt="" fill sizes="(max-width: 800px) 92vw, 30vw" style={{ objectPosition: item.position }} />
                <span className="k-card-icon"><TravelIcon kind={item.icon} size={20} /></span>
                <h3>{item.title}</h3>
                <span className="k-card-hint" aria-hidden="true">What&apos;s included <Arrow /></span>
              </div>
              <div className="k-card-back">
                <span className="k-card-icon"><TravelIcon kind={item.icon} size={20} /></span>
                <span className="k-card-title" aria-hidden="true">{item.title}</span>
                <ul>{item.items.map(line => <li key={line}>{line}</li>)}</ul>
                <EnquiryButton className="k-card-link" service={item.service}>Ask about this</EnquiryButton>
              </div>
            </div>
          </li>)}</ul>
        </div>
      </section>

      <section className="k-day j-torn-top" id="day" aria-labelledby="day-heading">
        <div className="j-shell">
          <div className="s-split-head k-day-head">
            <div><span className="j-eyebrow s-eyebrow">03 / A day in corporate travel</span><h2 id="day-heading" className="s-title">Different roles.<br />Different destinations.<span className="k-soft">One team.</span></h2></div>
            <p className="s-lead">From early morning meetings to multi-city trips, we coordinate the details so your team can focus on what&apos;s ahead.</p>
          </div>
          <ol className="k-schedule" data-stagger="0.1">{day.map(stop => <li key={stop.time}>
            <span className="k-schedule-time">{stop.time}</span>
            <span className="k-schedule-photo"><Image src={stop.photo} alt="" fill sizes="(max-width: 800px) 92vw, 18vw" /></span>
            <span className="k-schedule-label">{stop.label}</span>
          </li>)}</ol>
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
        <Image className="k-team-photo" src="/images/groups.png" alt="" fill sizes="100vw" />
        <div className="k-team-shade" />
        <div className="j-shell k-team-grid">
          <div className="k-team-copy">
            <span className="j-eyebrow s-eyebrow">05 / Business teams on the move</span>
            <h2 id="team-heading" className="s-title">Travelling as a team shouldn&apos;t mean managing ten different journeys.</h2>
            <p className="k-body">From management retreats to sales meetings and exhibitions, we keep every traveller, booking and movement connected.</p>
            <a className="j-button j-button-cream" href="/groups-mice">Explore Groups &amp; MICE <Arrow /></a>
          </div>
          <div className="k-tally">
            <span className="k-tally-head">We coordinate for your team</span>
            <ul data-stagger="0.08">{teamList.map(item => <li key={item.label}><TravelIcon kind={item.icon} size={18} />{item.label}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="k-network j-torn-top" id="network" aria-labelledby="network-heading">
        <Image className="k-network-globe" src="/images/about/globe.jpg" alt="" fill sizes="60vw" />
        <div className="j-shell k-network-grid">
          <figure className="k-rings" data-progress="top 75%" data-progress-end="center 45%" aria-label="The UAE at the centre, our Africa network around it, and global reach beyond">
            {rings.slice().reverse().map((ring, i) => <span key={ring.title} className="k-ring" style={{ "--r": rings.length - 1 - i } as React.CSSProperties}><b>{ring.title}</b></span>)}
            <span className="k-ring-core">UAE</span>
          </figure>
          <div className="k-network-copy">
            <span className="j-eyebrow s-eyebrow">06 / UAE → Africa → Worldwide</span>
            <h2 id="network-heading" className="s-title">A connected network for a global business.</h2>
            <p className="k-body">With our UAE base and regional network across key African markets, we support business travel within the region and beyond — connecting your teams to where they need to be.</p>
            <dl className="k-network-list" data-draw-group>{rings.map(ring => <div key={ring.title} className="s-draw"><dt>{ring.title}</dt><dd>{ring.text}</dd></div>)}</dl>
            <a className="j-button j-button-outline-light" href="/africa">Explore our Africa network <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="k-support j-torn-top" id="support" aria-labelledby="support-heading">
        <div className="j-shell k-support-grid">
          <div>
            <span className="j-eyebrow s-eyebrow">07 / Travel support</span>
            <h2 id="support-heading" className="s-title">Plans change.<br />Your business<br />still needs to move.</h2>
            <p className="k-body">When flights are delayed, meetings move or plans change, our team can help review available options and coordinate the next steps.</p>
            <EnquiryButton className="j-button j-button-olive" service="Travel support">Contact travel support</EnquiryButton>
          </div>
          <ol className="k-flow" data-stagger="0.12">{statuses.map((status, i) => <li key={status.label} data-tone={status.tone}>
            <span className="k-flow-icon"><TravelIcon kind={status.icon} size={20} /></span>
            <span className="k-flow-step">Step {i + 1}</span>
            <strong>{status.label}</strong>
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
            <div><span className="j-eyebrow s-eyebrow">09 / How it works</span><h2 id="how-heading" className="s-title">Simple for your team.<br />Managed by ours.</h2></div>
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
