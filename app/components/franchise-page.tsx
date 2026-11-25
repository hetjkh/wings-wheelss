import type { ReactNode } from "react";
import Image from "./travel-image";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { FranchiseApplication, FranchiseApplyLink } from "./franchise-application";
import { PillCta } from "./about-cta";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import { MaskedHero } from "./masked-hero";
import { ClosingScene } from "./services-final";
import { FranchiseGlobe } from "./franchise-globe";
import { FranchiseBuild } from "./franchise-build";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./corporate.css";
import "./franchise.css";

// Same equirectangular projection as /images/world-map.svg (1000 × 440).
const mapPoint = (longitude: number, latitude: number) => ({
  x: (longitude + 180) / .36,
  y: (85 - latitude) / 145 * 440,
});

const dubai = mapPoint(55.27, 25.2);

const markets = [
  { id: "saudi", name: "Saudi Arabia", city: "Riyadh", pin: mapPoint(46.68, 24.71), title: "A market of business, tourism and opportunity.", text: "Opportunities across corporate travel, domestic and international tourism, events, exhibitions and group travel." },
  { id: "egypt", name: "Egypt", city: "Cairo", pin: mapPoint(31.24, 30.04), title: "Connecting a major travel market with regional and international demand.", text: "Inbound tourism, outbound holidays, corporate travel and regional group movements." },
  { id: "morocco", name: "Morocco", city: "Casablanca", pin: mapPoint(-7.59, 33.57), title: "A gateway connecting North Africa with international travellers.", text: "Opportunities across leisure travel, destination experiences, corporate travel and international partnerships." },
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
  { icon: "briefcase" as const, title: "Corporate travel", text: "Serve companies, executives and organisations.", photo: "/images/library/franchise-travel-booking.webp", alt: "A professional reviewing travel arrangements on a tablet in a lounge", position: "center" },
  { icon: "sun" as const, title: "Holidays & leisure", text: "Personalised holidays and destination experiences.", photo: "/images/library/bali-temple.webp", alt: "A lakeside Balinese temple beneath a pink sunset sky", position: "center" },
  { icon: "people" as const, title: "Groups & MICE", text: "Events, conferences and coordinated group travel.", photo: "/images/library/franchise-group-meeting.webp", alt: "Business colleagues meeting around a table in a sunlit hotel room", position: "center" },
  { icon: "plane" as const, title: "Travel services", text: "Flights, hotels, visas and transfers.", photo: "/images/library/passport-preparation.webp", alt: "A traveller holding a passport while packing a bag for a journey", position: "center" },
];

const network: { icon: IconKind; label: string; lead: string }[] = [
  { icon: "briefcase", label: "Business travel between GCC and African markets", lead: "Corridors" },
  { icon: "people", label: "International group movements and exhibitions", lead: "Groups" },
  { icon: "sun", label: "Regional leisure packages and destination experiences", lead: "Leisure" },
  { icon: "route", label: "Corporate referrals and multi-country itineraries", lead: "Itineraries" },
  { icon: "handshake", label: "Collaboration with participating travel partners", lead: "Partners" },
];

const partners = [
  { label: "Travel agencies", text: "Established travel agencies seeking to expand or diversify.", photo: "/images/library/franchise-travel-agencies.webp", position: "center" },
  { label: "Entrepreneurs", text: "Entrepreneurs with relevant tourism or hospitality experience.", photo: "/images/library/franchise-business-lunch.webp", position: "center" },
  { label: "Investors", text: "Investors with capable local operating teams.", photo: "/images/library/business-boarding.webp", position: "center" },
  { label: "Corporate specialists", text: "Corporate travel specialists with strong business networks.", photo: "/images/library/franchise-corporate-specialists-v2.webp", position: "center top", fullFrame: true },
  { label: "Destination management", text: "Destination management companies interested in broader regional collaboration.", photo: "/images/library/franchise-destination-partners-v2.webp", position: "center top", fullFrame: true },
];

