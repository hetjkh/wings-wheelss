import Image from "next/image";
import Link from "next/link";
import { office } from "./data";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";

const heroTags = ["Business", "Leisure", "Groups & MICE", "Worldwide"];

export function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-heading">
    <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster="/videos/dubai-skyline-poster.jpg" aria-hidden="true">
      <source src="/videos/dubai-skyline.mp4" type="video/mp4" />
    </video>
    <div className="hero-shade" />
    <div className="shell hero-inner">
      <div className="hero-copy">
        <span className="ww-kicker">Wings & Wheels · Dubai</span>
        <h1 id="hero-heading">Travel is about places.<span>We&apos;re about people.</span></h1>
      </div>
      <div className="hero-side">
        <p>Business, leisure and group travel across the UAE, Africa and worldwide.</p>
        <div className="hero-actions">
          <Link href="/#story" className="button button-gold ww-button">Our story <Arrow /></Link>
          <EnquiryButton className="button button-outline-light ww-button">Get a quote</EnquiryButton>
        </div>
      </div>
    </div>
    <div className="shell hero-tags">
      <ul aria-label="What we handle">{heroTags.map(t => <li key={t}>{t}</li>)}</ul>
      <a href="#about" className="hero-scroll">Scroll <span aria-hidden="true" /></a>
    </div>
  </section>;
}

const audiences = [
  { title: "Business", text: "Meetings, projects and regional travel.", image: "/images/about/business.jpg", alt: "A business traveller working on a laptop in an airport lounge overlooking Dubai", position: "50% 50%" },
  { title: "Leisure", text: "Holidays and memorable journeys.", image: "/images/about/leisure-sun.jpg", alt: "A traveller in a sun hat relaxing by an infinity pool at sunset", position: "50% 50%" },
  { title: "Groups & MICE", text: "Organised travel across multiple travellers.", image: "/images/groups.png", alt: "A group of colleagues with luggage walking through an airport terminal", position: "50% 50%" },
  { title: "Connections", text: "Between the UAE, Africa and worldwide.", image: "/images/dubai-terrace.png", alt: "The Dubai skyline at sunset seen from a terrace", position: "50% 50%" },
];

export function About() {
  return <section className="ww-who" id="about" aria-labelledby="about-heading">
    <div className="shell ww-who-grid">
      <div className="ww-who-copy" data-reveal>
        <span className="ww-kicker">Who we are</span>
        <h2 id="about-heading" className="ww-title">More than <em>a booking.</em></h2>
        <p>People travel for different reasons. A CEO has a meeting tomorrow. A family has been planning a holiday for months. A company is bringing delegates to an exhibition. A traveller is connecting between Africa, Dubai and somewhere beyond.</p>
        <p>Different journeys. The same need: clear information, good coordination and someone there when it matters.</p>
      </div>
      <ul className="ww-who-cards">
        {audiences.map(a => <li key={a.title} data-reveal>
          <div className="ww-who-photo"><Image src={a.image} alt={a.alt} fill sizes="(max-width: 760px) 50vw, (max-width: 1150px) 25vw, 16vw" style={{ objectPosition: a.position }} /></div>
          <h3>{a.title}</h3>
          <p>{a.text}</p>
        </li>)}
      </ul>
    </div>
  </section>;
}

const journey = [
  { icon: "plane", label: "You tell us where you need to be" },
  { icon: "search", label: "We understand the journey" },
  { icon: "document", label: "We coordinate the details" },
  { icon: "briefcase", label: "You travel" },
  { icon: "support", label: "We stay available" },
] as const;

const coordinate = ["Flights", "Hotels", "Visas", "Transfers", "Groups", "Experiences", "Support"];

export function Services() {
  return <section className="ww-do" id="services" aria-labelledby="services-heading">
    <Image src="/images/about/coast-road.jpg" alt="" fill sizes="100vw" className="ww-bg" />
    <div className="ww-do-shade" />
    <div className="shell ww-do-grid">
      <div className="ww-do-copy" data-reveal>
        <span className="ww-kicker">What we do</span>
        <h2 id="services-heading" className="ww-title is-light">We connect the parts of the journey.</h2>
        <p>The booking is one part.<br />The journey is the whole picture.</p>
      </div>
      <div data-reveal>
        <ol className="ww-steps">
          {journey.map(s => <li key={s.label}><span><TravelIcon kind={s.icon} size={24} /></span>{s.label}</li>)}
        </ol>
        <ul className="ww-coordinate" aria-label="What we coordinate">{coordinate.map(c => <li key={c}>{c}</li>)}</ul>
      </div>
    </div>
  </section>;
}

