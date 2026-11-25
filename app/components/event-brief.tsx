"use client";

import { useState, type FormEvent } from "react";
import { enquiryFromFormData, submitEnquiry } from "../../lib/submit-enquiry";
import { Arrow, TravelIcon } from "./icons";

const eventTypes = ["Conference", "Exhibition", "Corporate meeting", "Incentive travel", "Delegation", "Product launch", "Training programme", "Company event", "Other"];
const help = ["Flights", "Hotels", "Visas", "Airport transfers", "Local transportation", "Executive travel", "Delegate travel", "Group coordination", "Full travel management"];

export function EventBrief() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const helpNeeded = data.getAll("help").map(String);
    const message = [
      "Groups & MICE event brief",
      `Company: ${data.get("company")}`,
      `Contact: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "Not provided"}`,
      `Event type: ${data.get("type") || "Not specified"}`,
      `Destination: ${data.get("destination") || "Not specified"}`,
      `Dates: ${data.get("dates") || "Not specified"}`,
      `Travellers: ${data.get("travellers") || "Not specified"}`,
      `Origins: ${data.get("origins") || "Not specified"}`,
      `Help needed: ${helpNeeded.join(", ") || "To be discussed"}`,
      data.get("notes") ? `Notes: ${data.get("notes")}` : "",
    ].filter(Boolean).join("\n");
    const result = await submitEnquiry({
      ...enquiryFromFormData("groups-mice", data, {
        message,
        service: String(data.get("type") || "Groups & MICE"),
        fields: { help: helpNeeded },
      }),
    });
    setSending(false);
    if (!result.ok) { setError(result.error); return; }
    setSent(true);
  };

  if (sent) return <div className="g-brief-sheet g-brief-done" role="status">
    <TravelIcon kind="check" size={40} />
    <span className="j-eyebrow">Brief received</span>
    <h3>Thank you</h3>
    <p>Your event brief has been sent to our Groups &amp; MICE team. We&apos;ll be in touch shortly.</p>
    <button type="button" className="j-button j-button-outline" onClick={() => { setSent(false); setError(""); }}>Edit the brief</button>
  </div>;

  return <form className="g-brief-sheet" onSubmit={onSubmit}>
    <div className="g-brief-head" aria-hidden="true"><span>Event brief</span><span>Groups &amp; MICE · W&amp;W</span></div>
    <fieldset>
      <legend><span>01</span>About you</legend>
      <div className="g-brief-grid">
        <label>Company / organisation<input name="company" autoComplete="organization" required maxLength={120} /></label>
        <label>Contact person<input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>Business email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
      </div>
    </fieldset>
    <fieldset>
      <legend><span>02</span>The event</legend>
      <div className="g-brief-grid">
        <label>Event / group type<select name="type" defaultValue="">{[<option key="" value="" disabled>Choose one</option>, ...eventTypes.map(type => <option key={type}>{type}</option>)]}</select></label>
        <label>Destination<input name="destination" placeholder="e.g. Dubai" maxLength={100} /></label>
        <label>Event dates<input name="dates" placeholder="e.g. 12 – 15 November" maxLength={60} /></label>
        <label>Approximate number of travellers<input name="travellers" type="number" min={1} max={5000} inputMode="numeric" /></label>
        <label className="g-brief-wide">Where will travellers be coming from?<input name="origins" placeholder="e.g. London, Nairobi, Riyadh" maxLength={200} /></label>
      </div>
    </fieldset>
    <fieldset>
      <legend><span>03</span>What do you need help with?</legend>
      <div className="g-brief-help">{help.map(item => <label key={item} className="g-toggle"><input type="checkbox" name="help" value={item} /><span><TravelIcon kind="check" size={14} />{item}</span></label>)}</div>
    </fieldset>
    <fieldset>
      <legend><span>04</span>Anything else</legend>
      <textarea className="g-brief-notes" name="notes" rows={3} maxLength={1000} aria-label="Tell us about your event or group" placeholder="Tell us about your event or group" />
    </fieldset>
    <div className="g-brief-actions">
      <button type="submit" className="j-button j-button-olive" disabled={sending}>{sending ? "Sending…" : "Plan my group travel"}{!sending && <Arrow />}</button>
      {error ? <p role="alert">{error}</p> : <p>Your enquiry is emailed to our team and stored securely.</p>}
    </div>
  </form>;
}
