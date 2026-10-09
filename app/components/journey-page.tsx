import Image from "next/image";
import Link from "next/link";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyMotion } from "./journey-motion";
import { office } from "./data";
import "./journey.css";

const image = (name: string) => `/images/journey/${name}.webp`;
const audiences = [
  { title: "Business", text: "Meetings, projects and regional travel.", photo: "story", alt: "Colleagues sharing a conversation in an airport lounge", service: "Corporate travel" },
  { title: "Leisure", text: "Holidays and memorable journeys.", photo: "leisure", alt: "A traveller overlooking a turquoise island lagoon", service: "Leisure & holidays" },
  { title: "Groups & MICE", text: "Organised travel for multiple travellers.", photo: "team", alt: "A group taking in a mountain landscape together", service: "Groups & MICE" },
  { title: "Connections", text: "Travel between the UAE, Africa and beyond.", photo: "dubai", alt: "Dubai skyline in the soft evening light", service: "Africa travel" },
];
const steps = [
  { icon: "people", text: <>You tell us where<br />you need to be</> },
  { icon: "compass", text: <>We understand<br />the journey</> },
  { icon: "nodes", text: <>We coordinate<br />the details</> },
  { icon: "plane", text: <>You travel</> },
  { icon: "support", text: <>We stay<br />available</> },
] as const;
const pillars = [
  { icon: "pin", title: "UAE base", text: "Regional coordination and international access." },
  { icon: "people", title: "Africa network", text: "Local knowledge and on-ground connections." },
  { icon: "globe", title: "Global reach", text: "International travel planning and coordination." },
] as const;
const values = [
  { icon: "ear", title: "We listen first.", text: "We begin by understanding why you’re travelling and what matters most." },
  { icon: "nodes", title: "We connect the details.", text: "Flights, hotels, visas, transfers and schedules should work together, not separately." },
  { icon: "leaf", title: "We think beyond the booking.", text: "A confirmed reservation is only the beginning of our support." },
  { icon: "people", title: "We stay human.", text: "Technology makes travel faster, but people make travel better." },
] as const;
const faqs = [
  { question: "Do you support both business and leisure travel?", answer: "Yes. We coordinate corporate travel, family holidays, individual journeys and group trips. The same team brings care and attention to every itinerary, whatever takes you there." },
  { question: "Can you help with group and MICE travel?", answer: "We help organise meetings, incentives, conferences and exhibitions, including flights, accommodation, transfers and coordination for travellers arriving from different locations." },
  { question: "Do you assist with visas and transfers?", answer: "Yes. We can help you understand the visa requirements for your itinerary and coordinate airport and local transfers. Visa approval and processing times are determined by the relevant authorities." },
  { question: "Which regions do you mainly cover?", answer: "We operate from Dubai, with connections across the UAE and key African markets including Sudan, South Sudan, Uganda, Kenya and Tanzania, alongside international destinations." },
  { question: "Do you coordinate complex multi-stop journeys?", answer: "Absolutely. We bring flights, hotels, transfers and the details between each stop into one coordinated plan, including journeys across multiple countries." },
  { question: "Will someone be available during travel?", answer: "Our team stays connected throughout your journey. We’ll share the relevant contact details before you leave so you know who to speak to if your plans change." },
];

