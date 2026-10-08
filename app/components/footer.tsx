import Link from "next/link";
import { Brand, EnquiryButton } from "./site-controls";

const explore = [["Destinations", "/#map"], ["East Africa", "/#spotlight"], ["Our story", "/#story"], ["Journal", "/#journal"], ["Contact us", "/contact"]];
const journeys = [["Leisure & holidays", "/#services"], ["Corporate travel", "/#services"], ["Groups & MICE", "/#services"], ["FAQ", "/#questions"]];

export function Footer() {
  return <footer className="footer">
    <div className="section-shell footer-top">
      <div className="footer-brand"><Brand light /><p>Travel a little deeper.<br />Come back with a little more.</p></div>
      <nav className="footer-col" aria-label="Explore"><span>Explore</span>{explore.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
      <nav className="footer-col" aria-label="Journeys"><span>Journeys</span>{journeys.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
      <div className="footer-col"><span>Start planning</span><p>Every great journey starts with a conversation.</p><EnquiryButton className="button button-light">Plan your trip</EnquiryButton></div>
    </div>
    <div className="footer-wordmark" aria-hidden="true">Wings &amp; Wheels</div>
    <div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} Wings &amp; Wheels. All rights reserved.</span><span>Thoughtfully planned · Personally experienced</span><a href="#top">Back to top ↑</a></div>
  </footer>;
}
