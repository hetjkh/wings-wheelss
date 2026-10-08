import Image from "next/image";
import { BusinessLeisure, OurStory, WhatGuidesUs, WhatWeDo, WhoWeAre } from "./about-sections";
import { Collage } from "./collage";
import { Hero } from "./hero";
import { Arrow, TravelIcon } from "./icons";
import { Journal, Numbers, Services } from "./journeys";
import { Footer } from "./footer";
import { EnquiryButton, SiteChrome } from "./site-controls";
import { Spotlight } from "./spotlight";
import { WorldMap } from "./world-map";

const tickerItems = ["Leisure escapes", "East African safaris", "Corporate travel", "Groups & MICE", "Visas & travel support", "Island getaways", "City breaks"];

const faqs = [
  ["Can you create a journey just for me?", "Absolutely. Tell us about your interests, travel dates and budget. We'll help shape a personal itinerary, from flights and stays to experiences and transfers."],
  ["Do you arrange business and group travel?", "Yes. We coordinate corporate journeys, team trips, meetings, incentives, conferences and events, and bring the logistics together into one plan."],
  ["Can you help with travel across Africa?", "Africa is a key part of our world. Our regional connections help us plan journeys through Kenya, Tanzania, Uganda and beyond."],
  ["What happens after I enquire?", "Once our live enquiry service is connected, a travel specialist will discuss your plans and help you explore your options. This preview lets you try the planner without sending your details."],
];

export default function HomePage() {
  return <SiteChrome>
    <a className="skip-link" href="#intro">Skip to content</a>
    <Hero />
    <main>
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0, 1].map(n => <span key={n}>{tickerItems.map(t => <span key={t}>{t}<i>✳</i></span>)}</span>)}</div></div>

      <WhoWeAre />

      <section className="intro section-shell" id="intro" aria-labelledby="intro-heading">
        <div className="intro-copy" data-reveal>
          <span className="eyebrow">Explore a more meaningful way</span>
          <h2 id="intro-heading">A Deeper<br />Way to <em>Travel</em></h2>
          <p className="lead">There&apos;s seeing the world. Then there&apos;s feeling it.</p>
          <p>The quiet before a safari sunrise. A wrong turn that becomes your favourite memory. The people who make a place feel like home. From our home in the UAE, we bring you closer to the moments that make travel matter.</p>
          <div className="intro-actions"><a href="#map" className="button button-dark">Explore all journeys <Arrow /></a><a href="#story" className="text-link">Our story <Arrow diagonal /></a></div>
        </div>
        <Collage />
      </section>

      <WhatGuidesUs />
      <BusinessLeisure />
      <Spotlight />
      <WorldMap />
      <WhatWeDo />
      <Services />
      <Numbers />
      <OurStory />
      <Journal />

      <section className="faq section-shell section-space" id="questions" aria-labelledby="faq-heading">
        <div data-reveal><span className="eyebrow">A little clarity before you go</span><h2 id="faq-heading">Wondering about <em>something?</em></h2><p>Can&apos;t find what you&apos;re looking for? We&apos;re always happy to talk.</p><EnquiryButton className="text-link">Ask us anything</EnquiryButton></div>
        <div className="faq-list" data-reveal>{faqs.map(([q, a], i) => <details key={q} open={i === 0}><summary><span className="faq-index">0{i + 1}</span>{q}<span className="faq-plus" aria-hidden="true" /></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="cta section-shell" id="contact" aria-labelledby="cta-heading">
        <div className="cta-card" data-reveal>
          <Image src="/images/maldives-villa.png" alt="An overwater villa at sunset in the Maldives" fill sizes="100vw" />
          <div className="cta-shade" />
          <div className="cta-copy"><span className="script">A whole world is waiting</span><h2 id="cta-heading">Where to <em>next?</em></h2><p>Tell us what you&apos;re dreaming of. We&apos;ll help you find your way there.</p><EnquiryButton className="button button-light">Let&apos;s plan your journey</EnquiryButton></div>
          <div className="cta-notch"><span><TravelIcon kind="pin" size={16} /> Based in the UAE</span><span>At home in the world</span></div>
        </div>
      </section>
    </main>

    <Footer />
  </SiteChrome>;
}
