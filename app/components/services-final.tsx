"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "./travel-image";
import { TravelIcon, type IconKind } from "./icons";
import { PillCta } from "./about-cta";
import { office } from "./data";
import "./services-final.css";

export type ClosingChip = { icon: IconKind; label: string };

type ClosingAction = { label: string; href?: string; service?: string };

/** The closing scene: a cabin window opens onto the destination, then the boarding pass arrives. */
export function ClosingScene({
  chapter, ticket, left, right, photo, photoPosition, pass = ["Boarding pass", "One journey · Every part"],
  from, to, text, chips, action, whatsapp = "WhatsApp our team",
}: {
  chapter: string;
  ticket: string;
  left: ReactNode;
  right: ReactNode;
  photo: string;
  photoPosition?: string;
  pass?: [string, string];
  from: string;
  to: string;
  text: string;
  chips: ClosingChip[];
  action: ClosingAction;
  whatsapp?: string | false;
}) {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(root);

    media.add("(min-width: 992px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)", () => {
      const view = root.querySelector<HTMLElement>(".sv-view");
      const bezel = root.querySelector<HTMLElement>(".sv-bezel");
      const photoEl = root.querySelector<HTMLElement>(".sv-view img");
      const shade = root.querySelector<HTMLElement>(".sv-view-shade");
      const blind = root.querySelector<HTMLElement>(".sv-blind");
      const sideA = root.querySelector<HTMLElement>(".sv-side-a");
      const sideB = root.querySelector<HTMLElement>(".sv-side-b");
      const headline = root.querySelector<HTMLElement>(".sv-headline");
      const passWrap = root.querySelector<HTMLElement>(".sv-pass");
      const chipEls = root.querySelectorAll<HTMLElement>(".sv-chip");
      const routeFill = root.querySelector<HTMLElement>(".sv-route-fill");
      if (!view || !bezel || !photoEl || !shade || !blind || !sideA || !sideB || !headline || !passWrap || !routeFill) return;
      const inset = () => {
        const box = bezel.getBoundingClientRect();
        const frame = root.getBoundingClientRect();
        const y = box.top - frame.top;
        const x = box.left - frame.left;
        return `inset(${y}px ${frame.width - x - box.width}px ${frame.height - y - box.height}px ${x}px round ${box.width / 2}px)`;
      };
      root.classList.add("is-scene");
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root, start: "top top", end: "+=170%", pin: true, scrub: .8,
          anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: -1,
        },
      });
      timeline
        .fromTo(blind, { yPercent: 0 }, { yPercent: -100, duration: .26, ease: "power1.inOut" }, .02)
        .fromTo(photoEl, { scale: 1.35 }, { scale: 1, duration: .8 }, 0)
        .fromTo(view, { clipPath: inset }, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: .42, ease: "power2.inOut" }, .3)
        .fromTo(bezel, { opacity: 1, scale: 1 }, { opacity: 0, scale: 1.6, duration: .2 }, .3)
        .fromTo(shade, { opacity: 0 }, { opacity: 1, duration: .3 }, .4)
        .fromTo(root, { "--fg": "#3d2d20", "--fg-soft": "#8a7760" }, { "--fg": "#fff8e9", "--fg-soft": "#ecd9ad", duration: .2 }, .42)
        .fromTo(sideA, { x: 0 }, { x: () => -window.innerWidth * .04, duration: .42 }, .3)
        .fromTo(sideB, { x: 0 }, { x: () => window.innerWidth * .04, duration: .42 }, .3)
        .fromTo(headline, { y: 0 }, { y: () => -window.innerHeight * .13, duration: .25, ease: "power2.inOut" }, .72)
        .fromTo(passWrap, { yPercent: 130, rotate: -5, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: .25, ease: "power3.out" }, .74)
        .fromTo(chipEls, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .12, stagger: .015 }, .86)
        .fromTo(routeFill, { scaleX: 0 }, { scaleX: 1, duration: .18 }, .84)
        .to({}, { duration: .06 });
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => root.classList.remove("is-scene");
    });

    const passCard = root.querySelector<HTMLElement>(".sv-pass-card");
    const cleanups: (() => void)[] = [];
    if (passCard && matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      const rx = gsap.quickTo(passCard, "rotationX", { duration: .7, ease: "power3" });
      const ry = gsap.quickTo(passCard, "rotationY", { duration: .7, ease: "power3" });
      const move = (event: PointerEvent) => {
        const box = passCard.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width;
        const y = (event.clientY - box.top) / box.height;
        ry((x - .5) * 10);
        rx((.5 - y) * 10);
        passCard.style.setProperty("--mx", `${x * 100}%`);
        passCard.style.setProperty("--my", `${y * 100}%`);
      };
      const leave = () => { rx(0); ry(0); };
      passCard.addEventListener("pointermove", move);
      passCard.addEventListener("pointerleave", leave);
      cleanups.push(() => { passCard.removeEventListener("pointermove", move); passCard.removeEventListener("pointerleave", leave); });
    }

    return () => { media.revert(); cleanups.forEach(cleanup => cleanup()); };
  }, []);

  return <section className="sv-final j-torn-top" ref={section} aria-labelledby="final-heading">
    <div className="sv-view">
      <Image src={photo} alt="" fill sizes="100vw" style={photoPosition ? { objectPosition: photoPosition } : undefined} />
      <div className="sv-view-shade" />
      <div className="sv-blind" aria-hidden="true"><span className="sv-blind-handle" /></div>
    </div>
    <div className="sv-bezel" aria-hidden="true" />

    <div className="sv-top j-shell" aria-hidden="true">
      <span>{chapter}</span>
      <span>{ticket}</span>
    </div>

    <h2 id="final-heading" className="sv-headline j-shell">
      <span className="sv-side sv-side-a">{left}</span>
      <span className="sv-side sv-side-b">{right}</span>
    </h2>

    <div className="sv-pass j-shell">
      <div className="sv-pass-card">
        <div className="sv-pass-main">
          <div className="sv-pass-head">
            <span>{pass[0]}</span>
            <span>{pass[1]}</span>
          </div>
          <div className="sv-route">
            <div><small>From</small><strong>{from}</strong></div>
            <span className="sv-route-line" aria-hidden="true">
              <span className="sv-route-fill" />
              <TravelIcon kind="plane" size={20} />
            </span>
            <div><small>To</small><strong>{to}</strong></div>
          </div>
          <p className="sv-pass-text">{text}</p>
          <ul className="sv-chips">{chips.map((item, index) => <li key={item.label} className="sv-chip" style={{ "--i": index } as CSSProperties}>
            <TravelIcon kind={item.icon} size={16} />{item.label}
          </li>)}</ul>
        </div>
        <div className="sv-pass-stub">
          <span className="sv-stub-label">Gate open</span>
          <PillCta href={action.href} service={action.service}>{action.label}</PillCta>
          {whatsapp ? <a className="sv-whatsapp" href={office.whatsapp} target="_blank" rel="noreferrer">
            <TravelIcon kind="chat" size={16} />{whatsapp}
          </a> : null}
          <span className="sv-barcode" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>;
}

export function ServicesFinal() {
  return <ClosingScene
    chapter="08 / Wings & Wheels"
    ticket="Window seat · Row 01"
    left={<>Where you&apos;re<br />going matters.</>}
    right={<>So does<br />everything <em>in between.</em></>}
    photo="/images/library/journey-above-clouds.webp"
    from="Where you are"
    to="Where you're going"
    text="Flights, hotels, visas, transfers, experiences and support — brought together around one journey."
    chips={[
      { icon: "plane", label: "Flights" },
      { icon: "bed", label: "Hotels" },
      { icon: "document", label: "Visas" },
      { icon: "car", label: "Transfers" },
      { icon: "compass", label: "Experiences" },
      { icon: "support", label: "Support" },
    ]}
    action={{ label: "Start planning" }}
  />;
}
