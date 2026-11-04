"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillCta } from "./about-cta";
import { TravelIcon, type IconKind } from "./icons";
import "./services-journey.css";

const phases: { icon: IconKind; when: string; title: string; text: string; items: string[] }[] = [
  { icon: "calendar", when: "Before", title: "Get ready.", text: "Every detail in place. A little more room to look forward to the journey.", items: ["Flights", "Accommodation", "Visa support", "Transfers", "Travel documentation", "Itinerary coordination"] },
  { icon: "route", when: "During", title: "Keep moving.", text: "Be where you want to be. We stay close, even when your plans change.", items: ["Travel information", "Arrival coordination", "Transfers", "Changes", "Onward arrangements", "Support"] },
  { icon: "return", when: "After", title: "What comes next.", text: "Home for now. Still here for the details, and wherever you go next.", items: ["Return travel", "Future bookings", "Travel records", "Ongoing requirements", "Next journey"] },
];

export function ServicesJourney() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const playbackChoice = useRef<boolean | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const root = section.current;
    const film = video.current;
    if (!root || !film) return;
    const follow = (event: Event) => setActive((event as CustomEvent<number>).detail);
    root.addEventListener("chapter-step", follow);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      const shouldPlay = playbackChoice.current ?? !reduced.matches;
      if (visible && !document.hidden && shouldPlay) film.play().catch(() => {});
      else film.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .15 });
    observer.observe(film);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);

    gsap.registerPlugin(ScrollTrigger);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(root.querySelector(".sb-stage"), { y: 45, clipPath: "inset(5% 2% 5% 2% round 24px)" }, {
        y: 0, clipPath: "inset(0% 0% 0% 0% round 16px)", ease: "none",
        scrollTrigger: { trigger: root, start: "top 85%", end: "top 15%", scrub: .7 },
      });
    });
    return () => {
      root.removeEventListener("chapter-step", follow);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      film.pause();
      motion.revert();
    };
  }, []);

  useEffect(() => {
    if (!section.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = gsap.context(() => {
      gsap.fromTo(section.current!.querySelectorAll(".sb-panel:not([hidden]) [data-stage-reveal]"),
        { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5, stagger: .045, ease: "power2.out", clearProps: "opacity,transform" });
    }, section);
    return () => animation.revert();
  }, [active]);

  function selectStage(index: number) {
    setActive(index);
    const root = section.current;
    if (root?.classList.contains("is-stepped")) {
      const start = Number(root.dataset.stepsStart);
      const end = Number(root.dataset.stepsEnd);
      if (Number.isFinite(start) && end > start) {
        // Land inside the selected stage so the scroll and tab stay in sync.
        window.scrollTo({ top: start + (end - start) * ((index + .2) / phases.length), behavior: "instant" });
      }
    }
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % phases.length;
    else if (event.key === "ArrowLeft") next = (index + phases.length - 1) % phases.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = phases.length - 1;
    else return;
    event.preventDefault();
    selectStage(next);
    section.current?.querySelector<HTMLButtonElement>(`#journey-tab-${next}`)?.focus({ preventScroll: true });
  }

  function togglePlayback() {
    const film = video.current;
    if (!film) return;
    playbackChoice.current = film.paused;
    if (film.paused) film.play().catch(() => {});
    else film.pause();
  }

  return <section ref={section} id="beyond" className="s-beyond sb-journey j-torn-top" data-steps="3" data-step-anchor=".sb-tabs" aria-labelledby="beyond-heading">
    <div className="sb-shell">
      <header className="sb-heading">
        <div><span className="j-eyebrow">05 / Before. During. After.</span><h2 id="beyond-heading">Every step.<br /><em>Someone there.</em></h2></div>
        <p>Good travel support doesn&apos;t begin at take-off or end at landing. We think beyond departure.</p>
      </header>

      <div className="sb-tabs" role="tablist" aria-label="Explore your journey stages">
        {phases.map((phase, index) => <button key={phase.when} type="button" role="tab" id={`journey-tab-${index}`} aria-controls={`journey-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => selectStage(index)} onKeyDown={event => onTabKey(event, index)}>
          <span className="sb-tab-number">0{index + 1}</span><span>{phase.when}</span><TravelIcon kind={phase.icon} size={19} />
        </button>)}
      </div>

      <div className="sb-stage">
        <figure className="sb-film">
          <video ref={video} muted playsInline loop preload="none" poster="/videos/dubai-services-20-poster.webp" aria-label="Dubai: Palm Jumeirah, Museum of the Future, Downtown Dubai and Atlantis" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onTimeUpdate={event => setElapsed(Math.floor(event.currentTarget.currentTime))}>
            <source src="/videos/dubai-services-20.webm" type="video/webm" />
            <source src="/videos/dubai-services-20.mp4" type="video/mp4" />
          </video>
          <figcaption><TravelIcon kind="pin" size={16} /><span>Dubai, UAE</span></figcaption>
          <div className="sb-film-controls"><span aria-hidden="true">00:{String(elapsed).padStart(2, "0")} / 00:20</span><button type="button" onClick={togglePlayback} aria-label={playing ? "Pause Dubai video" : "Play Dubai video"}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">{playing ? <path d="M6 5h4v14H6zm8 0h4v14h-4z" /> : <path d="m8 4 13 8-13 8z" />}</svg>
          </button></div>
        </figure>
        <div className="sb-details">
          {phases.map((phase, index) => <div key={phase.when} className="sb-panel" role="tabpanel" id={`journey-panel-${index}`} aria-labelledby={`journey-tab-${index}`} hidden={active !== index} tabIndex={0}>
            <div className="sb-panel-top" data-stage-reveal><span>With you {phase.when.toLowerCase()}</span><span>0{index + 1} / 03</span></div>
            <h3 data-stage-reveal>{phase.title}</h3>
            <p data-stage-reveal>{phase.text}</p>
            <ul>{phase.items.map(item => <li key={item} data-stage-reveal><span aria-hidden="true">↗</span>{item}</li>)}</ul>
          </div>)}
          <div className="sb-contact"><PillCta light>Plan your journey</PillCta></div>
        </div>
      </div>
      <footer className="sb-foot"><span><span className="sb-scroll-hint">Scroll to explore</span><span className="sb-tap-hint">Choose a stage above</span><span aria-hidden="true"> ↓</span></span><div className="sb-progress" aria-hidden="true"><span style={{ width: `${(active + 1) / 3 * 100}%` }} /></div><span>One journey. All the way.</span></footer>
    </div>
  </section>;
}
