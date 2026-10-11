import Link from "next/link";
import { EnquiryButton } from "./site-controls";
import { office, siteLinks } from "./data";

export function JourneyFooter() {
  return <footer className="j-footer"><div className="j-shell j-footer-main"><div><Link href="/" className="j-brand">Wings &amp; Wheels</Link><p className="j-footer-tagline">People · Places · Further together</p></div><nav aria-label="Footer navigation">{siteLinks.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav><EnquiryButton className="j-button j-button-outline-light">Plan Your Journey</EnquiryButton></div><div className="j-shell j-footer-bottom"><span>© {new Date().getFullYear()} Wings &amp; Wheels Travel and Tourism</span><a href={`mailto:${office.email}`}>{office.email}</a><a href={office.phones[0].href}>{office.phones[0].label}</a><a href="#top">Back to top ↑</a></div></footer>;
}
