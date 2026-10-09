import Image from "next/image";
import Link from "next/link";
import { office } from "./data";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";

const marquee = ["Flights", "Hotels", "Visas", "Transfers", "Groups & MICE", "Safaris", "Experiences", "24/7 Support"];

function Marquee({ items, light = false }: { items: string[]; light?: boolean }) {
  return <div className={light ? "marquee is-light" : "marquee"}>
    <div className="marquee-track">
      {[0, 1].map(copy => <ul key={copy} aria-hidden={copy === 1}>{items.map(item => <li key={item}>{item}</li>)}</ul>)}
    </div>
  </div>;
}

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
      <div className="hero-card">
        <p>Business, leisure and group travel across the UAE, Africa and worldwide.</p>
        <div className="hero-actions">
          <Link href="/#story" className="button button-gold ww-button">Our story <Arrow /></Link>
          <EnquiryButton className="button button-outline-light ww-button">Get a quote</EnquiryButton>
        </div>
        <dl className="hero-stats">
          <div><dt>Since</dt><dd>2013</dd></div>
          <div><dt>Locations</dt><dd>6</dd></div>
          <div><dt>Partners</dt><dd>100+</dd></div>
        </dl>
      </div>
    </div>
    <Marquee items={marquee} light />
  </section>;
}

const audiences = [
  { title: "Business", text: "Meetings, projects and regional travel.", image: "/images/about/business.jpg", alt: "A business traveller working on a laptop in an airport lounge overlooking Dubai" },
  { title: "Leisure", text: "Holidays and memorable journeys.", image: "/images/about/leisure-sun.jpg", alt: "A traveller in a sun hat relaxing by an infinity pool at sunset" },
  { title: "Groups & MICE", text: "Organised travel across multiple travellers.", image: "/images/groups.png", alt: "A group of colleagues with luggage walking through an airport terminal" },
  { title: "Connections", text: "Between the UAE, Africa and worldwide.", image: "/images/dubai-terrace.png", alt: "The Dubai skyline at sunset seen from a terrace" },
];

function SectionMark({ index, label }: { index: string; label: string }) {
  return <span className="ww-mark"><b>{index}</b>{label}</span>;
}

export function About() {
  return <section className="ww-who" id="about" aria-labelledby="about-heading">
    <div className="shell ww-who-grid">
      <div className="ww-who-copy" data-reveal>
        <SectionMark index="01" label="Who we are" />
        <h2 id="about-heading" className="ww-title">More than <em>a booking.</em></h2>
        <p>People travel for different reasons. A CEO has a meeting tomorrow. A family has been planning a holiday for months. A company is bringing delegates to an exhibition. A traveller is connecting between Africa, Dubai and somewhere beyond.</p>
        <blockquote>Different journeys. The same need: clear information, good coordination and someone there when it matters.</blockquote>
      </div>
      <ul className="ww-bento">
        {audiences.map((a, i) => <li key={a.title} data-reveal>
          <Image src={a.image} alt={a.alt} fill sizes={i === 0 ? "(max-width: 760px) 100vw, 34vw" : "(max-width: 760px) 100vw, 20vw"} />
          <div className="ww-bento-text">
            <span>0{i + 1}</span>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </div>
        </li>)}
      </ul>
    </div>
  </section>;
}

const journey = [
  { icon: "plane", title: "You tell us", text: "Where you need to be, and why." },
  { icon: "search", title: "We understand", text: "The timing, budget and priorities." },
  { icon: "document", title: "We coordinate", text: "Flights, hotels, visas and transfers." },
  { icon: "briefcase", title: "You travel", text: "With everything ready on arrival." },
  { icon: "support", title: "We stay available", text: "A real person if plans change." },
] as const;

