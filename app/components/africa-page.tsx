import Image from "next/image";
import Link from "next/link";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { NetworkMap } from "./network-map";
import { ChapterMotion } from "./chapter-motion";
import { office } from "./data";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./africa.css";

const reasons = [
  { title: "Business", text: "Meetings, projects and regional travel.", photo: "/images/about/business-airport.jpg", alt: "Business travellers walking through an airport terminal", position: "40% center" },
  { title: "Safari", text: "Wildlife and extraordinary landscapes.", photo: "/images/journey/safari.webp", alt: "A traveller watching elephants on the savannah beneath Kilimanjaro", position: "60% center" },
  { title: "Family", text: "Holidays and journeys together.", photo: "/images/journey/leisure.webp", alt: "An unhurried afternoon beside a turquoise lagoon", position: "70% center" },
  { title: "Groups & MICE", text: "Conferences, exhibitions and delegations.", photo: "/images/groups.png", alt: "Colleagues walking through an airport together", position: "40% center" },
];

const pillars = [
  { icon: "pin", title: "UAE", text: "Middle East coordination." },
  { icon: "people", title: "East Africa", text: "Regional expertise." },
  { icon: "globe", title: "Worldwide", text: "International travel support." },
] as const;

const corridor = [
  { from: "From the UAE", into: "Travelling into Africa", items: ["Business travel", "Safari & leisure", "Family travel", "Groups", "Projects", "Regional travel"], route: ["Dubai", "Africa"] },
  { from: "From Africa", into: "Travelling into the UAE", items: ["Business meetings", "Exhibitions & conferences", "Family travel", "Medical / personal travel", "Groups", "International connections"], route: ["Africa", "Dubai"] },
];

const business: { icon: IconKind; title: string; text: string }[] = [
  { icon: "briefcase", title: "Executive travel", text: "Individual business journeys requiring careful coordination." },
  { icon: "route", title: "Project & rotational", text: "Teams moving regularly between locations." },
  { icon: "nodes", title: "Regional business", text: "Multi-city journeys across African markets." },
  { icon: "people", title: "UAE business travel", text: "Travel for African delegations and companies visiting the UAE." },
];

const destinations = [
  { name: "Kenya", line: "Safari. City. Coast.", photo: "/images/kenya-safari.png", alt: "Giraffes on a hillside with Nairobi and the coast beyond", position: "55% center" },
  { name: "Tanzania", line: "Serengeti. Zanzibar. Kilimanjaro.", photo: "/images/tanzania.png", alt: "Elephants crossing the savannah beneath Kilimanjaro", position: "center" },
  { name: "Uganda", line: "Wildlife. Nature. Adventure.", photo: "/images/uganda.png", alt: "Mountain gorillas resting on a forested hillside", position: "center" },
];
const more = ["Rwanda", "Ethiopia", "Mauritius", "Seychelles", "South Africa"];

const itinerary = [
  { name: "Dubai", role: "International hub", photo: "/images/journey/dubai.webp" },
  { name: "Nairobi", role: "City", photo: "/images/kenya-safari.png", position: "15% center" },
  { name: "Maasai Mara", role: "Safari", photo: "/images/kenya.jpg", position: "30% center" },
  { name: "Zanzibar", role: "Beach", photo: "/images/maldives.jpg" },
  { name: "Dubai", role: "Home", photo: "/images/dubai-terrace.png", position: "60% center" },
];

