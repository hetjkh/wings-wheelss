"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { siteLinks, type SiteLink } from "./data";
import { Arrow, TravelIcon } from "./icons";
import { NavDropdown } from "./nav-dropdown";
import { ContactFormLink } from "./contact-form-link";
import "./site-navigation.css";

function motionAllowed(element: HTMLElement | null) {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !element?.closest('[data-motion-paused="true"]');
}

function Wordmark() {
  return <span className="ww-logo-lockup"><Image src="/logo-transparent.png" alt="Wings & Wheels Travel & Tourism — Travel. Thoughtfully Managed." width={1672} height={941} sizes="200px" /></span>;
}

function MobileGroup({ link, current, close, expanded, toggle, index }: {
  link: SiteLink; current: string; close: () => void; expanded: boolean; toggle: () => void; index: number;
}) {
  const id = useId();
  const content = useRef<HTMLDivElement>(null);
  const active = link.href === current || link.children?.some(child => child.href === current);
  useEffect(() => {
    if (!content.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(content.current, { height: expanded ? 0 : "auto", opacity: expanded ? 0 : 1 }, {
        height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0,
        duration: motionAllowed(content.current) ? .3 : 0, ease: "power2.inOut",
      });
    });
    return () => context.revert();
  }, [expanded]);

  return <div className="ww-mobile-row" data-active={active}>
    {link.children ? <>
      <button className="ww-mobile-link" type="button" aria-expanded={expanded} aria-controls={id} onClick={toggle}>
        <small>{String(index + 1).padStart(2, "0")}</small><span>{link.label}</span><span className="ww-plus" aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
      <div ref={content} id={id} className="ww-mobile-children" inert={!expanded} aria-hidden={!expanded}>
        {link.children.map(child => <Link key={child.href} href={child.href} onClick={close} aria-current={current === child.href ? "page" : undefined}>
          <span>{child.label}<small>{child.note}</small></span><Arrow diagonal />
        </Link>)}
      </div>
    </> : <Link href={link.href} className="ww-mobile-link" onClick={close} aria-current={current === link.href ? "page" : undefined}>
      <small>{String(index + 1).padStart(2, "0")}</small><span>{link.label}</span><Arrow diagonal />
    </Link>}
  </div>;
}

