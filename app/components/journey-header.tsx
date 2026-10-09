"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EnquiryButton } from "./site-controls";
import { Arrow, TravelIcon } from "./icons";

const links = [
  { label: "About", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Our Network", href: "#network" },
  { label: "FAQs", href: "#faqs" },
];

export function JourneyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const update = () => {
      const intro = document.getElementById("about");
      setScrolled(intro ? intro.getBoundingClientRect().top <= 88 : window.scrollY > 48);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [menuOpen]);
  const close = () => menu.current?.close();
  return <>
    <header className={`j-header${scrolled ? " j-header-scrolled" : ""}`}>
      <div className="j-shell j-header-inner">
        <Link className="j-brand" href="/" aria-label="Wings and Wheels home">Wings &amp; Wheels</Link>
        <nav className="j-desktop-nav" aria-label="Main navigation">{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        <EnquiryButton className="j-button j-header-cta">Plan Your Journey</EnquiryButton>
        <button className="j-menu-toggle" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="journey-menu" aria-haspopup="dialog" onClick={() => { menu.current?.showModal(); setMenuOpen(true); }}><TravelIcon kind="menu" /></button>
      </div>
    </header>
    <dialog ref={menu} id="journey-menu" className="j-menu" aria-label="Navigation" onClose={() => setMenuOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="j-menu-heading"><span className="j-brand">Wings &amp; Wheels</span><button onClick={close} aria-label="Close navigation">×</button></div>
      <nav aria-label="Mobile navigation">{links.map(link => <a href={link.href} key={link.href} onClick={close}>{link.label}<Arrow /></a>)}</nav>
      <Link href="/contact" className="j-button j-button-olive" onClick={close}>Talk to our team <Arrow /></Link>
      <p>People. Places. Further together.</p>
    </dialog>
  </>;
}
