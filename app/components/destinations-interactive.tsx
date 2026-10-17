"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "./travel-image";
import Link from "next/link";
import { Arrow, TravelIcon, type IconKind } from "./icons";
import { EnquiryButton } from "./site-controls";

export type Mood = { title: string; text: string; icon: IconKind; photo: string; alt: string; position?: string };

/** Six reasons to travel; the photograph follows whichever reason is in focus. */
export function MoodIndex({ moods }: { moods: Mood[] }) {
  const [active, setActive] = useState(0);
  const mood = moods[active];
  return <div className="d-moods-body">
    <div className="d-mood-stage">
      <div className="d-mood-frame" data-frame>
        {moods.map((item, i) => <Image key={item.title} src={item.photo} alt={item.alt} fill sizes="(max-width: 991px) 92vw, 44vw" className={i === active ? "is-active" : undefined} style={item.position ? { objectPosition: item.position } : undefined} />)}
      </div>
      <div className="d-mood-caption">
        <span className="d-mood-count">{String(active + 1).padStart(2, "0")} <span>/ {String(moods.length).padStart(2, "0")}</span></span>
        <EnquiryButton className="d-mood-cta" service="Leisure & holidays" message={`I'm interested in a ${mood.title.toLowerCase()} trip.`}>Find a {mood.title.toLowerCase()} trip</EnquiryButton>
      </div>
    </div>
    <ol className="d-mood-list" data-draw-group>{moods.map((item, i) => <li key={item.title} className="s-draw">
      <button type="button" className={`d-mood${i === active ? " is-active" : ""}`} aria-pressed={i === active} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
        <span className="d-mood-number">{String(i + 1).padStart(2, "0")}</span>
        <span className="d-mood-title">{item.title}</span>
        <span className="d-mood-icon"><TravelIcon kind={item.icon} size={20} /></span>
        <span className="d-mood-text">{item.text}</span>
      </button>
    </li>)}</ol>
  </div>;
}

export type Postcard = { name: string; line: string; region: string; code: string; photo: string; alt: string; position?: string; service: string; href?: string };

