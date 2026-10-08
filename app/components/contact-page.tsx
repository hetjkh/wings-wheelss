"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { countries } from "./countries";
import { Footer } from "./footer";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { Brand, MenuButton, SiteChrome } from "./site-controls";

const office = {
  phones: [{ label: "+971 54 785 8338", href: "tel:+971547858338" }, { label: "+971 52 288 0935", href: "tel:+971522880935" }],
  email: "reservation@wwtravels.net",
  whatsapp: "https://wa.me/971547858338",
  company: "Wings and Wheels Travel and Tourism LLC",
  address: ["Office No. 27, Al Khaimah Building", "Port Saeed, Deira, Dubai, UAE"],
  map: "https://www.google.com/maps/search/?api=1&query=Al+Khaimah+Building+Port+Saeed+Deira+Dubai",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/search/top?q=Wings%20%26%20Wheels%20Travel%20and%20Tourism" },
    { label: "Instagram", href: "https://www.instagram.com/wingsandwheels.travel" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/wingsandwheels" },
  ],
};

const services: { label: string; icon: IconKind }[] = [
  { label: "Flight booking", icon: "plane" },
  { label: "Visa assistance", icon: "document" },
  { label: "Holiday package", icon: "heart" },
  { label: "Hotel booking", icon: "pin" },
  { label: "Corporate travel", icon: "briefcase" },
  { label: "Groups & MICE", icon: "people" },
  { label: "Something else", icon: "compass" },
];

const shortcuts = [
  { label: "Plan a holiday", service: "Holiday package" },
  { label: "Corporate travel enquiry", service: "Corporate travel" },
  { label: "Visa help", service: "Visa assistance" },
];

const faces = ["/images/santorini.jpg", "/images/kenya-safari.png", "/images/maldives.jpg"];

function dubaiOpenNow() {
  const now = new Date(Date.now() + 4 * 3600 * 1000);
  const day = now.getUTCDay();
  const hour = now.getUTCHours() + now.getUTCMinutes() / 60;
  return day !== 0 && hour >= 9 && hour < 19;
}

