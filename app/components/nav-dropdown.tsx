"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import type { SiteLink } from "./data";
import { Arrow, TravelIcon } from "./icons";

export function NavDropdown({ link, current, open, onToggle, onClose, onOpen }: {
  link: SiteLink;
  current: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onOpen: () => void;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = link.children?.some(child => child.href === current);
  const corporate = link.href === "/corporate-travel";
  const cancelClose = () => { if (timer.current) clearTimeout(timer.current); };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (!open) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (root.current?.closest('[data-motion-paused="true"]')) return;
      gsap.fromTo(root.current?.querySelector(".ww-dropdown-panel") ?? [],
        { opacity: 0, y: 12, scale: .97 }, { opacity: 1, y: 0, scale: 1, duration: .32, ease: "power3.out" });
      gsap.fromTo(root.current?.querySelectorAll(".ww-dropdown-item") ?? [],
        { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .3, stagger: .055, delay: .07, ease: "power2.out" });
    });
    return () => media.revert();
  }, [open]);

  return <div ref={root} className="ww-dropdown" data-open={open}
    onPointerEnter={event => { if (event.pointerType === "mouse") { cancelClose(); onOpen(); } }}
    onPointerLeave={event => { if (event.pointerType === "mouse") timer.current = setTimeout(() => { if (!root.current?.contains(document.activeElement)) onClose(); }, 160); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) onClose(); }}
    onKeyDown={event => {
      if (event.key === "Escape") { event.stopPropagation(); onClose(); trigger.current?.focus(); }
      if (event.key === "ArrowDown" && event.target === trigger.current) {
        event.preventDefault(); onOpen();
        requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>(".ww-dropdown-item")?.focus());
      }
    }}>
    <button ref={trigger} type="button" className="ww-nav-link" aria-expanded={open} aria-controls={id} data-active={active} onClick={onToggle}>
      {link.label}<svg className="ww-caret" viewBox="0 0 12 8" aria-hidden="true"><path d="m2 2 4 4 4-4" /></svg>
    </button>
    <div id={id} className="ww-dropdown-menu" hidden={!open}>
      <div className="ww-dropdown-panel">
        <div className="ww-dropdown-heading"><span>{corporate ? "Business, without borders" : "A little more about us"}</span><span aria-hidden="true">↗</span></div>
        {link.children?.map((child, index) => <Link className="ww-dropdown-item" key={child.href} href={child.href} onClick={onClose} aria-current={child.href === current ? "page" : undefined}>
          <span className="ww-dropdown-icon"><TravelIcon kind={corporate ? (index ? "people" : "plane") : (index ? "globe" : "compass")} size={22} /></span>
          <span><strong>{child.label}</strong><small>{child.note}</small></span><Arrow diagonal />
        </Link>)}
        <div className="ww-dropdown-foot"><span className="ww-status-dot" />People. Places. Further together.</div>
      </div>
    </div>
  </div>;
}
