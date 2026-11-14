import Link from "next/link";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { office } from "./data";
import "./journey.css";
import "./legal.css";

type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return <>
    <a className="skip-link" href="#legal-content">Skip to content</a>
    <JourneyHeader />
    <main id="legal-content" className="legal-page">
      <header className="legal-hero">
        <div className="j-shell legal-hero-inner">
          <p className="legal-kicker">Legal</p>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <p className="legal-updated">Last updated {updated}</p>
        </div>
      </header>

      <article className="j-shell legal-article">
        {sections.map(section => <section key={section.heading} className="legal-section">
          <h2>{section.heading}</h2>
          {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </section>)}

        <aside className="legal-contact">
          <h2>Questions</h2>
          <p>If you have questions about this policy, contact {office.company}.</p>
          <p>
            <a href={`mailto:${office.email}`}>{office.email}</a>
            {" · "}
            <a href={office.phones[0].href}>{office.phones[0].label}</a>
          </p>
          <p className="legal-address">{office.address.join(", ")}</p>
          <p className="legal-nav">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/contact">Contact</Link>
          </p>
        </aside>
      </article>
    </main>
    <JourneyFooter />
  </>;
}