const matters = [
  { label: "Local knowledge", text: "You know the market and its travellers." },
  { label: "Financial readiness", text: "Capital to launch and sustain the business." },
  { label: "Operational grit", text: "A team ready to run the day to day." },
  { label: "Compliance", text: "Licensing and regulation taken seriously." },
  { label: "Long game", text: "Building the brand — not a quick exit." },
];

const roles = [
  { theme: "Growth", you: "Market development", youText: "Find and win business in your market.", us: "Brand direction", usText: "A recognised name to grow under." },
  { theme: "Licences", you: "Local licensing", youText: "Permits and legal setup where you operate.", us: "Operating frameworks", usText: "Agreed ways of working from day one." },
  { theme: "People", you: "Staffing", youText: "Hire and lead your local team.", us: "Service guidelines", usText: "One standard for every consultant." },
  { theme: "Clients", you: "Customer relationships", youText: "Look after travellers on the ground.", us: "Regional collaboration", usText: "Referrals across the UAE and Africa." },
  { theme: "Sales", you: "Sales", youText: "Drive bookings and revenue.", us: "Marketing coordination", usText: "Campaigns and brand support." },
  { theme: "Operations", you: "Day-to-day operations", youText: "Run the office and the bookings.", us: "Ongoing guidance", usText: "Help when you need it." },
];

const steps = [
  { title: "Express your interest", text: "Share your background and business ambitions." },
  { title: "Initial discussion", text: "We review your experience and market understanding." },
  { title: "Business evaluation", text: "We discuss the proposed model, investment requirements and territory." },
  { title: "Due diligence & agreement", text: "Legal, financial, licensing and contractual review." },
  { title: "Market setup & launch", text: "Onboarding, training and go-to-market support." },
];

const faqs = [
  { question: "Which countries are currently being considered?", answer: "Our current expansion focus is Saudi Arabia, Egypt and Morocco." },
  { question: "Do I need previous travel industry experience?", answer: "Relevant travel, hospitality or business management experience is preferred. Applicants without direct industry experience may be considered if they have a capable operating team and suitable commercial background." },
  { question: "Is territory exclusivity available?", answer: "Territory rights, if offered, would depend on the market, proposed investment, performance commitments and final agreement." },
  { question: "What is the franchise investment?", answer: "Investment requirements will be discussed with qualified applicants after an initial assessment. No fixed public investment amount is being advertised at this stage." },
  { question: "Will Wings & Wheels provide operational and marketing support?", answer: "The proposed level of operational, technology, training and marketing support will be defined during commercial discussions and documented in the franchise agreement." },
  { question: "When can the franchise begin operating?", answer: "Launch timing will depend on due diligence, contractual agreements, local licences, regulatory requirements and operational readiness." },
];

function FranchiseHeading({ id, children, mobile }: { id: string; children: ReactNode; mobile: ReactNode }) {
  return <>
    <h2 id={id} className="s-title s-rows f-desktop-copy">{children}</h2>
    <h2 className="s-title f-mobile-copy">{mobile}</h2>
  </>;
}

