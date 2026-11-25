"use client";

import { useEffect, useState, type FormEvent } from "react";
import { enquiryFromFormData, submitEnquiry } from "../../lib/submit-enquiry";
import { Arrow, TravelIcon } from "./icons";
import { office } from "./data";

const purposes = ["Business", "Leisure", "Safari", "Family", "Group", "Exhibition / Conference", "Project / Rotational Travel", "Multi-Destination Journey"];

export function AfricaEnquiry() {
  const [brief, setBrief] = useState("");
  const [departure, setDeparture] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => {
    let active = true;
    // The reviewed brief changes the height of this scrolling chapter.
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; };
  }, [brief, sent]);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = (name: string) => data.get(name) ? String(data.get(name)).split("-").reverse().join("/") : "To be confirmed";
    const message = [
      "I'd like to plan an Africa journey with Wings & Wheels.",
      `Travelling from: ${data.get("from")}`,
      `Travelling to: ${data.get("to")}`,
      `Travel dates: ${date("start")} to ${date("end")}`,
      `Number of travellers: ${data.get("travellers")}`,
      `Phone / WhatsApp: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Travelling for: ${data.getAll("purpose").join(", ") || "To be discussed"}`,
      data.get("notes") ? `Plans: ${data.get("notes")}` : "",
    ].filter(Boolean).join("\n");
    setBrief(message);
    setSending(true);
    setError("");
    const result = await submitEnquiry({
      ...enquiryFromFormData("africa", data, {
        message,
        destination: String(data.get("to") || ""),
        fields: {
          from: String(data.get("from") || ""),
          to: String(data.get("to") || ""),
          start: String(data.get("start") || ""),
          end: String(data.get("end") || ""),
          travellers: String(data.get("travellers") || ""),
          purposes: data.getAll("purpose").map(String),
          notes: String(data.get("notes") || ""),
        },
      }),
    });
    setSending(false);
    if (!result.ok) { setError(result.error); return; }
    setSent(true);
  };
  return <form className="a-enquiry-form" onSubmit={submit} onChange={() => { setBrief(""); setSent(false); setError(""); }}>
    <div className="a-form-header"><TravelIcon kind="route" size={22} /><span>Your Africa journey</span></div>
    <fieldset><legend><span>01</span>Where your journey connects</legend>
      <div className="a-form-fields">
        <label>Travelling from<input name="from" placeholder="City or country" required maxLength={120} /></label>
        <label>Travelling to<input name="to" placeholder="One destination or several stops" required maxLength={200} /></label>
        <label>Departure date<input name="start" type="date" value={departure} onChange={event => setDeparture(event.target.value)} /></label>
        <label>Return / onward date<input name="end" type="date" min={departure || undefined} /></label>
        <label>Number of travellers<input name="travellers" type="number" min={1} max={5000} defaultValue={1} required /></label>
        <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
        <label className="a-form-wide">Email<input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
      </div>
    </fieldset>
    <fieldset><legend><span>02</span>What are you travelling for?</legend>
      <div className="a-form-purposes">{purposes.map(purpose => <label key={purpose}><input type="checkbox" name="purpose" value={purpose} /><span>{purpose}</span></label>)}</div>
    </fieldset>
    <label className="a-form-notes">Tell us what you&apos;re planning<textarea name="notes" rows={4} maxLength={2000} placeholder="Your route, event, accommodation or anything you need help with." /></label>
    <button className="j-button j-button-olive" type="submit" disabled={sending}>{sending ? "Sending…" : "Plan my Africa journey"}{!sending && <Arrow />}</button>
    {error ? <p className="a-form-direct" role="alert">{error}</p> : null}
    {sent && brief && <div className="a-enquiry-ready" role="status">
      <strong>Your Africa journey brief has been sent.</strong><p>Our Africa travel team has received your details and will be in touch shortly.</p><pre>{brief}</pre>
      <div className="s-actions"><a className="j-button j-button-olive" href={`${office.whatsapp}?text=${encodeURIComponent(brief)}`} target="_blank" rel="noreferrer">Also message on WhatsApp<TravelIcon kind="chat" size={18} /></a></div>
    </div>}
    <p className="a-form-direct">Prefer to speak directly? <a href={office.whatsapp} target="_blank" rel="noreferrer">WhatsApp our Africa travel team.</a></p>
  </form>;
}
