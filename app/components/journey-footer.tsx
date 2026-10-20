"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EnquiryButton } from "./site-controls";
import { office, pageLinks } from "./data";
import { Arrow, TravelIcon } from "./icons";
import "./journey-footer.css";

// X and YouTube are placeholders until the real profiles exist.
const socials = [
  ...office.socials,
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
];

const icons: Record<string, ReactNode> = {
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />,
  LinkedIn: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
  X: <path d="M4 4l16 16M20 4L4 20" />,
  YouTube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5L10 9.5Z" fill="currentColor" /></>,
};

const destinations = ["Nairobi", "Zanzibar", "Dubai", "Kampala", "Cape Town", "Juba", "Tanzania"];
const lines = ["Wings &", "Wheels"];
const route = "M-40 210 C 220 40, 420 250, 640 120 S 1060 20, 1240 150";

function Letters({ text, line }: { text: string; line: number }) {
  return <span className="ft-line" data-line={line}>
    <span className="ft-line-fit">
      {[...text].map((character, index) => <span className="ft-l" key={index} style={{ "--i": index } as CSSProperties}>
        <span className="ft-l-in">{character === " " ? "\u00a0" : character}</span>
      </span>)}
    </span>
  </span>;
}

export function JourneyFooter() {
  const footer = useRef<HTMLElement>(null);
  const [stop, setStop] = useState(0);
  const [clock, setClock] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setStop(value => (value + 1) % destinations.length), 2200);
    const format = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => setClock(format.format(new Date()));
    tick();
    const clockTimer = window.setInterval(tick, 1000);
    return () => { window.clearInterval(timer); window.clearInterval(clockTimer); };
  }, []);

  useEffect(() => {
    const root = footer.current;
    if (!root) return;
    const fitLines = () => root.querySelectorAll<HTMLElement>(".ft-line").forEach(line => {
      const fit = line.querySelector<HTMLElement>(".ft-line-fit");
      if (!fit) return;
      fit.style.fontSize = "100px";
      const natural = fit.scrollWidth;
      if (natural) fit.style.fontSize = `${100 * line.clientWidth / natural}px`;
    });
    fitLines();
    document.fonts?.ready.then(fitLines);
    const resize = new ResizeObserver(fitLines);
    resize.observe(root);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => resize.disconnect();
    gsap.registerPlugin(ScrollTrigger);
    const cleanups: (() => void)[] = [];
    const context = gsap.context(() => {
      const stage = root.querySelector(".ft-stage");
      gsap.from(root.querySelectorAll(".ft-top > *"), {
        y: 70, opacity: 0, duration: 1, stagger: .1, ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(".ft-top"), start: "top 90%", once: true, refreshPriority: -1 },
      });
      root.querySelectorAll<HTMLElement>(".ft-line").forEach((line, index) => {
        gsap.fromTo(line.querySelectorAll(".ft-l"), { y: 0, yPercent: 105, rotate: index ? -6 : 6 }, {
          y: 0, yPercent: 0, rotate: 0, ease: "none", stagger: .06,
          scrollTrigger: { trigger: stage, start: "top 95%", end: "bottom bottom", scrub: .8, refreshPriority: -1 },
        });
        gsap.fromTo(line, { xPercent: index ? 12 : -12 }, {
          xPercent: 0, ease: "none",
          scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom bottom", scrub: .8, refreshPriority: -1 },
        });
      });

      const path = root.querySelector<SVGPathElement>(".ft-route-draw");
      const plane = root.querySelector<SVGGElement>(".ft-plane");
      if (path && plane) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        ScrollTrigger.create({
          trigger: stage, start: "top 90%", end: "bottom bottom", scrub: .8, refreshPriority: -1,
          onUpdate: self => {
            const at = length * self.progress;
            const point = path.getPointAtLength(at);
            const ahead = path.getPointAtLength(Math.min(length, at + 1));
            const angle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180 / Math.PI;
            path.style.strokeDashoffset = `${length - at}`;
            plane.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${angle})`);
          },
        });
      }
    }, root);

    // Letters swell toward the pointer.
    const stage = root.querySelector<HTMLElement>(".ft-stage");
    const letters = Array.from(root.querySelectorAll<HTMLElement>(".ft-l-in"));
    if (stage && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let frame = 0;
      let pointer = { x: 0, y: 0 };
      const paint = () => {
        frame = 0;
        letters.forEach(letter => {
          const box = letter.getBoundingClientRect();
          const distance = Math.hypot(pointer.x - (box.left + box.width / 2), pointer.y - (box.top + box.height / 2));
          const pull = Math.max(0, 1 - distance / 380);
          letter.style.setProperty("--pull", pull.toFixed(3));
        });
      };
      const move = (event: PointerEvent) => { pointer = { x: event.clientX, y: event.clientY }; if (!frame) frame = requestAnimationFrame(paint); };
      const leave = () => letters.forEach(letter => letter.style.setProperty("--pull", "0"));
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerleave", leave);
      cleanups.push(() => { stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerleave", leave); cancelAnimationFrame(frame); });
    }

    // The CTA leans toward the pointer.
    const magnet = root.querySelector<HTMLElement>(".ft-magnet");
    if (magnet) {
      const xTo = gsap.quickTo(magnet, "x", { duration: .6, ease: "power3" });
      const yTo = gsap.quickTo(magnet, "y", { duration: .6, ease: "power3" });
      const move = (event: PointerEvent) => {
        const box = magnet.getBoundingClientRect();
        xTo((event.clientX - box.left - box.width / 2) * .35);
        yTo((event.clientY - box.top - box.height / 2) * .45);
      };
      const leave = () => { xTo(0); yTo(0); };
      magnet.addEventListener("pointermove", move);
      magnet.addEventListener("pointerleave", leave);
      cleanups.push(() => { magnet.removeEventListener("pointermove", move); magnet.removeEventListener("pointerleave", leave); });
    }

    return () => {
      resize.disconnect();
      context.revert();
      cleanups.forEach(cleanup => cleanup());
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(office.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${office.email}`;
    }
  };

  return <footer className="j-footer ft" ref={footer}>
    <div className="ft-stage">
      <svg className="ft-route" viewBox="0 0 1200 260" aria-hidden="true">
        <path className="ft-route-base" d={route} />
        <path className="ft-route-draw" d={route} />
        <g className="ft-plane"><path d="M-14 -6 L16 0 L-14 6 L-8 0 Z" /></g>
      </svg>
      <Link href="/" className="ft-mark" aria-label="Wings & Wheels home">
        {lines.map((text, index) => <Letters key={text} text={text} line={index} />)}
      </Link>
    </div>

    <div className="j-shell ft-top">
      <div className="ft-lead">
        <span className="ft-label"><span className="ft-live" aria-hidden="true" />Dubai {clock && <time>{clock}</time>} GST</span>
        <p className="ft-title">Where are you<br /><em>going next?</em></p>
        <p className="ft-next" aria-live="polite">
          <span>Next stop</span>
          <span className="ft-next-word"><span key={stop}>{destinations[stop]}</span></span>
        </p>
        <div className="ft-actions">
          <span className="ft-magnet"><EnquiryButton className="ft-cta">Plan your journey</EnquiryButton></span>
          <button type="button" className="ft-copy" onClick={copy}>
            <span>{copied ? "Copied to clipboard" : office.email}</span>
            <span className="ft-copy-tag" aria-hidden="true">{copied ? "✓" : "Copy"}</span>
          </button>
        </div>
      </div>
      <nav className="ft-col" aria-label="Footer navigation">
        <span className="ft-label">Explore</span>
        <ul className="ft-nav">{pageLinks.map((link, index) => <li key={link.href}>
          <a href={link.href}><span className="ft-nav-no">{String(index + 1).padStart(2, "0")}</span><span className="ft-nav-text">{link.label}</span><Arrow /></a>
        </li>)}</ul>
      </nav>
      <div className="ft-col">
        <span className="ft-label">Visit us</span>
        <a className="ft-address" href={office.map} target="_blank" rel="noreferrer">
          {office.address.map(line => <span key={line}>{line}</span>)}
          <span className="ft-address-tag"><TravelIcon kind="pin" size={14} />Open in maps</span>
        </a>
        <p className="ft-hours">{office.hours}</p>
        <ul className="ft-phones">{office.phones.map(phone => <li key={phone.href}><a href={phone.href}>{phone.label}</a></li>)}</ul>
      </div>
      <div className="ft-col">
        <span className="ft-label">Follow</span>
        <ul className="ft-socials">
          {socials.map(social => <li key={social.label}>
            <a href={social.href} target="_blank" rel="noreferrer">
              <span className="ft-social-icon"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[social.label]}</svg></span>
              <span>{social.label}</span>
              <Arrow diagonal />
            </a>
          </li>)}
        </ul>
      </div>
    </div>

    <div className="j-shell ft-bottom">
      <span>© {new Date().getFullYear()} {office.company}</span>
      <span>Dubai · Africa · Worldwide</span>
      <button type="button" className="ft-top-button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="ft-ring" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" /></defs><text><textPath href="#ft-ring">Back to top · Back to top · Back to top ·</textPath></text></svg>
        <span>↑</span>
      </button>
    </div>
  </footer>;
}
