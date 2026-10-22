import { Arrow } from "./icons";
import { JourneyHeader } from "./journey-header";
import { MaskedHero } from "./masked-hero";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import { DestinationPlanning } from "./destination-additions";
import type { DestinationGuide } from "./destination-guides";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./destinations.css";
import "./destinations-additions.css";

const localDetails: Record<string, { currency: string; language: string }> = {
  kenya: { currency: "Kenyan shilling (KES). Check payment arrangements for your hotels, parks and smaller stops.", language: "Kiswahili and English, alongside regional languages." },
  tanzania: { currency: "Tanzanian shilling (TZS). Confirm payment arrangements for each part of your stay.", language: "Kiswahili; English is also used in many tourism settings." },
  uganda: { currency: "Ugandan shilling (UGX). Plan cash and card use around your city and wildlife stops.", language: "English and Kiswahili, alongside regional languages." },
  "dubai-uae": { currency: "UAE dirham (AED). Check payment methods with individual providers.", language: "Arabic; English is widely used in visitor services." },
  maldives: { currency: "Maldivian rufiyaa (MVR). Check your resort's billing currency and payment arrangements.", language: "Dhivehi; English is widely used in tourism." },
  europe: { currency: "Varies by country. The euro is used in many destinations, with other currencies elsewhere.", language: "Varies by country and region. Plan local assistance where you need it." },
};

export function DestinationDetailPage({ guide }: { guide: DestinationGuide }) {
  const local = localDetails[guide.slug];
  const essentials = [
    ["Visa / document guidance", "Entry and transit requirements depend on your passport, purpose of travel and every stop on your route. Confirm current official requirements before booking."],
    ["Flight connectivity", "We can coordinate flights and onward connections around your departure city and dates. Airlines, schedules and availability are checked for your itinerary."],
    ["Currency", local.currency], ["Language", local.language], ["Climate", guide.climate], ["Practical travel information", guide.practical],
  ];
  return <ChapterMotion className="destinations-page destination-guide">
    <a className="skip-link" href="#why-go">Skip to content</a>
    <JourneyHeader introId="why-go" />
    <main>
      <MaskedHero
        key={guide.slug}
        id="destination-title"
        eyebrow={guide.region}
        lines={[guide.name]}
        text={guide.line}
        action={{ label: `Build my ${guide.name} journey`, href: "#destination-enquiry" }}
        media={{ image: guide.photo, alt: guide.alt }}
        back={{ href: "/destinations", label: "All destinations" }}
      />
      <section className="dg-intro j-torn-top" id="why-go" aria-labelledby="why-heading" style={{ zIndex: 2 }}>
        <div className="j-shell dg-intro-grid"><div><span className="j-eyebrow s-eyebrow">01 / Why go</span><h2 className="s-title" id="why-heading">{guide.line}</h2></div><div><p className="dg-intro-text">{guide.intro}</p><h3 className="dg-small-title">Best for</h3><ul className="dg-tags">{guide.bestFor.map(item => <li key={item}>{item}</li>)}</ul></div></div>
      </section>
      <section className="dg-experiences j-torn-top" aria-labelledby="experience-heading" style={{ zIndex: 3 }}>
        <div className="j-shell"><span className="j-eyebrow s-eyebrow">02 / Experience {guide.name}</span><h2 className="s-title" id="experience-heading">Different days.<br />Different discoveries.</h2><ol className="dg-experience-list">{guide.experiences.map((item, index) => <li key={item.name}><span>0{index + 1}</span><h3>{item.name}</h3><p>{item.text}</p></li>)}</ol></div>
      </section>
      <section className="dg-lengths j-torn-top" aria-labelledby="length-heading" style={{ zIndex: 4 }}>
        <div className="j-shell"><span className="j-eyebrow s-eyebrow">03 / How long?</span><h2 className="s-title" id="length-heading">Make room for<br />your kind of journey.</h2><div className="dg-length-grid">{guide.lengths.map(item => <article key={item.time}><h3>{item.time}</h3><p>{item.text}</p></article>)}</div><p className="dg-length-note">Starting points for planning, with the final itinerary shaped around your dates and pace.</p></div>
      </section>
      <section className="dg-combine j-torn-top" aria-labelledby="pair-heading" style={{ zIndex: 5 }}>
        <div className="j-shell"><span className="j-eyebrow s-eyebrow">04 / Make it a multi-destination journey</span><h2 className="s-title" id="pair-heading">There could be<br />more to the journey.</h2><div className="dg-combination-list">{guide.combinations.map(item => <a key={item} href="#destination-enquiry">{item}<Arrow /></a>)}</div><p>Flights, stays, transfers and the details between each stop, considered together.</p></div>
      </section>
      <section className="dg-essentials j-torn-top" aria-labelledby="essentials-heading" style={{ zIndex: 6 }}>
        <div className="j-shell"><span className="j-eyebrow s-eyebrow">05 / Travel essentials</span><h2 className="s-title" id="essentials-heading">Before you go.</h2><dl className="dg-essentials-grid">{essentials.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl><div className="dg-official"><p>Entry requirements and travel conditions can change. Check the current details for your passport and itinerary before confirming travel.</p><a href={guide.official.href} target="_blank" rel="noreferrer">{guide.official.label}<Arrow /></a></div></div>
      </section>
      <DestinationPlanning destination={guide.name} detail />
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
