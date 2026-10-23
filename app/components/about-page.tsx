import type { CSSProperties, ReactNode } from "react";
import Image from "./travel-image";
import { TravelIcon, type IconKind } from "./icons";
import { Cta } from "./about-cta";
import { MaskedHero } from "./masked-hero";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { AboutMotion } from "./about-motion";
import { AboutAudiences, type Audience } from "./about-audiences";
import { AboutNetwork } from "./about-network";
import { AboutSplit } from "./about-split";
import "./journey.css";
import "./journey-explorer.css";
import "./about.css";

const tags = ["Business", "Leisure", "Groups", "MICE", "International travel"];

const audiences: Audience[] = [
  { title: "Business", text: "Meetings, projects and regional travel.", href: "/corporate-travel", image: "/images/library/about-business-traveller.webp", alt: "A business traveller working on a laptop at a table in an airport lounge" },
  { title: "Leisure", text: "Holidays and memorable journeys.", href: "/destinations", image: "/images/about/leisure-bay-v2.webp", alt: "Turquoise water and white sand along a palm-lined bay" },
  { title: "Groups & MICE", text: "Organised travel across multiple travellers.", href: "/groups-mice", image: "/images/about/conference-v2.webp", alt: "Delegates gathered in a sunlit conference hall" },
  { title: "Connections", text: "Between the UAE, Africa and worldwide.", href: "/africa", image: "/images/about/dubai-v2.webp", alt: "The Dubai skyline reflected in the waterfront at dusk" },
];

const steps: { title: string; text: string; code: string; icon: IconKind; image: string; alt: string }[] = [
  { title: "You tell us where you need to be", text: "A meeting that matters, a long-awaited holiday or a team travelling together.", code: "Tell us", icon: "chat", image: "/images/about/consultation-v2.webp", alt: "A traveller talking through plans with a consultant" },
  { title: "We understand the journey", text: "Why you are travelling, who is going and what matters most along the way.", code: "Listen", icon: "ear", image: "/images/about/planning-v2.webp", alt: "A map, notebook and travel essentials arranged for planning a journey" },
  { title: "We coordinate the details", text: "Flights, hotels, visas and transfers brought together as one plan.", code: "Connect", icon: "nodes", image: "/images/about/coordinator-v2.webp", alt: "A consultant coordinating travel arrangements" },
  { title: "You travel", text: "Clear information before you leave, so you can focus on the reason you're going.", code: "Depart", icon: "plane", image: "/images/about/departure-v2.webp", alt: "Travellers walking through a sunlit airport concourse toward their departure gate" },
  { title: "We stay available", text: "When plans change, someone who knows your journey is still there.", code: "Support", icon: "support", image: "/images/about/support-v2.webp", alt: "A support specialist helping a traveller by phone" },
];

const services = ["Flights", "Hotels", "Visas", "Transfers", "Groups", "Experiences", "Support"];

const story = [
  { text: "Wings & Wheels was built around a simple idea: travel should feel easier to manage.", image: "/images/about/story-walk-v2.webp", alt: "A traveller walking through a city at the start of a journey", caption: "Where it begins" },
  { text: "Not because every journey is simple — but because the traveller shouldn't have to manage every moving part alone.", image: "/images/about/planning-v2.webp", alt: "Plans and notes laid out for an upcoming trip", caption: "Every moving part" },
  { text: "Today, Wings & Wheels combines local knowledge, regional connections and international travel capability to support journeys that can begin almost anywhere and continue almost anywhere.", image: "/images/about/mountain-v2.webp", alt: "A hiker looking out over a mountain range", caption: "Almost anywhere" },
];

const words = [
  { word: "People", image: "/images/about/consultation-v2.webp" },
  { word: "Places", image: "/images/about/venice-v2.webp" },
  { word: "Connections", image: "/images/about/dubai-v2.webp" },
  { word: "Opportunities", image: "/images/about/departure-v2.webp" },
];

const advantages: { title: string; text: string; icon: IconKind }[] = [
  { title: "UAE base", text: "Regional coordination and international access.", icon: "compass" },
  { title: "Africa network", text: "Local knowledge and on-ground connections.", icon: "pin" },
  { title: "Global reach", text: "International travel planning and coordination.", icon: "globe" },
];

const principles: { title: string; text: string; icon: IconKind }[] = [
  { title: "We listen first", text: "Before recommending flights, hotels or destinations, we understand why you're travelling and what matters to you.", icon: "ear" },
  { title: "We connect the details", text: "Flights, hotels, visas, transfers and schedules shouldn't operate as separate pieces.", icon: "nodes" },
  { title: "We think beyond the booking", text: "A confirmed ticket isn't the end of our involvement.", icon: "route" },
  { title: "We stay human", text: "Technology makes travel faster. People make travel easier when something doesn't go as expected.", icon: "heart" },
];

