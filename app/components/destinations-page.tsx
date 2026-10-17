import Image from "./travel-image";
import Link from "next/link";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import { FourThings, MoodIndex, PostcardRail, SeasonRibbon, type Mood, type Postcard, type Season } from "./destinations-interactive";
import { office } from "./data";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./destinations.css";

const moods: Mood[] = [
  { title: "Business & City", text: "Meetings, exhibitions and international city travel.", icon: "briefcase", photo: "/images/library/dubai-marina.webp", alt: "Modern towers and waterfront buildings at Dubai Marina" },
  { title: "Beach & Escape", text: "Island stays, resorts and slower journeys.", icon: "sun", photo: "/images/library/maldives-reef.webp", alt: "Colourful fish and coral beneath the clear Maldivian sea" },
  { title: "Culture & Discovery", text: "Cities, heritage, food and local experiences.", icon: "compass", photo: "/images/library/rome-colosseum.webp", alt: "The ancient Colosseum in Rome beneath a bright sky" },
  { title: "Safari & Nature", text: "Wildlife, landscapes and extraordinary environments.", icon: "leaf", photo: "/images/library/south-africa-safari.webp", alt: "Safari guests watching lions from an open vehicle in South Africa", position: "center" },
  { title: "Family Holidays", text: "Destinations and stays designed around travelling together.", icon: "heart", photo: "/images/library/family-lake.webp", alt: "A parent and child enjoying a lakeside mountain view", position: "center" },
  { title: "Groups & Experiences", text: "Celebrations, incentive travel, friends and organised journeys.", icon: "people", photo: "/images/library/retreat-dinner.webp", alt: "A candlelit retreat dinner on a terrace overlooking the sea", position: "center" },
];

const postcards: Postcard[] = [
  { name: "Kenya", line: "Safari. City. Coast.", region: "East Africa", code: "KE", photo: "/images/library/kenya-game-drive.webp", alt: "A safari vehicle crossing Kenyan grasslands at sunset", position: "center", service: "Africa travel" },
  { name: "Tanzania", line: "Serengeti. Zanzibar. Kilimanjaro.", region: "East Africa", code: "TZ", photo: "/images/library/tanzania-kilimanjaro.webp", alt: "A safari landscape beneath Mount Kilimanjaro in Tanzania", service: "Africa travel" },
  { name: "Uganda", line: "Wildlife. Nature. Adventure.", region: "East Africa", code: "UG", photo: "/images/library/uganda-gorilla.webp", alt: "A mountain gorilla in a green Ugandan forest landscape", service: "Africa travel" },
  { name: "Dubai & UAE", line: "Business. Lifestyle. Experiences.", region: "Middle East", code: "AE", photo: "/images/library/dubai-clouds.webp", alt: "Dubai towers rising above a sea of morning clouds", position: "center", service: "Leisure & holidays" },
  { name: "Maldives", line: "Barefoot luxury. Endless blue.", region: "Indian Ocean", code: "MV", photo: "/images/library/maldives-villas.webp", alt: "Overwater villa decks and pools above a clear Maldivian lagoon", service: "Leisure & holidays" },
  { name: "Europe", line: "Cities. Culture. Escapes.", region: "Europe", code: "EU", photo: "/images/library/florence.webp", alt: "Florence and its cathedral beneath the Tuscan hills", service: "Leisure & holidays" },
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
  { days: "Days 1–2", kind: "Stopover", place: "Dubai", note: "City, skyline and a night in the desert.", icon: "briefcase", photo: "/images/library/dubai-panorama.webp", alt: "Dubai skyline and the Burj Khalifa in clear daylight", position: "center" },
  { days: "Days 3–6", kind: "Safari", place: "Maasai Mara", note: "Game drives from a tented camp.", icon: "leaf", photo: "/images/library/kenya-game-drive.webp", alt: "A safari vehicle crossing Kenyan grasslands at sunset", position: "center" },
  { days: "Days 7–10", kind: "Island", place: "Maldives", note: "An overwater villa and nothing planned.", icon: "sun", photo: "/images/library/maldives-aerial.webp", alt: "An aerial view of overwater villas surrounding a Maldivian island" },
  { days: "Days 11–13", kind: "Lakes", place: "Europe", note: "A slower finish among the mountains.", icon: "mountain", photo: "/images/library/swiss-lake.webp", alt: "A turquoise alpine lake surrounded by Swiss mountain peaks", position: "center" },
];

const seasons: Season[] = [
  { months: "October – December", short: "Oct — Dec", photo: "/images/library/finland-village.webp", alt: "A warmly lit winter village in snowy Finnish Lapland", picks: [
    { place: "Dubai & UAE", note: "Outdoor season" }, { place: "Maldives", note: "Island escapes" }, { place: "Kenya", note: "Safari + coast" }, { place: "Europe", note: "Festive city breaks" },
  ] },
  { months: "January – March", short: "Jan — Mar", photo: "/images/library/maldives-jetty.webp", alt: "A wooden jetty leading across turquoise water to a tropical island", picks: [
    { place: "UAE", note: "City and leisure travel" }, { place: "East Africa", note: "Safari experiences" }, { place: "Maldives", note: "Winter sun" },
  ] },
  { months: "April – June", short: "Apr — Jun", photo: "/images/library/venice.webp", alt: "Venice Grand Canal lined with historic palaces", picks: [
    { place: "Europe", note: "Spring cities and countryside" }, { place: "East Africa", note: "Selected nature experiences" },
  ] },
  { months: "July – September", short: "Jul — Sep", photo: "/images/library/swiss-valley.webp", alt: "Green Swiss alpine meadows and chalets beneath snow-covered peaks", picks: [
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
        <video className="j-photo j-hero-photo" src="/hero.mp4" poster="/images/journey/hero.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content d-hero-content">
          <div className="d-hero-copy">
            <span className="j-eyebrow" data-hero>Destinations</span>
            <h1 id="destinations-hero-heading"><span className="s-line"><span data-hero>Where will your</span></span><span className="s-line"><span data-hero>next journey <em>take you?</em></span></span></h1>
            <p data-hero>Business cities to island escapes, across the Middle East, Africa and beyond.</p>
            <div className="s-actions" data-hero>
              <a className="j-button j-button-cream" href="#featured">Explore destinations <Arrow /></a>
            </div>
          </div>
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
        <div className="d-africa-photo" data-frame><Image src="/images/library/africa-dawn.webp" alt="" fill sizes="60vw" /></div>
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
        <Image className="j-photo s-final-photo" src="/images/library/algarve.webp" alt="" fill sizes="100vw" />
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
