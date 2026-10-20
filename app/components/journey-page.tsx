import { faqs } from "./faqs";
import Image from "./travel-image";
import Link from "next/link";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyMotion } from "./journey-motion";
import { JourneyFooter } from "./journey-footer";
import { AboutJourneyProcess } from "./about-journey-process";
import "./journey.css";
import "./journey-explorer.css";
import "./about-sections.css";

const image = (name: string) => name === "hero" ? "/images/journey/hero.webp" : `/images/library/${name}.webp`;
const audiences = [
  { id: "business", title: "Business", text: "Meetings, projects and regional travel.", photo: "corporate-preferred-rates", alt: "A business traveller working in an airport lounge overlooking Dubai", service: "Corporate travel" },
  { id: "leisure", title: "Leisure", text: "Holidays and memorable journeys.", photo: "zanzibar", alt: "Palm-lined white sand and turquoise water in Zanzibar", service: "Leisure & holidays" },
  { id: "groups", title: "Groups & MICE", text: "Organised travel across multiple travellers.", photo: "conference", alt: "Delegates gathering for a conference in a modern hotel ballroom", service: "Groups & MICE" },
  { id: "connections", title: "Connections", text: "Between the UAE, Africa and worldwide.", photo: "dubai-panorama", alt: "Dubai skyline and the Burj Khalifa in clear daylight", service: "Africa travel" },
];
const routePath = "M0 90 C 100 90, 120 40, 200 40 C 330 40, 470 90, 600 90 C 730 90, 870 40, 1000 40 C 1080 40, 1120 70, 1200 70";
const stops = [
  { x: 200, y: 40, title: "UAE base", lead: "Where we start", text: "Regional coordination with international access.", place: "Dubai", photo: image("dubai-marina"), alt: "Modern towers and waterfront buildings at Dubai Marina" },
  { x: 600, y: 90, title: "Africa network", lead: "Where we know the ground", text: "Local knowledge and on-ground connections in Sudan, South Sudan, Uganda, Kenya and Tanzania.", place: "East Africa", photo: image("africa-dawn"), alt: "An elephant crossing golden Kenyan grasslands beneath an acacia tree" },
  { x: 1000, y: 40, title: "Global reach", lead: "Wherever you're going", text: "International travel planning and coordination.", place: "Worldwide", photo: image("fuji-blossoms"), alt: "Cherry blossoms and a red pagoda with Mount Fuji in the distance" },
];
const heart = [
  { word: "People", photo: "business-conversation" },
  { word: "Places", photo: "venice" },
  { word: "Connections", photo: "auckland" },
  { word: "Opportunities", photo: "business-terminal-v2" },
];
const values = [
  { icon: "ear", title: "We listen first.", text: "We begin by understanding why you’re travelling and what matters most." },
  { icon: "nodes", title: "We connect the details.", text: "Flights, hotels, visas, transfers and schedules should work together, not separately." },
  { icon: "leaf", title: "We think beyond the booking.", text: "A confirmed reservation is only the beginning of our support." },
  { icon: "people", title: "We stay human.", text: "Technology makes travel faster, but people make travel better." },
] as const;

