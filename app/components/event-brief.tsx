"use client";

import { useState } from "react";
import { Arrow, TravelIcon } from "./icons";
import { office } from "./data";

const eventTypes = ["Conference", "Exhibition", "Corporate meeting", "Incentive travel", "Delegation", "Product launch", "Training programme", "Company event", "Other"];
const help = ["Flights", "Hotels", "Visas", "Airport transfers", "Local transportation", "Executive travel", "Delegate travel", "Group coordination", "Full travel management"];

/** An event brief laid out like a working document. The form is a preview and sends nothing. */
export function EventBrief() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="g-brief-sheet g-brief-done" role="status">
    <TravelIcon kind="check" size={40} />
    <span className="j-eyebrow">Brief received</span>
    <h3>Thank you</h3>
    <p>This form is a preview, so your brief hasn&apos;t been sent yet. For now, please call {office.phones[0].label}, email {office.email} or message our team on WhatsApp.</p>
    <button type="button" className="j-button j-button-outline" onClick={() => setSent(false)}>Edit the brief</button>
  </div>;

  return <form className="g-brief-sheet" onSubmit={event => { event.preventDefault(); setSent(true); }}>
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
      <button type="submit" className="j-button j-button-olive">Plan my group travel <Arrow /></button>
      <p>Preview form · Your details won&apos;t be sent or stored.</p>
    </div>
  </form>;
}
