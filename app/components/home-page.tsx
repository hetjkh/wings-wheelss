import Image from "next/image";
import Link from "next/link";
import { Arrow, TravelIcon } from "./icons";
import { office, pageLinks } from "./data";
import { HomeExperience, HomeHeader, HomeServices, HomePromises } from "./home-experience";
import { AfricaGlobe } from "./africa-globe";
import { HomeStories } from "./home-stories";
import "./home.css";
import "./home-chapters.css";

function PaperEdge({ position = "bottom", variant = "default", className = "" }: { position?: "top" | "bottom"; variant?: "default" | "travel"; className?: string }) {
  return <div className={`n-edge n-edge-${position} n-edge-${variant} ${className}`} aria-hidden="true" />;
}

const destinations = [
  { title: "Kenya", subtitle: "The call of the wild", image: "/images/kenya.jpg", href: "/africa", alt: "A safari vehicle on the Kenyan savannah at sunset" },
  { title: "Maldives", subtitle: "A little further from everyday", image: "/images/maldives-villa.png", href: "/destinations", alt: "A Maldivian villa above the ocean at sunset" },
  { title: "Europe", subtitle: "Follow a different rhythm", image: "/images/santorini.jpg", href: "/destinations", alt: "The white terraces of Santorini overlooking the sea" },
];

const africaKinds = [
  { label: "Business journeys", icon: "briefcase" },
  { label: "Safaris", icon: "sun" },
  { label: "Journeys home", icon: "return" },
] as const;
const africaCountries = [
  { country: "Kenya", city: "Nairobi" },
  { country: "Tanzania", city: "Dar es Salaam" },
  { country: "Uganda", city: "Kampala" },
  { country: "Sudan", city: "Khartoum" },
  { country: "South Sudan", city: "Juba" },
];
const moments = [
  { label: "Conferences", image: "/images/groups.png", alt: "A business team walking through the airport together" },
  { label: "Exhibitions", image: "/images/corporate.png", alt: "Travellers crossing an airport terminal at sunset" },
  { label: "Team escapes", image: "/images/journey/team.webp", alt: "Friends sharing a view over the mountains at sunset" },
  { label: "Celebrations", image: "/images/dubai-terrace.png", alt: "A guest on a terrace overlooking the Dubai skyline at sunset" },
];

