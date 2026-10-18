import { Fragment } from "react";
import Image from "./travel-image";
import Link from "next/link";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import { PartnerForm } from "./partner-form";
import { ValuePanels, type ValuePanel } from "./value-panels";
import { office } from "./data";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./corporate.css";
import "./partnership.css";

const compare = [
  { topic: "Rates", standard: "Published fares and rates", partner: "Preferred corporate rates" },
  { topic: "Contact", standard: "Whoever picks up", partner: "A dedicated account manager" },
  { topic: "Changes", standard: "Handled trip by trip", partner: "Priority support when plans move" },
  { topic: "Paperwork", standard: "An invoice for every booking", partner: "Consolidated billing & reporting" },
  { topic: "Terms", standard: "Booking by booking", partner: "A long-term agreement" },
];

const values: ValuePanel[] = [
  { note: "Pay less on the routes you fly", title: ["Preferred", "corporate rates"], text: "Airfares and hotel rates arranged around your company's routes, travel volume and regular destinations.", photo: "/images/library/corporate-preferred-rates.webp", alt: "A business traveller in an airport lounge overlooking Dubai at dusk" },
  { note: "Someone who knows your team", title: ["Dedicated", "account manager"], text: "One named contact who knows your travellers, your policy and the way your business likes to move.", photo: "/images/library/corporate-account-manager.webp", alt: "An account manager coordinating travel at a desk overlooking Dubai", position: "center" },
  { note: "Comfort for every traveller", title: ["Exclusive", "travel benefits"], text: "Partner-only benefits that add comfort and flexibility for your travellers, agreed in your proposal.", photo: "/images/library/corporate-travel-benefits.webp", alt: "A traveller relaxing in an airport lounge at sunset", position: "center" },
  { note: "Less time on paperwork", title: ["Simpler", "work"], text: "Consolidated invoicing, clear records and regular reporting, so finance spends less time on travel.", photo: "/images/library/corporate-simpler-work.webp", alt: "A corporate travel coordinator reviewing bookings and reports on office monitors", position: "center" },
];

const levels = [
  {
    id: "essential", name: "Essential", for: "For growing businesses", text: "A simple arrangement for companies starting to travel more often.",
    items: ["Preferred rates on key routes", "Dedicated booking support", "Visa & documentation assistance", "Monthly travel summary"],
  },
  {
    id: "preferred", name: "Preferred", for: "For frequent business travellers", text: "For teams on the move every month, across several markets.",
    items: ["Everything in Essential", "A named account manager", "Priority changes & rebooking", "Consolidated invoicing", "Traveller profiles & preferences"],
  },
  {
    id: "bespoke", name: "Bespoke", for: "For complex and multi-market travel", text: "Built from the ground up for larger programmes and projects.",
    items: ["Tailored commercial terms", "Multi-market & Africa coordination", "Group & event travel included", "Travel policy alignment", "Regular business reviews"],
  },
];

const regions = [
  { word: "UAE", places: "Dubai · Your home base" },
  { word: "Africa", places: "Khartoum · Juba · Kampala · Nairobi · Dar es Salaam" },
  { word: "Worldwide", places: "Wherever your business goes" },
];

const advantages: { icon: IconKind; title: string; text: string }[] = [
  { icon: "plane", title: "Better fares & hotel rates", text: "Preferred access on the routes and stays you use most." },
  { icon: "support", title: "Priority support", text: "A faster response when flights, meetings or plans change." },
  { icon: "people", title: "One point of contact", text: "Someone who already knows your team and your policy." },
  { icon: "document", title: "Visas & documentation", text: "Requirements checked and paperwork prepared in good time." },
  { icon: "car", title: "Transfers & ground travel", text: "Airport pick-ups and chauffeurs arranged with every trip." },
  { icon: "briefcase", title: "Clear reporting", text: "Spend, travellers and trips in one consolidated view." },
];

const steps = [
  { title: "Tell us about your company", text: "Who travels, how often and where your business needs to be." },
  { title: "We understand your needs", text: "We review your travel patterns, policy and priorities with you." },
  { title: "Receive your corporate proposal", text: "Rates, benefits and service levels, set out for your company only." },
  { title: "Activate your partnership", text: "Your account manager sets everything up, and your team starts travelling." },
];

function Card({ name, id }: { name: string; id: string }) {
  return <div className={`p-card p-card-${id}`} aria-hidden="true">
    <span className="p-card-brand">Wings &amp; Wheels</span>
    <span className="p-card-chip" />
    <span className="p-card-name">{name}</span>
    <span className="p-card-foot"><span>Corporate partner</span><span>Dubai · Africa · Worldwide</span></span>
  </div>;
}

