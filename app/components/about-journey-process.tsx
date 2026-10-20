"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EnquiryButton } from "./site-controls";
import "./about-journey-process.css";

const steps = [
  { label: "Tell us", title: ["Your journey.", "Your reason."], note: "You tell us where you need to be.", text: "A meeting that matters. A long-awaited holiday. A team travelling together. It all begins with you.", photo: "business-conversation", alt: "Travellers discussing their plans together" },
  { label: "Understand", title: ["We listen.", "Then we plan."], note: "We understand the journey.", text: "Your timing, your preferences, your priorities. We connect the right arrangements around what matters to you.", photo: "travel-planning-v2", alt: "A travel consultant reviewing an itinerary and map" },
  { label: "Coordinate", title: ["Every detail.", "Connected."], note: "We coordinate the details.", text: "Flights, stays, visas and transfers. Separate arrangements, brought together into one thoughtful journey.", photo: "corporate-account-manager", alt: "A travel account manager coordinating arrangements" },
  { label: "Travel", title: ["Less to think of.", "More to be there for."], note: "You travel.", text: "The meeting. The reunion. The place you have always imagined. Arrive ready for the reason you came.", photo: "business-boarding", alt: "A business traveller approaching an aircraft" },
  { label: "Stay connected", title: ["Beyond booking.", "Beside you."], note: "We stay available.", text: "Plans can change. Having someone who knows your journey makes the difference. We are here for what comes next.", photo: "travel-support-v2", alt: "Travel consultants working together to support a journey" },
];

export function AboutJourneyProcess() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const roomy = matchMedia("(min-height: 660px)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (reduced.matches || !roomy.matches) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)));
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive(previous => previous === index ? previous : index);
      section.style.setProperty("--chapter-progress", String(Math.min(1, progress * steps.length - index)));
      section.style.setProperty("--chapter-drift", `${(progress * steps.length - index) * -3}%`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const preference = () => { setEnhanced(!reduced.matches && roomy.matches); schedule(); };
    preference();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", preference);
    roomy.addEventListener("change", preference);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", preference);
      roomy.removeEventListener("change", preference);
    };
  }, []);

  const jump = (index: number) => {
    const section = root.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    window.scrollTo({ top: scrollY + rect.top + (rect.height - innerHeight) * ((index + .15) / steps.length), behavior: "smooth" });
  };

  return <section ref={root} className={`j-process ab-process j-torn-top j-torn-bottom${enhanced ? " is-chapters" : ""}`} id="services" aria-labelledby="services-heading">
    <div className="ab-process-stage">
      <header className="ab-process-masthead">
        <h2 id="services-heading">We connect the parts<br /><em>of the journey.</em></h2>
        <p>A booking is only one part.<br />The journey is the full picture.</p>
      </header>
      <div className="ab-process-scenes">
        {steps.map((step, index) => <article key={step.label} id={`journey-panel-${index}`} className="ab-process-scene" data-active={active === index} data-past={active > index} aria-hidden={enhanced && active !== index} inert={enhanced && active !== index} aria-labelledby={`journey-title-${index}`}>
          <div className="ab-process-image"><Image src={`/images/library/${step.photo}.webp`} alt={step.alt} fill sizes="100vw" quality={90} /></div>
          <div className="ab-process-wash" aria-hidden="true" />
          <div className="ab-process-copy">
            <span className="ab-process-kicker">0{index + 1} / 05 <span>{step.note}</span></span>
            <h3 id={`journey-title-${index}`}>{step.title.map((line, i) => <span key={line}>{i === 1 ? <em>{line}</em> : line}</span>)}</h3>
            <p>{step.text}</p>
          </div>
          <span className="ab-process-folio" aria-hidden="true">0{index + 1}</span>
        </article>)}
      </div>
      <footer className="ab-process-bottom">
        <nav className="ab-process-navigation" aria-label="Explore the five steps of your journey">
          {steps.map((step, index) => <button key={step.label} type="button" aria-current={active === index ? "step" : undefined} aria-controls={`journey-panel-${index}`} onClick={() => jump(index)} onKeyDown={event => {
            const next = event.key === "ArrowRight" ? (index + 1) % steps.length : event.key === "ArrowLeft" ? (index + steps.length - 1) % steps.length : event.key === "Home" ? 0 : event.key === "End" ? steps.length - 1 : -1;
            if (next < 0) return;
            event.preventDefault();
            (event.currentTarget.parentElement?.children[next] as HTMLButtonElement)?.focus({ preventScroll: true });
            jump(next);
          }}><span className="ab-process-nav-line" aria-hidden="true"><span /></span><span className="ab-process-nav-index">0{index + 1}</span><span>{step.label}</span></button>)}
        </nav>
        <div className="ab-process-colophon"><span>Flights · Hotels · Visas · Transfers<br />Groups · Experiences · Support</span><EnquiryButton className="ab-process-enquire">Let’s plan your journey</EnquiryButton></div>
      </footer>
      <span className="ab-process-scroll" aria-hidden="true">Scroll to follow the journey <span>↓</span></span>
    </div>
  </section>;
}