export function ContactPage() {
  const form = useRef<HTMLElement>(null);
  const [service, setService] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(dubaiOpenNow());
    const first = setTimeout(update, 0);
    const timer = setInterval(update, 60000);
    return () => { clearTimeout(first); clearInterval(timer); };
  }, []);

  const pick = (value: string) => {
    setService(value);
    setSent(false);
    form.current?.scrollIntoView({ behavior: "smooth" });
  };

  return <SiteChrome>
    <a className="skip-link" href="#form">Skip to the form</a>
    <header className="contact-hero section-shell" id="top">
      <div className="contact-top">
        <Brand />
        <nav aria-label="Primary"><Link href="/">Home</Link><Link href="/#map">Destinations</Link><Link href="/#story">Our story</Link><Link href="/#journal">Journal</Link></nav>
        <MenuButton />
      </div>

      <div className="contact-hero-grid">
        <div className="contact-hero-copy">
          <svg className="contact-swirl" viewBox="0 0 600 300" fill="none" aria-hidden="true"><path d="M-20 250C60 240 90 170 60 130 30 90-10 120 10 160c30 60 150 40 230-40C300 60 380 30 470 60c60 20 110 0 150-40" /></svg>
          <h1><em>Say hello,</em> let&apos;s talk travel</h1>
          <div className="contact-note">
            <p>Every great journey starts with a conversation. Tell us where you&apos;d like to go — for work, for wonder, or everything in between.</p>
            <div className="contact-note-foot">
              <TravelIcon kind="plane" size={22} />
              <span className="contact-faces">{faces.map(f => <span key={f}><Image src={f} alt="" fill sizes="44px" /></span>)}</span>
              <small>Leisure · Corporate · Groups</small>
            </div>
            <a className="contact-go" href="#form" aria-label="Go to the contact form">Go</a>
          </div>
          <ul className="contact-shortcuts">
            {shortcuts.map(s => <li key={s.label}><button type="button" onClick={() => pick(s.service)}>{s.label}<Arrow diagonal /></button></li>)}
          </ul>
        </div>

        <div className="contact-hero-visual">
          <figure>
            <Image src="/images/dubai-terrace.png" alt="A terrace overlooking the Dubai skyline at sunset" fill preload sizes="(max-width: 1000px) 100vw, 50vw" />
          </figure>
          <span className="contact-cut"><span className="script">From the UAE,</span>to the world</span>
          <svg className="contact-loop" viewBox="0 0 300 400" fill="none" aria-hidden="true"><path d="M300 10C200 40 120 120 150 220c20 70 110 80 100 20-8-50-90-40-110 30-20 70 40 120 120 110" /><circle cx="265" cy="378" r="10" /></svg>
          <div className="contact-hero-foot">
            <nav aria-label="Contact shortcuts"><a href={office.phones[0].href}>Call us</a><a href={`mailto:${office.email}`}>Email</a><a href={office.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></nav>
            <span className="contact-year">Est. 2013</span>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section className="contact-main section-shell section-space" id="form" ref={form} aria-labelledby="form-heading">
        <div className="contact-main-head" data-reveal>
          <div><span className="eyebrow eyebrow-rule">Get in touch</span><h2 id="form-heading">Your journey, <em>checked in.</em></h2></div>
          <p>Have questions? Ready to book your trip? Our travel experts are here to help you every step of the way. Whether you need flight options, visa help, or a full vacation plan — we&apos;re just a message away.</p>
        </div>

        <div className="pass" data-reveal>
          <aside className="pass-stub" aria-label="Our office">
            <div className="pass-stub-top">
              <span>Wings &amp; Wheels</span>
              <span className={open === null ? "pass-status" : open ? "pass-status is-open" : "pass-status is-closed"}>{open === null ? "Office hours" : open ? "Open now" : "Closed now"}</span>
            </div>
            <div className="pass-route" aria-hidden="true"><strong>YOU</strong><span><TravelIcon kind="plane" size={18} /></span><strong>DXB</strong></div>

            <dl className="pass-details">
              <div><dt>Call us</dt><dd>{office.phones.map(p => <a key={p.href} href={p.href}>{p.label}</a>)}</dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${office.email}`}>{office.email}</a></dd></div>
              <div><dt>Visit us</dt><dd><a href={office.map} target="_blank" rel="noreferrer"><b>{office.company}</b>{office.address.map(l => <span key={l}>{l}</span>)}</a></dd></div>
              <div><dt>Office hours</dt><dd><span>Monday – Saturday</span><b>9:00 AM – 7:00 PM</b><span>Sunday: Closed</span></dd></div>
            </dl>

            <a className="pass-whatsapp" href={office.whatsapp} target="_blank" rel="noreferrer">
              <span><TravelIcon kind="support" size={20} /></span>
              <span><b>WhatsApp us directly</b><small>Quick support &amp; instant replies</small></span>
              <Arrow diagonal />
            </a>

            <div className="pass-social"><span>Connect with us</span>{office.socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
            <figure className="pass-photo">
              <Image src="/images/dubai.jpg" alt="The Dubai skyline at dusk" fill sizes="(max-width: 1150px) 100vw, 330px" />
              <figcaption><TravelIcon kind="pin" size={14} />Deira, Dubai</figcaption>
            </figure>
            <svg className="pass-barcode" viewBox="0 0 220 34" aria-hidden="true">{Array.from({ length: 44 }, (_, i) => <rect key={i} x={i * 5} y="0" width={[1, 3, 2, 1, 2, 3, 1][i % 7]} height="34" />)}</svg>
          </aside>

          <div className="pass-form">
            {sent ? <div className="enquiry-success pass-success">
              <TravelIcon kind="check" size={34} />
              <span className="eyebrow">Request received</span>
              <h3>You&apos;re all <em>checked in.</em></h3>
              <p>Thank you for reaching out. This form is a preview, so your details haven&apos;t been sent or saved yet — for now, please call, email or WhatsApp our team directly.</p>
              <button type="button" className="button button-dark" onClick={() => { setSent(false); setMessage(""); setService(""); }}>Send another request <Arrow /></button>
            </div> : <form onSubmit={event => { event.preventDefault(); setSent(true); }}>
              <div className="pass-form-top"><span>Travel request</span><span>Fields marked * are required</span></div>

              <fieldset className="pass-step">
                <legend><i>01</i>Personal information</legend>
                <div className="form-row">
                  <label>Full name *<input name="name" autoComplete="name" placeholder="As on your passport" required minLength={2} maxLength={100} /></label>
                  <label>Email address *<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                </div>
                <div className="form-row">
                  <label>Phone number *<input name="phone" type="tel" autoComplete="tel" placeholder="+971 50 000 0000" required pattern="\+?[0-9 ()\-]{7,24}" title="7–20 digits, with your country code" /></label>
                  <label><span>WhatsApp number <small>(optional)</small></span><input name="whatsapp" type="tel" placeholder="+971 50 000 0000" pattern="\+?[0-9 ()\-]{7,24}" title="7–20 digits, with your country code" /></label>
                </div>
                <label>Nationality *<select name="nationality" required defaultValue=""><option value="" disabled>Select your nationality</option>{countries.map(c => <option key={c}>{c}</option>)}</select></label>
              </fieldset>

              <fieldset className="pass-step">
                <legend><i>02</i>Service information</legend>
                <div className="pass-services" role="radiogroup" aria-label="What service do you need? *">
                  <span className="pass-label">What service do you need? *</span>
                  {services.map(s => <label key={s.label} className={service === s.label ? "is-active" : undefined}>
                    <input type="radio" name="service" value={s.label} checked={service === s.label} onChange={() => setService(s.label)} required />
                    <TravelIcon kind={s.icon} size={16} />{s.label}
                  </label>)}
                </div>
                <label>Destination country<select name="destination" defaultValue=""><option value="">Select a country</option>{countries.map(c => <option key={c}>{c}</option>)}</select></label>
              </fieldset>

              <fieldset className="pass-step">
                <legend><i>03</i>Your message</legend>
                <label>Tell us about your requirements *
                  <textarea name="message" rows={4} placeholder="Travel dates, number of travellers, budget, anything we should know…" required minLength={10} maxLength={1000} value={message} onChange={e => setMessage(e.target.value)} />
                  <span className="pass-count">{message.length}/1000 characters</span>
                </label>
              </fieldset>

              <div className="pass-submit">
                <p className="demo-note">Preview form · Your details won&apos;t be sent or stored.</p>
                <button type="submit" className="button button-dark">Send my request <Arrow /></button>
              </div>
            </form>}
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </SiteChrome>;
}
