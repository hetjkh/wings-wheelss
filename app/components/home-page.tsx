import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import { office, pageLinks } from "./data";
import { HomeExperience, HomeHeader } from "./home-experience";
import { HomeServices } from "./home-services";
import { HomeEditorial } from "./home-editorial";
import "./home.css";
import "./home-editorial.css";

export default function HomePage() {
  return <HomeExperience>
    <a className="skip-link" href="#home-services">Skip to content</a>
    <HomeHeader />
    <main>
      <section className="n-hero" id="top" aria-labelledby="home-title">
        <div className="n-hero-visual"><video className="n-cover" src="/hero.mp4" poster="/images/journey/hero.webp" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" /></div>
        <div className="n-hero-shade" />
        <div className="n-hero-copy">
          <span className="n-kicker">Wings & Wheels · Dubai & beyond</span>
          <h1 id="home-title">Every journey.<br />A world of<br />possibilities.</h1>
          <p>Business, leisure and everything in between.<br />Thoughtfully planned. Personally supported.</p>
          <Link href="/contact" className="n-button n-button-cream">Plan your journey <Arrow /></Link>
        </div>
        <div className="n-hero-caption n-shell"><span>People. Places. Further together.</span><a href="#home-services">Scroll to explore <span>↓</span></a><span>From our home in Dubai, to your next horizon.</span></div>
      </section>

      <HomeServices />

      <div className="n-story-scene">
      <section className="n-intro" id="home-story" aria-labelledby="intro-title">
        <div className="n-shell n-intro-inner">
          <div className="n-intro-top" data-home-reveal>
            <span className="n-kicker">A little about us</span>
            <span className="n-kicker">Dubai · Since 2013</span>
          </div>

          <h2 id="intro-title" className="n-intro-title" data-home-reveal>
            <span className="n-intro-line">
              <span>Travel is about</span>
              <span className="n-intro-photo">
                <Image src="/images/about/leisure-sun.jpg" alt="" fill sizes="160px" className="n-cover" />
              </span>
              <span className="n-intro-soft">places.</span>
            </span>
            <span className="n-intro-line n-intro-line-end">
              <span>We’re about</span>
              <span className="n-intro-photo n-intro-photo-people">
                <Image src="/images/about/team.jpg" alt="A travel consultant planning the details of a journey" fill sizes="140px" className="n-cover" />
              </span>
              <span>people.</span>
            </span>
          </h2>

          <div className="n-intro-detail">
            <p className="n-intro-lead" data-home-reveal>
              Some journeys take you somewhere new.<br />
              Others bring you closer to what matters.
            </p>
            <div data-home-reveal>
              <p className="n-intro-body">
                From a meeting in another city to a holiday you’ve been dreaming of, we bring the moving parts together. Flights, hotels, visas and transfers — with a real team by your side.
              </p>
              <Link href="/about" className="n-button" data-home-reveal>Our story <Arrow /></Link>
            </div>
          </div>

          <ul className="n-intro-route" aria-label="Where we work from">
            <li data-home-reveal><span>01</span><strong>Based in the UAE</strong></li>
            <li data-home-reveal><span>02</span><strong>Connected across Africa</strong></li>
            <li data-home-reveal><span>03</span><strong>Open to the world</strong></li>
          </ul>
        </div>
      </section>

      <section className="n-travel-heading" aria-labelledby="travel-title">
        <div className="n-travel-heading-surface">
          <div className="n-travel-heading-grid" aria-hidden="true" />
          <div className="n-travel-heading-map" aria-hidden="true" />
          <h2 id="travel-title">Travel designed<br />around you</h2>
        </div>
      </section>
      </div>

      <section className="n-travel" aria-labelledby="travel-title">
        <div className="n-travel-pair">
          <article className="n-travel-panel">
            <div className="n-panel-photo"><Image src="/images/home/private-travel.webp" alt="Ivory sun loungers and a parasol beside the golden Mediterranean sea" fill sizes="(max-width: 767px) 100vw, 50vw" className="n-cover" /></div>
            <div className="n-panel-shade" /><span className="n-panel-note">01 / Make time for yourself</span>
            <div className="n-panel-copy"><div><Link href="/destinations" className="n-button n-button-white">Explore <span>↗</span></Link><h3>Private<br />travel</h3></div><p>Unhurried escapes for individuals and families. Your kind of places, your own pace, every detail considered.</p></div>
          </article>
          <article className="n-travel-panel">
            <div className="n-panel-photo"><Image src="/images/home/corporate-travel.webp" alt="A businesswoman walking along a sunlit marina lined with sailing yachts" fill sizes="(max-width: 767px) 100vw, 50vw" className="n-cover" /></div>
            <div className="n-panel-shade" /><span className="n-panel-note">02 / Focus on what brings you here</span>
            <div className="n-panel-copy"><div><Link href="/corporate-travel" className="n-button n-button-white">Explore <span>↗</span></Link><h3>Corporate<br />travel</h3></div><p>Well-connected travel for businesses and their people. From the first meeting to the journey home.</p></div>
          </article>
        </div>
      </section>

      <HomeEditorial />
    </main>
    <footer className="n-footer"><div className="n-shell"><div className="n-footer-main"><Link href="/" className="n-brand">Wings & Wheels</Link><nav aria-label="Footer navigation">{pageLinks.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav><div><a href={`mailto:${office.email}`}>{office.email}</a><a href={office.phones[0].href}>{office.phones[0].label}</a></div></div><div className="n-footer-bottom"><span>© {new Date().getFullYear()} Wings & Wheels Travel and Tourism LLC</span><span>Dubai, UAE</span><a href="#top">Back to top ↑</a></div></div></footer>
  </HomeExperience>;
}
