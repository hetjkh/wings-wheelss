import { SectionEdges } from "./section-edges";
import Image from "./travel-image";
import Link from "next/link";
import { Arrow, TravelIcon } from "./icons";
import { HomeStories } from "./home-stories";
import { HomeClientele } from "./home-clientele";
import { HomeTestimonials } from "./home-testimonials";
import { HomePayLater } from "./home-pay-later";
import { HomeFaq } from "./home-faq";

function ChapterLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <span className="e-label" data-motion-reveal><span>{number}</span><span>{children}</span></span>;
}

function Lines({ lines }: { lines: string[] }) {
  return <>{lines.map(line => <span className="e-line" key={line}><span>{line}</span></span>)}</>;
}

const network = [{ country: "Kenya", city: "Nairobi", code: "NBO" }, { country: "Tanzania", city: "Dar es Salaam", code: "DAR" }, { country: "Uganda", city: "Kampala", code: "EBB" }, { country: "Sudan", city: "Khartoum", code: "KRT" }, { country: "South Sudan", city: "Juba", code: "JUB" }];

function AfricaChapter() {
  return <section className="e-africa" aria-labelledby="e-africa-title">
    <div className="e-africa-landscape">
      <div className="e-africa-photo" data-editorial-parallax="8" data-motion-image><Image reveal src={"/images/library/africa-dawn.webp"} alt="An elephant crossing golden Kenyan grasslands beneath an acacia tree" fill sizes="100vw" className="n-cover" /></div>
      <div className="e-africa-shade" />
      <div className="e-shell e-africa-top"><ChapterLabel number="01">Our home is Dubai. Our heart goes further.</ChapterLabel><span className="n-kicker">UAE ↔ Africa</span></div>
      <div className="e-shell e-africa-title"><span className="n-kicker">A world of connections. A deeper connection.</span><h2 id="e-africa-title" data-editorial-title><Lines lines={["Africa.", "Feel closer."]} /></h2></div>
      <div className="e-africa-fieldnote" data-motion-reveal><span className="e-field-cross" aria-hidden="true">+</span><span>Room to feel small.<br />A world to feel part of.</span></div>
      <div className="e-africa-bottom e-shell" data-motion-stagger><p>For the wild.<br />For the work.<br />For the welcome home.</p><span className="n-kicker">Local knowledge.<br />Extraordinary possibilities.</span></div>
    </div>
    <div className="e-africa-network e-shell">
      <div className="e-network-intro"><span className="n-kicker">On the ground. By your side.</span><h3 data-motion-text>More than a place<br />on the map.</h3><p data-motion-reveal>Business weeks in Nairobi, time out on the savannah, and long-awaited journeys home. People who understand the places make all the difference.</p><Link href="/africa" className="n-panel-cta e-network-cta" data-motion-reveal><span>Explore our Africa network</span><span className="n-panel-cta-dot"><Arrow /></span></Link></div>
      <div className="e-network-routes"><div className="e-network-origin" data-motion-reveal><span>DXB</span><i aria-hidden="true" /><span>Our African connections</span></div><ul>{network.map((place, i) => <li key={place.country} data-editorial-reveal><span className="e-network-no">0{i + 1}</span><strong>{place.country}</strong><span>{place.city}</span><span className="e-airport-code">{place.code}</span></li>)}</ul></div>
    </div>
  </section>;
}

const places = [
  { name: "Kenya", line: "Answer the call of the wild.", region: "East Africa", photo: "/images/library/home-kenya-amboseli-v2.webp", alt: "An elephant and calf in Kenya's golden Amboseli grasslands with Mount Kilimanjaro in the distance", href: "/africa", position: "center" },
  { name: "Maldives", line: "Make room for absolutely nothing.", region: "Indian Ocean", photo: "/images/library/maldives-villas.webp", alt: "Overwater villa decks and pools above a clear Maldivian lagoon", href: "/destinations", position: "center" },
  { name: "Europe", line: "Take the beautiful way around.", region: "The Mediterranean", photo: "/images/library/amalfi-coast.webp", alt: "Colourful houses climbing the cliffs above the Amalfi Coast", href: "/destinations", position: "center" },
  { name: "Japan", line: "Find wonder in the little things.", region: "East Asia", photo: "/images/library/kyoto-golden-pavilion.webp", alt: "The Golden Pavilion reflecting in a still garden pond in Kyoto", href: "/destinations", position: "center" },
];

