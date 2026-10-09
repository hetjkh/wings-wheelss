"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { countries } from "./countries";
import { office } from "./data";
import { Footer } from "./footer";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { SiteChrome } from "./site-controls";

const services: { label: string; icon: IconKind }[] = [
  { label: "Flight booking", icon: "plane" },
  { label: "Visa assistance", icon: "document" },
  { label: "Holiday package", icon: "heart" },
  { label: "Hotel booking", icon: "pin" },
  { label: "Corporate travel", icon: "briefcase" },
  { label: "Groups & MICE", icon: "people" },
  { label: "Something else", icon: "compass" },
];

function dubaiOpenNow() {
  const now = new Date(Date.now() + 4 * 3600 * 1000);
  const day = now.getUTCDay();
  const hour = now.getUTCHours() + now.getUTCMinutes() / 60;
  return day !== 0 && hour >= 9 && hour < 19;
}

export function ContactPage() {
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

  const quick = [
    { icon: "support" as const, title: "Call us", lines: office.phones.map(p => <a key={p.href} href={p.href}>{p.label}</a>) },
    { icon: "document" as const, title: "Email us", lines: [<a key="e" href={`mailto:${office.email}`}>{office.email}</a>] },
    { icon: "pin" as const, title: "Visit our office", lines: [<a key="a" href={office.map} target="_blank" rel="noreferrer">{office.address.join(", ")}</a>] },
    { icon: "calendar" as const, title: "Office hours", lines: [<span key="h">Monday – Saturday, 9:00 AM – 7:00 PM</span>, <span key="s">Sunday: Closed</span>] },
  ];

  return <SiteChrome>
    <a className="skip-link" href="#form">Skip to the form</a>
    <main>
      <section className="page-banner" id="top" aria-labelledby="contact-heading">
        <Image src="/images/dubai-terrace.png" alt="" fill preload sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="shell page-banner-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact us</span></nav>
          <h1 id="contact-heading">Contact us</h1>
          <p>Questions, quotes or bookings: our travel consultants in Dubai are here to help.</p>
        </div>
      </section>

      <section className="shell contact-quick" aria-label="Contact details">
        {quick.map(q => <div key={q.title} className="quick-card" data-reveal>
          <span className="quick-icon"><TravelIcon kind={q.icon} size={22} /></span>
          <h2>{q.title}</h2>
          {q.lines}
        </div>)}
      </section>

      <section className="section contact-main" id="form" aria-labelledby="form-heading">
        <div className="shell contact-grid">
          <aside className="contact-info" data-reveal>
            <span className="eyebrow">Get in touch</span>
            <h2 id="form-heading">Send us your travel request</h2>
            <p>Need flight options, visa help or a full holiday plan? Fill in the form and a consultant will reply with options and a quote.</p>
            <div className={open === null ? "office-status" : open ? "office-status is-open" : "office-status is-closed"}><i />{open === null ? "Office hours: Mon – Sat, 9 AM – 7 PM" : open ? "Our office is open now" : "Our office is closed now. We'll reply on the next working day."}</div>
            <a className="whatsapp-card" href={office.whatsapp} target="_blank" rel="noreferrer">
              <span><TravelIcon kind="support" size={20} /></span>
              <span><b>Chat on WhatsApp</b><small>Quick questions and instant replies</small></span>
              <Arrow />
            </a>
            <div className="contact-company">
              <strong>{office.company}</strong>
              {office.address.map(l => <span key={l}>{l}</span>)}
            </div>
            <div className="contact-social"><span>Follow us</span>{office.socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</div>
          </aside>

          <div className="contact-form" data-reveal>
            {sent ? <div className="enquiry-success">
              <TravelIcon kind="check" size={34} />
              <span className="eyebrow">Request received</span>
              <h3>Thank you for contacting us</h3>
              <p>This form is a preview, so your details haven&apos;t been sent or saved yet. For now, please call, email or WhatsApp our team directly.</p>
              <button type="button" className="button button-dark" onClick={() => { setSent(false); setMessage(""); setService(""); }}>Send another request <Arrow /></button>
            </div> : <form onSubmit={event => { event.preventDefault(); setSent(true); }}>
              <p className="form-required">Fields marked * are required</p>

              <fieldset>
                <legend><i>1</i>Your details</legend>
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

              <fieldset>
                <legend><i>2</i>Service required</legend>
                <div className="service-pills" role="radiogroup" aria-label="What service do you need? *">
                  {services.map(s => <label key={s.label} className={service === s.label ? "is-active" : undefined}>
                    <input type="radio" name="service" value={s.label} checked={service === s.label} onChange={() => setService(s.label)} required />
                    <TravelIcon kind={s.icon} size={16} />{s.label}
                  </label>)}
                </div>
                <label>Destination country<select name="destination" defaultValue=""><option value="">Select a country</option>{countries.map(c => <option key={c}>{c}</option>)}</select></label>
              </fieldset>

              <fieldset>
                <legend><i>3</i>Your message</legend>
                <label>Tell us about your requirements *
                  <textarea name="message" rows={4} placeholder="Travel dates, number of travellers, budget, anything we should know" required minLength={10} maxLength={1000} value={message} onChange={e => setMessage(e.target.value)} />
                  <span className="char-count">{message.length}/1000 characters</span>
                </label>
              </fieldset>

              <div className="form-submit">
                <p className="demo-note">Preview form · Your details won&apos;t be sent or stored.</p>
                <button type="submit" className="button button-gold">Send request <Arrow /></button>
              </div>
            </form>}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </SiteChrome>;
}
