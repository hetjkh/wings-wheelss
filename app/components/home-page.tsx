import Image from "next/image";
import { BusinessLeisure, OurStory, WhatWeDo, WhoWeAre } from "./about-sections";
import { Hero } from "./hero";
import { TravelIcon } from "./icons";
import { Numbers, Services } from "./journeys";
import { Footer } from "./footer";
import { EnquiryButton, SiteChrome } from "./site-controls";
import { Spotlight } from "./spotlight";
import { WorldMap } from "./world-map";

const tickerItems = ["Leisure escapes", "East African safaris", "Corporate travel", "Groups & MICE", "Visas & travel support", "Island getaways", "City breaks"];

export default function HomePage() {
  return <SiteChrome>
    <a className="skip-link" href="#who">Skip to content</a>
    <Hero />
    <main>
      <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0, 1].map(n => <span key={n}>{tickerItems.map(t => <span key={t}>{t}<i>✳</i></span>)}</span>)}</div></div>

      <WhoWeAre />
      <BusinessLeisure />
      <Spotlight />
      <WorldMap />
      <WhatWeDo />
      <Services />
      <Numbers />
      <OurStory />

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