export default function HomePage() {
  return <HomeExperience>
    <a className="skip-link" href="#home-story">Skip to content</a>
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
        <div className="n-hero-caption n-shell"><span>People. Places. Further together.</span><a href="#home-story">Scroll to explore <span>↓</span></a><span>From our home in Dubai, to your next horizon.</span></div>
      </section>

      <div className="n-story-scene">
        <div className="n-story-background" aria-hidden="true">
          <Image src="/images/about/coast-road.jpg" alt="" fill sizes="100vw" className="n-cover" />
          <div className="n-story-shade" />
        </div>
      <section className="n-intro" id="home-story" aria-labelledby="intro-title">
        <div className="n-shell n-intro-inner">
          <span className="n-kicker" data-home-reveal>A little about us</span>
          <h2 id="intro-title" data-home-reveal>Travel is about places.<br /><span>We’re about people.</span></h2>
          <p className="n-intro-lead" data-home-reveal>Some journeys take you somewhere new.<br />Others bring you closer to what matters.</p>
          <p className="n-intro-body" data-home-reveal>From a meeting in another city to a holiday you’ve been dreaming of, we bring the moving parts together. Flights, hotels, visas and transfers — with a real team by your side.</p>
          <Link href="/about" className="n-button n-button-white" data-home-reveal>Our story <Arrow /></Link>
          <div className="n-intro-bottom"><span>Based in the UAE</span><span>Connected across Africa</span><span>Open to the world</span></div>
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
        <PaperEdge variant="travel" />
      </section>

      <HomeServices />

      <section className="h-africa" aria-labelledby="africa-title">
        <div className="n-shell h-africa-inner">
          <div className="h-africa-copy">
            <span className="n-kicker">Our home is Dubai. Our connections go further.</span>
            <h2 id="africa-title" data-home-reveal>Africa.<br />Closer than<br />you think.</h2>
            <p>Local knowledge and regional connections, with people who understand the places.</p>
            <ul className="h-africa-kinds">{africaKinds.map(kind => <li key={kind.label}><TravelIcon kind={kind.icon} size={18} />{kind.label}</li>)}</ul>
            <Link href="/africa" className="n-button">Discover our Africa network <Arrow /></Link>
          </div>
          <figure className="h-africa-globe" data-home-reveal>
            <AfricaGlobe />
            <figcaption className="h-africa-badge"><span>From Dubai to</span><strong>5 countries</strong></figcaption>
          </figure>
          <ol className="h-africa-countries">{africaCountries.map((place, i) => <li key={place.country}><span>0{i + 1}</span><strong>{place.country}</strong><em>{place.city}</em></li>)}</ol>
        </div>
      </section>

      <section className="h-postcards" aria-labelledby="destinations-title">
        <div className="n-shell h-postcards-grid">
          <div className="h-postcards-head">
            <span className="n-kicker">Where will your curiosity take you?</span>
            <h2 id="destinations-title" data-home-reveal>A change of scene.<br />A new perspective.</h2>
            <Link href="/destinations" className="n-button">All destinations <Arrow /></Link>
          </div>
          {destinations.map((d, i) => <Link className={`h-postcard h-postcard-${i + 1}`} key={d.title} href={d.href}>
            <span className="h-postcard-photo"><Image src={d.image} alt={d.alt} fill sizes="(max-width: 767px) 92vw, 34vw" className="n-cover" /></span>
            <span className="h-postcard-back">
              <span className="h-postcard-stamp"><b>0{i + 1}</b>{d.title}</span>
              <strong>{d.title}</strong>
              <em>{d.subtitle}</em>
              <span className="h-postcard-lines" aria-hidden="true" />
              <span className="h-postcard-mark">From Dubai <span aria-hidden="true">↗</span></span>
            </span>
          </Link>)}
        </div>
      </section>

      <HomeStories />

      <section className="h-groups" aria-labelledby="groups-title">
        <div className="n-shell h-groups-stage">
          {moments.map((m, i) => <figure key={m.label} className={`h-moment h-moment-${i + 1}`}><span><Image src={m.image} alt={m.alt} fill sizes="(max-width: 767px) 45vw, 24vw" className="n-cover" /></span><figcaption>{m.label}</figcaption></figure>)}
          <div className="h-groups-copy" data-home-reveal>
            <span className="n-kicker">Groups, meetings &amp; shared moments</span>
            <h2 id="groups-title">Good things<br />happen together.</h2>
            <p>Conferences, exhibitions, team escapes and celebrations, so your people can simply be there.</p>
            <ol className="h-groups-flow" aria-label="What we connect"><li>Arrivals</li><li>Stays</li><li>Every moment in between</li></ol>
            <Link href="/groups-mice" className="n-button">Groups &amp; MICE <Arrow /></Link>
          </div>
        </div>
      </section>

      <HomePromises />

      <section className="n-contact" aria-labelledby="contact-title"><div className="n-shell"><span className="n-kicker">Every great journey starts somewhere</span><div className="n-contact-line"><h2 id="contact-title" data-home-reveal>Let’s make<br />your next move.</h2><Link href="/contact" className="n-contact-arrow" aria-label="Contact our travel team">↗</Link></div><div className="n-contact-bottom"><p>A destination in mind? A plan taking shape?<br />Tell us your story. We’ll help with the journey.</p><a href={office.whatsapp} target="_blank" rel="noreferrer" className="n-button n-button-white"><TravelIcon kind="chat" size={18} />WhatsApp our team</a></div></div></section>
    </main>
    <footer className="n-footer"><div className="n-shell"><div className="n-footer-main"><Link href="/" className="n-brand">Wings & Wheels</Link><nav aria-label="Footer navigation">{pageLinks.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav><div><a href={`mailto:${office.email}`}>{office.email}</a><a href={office.phones[0].href}>{office.phones[0].label}</a></div></div><div className="n-footer-bottom"><span>© {new Date().getFullYear()} Wings & Wheels Travel and Tourism LLC</span><span>Dubai, UAE</span><a href="#top">Back to top ↑</a></div></div></footer>
  </HomeExperience>;
}
