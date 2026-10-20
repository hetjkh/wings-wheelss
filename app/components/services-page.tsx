import Image from "./travel-image";
import { TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { JourneyPlanner } from "./journey-planner";
import { NetworkMap } from "./network-map";
import { ChapterMotion } from "./chapter-motion";
import { ServicesIndex, type IndexedService } from "./services-index";
import { ServicesFinal } from "./services-final";
import { office } from "./data";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./services-final.css";

const stops: { icon: IconKind; title: string; text: string }[] = [
  { icon: "calendar", title: "Plan", text: "Get ready for your journey." },
  { icon: "plane", title: "Fly", text: "From here to where you need to be." },
  { icon: "document", title: "Arrive", text: "Visa and arrival formalities." },
  { icon: "bed", title: "Stay", text: "Somewhere that fits your plans." },
  { icon: "compass", title: "Experience", text: "Make the most of where you are." },
  { icon: "return", title: "Return", text: "And we’ll help when it’s time." },
];

const services: IndexedService[] = [
  { icon: "plane", title: "Flights", line: "From here to wherever you need to be.", photo: "/images/library/airport-traveller.webp", alt: "A traveller with a rolling suitcase inside an airport terminal", position: "center", items: ["Flight bookings", "Multi-city itineraries", "Group flights", "Business travel", "International connections"], cta: "Explore flights", service: "Flights" },
  { icon: "bed", title: "Hotels", line: "Somewhere that fits the reason you’re there.", photo: "/images/library/maldives-villas.webp", alt: "Overwater villa decks and pools above a clear Maldivian lagoon", position: "center", items: ["Business hotels", "Resorts", "Family accommodation", "Group stays", "Longer stays"], cta: "Explore hotels", service: "Hotels" },
  { icon: "document", title: "Visas & documentation", line: "The paperwork, checked before you leave.", photo: "/images/library/visa-passports.webp", alt: "Two passports held against a pink background", position: "center", items: ["Visa assistance", "Travel documentation guidance", "Travel insurance assistance", "Pre-departure checks"], cta: "Visa support", service: "Visa assistance" },
  { icon: "car", title: "Airport & ground transfers", line: "Someone waiting when you land.", photo: "/images/library/airport-transfer.webp", alt: "A chauffeur helping a traveller load luggage into an executive airport transfer vehicle", position: "center", items: ["Airport transfers", "Private vehicles", "Chauffeur services", "Group transportation", "Hotel / venue transfers"], cta: "Arrange a transfer", service: "Airport & ground transfers" },
  { icon: "sun", title: "Holidays & experiences", line: "Time that is entirely yours.", photo: "/images/library/maldives-sandbank.webp", alt: "A white sandbank between a turquoise lagoon and the Indian Ocean", items: ["Family holidays", "Safari", "Beach escapes", "City breaks", "Multi-destination travel", "Selected experiences"], cta: "Explore destinations", service: "Leisure & holidays" },
  { icon: "support", title: "Travel support", line: "A real person, when plans change.", photo: "/images/library/travel-support-v2.webp", alt: "Two travel consultants reviewing a world map and planning a route together", position: "center", items: ["Changes", "Rebooking assistance", "Cancellations", "Onward travel", "Traveller support"], cta: "Talk to our team" },
];

const reasons = [
  { title: "Business", line: "Somewhere to be.", text: "Executive and company travel built around schedules and meetings.", photo: "/images/library/business-terminal-v2.webp", alt: "Business travellers walking through a bright airport terminal", position: "center", cta: "Corporate travel", service: "Corporate travel" },
  { title: "Leisure", line: "Somewhere to discover.", text: "Holidays, city breaks, safaris, beaches and more.", photo: "/images/library/bali-coast.webp", alt: "Turquoise water and dramatic cliffs on the coast of Nusa Penida", position: "center", cta: "Explore destinations", service: "Leisure & holidays" },
  { title: "Groups & MICE", line: "Somewhere to be — together.", text: "Team travel, exhibitions, conferences and events.", photo: "/images/library/conference.webp", alt: "Delegates attending an international conference in a modern hotel ballroom", position: "center", cta: "Groups & MICE", service: "Groups & MICE" },
  { title: "Africa", line: "Somewhere we’re particularly connected.", text: "Travel between the UAE, key African markets and beyond.", photo: "/images/library/cape-coast.webp", alt: "Ocean waves meeting the rocky South African coastline", position: "center", cta: "Explore Africa", service: "Africa travel" },
];

const examples: { type: string; route: string[]; items: { icon: IconKind; label: string }[] }[] = [
  { type: "Simple", route: ["Dubai", "London", "Dubai"], items: [{ icon: "people", label: "1 traveller" }, { icon: "plane", label: "Flight" }, { icon: "bed", label: "Hotel" }, { icon: "car", label: "Airport transfer" }] },
  { type: "Multi-destination", route: ["Dubai", "Nairobi", "Zanzibar", "Dubai"], items: [{ icon: "people", label: "2 travellers" }, { icon: "pin", label: "3 destinations" }, { icon: "plane", label: "Flights" }, { icon: "bed", label: "Hotels" }, { icon: "compass", label: "Safari / experiences" }, { icon: "car", label: "Transfers" }] },
  { type: "Group", route: ["4 cities", "Dubai event", "Return"], items: [{ icon: "people", label: "32 travellers" }, { icon: "plane", label: "Multiple flights" }, { icon: "document", label: "Visa support" }, { icon: "bed", label: "Hotel rooms" }, { icon: "car", label: "Airport transfers" }, { icon: "route", label: "Venue movements" }] },
];

const phases: { icon: IconKind; when: string; title: string; items: string[] }[] = [
  { icon: "calendar", when: "Before", title: "Get ready.", items: ["Flights", "Accommodation", "Visa support", "Transfers", "Travel documentation", "Itinerary coordination"] },
  { icon: "route", when: "During", title: "Keep moving.", items: ["Travel information", "Arrival coordination", "Transfers", "Changes", "Onward arrangements", "Support"] },
  { icon: "return", when: "After", title: "What comes next.", items: ["Return travel", "Future bookings", "Travel records", "Ongoing requirements", "Next journey"] },
];

const pillars = [
  { icon: "pin", title: "UAE base", text: "Regional coordination and international access." },
  { icon: "people", title: "Africa network", text: "Local knowledge and on-ground connections." },
  { icon: "globe", title: "Global reach", text: "International travel planning and coordination." },
] as const;

function WhatsAppLink({ className }: { className: string }) {
  return <a className={className} href={office.whatsapp} target="_blank" rel="noreferrer"><TravelIcon kind="chat" size={16} />WhatsApp our team</a>;
}

export default function ServicesPage() {
  return <ChapterMotion>
    <a className="skip-link" href="#approach">Skip to content</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="approach" />
    <main>
      <section className="j-hero s-hero" id="top" aria-labelledby="services-hero-heading">
        <video className="j-photo j-hero-photo" src="/hero.mp4" poster="/images/journey/hero.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow" data-hero>Travel services</span>
            <h1 id="services-hero-heading"><span className="s-line"><span data-hero>Your journey</span></span><span className="s-line"><span data-hero>has many parts.</span></span><span className="s-hero-accent" data-hero>We bring them together.</span></h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" data-hero />
            <p data-hero>Flights, hotels, visas, transfers and holidays, coordinated around where you need to go.</p>
            <div className="s-actions" data-hero>
              <EnquiryButton className="j-button j-button-cream">Plan your journey</EnquiryButton>
              <WhatsAppLink className="j-button j-button-outline-light" />
            </div>
          </div>
        </div>
        <a href="#approach" className="j-scroll-note">Every part, together <span>↓</span></a>
      </section>

      <section className="s-approach j-torn-top" id="approach" aria-labelledby="approach-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>01 / How we think about travel</span><span>One journey. Every part.</span></div>
          <div className="s-split-head">
            <h2 id="approach-heading" className="s-title">A flight is only<br />one part of<br />the journey.</h2>
            <p className="s-lead">You need to get to the airport. You may need a visa. You need somewhere to stay. Someone may need to meet you when you arrive. And sometimes plans change.</p>
          </div>
          <div className="s-route">
            <div className="s-route-track" aria-hidden="true"><span className="s-route-fill" /><span className="s-route-plane"><TravelIcon kind="plane" size={22} /></span></div>
            <ol className="s-stops">{stops.map((stop, i) => <li key={stop.title} className="s-stop">
              <span className="s-stop-icon"><TravelIcon kind={stop.icon} size={26} /></span>
              <span className="s-stop-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{stop.title}</h3>
              <p>{stop.text}</p>
            </li>)}</ol>
          </div>
          <div className="s-approach-close s-draw">
            <p className="s-statement">One journey.<br />Everything around it.</p>
            <p className="s-lead-body">Wings &amp; Wheels brings the different parts of travel together so you have fewer things to coordinate yourself.</p>
          </div>
        </div>
      </section>

      <section className="s-services j-torn-top" id="services" aria-labelledby="services-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">02 / Our travel services</span><h2 id="services-heading" className="s-title">Whatever the<br />journey needs.</h2></div>
            <p className="s-lead">A complete travel service, coordinated around you. Choose one part, or let us bring every part together.</p>
          </div>
          <ServicesIndex services={services} />
        </div>
      </section>

      <section className="s-reasons j-torn-top" id="reasons" aria-labelledby="reasons-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">03 / Travel for different reasons</span><h2 id="reasons-heading" className="s-title">Not every journey<br />looks the same.</h2></div>
            <p className="s-lead">The reason you travel shapes everything around it. The care we bring to it stays the same.</p>
          </div>
        </div>
        <div className="s-reason-panels">{reasons.map((item, i) => <article key={item.title} className="s-reason">
          <Image className="s-reason-photo" src={item.photo} alt={item.alt} fill sizes="(max-width: 800px) 100vw, 40vw" style={{ objectPosition: item.position }} />
          <div className="s-reason-shade" />
          <span className="s-reason-number">{String(i + 1).padStart(2, "0")}</span>
          <div className="s-reason-copy">
            <h3>{item.title}</h3>
            <p className="s-reason-line">{item.line}</p>
            <div className="s-reason-more"><div>
              <p>{item.text}</p>
              <EnquiryButton className="j-button j-button-cream" service={item.service}>{item.cta}</EnquiryButton>
            </div></div>
          </div>
        </article>)}</div>
      </section>

      <section className="s-scale j-torn-top" id="journeys" aria-labelledby="scale-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>04 / Every journey is different</span><span>Simple · Multi-destination · Group</span></div>
          <div className="s-split-head">
            <h2 id="scale-heading" className="s-title s-rows"><span>One flight or</span><span>twelve moving parts.</span></h2>
            <p className="s-lead">Whether it&apos;s a quick return trip or a group arriving from four cities, every detail is held in one plan.</p>
          </div>
          <div className="s-tickets">{examples.map(example => <article key={example.type} className="s-ticket">
            <header><span className="j-eyebrow">{example.type}</span><span className="s-ticket-count">{example.items.length} parts coordinated</span></header>
            <ol className="s-ticket-route" aria-label={`Route: ${example.route.join(" to ")}`}>{example.route.map((stop, i) => <li key={`${stop}-${i}`}>{stop}</li>)}</ol>
            <ul className="s-ticket-items">{example.items.map(item => <li key={item.label}><TravelIcon kind={item.icon} size={18} />{item.label}</li>)}</ul>
          </article>)}</div>
        </div>
      </section>

      <section className="s-principle j-torn-top" aria-labelledby="principle-heading">
        <div className="s-principle-frame">
          <Image className="j-photo" src="/images/library/business-boarding.webp" alt="A business traveller approaching an aircraft on the apron" fill sizes="100vw" />
          <div className="s-principle-shade" />
        </div>
        <div className="j-shell s-principle-copy">
          <span className="j-eyebrow">One point of contact</span>
          <h2 id="principle-heading" className="s-principle-title">The journey changes.<br />The principle doesn&apos;t.</h2>
          <span className="s-principle-rule" aria-hidden="true" />
          <p>One point of contact. One coordinated plan.</p>
          <EnquiryButton className="j-button j-button-cream">Plan your journey</EnquiryButton>
        </div>
        <div className="j-shell s-principle-foot" aria-hidden="true"><span>Simple</span><span>Multi-destination</span><span>Group</span></div>
      </section>

      <section className="s-beyond j-torn-top" id="beyond" aria-labelledby="beyond-heading">
        <video className="j-photo s-beyond-video" src="/videos/dubai-city-panorama.mp4" poster="/videos/dubai-city-panorama-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="s-beyond-shade" />
        <div className="j-shell s-beyond-content">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">05 / Before. During. After.</span><h2 id="beyond-heading" className="s-title">We think<br />beyond departure.</h2></div>
            <p className="s-lead s-quote">Good travel support doesn&apos;t begin at take-off or end at landing.</p>
          </div>
          <div className="s-phase-line" aria-hidden="true"><span /></div>
          <ol className="s-phases">{phases.map(phase => <li key={phase.when} className="s-phase">
            <span className="s-phase-icon"><TravelIcon kind={phase.icon} size={26} /></span>
            <span className="j-eyebrow">{phase.when}</span>
            <h3>{phase.title}</h3>
            <ul>{phase.items.map(item => <li key={item} className="s-draw">{item}</li>)}</ul>
          </li>)}</ol>
        </div>
      </section>

      <section className="s-network j-torn-top" id="network" aria-labelledby="network-heading">
        <div className="j-shell s-network-grid">
          <div className="s-network-copy">
            <span className="j-eyebrow s-eyebrow">06 / Our network</span>
            <h2 id="network-heading" className="s-title s-rows"><span>Local</span><span>connections.</span><span>Journeys that</span><span>go further.</span></h2>
            <p className="s-lead-body">Wings &amp; Wheels combines its UAE base with a growing network across key African markets and international destinations.</p>
            <EnquiryButton className="j-button j-button-outline" service="Africa travel">Explore our Africa network</EnquiryButton>
          </div>
          <div className="s-network-map"><NetworkMap /></div>
        </div>
        <ul className="j-shell j-pillars">{pillars.map(pillar => <li key={pillar.title}><TravelIcon kind={pillar.icon} size={35} /><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></li>)}</ul>
      </section>

      <section className="s-plan j-torn-top" id="plan" aria-labelledby="plan-heading">
        <div className="j-shell s-plan-grid">
          <div className="s-plan-copy">
            <span className="j-eyebrow s-eyebrow">07 / Start here</span>
            <h2 id="plan-heading" className="s-title">Just tell us<br />about the journey.</h2>
            <p className="s-lead-body">Where you&apos;re starting, where you need to be and why. We&apos;ll shape the rest around it.</p>
            <dl className="s-plan-contact">
              <div className="s-draw"><dt>Call</dt><dd><a href={office.phones[0].href}>{office.phones[0].label}</a></dd></div>
              <div className="s-draw"><dt>Email</dt><dd><a href={`mailto:${office.email}`}>{office.email}</a></dd></div>
              <div className="s-draw"><dt>Hours</dt><dd>{office.hours}</dd></div>
            </dl>
          </div>
          <div data-enter><JourneyPlanner /></div>
        </div>
      </section>

      <ServicesFinal />
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