export default function JourneyPage() {
  return <JourneyMotion>
    <a className="skip-link" href="#about">Skip to content</a>
    <JourneyHeader />
    <main>
      <section className="j-hero ab-hero" id="top" aria-labelledby="journey-heading">
        <Image className="j-photo j-hero-photo" src="/images/about/people-and-journeys.webp" alt="Travel consultants working together around a table to plan a journey" fill sizes="100vw" quality={90} preload />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow">About Wings &amp; Wheels</span>
            <h1 id="journey-heading"><span>Travel is about</span>{" "}<span>places.</span>{" "}<span>We&apos;re about</span>{" "}<span><em>the people</em></span>{" "}<span>moving between them.</span></h1>
          </div>
          <div className="j-hero-aside">
            <p>Wings &amp; Wheels is a travel management company connecting individuals, businesses and groups across the UAE, Africa and worldwide.</p>
            <a className="j-button j-button-cream" href="#about">Discover our story <Arrow /></a>
            <ul className="ab-hero-tags" aria-label="Our travel services">{["Business", "Leisure", "Groups", "MICE", "International travel"].map(label => <li key={label}>{label}</li>)}</ul>
          </div>
        </div>
        <a href="#about" className="j-scroll-note">Who we are <span>↓</span></a>
      </section>

      <section className="j-intro ab-intro j-paper j-torn-top" id="about" aria-labelledby="intro-heading" data-static-intro>
        <div className="j-shell ab-intro-grid">
          <div className="j-travel-heading ab-intro-copy">
            <span className="j-eyebrow">Who we are</span>
            <h2 id="intro-heading">More than<br /><em>a booking.</em></h2>
            <p>People travel for different reasons. A CEO has a meeting tomorrow. A family has been planning a holiday for months. A company is bringing delegates to an exhibition. A traveller is connecting between Africa, Dubai and somewhere beyond.</p>
            <p>Different journeys. The same need — clear information, good coordination and someone there when it matters.</p>
          </div>
          <div className="j-journey-window">
            <div className="j-journey-track">
              {audiences.map((item, i) => <article key={item.id} id={`journey-${item.id}`} className="j-journey-card" aria-labelledby={`journey-${item.id}-heading`}>
                <div className="j-journey-image"><Image src={image(item.photo)} alt={item.alt} fill sizes="(max-width: 600px) 65vw, (max-width: 991px) 35vw, 15vw" /><span className="j-journey-number" aria-hidden="true">{i + 1}</span></div>
                <div className="j-journey-copy"><h3 id={`journey-${item.id}-heading`}>{item.title}</h3><p>{item.text}</p><EnquiryButton className="j-journey-enquiry" service={item.service}>Explore {item.title}</EnquiryButton></div>
              </article>)}
            </div>
          </div>
        </div>
      </section>

      <AboutJourneyProcess />

      <section className="j-story j-paper ab-story" id="story" aria-labelledby="story-heading">
        <div className="j-shell">
          <div className="j-section-label"><span>02 / A little about us</span><span>Rooted in Dubai. Connected to the world.</span></div>
          <div className="ab-story-head">
            <div>
              <span className="j-eyebrow">The people behind the journey</span>
              <h2 id="story-heading" className="ab-story-title">
                <span>Built <span className="ab-pill" aria-hidden="true"><Image src={image("travel-planning-v2")} alt="" fill sizes="200px" /></span> around</span>
                <span><em>Real</em> <span className="ab-pill ab-pill-wide" aria-hidden="true"><Image src={image("mountain-hiker")} alt="" fill sizes="240px" /></span> <em>journeys.</em></span>
              </h2>
            </div>
            <div className="ab-stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120"><defs><path id="ab-stamp-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs><text><textPath href="#ab-stamp-ring">Personally planned · Human at heart · </textPath></text></svg>
              <TravelIcon kind="plane" size={26} />
            </div>
          </div>
          <div className="ab-story-body">
            <p className="ab-story-quote">The world is full of moving parts. <span>Your journey shouldn&apos;t feel that way.</span></p>
            <div className="j-story-copy ab-story-copy">
              <p>Wings &amp; Wheels began with a simple belief: travel should feel easier to manage. That starts with listening, understanding your plans and taking care of the details that connect them.</p>
              <p>Today, we bring local knowledge, regional connections and international capability to journeys that can begin almost anywhere. And wherever you&apos;re going, there&apos;s a real person with you along the way.</p>
              <Link href="/contact" className="j-story-link">Start a conversation with us <span><Arrow diagonal /></span></Link>
            </div>
          </div>
        </div>
        <div className="ab-ticker">
          <span className="j-shell ab-ticker-label">At the heart of it all</span>
          <p className="j-sr-only">People, places, connections and opportunities.</p>
          <div className="ab-ticker-window" aria-hidden="true">
            <div className="ab-ticker-track">{[0, 1].map(copy => <div key={copy} className="ab-ticker-set">{heart.map(item => <span key={item.word} className="ab-ticker-item"><span className="ab-ticker-photo"><Image src={image(item.photo)} alt="" fill sizes="80px" /></span>{item.word}</span>)}</div>)}</div>
          </div>
        </div>
      </section>

      <section className="j-network ab-net j-torn-top" id="network" aria-labelledby="network-heading">
        <div className="j-shell">
          <div className="ab-net-top">
            <span className="j-eyebrow">03 / Our network</span>
            <p>Based in the UAE, with a growing network across key African markets and destinations worldwide.</p>
          </div>
          <h2 id="network-heading" className="ab-net-title">
            <span className="ab-net-row"><span className="ab-net-big">Local</span><span className="ab-net-small">where it<br />matters.</span></span>
            <span className="ab-net-row ab-net-row-2"><span className="ab-net-big">Connected</span><span className="ab-net-small">where you&apos;re<br />going.</span></span>
          </h2>
          <div className="ab-route">
            <svg className="ab-route-line" viewBox="0 0 1200 120" aria-hidden="true">
              <path className="ab-route-track" d={routePath} />
              <path className="ab-route-drawn" d={routePath} pathLength={1} />
              {stops.map(stop => <circle key={stop.title} className="ab-route-stop" cx={stop.x} cy={stop.y} r="7" />)}
              <g className="ab-route-plane" transform="translate(1200 70)"><g transform="translate(-13 -13)"><TravelIcon kind="plane" size={26} /></g></g>
            </svg>
            <ol className="ab-stops">{stops.map((stop, i) => <li key={stop.title} className="ab-stop" style={{ "--y": stop.y, "--tilt": `${i % 2 ? 2.5 : -2.5}deg` } as React.CSSProperties}>
              <figure className="ab-stop-photo"><div><Image src={stop.photo} alt={stop.alt} fill sizes="(max-width: 800px) 70vw, 20vw" /></div><figcaption>{stop.place}</figcaption></figure>
              <span className="ab-stop-step">0{i + 1} · {stop.lead}</span>
              <h3>{stop.title}</h3>
              <p>{stop.text}</p>
            </li>)}</ol>
          </div>
          <div className="ab-net-cta"><EnquiryButton className="j-button j-button-olive" service="Africa travel">Explore Our Africa Network</EnquiryButton></div>
        </div>
      </section>

      <section className="j-values j-paper j-torn-top" aria-labelledby="values-heading">
        <div className="j-shell">
          <h2 id="values-heading">Principles<br />that guide us</h2>
          <div className="j-principles-scene">
            <div className="j-principles-art" aria-hidden="true"><Image src={image("swiss-peaks")} alt="" fill sizes="(max-width: 700px) 90vw, 58vw" /></div>
            <ul className="j-values-grid">{values.map(value => <li key={value.title}><h3>{value.title}</h3><p>{value.text}</p></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="j-split j-torn-top" id="destinations" aria-label="Business and leisure journeys">
        <article className="j-split-panel j-business"><div className="j-split-photo"><Image className="j-photo" src={image("executive-lounge")} alt="A traveller waiting in a quiet airport lounge overlooking the city" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="j-split-shade" /><div className="j-split-copy"><h2>Business<span>When it needs to work.</span></h2><p>Same team. Same attention to the journey.</p><EnquiryButton className="j-button j-button-cream" service="Corporate travel">Explore Corporate Travel</EnquiryButton></div></article>
        <article className="j-split-panel j-leisure"><div className="j-split-photo"><Image className="j-photo" src={image("resort-bay")} alt="A beachfront resort beside a turquoise bay" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="j-split-shade" /><div className="j-split-copy"><h2>Leisure<span>When it needs to feel different.</span></h2><p>Unhurried days, planned with the same care.</p><EnquiryButton className="j-button j-button-cream" service="Leisure & holidays">Explore Destinations</EnquiryButton></div></article>
      </section>

      <section className="j-team j-team-editorial j-torn-top" id="team" aria-labelledby="team-heading">
        <div className="j-people-photo"><Image className="j-photo" src={image("travel-support-v2")} alt="Two travel consultants reviewing a world map and planning a route together" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        <div className="j-people-content">
          <h2 id="team-heading">The people<br />behind W&amp;W</h2>
          <p>Real people. Regional knowledge. A shared commitment to making every journey feel easier.</p>
          <dl className="j-people-facts">{[{ value: "6 regional locations", label: "Close to your journey" }, { value: "100+ travel partners", label: "A connected network" }, { value: "Global destinations", label: "Further together" }, { value: "One thoughtful team", label: "Personally considered" }].map(fact => <div key={fact.value}><dt>{fact.label}</dt><dd>{fact.value}</dd><span aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="m12 0 2.1 8.4L22.4 6l-6.2 6 6.2 6-8.3-2.4L12 24l-2.1-8.4L1.6 18l6.2-6-6.2-6 8.3 2.4Z" /></svg></span></div>)}</dl>
          <Link href="/contact" className="j-people-link">Meet your travel partner <Arrow diagonal /></Link>
        </div>
      </section>

      <section className="j-faq j-paper" id="faqs" aria-labelledby="faq-heading"><div className="j-shell j-faq-grid"><div><span className="j-eyebrow">Good to know</span><h2 id="faq-heading">FAQs</h2><p>A few things you<br />might be wondering.</p><Link className="j-text-link" href="/contact">Let’s talk <Arrow /></Link></div><div className="j-faq-list">{faqs.map((faq, index) => <details key={faq.question} name="journey-faq"><summary>{String(index + 1).padStart(2, "0")} — {faq.question}<span className="j-chevron" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>
    </main>
    <JourneyFooter />
  </JourneyMotion>;
}