function GalleryProgress({ count }: { count: number }) {
  return <div className="f-gallery-progress" aria-hidden="true"><span data-gallery-count>01 / {String(count).padStart(2, "0")}</span><i><b /></i><span>Scroll to explore <Arrow /></span></div>;
}

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
      <MaskedHero
        id="franchise-hero-heading"
        eyebrow="Franchise opportunities"
        lines={["Local", "ambition."]}
        sub="Global reach."
        text="Partnerships in Saudi Arabia, Egypt and Morocco."
        action={{ label: "Explore the markets", href: "#markets" }}
        media={{ video: "/franchise-hero-markets.mp4" }}
      />

      <section className="f-beyond j-torn-top" id="beyond" aria-labelledby="beyond-heading">
        <div className="f-beyond-visual" aria-hidden="false">
          <div className="f-beyond-collage">
            <figure className="f-beyond-tile f-beyond-tile-main">
              <Image src="/images/library/franchise-local-connections-v3.webp" alt="Two business partners reviewing travel itineraries in a sunlit office overlooking Dubai" fill sizes="(max-width: 991px) 92vw, 32vw" />
              <figcaption>Build your market.<strong>Grow with our network.</strong></figcaption>
            </figure>
            <figure className="f-beyond-tile f-beyond-tile-top">
              <Image src="/images/library/franchise-dubai-marina-v2.webp" alt="Dubai Marina towers and yachts in warm afternoon light" fill sizes="(max-width: 991px) 45vw, 18vw" />
            </figure>
            <figure className="f-beyond-tile f-beyond-tile-bottom">
              <Image src="/images/library/franchise-partner-lounge-v3.webp" alt="Three travel partners discussing an itinerary in a sunlit airport lounge" fill sizes="(max-width: 991px) 45vw, 18vw" />
            </figure>
          </div>
        </div>
        <div className="f-beyond-grid">
          <div className="f-beyond-copy">
            <span className="j-eyebrow s-eyebrow">Growing beyond borders</span>
            <FranchiseHeading id="beyond-heading" mobile={<>Global vision.<br /><em>Local connections.</em></>}><span>Global vision.</span><span className="k-soft">Local connections.</span></FranchiseHeading>
            <p className="k-body">We bring global travel expertise together with local insight, strong partnerships, and consistently exceptional service.</p>
            <ul className="f-beyond-pillars" data-stagger="0.1">
              <li><span>One</span>brand.</li>
              <li><span>Local</span>leadership.</li>
              <li><span>Connected</span>markets.</li>
            </ul>
            <PillCta href="#apply">Explore franchise opportunities</PillCta>
          </div>
        </div>
      </section>

      <section className="f-markets j-torn-top" id="markets" aria-labelledby="markets-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">Where we&apos;re expanding</span><FranchiseHeading id="markets-heading" mobile={<>Three markets.<br /><em>Your next chapter.</em></>}><span>Three markets.</span><span className="k-soft">Three opportunities</span><span className="k-soft">to grow.</span></FranchiseHeading></div>
            <div className="f-markets-aside">
              <p className="k-body">Each market brings its own travellers and commercial strengths. We are inviting conversations with partners who know them well.</p>
              <FranchiseApplyLink className="f-link">Apply for a market <Arrow /></FranchiseApplyLink>
            </div>
          </div>
          <ol className="f-market-grid" data-stagger="0.12">{markets.map((market, i) => <li key={market.id} className="f-market">
            <MarketMap pin={market.pin} city={market.city} />
            <div className="f-market-copy">
              <span className="f-market-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{market.name}</h3>
              <p className="f-market-title">{market.title}</p>
              <p>{market.text}</p>
              <FranchiseApplyLink className="f-link" market={market.name}>Apply for {market.name} <Arrow /></FranchiseApplyLink>
            </div>
          </li>)}</ol>
          <GalleryProgress count={markets.length} />
        </div>
      </section>

      <section className="f-advantage j-torn-top" id="advantage" aria-labelledby="advantage-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">The partnership advantage</span><FranchiseHeading id="advantage-heading" mobile={<>Local ambition.<br /><em>Shared strengths.</em></>}><span>Build locally.</span><span className="k-soft">Connect internationally.</span></FranchiseHeading></div>
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
        <div className="j-shell f-build-head">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">What you can build</span><FranchiseHeading id="build-heading" mobile={<>One brand.<br /><em>Room to grow.</em></>}><span>One brand.</span><span className="k-soft">Multiple business opportunities.</span></FranchiseHeading></div>
          </div>
        </div>
        <div className="j-shell f-build-wrap">
          <FranchiseBuild items={builds} />
        </div>
      </section>

      <section className="f-network j-torn-top" id="network" aria-labelledby="network-heading">
        <div className="j-shell f-network-grid">
          <div className="f-network-copy">
            <span className="j-eyebrow s-eyebrow">The UAE + Africa advantage</span>
            <h2 id="network-heading" className="f-network-heading">
              <span>Connecting</span>
              <em>more than</em>
              <span>destinations.</span>
            </h2>
            <p className="f-network-lead f-desktop-copy">Wings &amp; Wheels operates from Dubai and has relationships through its Africa travel network — opening cross-market cooperation for partners in Saudi Arabia, Egypt and Morocco.</p>
            <p className="f-network-lead f-mobile-copy">From our Dubai base to our Africa network, explore travel opportunities across borders.</p>
            <p className="f-network-note"><span>A growing network.</span> <span>Local market opportunities.</span> <em>Shared international ambition.</em></p>
          </div>
          <FranchiseGlobe />
        </div>
        <div className="j-shell f-network-route">
          <p className="f-network-route-label"><span>Cross-market cooperation, including</span></p>
          <ol className="f-network-stops" data-stagger="0.1">
            {network.map((item, index) => (
              <li key={item.label}>
                <span className="f-network-node">
                  <TravelIcon kind={item.icon} size={26} />
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </span>
                <span className="f-network-stop-lead">{item.lead}</span>
                <p>{item.label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="f-partners j-torn-top" id="partners" aria-labelledby="partners-heading">
        <div className="j-shell">
          <div className="f-partners-head">
            <div>
              <span className="j-eyebrow s-eyebrow">Who we&apos;re looking for</span>
              <FranchiseHeading id="partners-heading" mobile={<>Partners<br /><em>who build.</em></>}><span>Partners</span><span className="k-soft">who build.</span></FranchiseHeading>
            </div>
            <div className="f-partners-aside">
              <p className="f-kicker">The right partner matters</p>
              <p className="k-body">Local expertise. Commercial ambition. Care for every traveller. If that sounds like you, we would like to talk.</p>
            </div>
          </div>
          <div className="f-cast-head">
            <h3 className="f-cast-label">Who this is for</h3>
            <p>Hover a profile to read more.</p>
          </div>
          <ul className="f-cast" data-stagger="0.08">{partners.map((item, i) => <li key={item.label} tabIndex={0} className={item.fullFrame ? "f-cast-full-frame" : undefined}>
            {item.fullFrame && <span className="f-cast-backdrop" aria-hidden="true" style={{ backgroundImage: `url(${item.photo})` }} />}
            <Image src={item.photo} alt="" fill lockSizes quality={100} sizes="(max-width: 991px) 92vw, 60vw" style={{ objectPosition: item.position }} />
            <span className="f-cast-number">{String(i + 1).padStart(2, "0")}</span>
            <span className="f-cast-name">{item.label}</span>
            <p>{item.text}</p>
          </li>)}</ul>
          <div className="f-matters">
            <div className="f-matters-head">
              <h3>What matters most</h3>
              <p>Five signals we look for before a conversation goes further.</p>
            </div>
            <ol className="f-matters-list">
              {matters.map((item, i) => <li key={item.label}>
                <span className="f-matters-no">{String(i + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="f-roles j-torn-top" id="standards" aria-labelledby="standards-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">Who does what</span><FranchiseHeading id="standards-heading" mobile={<>You run the market.<br /><em>We back the brand.</em></>}><span>You run the market.</span><span className="k-soft">We back the brand.</span></FranchiseHeading></div>
            <p className="k-body">Local ownership, shared standards. Here is how the work is split — each thing you lead has something from us behind it.</p>
          </div>
          <div className="f-duo">
            <div className="f-duo-head">
              <div className="f-duo-side f-duo-side-you"><span className="f-role-tag">You</span><h3>Local partner</h3><p>Leads on the ground.</p></div>
              <span className="f-duo-seal" aria-hidden="true"><TravelIcon kind="handshake" size={26} /></span>
              <div className="f-duo-side f-duo-side-us"><span className="f-role-tag">Us</span><h3>Wings &amp; Wheels</h3><p>Backs you from the network.</p></div>
            </div>
            <ol className="f-duo-rows" data-stagger="0.07">{roles.map(row => <li key={row.theme} tabIndex={0}>
              <div className="f-duo-you"><span className="f-duo-who">You</span><h4>{row.you}</h4><p>{row.youText}</p></div>
              <span className="f-duo-theme">{row.theme}</span>
              <div className="f-duo-us"><span className="f-duo-who">Us</span><h4>{row.us}</h4><p>{row.usText}</p></div>
            </li>)}</ol>
          </div>
          <p className="f-roles-together"><span>Together</span>One recognisable travel brand — run locally, shaped by each market.</p>
        </div>
      </section>

      <section className="f-steps j-torn-top" id="how" aria-labelledby="how-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">How it works</span><FranchiseHeading id="how-heading" mobile={<>A conversation.<br /><em>Then a clear path.</em></>}><span>From first conversation</span><span className="k-soft">to market launch.</span></FranchiseHeading></div>
            <p className="k-body">A considered process for both sides, so every new market starts on solid ground.</p>
          </div>
          <ol className="f-step-row" data-progress="top 75%" data-progress-end="bottom 60%">{steps.map((step, i) => <li key={step.title} style={{ "--i": i } as React.CSSProperties}>
            <span className="f-step-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>)}</ol>
          <div className="f-step-action">
            <FranchiseApplyLink className="f-step-cta">
              <span>Become a travel partner</span>
              <span className="f-step-cta-dot"><Arrow /></span>
            </FranchiseApplyLink>
          </div>
          <p className="f-legal"><TravelIcon kind="document" size={16} />This page is an invitation to discuss prospective franchise opportunities. It is not an offer, and no territory or exclusivity is promised. Each market is subject to its own franchise, licensing, ownership and disclosure requirements, and a confidential franchise prospectus is shared only with qualified applicants.</p>
        </div>
      </section>

      <section className="f-faq j-torn-top" id="faq" aria-labelledby="faq-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">Frequently asked questions</span><h2 id="faq-heading" className="s-title s-rows"><span>Your questions.</span><span className="k-soft">Our answers.</span></h2></div>
          </div>
          <div className="f-faq-list">{faqs.map(faq => <details key={faq.question} className="f-faq-item">
            <summary>{faq.question}<span className="f-faq-toggle" aria-hidden="true" /></summary>
            <p>{faq.answer}</p>
          </details>)}</div>
        </div>
      </section>

      <section className="f-apply j-torn-top" aria-labelledby="apply-heading">
        <div className="j-shell">
          <div className="f-apply-head">
            <div>
              <span className="j-eyebrow s-eyebrow">Franchise partnership application</span>
              <FranchiseHeading id="apply-heading" mobile={<>About your business.<br /><em>What&apos;s possible.</em></>}><span>About your business.</span><span className="k-soft">What&apos;s possible.</span></FranchiseHeading>
            </div>
            <p className="k-body">Please complete the application below to help our expansion team understand your background, preferred market and partnership objectives.</p>
          </div>
          <div id="apply" className="fa-anchor">
            <FranchiseApplication markets={markets} dubai={dubai} />
          </div>
        </div>
      </section>

      <ClosingScene
        chapter="Wings & Wheels"
        ticket="Franchise opportunities"
        left={<>Let&apos;s build the<br />next chapter.</>}
        right={<>Your market.<br /><em>Our shared future.</em></>}
        mobileHeadline={<>Your market.<br /><em>Our shared future.</em></>}
        photo="/images/library/franchise-partner-lounge-v2.webp"
        photoPosition="center"
        pass={["Boarding pass", "Saudi · Egypt · Morocco"]}
        from="Your market"
        to="Our network"
        mobileText="Whether you operate an established travel business or are exploring a new commercial opportunity, we would welcome an introduction."
        text="Whether you operate an established travel business or are exploring a new commercial opportunity, we would welcome an introduction. Let's discuss how your local expertise and our international outlook could create a meaningful partnership."
        chips={[
          { icon: "handshake", label: "Partners" },
          { icon: "globe", label: "Markets" },
          { icon: "briefcase", label: "Business" },
          { icon: "support", label: "Support" },
        ]}
        action={{ label: "Become a franchise partner", href: "#apply" }}
      />
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
