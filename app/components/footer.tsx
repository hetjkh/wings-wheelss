import Link from "next/link";
import { navLinks, office } from "./data";
import { Brand } from "./site-controls";

const serviceLinks = ["Corporate travel", "Leisure & holidays", "Groups & MICE", "Africa travel", "Visa assistance"];

export function Footer() {
  return <footer className="footer">
    <div className="shell footer-top">
      <div className="footer-brand">
        <Brand light />
        <p>Corporate, leisure and group travel, coordinated from Dubai to Africa and worldwide since 2013.</p>
        <div className="footer-social">{office.socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
      </div>
      <nav className="footer-col" aria-label="Company">
        <h3>Company</h3>
        {navLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </nav>
      <nav className="footer-col" aria-label="Services">
        <h3>Services</h3>
        {serviceLinks.map(label => <Link key={label} href="/#services">{label}</Link>)}
      </nav>
      <div className="footer-col">
        <h3>Contact</h3>
        {office.phones.map(p => <a key={p.href} href={p.href}>{p.label}</a>)}
        <a href={`mailto:${office.email}`}>{office.email}</a>
        <a href={office.map} target="_blank" rel="noreferrer">{office.address.join(", ")}</a>
        <span>{office.hours}<br />Sunday: Closed</span>
      </div>
    </div>
    <div className="shell footer-bottom">
      <span>© {new Date().getFullYear()} {office.company}. All rights reserved.</span>
      <a href="#top">Back to top ↑</a>
    </div>
  </footer>;
}