const storyImages = [
  { src: "/images/tanzania.png", alt: "Sunset over the plains of Tanzania" },
  { src: "/images/about/lounge.jpg", alt: "A suitcase and travel documents on a table in an airport lounge" },
  { src: "/images/airport.png", alt: "Travellers walking through an airport terminal at sunset" },
];

export function Process() {
  return <section className="ww-story" id="story" aria-labelledby="story-heading">
    <div className="ww-story-lead"><Image src="/images/about/story-walk.jpg" alt="A traveller with a suitcase walking through an airport towards the Dubai skyline" fill sizes="(max-width: 900px) 100vw, 30vw" /></div>
    <div className="ww-story-copy" data-reveal>
      <span className="ww-kicker">Our story</span>
      <h2 id="story-heading" className="ww-title">Built around real journeys.</h2>
      <p>Wings & Wheels was built around a simple idea: travel should feel easier to manage. Not because every journey is simple, but because the traveller shouldn&apos;t have to manage every moving part alone.</p>
      <p>Today, Wings & Wheels combines local knowledge, regional connections and international travel capability to support journeys that can begin almost anywhere and continue almost anywhere.</p>
    </div>
    <div className="ww-story-stack">
      {storyImages.map(i => <div key={i.src}><Image src={i.src} alt={i.alt} fill sizes="(max-width: 900px) 33vw, 18vw" /></div>)}
    </div>
    <div className="ww-story-words" data-reveal>
      <ul><li>People</li><li>Places</li><li>Connections</li><li>Opportunities</li></ul>
    </div>
  </section>;
}

const routes = [
  { name: "Khartoum", y: 40 },
  { name: "Juba", y: 95 },
  { name: "Kampala", y: 150 },
  { name: "Nairobi", y: 205 },
  { name: "Tanzania", y: 260 },
];
const dubai = { x: 330, y: 120 };

const pillars = [
  { icon: "pin", title: "UAE base", text: "Regional coordination and international access." },
  { icon: "people", title: "Africa network", text: "Local knowledge and on-ground connections." },
  { icon: "globe", title: "Global reach", text: "International travel planning and coordination." },
] as const;

export function Network() {
  return <section className="ww-network" id="network" aria-labelledby="network-heading">
    <Image src="/images/about/globe.jpg" alt="" fill sizes="100vw" className="ww-bg" />
    <div className="ww-network-shade" />
    <div className="shell ww-network-grid">
      <div className="ww-network-copy" data-reveal>
        <span className="ww-kicker">Our network</span>
        <h2 id="network-heading" className="ww-title is-light">Local where it matters.<br />Connected where you&apos;re going.</h2>
        <p>Wings & Wheels operates from the UAE with a growing network and regional presence across key African markets and international destinations.</p>
        <EnquiryButton className="button button-gold ww-button" service="Africa travel">Explore our Africa network</EnquiryButton>
      </div>
      <svg className="ww-routes" viewBox="0 0 420 300" role="img" aria-label="Routes connecting Dubai with Khartoum, Juba, Kampala, Nairobi and Tanzania" data-reveal>
        {routes.map(r => <path key={r.name} d={`M110,${r.y} C220,${r.y} 240,${dubai.y} ${dubai.x},${dubai.y}`} />)}
        {routes.map(r => <g key={r.name}><text x="94" y={r.y + 4} textAnchor="end">{r.name}</text><circle cx="110" cy={r.y} r="4" /></g>)}
        <circle cx={dubai.x} cy={dubai.y} r="10" className="ww-hub-ring" />
        <circle cx={dubai.x} cy={dubai.y} r="4.5" className="ww-hub" />
        <text x={dubai.x + 16} y={dubai.y + 4}>Dubai</text>
      </svg>
      <ul className="ww-pillars">
        {pillars.map(p => <li key={p.title} data-reveal><span><TravelIcon kind={p.icon} size={26} /></span><div><h3>{p.title}</h3><p>{p.text}</p></div></li>)}
      </ul>
    </div>
  </section>;
}