export function SiteNavigation({ scrolled, enquiry = false }: { scrolled: boolean; enquiry?: boolean }) {
  const pathname = usePathname();
  const id = useId();
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closing = useRef<gsap.core.Tween | null>(null);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add({
      reduce: "(prefers-reduced-motion: reduce)",
      desktop: "(prefers-reduced-motion: no-preference) and (min-width: 1200px)",
      mobile: "(prefers-reduced-motion: no-preference) and (max-width: 1199px)",
    }, context => {
      if (context.conditions?.reduce || !header.current) return;
      const mobile = Boolean(context.conditions?.mobile);
      // Always finish visible — never leave the nav stuck at opacity 0 after a route change.
      gsap.fromTo(header.current, { y: mobile ? -8 : -16, opacity: 0 }, {
        y: 0, opacity: 1, duration: mobile ? .35 : .65, ease: "power3.out",
        clearProps: "transform,opacity",
        onInterrupt: () => { if (header.current) gsap.set(header.current, { clearProps: "transform,opacity" }); },
      });
    });
    return () => {
      media.revert();
      if (header.current) {
        gsap.killTweensOf(header.current);
        gsap.set(header.current, { clearProps: "transform,opacity" });
      }
    };
  }, []);

  useEffect(() => {
    if (!dropdown) return;
    const dismiss = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setDropdown(null); };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [dropdown]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!motionAllowed(dialog.current)) return;
      gsap.fromTo(dialog.current, { xPercent: 100, opacity: .5 }, { xPercent: 0, opacity: 1, duration: .5, ease: "power3.out" });
      gsap.fromTo(dialog.current?.querySelectorAll(".ww-mobile-row, .ww-drawer-footer") ?? [],
        { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .035, delay: .14, ease: "power2.out" });
    });
    const desktop = window.matchMedia("(min-width: 1200px)");
    const resize = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", resize);
    return () => {
      closing.current?.kill();
      closing.current = null;
      media.revert();
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  const openForm = (event: { preventDefault: () => void }) => {
    if (pathname !== "/contact") return;
    event.preventDefault();
    if (header.current) {
      gsap.killTweensOf(header.current);
      gsap.set(header.current, { opacity: 1, y: 0, clearProps: "transform,opacity" });
    }
    const target = document.getElementById("form");
    if (!target) return;
    const go = () => {
      const top = target.getBoundingClientRect().top + window.scrollY + (window.matchMedia("(max-width: 767px)").matches ? 120 : 160);
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      history.replaceState(null, "", "#form");
    };
    go();
    window.setTimeout(go, 280);
  };

  function closeMenu() {
    if (closing.current) return;
    if (!motionAllowed(dialog.current)) { dialog.current?.close(); return; }
    closing.current = gsap.to(dialog.current, {
      xPercent: 100, opacity: .4, duration: .28, ease: "power2.in", overwrite: true,
      onComplete: () => { dialog.current?.close(); },
    });
  }

  return <>
    <header ref={header} className="ww-header" data-scrolled={scrolled}>
      <div className="ww-header-bar">
        <Link href="/" className="ww-brand" aria-label="Wings and Wheels home"><Wordmark /></Link>
        <nav className="ww-desktop-nav" aria-label="Main navigation">
          {siteLinks.map(link => link.children ?
            <NavDropdown key={link.href} link={link} current={pathname} open={dropdown === link.href}
              onOpen={() => setDropdown(link.href)} onClose={() => setDropdown(value => value === link.href ? null : value)}
              onToggle={() => setDropdown(value => value === link.href ? null : link.href)} /> :
            <Link className="ww-nav-link" key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onPointerEnter={() => setDropdown(null)} onFocus={() => setDropdown(null)}>{link.label}</Link>)}
        </nav>
        <div className="ww-header-actions">
          <ContactFormLink className="ww-header-cta" onClick={openForm}><span>{enquiry ? "Plan a journey" : "Let’s talk"}</span><span className="ww-header-cta-dot"><Arrow /></span></ContactFormLink>
          <button className="ww-menu-toggle" type="button" aria-expanded={open} aria-controls={id} aria-haspopup="dialog" aria-label="Open navigation" onClick={() => {
            setDropdown(null); setExpanded(null); dialog.current?.showModal(); setOpen(true);
          }}><span className="ww-menu-label">Menu</span><span className="ww-menu-lines" aria-hidden="true"><i /><i /></span></button>
        </div>
      </div>
    </header>
    <dialog ref={dialog} id={id} className="ww-drawer" aria-label="Site navigation" data-lenis-prevent
      onCancel={event => { event.preventDefault(); closeMenu(); }}
      onClose={() => setOpen(false)}
      onClick={event => { if (event.target === event.currentTarget) closeMenu(); }}>
      <div className="ww-drawer-content">
        <div className="ww-drawer-heading"><Link href="/" className="ww-brand" onClick={closeMenu}><Wordmark /></Link><button type="button" className="ww-close" onClick={closeMenu} aria-label="Close navigation" autoFocus><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div>
        <div className="ww-drawer-intro"><span className="ww-eyebrow">Your next chapter</span><p>Where shall we go?</p></div>
        <nav aria-label="Mobile navigation">
          {siteLinks.map((link, index) => <MobileGroup key={link.href} link={link} current={pathname} index={index} close={closeMenu} expanded={expanded === link.href} toggle={() => setExpanded(value => value === link.href ? null : link.href)} />)}
        </nav>
        <div className="ww-drawer-footer"><ContactFormLink className="ww-drawer-cta" onClick={event => { openForm(event); closeMenu(); }}><span>Let’s plan something<br /><strong>worth going for.</strong></span><Arrow diagonal /></ContactFormLink><p><span className="ww-status-dot" />From Dubai. To your next chapter.</p></div>
      </div>
    </dialog>
  </>;
}
