import { faqs } from "./faqs";
import Image from "./travel-image";
import Link from "next/link";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyMotion } from "./journey-motion";
import { JourneyFooter } from "./journey-footer";
import "./journey.css";
import "./journey-explorer.css";
import "./about-sections.css";

const image = (name: string) => name === "hero" ? "/images/journey/hero.webp" : `/images/library/${name}.webp`;
const audiences = [
  { id: "business", title: "Business", text: "From the first meeting to the flight home. We take care of the details, so you can focus on what brings you there.", photo: "business-boarding", alt: "A business traveller approaching an aircraft on the apron", service: "Corporate travel" },
  { id: "leisure", title: "Leisure", text: "Slow mornings, wide horizons and a little more wonder. Thoughtfully planned escapes, shaped around you.", photo: "maldives-jetty", alt: "A wooden jetty leading across turquoise water to a tropical island", service: "Leisure & holidays" },
  { id: "groups", title: "Groups & MICE", text: "Shared experiences, seamlessly coordinated. Bringing people together for meetings, milestones and everything in between.", photo: "retreat-dinner", alt: "A candlelit retreat dinner on a terrace overlooking the sea", service: "Groups & MICE" },
  { id: "connections", title: "Connections", text: "From Dubai to Africa and beyond. Local knowledge and a connected team make even complex journeys feel effortless.", photo: "dubai-panorama", alt: "Dubai skyline and the Burj Khalifa in clear daylight", service: "Africa travel" },
];
const steps = [
  { icon: "people", text: <>You tell us where<br />you need to be</> },
  { icon: "compass", text: <>We understand<br />the journey</> },
  { icon: "nodes", text: <>We coordinate<br />the details</> },
  { icon: "plane", text: <>You travel</> },
  { icon: "support", text: <>We stay<br />available</> },
] as const;
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
      <section className="j-hero" id="top" aria-labelledby="journey-heading">
        <video className="j-photo j-hero-photo" src="/hero.mp4" poster={image("hero")} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow">People. Places. Further together.</span>
            <h1 id="journey-heading">More than<br />a booking.</h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" />
            <p>Every journey has a different purpose — business,<br className="j-desktop-break" /> leisure, group travel or complex connections.<br className="j-desktop-break" /> What stays the same is the need for clarity,<br className="j-desktop-break" /> coordination and support when it matters.</p>
            <EnquiryButton className="j-button j-button-cream">Plan Your Journey</EnquiryButton>
          </div>
        </div>
        <a href="#about" className="j-scroll-note">A little further, together <span>↓</span></a>
      </section>

      <section className="j-intro j-paper j-torn-top" id="about" aria-labelledby="intro-heading">
        <div className="j-shell">
          <div className="j-travel-heading">
            <h2 id="intro-heading">We combine personal travel support with practical coordination</h2>
            <p>From the meeting that matters to the escape you have been dreaming of. We bring clarity, care and a thoughtful team to every journey.</p>
          </div>
          <div className="j-journey-window">
            <div className="j-journey-track">
              <svg className="j-journey-route" viewBox="0 0 2100 290" preserveAspectRatio="none" aria-hidden="true"><path d="M0 110 C95 180 22 21 121 43 S183 214 262 139 S326 13 384 82 S419 220 508 158 S598 79 661 175 S776 249 805 170 S830 26 926 66 S1003 240 1096 153 S1150 20 1250 75 S1304 247 1408 161 S1487 49 1559 139 S1630 262 1721 154 S1800 29 1890 87 S1990 224 2100 109" /></svg>
              {audiences.map((item, i) => <article key={item.id} id={`journey-${item.id}`} className="j-journey-card" aria-labelledby={`journey-${item.id}-heading`}>
                <div className="j-journey-image"><Image src={image(item.photo)} alt={item.alt} fill sizes="(max-width: 600px) 65vw, (max-width: 991px) 35vw, 15vw" /><span className="j-journey-number" aria-hidden="true">{i + 1}</span></div>
                <div className="j-journey-copy"><h3 id={`journey-${item.id}-heading`}>{item.title}</h3><p>{item.text}</p><EnquiryButton className="j-journey-enquiry" service={item.service}>Explore {item.title}</EnquiryButton></div>
              </article>)}
            </div>
          </div>
          <div className="j-explorer-footer"><span className="j-hint-motion">Scroll to discover <Arrow /></span><div className="j-explorer-progress" aria-hidden="true"><span /></div><a href="#services">Our approach <Arrow /></a></div>
        </div>
      </section>

      <section className="j-process j-torn-top j-torn-bottom" id="services" aria-labelledby="services-heading">
        <Image className="j-photo" src={image("kenya-game-drive")} alt="A safari vehicle crossing Kenyan grasslands at sunset" fill sizes="100vw" />
        <div className="j-process-shade" />
        <div className="j-shell j-process-content"><h2 id="services-heading">We connect the parts<br />of the journey.</h2><p className="j-process-intro">A booking is only one part.<br />The journey is the full picture.</p>
          <ol className="j-steps">{steps.map((step, i) => <li key={step.icon}><span className="j-step-icon"><TravelIcon kind={step.icon} size={33} /></span><span className="j-sr-only">Step {i + 1}: </span><p>{step.text}</p></li>)}</ol>
          <ul className="j-service-list">{["Flights", "Hotels", "Visas", "Transfers", "Groups", "Experiences", "Support"].map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

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
