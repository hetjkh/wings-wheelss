import Image from "./travel-image";
import Link from "next/link";
import { TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./corporate.css";
import "./franchise.css";

const dubai = { x: 653.6, y: 162.2 };

const markets = [
  { id: "saudi", name: "Saudi Arabia", city: "Riyadh", pin: { x: 629.7, y: 163.6 }, title: "A market of business, tourism and opportunity.", text: "Opportunities across corporate travel, domestic and international tourism, events, exhibitions and group travel." },
  { id: "egypt", name: "Egypt", city: "Cairo", pin: { x: 586.7, y: 148.9 }, title: "Connecting a major travel market with regional and international demand.", text: "Inbound tourism, outbound holidays, corporate travel and regional group movements." },
  { id: "morocco", name: "Morocco", city: "Casablanca", pin: { x: 478.9, y: 138.9 }, title: "A gateway connecting North Africa with international travellers.", text: "Opportunities across leisure travel, destination experiences, corporate travel and international partnerships." },
];

const advantages: { icon: IconKind; title: string; text: string }[] = [
  { icon: "diamond", title: "Brand identity", text: "An established brand direction and consistent customer-facing positioning." },
  { icon: "globe", title: "Regional connections", text: "Access to the UAE, Africa and international travel networks." },
  { icon: "briefcase", title: "Service portfolio", text: "Corporate travel, leisure, groups, MICE and related travel services." },
  { icon: "megaphone", title: "Marketing collaboration", text: "Support with brand campaigns, digital presence and promotional initiatives." },
  { icon: "handshake", title: "Business development", text: "Referrals, joint proposals and cooperation with participating markets." },
  { icon: "support", title: "Operational guidance", text: "Service standards, booking workflows and ongoing support." },
];

const builds = [
  { title: "Corporate travel", text: "Business flights, hotels, transfers, corporate accounts and recurring travel requirements.", photo: "/images/library/travel-planning-v2.webp", alt: "A travel coordinator reviewing a printed itinerary beside a laptop", position: "center" },
  { title: "Holidays & leisure", text: "International holidays, family travel, customised itineraries and unique destination experiences.", photo: "/images/library/bali-temple.webp", alt: "A lakeside Balinese temple beneath a pink sunset sky", position: "center" },
  { title: "Groups & MICE", text: "Exhibitions, conferences, incentives, delegations and coordinated group movements.", photo: "/images/library/conference.webp", alt: "Delegates attending an international conference in a modern hotel ballroom", position: "center" },
  { title: "Travel services", text: "Flights, accommodation, visa assistance (where permitted), airport transfers and traveller support.", photo: "/images/library/passport-preparation.webp", alt: "A traveller holding a passport while packing a bag for a journey", position: "center" },
];

const network = [
  "Business travel between GCC and African markets",
  "International group movements and exhibitions",
  "Regional leisure packages and destination experiences",
  "Corporate referrals and multi-country itineraries",
  "A growing network of franchise partners",
];

const partners = [
  { label: "Travel agencies", text: "Established travel agencies seeking to expand or diversify.", photo: "/images/library/travel-support-v2.webp", position: "center" },
  { label: "Entrepreneurs", text: "Entrepreneurs with relevant tourism or hospitality experience.", photo: "/images/library/business-conversation.webp", position: "center" },
  { label: "Investors", text: "Investors with capable local operating teams.", photo: "/images/library/business-boarding.webp", position: "center" },
  { label: "Corporate specialists", text: "Corporate travel specialists with strong business networks.", photo: "/images/library/business-terminal-v2.webp", position: "center" },
  { label: "Destination management", text: "Destination management companies interested in broader regional collaboration.", photo: "/images/library/cape-town.webp", position: "center" },
];

const matters = ["Local market knowledge", "Financial capability", "Operational commitment", "Regulatory compliance", "A long-term approach to developing the Wings & Wheels brand"];

const roles = [
  { id: "local", label: "Local partner responsibilities", items: ["Market development", "Local licensing", "Staffing", "Customer relationships", "Sales", "Day-to-day operations"] },
  { id: "network", label: "Wings & Wheels network role", items: ["Brand direction", "Agreed operating frameworks", "Potential regional collaboration", "Service guidelines", "Marketing coordination"] },
];

const steps = [
  { title: "Express your interest", text: "Share your background and business ambitions." },
  { title: "Initial discussion", text: "We review your experience and market understanding." },
  { title: "Business evaluation", text: "We discuss the proposed model, investment requirements and territory." },
  { title: "Due diligence & agreement", text: "Legal, financial, licensing and contractual review." },
  { title: "Market setup & launch", text: "Onboarding, training and go-to-market support." },
];

function MarketMap({ pin, city }: { pin: { x: number; y: number }; city: string }) {
  const mid = { x: (pin.x + dubai.x) / 2, y: Math.min(pin.y, dubai.y) - Math.abs(dubai.x - pin.x) * .32 - 8 };
  return <svg className="f-market-map" viewBox="450 92 230 120" aria-hidden="true">
    <image href="/images/world-map.svg" x="0" y="0" width="1000" height="440" />
    <path className="f-market-arc" data-trace pathLength={1} d={`M${dubai.x} ${dubai.y}Q${mid.x} ${mid.y} ${pin.x} ${pin.y}`} />
    <circle className="f-market-home" cx={dubai.x} cy={dubai.y} r="2.2" />
    <text className="f-market-label f-market-label-home" x={dubai.x + 4} y={dubai.y + 9}>Dubai</text>
    <circle className="f-market-pulse" cx={pin.x} cy={pin.y} r="7" />
    <circle className="f-market-pin" cx={pin.x} cy={pin.y} r="3" />
    <text className="f-market-label" x={pin.x} y={pin.y - 8} textAnchor="middle">{city}</text>
  </svg>;
}

export default function FranchisePage() {
  return <ChapterMotion className="franchise-page">
    <a className="skip-link" href="#beyond">Skip to content</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="beyond" />
    <main>
      <section className="j-hero s-hero f-hero" id="top" aria-labelledby="franchise-hero-heading">
        <Image className="j-photo j-hero-photo" src="/images/library/dubai-clouds.webp" alt="" fill priority sizes="100vw" style={{ objectPosition: "center" }} />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow" data-hero>Franchise opportunities</span>
            <h1 id="franchise-hero-heading"><span className="s-line"><span data-hero>Local ambition.</span></span><span className="s-line"><span data-hero>International opportunity.</span></span><span className="s-hero-accent" data-hero>Become part of the Wings &amp; Wheels network.</span></h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" data-hero />
            <p data-hero>We are expanding through franchise partnerships in Saudi Arabia, Egypt and Morocco — and looking for ambitious entrepreneurs and established travel businesses to grow with us.</p>
            <div className="s-actions" data-hero>
              <a className="j-button j-button-cream" href="#markets">Explore franchise opportunities</a>
              <EnquiryButton className="j-button j-button-outline-light" service="Franchise overview">Request the overview</EnquiryButton>
            </div>
            <p className="f-hero-focus" data-hero><span>Current expansion focus</span>Saudi Arabia <i /> Egypt <i /> Morocco</p>
          </div>
        </div>
        <a href="#beyond" className="j-scroll-note">Build your market <span>↓</span></a>
      </section>

      <section className="f-beyond j-torn-top" id="beyond" aria-labelledby="beyond-heading">
        <figure className="f-beyond-photo">
          <Image src="/images/library/travel-support-v2.webp" alt="Two travel consultants reviewing a world map and planning a route together" fill sizes="(max-width: 991px) 100vw, 46vw" />
          <figcaption>Build your market.<strong>Grow with our network.</strong></figcaption>
        </figure>
        <div className="j-shell f-beyond-grid">
          <div className="f-beyond-copy">
            <span className="j-eyebrow s-eyebrow">01 / Growing beyond borders</span>
            <h2 id="beyond-heading" className="s-title s-rows"><span>Great travel businesses</span><span>are built on local knowledge</span><span className="k-soft">and strong connections.</span></h2>
            <p className="k-body">Every market has its own travellers, business communities, destinations and commercial opportunities. Wings &amp; Wheels combines local market understanding with international relationships, coordinated services and a consistent customer experience.</p>
            <ul className="f-beyond-pillars" data-stagger="0.1">
              <li><span>One</span>brand.</li>
              <li><span>Local</span>leadership.</li>
              <li><span>Connected</span>markets.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="f-markets j-torn-top" id="markets" aria-labelledby="markets-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">02 / Where we&apos;re expanding</span><h2 id="markets-heading" className="s-title s-rows"><span>Three markets.</span><span className="k-soft">Three opportunities</span><span className="k-soft">to grow.</span></h2></div>
            <div className="f-markets-aside">
              <p className="k-body">Each market brings its own travellers and commercial strengths. We are inviting conversations with partners who know them well.</p>
              <EnquiryButton className="f-link" service="Franchise opportunity">Explore the markets</EnquiryButton>
            </div>
          </div>
          <ol className="f-market-grid" data-stagger="0.12">{markets.map((market, i) => <li key={market.id} className="f-market">
            <MarketMap pin={market.pin} city={market.city} />
            <div className="f-market-copy">
              <span className="f-market-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{market.name}</h3>
              <p className="f-market-title">{market.title}</p>
              <p>{market.text}</p>
              <EnquiryButton className="f-link" service={`Franchise opportunity: ${market.name}`}>Learn more</EnquiryButton>
            </div>
          </li>)}</ol>
        </div>
      </section>

      <section className="f-advantage j-torn-top" id="advantage" aria-labelledby="advantage-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">03 / The partnership advantage</span><h2 id="advantage-heading" className="s-title s-rows"><span>Build locally.</span><span className="k-soft">Connect internationally.</span></h2></div>
            <p className="f-advantage-note">A proven brand.<br />A shared vision.<br /><em>A growing network.</em></p>
          </div>
          <ul className="f-advantage-grid" data-stagger="0.07">{advantages.map((item, i) => <li key={item.title}>
            <span className="f-advantage-icon"><TravelIcon kind={item.icon} size={24} /></span>
            <span className="f-advantage-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>)}</ul>
        </div>
      </section>

      <section className="f-build j-torn-top" id="build" aria-labelledby="build-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">04 / What you can build</span><h2 id="build-heading" className="s-title s-rows"><span>One brand.</span><span className="k-soft">Multiple business opportunities.</span></h2></div>
          </div>
          <ul className="f-build-grid" data-stagger="0.1">{builds.map((item, i) => <li key={item.title} className="f-build-card">
            <div className="f-build-photo"><Image src={item.photo} alt={item.alt} fill sizes="(max-width: 767px) 92vw, (max-width: 1199px) 46vw, 23vw" style={{ objectPosition: item.position }} /></div>
            <div className="f-build-shade" aria-hidden="true" />
            <div className="f-build-copy">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </li>)}</ul>
        </div>
      </section>

      <section className="f-network j-torn-top" id="network" aria-labelledby="network-heading">
        <div className="f-network-photo"><Image src="/images/library/global-connections.webp" alt="An illustration of routes connecting Africa and the Middle East" fill sizes="(max-width: 991px) 100vw, 55vw" /></div>
        <div className="j-shell f-network-grid">
          <div className="f-network-copy">
            <span className="j-eyebrow s-eyebrow">05 / The UAE + Africa advantage</span>
            <h2 id="network-heading" className="s-title s-rows"><span>Connecting more</span><span className="k-soft">than destinations.</span></h2>
            <p className="k-body">From our base in Dubai, we connect businesses and travellers across the Middle East, Africa and key international markets.</p>
            <ul className="f-network-list" data-stagger="0.08">{network.map(item => <li key={item}><TravelIcon kind="check" size={18} />{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="f-partners j-torn-top" id="partners" aria-labelledby="partners-heading">
        <div className="j-shell">
          <div className="f-partners-head">
            <div>
              <span className="j-eyebrow s-eyebrow">06 / Who we&apos;re looking for</span>
              <p className="f-kicker">The right partner matters</p>
            </div>
            <h2 id="partners-heading" className="f-partners-title"><span>We&apos;re not simply looking for <s>locations</s>.</span><span>We&apos;re looking for <em>people who can build businesses.</em></span></h2>
            <p className="k-body">We are interested in discussing franchise opportunities with individuals and organisations that bring local market expertise, commercial ambition and a commitment to service quality.</p>
          </div>
          <h3 className="f-cast-label">Potential partners may include</h3>
          <ul className="f-cast" data-stagger="0.08">{partners.map((item, i) => <li key={item.label} tabIndex={0}>
            <Image src={item.photo} alt="" fill sizes="(max-width: 991px) 92vw, 46vw" style={{ objectPosition: item.position }} />
            <span className="f-cast-number">{String(i + 1).padStart(2, "0")}</span>
            <span className="f-cast-name">{item.label}</span>
            <p>{item.text}</p>
          </li>)}</ul>
          <div className="f-matters">
            <h3>What matters most</h3>
            <p>{matters.map((item, i) => <span key={item}>{item}{i < matters.length - 1 && <i aria-hidden="true">/</i>}</span>)}</p>
          </div>
        </div>
      </section>

      <section className="f-roles j-torn-top" id="standards" aria-labelledby="standards-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">07 / Local leadership. Shared standards.</span><h2 id="standards-heading" className="s-title s-rows"><span>Your market expertise.</span><span className="k-soft">Our shared vision.</span></h2></div>
            <p className="k-body">The proposed franchise approach is built around a balance between local ownership and consistent brand standards.</p>
          </div>
          <div className="f-roles-grid" data-stagger="0.12">{roles.map((role, i) => <div key={role.id} className={`f-role f-role-${role.id}`}>
            <span className="f-role-tag">{i === 0 ? "You" : "Us"}</span>
            <h3>{role.label}</h3>
            <ul>{role.items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>)}
            <span className="f-roles-join" aria-hidden="true">+</span>
          </div>
          <p className="f-roles-together"><span>Together</span>The objective is to build a recognisable travel brand while allowing each market to develop according to its commercial realities.</p>
        </div>
      </section>

      <section className="f-steps j-torn-top" id="how" aria-labelledby="how-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">08 / How it works</span><h2 id="how-heading" className="s-title s-rows"><span>From first conversation</span><span className="k-soft">to market launch.</span></h2></div>
            <p className="k-body">A considered process for both sides, so every new market starts on solid ground.</p>
          </div>
          <ol className="f-step-row" data-progress="top 75%" data-progress-end="bottom 60%">{steps.map((step, i) => <li key={step.title} style={{ "--i": i } as React.CSSProperties}>
            <span className="f-step-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>)}</ol>
          <p className="f-legal"><TravelIcon kind="document" size={16} />This page is an invitation to discuss prospective franchise opportunities. It is not an offer, and no territory or exclusivity is promised. Each market is subject to its own franchise, licensing, ownership and disclosure requirements, and a confidential franchise prospectus is shared only with qualified applicants.</p>
        </div>
      </section>

      <section className="s-final f-final j-torn-top" aria-labelledby="final-heading">
        <Image className="j-photo s-final-photo" src="/images/library/dubai-panorama.webp" alt="" fill sizes="100vw" />
        <div className="s-final-shade" />
        <div className="j-shell s-final-content">
          <span className="j-eyebrow">Wings &amp; Wheels franchise opportunities</span>
          <h2 id="final-heading">Let&apos;s build the next chapter together.</h2>
          <p className="s-lead-body">We are looking to connect with ambitious partners who share our belief in thoughtful travel management, strong local relationships and international collaboration.</p>
          <p className="f-final-markets">Saudi Arabia. Egypt. Morocco. <strong>Three markets. One opportunity.</strong></p>
          <div className="s-actions">
            <EnquiryButton className="j-button j-button-cream" service="Franchise partnership">Become a franchise partner</EnquiryButton>
            <Link className="j-button j-button-outline-light" href="/contact">Speak to our expansion team</Link>
          </div>
        </div>
      </section>
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
