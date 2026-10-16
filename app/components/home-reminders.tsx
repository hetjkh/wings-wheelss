"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import { EnquiryButton } from "./site-controls";
import { office } from "./data";
import "./home-reminders.css";

const tips = [
  {
    gate: "Documents",
    title: "Finalize your documents",
    text: "Double-check your passport, visas, flight tickets, and hotel reservations. Make sure everything is in order and easily accessible.",
  },
  {
    gate: "Packing",
    title: "Pack smart",
    text: "Create a packing list to ensure you have all the essentials. Don’t forget your medications, chargers, and any travel adapters you might need.",
  },
  {
    gate: "Itinerary",
    title: "Confirm your travel plan",
    text: "Review your itinerary one last time. Note down contact numbers for your accommodations, tour operators, and our agency in case you need assistance.",
    link: { href: office.whatsapp, label: "Get our 24/7 support contact details" },
  },
  {
    gate: "Check-in",
    title: "Check-in online",
    text: "Save time at the airport by checking in for your flight 24 hours in advance.",
  },
] as const;

export function HomeReminders() {
  const [active, setActive] = useState(0);
  const current = tips[active];

  return (
    <section className="e-reminders" id="before-you-travel" aria-labelledby="reminders-title">
      <div className="e-reminders-stage">
        <div className="e-reminders-visual" aria-hidden="true">
          <Image
            src="/images/about/lounge.jpg"
            alt=""
            fill
            sizes="(max-width: 999px) 100vw, 48vw"
            className="n-cover"
            style={{ objectPosition: "35% center" }}
          />
          <div className="e-reminders-shade" />
          <div className="e-reminders-stamp">
            <span>Air tickets</span>
            <span>&</span>
            <span>Travel documents</span>
          </div>
        </div>

        <div className="e-reminders-copy">
          <span className="e-label"><span>08</span><span>Before you leave</span></span>
          <h2 id="reminders-title">
            Things to remember<br />
            <span>before your travel.</span>
          </h2>
          <p className="e-reminders-lead">
            Essential things to review before heading to the airport—documents, packing list, travel plans, and online check-in for a smooth journey. Need help? Contact our travel experts or submit a quick inquiry.
          </p>

          <ol className="e-reminders-gates" aria-label="Things to remember before travel">
            {tips.map((tip, index) => {
              const selected = index === active;
              return (
                <li key={tip.title}>
                  <button
                    type="button"
                    className={selected ? "is-active" : undefined}
                    aria-pressed={selected}
                    aria-controls="reminder-panel"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    <span className="e-reminders-num">{String(index + 1).padStart(2, "0")}</span>
                    <span className="e-reminders-gate">{tip.gate}</span>
                    <span className="e-reminders-name">{tip.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="e-reminders-panel" id="reminder-panel" aria-live="polite">
            <span className="n-kicker">{String(active + 1).padStart(2, "0")} / 04 · {current.gate}</span>
            <h3>{current.title}</h3>
            <p>
              {current.text}
              {"link" in current && current.link ? (
                <>
                  {" "}
                  <a href={current.link.href} target="_blank" rel="noreferrer">{current.link.label}</a>.
                </>
              ) : null}
            </p>
          </div>

          <div className="e-reminders-cta">
            <div>
              <h3>Ready for your journey?</h3>
              <p>Let us help you prepare for an unforgettable travel experience.</p>
            </div>
            <div className="e-reminders-actions">
              <EnquiryButton className="n-button e-reminders-button" service="Travel support">Submit an inquiry</EnquiryButton>
              <Link href="/contact" className="e-link">Talk to our experts<Arrow /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