function DestinationChapter() {
  return <section className="e-destinations" aria-labelledby="e-destinations-title">
    <div className="e-destinations-pin">
      <div className="e-shell e-destination-heading"><div><h2 id="e-destinations-title" data-editorial-title><Lines lines={["Somewhere new."]} /></h2></div><div><p data-motion-reveal>A different view. A slower morning.<br />A story you’ll tell for years.</p><Link href="/destinations" className="n-panel-cta n-panel-cta-dark e-destination-cta" data-motion-reveal><span>All destinations</span><span className="n-panel-cta-dot"><Arrow /></span></Link></div></div>
      <div className="e-destination-window"><div className="e-destination-track">
        {places.map((place, index) => <Link className="e-destination" key={place.name} href={place.href} data-cursor="Explore">
          <div className="e-destination-frame">
            <div className="e-destination-photo" data-motion-image><Image reveal src={place.photo} alt={place.alt} fill sizes="(max-width: 800px) 90vw, 43vw" className="n-cover" style={{ objectPosition: place.position }} /></div>
            <span className="e-destination-number">0{index + 1}</span><span className="e-destination-arrow" aria-hidden="true">↗</span><span className="e-destination-region">{place.region}</span>
          </div>
          <div className="e-destination-caption" data-motion-stagger><h3>{place.name}</h3><p>{place.line}</p></div>
        </Link>)}
      </div></div>
      <div className="e-shell e-destination-footer" data-motion-stagger><span className="n-kicker">Your next chapter is out there</span><div className="e-destination-progress" aria-hidden="true"><span /></div><span className="e-drag-note n-kicker">Keep exploring <span aria-hidden="true">→</span></span></div>
    </div>
  </section>;
}

function GroupsChapter() {
  return <section className="e-together" aria-labelledby="e-together-title" data-home-cover>
    <SectionEdges />
    <div className="e-together-hero">
      <div className="e-together-photo" data-editorial-parallax="7" data-motion-image><Image reveal src={"/images/library/home-better-together-retreat-v1.webp"} alt="Colleagues sharing a candlelit retreat dinner on a coastal terrace at sunset" fill sizes="100vw" className="n-cover" /></div>
      <div className="e-together-shade" />
      <div className="e-shell e-together-content"><ChapterLabel number="03">Groups, meetings & shared moments</ChapterLabel><h2 id="e-together-title" data-editorial-title><Lines lines={["Better", "together."]} /></h2><div className="e-together-caption" data-motion-stagger><span>One shared experience.<br />A thousand reasons to remember.</span><Link href="/groups-mice" className="n-panel-cta"><span>Bring your people</span><span className="n-panel-cta-dot"><Arrow /></span></Link></div></div>
    </div>
    <div className="e-together-details"><div className="e-shell"><div className="e-together-intro"><h3 data-editorial-title><Lines lines={["You bring the people.", "We bring the plan."]} /></h3><div><p data-motion-reveal>Flights from different cities. Rooms for the whole team. Every arrival, every transfer, every moment in between.</p><Link href="/groups-mice" className="n-panel-cta n-panel-cta-dark e-together-cta" data-motion-reveal><span>Discover groups & MICE</span><span className="n-panel-cta-dot"><Arrow /></span></Link></div></div><ul className="e-together-types" data-motion-stagger><li>01<span>Meetings & conferences</span></li><li>02<span>Team escapes</span></li><li>03<span>Exhibitions & events</span></li><li>04<span>Shared celebrations</span></li></ul></div></div>
  </section>;
}

export function HomeEditorial() {
  return <><AfricaChapter /><DestinationChapter /><HomeStories /><GroupsChapter /><HomeClientele /><HomeTestimonials /><HomePayLater /><HomeFaq /></>;
}