export function Services() {
  return <section className="ww-do" id="services" aria-labelledby="services-heading">
    <Image src="/images/about/coast-road.jpg" alt="" fill sizes="100vw" className="ww-bg" />
    <div className="ww-do-shade" />
    <div className="shell ww-do-inner">
      <div className="ww-do-head" data-reveal>
        <div>
          <SectionMark index="02" label="What we do" />
          <h2 id="services-heading" className="ww-title is-light">We connect the parts<br />of the journey.</h2>
        </div>
        <p>The booking is one part.<br />The journey is the whole picture.</p>
      </div>
      <ol className="ww-steps">
        {journey.map((s, i) => <li key={s.title} data-reveal>
          <span className="ww-step-num">0{i + 1}</span>
          <span className="ww-step-icon"><TravelIcon kind={s.icon} size={24} /></span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}

export function Process() {
  return <section className="ww-story" id="story" aria-labelledby="story-heading">
    <div className="shell ww-story-grid">
      <div className="ww-collage" data-reveal>
        <div className="ww-collage-main"><Image src="/images/about/story-walk.jpg" alt="A traveller with a suitcase walking through an airport towards the Dubai skyline" fill sizes="(max-width: 900px) 90vw, 36vw" /></div>
        <div className="ww-collage-small"><Image src="/images/tanzania.png" alt="Sunset over the plains of Tanzania" fill sizes="(max-width: 900px) 50vw, 18vw" /></div>
        <svg className="ww-badge" viewBox="0 0 120 120" aria-hidden="true">
          <defs><path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
          <text><textPath href="#badge-circle">Wings & Wheels · Since 2013 · Dubai ·</textPath></text>
        </svg>
        <span className="ww-badge-core"><TravelIcon kind="plane" size={22} /></span>
      </div>
      <div className="ww-story-copy" data-reveal>
        <SectionMark index="03" label="Our story" />
        <h2 id="story-heading" className="ww-title">Built around <em>real journeys.</em></h2>
        <p>Wings & Wheels was built around a simple idea: travel should feel easier to manage. Not because every journey is simple, but because the traveller shouldn&apos;t have to manage every moving part alone.</p>
        <p>Today, we combine local knowledge, regional connections and international travel capability to support journeys that can begin almost anywhere and continue almost anywhere.</p>
        <ul className="ww-words" aria-label="What we connect"><li>People</li><li>Places</li><li>Connections</li><li>Opportunities</li></ul>
      </div>
    </div>
  </section>;
}

const routes = [
  { name: "Khartoum", y: 40 },
  { name: "Juba", y: 100 },
  { name: "Kampala", y: 160 },
  { name: "Nairobi", y: 220 },
  { name: "Tanzania", y: 280 },
];
const dubai = { x: 400, y: 150 };
const routePath = (y: number) => `M120,${y} C250,${y} 280,${dubai.y} ${dubai.x},${dubai.y}`;

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
        <SectionMark index="04" label="Our network" />
        <h2 id="network-heading" className="ww-title is-light">Local where it matters.<em>Connected where you&apos;re going.</em></h2>
        <p>Wings & Wheels operates from the UAE with a growing network and regional presence across key African markets and international destinations.</p>
        <EnquiryButton className="button button-gold ww-button" service="Africa travel">Explore our Africa network</EnquiryButton>
      </div>
      <div className="ww-map" data-reveal>
        <svg className="ww-routes" viewBox="0 0 480 320" role="img" aria-label="Routes connecting Dubai with Khartoum, Juba, Kampala, Nairobi and Tanzania">
          {routes.map(r => <path key={r.name} d={routePath(r.y)} />)}
          {routes.map((r, i) => <circle key={`p-${r.name}`} r="3" className="ww-pulse"><animateMotion dur="2.8s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={routePath(r.y)} /></circle>)}
          {routes.map(r => <g key={r.name}><text x="104" y={r.y + 4} textAnchor="end">{r.name}</text><circle cx="120" cy={r.y} r="4" /></g>)}
          <circle cx={dubai.x} cy={dubai.y} r="16" className="ww-hub-ring" />
          <circle cx={dubai.x} cy={dubai.y} r="6" className="ww-hub" />
          <text x={dubai.x} y={dubai.y + 36} textAnchor="middle" className="ww-hub-label">Dubai</text>
        </svg>
      </div>
    </div>
    <ul className="shell ww-pillars">
      {pillars.map(p => <li key={p.title} data-reveal><span><TravelIcon kind={p.icon} size={24} /></span><div><h3>{p.title}</h3><p>{p.text}</p></div></li>)}
    </ul>
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
    <div className="shell ww-guides-grid">
      <div className="ww-guides-head" data-reveal>
        <SectionMark index="05" label="Our values" />
        <h2 id="guides-heading" className="ww-title">What<br />guides us.</h2>
        <ul className="ww-principles" aria-label="Our principles">{principles.map(p => <li key={p}>{p}</li>)}</ul>
      </div>
      <ul className="ww-values">
        {values.map((v, i) => <li key={v.title} data-reveal>
          <div className="ww-value-top"><span className="ww-value-icon"><TravelIcon kind={v.icon} size={26} /></span><span className="ww-value-num">0{i + 1}</span></div>
          <h3>{v.title}</h3>
          <p>{v.text}</p>
        </li>)}
      </ul>
    </div>
  </section>;
}

export function Split() {
  return <section className="ww-split" aria-label="Business and leisure travel">
    <div className="ww-split-panel">
      <Image src="/images/about/business-airport.jpg" alt="A business traveller walking through an airport terminal at sunset" fill sizes="(max-width: 900px) 100vw, 60vw" className="ww-bg" />
      <div className="ww-split-copy">
        <span className="ww-kicker">Corporate</span>
        <h2 className="ww-title is-light is-small">Business when<br />it needs to work.</h2>
        <EnquiryButton className="button button-gold ww-button" service="Corporate travel">Explore corporate travel</EnquiryButton>
      </div>
    </div>
    <div className="ww-split-panel">
      <Image src="/images/maldives-villa.png" alt="An overwater villa in the Maldives at sunset" fill sizes="(max-width: 900px) 100vw, 60vw" className="ww-bg" />
      <div className="ww-split-copy">
        <span className="ww-kicker">Leisure</span>
        <h2 className="ww-title is-light is-small">Leisure when it<br />needs to feel different.</h2>
        <EnquiryButton className="button button-gold ww-button" service="Leisure & holidays">Plan your holiday</EnquiryButton>
      </div>
    </div>
    <p className="ww-split-badge">Same team.<br />Same attention<br />to the journey.</p>
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
        <SectionMark index="06" label="The people behind W&W" />
        <h2 id="team-heading" className="ww-title">Travel is still <em>a people<br />business.</em></h2>
        <p>Behind every Wings & Wheels journey is a team coordinating the details, communicating with travellers and helping keep plans moving.</p>
        <Link href="/contact" className="button button-dark ww-button">Meet our team <Arrow /></Link>
      </div>
      <div className="ww-people-media" data-reveal>
        <div className="ww-people-photo"><Image src="/images/about/team.jpg" alt="A Wings & Wheels travel consultant planning a trip at her desk" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <div className="ww-people-card">
          <dl>{teamFacts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
          <p>One team. Multiple markets.</p>
        </div>
      </div>
    </div>
  </section>;
}

export function ContactBand() {
  return <section className="cta-band" aria-labelledby="cta-heading">
    <Image src="/images/dubai-terrace.png" alt="" fill sizes="100vw" className="ww-bg" />
    <div className="cta-shade" />
    <div className="shell cta-inner" data-reveal>
      <span className="ww-kicker">Get in touch</span>
      <h2 id="cta-heading" className="ww-title is-light">Planning a trip?<em>Let&apos;s talk.</em></h2>
      <p>Tell us where and when you need to travel, and we&apos;ll send you options and a quote.</p>
      <div className="cta-actions">
        <EnquiryButton className="button button-gold ww-button">Request a quote</EnquiryButton>
        <a href={office.phones[0].href} className="button button-outline-light ww-button"><TravelIcon kind="support" size={16} />{office.phones[0].label}</a>
      </div>
    </div>
  </section>;
}