const crew = [
  { caption: "Coordinating the details", image: "/images/about/coordinator-v3.webp", alt: "A travel coordinator in a light blue shirt reviewing an itinerary at a dual-screen workstation" },
  { caption: "Communicating with travellers", image: "/images/about/consultation-v3.webp", alt: "A travel consultant in a tan blazer discussing a destination brochure with a client" },
  { caption: "Keeping plans moving", image: "/images/about/support-v3.webp", alt: "A travel support specialist in a navy polo helping a traveller by phone and taking notes" },
];

const values = ["Integrity", "Care", "Partnership", "Responsibility", "Continuous improvement"];

function Line({ children }: { children: ReactNode }) {
  return <span className="au-line"><span>{children}</span></span>;
}

function Ink({ text }: { text: string }) {
  return <>{text.split(" ").map((word, index) => <span key={index} className="au-ink">{word} </span>)}</>;
}

function Marquee({ items, className }: { items: string[]; className: string }) {
  return <div className={className}>
    <div className="au-marquee-track">
      {[0, 1].map(copy => <ul key={copy} aria-hidden={copy ? true : undefined}>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>)}
    </div>
  </div>;
}

export function AboutPage() {
  return <AboutMotion>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <JourneyHeader introId="who" />
    <main id="main-content">
      <MaskedHero
        id="about-title"
        eyebrow="About Wings & Wheels"
        lines={["Travel is about", { text: "places.", accent: true }, "We're about", "the people"]}
        sub="moving between them."
        text="Wings & Wheels is a travel management company connecting individuals, businesses and groups across the UAE, Africa and worldwide."
        action={{ label: "Discover our story", href: "#who" }}
        media={{ image: "/images/about/hero-v3.webp", alt: "Two male travel consultants and a woman planning a journey in a sunlit Dubai office" }}
        tags={tags}
      />

      <section className="au-who au-torn" id="who" aria-labelledby="who-title">
        <div className="j-shell">
          <div className="au-bar"><span>01 / Who we are</span><span>Every journey has a reason</span></div>
          <div className="au-who-head">
            <h2 id="who-title" className="au-h2" data-lines><Line>More than</Line><Line><em>a booking.</em></Line></h2>
            <div className="au-who-copy">
              <p className="au-who-ink"><Ink text="People travel for different reasons. A CEO has a meeting tomorrow. A family has been planning a holiday for months. A company is bringing delegates to an exhibition. A traveller is connecting between Africa, Dubai and somewhere beyond." /></p>
              <p className="au-who-lead" data-au-reveal>Different journeys. The same need — clear information, good coordination and someone there when it matters.</p>
            </div>
          </div>
          <AboutAudiences items={audiences} />
        </div>
      </section>

      <section className="au-process au-torn" id="what-we-do" aria-labelledby="process-title">
        <div className="au-process-pin">
          <div className="j-shell au-process-head">
            <div>
              <span className="au-kicker">02 / What we do</span>
              <h2 id="process-title" className="au-h2" data-lines><Line>We connect the parts</Line><Line><em>of the journey.</em></Line></h2>
            </div>
            <p className="au-process-sub" data-au-reveal>The booking is one part.<span>The journey is the whole picture.</span></p>
          </div>
          <div className="au-process-window">
            <ol className="au-process-track">
              {steps.map((step, index) => <li className="au-pass-wrap" key={step.title}>
                <article className="au-pass">
                  <div className="au-pass-photo"><Image src={step.image} alt={step.alt} fill sizes="(max-width: 991px) 80vw, 340px" /></div>
                  <div className="au-pass-body">
                    <div className="au-pass-meta"><span>Step</span><strong>{String(index + 1).padStart(2, "0")}</strong><span>of 05</span></div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <div className="au-pass-stub" aria-hidden="true">
                    <span>{step.code}</span>
                    <TravelIcon kind={step.icon} size={22} />
                  </div>
                </article>
              </li>)}
            </ol>
          </div>
          <div className="j-shell au-process-foot" aria-hidden="true">
            <span className="au-process-count">01 / 05</span>
            <div className="au-process-route"><span className="au-process-fill" /><span className="au-process-plane"><TravelIcon kind="plane" size={16} /></span></div>
            <span className="au-process-count">Arrived</span>
          </div>
          <ul className="j-shell au-services" aria-label="What we coordinate">
            {services.map((service, index) => <li key={service} style={{ "--i": index } as CSSProperties}>{service}</li>)}
          </ul>
        </div>
      </section>

      <section className="au-story au-torn" id="story" aria-labelledby="story-title">
        <div className="j-shell au-story-stage">
          <div className="au-story-copy">
            <span className="au-kicker">03 / Our story</span>
            <h2 id="story-title" className="au-h2" data-lines><Line>Built around</Line><Line><em>real journeys.</em></Line></h2>
            <ol className="au-chapters">
              {story.map((item, index) => <li className={`au-chapter${index ? "" : " is-active"}`} key={item.caption}>
                <span className="au-chapter-no">{`0${index + 1}`}</span>
                <p>{item.text}</p>
              </li>)}
            </ol>
          </div>
          <div className="au-story-stack">
            {story.map(item => <figure className="au-polaroid" key={item.caption}>
              <div className="au-polaroid-card">
                <div className="au-polaroid-photo"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 991px) 50vw, 340px" /></div>
                <figcaption>{item.caption}</figcaption>
              </div>
            </figure>)}
          </div>
        </div>
      </section>

      <section className="au-wordsec" aria-label="What our story is built on">
        <ul className="au-words">
          {words.map((item, index) => <li key={item.word}>
            <div className="j-shell au-words-row">
              <span className="au-word-no">{String(index + 1).padStart(2, "0")}</span>
              <span className="au-word">{item.word}</span>
              <span className="au-word-pill" aria-hidden="true"><Image src={item.image} alt="" fill sizes="240px" /></span>
            </div>
          </li>)}
        </ul>
      </section>

      <section className="au-network au-torn" id="network" aria-labelledby="network-title">
        <div className="j-shell">
          <div className="au-bar"><span>04 / Our network</span><span>UAE · Africa · Worldwide</span></div>
          <h2 id="network-title" className="au-net-title">
            <span className="au-net-row"><b>Local</b><span>where it<br />matters.</span></span>
            <span className="au-net-row au-net-row-end"><b>Connected</b><span>where you&apos;re<br />going.</span></span>
          </h2>
          <div className="au-net-grid">
            <div className="au-net-copy">
              <p data-au-reveal>Wings &amp; Wheels operates from the UAE with a growing network and regional presence across key African markets and international destinations.</p>
              <ul className="au-advantages">
                {advantages.map(item => <li key={item.title} data-au-reveal>
                  <span className="au-adv-icon"><TravelIcon kind={item.icon} size={24} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>)}
              </ul>
              <div data-au-reveal><Cta href="/africa">Explore our Africa network</Cta></div>
            </div>
            <AboutNetwork />
          </div>
        </div>
      </section>

      <section className="au-values au-torn" id="values" aria-labelledby="values-title">
        <div className="j-shell au-values-grid">
          <div className="au-values-side">
            <span className="au-kicker">05 / Our principles</span>
            <h2 id="values-title" className="au-h2" data-lines><Line>What</Line><Line><em>guides us.</em></Line></h2>
            <ol className="au-values-steps" aria-hidden="true">
              {principles.map((item, index) => <li key={item.title} className={index ? undefined : "is-active"}><span>{`0${index + 1}`}</span>{item.title}</li>)}
            </ol>
          </div>
          <ol className="au-principles">
            {principles.map((item, index) => <li className="au-principle" key={item.title} style={{ "--i": index } as CSSProperties}>
              <article className="au-principle-card">
                <div className="au-principle-top">
                  <span className="au-principle-no">{`0${index + 1}`}</span>
                  <span className="au-principle-icon"><TravelIcon kind={item.icon} size={26} /></span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </li>)}
          </ol>
        </div>
        <div className="au-core">
          <span className="au-core-label">Our core values</span>
          <Marquee items={values} className="au-core-row" />
          <div aria-hidden="true"><Marquee items={values} className="au-core-row au-core-row-reverse" /></div>
        </div>
      </section>

      <section className="au-split au-torn" aria-label="Business and leisure travel">
        <AboutSplit />
      </section>

      <section className="au-people au-torn" id="team" aria-labelledby="people-title">
        <div className="j-shell">
          <div className="au-people-head">
            <div>
              <span className="au-kicker">06 / The people behind W&amp;W</span>
              <h2 id="people-title" className="au-h2" data-lines><Line>Travel is still a</Line><Line><em>people business.</em></Line></h2>
            </div>
            <div className="au-people-intro">
              <p data-au-reveal>Behind every Wings &amp; Wheels journey is a team coordinating the details, communicating with travellers and helping keep plans moving.</p>
              <div data-au-reveal><Cta href="/contact">Meet our team</Cta></div>
            </div>
          </div>
          <div className="au-crew">
            {crew.map((member, index) => <figure className="au-crew-card" key={member.caption}>
              <div className="au-crew-photo"><Image src={member.image} alt={member.alt} fill sizes="(max-width: 991px) 80vw, 34vw" /></div>
              <figcaption><span>{`0${index + 1}`}</span>{member.caption}</figcaption>
            </figure>)}
            <span className="au-people-stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120"><defs><path id="au-stamp-ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs><text><textPath href="#au-stamp-ring">People behind every journey · People behind every journey ·</textPath></text></svg>
              <b>W&amp;W</b>
            </span>
          </div>
          <dl className="au-stats">
            <div data-au-reveal><dt>Regional locations</dt><dd data-count="6">6</dd></div>
            <div data-au-reveal><dt>Travel partners</dt><dd data-count="100" data-suffix="+">100+</dd></div>
            <div data-au-reveal><dt>Destinations</dt><dd>Global</dd></div>
          </dl>
          <p className="au-closing">
            <span className="au-closing-line">One team.</span>
            <span className="au-closing-line"><em>Multiple markets.</em></span>
          </p>
        </div>
      </section>
    </main>
    <JourneyFooter />
  </AboutMotion>;
}
