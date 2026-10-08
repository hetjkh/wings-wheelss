"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow, TravelIcon } from "./icons";

export function EnquiryButton({ children = "Plan your trip", className = "button button-dark", service = "General enquiry", destination = "", icon = true }: { children?: React.ReactNode; className?: string; service?: string; destination?: string; icon?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [complete, setComplete] = useState(false);
  return <>
    <button type="button" className={className} onClick={() => { setComplete(false); dialog.current?.showModal(); }}>{children}{icon && <Arrow />}</button>
    <dialog className="enquiry-dialog" ref={dialog} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-label="Plan your journey">
      <button type="button" className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close enquiry">×</button>
      {complete ? <div className="enquiry-success"><TravelIcon kind="check" size={30} /><span className="eyebrow">A little closer to your next journey</span><h2>Your next chapter<br /><em>looks good.</em></h2><p>Your preview is complete. This planner is a demo, so your details haven&apos;t been sent or saved.</p><button type="button" className="button button-dark" onClick={() => dialog.current?.close()}>Back to exploring <Arrow /></button></div> : <><span className="eyebrow">Let&apos;s make a little room for wonder</span><h2>Where would you<br /><em>like to go?</em></h2><p className="dialog-intro">Every great journey starts with a conversation.</p><form onSubmit={event => { event.preventDefault(); setComplete(true); }}><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required maxLength={100} /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label></div><div className="form-row"><label>Your kind of journey<select name="service" defaultValue={service}>{["General enquiry", "Corporate travel", "Leisure & holidays", "Groups & MICE", "Africa travel"].map(item => <option key={item}>{item}</option>)}</select></label><label>Dream destination<input name="destination" defaultValue={destination} placeholder="Somewhere wonderful…" maxLength={100} /></label></div><label>Tell us a little about your plans<textarea name="message" placeholder="When would you like to go? Who's coming along?" rows={3} required maxLength={3000} /></label><p className="demo-note">Preview planner · Your details won&apos;t be sent or stored.</p><button type="submit" className="button button-dark">Preview my journey <Arrow /></button></form></>}
    </dialog>
  </>;
}

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={light ? "brand brand-light" : "brand"} aria-label="Wings and Wheels home">
    <svg className="brand-symbol" width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 14 14 38 24 15l10 23 10-24" /><path d="M10 10c5-4 9-5 14-5s9 1 14 5" /><circle cx="24" cy="40" r="2.5" fill="currentColor" stroke="none" /></svg>
    <span className="brand-name">Wings <i>&amp;</i> Wheels</span>
  </Link>;
}

const MenuContext = createContext<() => void>(() => {});
export const useOpenMenu = () => useContext(MenuContext);

export function MenuButton({ className = "menu-pill" }: { className?: string }) {
  const open = useOpenMenu();
  return <button type="button" className={className} onClick={open} aria-haspopup="dialog">Menu <TravelIcon kind="menu" size={16} /></button>;
}

const menuLinks = [
  { label: "Destinations", href: "/#map", image: "/images/santorini.jpg", note: "An interactive map" },
  { label: "East Africa", href: "/#spotlight", image: "/images/tanzania.png", note: "Wild at heart" },
  { label: "Our story", href: "/#story", image: "/images/about-airport.png", note: "Built around real journeys" },
  { label: "Journeys", href: "/#services", image: "/images/corporate.png", note: "Leisure, corporate & groups" },
  { label: "Contact", href: "/contact", image: "/images/dubai-terrace.png", note: "Let's start a conversation" },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [hovered, setHovered] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const close = () => dialog.current?.close();
  return <MenuContext.Provider value={() => dialog.current?.showModal()}>
    {children}
    <div className={scrolled ? "floating-bar is-shown" : "floating-bar"} aria-hidden={!scrolled}>
      <Brand />
      <nav aria-label="Quick links">{menuLinks.slice(0, 4).map(link => <Link key={link.href} href={link.href} tabIndex={scrolled ? 0 : -1}>{link.label}</Link>)}</nav>
      <EnquiryButton className="button button-dark button-small">Plan your trip</EnquiryButton>
      <button type="button" className="menu-pill menu-pill-dark" tabIndex={scrolled ? 0 : -1} onClick={() => dialog.current?.showModal()}>Menu <TravelIcon kind="menu" size={16} /></button>
    </div>
    <dialog ref={dialog} className="menu-dialog" aria-label="Site menu" onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="menu-panel">
        <div className="menu-top"><Brand /><button type="button" className="menu-pill" onClick={close}>Close <span aria-hidden="true">×</span></button></div>
        <div className="menu-body">
          <nav aria-label="Main navigation">
            {menuLinks.map((link, i) => <Link key={link.href} href={link.href} onClick={close} onMouseEnter={() => setHovered(i)} onFocus={() => setHovered(i)} className={hovered === i ? "is-active" : ""}><span className="menu-index">0{i + 1}</span>{link.label}<span className="menu-note">{link.note}</span></Link>)}
          </nav>
          <div className="menu-preview">
            {menuLinks.map((link, i) => <Image key={link.href} src={link.image} alt="" fill sizes="(max-width: 900px) 0px, 40vw" className={hovered === i ? "is-active" : ""} />)}
            <span className="script menu-script">Where to next?</span>
          </div>
        </div>
        <div className="menu-foot"><span>Based in the UAE · At home in the world</span><EnquiryButton className="button button-dark">Plan your trip</EnquiryButton></div>
      </div>
    </dialog>
  </MenuContext.Provider>;
}
