import Image from "./travel-image";
import Link from "next/link";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import { MaskedHero } from "./masked-hero";
import { ClosingScene } from "./services-final";
import { FourThings, MoodIndex, PostcardRail, SeasonRibbon, type Mood, type Postcard, type Season } from "./destinations-interactive";
import { DubaiTrips } from "./destination-dubai-trips";
import { DestinationConnections, DestinationPlanning } from "./destination-additions";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./destinations.css";
import "./destinations-additions.css";

const moods: Mood[] = [
  { title: "Business & City", text: "Meetings, exhibitions and international city travel.", icon: "briefcase", photo: "/images/library/dubai-marina.webp", alt: "Modern towers and waterfront buildings at Dubai Marina" },
  { title: "Beach & Escape", text: "Island stays, resorts and slower journeys.", icon: "sun", photo: "/images/library/maldives-reef.webp", alt: "Colourful fish and coral beneath the clear Maldivian sea" },
  { title: "Culture & Discovery", text: "Cities, heritage, food and local experiences.", icon: "compass", photo: "/images/library/destinations-rome.webp", alt: "The Colosseum in Rome in warm evening light" },
  { title: "Safari & Nature", text: "Wildlife, landscapes and extraordinary environments.", icon: "leaf", photo: "/images/library/south-africa-safari.webp", alt: "Safari guests watching lions from an open vehicle in South Africa", position: "center" },
  { title: "Family Holidays", text: "Destinations and stays designed around travelling together.", icon: "heart", photo: "/images/library/family-lake.webp", alt: "A parent and child enjoying a lakeside mountain view", position: "center" },
  { title: "Groups & Experiences", text: "Celebrations, incentive travel, friends and organised journeys.", icon: "people", photo: "/images/library/retreat-dinner.webp", alt: "A candlelit retreat dinner on a terrace overlooking the sea", position: "center" },
];

const postcards: Postcard[] = [
  { name: "Kenya", href: "/destinations/kenya", line: "Safari. City. Coast.", region: "East Africa", code: "KE", photo: "/images/library/kenya-game-drive.webp", alt: "A safari vehicle crossing Kenyan grasslands at sunset", position: "center", service: "Africa travel" },
  { name: "Tanzania", href: "/destinations/tanzania", line: "Serengeti. Zanzibar. Kilimanjaro.", region: "East Africa", code: "TZ", photo: "/images/library/tanzania-kilimanjaro.webp", alt: "A safari landscape beneath Mount Kilimanjaro in Tanzania", service: "Africa travel" },
  { name: "Uganda", href: "/destinations/uganda", line: "Wildlife. Nature. Adventure.", region: "East Africa", code: "UG", photo: "/images/library/uganda-gorilla.webp", alt: "A mountain gorilla in a green Ugandan forest landscape", service: "Africa travel" },
  { name: "Dubai & UAE", href: "/destinations/dubai-uae", line: "Business. Lifestyle. Experiences.", region: "Middle East", code: "AE", photo: "/images/library/dubai-clouds.webp", alt: "Dubai towers rising above a sea of morning clouds", position: "center", service: "Leisure & holidays" },
  { name: "Maldives", href: "/destinations/maldives", line: "Barefoot luxury. Endless blue.", region: "Indian Ocean", code: "MV", photo: "/images/library/maldives-villas.webp", alt: "Overwater villa decks and pools above a clear Maldivian lagoon", service: "Leisure & holidays" },
  { name: "Europe", href: "/destinations/europe", line: "Cities. Culture. Escapes.", region: "Europe", code: "EU", photo: "/images/library/destinations-venice.webp", alt: "Gondolas moored on Venice Grand Canal at sunset", service: "Leisure & holidays" },
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


const seasons: Season[] = [
  { months: "October – December", short: "Oct — Dec", photo: "/images/library/finland-village.webp", alt: "A warmly lit winter village in snowy Finnish Lapland", picks: [
    { place: "Dubai & UAE", note: "Outdoor season" }, { place: "Maldives", note: "Island escapes" }, { place: "Kenya", note: "Safari + coast" }, { place: "Europe", note: "Festive city breaks" },
  ] },
  { months: "January – March", short: "Jan — Mar", photo: "/images/library/maldives-jetty.webp", alt: "A wooden jetty leading across turquoise water to a tropical island", picks: [
    { place: "UAE", note: "City and leisure travel" }, { place: "East Africa", note: "Safari experiences" }, { place: "Maldives", note: "Winter sun" },
  ] },
  { months: "April – June", short: "Apr — Jun", photo: "/images/library/destinations-spring-tulips.webp", alt: "Rows of colourful tulips in bloom beneath a wide spring sky", picks: [
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
      <MaskedHero
        id="destinations-hero-heading"
        eyebrow="Destinations"
        lines={["Where will", "your next", "journey", { text: "take you?", accent: true }]}
        text="Business cities to island escapes, across the Middle East, Africa and beyond."
        action={{ label: "Explore destinations", href: "#featured" }}
        media={{ video: "/hero.mp4" }}
      />

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
          <div className="j-section-label s-draw"><span>04 / One destination. Many ways to experience it.</span><span>Dubai, through your eyes</span></div>
          <div className="s-split-head"><h2 id="combine-heading" className="s-title">Dubai isn&apos;t<br />one kind of trip.</h2><p className="s-lead">One skyline. Five different reasons to be here.</p></div>
        </div>
        <DubaiTrips />
        <div className="j-shell d-dubai-close"><h3>The destination may be the same.<br /><span>The journey shouldn&apos;t be.</span></h3><p>Tell us why you&apos;re travelling, who you&apos;re travelling with and how you want the trip to feel. We&apos;ll help shape the journey around you.</p></div>
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

      <DestinationConnections />
      <DestinationPlanning />

      <ClosingScene
        chapter="07 / Wings & Wheels"
        ticket="Your next destination"
        left={<>Some journeys start<br />with a place.</>}
        right={<>Others start<br />with <em>an idea.</em></>}
        photo="/images/library/algarve.webp"
        photoPosition="center 60%"
        pass={["Boarding pass", "Place or idea"]}
        from="An idea"
        to="A destination"
        text="Tell us where you're thinking of going — or simply what you're looking for — and we'll help take it from there."
        chips={[
          { icon: "globe", label: "Cities" },
          { icon: "sun", label: "Leisure" },
          { icon: "briefcase", label: "Business" },
          { icon: "compass", label: "Experiences" },
        ]}
        action={{ label: "Start planning", href: "#destination-enquiry" }}
        whatsapp="WhatsApp us"
      />
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