/** A row of postcards that can be dragged, swiped or stepped through. */
export function PostcardRail({ cards }: { cards: Postcard[] }) {
  const rail = useRef<HTMLOListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      const max = element.scrollWidth - element.clientWidth;
      setProgress(max > 0 ? element.scrollLeft / max : 0);
      const card = element.children[0] as HTMLElement | undefined;
      const step = card ? card.offsetWidth + parseFloat(getComputedStyle(element).columnGap || "0") : 1;
      setIndex(Math.min(cards.length - 1, Math.round(element.scrollLeft / step)));
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { element.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [cards.length]);

  const go = (direction: number) => {
    const element = rail.current;
    const card = element?.children[Math.max(0, Math.min(cards.length - 1, index + direction))] as HTMLElement | undefined;
    if (!element || !card) return;
    const left = Math.min(card.offsetLeft - element.offsetLeft, element.scrollWidth - element.clientWidth);
    const { scrollStart, scrollEnd } = element.dataset;
    if (scrollStart && scrollEnd) {
      // While the page drives the rail, step through it by scrolling the page instead.
      const max = element.scrollWidth - element.clientWidth;
      const from = Number(scrollStart);
      window.scrollTo({ top: from + (max ? left / max : 0) * (Number(scrollEnd) - from), behavior: "smooth" });
      return;
    }
    element.scrollTo({ left, behavior: "smooth" });
  };
  const start = (event: ReactPointerEvent<HTMLOListElement>) => {
    if (event.pointerType !== "mouse" || !rail.current || rail.current.dataset.scrollStart) return;
    drag.current = { x: event.clientX, left: rail.current.scrollLeft, moved: false };
  };
  const move = (event: ReactPointerEvent<HTMLOListElement>) => {
    const state = drag.current;
    if (!state || !rail.current) return;
    const distance = event.clientX - state.x;
    if (Math.abs(distance) > 4 && !state.moved) { state.moved = true; rail.current.classList.add("is-dragging"); rail.current.setPointerCapture(event.pointerId); }
    if (state.moved) rail.current.scrollLeft = state.left - distance;
  };
  const end = () => {
    drag.current = null;
    rail.current?.classList.remove("is-dragging");
  };

  return <div className="d-rail-wrap">
    <div className="d-rail-controls">
      <span className="d-rail-count">{String(index + 1).padStart(2, "0")} <span>/ {String(cards.length).padStart(2, "0")}</span></span>
      <span className="d-rail-bar" aria-hidden="true"><span style={{ transform: `scaleX(${.12 + progress * .88})` }} /></span>
      <button type="button" className="d-rail-button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous destination"><Arrow back /></button>
      <button type="button" className="d-rail-button" onClick={() => go(1)} disabled={index === cards.length - 1} aria-label="Next destination"><Arrow /></button>
    </div>
    <ol className="d-rail" ref={rail} data-hscroll-track onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onPointerLeave={end}>
      {cards.map((card, i) => <li key={card.name} className="d-postcard">
        <div className="d-postcard-photo">
          <Image src={card.photo} alt={card.alt} fill sizes="(max-width: 600px) 80vw, (max-width: 991px) 46vw, 30vw" draggable={false} style={card.position ? { objectPosition: card.position } : undefined} />
          <span className="d-stamp"><span>{card.code}</span><small>{card.region}</small></span>
          <svg className="d-postmark" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="34" /><circle cx="50" cy="50" r="27" /><path d="M8 44c8-6 16 6 24 0s16 6 24 0 16 6 24 0 12 4 16 0M8 56c8-6 16 6 24 0s16 6 24 0 16 6 24 0 12 4 16 0" /><text x="50" y="53" textAnchor="middle">DXB</text></svg>
        </div>
        <div className="d-postcard-copy">
          <span className="d-postcard-number">{String(i + 1).padStart(2, "0")}</span>
          <h3>{card.name}</h3>
          <p>{card.line}</p>
          {card.href ? <Link className="d-postcard-link" href={card.href}>Explore {card.name}<Arrow /></Link> : <EnquiryButton className="d-postcard-link" service={card.service} destination={card.name}>Explore {card.name}</EnquiryButton>}
        </div>
      </li>)}
    </ol>
  </div>;
}

export type Season = { months: string; short: string; photo: string; alt: string; picks: { place: string; note: string }[] };
const travelYear = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