export default function AfricaPage() {
  return <ChapterMotion className="africa-page">
    <a className="skip-link" href="#connections">Skip to content</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="connections" />
    <main>
      <section className="j-hero s-hero" id="top" aria-labelledby="africa-hero-heading">
        <Image className="j-photo j-hero-photo" src="/images/kenya-safari.png" alt="" fill preload sizes="100vw" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow" data-hero>Africa</span>
            <h1 id="africa-hero-heading"><span className="s-line"><span data-hero>Africa is</span></span><span className="s-line"><span data-hero>closer than</span></span><span className="s-line"><span data-hero>you think.</span></span></h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" data-hero />
            <p data-hero>From business travel and regional connections to safaris, holidays and international journeys, Wings &amp; Wheels connects travellers between the UAE, Africa and beyond.</p>
            <div className="s-actions" data-hero>
              <a className="j-button j-button-cream" href="#destinations">Explore Africa <Arrow /></a>
              <EnquiryButton className="j-button j-button-outline-light" service="Africa travel">Talk to our Africa team</EnquiryButton>
            </div>
            <p className="a-corridor-tag" data-hero>UAE <span>↔</span> Africa <span>↔</span> Worldwide</p>
          </div>
        </div>
        <a href="#connections" className="j-scroll-note">A continent of connections <span>↓</span></a>
      </section>

      <section className="a-connections j-torn-top" id="connections" aria-labelledby="connections-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>01 / A continent of connections</span><span>Individuals · Companies · Groups · Organisations</span></div>
          <div className="s-split-head">
            <h2 id="connections-heading" className="s-title">Africa isn&apos;t<br />one journey.</h2>
            <div>
              <p className="s-lead">Different reasons to travel. One connected network.</p>
              <p className="s-lead-body a-body">Wings &amp; Wheels helps coordinate travel across the UAE–Africa corridor for individuals, companies, groups and organisations.</p>
            </div>
          </div>
          <ol className="a-reasons" data-stagger>{reasons.map((item, i) => <li key={item.title} className="a-reason">
            <div className="a-reason-photo" data-frame><Image src={item.photo} alt={item.alt} fill sizes="(max-width: 600px) 90vw, (max-width: 991px) 45vw, 22vw" style={{ objectPosition: item.position }} /></div>
            <span className="a-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>)}</ol>
        </div>
      </section>

      <section className="a-network j-torn-top" id="network" aria-labelledby="network-heading">
        <div className="j-shell s-network-grid">
          <div className="s-network-copy">
            <span className="j-eyebrow s-eyebrow">02 / Our Africa network</span>
            <h2 id="network-heading" className="s-title">Local connections.<br />International reach.</h2>
            <p className="s-lead-body">With offices and partners across key African markets, W&amp;W provides on-ground support, regional expertise and seamless coordination between the UAE, Africa and worldwide.</p>
            <Link className="j-button j-button-outline" href="/contact">Our Africa offices <Arrow /></Link>
          </div>
          <div className="s-network-map"><NetworkMap /></div>
        </div>
        <ul className="j-shell j-pillars">{pillars.map(pillar => <li key={pillar.title}><TravelIcon kind={pillar.icon} size={35} /><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></li>)}</ul>
      </section>

      <section className="a-corridor j-torn-top" id="corridor" aria-labelledby="corridor-heading">
        <div className="a-corridor-photos" aria-hidden="true">
          <div data-frame><Image src="/images/journey/dubai.webp" alt="" fill sizes="50vw" /></div>
          <div data-frame><Image src="/images/kenya.jpg" alt="" fill sizes="50vw" /></div>
        </div>
        <div className="a-corridor-shade" />
        <div className="j-shell a-corridor-content">
          <div className="a-corridor-head">
            <span className="j-eyebrow s-eyebrow">03 / Two regions. One travel network.</span>
            <h2 id="corridor-heading" className="s-title">UAE <span className="a-arrows" aria-label="to and from">↔</span> Africa</h2>
          </div>
          <div className="a-corridor-grid">
            {corridor.map((side, i) => <article key={side.from} className={`a-side${i ? " a-side-right" : ""}`} data-enter>
              <span className="j-eyebrow">{side.from}</span>
              <h3>{side.into}</h3>
              <ul data-draw-group>{side.items.map(item => <li key={item} className="s-draw"><TravelIcon kind="check" size={16} />{item}</li>)}</ul>
              <EnquiryButton className="j-button j-button-olive" service="Africa travel">{side.route[0]} <span aria-hidden="true">→</span> {side.route[1]}</EnquiryButton>
            </article>)}
            <div className="a-hub" aria-hidden="true">
              <span className="a-hub-line"><span className="a-hub-plane"><TravelIcon kind="plane" size={18} /></span></span>
              <div className="a-hub-badge"><span className="a-hub-mark">W</span><span>Wings &amp; Wheels</span></div>
              <p>Coordinating both sides of the journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="a-business j-torn-top" id="business" aria-labelledby="business-heading">
        <div className="j-shell a-business-grid">
          <div className="a-business-photo" data-frame><Image src="/images/corporate.png" alt="A business traveller checking his phone in an airport terminal" fill sizes="(max-width: 991px) 100vw, 42vw" /></div>
          <div className="a-business-copy">
            <span className="j-eyebrow s-eyebrow">04 / Business across borders</span>
            <h2 id="business-heading" className="s-title a-title-md">When business moves across Africa, travel has to move with it.</h2>
            <p className="s-lead-body a-body">From executives travelling between Dubai and Nairobi to project teams moving across regional markets, W&amp;W can coordinate business journeys across multiple locations.</p>
            <EnquiryButton className="j-button j-button-olive" service="Corporate travel">Explore corporate travel</EnquiryButton>
            <ul className="a-business-list" data-stagger>{business.map(item => <li key={item.title}>
              <span className="a-icon"><TravelIcon kind={item.icon} size={22} /></span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </li>)}</ul>
          </div>
        </div>
      </section>

      <section className="a-destinations j-torn-top" id="destinations" aria-labelledby="destinations-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">05 / Experience Africa</span><h2 id="destinations-heading" className="s-title">And then there&apos;s<br />the Africa you came<br />to experience.</h2></div>
            <p className="s-lead">Wide horizons, wild places and warm coasts, planned with the same care as every other part of the journey.</p>
          </div>
          <div className="a-destination-grid">
            {destinations.map(place => <article key={place.name} className="a-destination">
              <div className="a-destination-photo" data-frame><Image src={place.photo} alt={place.alt} fill sizes="(max-width: 600px) 92vw, (max-width: 1100px) 46vw, 24vw" style={{ objectPosition: place.position }} /></div>
              <div className="a-destination-shade" />
              <div className="a-destination-copy">
                <h3>{place.name}</h3>
                <p>{place.line}</p>
                <EnquiryButton className="a-destination-link" service="Africa travel" destination={place.name}>Explore {place.name}</EnquiryButton>
              </div>
            </article>)}
            <aside className="a-more" data-enter>
              <span className="j-eyebrow">More African destinations</span>
              <ul data-draw-group>{more.map(place => <li key={place} className="s-draw">{place}</li>)}<li className="s-draw">And more…</li></ul>
              <Link className="j-text-link" href="/destinations">View all destinations <Arrow /></Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="a-multi j-torn-top" id="multi" aria-labelledby="multi-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>06 / One trip. More than one Africa.</span><span>Flights · Accommodation · Transfers · Experiences</span></div>
          <div className="s-split-head">
            <h2 id="multi-heading" className="s-title">Why stop at<br />one destination?</h2>
            <div>
              <p className="s-lead">Flights, accommodation, transfers and experiences can be coordinated into one multi-destination itinerary.</p>
              <EnquiryButton className="j-button j-button-olive a-multi-cta" service="Africa travel">Build an Africa journey</EnquiryButton>
            </div>
          </div>
          <div className="s-route a-route">
            <div className="s-route-track" aria-hidden="true"><span className="s-route-fill" /><span className="s-route-plane"><TravelIcon kind="plane" size={20} /></span></div>
            <ol className="s-stops">{itinerary.map((stop, i) => <li key={`${stop.name}-${i}`} className="s-stop">
              <span className="s-stop-icon a-stop-photo"><Image src={stop.photo} alt="" fill sizes="160px" style={stop.position ? { objectPosition: stop.position } : undefined} /></span>
              <span className="s-stop-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{stop.name}</h3>
              <p>{stop.role}</p>
            </li>)}</ol>
          </div>
        </div>
      </section>

      <section className="s-final j-torn-top" aria-labelledby="final-heading">
        <Image className="j-photo s-final-photo" src="/images/about/globe.jpg" alt="" fill sizes="100vw" />
        <div className="s-final-shade" />
        <div className="j-shell s-final-content">
          <span className="j-eyebrow">UAE ↔ Africa ↔ Worldwide</span>
          <h2 id="final-heading">Different countries.<br />One connected journey.</h2>
          <p className="s-lead-body">Whether you&apos;re travelling for business, bringing a team to Dubai, discovering Africa or continuing somewhere beyond, Wings &amp; Wheels helps connect what happens in between.</p>
          <div className="s-actions">
            <EnquiryButton className="j-button j-button-cream" service="Africa travel">Start your journey</EnquiryButton>
            <a className="j-button j-button-outline-light" href={office.whatsapp} target="_blank" rel="noreferrer"><TravelIcon kind="chat" size={16} />WhatsApp our team</a>
          </div>
        </div>
      </section>
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
