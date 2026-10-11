import Image from "next/image";
import Link from "next/link";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import { DepartureBoard, FourThings, MoodIndex, PostcardRail, SeasonRibbon, type Mood, type Postcard, type Season } from "./destinations-interactive";
import { office } from "./data";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./destinations.css";

const moods: Mood[] = [
  { title: "Business & City", text: "Meetings, exhibitions and international city travel.", icon: "briefcase", photo: "/images/dubai.jpg", alt: "Dubai's skyline and highway interchanges at sunset" },
  { title: "Beach & Escape", text: "Island stays, resorts and slower journeys.", icon: "sun", photo: "/images/maldives.jpg", alt: "Overwater villas along a turquoise lagoon" },
  { title: "Culture & Discovery", text: "Cities, heritage, food and local experiences.", icon: "compass", photo: "/images/kyoto.jpg", alt: "Travellers in kimono walking a lantern-lit Kyoto street" },
  { title: "Safari & Nature", text: "Wildlife, landscapes and extraordinary environments.", icon: "leaf", photo: "/images/journey/safari.webp", alt: "Elephants on the savannah beneath Kilimanjaro", position: "60% center" },
  { title: "Family Holidays", text: "Destinations and stays designed around travelling together.", icon: "heart", photo: "/images/journey/leisure.webp", alt: "An unhurried afternoon beside a turquoise lagoon", position: "70% center" },
  { title: "Groups & Experiences", text: "Celebrations, incentive travel, friends and organised journeys.", icon: "people", photo: "/images/groups.png", alt: "A group of colleagues walking through an airport together", position: "40% center" },
];

const postcards: Postcard[] = [
  { name: "Kenya", line: "Safari. City. Coast.", region: "East Africa", code: "KE", photo: "/images/kenya-safari.png", alt: "Giraffes on a hillside with Nairobi and the coast beyond", position: "55% center", service: "Africa travel" },
  { name: "Tanzania", line: "Serengeti. Zanzibar. Kilimanjaro.", region: "East Africa", code: "TZ", photo: "/images/tanzania.png", alt: "Elephants crossing the savannah beneath Kilimanjaro", service: "Africa travel" },
  { name: "Uganda", line: "Wildlife. Nature. Adventure.", region: "East Africa", code: "UG", photo: "/images/uganda.png", alt: "Mountain gorillas resting on a forested hillside", service: "Africa travel" },
  { name: "Dubai & UAE", line: "Business. Lifestyle. Experiences.", region: "Middle East", code: "AE", photo: "/images/dubai-terrace.png", alt: "A terrace overlooking the Dubai skyline at sunset", position: "60% center", service: "Leisure & holidays" },
  { name: "Maldives", line: "Barefoot luxury. Endless blue.", region: "Indian Ocean", code: "MV", photo: "/images/maldives-villa.png", alt: "A thatched villa deck and plunge pool above the lagoon", service: "Leisure & holidays" },
  { name: "Europe", line: "Cities. Culture. Escapes.", region: "Europe", code: "EU", photo: "/images/paris.png", alt: "The Eiffel Tower and the Seine at sunset from a Paris terrace", service: "Leisure & holidays" },
];

const cities = [
  { name: "Khartoum", y: 46 },
  { name: "Juba", y: 116 },
  { name: "Kampala", y: 186 },
  { name: "Nairobi", y: 256 },
  { name: "Tanzania", y: 326 },
];
const africaReasons: { icon: IconKind; label: string }[] = [
  { icon: "leaf", label: "Safari" },
  { icon: "briefcase", label: "Business" },
  { icon: "heart", label: "Family" },
  { icon: "people", label: "Groups" },
  { icon: "calendar", label: "MICE" },
  { icon: "route", label: "Regional travel" },
];

const legs: { days: string; kind: string; place: string; note: string; icon: IconKind; photo: string; alt: string; position?: string }[] = [
  { days: "Days 1–2", kind: "Stopover", place: "Dubai", note: "City, skyline and a night in the desert.", icon: "briefcase", photo: "/images/dubai.jpg", alt: "Dubai's skyline at sunset", position: "40% center" },
  { days: "Days 3–6", kind: "Safari", place: "Maasai Mara", note: "Game drives from a tented camp.", icon: "leaf", photo: "/images/kenya.jpg", alt: "A safari vehicle on the grasslands at sunset", position: "35% center" },
  { days: "Days 7–10", kind: "Island", place: "Maldives", note: "An overwater villa and nothing planned.", icon: "sun", photo: "/images/maldives.jpg", alt: "Overwater villas on a turquoise lagoon" },
  { days: "Days 11–13", kind: "Lakes", place: "Europe", note: "A slower finish among the mountains.", icon: "mountain", photo: "/images/lake.jpg", alt: "A wooden boat on an alpine lake", position: "center 70%" },
];

