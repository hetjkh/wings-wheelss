"use client";

import { useState } from "react";
import { office } from "./data";
import { Arrow, TravelIcon } from "./icons";

const reasons = ["Business", "Holiday", "Event", "Family", "Group", "Other"];
const travellers = ["1 traveller", "2 travellers", "3 – 5 travellers", "6 – 10 travellers", "11 – 30 travellers", "More than 30"];

export function JourneyPlanner() {
  const [reason, setReason] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) return <div className="s-planner s-planner-done" role="status">
    <TravelIcon kind="check" size={34} />
    <h3>Thank you. We&apos;ll take it from here.</h3>
    <p>This form is a preview, so your details haven&apos;t been sent yet. For now, call {office.phones[0].label} or message our team on WhatsApp.</p>
    <button type="button" className="j-text-link" onClick={() => { setSent(false); setReason(""); }}>Plan another journey <Arrow /></button>
  </div>;

  return <form className="s-planner" onSubmit={event => { event.preventDefault(); setSent(true); }}>
    <div className="s-planner-grid">
      <label>Travelling from<input name="from" placeholder="City / airport" autoComplete="off" required maxLength={80} /></label>
      <label>Travelling to<input name="to" placeholder="Destination / multi-stop" autoComplete="off" required maxLength={120} /></label>
      <label>Travel dates<input name="dates" placeholder="e.g. 12 – 18 November" maxLength={60} /></label>
      <label>Number of travellers<select name="travellers" defaultValue={travellers[0]}>{travellers.map(item => <option key={item}>{item}</option>)}</select></label>
    </div>
    <fieldset className="s-planner-reasons">
      <legend>Why are you travelling?</legend>
      <div>{reasons.map(item => <label key={item} className={reason === item ? "is-active" : undefined}>
        <input type="radio" name="reason" value={item} checked={reason === item} onChange={() => setReason(item)} />{item}
      </label>)}</div>
    </fieldset>
    <div className="s-planner-actions">
      <button type="submit" className="j-button j-button-olive">Plan my journey <Arrow /></button>
      <a className="j-button j-button-outline" href={office.whatsapp} target="_blank" rel="noreferrer"><TravelIcon kind="chat" size={16} />WhatsApp our team</a>
    </div>
    <p className="s-planner-note">Preview form · Your details won&apos;t be sent or stored.</p>
  </form>;
}
