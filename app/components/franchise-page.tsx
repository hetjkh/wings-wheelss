import type { ReactNode } from "react";
import Image from "./travel-image";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
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
              <Image src="/images/library/franchise-local-connections.webp" alt="Two business partners reviewing plans together in an office overlooking Dubai" fill sizes="(max-width: 991px) 92vw, 32vw" />
              <figcaption>Build your market.<strong>Grow with our network.</strong></figcaption>
            </figure>
            <figure className="f-beyond-tile f-beyond-tile-top">
              <Image src="/images/library/dubai-marina.webp" alt="Dubai Marina waterfront under a clear sky" fill sizes="(max-width: 991px) 45vw, 18vw" />
            </figure>
            <figure className="f-beyond-tile f-beyond-tile-bottom">
              <Image src="/images/library/franchise-partner-lounge-v2.webp" alt="Partners meeting in a sunlit lounge" fill sizes="(max-width: 991px) 45vw, 18vw" />
            </figure>
          </div>
        </div>
        <div className="f-beyond-grid">
          <div className="f-beyond-copy">
            <span className="j-eyebrow s-eyebrow">01 / Growing beyond borders</span>
            <FranchiseHeading id="beyond-heading" mobile={<>Global vision.<br /><em>Local connections.</em></>}><span>Global vision.</span><span className="k-soft">Local connections.</span></FranchiseHeading>
            <p className="k-body">We bring global travel expertise together with local insight, strong partnerships, and consistently exceptional service.</p>
            <ul className="f-beyond-pillars" data-stagger="0.1">
              <li><span>One</span>brand.</li>
              <li><span>Local</span>leadership.</li>
              <li><span>Connected</span>markets.</li>
            </ul>
            <PillCta service="Franchise opportunity">Explore franchise opportunities</PillCta>
          </div>
        </div>
      </section>

      <section className="f-markets j-torn-top" id="markets" aria-labelledby="markets-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">02 / Where we&apos;re expanding</span><FranchiseHeading id="markets-heading" mobile={<>Three markets.<br /><em>Your next chapter.</em></>}><span>Three markets.</span><span className="k-soft">Three opportunities</span><span className="k-soft">to grow.</span></FranchiseHeading></div>
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
          <GalleryProgress count={markets.length} />
        </div>
      </section>

      <section className="f-advantage j-torn-top" id="advantage" aria-labelledby="advantage-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">03 / The partnership advantage</span><FranchiseHeading id="advantage-heading" mobile={<>Local ambition.<br /><em>Shared strengths.</em></>}><span>Build locally.</span><span className="k-soft">Connect internationally.</span></FranchiseHeading></div>
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
            <div><span className="j-eyebrow s-eyebrow">04 / What you can build</span><FranchiseHeading id="build-heading" mobile={<>One brand.<br /><em>Room to grow.</em></>}><span>One brand.</span><span className="k-soft">Multiple business opportunities.</span></FranchiseHeading></div>
          </div>
        </div>
        <div className="j-shell f-build-wrap">
          <FranchiseBuild items={builds} />
        </div>
      </section>

      <section className="f-network j-torn-top" id="network" aria-labelledby="network-heading">
        <div className="j-shell f-network-grid">
          <div className="f-network-copy">
            <span className="j-eyebrow s-eyebrow">05 / The UAE + Africa advantage</span>
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
              <span className="j-eyebrow s-eyebrow">06 / Who we&apos;re looking for</span>
              <p className="f-kicker">The right partner matters</p>
            </div>
            <h2 id="partners-heading" className="f-partners-title f-desktop-copy"><span>Partners</span><span><em>who build.</em></span></h2>
            <h2 className="s-title f-mobile-copy">Partners<br /><em>who build.</em></h2>
            <p className="k-body f-desktop-copy">We are interested in discussing franchise opportunities with individuals and organisations that bring local market expertise, commercial ambition and a commitment to service quality.</p>
            <p className="k-body f-mobile-copy">Local expertise. Commercial ambition. A commitment to looking after travellers.</p>
          </div>
          <h3 className="f-cast-label">Potential partners may include</h3>
          <ul className="f-cast" data-stagger="0.08">{partners.map((item, i) => <li key={item.label} tabIndex={0} className={item.fullFrame ? "f-cast-full-frame" : undefined}>
            {item.fullFrame && <span className="f-cast-backdrop" aria-hidden="true" style={{ backgroundImage: `url(${item.photo})` }} />}
            <Image src={item.photo} alt="" fill lockSizes quality={90} sizes="(max-width: 991px) 92vw, 60vw" style={{ objectPosition: item.position }} />
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
            <div><span className="j-eyebrow s-eyebrow">07 / Local leadership. Shared standards.</span><FranchiseHeading id="standards-heading" mobile={<>You know the market.<br /><em>We share the vision.</em></>}><span>Your market expertise.</span><span className="k-soft">Our shared vision.</span></FranchiseHeading></div>
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
            <div><span className="j-eyebrow s-eyebrow">08 / How it works</span><FranchiseHeading id="how-heading" mobile={<>A conversation.<br /><em>Then a clear path.</em></>}><span>From first conversation</span><span className="k-soft">to market launch.</span></FranchiseHeading></div>
            <p className="k-body">A considered process for both sides, so every new market starts on solid ground.</p>
          </div>
          <ol className="f-step-row" data-progress="top 75%" data-progress-end="bottom 60%">{steps.map((step, i) => <li key={step.title} style={{ "--i": i } as React.CSSProperties}>
            <span className="f-step-number">{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>)}</ol>
          <div className="f-step-action">
            <EnquiryButton
              className="f-step-cta"
              service="General enquiry"
              message="I’m interested in becoming a Wings & Wheels travel partner."
              icon={false}
            >
              <span>Become a travel partner</span>
              <span className="f-step-cta-dot"><Arrow /></span>
            </EnquiryButton>
          </div>
          <p className="f-legal"><TravelIcon kind="document" size={16} />This page is an invitation to discuss prospective franchise opportunities. It is not an offer, and no territory or exclusivity is promised. Each market is subject to its own franchise, licensing, ownership and disclosure requirements, and a confidential franchise prospectus is shared only with qualified applicants.</p>
        </div>
      </section>

      <section className="f-faq j-torn-top" id="faq" aria-labelledby="faq-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">09 / Frequently asked questions</span><h2 id="faq-heading" className="s-title s-rows"><span>Your questions.</span><span className="k-soft">Our answers.</span></h2></div>
          </div>
          <div className="f-faq-list">{faqs.map(faq => <details key={faq.question} className="f-faq-item">
            <summary>{faq.question}<span className="f-faq-toggle" aria-hidden="true" /></summary>
            <p>{faq.answer}</p>
          </details>)}</div>
        </div>
      </section>

      <ClosingScene
        chapter="10 / Wings & Wheels"
        ticket="Franchise opportunities"
        left={<>Let&apos;s build the<br />next chapter.</>}
        right={<>Together, in<br /><em>three markets.</em></>}
        mobileHeadline={<>Your market.<br /><em>Our next chapter.</em></>}
        photo="/images/library/franchise-partner-lounge-v2.webp"
        photoPosition="center"
        pass={["Boarding pass", "Saudi · Egypt · Morocco"]}
        from="Your market"
        to="Our network"
        mobileText="Local ambition, international support and one shared plan."
        text="We are looking to connect with ambitious partners who share our belief in thoughtful travel management, strong local relationships and international collaboration."
        chips={[
          { icon: "handshake", label: "Partners" },
          { icon: "globe", label: "Markets" },
          { icon: "briefcase", label: "Business" },
          { icon: "support", label: "Support" },
        ]}
        action={{ label: "Become a franchise partner" }}
      />
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
