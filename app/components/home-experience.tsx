"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./icons";
import { pageLinks, siteLinks } from "./data";
import { NavDropdown } from "./nav-dropdown";

export function HomeExperience({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(root);
    media.add({ desktop: "(min-width: 900px) and (min-height: 740px)", motion: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      const animate = conditions?.motion && !paused;
      const video = root.current?.querySelector("video");
      if (animate) video?.play().catch(() => {}); else video?.pause();
      if (!animate) return;
      const desktop = conditions?.desktop;
      const hero = gsap.timeline({ scrollTrigger: { id: "home-hero", trigger: ".n-hero", start: "top top", end: () => `+=${window.innerHeight * (desktop ? .7 : .6)}`, pin: !!desktop, scrub: .7, invalidateOnRefresh: true, refreshPriority: 4 } });
      hero.to(".n-hero-visual", { scale: 1.12, ease: "none" }, 0).to(".n-hero-copy", { y: -70, opacity: .15, ease: "none" }, 0).to(".n-hero-shade", { opacity: .75 }, 0);
      gsap.from(".n-travel-heading h2", { y: 35, ease: "none", scrollTrigger: { trigger: ".n-travel-heading", start: "top bottom", end: "center center", scrub: .6 } });
      if (desktop) {
        const pair = gsap.timeline({ scrollTrigger: { id: "home-travel", trigger: ".n-travel", start: "top top", end: () => `+=${window.innerHeight * .75}`, pin: true, scrub: .65, invalidateOnRefresh: true, refreshPriority: 3 } });
        pair.fromTo(".n-travel-panel:first-child .n-panel-photo", { yPercent: -4, scale: 1.05 }, { yPercent: 4, scale: 1, ease: "none" }, 0)
          .fromTo(".n-travel-panel:last-child .n-panel-photo", { yPercent: 4, scale: 1.05 }, { yPercent: -4, scale: 1, ease: "none" }, 0)
          .from(".n-panel-copy", { y: 20, opacity: .55, stagger: .08 }, 0);

        const scene = gsap.timeline({ scrollTrigger: { id: "home-mountains", trigger: ".n-promises", start: "top top", end: () => `+=${window.innerHeight * .7}`, pin: true, scrub: .6, invalidateOnRefresh: true, refreshPriority: 1 } });
        scene.to(".n-promise-copy", { y: 145, ease: "none" }, 0);
      }
      gsap.from(".h-tile, .h-support-head", { clipPath: "inset(14% 10% 14% 10% round 28px)", opacity: 0, duration: 1.1, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: ".h-support-grid", start: "top 80%", once: true } });
      gsap.from(".h-postcard", { y: 90, rotate: 0, opacity: 0, duration: 1.1, stagger: .15, ease: "power3.out", scrollTrigger: { trigger: ".h-postcards-grid", start: "top 75%", once: true } });
      gsap.utils.toArray<HTMLElement>(".h-moment").forEach((el, i) => gsap.fromTo(el, { y: 40 + i * 12 }, { y: -40 - i * 12, ease: "none", scrollTrigger: { trigger: ".h-groups", start: "top bottom", end: "bottom top", scrub: .8 } }));
      gsap.utils.toArray<HTMLElement>("[data-home-reveal]").forEach(el => gsap.from(el, { y: 35, opacity: .15, duration: .85, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 93%", once: true } }));
      gsap.utils.toArray<HTMLElement>("[data-home-parallax]").forEach(el => gsap.fromTo(el, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: .6 } }));
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    let live = true;
    document.fonts.ready.then(() => { if (live) ScrollTrigger.refresh(); });
    return () => { live = false; media.revert(); };
  }, [paused]);
  return <div ref={root} className="home-page">{children}<button type="button" className="n-motion" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Enable animations" : "Pause animations"}>{paused ? "▷" : "Ⅱ"}<span>{paused ? "Play motion" : "Pause motion"}</span></button></div>;
}

export function HomeHeader() {
  const menu = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return <><header className={`n-header${scrolled ? " is-scrolled" : ""}`}><div className="n-shell n-header-inner"><nav aria-label="Main navigation" className="n-nav">{siteLinks.slice(0,6).map(l=>l.children?<NavDropdown key={l.href} link={l} />:<Link href={l.href} key={l.href}>{l.label}</Link>)}</nav><Link href="/" className="n-brand" aria-label="Wings and Wheels home">Wings & Wheels</Link><Link className="n-button n-header-contact" href="/contact">Contact <Arrow /></Link><button type="button" className="n-menu-button" onClick={() => { menu.current?.showModal(); setOpen(true); }} aria-expanded={open} aria-controls="home-menu" aria-haspopup="dialog" aria-label="Open navigation"><span /><span /></button></div></header><dialog ref={menu} id="home-menu" className="n-menu" aria-label="Site navigation" onClose={() => setOpen(false)} onClick={e=>{if(e.target===e.currentTarget)menu.current?.close();}}><div><span className="n-brand">Wings & Wheels</span><button type="button" onClick={()=>menu.current?.close()} aria-label="Close navigation">×</button></div><nav>{pageLinks.map(l=><Link href={l.href} key={l.href} onClick={()=>menu.current?.close()}>{l.label}<Arrow /></Link>)}</nav><p>People. Places. Further together.</p></dialog></>;
}

const services = [
  { title: "Every detail,\nconnected.", text: "Flights, hotels, visas and transfers. One coordinated journey, from the first booking to the last mile.", image: "/images/about/lounge.jpg", alt: "Passport and travel documents ready in an airport lounge", label: "Plan the journey", href: "/travel-services" },
  { title: "A stay that\nfeels right.", text: "A city hotel for the meeting, an island resort for the family, or somewhere to stay a little longer. We help find your fit.", image: "/images/maldives-villa.png", alt: "An overwater villa and private pool at sunset", label: "Find your place", href: "/destinations" },
  { title: "From arrival\nto everywhere.", text: "Airport transfers, private vehicles and group transport. The connections between each moment, taken care of.", image: "/images/about/coast-road.jpg", alt: "A scenic coastal road winding above the sea", label: "Connect the details", href: "/travel-services" },
  { title: "Real people.\nRight there.", text: "A change of plan or an onward connection. Our team stays available, so you know who to turn to when it matters.", image: "/images/about/team.jpg", alt: "A travel consultant arranging the details of a journey", label: "Stay supported", href: "/contact" },
];
export function HomeServices() {
  return <section className="h-support" aria-labelledby="support-title">
    <div className="n-shell h-support-grid">
      <div className="h-support-head">
        <span className="n-kicker">Before. During. And all the way home.</span>
        <h2 id="support-title">How we support<br />every journey.</h2>
        <ol className="h-phases" aria-label="Journey stages"><li>Before</li><li>During</li><li>All the way home</li></ol>
      </div>
      {services.map((s, i) => <Link key={s.label} href={s.href} className={`h-tile h-tile-${i + 1}`}>
        <span className="h-tile-photo"><Image src={s.image} alt={s.alt} fill sizes={i === 0 ? "(max-width: 767px) 92vw, 52vw" : "(max-width: 767px) 92vw, 30vw"} className="n-cover" /></span>
        <span className="h-tile-num">0{i + 1}</span>
        <span className="h-tile-arrow" aria-hidden="true">↗</span>
        <span className="h-tile-copy"><span className="n-kicker">{s.label}</span><strong>{s.title.split("\n").map(line => <span key={line}>{line}</span>)}</strong><span className="h-tile-text">{s.text}</span></span>
      </Link>)}
    </div>
  </section>;
}
const promises = [
  { title: "We stay human.", label: "People before everything", text: "Technology makes travel faster. People make it feel easier. Behind every journey is a team that listens, understands and stays connected.", href: "/about" },
  { title: "We listen first.", label: "Your journey, understood", text: "Before the flights and the hotel rooms, there is you. We take the time to understand why you’re travelling, and what matters most.", href: "/about" },
  { title: "We see the whole journey.", label: "Beyond the booking", text: "A confirmed ticket is only one part of the story. We connect the details before you leave, along the way, and when it’s time to come home.", href: "/travel-services" },
];
export function HomePromises() {
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive(current => (current + direction + promises.length) % promises.length);
  const promise = promises[active];
  return <section className="n-promises" aria-labelledby="promise-title"><Image src="/images/home/mountain-terrace.webp" alt="An outdoor dining terrace overlooking layered mountain ridges beneath a peach evening sky" fill sizes="100vw" className="n-cover n-promise-background" /><div className="n-promise-copy"><span className="n-kicker">The Wings & Wheels way</span><span className="n-promise-symbol" aria-hidden="true">✳</span><div className="n-promise-slide" aria-live="polite" aria-atomic="true"><h2 id="promise-title">{promise.title}</h2><span className="n-kicker">{promise.label}</span><p>{promise.text}</p></div><div className="n-promise-controls"><button type="button" className="n-circle" aria-label="Previous principle" onClick={()=>move(-1)}>←</button><span>0{active+1} <i>/</i> 03</span><button type="button" className="n-circle" aria-label="Next principle" onClick={()=>move(1)}>→</button></div></div><svg className="n-promise-foreground" viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><clipPath id="home-mountain-mask"><path d="M0 530L36 531 58 525 77 520 94 529 124 516 155 524 192 520 223 524 258 530 289 536 323 530 354 537 388 529 427 520 452 511 470 516 494 511 520 519 553 525 588 529 628 522 651 514 677 506 715 505 752 493 779 497 812 497 839 486 872 481 906 486 941 484 969 493 994 494 1021 486 1046 480 1071 474 1093 482 1110 477 1133 490 1156 486 1180 495 1200 493 1237 506 1264 502 1296 512 1327 504 1358 510 1390 508 1418 516 1450 510 1480 518 1510 515 1536 523V1024H0Z" /></clipPath></defs><image href="/images/home/mountain-terrace.webp" width="1536" height="1024" clipPath="url(#home-mountain-mask)" /></svg><span className="n-promise-footnote">A wider world. A more personal way to travel.</span></section>;
}