function NetworkMap() {
  const points = [
    { name: "Khartoum", x: 383, y: 109, dx: -13, dy: 4 },
    { name: "Juba", x: 378, y: 157, dx: -13, dy: 4 },
    { name: "Kampala", x: 381, y: 177, dx: -13, dy: 8 },
    { name: "Nairobi", x: 409, y: 185, dx: 13, dy: 4 },
    { name: "Tanzania", x: 397, y: 208, dx: 13, dy: 8 },
  ];
  return <svg className="j-map" viewBox="0 0 650 340" role="img" aria-label="Illustrated network connecting Dubai with Khartoum, Juba, Kampala, Nairobi and Tanzania">
    <image href="/images/journey/africa-map.svg" x="105" y="0" width="450" height="340" />
    {points.map((point, i) => <path className="j-map-route" key={point.name} d={`M${point.x} ${point.y} Q${390 + i * 19} ${-55 + i * 18} 503 66`} />)}
    {points.map(point => <g key={point.name}><circle cx={point.x} cy={point.y} r="5" /><text x={point.x + point.dx} y={point.y + point.dy} textAnchor={point.dx < 0 ? "end" : "start"}>{point.name}</text></g>)}
    <circle cx="503" cy="66" r="6" /><circle className="j-map-hub" cx="503" cy="66" r="13" /><text x="517" y="62">Dubai</text>
  </svg>;
}

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
        <span className="j-intro-cover-shade" aria-hidden="true" />
        <div className="j-shell">
          <div className="j-intro-heading"><h2 id="intro-heading">We combine high-touch<br />travel support with<br />practical coordination.</h2><p>From executive trips and family holidays to exhibitions and multi-stop regional connections, Wings &amp; Wheels helps travellers move with confidence.</p></div>
          <div className="j-audiences">
            <svg className="j-flight-line" viewBox="0 0 1200 170" preserveAspectRatio="none" aria-hidden="true"><path d="M-50 115 C30 120 55 -25 112 35 S190 190 246 117 S299 -17 347 60 S427 174 477 86 S538 -2 582 70 S651 191 710 90 S750 63 803 105 S847 -20 906 25 S1000 143 1051 63 S1120 30 1240 65" /></svg>
            <span className="j-flight-plane"><TravelIcon kind="plane" size={32} /></span>
            {audiences.map((item, i) => <article key={item.title} className="j-audience">
              <div className="j-audience-photo"><Image src={image(item.photo)} alt={item.alt} fill sizes="(max-width: 600px) 42vw, 19vw" /><span className="j-photo-pin">{i + 1}</span></div>
              <h3>{item.title}</h3><p>{item.text}</p>
              <EnquiryButton className="j-card-link" service={item.service} icon={false}><span className="j-sr-only">Explore {item.title}</span><Arrow diagonal /></EnquiryButton>
            </article>)}
          </div>
        </div>
      </section>

      <section className="j-process j-torn-top j-torn-bottom" id="services" aria-labelledby="services-heading">
        <Image className="j-photo" src={image("safari")} alt="A safari traveller watching the East African savannah through binoculars" fill sizes="100vw" />
        <div className="j-process-shade" />
        <div className="j-shell j-process-content"><h2 id="services-heading">We connect the parts<br />of the journey.</h2><p className="j-process-intro">A booking is only one part.<br />The journey is the full picture.</p>
          <ol className="j-steps">{steps.map((step, i) => <li key={step.icon}><span className="j-step-icon"><TravelIcon kind={step.icon} size={33} /></span><span className="j-sr-only">Step {i + 1}: </span><p>{step.text}</p></li>)}</ol>
          <ul className="j-service-list">{["Flights", "Hotels", "Visas", "Transfers", "Groups", "Experiences", "Support"].map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="j-story j-paper" id="story" aria-labelledby="story-heading">
        <div className="j-story-photo j-torn-bottom"><Image className="j-photo" src={image("story")} alt="Business travellers enjoying a conversation before their flight" fill sizes="(max-width: 700px) 100vw, 50vw" /></div>
        <div className="j-story-copy"><span className="j-eyebrow">A little about us</span><h2 id="story-heading">Built around<br />real journeys.</h2><p>Wings &amp; Wheels was built on a simple belief: travel should feel easier to manage. Journeys may be complex, but travellers shouldn’t have to manage every moving part alone. Today we combine local knowledge, regional connections and international capability to support journeys that can begin almost anywhere and continue almost anywhere.</p><ul className="j-story-words">{["People", "Places", "Connections", "Opportunities"].map(word => <li key={word}>{word}</li>)}</ul></div>
      </section>

      <section className="j-network j-paper" id="network" aria-labelledby="network-heading">
        <div className="j-network-landscape j-network-africa"><Image src={image("safari")} alt="" fill sizes="45vw" /></div>
        <div className="j-network-landscape j-network-dubai"><Image src={image("dubai")} alt="" fill sizes="40vw" /></div>
        <div className="j-shell j-network-content"><h2 id="network-heading">Local where it matters.<br />Connected where you’re going.</h2><p>Operating from the UAE, Wings &amp; Wheels is supported by a growing network<br className="j-desktop-break" /> across key African markets and international destinations.</p><EnquiryButton className="j-button j-button-outline" service="Africa travel">Explore Our Africa Network</EnquiryButton><NetworkMap /></div>
        <ul className="j-shell j-pillars">{pillars.map(pillar => <li key={pillar.title}><TravelIcon kind={pillar.icon} size={35} /><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></li>)}</ul>
      </section>

      <section className="j-values j-paper j-torn-top" aria-labelledby="values-heading"><div className="j-shell"><h2 id="values-heading">What guides us.</h2><ul className="j-values-grid">{values.map(value => <li key={value.title}><TravelIcon kind={value.icon} size={49} /><h3>{value.title}</h3><p>{value.text}</p></li>)}</ul><p className="j-principles">Integrity <span>·</span> Care <span>·</span> Partnership <span>·</span> Responsibility <span>·</span> Continuous Improvement</p></div></section>

      <section className="j-split j-torn-top" id="destinations" aria-label="Business and leisure journeys">
        <article className="j-split-panel j-business"><div className="j-split-photo"><Image className="j-photo" src={image("business")} alt="A business traveller boarding a private jet at sunrise" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="j-split-shade" /><div className="j-split-copy"><h2>Business<span>When it needs to work.</span></h2><p>Same team. Same attention to the journey.</p><EnquiryButton className="j-button j-button-cream" service="Corporate travel">Explore Corporate Travel</EnquiryButton></div></article>
        <article className="j-split-panel j-leisure"><div className="j-split-photo"><Image className="j-photo" src={image("leisure")} alt="An unhurried afternoon beside a turquoise lagoon" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="j-split-shade" /><div className="j-split-copy"><h2>Leisure<span>When it needs to feel different.</span></h2><p>Unhurried days, planned with the same care.</p><EnquiryButton className="j-button j-button-cream" service="Leisure & holidays">Explore Destinations</EnquiryButton></div></article>
      </section>

      <section className="j-team j-torn-top" id="team" aria-labelledby="team-heading">
        <div className="j-shell j-team-head"><span className="j-eyebrow">Travel is still a people business.</span><h2 id="team-heading">The people<br className="j-team-break" /> behind W&amp;W</h2></div>
        <div className="j-team-photo"><Image className="j-photo" src={image("team")} alt="Four travel colleagues looking across an African mountain valley" fill sizes="100vw" /></div>
        <div className="j-team-band j-paper j-torn-top">
          <div className="j-shell j-team-copy"><p>Behind every Wings &amp; Wheels journey is a team coordinating the details, communicating with travellers and helping keep plans moving.</p><dl className="j-team-facts">{[{ value: "6", label: "Regional Locations" }, { value: "100+", label: "Travel Partners" }, { value: "Global", label: "Destinations" }, { value: "One Team", label: "Many journeys" }].map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></div>
        </div>
      </section>

      <section className="j-faq j-paper" id="faqs" aria-labelledby="faq-heading"><div className="j-shell j-faq-grid"><div><span className="j-eyebrow">Good to know</span><h2 id="faq-heading">FAQs</h2><p>A few things you<br />might be wondering.</p><Link className="j-text-link" href="/contact">Let’s talk <Arrow /></Link></div><div className="j-faq-list">{faqs.map(faq => <details key={faq.question} name="journey-faq"><summary>{faq.question}<span className="j-chevron" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>
    </main>
    <footer className="j-footer"><div className="j-shell j-footer-main"><div><Link href="/" className="j-brand">Wings &amp; Wheels</Link><p className="j-footer-tagline">People · Places · Further together</p></div><nav aria-label="Footer navigation">{[{ label: "About", href: "#about" }, { label: "Services", href: "#services" }, { label: "Destinations", href: "#destinations" }, { label: "Our Network", href: "#network" }, { label: "FAQs", href: "#faqs" }].map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav><EnquiryButton className="j-button j-button-outline-light">Plan Your Journey</EnquiryButton></div><div className="j-shell j-footer-bottom"><span>© {new Date().getFullYear()} Wings &amp; Wheels Travel and Tourism</span><a href={`mailto:${office.email}`}>{office.email}</a><a href={office.phones[0].href}>{office.phones[0].label}</a><a href="#top">Back to top ↑</a></div></footer>
  </JourneyMotion>;
}
