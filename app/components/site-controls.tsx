"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navLinks, office } from "./data";
import { Arrow, TravelIcon } from "./icons";

const serviceOptions = ["General enquiry", "Corporate travel", "Leisure & holidays", "Groups & MICE", "Africa travel", "Visa assistance"];

export function EnquiryButton({ children = "Request a quote", className = "button button-gold", service = "General enquiry", destination = "", icon = true }: { children?: React.ReactNode; className?: string; service?: string; destination?: string; icon?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [complete, setComplete] = useState(false);
  return <>
    <button type="button" className={className} onClick={() => { setComplete(false); dialog.current?.showModal(); }}>{children}{icon && <Arrow />}</button>
    <dialog className="enquiry-dialog" ref={dialog} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-label="Request a quote">
      <button type="button" className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close">×</button>
      {complete ? <div className="enquiry-success">
        <TravelIcon kind="check" size={34} />
        <span className="eyebrow">Request received</span>
        <h2>Thank you</h2>
        <p>This form is a preview, so your details haven&apos;t been sent yet. For now, please call {office.phones[0].label} or email {office.email}.</p>
        <button type="button" className="button button-dark" onClick={() => dialog.current?.close()}>Close <Arrow /></button>
      </div> : <>
        <span className="eyebrow">Request a quote</span>
        <h2>Tell us about your trip</h2>
        <p className="dialog-intro">Share a few details and a travel consultant will get back to you.</p>
        <form onSubmit={event => { event.preventDefault(); setComplete(true); }}>
          <div className="form-row">
            <label>Full name *<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
            <label>Email address *<input name="email" type="email" autoComplete="email" required /></label>
          </div>
          <div className="form-row">
            <label>Service *<select name="service" defaultValue={service}>{serviceOptions.map(item => <option key={item}>{item}</option>)}</select></label>
            <label>Destination<input name="destination" defaultValue={destination} maxLength={100} /></label>
          </div>
          <label>Your requirements *<textarea name="message" placeholder="Travel dates, number of travellers, anything we should know" rows={3} required minLength={10} maxLength={1000} /></label>
          <p className="demo-note">Preview form · Your details won&apos;t be sent or stored.</p>
          <button type="submit" className="button button-dark">Send request <Arrow /></button>
        </form>
      </>}
    </dialog>
  </>;
}

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" className={light ? "brand brand-light" : "brand"} aria-label="Wings and Wheels Travel and Tourism, home">
    <svg className="brand-symbol" width="38" height="38" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 14 14 38 24 15l10 23 10-24" /><path d="M10 10c5-4 9-5 14-5s9 1 14 5" /><circle cx="24" cy="40" r="2.5" fill="currentColor" stroke="none" /></svg>
    <span className="brand-text"><span className="brand-name">Wings &amp; Wheels</span><span className="brand-sub">Travel and Tourism</span></span>
  </Link>;
}

function SiteHeader() {
  const menu = useRef<HTMLDialogElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => menu.current?.close();
  return <>
    <div className={scrolled ? "site-top is-scrolled" : "site-top"}>
      <div className="topbar">
        <div className="shell topbar-inner">
          <span><TravelIcon kind="pin" size={14} />Deira, Dubai, UAE</span>
          <span className="topbar-hours"><TravelIcon kind="calendar" size={14} />{office.hours}</span>
          <span className="topbar-contact">
            <a href={office.phones[0].href}><TravelIcon kind="support" size={14} />{office.phones[0].label}</a>
            <a href={`mailto:${office.email}`}><TravelIcon kind="document" size={14} />{office.email}</a>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <nav className="header-nav" aria-label="Main navigation">
            {navLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <div className="header-actions">
            <EnquiryButton className="button button-gold button-small">Request a quote</EnquiryButton>
            <button type="button" className="menu-toggle" onClick={() => menu.current?.showModal()} aria-haspopup="dialog" aria-label="Open menu"><TravelIcon kind="menu" size={22} /></button>
          </div>
        </div>
      </header>
    </div>
    <dialog ref={menu} className="menu-dialog" aria-label="Site menu" onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="menu-panel">
        <div className="menu-top"><Brand /><button type="button" className="dialog-close" onClick={close} aria-label="Close menu">×</button></div>
        <nav aria-label="Mobile navigation">{navLinks.map(link => <Link key={link.href} href={link.href} onClick={close}>{link.label}<Arrow /></Link>)}</nav>
        <div className="menu-contact">
          {office.phones.map(p => <a key={p.href} href={p.href}>{p.label}</a>)}
          <a href={`mailto:${office.email}`}>{office.email}</a>
          <span>{office.hours}</span>
        </div>
      </div>
    </dialog>
  </>;
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <>
    <SiteHeader />
    {children}
  </>;
}
