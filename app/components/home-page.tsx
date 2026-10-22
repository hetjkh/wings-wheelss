import Image from "./travel-image";
import Link from "next/link";
import { office, pageLinks } from "./data";
import { HomeExperience, HomeHeader } from "./home-experience";
import { MaskedHero } from "./masked-hero";
import { HomeServices } from "./home-services";
import { HomeEditorial } from "./home-editorial";
import "./home.css";
import "./home-editorial.css";

function PaperEdge({ position = "bottom", variant = "default", className = "" }: { position?: "top" | "bottom"; variant?: "default" | "travel"; className?: string }) {
  return <div className={`n-edge n-edge-${position} n-edge-${variant} ${className}`} aria-hidden="true" />;
}

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
        media={{ video: "/hero.mp4" }}
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
              <div className="n-panel-shade" /><span className="n-panel-note">01 / Make time for yourself</span>
              <div className="n-panel-copy"><div><Link href="/destinations" className="n-button n-button-white">Explore <span>↗</span></Link><h3>Private<br />travel</h3></div><p>Unhurried escapes for individuals and families. Your kind of places, your own pace, every detail considered.</p></div>
            </article>
            <article className="n-travel-panel">
              <div className="n-panel-photo"><Image src="/images/library/home-corporate-team.webp" alt="Business colleagues walking through a bright hotel lobby" fill sizes="(max-width: 767px) 100vw, 50vw" className="n-cover" /></div>
              <div className="n-panel-shade" /><span className="n-panel-note">02 / Focus on what brings you here</span>
              <div className="n-panel-copy"><div><Link href="/corporate-travel" className="n-button n-button-white">Explore <span>↗</span></Link><h3>Corporate<br />travel</h3></div><p>Well-connected travel for businesses and their people. From the first meeting to the journey home.</p></div>
            </article>
          </div>
          <PaperEdge variant="travel" />
        </section>
      </div>

      <HomeEditorial />
    </main>
    <footer className="n-footer"><div className="n-shell"><div className="n-footer-main"><Link href="/" className="n-brand">Wings & Wheels</Link><nav aria-label="Footer navigation">{pageLinks.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav><div><a href={`mailto:${office.email}`}>{office.email}</a><a href={office.phones[0].href}>{office.phones[0].label}</a></div></div><div className="n-footer-bottom"><span>© {new Date().getFullYear()} Wings & Wheels Travel and Tourism LLC</span><span>Dubai, UAE</span><a href="#top">Back to top ↑</a></div></div></footer>
  </HomeExperience>;
}
