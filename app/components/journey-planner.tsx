"use client";

import { useState, type FormEvent } from "react";
import { enquiryFromFormData, submitEnquiry } from "../../lib/submit-enquiry";
import { Arrow, TravelIcon } from "./icons";

const reasons = ["Business", "Holiday", "Event", "Family", "Group", "Other"];
const travellers = ["1 traveller", "2 travellers", "3 – 5 travellers", "6 – 10 travellers", "11 – 30 travellers", "More than 30"];

export function JourneyPlanner() {
  const [reason, setReason] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const message = [
      "I'd like to plan a journey with Wings & Wheels.",
      `From: ${data.get("from")}`,
      `To: ${data.get("to")}`,
      `Travel dates: ${data.get("dates") || "To be decided"}`,
      `Travellers: ${data.get("travellers")}`,
      `Reason: ${data.get("reason") || reason || "Not specified"}`,
    ].join("\n");
    const result = await submitEnquiry({
      ...enquiryFromFormData("journey-planner", data, {
        message,
        service: String(data.get("reason") || reason || "Travel planning"),
        destination: String(data.get("to") || ""),
      }),
    });
    setSending(false);
    if (!result.ok) { setError(result.error); return; }
    setSent(true);
  };

  if (sent) return <div className="s-planner s-planner-done" role="status">
    <TravelIcon kind="check" size={34} />
    <h3>Thank you. We&apos;ll take it from here.</h3>
    <p>Your journey details have been sent to our team. We&apos;ll be in touch shortly.</p>
    <button type="button" className="j-text-link" onClick={() => { setSent(false); setReason(""); setError(""); }}>Plan another journey <Arrow /></button>
  </div>;

  return <form className="s-planner" onSubmit={onSubmit}>
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
      <button type="submit" className="au-cta" disabled={sending}><span>{sending ? "Sending…" : "Plan my journey"}</span><span className="au-cta-dot"><Arrow /></span></button>
    </div>
    {error ? <p className="s-planner-note" role="alert">{error}</p> : <p className="s-planner-note">Your enquiry is emailed to our team and stored securely.</p>}
  </form>;
}
