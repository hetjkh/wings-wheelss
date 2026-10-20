"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "./travel-image";
import { Arrow } from "./icons";

export type Audience = { title: string; text: string; href: string; image: string; alt: string };

export function AboutAudiences({ items }: { items: Audience[] }) {
  const list = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const area = list.current;
    const card = cursor.current;
    if (!area || !card) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let primed = false;

    const tick = () => {
      const dx = target.x - current.x;
      current.x += dx * .14;
      current.y += (target.y - current.y) * .14;
      const tilt = Math.max(-12, Math.min(12, dx * .06));
      card.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      frame = Math.abs(dx) + Math.abs(target.y - current.y) > .3 ? requestAnimationFrame(tick) : 0;
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches) return;
      const box = area.getBoundingClientRect();
      target.x = event.clientX - box.left;
      target.y = event.clientY - box.top;
      if (!primed) { current.x = target.x; current.y = target.y; primed = true; }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const leave = () => { primed = false; };

    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="au-aud" ref={list} onPointerLeave={() => setActive(null)}>
    <div className="au-aud-cursor" ref={cursor} data-on={active !== null} aria-hidden="true">
      {items.map((item, index) => <div key={item.title} className={`au-aud-cursor-photo${index === active ? " is-on" : ""}`}>
        <Image src={item.image} alt="" fill sizes="320px" />
      </div>)}
    </div>
    <ul>
      {items.map((item, index) => <li key={item.title} className={`au-aud-row${index === active ? " is-active" : ""}`} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onBlur={() => setActive(null)}>
        <span className="au-aud-thumb"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 991px) 30vw, 1px" /></span>
        <span className="au-aud-no">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="au-aud-title"><span data-text={item.title}>{item.title}</span></h3>
        <p>{item.text}</p>
        <Link href={item.href} className="au-aud-link" aria-label={`Explore ${item.title.toLowerCase()} travel`}><Arrow diagonal /></Link>
      </li>)}
    </ul>
  </div>;
}
