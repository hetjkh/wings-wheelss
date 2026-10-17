"use client";

import { useState, type FormEvent } from "react";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { office } from "./data";

const kinds = ["Leisure", "Family", "Honeymoon / Couple", "Safari", "Business", "Group", "Multi-destination", "Not sure yet"];
const kindIcons: IconKind[] = ["sun", "people", "heart", "leaf", "briefcase", "people", "route", "compass"];

export function DestinationEnquiry({ destination = "", heading = "Where are you thinking of going?" }: { destination?: string; heading?: string }) {
  const [brief, setBrief] = useState("");
  const [flexible, setFlexible] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const date = (value: FormDataEntryValue | null) => value ? String(value).split("-").reverse().join("/") : "To be decided";
    const message = [
      "I'd like to start planning a journey with Wings & Wheels.",
      `Destination: ${data.get("destination")}`,
      `Departure city: ${data.get("departure")}`,
      `Preferred dates: ${date(data.get("start"))} to ${date(data.get("end"))}${flexible ? " (flexible)" : ""}`,
      `Travellers: ${adults + children} (${adults} adults, ${children} children)`,
      `Approximate trip length: ${data.get("length")}`,
      `Kind of journey: ${data.getAll("kind").join(", ") || "Not sure yet"}`,
      data.get("notes") ? `Anything else: ${data.get("notes")}` : "",
    ].filter(Boolean).join("\n");
    setBrief(message);
  };

  return <form className="d-enquiry-form" onSubmit={submit} onChange={() => setBrief("")}>
    <div className="d-enquiry-card-head"><span className="d-enquiry-card-kicker"><TravelIcon kind="plane" size={18} />Your next chapter</span><h3>{heading}</h3><p>A few details. A world of possibilities.</p></div>
    <fieldset className="d-enquiry-group"><legend><span>01</span>The places</legend>
    <div className="d-enquiry-fields">
      <label>Destination / Not sure yet<input name="destination" defaultValue={destination} placeholder="A place, a few stops, or not sure yet" maxLength={160} required list="destination-suggestions" /></label>
      <datalist id="destination-suggestions">{["Kenya", "Tanzania", "Uganda", "Dubai & UAE", "Maldives", "Europe", "Not sure yet"].map(place => <option key={place} value={place} />)}</datalist>
      <label>Departure city<input name="departure" placeholder="Where will you be starting?" maxLength={100} required autoComplete="off" /></label>
    </div>
    </fieldset>
    <fieldset className="d-enquiry-group"><legend><span>02</span>Your time away</legend>
    <div className="d-enquiry-fields">
      <label>Preferred departure<input name="start" type="date" onChange={event => {
        const end = event.currentTarget.form?.elements.namedItem("end") as HTMLInputElement | null;
        if (end) { end.min = event.currentTarget.value; if (end.value && end.value < event.currentTarget.value) end.value = ""; }
      }} /></label>
      <label>Preferred return<input name="end" type="date" /></label>
      <label className="d-enquiry-wide">Approximate trip length<select name="length" defaultValue="Not sure yet">{["Short stay / weekend", "4–5 days", "5–7 days", "8–10 days", "10+ days", "Not sure yet"].map(length => <option key={length}>{length}</option>)}</select></label>
    </div>
    <label className="d-enquiry-flexible"><input type="checkbox" checked={flexible} onChange={event => setFlexible(event.currentTarget.checked)} />My dates are flexible</label>
    </fieldset>
    <fieldset className="d-enquiry-group"><legend><span>03</span>The people</legend>
      <div className="d-enquiry-counters">{[
        { name: "adults", label: "Adults", value: adults, min: 1, set: setAdults },
        { name: "children", label: "Children", value: children, min: 0, set: setChildren },
      ].map(counter => <div className="d-enquiry-counter" key={counter.name}><label htmlFor={`enquiry-${counter.name}`}>{counter.label}</label><div><button type="button" aria-label={`Remove ${counter.name === "adults" ? "adult" : "child"}`} disabled={counter.value <= counter.min} onClick={() => { counter.set(value => Math.max(counter.min, value - 1)); setBrief(""); }}>−</button><input id={`enquiry-${counter.name}`} aria-label={counter.label} name={counter.name} type="number" min={counter.min} max="999" value={counter.value} onChange={event => counter.set(event.currentTarget.valueAsNumber || 0)} required /><button type="button" aria-label={`Add ${counter.name === "adults" ? "adult" : "child"}`} disabled={counter.value >= 999} onClick={() => { counter.set(value => Math.min(999, value + 1)); setBrief(""); }}>+</button></div></div>)}</div>
      <p className="d-enquiry-total"><span><TravelIcon kind="people" size={17} />Number of travellers</span><strong>{adults + children}</strong></p>
    </fieldset>
    <fieldset className="d-enquiry-group d-enquiry-kinds"><legend><span>04</span>What kind of journey?</legend><p>Choose everything that feels right.</p><div>{kinds.map((kind, index) => <label key={kind}><input type="checkbox" name="kind" value={kind} /><span><TravelIcon kind={kindIcons[index]} size={22} /><span>{kind}</span><i aria-hidden="true">✓</i></span></label>)}</div></fieldset>
    <label className="d-enquiry-notes">Anything you&apos;d like us to know?<textarea name="notes" rows={3} maxLength={1600} placeholder="Occasion, children's ages, preferred pace, or anything that matters to you." /></label>
    <button className="j-button j-button-olive" type="submit">Start planning my journey <Arrow /></button>
    {brief && <div className="d-enquiry-ready" role="status">
      <strong>Your journey brief is ready.</strong>
      <p>Review your details, then share them with our travel team.</p>
      <pre>{brief}</pre>
      <div className="s-actions"><a className="j-button j-button-olive" href={`${office.whatsapp}?text=${encodeURIComponent(brief)}`} target="_blank" rel="noreferrer">Continue on WhatsApp <TravelIcon kind="chat" size={18} /></a><a className="j-text-link" href={`mailto:${office.email}?subject=${encodeURIComponent("Destination journey enquiry")}&body=${encodeURIComponent(brief)}`}>Send by email <Arrow /></a></div>
    </div>}
    <p className="d-enquiry-direct">Already know where you&apos;re going? <a href={office.whatsapp} target="_blank" rel="noreferrer">WhatsApp our travel team <Arrow /></a></p>
  </form>;
}