const seasons: Season[] = [
  { months: "October – December", short: "Oct — Dec", photo: "/images/about/leisure-sun.jpg", alt: "A traveller in a sun hat relaxing on a terrace above the sea", picks: [
    { place: "Dubai & UAE", note: "Outdoor season" }, { place: "Maldives", note: "Island escapes" }, { place: "Kenya", note: "Safari + coast" }, { place: "Europe", note: "Festive city breaks" },
  ] },
  { months: "January – March", short: "Jan — Mar", photo: "/images/journey/safari.webp", alt: "Elephants on the savannah beneath Kilimanjaro", picks: [
    { place: "UAE", note: "City and leisure travel" }, { place: "East Africa", note: "Safari experiences" }, { place: "Maldives", note: "Winter sun" },
  ] },
  { months: "April – June", short: "Apr — Jun", photo: "/images/lake.jpg", alt: "A wooden boat on an alpine lake beneath limestone peaks", picks: [
    { place: "Europe", note: "Spring cities and countryside" }, { place: "East Africa", note: "Selected nature experiences" },
  ] },
  { months: "July – September", short: "Jul — Sep", photo: "/images/kenya.jpg", alt: "A safari vehicle crossing the grasslands at sunset", picks: [
    { place: "Kenya & Tanzania", note: "Safari season" }, { place: "Europe", note: "Summer journeys" },
  ] },
];