export default function PartnershipPage() {
  return <ChapterMotion className="partnership-page">
    <a className="skip-link" href="#why">Skip to content</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="why" />
    <main>
      <section className="j-hero s-hero p-hero" id="top" aria-labelledby="partnership-hero-heading">
        <video className="j-photo j-hero-photo" src="/hero.mp4" poster="/images/journey/hero.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow" data-hero>Corporate partnerships</span>
            <h1 id="partnership-hero-heading"><span className="s-line"><span data-hero>Not just</span></span><span className="s-line"><span data-hero>corporate travel.</span></span><span className="s-hero-accent" data-hero>A corporate travel partnership.</span></h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" data-hero />
            <p data-hero>Your business deserves more than standard travel rates. We build an arrangement around how your company really travels.</p>
            <div className="s-actions" data-hero>
              <EnquiryButton className="j-button j-button-cream" service="Corporate partnership">Become a corporate partner</EnquiryButton>
              <a className="j-button j-button-outline-light" href="#proposal">Request a proposal</a>
            </div>
          </div>
        </div>
        <a href="#why" className="j-scroll-note">More than a provider <span>↓</span></a>
      </section>

      <section className="p-why j-torn-top" id="why" aria-labelledby="why-heading">
        <div className="j-shell p-why-grid">
          <div className="p-why-copy">
            <span className="j-eyebrow s-eyebrow">01 / Why a partnership</span>
            <h2 id="why-heading" className="s-title s-rows"><span>Not just another</span><span>travel provider.</span><span className="k-soft">A partner in how</span><span className="k-soft">your business moves.</span></h2>
            <p className="k-body">A company sending people across the region and beyond needs more than individual bookings. It needs someone who understands its travellers, its policy and its priorities, and who is accountable for getting every journey right.</p>
            <p className="p-why-note">Your travel shapes the arrangement. Not the other way around.</p>
          </div>
          <div className="p-compare" role="table" aria-label="Standard booking compared with a corporate partnership">
            <div className="p-compare-head" role="row">
              <span role="columnheader"><span className="sr-only">Topic</span></span>
              <span role="columnheader">Standard booking</span>
              <span role="columnheader">Corporate partnership</span>
            </div>
            <div className="p-compare-body" data-stagger="0.08">{compare.map(row => <div key={row.topic} className="p-compare-row" role="row">
              <span role="rowheader">{row.topic}</span>
              <span role="cell" className="p-compare-standard">{row.standard}</span>
              <span role="cell" className="p-compare-partner"><TravelIcon kind="check" size={16} />{row.partner}</span>
            </div>)}</div>
          </div>
        </div>
      </section>

      <section className="p-value" id="value" aria-labelledby="value-heading" data-steps="2">
        <div className="p-value-band">
          <div className="p-value-band-grid" aria-hidden="true" />
          <div className="p-value-band-map" aria-hidden="true" />
          <h2 id="value-heading">Partnership<br />benefits</h2>
        </div>
        <ValuePanels items={values} />
      </section>

      <section className="p-levels j-torn-top" id="levels" aria-labelledby="levels-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">03 / Partnership levels</span><h2 id="levels-heading" className="s-title s-rows"><span>Your company.</span><span>Your travel patterns.</span><span className="k-soft">Your arrangement.</span></h2></div>
            <p className="k-body">Three starting points. Every partnership is then shaped around your travellers, routes and volume.</p>
          </div>
          <ol className="p-level-grid" data-stagger="0.12">{levels.map(level => <li key={level.id} className={`p-level p-level-${level.id}`}>
            <Card name={level.name} id={level.id} />
            <div className="p-level-copy">
              <span className="p-level-for">{level.for}</span>
              <h3>Corporate {level.name}</h3>
              <p>{level.text}</p>
              <ul>{level.items.map(item => <li key={item}><TravelIcon kind="check" size={16} />{item}</li>)}</ul>
            </div>
          </li>)}</ol>
          <p className="p-levels-note"><TravelIcon kind="document" size={16} />Rates, credit terms and account-specific benefits are agreed privately and set out in your individual proposal.</p>
        </div>
      </section>

      <section className="p-regions j-torn-top" id="regions" aria-labelledby="regions-heading">
        <Image className="p-regions-map" src="/images/world-map.svg" alt="" fill unoptimized />
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">04 / UAE + Africa</span><h2 id="regions-heading" className="s-title s-rows"><span>Two regions.</span><span className="k-soft">One connected travel partnership.</span></h2></div>
            <div className="p-regions-aside">
              <p className="k-body">With our UAE base and partner network across key African markets, we support organisations managing travel between Dubai and the places their business depends on.</p>
              <Link className="j-button j-button-cream" href="/africa">Explore regional travel <Arrow /></Link>
            </div>
          </div>
          <ol className="p-regions-row">{regions.map((region, i) => <Fragment key={region.word}>
            {i > 0 && <li className="p-region-arrow" aria-hidden="true"><svg viewBox="0 0 120 20"><path data-trace pathLength={1} d="M2 10h112" /><path data-trace pathLength={1} d="M104 2l10 8-10 8" /></svg></li>}
            <li className="p-region"><span className="p-region-word">{region.word}</span><small>{region.places}</small></li>
          </Fragment>)}</ol>
        </div>
      </section>

      <section className="p-advantages j-torn-top" id="advantages" aria-labelledby="advantages-heading">
        <div className="j-shell">
          <div className="s-split-head">
            <div><span className="j-eyebrow s-eyebrow">05 / Why partner with us</span><h2 id="advantages-heading" className="s-title s-rows"><span>The advantage of having</span><span>a travel partner.</span></h2></div>
            <p className="k-body">Everything a growing business needs from its travel, handled by one team in Dubai.</p>
          </div>
          <div className="p-bento" data-stagger="0.07">
            <figure className="p-bento-photo">
              <Image src="/images/library/business-conversation.webp" alt="Two business travellers talking at a lounge table" fill sizes="(max-width: 991px) 92vw, 28vw" style={{ objectPosition: "center" }} />
              <figcaption><strong>One account.</strong><span>Every journey.</span></figcaption>
            </figure>
            {advantages.map((item, i) => <div key={item.title} className="p-bento-item">
              <span className="p-bento-icon"><TravelIcon kind={item.icon} size={22} /></span>
              <span className="p-bento-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>)}
          </div>
        </div>
      </section>

      <section className="p-steps j-torn-top" id="how" aria-labelledby="how-heading">
        <div className="p-steps-photo"><Image src="/images/library/airport-traveller.webp" alt="A traveller with a rolling suitcase inside an airport terminal" fill sizes="(max-width: 991px) 100vw, 46vw" style={{ objectPosition: "center" }} /></div>
        <div className="j-shell p-steps-grid">
          <div className="p-steps-side">
            <span className="j-eyebrow s-eyebrow">06 / How it works</span>
            <h2 id="how-heading" className="s-title s-rows"><span>Four steps to a better</span><span>travel arrangement.</span></h2>
          </div>
          <ol className="p-step-list" data-progress="top 70%" data-progress-end="bottom 55%">{steps.map((step, i) => <li key={step.title} style={{ "--i": i } as React.CSSProperties}>
            <span className="p-step-number">{String(i + 1).padStart(2, "0")}</span>
            <div><h3>{step.title}</h3><p>{step.text}</p></div>
          </li>)}</ol>
        </div>
      </section>

      <section className="p-proposal j-torn-top" id="proposal" aria-labelledby="proposal-heading">
        <div className="j-shell p-proposal-grid">
          <div className="p-proposal-copy">
            <span className="j-eyebrow s-eyebrow">07 / Corporate partnership enquiry</span>
            <h2 id="proposal-heading" className="s-title s-rows"><span>Let&apos;s design</span><span>an arrangement</span><span className="k-soft">around your business.</span></h2>
            <p className="k-body">Tell us a little about how your company travels. Our corporate team will prepare a proposal for your business alone.</p>
            <dl className="p-direct">
              <div><dt>Call</dt><dd><a href={office.phones[0].href}>{office.phones[0].label}</a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${office.email}`}>{office.email}</a></dd></div>
              <div><dt>WhatsApp</dt><dd><a href={office.whatsapp} target="_blank" rel="noreferrer">Message our team</a></dd></div>
            </dl>
          </div>
          <PartnerForm />
        </div>
      </section>

      <section className="s-final p-final j-torn-top" aria-labelledby="final-heading">
        <Image className="j-photo s-final-photo" src="/images/library/corporate-partnership-lounge.webp" alt="" fill sizes="100vw" />
        <div className="s-final-shade" />
        <div className="j-shell s-final-content">
          <span className="j-eyebrow">Wings &amp; Wheels corporate partnerships</span>
          <h2 id="final-heading">Your business is going places.</h2>
          <p className="s-lead-body">Let&apos;s build a partnership that goes with it.</p>
          <div className="s-actions">
            <EnquiryButton className="j-button j-button-cream" service="Corporate partnership">Become a corporate partner</EnquiryButton>
            <Link className="j-button j-button-outline-light" href="/contact">Speak to our corporate team</Link>
          </div>
        </div>
      </section>
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
