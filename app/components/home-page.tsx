import dynamic from "next/dynamic";
import Image from "./travel-image";
import Link from "next/link";
import { Arrow } from "./icons";
import { HomeExperience, HomeHeader } from "./home-experience";
import { MaskedHero } from "./masked-hero";
import { HomeServices } from "./home-services";
import { HomeEditorial } from "./home-editorial";
import "./home.css";

const HomeClosing = dynamic(() => import("./home-closing"));

export default function HomePage() {
  return <HomeExperience>
    <a className="skip-link" href="#home-services">Skip to content</a>
    <HomeHeader />
    <main>
      <MaskedHero
        id="home-title"
        eyebrow="Wings & Wheels · Dubai & beyond"
        lines={["Every journey.", "New possibilities."]}
        sub="Thoughtfully planned."
        text="Business, leisure and everything in between — personally supported."
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
            <h2 id="travel-title" data-motion-text>Travel designed<br />around you</h2>
          </div>
        </section>

        <section className="n-travel" aria-labelledby="travel-title">
          <div className="n-travel-pair">
            <article className="n-travel-panel">
              <div className="n-panel-photo" data-motion-image><Image reveal src="/images/library/palm-beach.webp" alt="Palm trees along a white Maldivian beach beside pale blue water" fill sizes="(max-width: 767px) 250vw, 80vw" quality={100} className="n-cover" /></div>
              <div className="n-panel-shade" />
              <div className="n-panel-copy">
                <Link href="/destinations" className="n-panel-cta"><span>Explore</span><span className="n-panel-cta-dot"><Arrow /></span></Link>
                <h3 data-motion-text>Private travel</h3>
              </div>
            </article>
            <article className="n-travel-panel">
              <div className="n-panel-photo" data-motion-image><Image reveal src="/images/library/home-corporate-team.webp" alt="Business colleagues walking through a bright hotel lobby" fill sizes="(max-width: 767px) 250vw, 80vw" quality={100} className="n-cover" /></div>
              <div className="n-panel-shade" />
              <div className="n-panel-copy">
                <Link href="/corporate-travel" className="n-panel-cta"><span>Explore</span><span className="n-panel-cta-dot"><Arrow /></span></Link>
                <h3 data-motion-text>Corporate travel</h3>
              </div>
            </article>
          </div>
        </section>
      </div>

      <HomeEditorial />
    </main>
    <HomeClosing />
  </HomeExperience>;
}