const values = [
  { icon: "ear", title: "We listen first.", text: "Before recommending flights, hotels or destinations, we understand why you're travelling and what matters to you." },
  { icon: "nodes", title: "We connect the details.", text: "Flights, hotels, visas, transfers and schedules shouldn't operate as separate pieces." },
  { icon: "bulb", title: "We think beyond the booking.", text: "A confirmed ticket isn't the end of our involvement." },
  { icon: "people", title: "We stay human.", text: "Technology makes travel faster. People make travel easier when something doesn't go as expected." },
] as const;

const principles = ["Integrity", "Care", "Partnership", "Responsibility", "Continuous improvement"];

export function Guides() {
  return <section className="ww-guides" aria-labelledby="guides-heading">
    <div className="shell">
      <h2 id="guides-heading" className="ww-title is-small" data-reveal>What guides us.</h2>
      <div className="ww-guides-grid">
        <ul className="ww-values">
          {values.map(v => <li key={v.title} data-reveal><span><TravelIcon kind={v.icon} size={34} /></span><div><h3>{v.title}</h3><p>{v.text}</p></div></li>)}
        </ul>
        <ul className="ww-principles" aria-label="Our principles">{principles.map(p => <li key={p}>{p}</li>)}</ul>
      </div>
    </div>
  </section>;
}

export function Split() {
  return <section className="ww-split" aria-label="Business and leisure travel">
    <div className="ww-split-panel">
      <Image src="/images/about/business-airport.jpg" alt="A business traveller walking through an airport terminal at sunset" fill sizes="(max-width: 900px) 100vw, 40vw" className="ww-bg" />
      <div className="ww-split-copy" data-reveal>
        <h2 className="ww-title is-light is-small">Business when<br />it needs to work.</h2>
        <EnquiryButton className="button button-gold ww-button" service="Corporate travel">Explore corporate travel</EnquiryButton>
      </div>
    </div>
    <div className="ww-split-mid"><p>Same team.<br />Same attention<br />to the journey.</p></div>
    <div className="ww-split-panel">
      <Image src="/images/maldives-villa.png" alt="An overwater villa in the Maldives at sunset" fill sizes="(max-width: 900px) 100vw, 40vw" className="ww-bg" />
      <div className="ww-split-copy" data-reveal>
        <h2 className="ww-title is-light is-small">Leisure when<br />it needs to feel different.</h2>
        <EnquiryButton className="button button-gold ww-button" service="Leisure & holidays">Plan your holiday</EnquiryButton>
      </div>
    </div>
  </section>;
}

const teamFacts = [
  { value: "6", label: "Regional locations" },
  { value: "100+", label: "Travel partners" },
  { value: "Global", label: "Destinations" },
];

export function Team() {
  return <section className="ww-people" id="team" aria-labelledby="team-heading">
    <div className="shell ww-people-grid">
      <div className="ww-people-copy" data-reveal>
        <span className="ww-kicker">The people behind W&W</span>
        <h2 id="team-heading" className="ww-title">Travel is still <em>a people<br />business.</em></h2>
        <p>Behind every Wings & Wheels journey is a team coordinating the details, communicating with travellers and helping keep plans moving.</p>
        <Link href="/contact" className="button button-gold ww-button">Meet our team <Arrow /></Link>
      </div>
      <div className="ww-people-photo" data-reveal><Image src="/images/about/team.jpg" alt="A Wings & Wheels travel consultant planning a trip at her desk" fill sizes="(max-width: 900px) 100vw, 40vw" /></div>
      <div className="ww-people-facts" data-reveal>
        <dl>{teamFacts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
        <p>One team.<br />Multiple markets.</p>
      </div>
    </div>
  </section>;
}

export function ContactBand() {
  return <section className="cta-band" aria-labelledby="cta-heading">
    <div className="shell cta-inner" data-reveal>
      <div>
        <span className="eyebrow">Get in touch</span>
        <h2 id="cta-heading">Planning a trip? Let&apos;s talk.</h2>
        <p>Tell us where and when you need to travel, and we&apos;ll send you options and a quote.</p>
      </div>
      <div className="cta-actions">
        <EnquiryButton className="button button-gold">Request a quote</EnquiryButton>
        <a href={office.phones[0].href} className="button button-outline-light"><TravelIcon kind="support" size={16} />{office.phones[0].label}</a>
      </div>
    </div>
  </section>;
}
