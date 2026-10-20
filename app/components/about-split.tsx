"use client";

import { useEffect, useRef } from "react";
import Image from "./travel-image";
import { Cta } from "./about-cta";

export function AboutSplit() {
  const stage = useRef<HTMLDivElement>(null);
  const goTo = useRef<(value: number) => void>(() => {});

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 992px)");
    let target = .5;
    let current = .5;
    let frame = 0;

    const tick = () => {
      current += (target - current) * .08;
      element.style.setProperty("--split", current.toFixed(4));
      frame = Math.abs(target - current) > .0005 ? requestAnimationFrame(tick) : 0;
    };
    goTo.current = value => {
      target = value;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches) return;
      const box = element.getBoundingClientRect();
      const ratio = (event.clientX - box.left) / box.width;
      goTo.current(Math.max(.36, Math.min(.64, .5 + (.5 - ratio) * .4)));
    };
    const leave = () => goTo.current(.5);

    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="au-split-stage" ref={stage}>
    <article className="au-split-panel au-split-business" onFocus={() => goTo.current(.62)}>
      <div className="au-split-photo"><Image src="/images/about/business-lounge-v2.webp" alt="A business traveller working in an executive lounge" fill sizes="(max-width: 991px) 100vw, 64vw" /></div>
      <div className="au-split-shade" />
      <div className="au-split-copy">
        <span className="au-split-kicker">For business</span>
        <h2>Business<span>when it needs to work.</span></h2>
        <Cta href="/corporate-travel" light>Explore corporate travel</Cta>
      </div>
    </article>
    <article className="au-split-panel au-split-leisure" onFocus={() => goTo.current(.38)}>
      <div className="au-split-photo"><Image src="/images/about/leisure-bay-v2.webp" alt="A quiet resort bay with clear water and palm trees" fill sizes="(max-width: 991px) 100vw, 64vw" /></div>
      <div className="au-split-shade" />
      <div className="au-split-copy">
        <span className="au-split-kicker">For leisure</span>
        <h2>Leisure<span>when it needs to feel different.</span></h2>
        <Cta href="/destinations" light>Explore destinations</Cta>
      </div>
    </article>
    <span className="au-split-divider" aria-hidden="true" />
    <div className="au-split-badge">
      <svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="au-split-ring" d="M60 60m-50 0a50 50 0 1 1 100 0a50 50 0 1 1-100 0" /></defs><text><textPath href="#au-split-ring">Business · Leisure · Business · Leisure · Business · Leisure ·</textPath></text></svg>
      <p><span>Same team.</span>Same attention to the journey.</p>
    </div>
  </div>;
}