export default function DestinationsPage() {
  return <ChapterMotion className="destinations-page">
    <a className="skip-link" href="#find">Skip to content</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="find" />
    <main>
      <section className="j-hero s-hero d-hero" id="top" aria-labelledby="destinations-hero-heading">
        <Image className="j-photo j-hero-photo" src="/images/about/hero-lounge.jpg" alt="" fill preload sizes="100vw" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content d-hero-content">
          <div className="d-hero-copy">
            <span className="j-eyebrow" data-hero>Destinations</span>
            <h1 id="destinations-hero-heading"><span className="s-line"><span data-hero>Where will your</span></span><span className="s-line"><span data-hero>next journey</span></span><span className="s-line"><span data-hero><em>take you?</em></span></span></h1>
            <p data-hero>From cities built for business to islands made for switching off, discover destinations across the Middle East, Africa and beyond.</p>
            <div className="s-actions" data-hero>
              <a className="j-button j-button-cream" href="#featured">Explore destinations <Arrow /></a>
            </div>
            <ul className="s-hero-tags" data-hero><li>Business</li><li>Leisure</li><li>Groups</li><li>Experiences</li></ul>
          </div>
          <div className="d-hero-board" data-hero><DepartureBoard /></div>
        </div>
        <a href="#find" className="j-scroll-note">Find your journey <span>↓</span></a>
      </section>

      <section className="d-moods j-torn-top" id="find" aria-labelledby="find-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>01 / Find your journey</span><span>Six ways to begin</span></div>
          <div className="s-split-head">
            <h2 id="find-heading" className="s-title">Sometimes you know where.<br /><span className="d-title-soft">Sometimes you just know why.</span></h2>
            <div>
              <p className="s-lead">Different journeys. Extraordinary places.</p>
              <p className="s-lead-body d-body">Tell us what kind of experience you&apos;re looking for and we&apos;ll help you find the right destination.</p>
            </div>
          </div>
          <MoodIndex moods={moods} />
        </div>
      </section>

      <section className="d-featured j-torn-top" id="featured" data-hscroll aria-labelledby="featured-heading">
        <div className="j-shell">
          <span className="j-eyebrow s-eyebrow">02 / Featured destinations</span>
          <h2 id="featured-heading" className="s-title">Places worth<br />going further for.</h2>
        </div>
        <PostcardRail cards={postcards} />
      </section>

      <section className="d-africa j-torn-top" id="africa" aria-labelledby="africa-heading">
        <div className="d-africa-photo" data-frame><Image src="/images/kenya-safari.png" alt="" fill sizes="60vw" /></div>
        <div className="d-africa-shade" />
        <div className="j-shell d-africa-grid">
          <div className="d-africa-copy">
            <span className="j-eyebrow s-eyebrow">03 / Closer to Africa</span>
            <h2 id="africa-heading" className="s-title">Some of our strongest connections are here.</h2>
            <p className="s-lead-body d-body">Wings &amp; Wheels combines UAE-based travel expertise with an established network across key African markets, helping travellers move between the Middle East, Africa and beyond.</p>
            <Link className="j-button j-button-cream" href="/africa">Discover Africa <Arrow /></Link>
          </div>
          <figure className="d-arcs">
            <svg viewBox="0 0 560 372" role="img" aria-label="Routes from Khartoum, Juba, Kampala, Nairobi and Tanzania to Dubai">
              {cities.map(city => <path key={city.name} data-trace pathLength={1} className="d-arc" d={`M118 ${city.y} C 300 ${city.y}, 360 186, 494 186`} />)}
              {cities.map(city => <g key={`${city.name}-node`} className="d-arc-city">
                <circle cx="118" cy={city.y} r="5" />
                <text x="98" y={city.y + 4} textAnchor="end">{city.name}</text>
              </g>)}
              <g className="d-arc-hub">
                <circle className="d-arc-pulse" cx="494" cy="186" r="9" />
                <circle cx="494" cy="186" r="7" />
                <text x="494" y="160" textAnchor="middle">Dubai</text>
              </g>
            </svg>
          </figure>
        </div>
        <ul className="j-shell d-africa-reasons" data-stagger>{africaReasons.map(item => <li key={item.label}><TravelIcon kind={item.icon} size={26} /><span>{item.label}</span></li>)}</ul>
      </section>

      <section className="d-many j-torn-top" id="combine" aria-labelledby="combine-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>04 / One journey, many experiences</span><span>One example itinerary · 13 days</span></div>
          <div className="s-split-head">
            <h2 id="combine-heading" className="s-title">The destination may be the same.<span className="d-title-soft">The journey shouldn&apos;t be.</span></h2>
            <div>
              <p className="s-lead">Combine destinations, stopovers and experiences into one coordinated itinerary.</p>
              <EnquiryButton className="j-button j-button-olive d-many-cta" service="Leisure & holidays">Plan a multi-destination trip</EnquiryButton>
            </div>
          </div>
          <div className="d-legs">
            <svg className="d-legs-route" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true"><path data-trace pathLength={1} d="M0 20 C 120 4, 160 36, 250 20 S 400 4, 500 20 S 640 36, 750 20 S 880 4, 1000 20" /></svg>
            <ol>{legs.map((leg, i) => <li key={leg.place} className="d-leg">
              <div className="d-leg-photo" data-frame><Image src={leg.photo} alt={leg.alt} fill sizes="(max-width: 600px) 92vw, (max-width: 991px) 46vw, 23vw" style={leg.position ? { objectPosition: leg.position } : undefined} /></div>
              <div className="d-leg-shade" />
              <span className="d-leg-stop" aria-hidden="true"><TravelIcon kind={leg.icon} size={18} /></span>
              <div className="d-leg-copy">
                <span className="d-leg-days">{String(i + 1).padStart(2, "0")} · {leg.days}</span>
                <h3><span>{leg.kind}</span>{leg.place}</h3>
                <p>{leg.note}</p>
              </div>
            </li>)}</ol>
          </div>
        </div>
      </section>

      <section className="d-seasons j-torn-top" id="seasons" data-steps={seasons.length} aria-labelledby="seasons-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>05 / Where to go, and when</span><span>A travel year, from October</span></div>
          <div className="s-split-head">
            <h2 id="seasons-heading" className="s-title">Seasonal<br />highlights.</h2>
            <div>
              <p className="s-lead">The right destination at the right time.</p>
              <p className="s-lead-body d-body">A quick guide to some of our favourite travel periods.</p>
            </div>
          </div>
          <SeasonRibbon seasons={seasons} />
        </div>
      </section>

      <section className="d-four j-torn-top" id="ideas" aria-labelledby="ideas-heading">
        <div className="j-shell d-four-grid">
          <div className="d-four-copy">
            <span className="j-eyebrow s-eyebrow">06 / Not sure where to go?</span>
            <h2 id="ideas-heading" className="s-title">Tell us<br />four things.</h2>
            <p className="s-lead-body d-body">Just a few details to get started — and we&apos;ll help you find the right destination for your next journey.</p>
            <EnquiryButton className="j-button j-button-outline-light" service="Leisure & holidays">Get destination ideas</EnquiryButton>
          </div>
          <FourThings />
        </div>
      </section>

      <section className="s-final d-final j-torn-top" aria-labelledby="final-heading">
        <Image className="j-photo s-final-photo" src="/images/santorini.jpg" alt="" fill sizes="100vw" />
        <div className="s-final-shade" />
        <div className="j-shell s-final-content d-final-content">
          <span className="j-eyebrow">Your next destination</span>
          <h2 id="final-heading">Some journeys start with a place.<br /><span>Others start with an idea.</span></h2>
          <p className="s-lead-body">Tell us where you&apos;re thinking of going — or simply what you&apos;re looking for — and we&apos;ll help take it from there.</p>
          <div className="s-actions">
            <EnquiryButton className="j-button j-button-cream">Start planning</EnquiryButton>
            <a className="j-button j-button-outline-light" href={office.whatsapp} target="_blank" rel="noreferrer"><TravelIcon kind="chat" size={16} />WhatsApp us</a>
          </div>
        </div>
        <svg className="d-seal" viewBox="0 0 200 200" aria-hidden="true">
          <defs><path id="d-seal-ring" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" /></defs>
          <circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="58" />
          <text><textPath href="#d-seal-ring">Wings &amp; Wheels · Your next destination · </textPath></text>
          <text className="d-seal-mark" x="100" y="112" textAnchor="middle">W</text>
        </svg>
      </section>
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
