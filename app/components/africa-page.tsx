import Image from "./travel-image";
import Link from "next/link";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { NetworkMap } from "./network-map";
import { ChapterMotion } from "./chapter-motion";
import { AfricaCorridor } from "./africa-corridor";
import { AfricaEnquiry } from "./africa-enquiry";
import { office } from "./data";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./africa.css";
import "./africa-updates.css";

const reasons = [
  { title: "Business", text: "Meetings, projects and regional travel.", photo: "/images/library/business-terminal-v2.webp", alt: "Business travellers walking through a bright airport terminal", position: "center" },
  { title: "Safari", text: "Wildlife and extraordinary landscapes.", photo: "/images/library/south-africa-safari.webp", alt: "Safari guests watching lions from an open vehicle in South Africa", position: "center" },
  { title: "Family", text: "Holidays and journeys together.", photo: "/images/library/zanzibar.webp", alt: "A traditional dhow sailing off a palm-lined white sand beach in Zanzibar", position: "center" },
  { title: "Groups & MICE", text: "Conferences, exhibitions and delegations.", photo: "/images/library/conference.webp", alt: "Delegates attending an international conference in a modern hotel ballroom", position: "center" },
];

const pillars = [
  { icon: "pin", title: "UAE", text: "Middle East coordination." },
  { icon: "people", title: "East Africa", text: "Regional expertise." },
  { icon: "globe", title: "Worldwide", text: "International travel support." },
] as const;

const business: { icon: IconKind; title: string; text: string }[] = [
  { icon: "briefcase", title: "Executive travel", text: "Individual business journeys requiring careful coordination." },
  { icon: "route", title: "Project & rotational", text: "Teams moving regularly between locations." },
  { icon: "nodes", title: "Regional business", text: "Multi-city journeys across African markets." },
  { icon: "people", title: "UAE business travel", text: "Travel for African delegations and companies visiting the UAE." },
];

const destinations = [
  { name: "Kenya", line: "Safari. City. Coast.", photo: "/images/library/nairobi-city.webp", alt: "Nairobi city centre and the Kenyatta International Convention Centre above the green urban canopy", position: "center" },
  { name: "Tanzania", line: "Serengeti. Zanzibar. Kilimanjaro.", photo: "/images/library/tanzania-kilimanjaro.webp", alt: "A safari landscape beneath Mount Kilimanjaro in Tanzania", position: "center" },
  { name: "Uganda", line: "Wildlife. Nature. Adventure.", photo: "/images/library/uganda-gorilla.webp", alt: "A mountain gorilla in a green Ugandan forest landscape", position: "center" },
];
const more = ["Rwanda", "Ethiopia", "Mauritius", "Seychelles", "South Africa"];

const itinerary = [
  { name: "Dubai", role: "International hub", photo: "/images/library/dubai-panorama.webp" },
  { name: "Nairobi", role: "City", photo: "/images/library/nairobi-city.webp", position: "center" },
  { name: "Maasai Mara", role: "Safari", photo: "/images/library/kenya-game-drive.webp", position: "center" },
  { name: "Zanzibar", role: "Beach", photo: "/images/library/zanzibar.webp" },
  { name: "Dubai", role: "Home", photo: "/images/library/dubai-clouds.webp", position: "center" },
];

