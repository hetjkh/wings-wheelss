import Image from "./travel-image";
import Link from "next/link";
import { Arrow } from "./icons";
import { JourneyFooter } from "./journey-footer";
import { ServicesFinal } from "./services-final";
import { HomeExperience, HomeHeader } from "./home-experience";
import { MaskedHero } from "./masked-hero";
import { HomeServices } from "./home-services";
import { HomeEditorial } from "./home-editorial";
import "./home.css";
import "./home-editorial.css";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./home-ending.css";

export default function HomePage() {
  return <HomeExperience>
    <a className="skip-link" href="#home-services">Skip to content</a>
    <HomeHeader />
    <main>
      <MaskedHero
        id="home-title"
        eyebrow="Wings & Wheels · Dubai & beyond"
        lines={["Every journey.", "A world of", "possibilities."]}
        text="Business, leisure and everything in between. Thoughtfully planned. Personally supported."
        action={{ label: "Plan your journey", href: "/contact" }}
        settle="bottom"
        media={{ video: "/hero-v4-continuous.mp4" }}
      />

      <HomeServices />

      <div className="n-travel-chapter">
        <section className="n-travel-heading" aria-labelledby="travel-title">
          <div className="n-travel-heading-surface">
            <div className="n-travel-heading-grid" aria-hidden="true" />
            <div className="n-travel-heading-map" aria-hidden="true" />
            <h2 id="travel-title">Travel designed<br />around you</h2>
          </div>
        </section>

        <section className="n-travel" aria-labelledby="travel-title">
          <div className="n-travel-pair">
            <article className="n-travel-panel">
              <div className="n-panel-photo"><Image src="/images/library/palm-beach.webp" alt="Palm trees along a white Maldivian beach beside pale blue water" fill sizes="(max-width: 767px) 100vw, 50vw" className="n-cover" /></div>
              <div className="n-panel-shade" />
              <div className="n-panel-copy">
                <Link href="/destinations" className="n-panel-cta"><span>Explore</span><span className="n-panel-cta-dot"><Arrow /></span></Link>
                <h3>Private travel</h3>
              </div>
            </article>
            <article className="n-travel-panel">
              <div className="n-panel-photo"><Image src="/images/library/home-corporate-team.webp" alt="Business colleagues walking through a bright hotel lobby" fill sizes="(max-width: 767px) 100vw, 50vw" className="n-cover" /></div>
              <div className="n-panel-shade" />
              <div className="n-panel-copy">
                <Link href="/corporate-travel" className="n-panel-cta"><span>Explore</span><span className="n-panel-cta-dot"><Arrow /></span></Link>
                <h3>Corporate travel</h3>
              </div>
            </article>
          </div>
        </section>
      </div>

      <HomeEditorial />
      <div className="journey-page services-page home-ending"><ServicesFinal /></div>
    </main>
    <div className="journey-page home-ending"><JourneyFooter /></div>
  </HomeExperience>;
}