/** A travel year that starts in October; choosing a quarter brings its highlights forward. */
export function SeasonRibbon({ seasons }: { seasons: Season[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const season = seasons[active];

  useEffect(() => {
    const chapter = root.current?.closest<HTMLElement>("[data-steps]");
    if (!chapter) return;
    const follow = (event: Event) => setActive((event as CustomEvent<number>).detail);
    chapter.addEventListener("chapter-step", follow);
    return () => chapter.removeEventListener("chapter-step", follow);
  }, []);

  const choose = (index: number) => {
    const chapter = root.current?.closest<HTMLElement>("[data-steps]");
    const { stepsStart, stepsEnd } = chapter?.dataset ?? {};
    if (stepsStart && stepsEnd) {
      // While the page drives the seasons, choosing one scrolls to its step.
      const from = Number(stepsStart);
      window.scrollTo({ top: from + (index + .5) / seasons.length * (Number(stepsEnd) - from), behavior: "smooth" });
      return;
    }
    setActive(index);
  };

  return <div className="d-year" ref={root}>
    <div className="d-ribbon" role="tablist" aria-label="Travel periods">
      <ol className="d-months" aria-hidden="true">{travelYear.map((month, i) => <li key={month} className={Math.floor(i / 3) === active ? "is-on" : undefined}>{month}</li>)}</ol>
      <div className="d-quarters">{seasons.map((item, i) => <button key={item.months} type="button" role="tab" id={`season-tab-${i}`} aria-selected={i === active} aria-controls="season-panel" className={`d-quarter${i === active ? " is-active" : ""}${i < active ? " is-past" : ""}`} style={{ "--i": i } as React.CSSProperties} onClick={() => choose(i)}>
        <span className="d-quarter-sun" aria-hidden="true"><TravelIcon kind="sun" size={16} /></span>{item.months}
      </button>)}</div>
    </div>
    <div className="d-season" role="tabpanel" id="season-panel" aria-labelledby={`season-tab-${active}`}>
      <div className="d-season-photo">{seasons.map((item, i) => <Image key={item.months} src={item.photo} alt={item.alt} fill sizes="(max-width: 991px) 92vw, 50vw" className={i === active ? "is-active" : undefined} />)}</div>
      <div className="d-season-copy" key={season.months}>
        <span className="d-season-short">{season.short}</span>
        <ol className="d-picks">{season.picks.map((pick, i) => <li key={pick.place} style={{ "--i": i } as React.CSSProperties}>
          <span className="d-pick-number">{String(i + 1).padStart(2, "0")}</span>
          <h3>{pick.place}</h3>
          <p>{pick.note}</p>
        </li>)}</ol>
        <EnquiryButton className="j-button j-button-olive" service="Leisure & holidays" message={`I'd like to travel in ${season.months}.`}>Plan for {season.months}</EnquiryButton>
      </div>
    </div>
  </div>;
}

const questions: { icon: IconKind; label: string; question: string; options: string[] }[] = [
  { icon: "people", label: "Who", question: "Who's travelling?", options: ["Just me", "A couple", "Family", "Friends", "A team or group"] },
  { icon: "compass", label: "Want", question: "What do you want from the trip?", options: ["Beach & rest", "Safari & nature", "Culture & cities", "Business & events", "A bit of everything"] },
  { icon: "calendar", label: "Time", question: "How long do you have?", options: ["A long weekend", "About a week", "Two weeks", "Longer"] },
  { icon: "plane", label: "When", question: "When do you want to go?", options: ["October – December", "January – March", "April – June", "July – September", "I'm flexible"] },
];

/** Four quick questions; the answers travel with the enquiry. */
export function FourThings() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const done = answers.filter(Boolean).length === questions.length;
  const current = questions[Math.min(step, questions.length - 1)];
  const choose = (option: string) => {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
  };
  const message = questions.map((q, i) => answers[i] ? `${q.question} ${answers[i]}` : "").filter(Boolean).join("\n");
  return <div className="d-quiz">
    <ol className="d-quiz-steps">{questions.map((q, i) => <li key={q.label}>
      <button type="button" className={`d-quiz-step${i === step ? " is-active" : ""}${answers[i] ? " is-answered" : ""}`} onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}>
        <span className="d-quiz-icon"><TravelIcon kind={q.icon} size={22} /></span>
        <span className="d-quiz-number">{String(i + 1).padStart(2, "0")}</span>
        <span className="d-quiz-label">{answers[i] ?? q.question}</span>
      </button>
    </li>)}</ol>
    <div className="d-quiz-card" aria-live="polite">
      <span className="d-quiz-progress" aria-hidden="true"><span style={{ transform: `scaleX(${answers.filter(Boolean).length / questions.length})` }} /></span>
      {done && step === questions.length - 1 && answers[step] ? <div className="d-quiz-done">
        <span className="j-eyebrow">Your journey, in four answers</span>
        <p>{answers[0]}, looking for {answers[1].toLowerCase()}, for {answers[2].toLowerCase()}, {answers[3] === "I'm flexible" ? "with flexible dates" : `in ${answers[3]}`}.</p>
        <div className="s-actions">
          <EnquiryButton className="j-button j-button-cream" service="Leisure & holidays" message={message}>Get destination ideas</EnquiryButton>
          <button type="button" className="j-button j-button-outline-light" onClick={() => { setAnswers([]); setStep(0); }}>Start again</button>
        </div>
      </div> : <div key={step} className="d-quiz-question">
        <span className="j-eyebrow">Question {String(step + 1).padStart(2, "0")} of 04</span>
        <h3>{current.question}</h3>
        <div className="d-quiz-options">{current.options.map(option => <button key={option} type="button" className={`d-chip${answers[step] === option ? " is-chosen" : ""}`} onClick={() => choose(option)}>{option}</button>)}</div>
      </div>}
    </div>
  </div>;
}