const dubaiReasons = ["Business", "Exhibitions", "Holidays", "Groups", "Onward international travel"];
const delegateOrigins = ["Nairobi", "Kampala", "Juba", "Khartoum", "Tanzania"];
const delegateServices: { icon: IconKind; label: string }[] = [
  { icon: "plane", label: "Group flights" }, { icon: "document", label: "Visa assistance" }, { icon: "bed", label: "Hotels" },
  { icon: "car", label: "Airport transfers" }, { icon: "route", label: "Venue transportation" }, { icon: "people", label: "Delegate travel" }, { icon: "support", label: "Changes & support" },
];
const journeys = [
  { title: "Business across borders", photo: "/images/library/business-conversation.webp", stops: [{ from: "Dubai", to: "Nairobi", why: "Executive meeting" }, { from: "Nairobi", to: "Kampala", why: "Regional visit" }, { from: "Kampala", to: "Dubai", why: "Return" }] },
  { title: "The event. Then the next meeting.", photo: "/images/library/exhibition.webp", stops: [{ from: "Nairobi", to: "Dubai", why: "Exhibition" }, { from: "Dubai", to: "London", why: "Client meeting" }, { from: "London", to: "Nairobi", why: "Home" }] },
  { title: "City. Safari. Coast.", photo: "/images/library/kenya-game-drive.webp", stops: [{ from: "Dubai", to: "Nairobi", why: "Arrival" }, { from: "Nairobi", to: "Maasai Mara", why: "Safari" }, { from: "Maasai Mara", to: "Diani", why: "Beach" }, { from: "Diani", to: "Dubai", why: "Home" }] },
];
const africaPurposes = [
  { title: "Business", text: "Meetings, projects and regional travel.", photo: "/images/library/business-terminal-v2.webp", href: "/corporate-travel", link: "Corporate travel" },
  { title: "Safari", text: "Wildlife and extraordinary landscapes.", photo: "/images/library/south-africa-safari.webp", href: "/destinations/kenya", link: "Discover Kenya" },
  { title: "Family", text: "Visits, holidays and journeys together.", photo: "/images/library/family-lake.webp", href: "/destinations", link: "Find your destination" },
  { title: "Groups", text: "Organised travel across multiple travellers.", photo: "/images/library/travel-support-v2.webp", href: "/groups-mice", link: "Plan group travel" },
  { title: "MICE", text: "Meetings, incentives, conferences and exhibitions.", photo: "/images/library/conference.webp", href: "/groups-mice", link: "Explore Groups & MICE" },
  { title: "Coast & islands", text: "Indian Ocean escapes and extensions.", photo: "/images/library/zanzibar.webp", href: "/destinations/tanzania", link: "Discover Tanzania & Zanzibar" },
];
const supportServices: { icon: IconKind; title: string; text: string }[] = [
  { icon: "plane", title: "Flights", text: "Regional and international arrangements." },
  { icon: "bed", title: "Hotels", text: "Business and leisure accommodation." },
  { icon: "document", title: "Visas", text: "Documentation assistance where applicable." },
  { icon: "car", title: "Transfers", text: "Airport and ground movements." },
  { icon: "compass", title: "Experiences", text: "Safari, leisure and destination arrangements." },
  { icon: "support", title: "Support", text: "Assistance when travel plans change." },
];

