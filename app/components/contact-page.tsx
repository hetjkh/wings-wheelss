"use client";

import { useEffect, useState } from "react";
import { countries } from "./countries";
import { office } from "./data";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";
import { JourneyHeader } from "./journey-header";
import { JourneyFooter } from "./journey-footer";
import { ChapterMotion } from "./chapter-motion";
import "./journey.css";
import "./journey-explorer.css";
import "./services.css";
import "./contact.css";

const services: { label: string; icon: IconKind }[] = [
  { label: "Flight booking", icon: "plane" },
  { label: "Visa assistance", icon: "document" },
  { label: "Holiday package", icon: "heart" },
  { label: "Hotel booking", icon: "pin" },
  { label: "Corporate travel", icon: "briefcase" },
  { label: "Groups & MICE", icon: "people" },
  { label: "Something else", icon: "compass" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const open = { from: 9, to: 19 };
const axis = { from: 6, to: 22 };

/** Dubai is UTC+4 all year, so the office clock never needs daylight-saving rules. */
function dubaiNow() {
  const now = new Date(Date.now() + 4 * 3600 * 1000);
  const day = (now.getUTCDay() + 6) % 7;
  const hour = now.getUTCHours() + now.getUTCMinutes() / 60;
  const time = `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}`;
  return { day, hour, time, isOpen: day !== 6 && hour >= open.from && hour < open.to };
}

function useDubaiClock() {
  const [clock, setClock] = useState<ReturnType<typeof dubaiNow> | null>(null);
  useEffect(() => {
    const update = () => setClock(dubaiNow());
    const first = setTimeout(update, 0);
    const timer = setInterval(update, 30000);
    return () => { clearTimeout(first); clearInterval(timer); };
  }, []);
  return clock;
}

const requestSteps = [
  { n: "01", title: "You send the request" },
  { n: "02", title: "A consultant reviews it" },
  { n: "03", title: "We reply with options and a quote" },
];

export function ContactPage() {
  const clock = useDubaiClock();
  const [service, setService] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [focus, setFocus] = useState(1);
  const [hint, setHint] = useState("");

  const detailsDone = name.trim().length >= 2 && email.includes("@") && phone.trim().length >= 7 && nationality !== "";
  const serviceDone = service !== "";
  const messageDone = message.trim().length >= 10;
  const chosen = services.find(item => item.label === service);
  const chapters = [
    { n: "01", title: "Your details", done: detailsDone },
    { n: "02", title: "Service", done: serviceDone },
    { n: "03", title: "Message", done: messageDone },
  ];

  const go = (next: number) => {
    if (next > 1 && !detailsDone) { setHint("Add your name, email, phone and nationality."); setFocus(1); return; }
    if (next > 2 && !serviceDone) { setHint("Choose the service you need."); setFocus(2); return; }
    setHint("");
    setFocus(next);
  };

  const reset = () => {
    setSent(false);
    setMessage("");
    setService("");
    setName("");
    setEmail("");
    setPhone("");
    setWhatsapp("");
    setNationality("");
    setDestination("");
    setFocus(1);
    setHint("");
  };

  return <ChapterMotion className="contact-page">
    <a className="skip-link" href="#form">Skip to the form</a>
    <div className="s-progress" aria-hidden="true"><span /></div>
    <JourneyHeader introId="reach" />
    <main>
      <section className="j-hero s-hero c-hero" id="top" aria-labelledby="contact-heading">
        <video className="j-photo j-hero-photo" src="/hero.mp4" poster="/images/journey/hero.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="j-hero-shade" />
        <div className="j-hero-cover-shade" aria-hidden="true" />
        <div className="j-shell j-hero-content">
          <div className="j-hero-title">
            <span className="j-eyebrow" data-hero>Contact us</span>
            <h1 id="contact-heading"><span className="s-line"><span data-hero>Talk to</span></span><span className="s-line"><span data-hero>our team.</span></span><span className="s-hero-accent" data-hero>We&apos;re here to help.</span></h1>
          </div>
          <div className="j-hero-aside">
            <span className="j-small-rule" data-hero />
            <p data-hero>Questions, quotes or bookings: our travel consultants in Dubai are here to help.</p>
          </div>
        </div>
        <a href="#reach" className="j-scroll-note">Four ways to reach us <span>↓</span></a>
      </section>

      <section className="c-reach j-torn-top" id="reach" aria-labelledby="reach-heading">
        <div className="j-shell">
          <div className="j-section-label s-draw"><span>01 / Four ways to reach us</span><span>Pick whichever suits you</span></div>
          <h2 id="reach-heading" className="s-title c-reach-title">Call, write,<br />message or visit.</h2>
          <ul className="c-lines" data-stagger="0.1">
            <li className="c-line">
              <span className="c-line-kind"><TravelIcon kind="support" size={20} />Call us</span>
              <span className="c-line-values">{office.phones.map(phone => <a key={phone.href} href={phone.href}>{phone.label}</a>)}</span>
              <span className="c-line-note">Mon – Sat, 9 AM – 7 PM</span>
            </li>
            <li className="c-line">
              <span className="c-line-kind"><TravelIcon kind="chat" size={20} />WhatsApp</span>
              <span className="c-line-values"><a href={office.whatsapp} target="_blank" rel="noreferrer">Chat on WhatsApp <Arrow /></a></span>
              <span className="c-line-note">Quick questions and instant replies</span>
            </li>
            <li className="c-line">
              <span className="c-line-kind"><TravelIcon kind="document" size={20} />Email us</span>
              <span className="c-line-values"><a href={`mailto:${office.email}`}>{office.email}</a></span>
              <span className="c-line-note">For quotes, bookings and documents</span>
            </li>
            <li className="c-line">
              <span className="c-line-kind"><TravelIcon kind="pin" size={20} />Visit us</span>
              <span className="c-line-values"><a href={office.map} target="_blank" rel="noreferrer">Port Saeed, Deira <Arrow /></a></span>
              <span className="c-line-note">{office.address[0]}</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="c-form j-torn-top" id="form" aria-labelledby="form-heading">
        <div className="j-shell">
          <div className="s-split-head c-form-head">
            <div>
              <span className="j-eyebrow s-eyebrow">02 / Get in touch</span>
              <h2 id="form-heading" className="s-title">Send us your<br />travel request.</h2>
            </div>
            <p className="s-lead">Need flight options, visa help or a full holiday plan? Fill in the form and a consultant will reply with options and a quote.</p>
          </div>

          <ol className="c-after">
            {requestSteps.map(item => <li key={item.n}><span>{item.n}</span>{item.title}</li>)}
          </ol>

          <div className="c-ticket">
            {sent ? <div className="c-done" role="status">
              <TravelIcon kind="check" size={34} />
              <h3>Thank you for contacting us</h3>
              <p>This form is a preview, so your details haven&apos;t been sent or saved yet. For now, please call, email or WhatsApp our team directly.</p>
              <button type="button" className="c-send" onClick={reset}>Send another request <Arrow /></button>
            </div> : <form onSubmit={event => { event.preventDefault(); if (messageDone) setSent(true); else setHint("Tell us a little more about the trip — at least a sentence."); }}>
              <div className="c-rail" role="tablist" aria-label="Request steps">
                {chapters.map((item, index) => <button key={item.n} type="button" role="tab" aria-selected={focus === index + 1} className={focus === index + 1 ? "is-current" : item.done ? "is-done" : ""} onClick={() => go(index + 1)}>
                  <span>{item.done ? "✓" : item.n}</span>{item.title}
                </button>)}
                <i aria-hidden="true" style={{ transform: `scaleX(${(focus - 1) / 2})` }} />
              </div>

              <div className="c-stage" key={focus}>
                {focus === 1 && <fieldset>
                  <legend>Your details</legend>
                  <p className="c-required">Fields marked * are required</p>
                  <div className="c-fields">
                    <label>Full name *<input name="name" autoComplete="name" placeholder="As on your passport" value={name} onChange={event => setName(event.target.value)} /></label>
                    <label>Email address *<input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} /></label>
                    <label>Phone number *<input name="phone" type="tel" autoComplete="tel" placeholder="+971 50 000 0000" value={phone} onChange={event => setPhone(event.target.value)} /></label>
                    <label>WhatsApp number (optional)<input name="whatsapp" type="tel" placeholder="+971 50 000 0000" value={whatsapp} onChange={event => setWhatsapp(event.target.value)} /></label>
                    <label className="c-wide">Nationality *<select name="nationality" value={nationality} onChange={event => setNationality(event.target.value)}><option value="" disabled>Select your nationality</option>{countries.map(country => <option key={country}>{country}</option>)}</select></label>
                  </div>
                </fieldset>}

                {focus === 2 && <fieldset>
                  <legend>Service required *</legend>
                  <div className="c-services" role="radiogroup" aria-label="What service do you need?">
                    {services.map(item => <label key={item.label} className={service === item.label ? "c-service is-active" : "c-service"}>
                      <input type="radio" name="service" value={item.label} checked={service === item.label} onChange={() => { setService(item.label); setHint(""); }} />
                      <TravelIcon kind={item.icon} size={22} /><span>{item.label}</span>
                    </label>)}
                  </div>
                  <div className="c-fields">
                    <label className="c-wide">Destination country<select name="destination" value={destination} onChange={event => setDestination(event.target.value)}><option value="">Select a country</option>{countries.map(country => <option key={country}>{country}</option>)}</select></label>
                  </div>
                </fieldset>}

                {focus === 3 && <fieldset>
                  <legend>Your message</legend>
                  <label className="c-message">Tell us about your requirements *
                    <textarea name="message" rows={5} placeholder="Travel dates, number of travellers, budget, anything we should know" maxLength={1000} value={message} onChange={event => setMessage(event.target.value)} />
                    <span className="c-meter" aria-hidden="true"><i style={{ transform: `scaleX(${message.length / 1000})` }} /></span>
                    <span className="c-count">{message.length}/1000 characters</span>
                  </label>
                </fieldset>}
              </div>

              <div className="c-pass" aria-live="polite">
                <span>{name.trim() || "Your name"}</span>
                <span>{chosen?.label || "Service"}</span>
                <span>{destination || "Destination"}</span>
              </div>
              {hint && <p className="c-hint" role="status">{hint}</p>}
              <div className="c-submit">
                <p>Preview form · Your details won&apos;t be sent or stored.</p>
                <div className="c-nav">
                  {focus > 1 && <button type="button" className="c-back" onClick={() => go(focus - 1)}>Back</button>}
                  {focus < 3
                    ? <button type="button" className="c-send" onClick={() => go(focus + 1)}>Continue <Arrow /></button>
                    : <button type="submit" className="c-send">Send request <Arrow /></button>}
                </div>
              </div>
            </form>}
          </div>

          <div className="c-office">
            <div className="c-company">
              <strong>{office.company}</strong>
              {office.address.map(line => <span key={line}>{line}</span>)}
            </div>
            <div className="c-social"><span>Follow us</span>{office.socials.map(social => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</div>
          </div>
        </div>
      </section>

      <section className="c-hours j-torn-top" id="hours" aria-labelledby="hours-heading">
        <div className="j-shell">
          <div className="s-split-head c-hours-head">
            <div><span className="j-eyebrow s-eyebrow">03 / Office hours</span><h2 id="hours-heading" className="s-title">When you&apos;ll<br />find us in.</h2></div>
            <div className="c-visit">
              <span>Our office</span>
              <strong>{office.address[0]}</strong>
              <p>{office.address[1]}</p>
              <a className="j-button j-button-cream" href={office.map} target="_blank" rel="noreferrer">Open in Google Maps <Arrow /></a>
            </div>
          </div>
          <figure className="c-week" aria-label="Open Monday to Saturday, 9 AM to 7 PM. Closed on Sunday.">
            <div className="c-week-axis" aria-hidden="true">{[6, 9, 12, 15, 19, 22].map(hour => <span key={hour} style={{ "--at": (hour - axis.from) / (axis.to - axis.from) } as React.CSSProperties}>{String(hour).padStart(2, "0")}:00</span>)}</div>
            <ol>{days.map((day, i) => {
              const today = clock?.day === i;
              const closed = i === 6;
              return <li key={day} className={`${today ? "is-today" : ""}${closed ? " is-closed" : ""}`.trim() || undefined} aria-hidden="true">
                <span className="c-day">{day}{today && <small>Today</small>}</span>
                <span className="c-track">
                  {closed ? <span className="c-closed">Closed</span> : <span className="c-open" style={{ "--from": (open.from - axis.from) / (axis.to - axis.from), "--to": (open.to - axis.from) / (axis.to - axis.from) } as React.CSSProperties}><span>9:00 AM – 7:00 PM</span></span>}
                  {today && clock && clock.hour >= axis.from && clock.hour <= axis.to && <span className="c-now" style={{ "--at": (clock.hour - axis.from) / (axis.to - axis.from) } as React.CSSProperties}><b>Now · {clock.time}</b></span>}
                </span>
              </li>;
            })}</ol>
          </figure>
          <div className="c-hours-foot">
            <p>Outside office hours? Send a request any time and we&apos;ll reply on the next working day.</p>
            <EnquiryButton className="j-button j-button-outline-light">Request a quote</EnquiryButton>
          </div>
        </div>
      </section>
    </main>
    <JourneyFooter />
  </ChapterMotion>;
}
