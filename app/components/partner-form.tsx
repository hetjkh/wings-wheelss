"use client";

import { useState } from "react";
import { Arrow, TravelIcon } from "./icons";
import { office } from "./data";

const industries = ["Energy & resources", "Construction & engineering", "NGO & development", "Finance & consulting", "Trading & logistics", "Technology", "Healthcare", "Government & public sector", "Other"];
const volumes = ["1 – 5 trips a month", "6 – 20 trips a month", "21 – 50 trips a month", "More than 50 trips a month"];
const needs = ["Flights", "Hotels", "Visas", "Transfers", "Events & groups", "Africa travel", "Reporting", "Travel policy"];

/** The partnership enquiry, laid out as a proposal request. The form is a preview and sends nothing. */
export function PartnerForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <div className="p-form p-form-done" role="status">
    <TravelIcon kind="check" size={40} />
    <span className="j-eyebrow">Request received</span>
    <h3>Thank you</h3>
    <p>This form is a preview, so your request hasn&apos;t been sent yet. For now, please call {office.phones[0].label}, email {office.email} or message our team on WhatsApp.</p>
    <button type="button" className="j-button j-button-outline" onClick={() => setSent(false)}>Edit the request</button>
  </div>;

  return <form className="p-form" onSubmit={event => { event.preventDefault(); setSent(true); }}>
    <div className="p-form-head" aria-hidden="true"><span>Proposal request</span><span>Corporate partnerships · W&amp;W</span></div>
    <div className="p-form-grid">
      <label>Company name<input name="company" autoComplete="organization" required maxLength={120} /></label>
      <label>Contact person<input name="name" autoComplete="name" required maxLength={100} /></label>
      <label>Business email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
      <label>Industry<select name="industry" defaultValue="">{[<option key="" value="" disabled>Choose one</option>, ...industries.map(item => <option key={item}>{item}</option>)]}</select></label>
      <label>How often does your team travel?<select name="volume" defaultValue="">{[<option key="" value="" disabled>Choose one</option>, ...volumes.map(item => <option key={item}>{item}</option>)]}</select></label>
      <label className="p-form-wide">Main destinations<input name="destinations" placeholder="e.g. Nairobi, Kampala, London" maxLength={200} /></label>
    </div>
    <fieldset className="p-form-needs">
      <legend>What should the partnership cover?</legend>
      <div>{needs.map(item => <label key={item} className="p-toggle"><input type="checkbox" name="needs" value={item} /><span><TravelIcon kind="check" size={14} />{item}</span></label>)}</div>
    </fieldset>
    <label className="p-form-notes">Anything we should know?<textarea name="notes" rows={3} maxLength={1000} placeholder="Travel policy, approval process, upcoming projects…" /></label>
    <div className="p-form-actions">
      <button type="submit" className="j-button j-button-olive">Request a corporate proposal <Arrow /></button>
      <p>Preview form · Your details won&apos;t be sent or stored.</p>
    </div>
  </form>;
}