export default function AfricaPage() {
  return <ChapterMotion className="africa-page">
    <a className="skip-link" href="#connections">Skip to content</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="connections" />
    <main>
      <section className="j-hero s-hero" id="top" aria-labelledby="africa-hero-heading">
        <video className="j-photo j-hero-photo" src="/hero.mp4" poster="/images/journey/hero.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow" data-hero>Africa</span>
            <h1 id="africa-hero-heading"><span className="s-line"><span data-hero>Africa is</span></span><span className="s-line"><span data-hero>closer than</span></span><span className="s-line"><span data-hero>you think.</span></span></h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" data-hero />
            <p data-hero>Business trips, safaris and holidays, connecting travellers between the UAE, Africa and beyond.</p>
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
            <h2 id="network-heading" className="s-title s-rows"><span>Local</span><span>connections.</span><span>International reach.</span></h2>
            <p className="s-lead-body">With offices and partners across key African markets, W&amp;W provides on-ground support, regional expertise and seamless coordination between the UAE, Africa and worldwide.</p>
            <Link className="j-button j-button-outline" href="/contact">Our Africa offices <Arrow /></Link>
          </div>
          <div className="s-network-map"><NetworkMap /></div>
        </div>
        <ul className="j-shell j-pillars">{pillars.map(pillar => <li key={pillar.title}><TravelIcon kind={pillar.icon} size={35} /><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></li>)}</ul>
      </section>

      <section className="a-corridor j-torn-top" id="corridor" aria-labelledby="corridor-heading">
        <div className="j-shell a-corridor-content">
          <div className="a-corridor-head">
            <span className="j-eyebrow s-eyebrow">03 / Two regions. One travel network.</span>
            <h2 id="corridor-heading" className="s-title">UAE <span className="a-arrows" aria-label="to and from">↔</span> Africa</h2>
          </div>
          <AfricaCorridor />
        </div>
      </section>

      <section className="a-business j-torn-top" id="business" aria-labelledby="business-heading">
        <div className="j-shell a-business-grid">
          <div className="a-business-photo" data-frame><Image src="/images/library/executive-lounge.webp" alt="A traveller waiting in a quiet airport lounge overlooking the city" fill sizes="(max-width: 991px) 100vw, 42vw" /></div>
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

      <section className="a-arrival j-torn-top" id="dubai-arrival" aria-labelledby="arrival-heading">
        <div className="j-shell a-arrival-grid">
          <figure className="a-arrival-photo"><Image src="/images/library/airport-transfer.webp" alt="A driver welcoming a business traveller with luggage outside a contemporary airport terminal" fill sizes="(max-width: 900px) 92vw, 48vw" /><figcaption><TravelIcon kind="pin" size={16} />Your Dubai arrival, coordinated.</figcaption></figure>
          <div className="a-arrival-copy">
            <span className="j-eyebrow s-eyebrow">07 / Africa → Dubai</span>
            <span className="a-small-title">Travelling to the UAE</span>
            <h2 id="arrival-heading" className="s-title a-editorial-title">Dubai may be<br />the destination.<br /><em>Or just the beginning.</em></h2>
            <p className="a-body">Wings &amp; Wheels can assist travellers, companies and groups travelling from African markets into Dubai and onward internationally.</p>
            <div className="a-arrival-route" aria-label="From Africa to Dubai, then business, exhibitions, holidays, groups or onward international travel"><span>Africa</span><Arrow /><strong>Dubai</strong><Arrow /></div>
            <ul className="a-arrival-reasons">{dubaiReasons.map(reason => <li key={reason}>{reason}</li>)}</ul>
            <a className="j-button j-button-olive" href="#africa-enquiry">Plan travel to Dubai<Arrow /></a>
          </div>
        </div>
      </section>

      <section className="a-delegates j-torn-top" id="delegate-travel" aria-labelledby="delegates-heading">
        <div className="j-shell">
          <div className="a-section-head"><div><span className="j-eyebrow s-eyebrow">08 / Exhibitions &amp; delegations</span><h2 id="delegates-heading" className="s-title a-editorial-title">Bringing your team<br />to Dubai?</h2></div><div><p className="a-subhead">We&apos;ll help coordinate what happens before the event starts.</p><p className="a-body">For organisations travelling from Africa to exhibitions, conferences and corporate events in the UAE, W&amp;W can coordinate:</p></div></div>
          <div className="a-delegate-grid">
            <div className="a-delegate-plan">
              <span className="a-plan-label">Different departure points. One event.</span>
              <div className="a-delegate-flow"><ul>{delegateOrigins.map(city => <li key={city}><TravelIcon kind="plane" size={16} />{city}</li>)}</ul><svg viewBox="0 0 100 250" preserveAspectRatio="none" aria-hidden="true"><path data-trace pathLength={1} d="M0 25H35V225H0M0 75H35M0 125H94M0 175H35M86 117L94 125L86 133" /></svg><div className="a-delegate-event"><TravelIcon kind="people" size={36} /><strong>Dubai<br />event</strong><span>One coordinated arrival</span></div></div>
              <div className="s-actions"><a className="j-button j-button-cream" href="#africa-enquiry">Plan delegate travel<Arrow /></a><Link className="j-text-link" href="/groups-mice">Explore Groups &amp; MICE<Arrow /></Link></div>
            </div>
            <div className="a-delegate-services"><div className="a-delegate-photo"><Image src="/images/library/exhibition.webp" alt="Visitors meeting at a professional trade exhibition" fill sizes="(max-width: 900px) 92vw, 40vw" /></div><ul>{delegateServices.map(service => <li key={service.label}><TravelIcon kind={service.icon} size={20} />{service.label}</li>)}</ul></div>
          </div>
        </div>
      </section>

      <section className="a-journeys j-torn-top" id="journey-continues" aria-labelledby="journeys-heading">
        <div className="j-shell">
          <span className="j-eyebrow s-eyebrow">09 / People don&apos;t always travel one way</span><h2 id="journeys-heading" className="s-title a-editorial-title">The journey continues.</h2>
          <div className="a-journey-grid">{journeys.map((journey, i) => <article className="a-journey-card" key={journey.title}>
            <div className="a-journey-photo"><Image src={journey.photo} alt="" fill sizes="(max-width: 700px) 92vw, 30vw" /><span>0{i + 1} / Journey example</span></div>
            <div className="a-journey-copy"><h3>{journey.title}</h3><ol>{journey.stops.map(stop => <li key={`${stop.from}-${stop.to}`}><div><span>{stop.from}</span><Arrow /><strong>{stop.to}</strong></div><p>{stop.why}</p></li>)}</ol></div>
          </article>)}</div>
          <p className="a-journey-statement">We don&apos;t just book the flight.<br /><span>We help connect the journey.</span></p>
        </div>
      </section>

      <section className="a-purposes j-torn-top" id="travel-purposes" aria-labelledby="purposes-heading">
        <div className="j-shell"><span className="j-eyebrow s-eyebrow">10 / Africa, for different reasons</span><h2 id="purposes-heading" className="s-title a-editorial-title">What brings you to Africa?</h2>
          <div className="a-purpose-grid">{africaPurposes.map((purpose, i) => <Link className="a-purpose-tile" href={purpose.href} key={purpose.title} aria-label={`${purpose.title}: ${purpose.text} ${purpose.link}`}>
            <Image src={purpose.photo} alt="" fill sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 30vw" />
            <span className="a-purpose-number">0{i + 1}</span><div><h3>{purpose.title}</h3><p>{purpose.text}</p><span className="a-purpose-link">{purpose.link}<Arrow /></span></div>
          </Link>)}</div>
        </div>
      </section>

      <section className="a-expertise j-torn-top" id="travel-expertise" aria-labelledby="expertise-heading">
        <div className="j-shell a-expertise-grid">
          <figure className="a-expertise-photo"><Image src="/images/library/corporate-account-manager.webp" alt="A professional travel coordinator reviewing routes, bookings and itineraries across multiple screens, with a phone and notebook on her desk" fill sizes="(max-width: 900px) 92vw, 48vw" /><figcaption>People who bring the details together.</figcaption></figure>
          <div><span className="j-eyebrow s-eyebrow">11 / Behind every cross-border journey</span><h2 id="expertise-heading" className="s-title a-editorial-title">Different countries.<br />Different requirements.<br /><em>One team keeping track.</em></h2><p className="a-body">International and regional journeys can involve different flight arrangements, visa requirements, accommodation, transfers and schedules. Wings &amp; Wheels helps bring those details together before the traveller begins the journey.</p>
            <div className="a-operations-sheet"><header><span>Journey coordination</span><span>Illustrative itinerary</span></header><div className="a-operations-route">Africa<Arrow />Dubai<Arrow />Beyond</div><dl><div><dt><TravelIcon kind="plane" size={18} />Flight schedules</dt><dd>International &amp; regional connections</dd></div><div><dt><TravelIcon kind="document" size={18} />Travel documents</dt><dd>Requirements checked for each stop</dd></div><div><dt><TravelIcon kind="bed" size={18} />Accommodation</dt><dd>Stays aligned with the itinerary</dd></div><div><dt><TravelIcon kind="car" size={18} />Ground transfers</dt><dd>Airport, hotel &amp; onward movements</dd></div></dl></div>
            <p className="a-expertise-statement">There&apos;s expertise behind every booking.</p>
          </div>
        </div>
      </section>

      <section className="a-support j-torn-top" id="africa-support" aria-labelledby="support-heading">
        <div className="j-shell"><div className="a-section-head"><div><span className="j-eyebrow s-eyebrow">12 / Africa travel support</span><h2 id="support-heading" className="s-title a-editorial-title">One journey.<br />One point of contact.</h2></div><a className="j-button j-button-olive" href="#africa-enquiry">Talk to our Africa team<Arrow /></a></div>
          <ol className="a-support-grid">{supportServices.map((service, i) => <li key={service.title}><span className="a-support-icon"><TravelIcon kind={service.icon} size={30} /></span><span className="a-support-index">0{i + 1}</span><h3>{service.title}</h3><p>{service.text}</p>{i < supportServices.length - 1 && <span className="a-support-arrow"><Arrow /></span>}</li>)}</ol>
        </div>
      </section>

      <section className="a-enquiry j-torn-top" id="africa-enquiry" aria-labelledby="enquiry-heading">
        <div className="j-shell a-enquiry-grid"><div className="a-enquiry-intro"><span className="j-eyebrow s-eyebrow">13 / Africa enquiry</span><h2 id="enquiry-heading" className="s-title a-editorial-title">Where does your<br />journey connect?</h2><p className="a-body">From a single trip to a multi-country itinerary, tell us where you need to be. Our Africa team will help bring the journey together.</p><div className="a-enquiry-route"><span>UAE</span><Arrow /><span>Africa</span><Arrow /><span>Worldwide</span></div><a className="j-text-link" href={office.whatsapp} target="_blank" rel="noreferrer"><TravelIcon kind="chat" size={20} />WhatsApp our Africa travel team<Arrow /></a></div><AfricaEnquiry /></div>
      </section>

      <section className="s-final j-torn-top" aria-labelledby="final-heading">
        <Image className="j-photo s-final-photo" src="/images/library/cape-town.webp" alt="" fill sizes="100vw" />
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
