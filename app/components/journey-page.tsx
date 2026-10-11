import Image from "next/image";
import Link from "next/link";
import { Arrow, TravelIcon } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyMotion } from "./journey-motion";
import { JourneyFooter } from "./journey-footer";
import { NetworkMap } from "./network-map";
import "./journey.css";
import "./journey-explorer.css";

const image = (name: string) => `/images/journey/${name}.webp`;
const audiences = [
  { id: "business", title: "Business", text: "From the first meeting to the flight home. We take care of the details, so you can focus on what brings you there.", photo: "business", alt: "A business traveller boarding a private jet at sunrise", service: "Corporate travel" },
  { id: "leisure", title: "Leisure", text: "Slow mornings, wide horizons and a little more wonder. Thoughtfully planned escapes, shaped around you.", photo: "leisure", alt: "A traveller overlooking a turquoise island lagoon", service: "Leisure & holidays" },
  { id: "groups", title: "Groups & MICE", text: "Shared experiences, seamlessly coordinated. Bringing people together for meetings, milestones and everything in between.", photo: "team", alt: "A group taking in a mountain landscape together", service: "Groups & MICE" },
  { id: "connections", title: "Connections", text: "From Dubai to Africa and beyond. Local knowledge and a connected team make even complex journeys feel effortless.", photo: "dubai", alt: "Dubai skyline in the soft evening light", service: "Africa travel" },
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
        <Image className="j-photo" src={image("safari")} alt="A safari traveller watching the East African savannah through binoculars" fill sizes="100vw" />
        <div className="j-process-shade" />
        <div className="j-shell j-process-content"><h2 id="services-heading">We connect the parts<br />of the journey.</h2><p className="j-process-intro">A booking is only one part.<br />The journey is the full picture.</p>
          <ol className="j-steps">{steps.map((step, i) => <li key={step.icon}><span className="j-step-icon"><TravelIcon kind={step.icon} size={33} /></span><span className="j-sr-only">Step {i + 1}: </span><p>{step.text}</p></li>)}</ol>
          <ul className="j-service-list">{["Flights", "Hotels", "Visas", "Transfers", "Groups", "Experiences", "Support"].map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="j-story j-paper" id="story" aria-labelledby="story-heading">
        <div className="j-shell">
          <div className="j-section-label"><span>02 / A little about us</span><span>Rooted in Dubai. Connected to the world.</span></div>
          <div className="j-story-grid">
            <div className="j-story-art">
              <div className="j-story-photo"><Image className="j-photo" src={image("story")} alt="Business travellers enjoying a conversation before their flight" fill sizes="(max-width: 700px) 78vw, 37vw" /></div>
              <div className="j-story-stamp" aria-hidden="true"><span>Personally planned</span><TravelIcon kind="plane" size={30} /><span>Human at heart</span></div>
              <figure className="j-story-postcard"><div><Image src={image("safari")} alt="A traveller looking out over the African savannah" fill sizes="(max-width: 700px) 48vw, 22vw" /></div><figcaption>A little further, together. <Arrow diagonal /></figcaption></figure>
              <span className="j-story-margin-note">Good journeys begin with a conversation.</span>
            </div>
            <div className="j-story-copy">
              <span className="j-eyebrow">The people behind the journey</span>
              <h2 id="story-heading">Built around<br /><em>real journeys.</em></h2>
              <p className="j-story-lead">The world is full of moving parts.<br />Your journey shouldn&apos;t feel that way.</p>
              <p>Wings &amp; Wheels began with a simple belief: travel should feel easier to manage. That starts with listening, understanding your plans and taking care of the details that connect them.</p>
              <p>Today, we bring local knowledge, regional connections and international capability to journeys that can begin almost anywhere. And wherever you&apos;re going, there&apos;s a real person with you along the way.</p>
              <Link href="/contact" className="j-story-link">Start a conversation with us <span><Arrow diagonal /></span></Link>
            </div>
          </div>
          <div className="j-story-bottom"><span>At the heart of it all</span><ul className="j-story-words">{["People", "Places", "Connections", "Opportunities"].map(word => <li key={word}>{word}</li>)}</ul><TravelIcon kind="globe" size={24} /></div>
        </div>
      </section>

      <section className="j-network j-paper" id="network" aria-labelledby="network-heading">
        <div className="j-network-landscape j-network-africa"><Image src={image("safari")} alt="" fill sizes="45vw" /></div>
        <div className="j-network-landscape j-network-dubai"><Image src={image("dubai")} alt="" fill sizes="40vw" /></div>
        <div className="j-shell j-network-content"><h2 id="network-heading">Local where it matters.<br />Connected where you’re going.</h2><p>Operating from the UAE, Wings &amp; Wheels is supported by a growing network<br className="j-desktop-break" /> across key African markets and international destinations.</p><EnquiryButton className="j-button j-button-outline" service="Africa travel">Explore Our Africa Network</EnquiryButton><NetworkMap /></div>
        <ul className="j-shell j-pillars">{pillars.map(pillar => <li key={pillar.title}><TravelIcon kind={pillar.icon} size={35} /><div><h3>{pillar.title}</h3><p>{pillar.text}</p></div></li>)}</ul>
      </section>

      <section className="j-values j-paper j-torn-top" aria-labelledby="values-heading">
        <div className="j-shell">
          <h2 id="values-heading">Principles<br />that guide us</h2>
          <div className="j-principles-scene">
            <div className="j-principles-art" aria-hidden="true"><Image src="/images/maldives.jpg" alt="" fill sizes="(max-width: 700px) 90vw, 58vw" /></div>
            <ul className="j-values-grid">{values.map(value => <li key={value.title}><h3>{value.title}</h3><p>{value.text}</p></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="j-split j-torn-top" id="destinations" aria-label="Business and leisure journeys">
        <article className="j-split-panel j-business"><div className="j-split-photo"><Image className="j-photo" src={image("business")} alt="A business traveller boarding a private jet at sunrise" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="j-split-shade" /><div className="j-split-copy"><h2>Business<span>When it needs to work.</span></h2><p>Same team. Same attention to the journey.</p><EnquiryButton className="j-button j-button-cream" service="Corporate travel">Explore Corporate Travel</EnquiryButton></div></article>
        <article className="j-split-panel j-leisure"><div className="j-split-photo"><Image className="j-photo" src={image("leisure")} alt="An unhurried afternoon beside a turquoise lagoon" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="j-split-shade" /><div className="j-split-copy"><h2>Leisure<span>When it needs to feel different.</span></h2><p>Unhurried days, planned with the same care.</p><EnquiryButton className="j-button j-button-cream" service="Leisure & holidays">Explore Destinations</EnquiryButton></div></article>
      </section>

      <section className="j-team j-team-editorial j-torn-top" id="team" aria-labelledby="team-heading">
        <div className="j-people-photo"><Image className="j-photo" src={image("story")} alt="Travel colleagues sharing a conversation before a journey" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        <div className="j-people-content">
          <h2 id="team-heading">The people<br />behind W&amp;W</h2>
          <p>Real people. Regional knowledge. A shared commitment to making every journey feel easier.</p>
          <dl className="j-people-facts">{[{ value: "6 regional locations", label: "Close to your journey" }, { value: "100+ travel partners", label: "A connected network" }, { value: "Global destinations", label: "Further together" }, { value: "One thoughtful team", label: "Personally considered" }].map(fact => <div key={fact.value}><dt>{fact.label}</dt><dd>{fact.value}</dd><span aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="m12 0 2.1 8.4L22.4 6l-6.2 6 6.2 6-8.3-2.4L12 24l-2.1-8.4L1.6 18l6.2-6-6.2-6 8.3 2.4Z" /></svg></span></div>)}</dl>
          <Link href="/contact" className="j-people-link">Meet your travel partner <Arrow diagonal /></Link>
        </div>
      </section>

      <section className="j-faq j-paper" id="faqs" aria-labelledby="faq-heading"><div className="j-shell j-faq-grid"><div><span className="j-eyebrow">Good to know</span><h2 id="faq-heading">FAQs</h2><p>A few things you<br />might be wondering.</p><Link className="j-text-link" href="/contact">Let’s talk <Arrow /></Link></div><div className="j-faq-list">{faqs.map(faq => <details key={faq.question} name="journey-faq"><summary>{faq.question}<span className="j-chevron" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>
    </main>
    <JourneyFooter />
  </JourneyMotion>;
}
