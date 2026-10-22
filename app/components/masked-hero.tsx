"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "./travel-image";
import { Arrow } from "./icons";
import { Cta } from "./about-cta";
import { EnquiryButton } from "./site-controls";
import "./masked-hero.css";

export type MaskedHeroLine = string | { text: string; accent?: boolean };

type Action = { label: string; href: string } | { label: string; service: string; destination?: string };

type Media =
  | { video: string; poster?: string }
  | { image: string; alt: string; position?: string };

function Line({ children }: { children: ReactNode }) {
  return <span className="au-line"><span>{children}</span></span>;
}

function ActionControl({ action, ghost }: { action: Action; ghost?: boolean }) {
  const inner = <><span>{action.label}</span><span className="au-cta-dot"><Arrow /></span></>;
  if (ghost) return <span className="au-cta au-cta-light">{inner}</span>;
  if ("href" in action) return <Cta href={action.href}>{action.label}</Cta>;
  return <EnquiryButton className="au-cta" service={action.service} destination={action.destination} icon={false}>{inner}</EnquiryButton>;
}

function HeroCopy({ id, eyebrow, lines, sub, text, action, back, ghost }: {
  id: string;
  eyebrow: string;
  lines: MaskedHeroLine[];
  sub?: string;
  text: string;
  action: Action;
  back?: { href: string; label: string };
  ghost?: boolean;
}) {
  const Title = ghost ? "p" : "h1";
  return <div className="j-shell au-hero-inner">
    <div className="au-hero-top">
      {back ? ghost
        ? <span className="au-hero-back"><Arrow back />{back.label}</span>
        : <Link className="au-hero-back" href={back.href}><Arrow back />{back.label}</Link>
        : null}
      <span className="j-eyebrow au-hero-eyebrow">{eyebrow}</span>
    </div>
    <Title id={ghost ? undefined : id} className="au-hero-title">
      {lines.map(line => {
        const value = typeof line === "string" ? line : line.text;
        const accent = typeof line === "string" ? false : line.accent;
        return <Line key={value}>{accent ? <em>{value}</em> : value}</Line>;
      })}
      {sub ? <span className="au-line au-hero-sub"><span>{sub}</span></span> : null}
    </Title>
    <div className="au-hero-aside">
      <p>{text}</p>
      <ActionControl action={action} ghost={ghost} />
    </div>
  </div>;
}

/** About-style header: the picture or video opens out of the map, and the pill button fills on hover. */
export function MaskedHero({ id, eyebrow, lines, sub, text, action, media, tags, back }: {
  id: string;
  eyebrow: string;
  lines: MaskedHeroLine[];
  sub?: string;
  text: string;
  action: Action;
  media: Media;
  tags?: string[];
  back?: { href: string; label: string };
}) {
  const hero = useRef<HTMLElement>(null);
  const copy = { id, eyebrow, lines, sub, text, action, back };

  useEffect(() => {
    const section = hero.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = <T extends Element = HTMLElement>(selector: string) => Array.from(section.querySelectorAll<T>(selector));
    const one = <T extends Element = HTMLElement>(selector: string) => section.querySelector<T>(selector);
    const page = section.closest<HTMLElement>(".journey-page, .about-page, .home-page");
    const mediaQuery = gsap.matchMedia(section);

    mediaQuery.add({
      desktop: "(min-width: 992px) and (min-height: 640px)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, context => {
      if (!context.conditions?.motion) {
        section.querySelector("video")?.pause();
        return;
      }
      const desktop = Boolean(context.conditions.desktop);
      const cleanups: (() => void)[] = [];
      const lineCount = one(".au-hero-title")?.querySelectorAll(".au-line").length || 1;

      gsap.from(q(".au-hero-title .au-line > span"), { yPercent: 110, duration: 1.15, stagger: index => (index % lineCount) * .08, ease: "power4.out", delay: .1 });
      gsap.from(q(".au-hero-eyebrow, .au-hero-aside > *"), { y: 24, opacity: 0, duration: .9, stagger: index => (index % 3) * .1, ease: "power3.out", delay: .45 });
      gsap.from(q(".au-hero-photo-inner > *"), { scale: 1.3, duration: 1.8, ease: "power3.out" });

      const heroInner = one(".au-hero-photo-inner");
      const shell = one(".au-hero-inner");
      if (heroInner && shell && desktop && page) {
        const travellers = q(".au-hero-top, .au-hero-title .au-line, .au-hero-aside p");
        const ctas = q(".au-hero-aside .au-cta");
        const ctaShift = (element: HTMLElement) => {
          const inset = Math.max(32, section.clientWidth * 0.04);
          const xNow = Number(gsap.getProperty(element, "x")) || 0;
          const fromHero = element.getBoundingClientRect().left - xNow - section.getBoundingClientRect().left;
          return section.clientWidth - element.offsetWidth - inset - fromHero;
        };
        // Measure the home hero's pin before the downstream services and travel pins.
        gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: "+=120%", pin: true, scrub: .8, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: page.classList.contains("home-page") ? 4 : 0 } })
          .fromTo(q(".au-hero-photo, .au-hero-ghost"), { "--map": 1 }, { "--map": 34, ease: "power2.in", duration: 1 }, 0)
          .fromTo(page, { "--hero-fg": "#3d2d20" }, { "--hero-fg": "#fff8e9", ease: "none", duration: .25 }, .3)
          .fromTo(heroInner, { scale: 1.16 }, { scale: 1, ease: "none", duration: 1 }, 0)
          .fromTo(one(".au-hero-shade"), { opacity: .35 }, { opacity: 1, ease: "none", duration: 1 }, 0)
          .fromTo(q(".au-hero-title"), { scale: .74 }, { scale: 1, ease: "power2.inOut", duration: .7 }, .28)
          .fromTo(travellers, { x: 0 }, {
            x: (_, element: HTMLElement) => -element.offsetLeft + shell.clientWidth * 0.08,
            ease: "power2.inOut",
            duration: .7,
            stagger: .03,
          }, .28)
          .fromTo(ctas, { x: 0 }, { x: (_, element: HTMLElement) => ctaShift(element), ease: "power2.inOut", duration: .75 }, .32)
          .to(one(".au-hero-scroll"), { opacity: 0, duration: .15 }, 0);

        const xTo = gsap.quickTo(heroInner, "x", { duration: 1, ease: "power3" });
        const yTo = gsap.quickTo(heroInner, "y", { duration: 1, ease: "power3" });
        const drift = (event: PointerEvent) => {
          const box = section.getBoundingClientRect();
          xTo(((event.clientX - box.left) / box.width - .5) * -28);
          yTo(((event.clientY - box.top) / box.height - .5) * -18);
        };
        section.addEventListener("pointermove", drift);
        cleanups.push(() => section.removeEventListener("pointermove", drift));
      }

      const heroCta = one(".au-hero-inner .au-cta");
      const ghostCta = one(".au-hero-ghost .au-cta");
      if (heroCta && ghostCta) {
        const on = () => ghostCta.classList.add("is-hover");
        const off = () => ghostCta.classList.remove("is-hover");
        heroCta.addEventListener("pointerenter", on);
        heroCta.addEventListener("pointerleave", off);
        heroCta.addEventListener("focus", on);
        heroCta.addEventListener("blur", off);
        cleanups.push(() => {
          heroCta.removeEventListener("pointerenter", on);
          heroCta.removeEventListener("pointerleave", off);
          heroCta.removeEventListener("focus", on);
          heroCta.removeEventListener("blur", off);
        });
      }

      return () => cleanups.forEach(cleanup => cleanup());
    });

    return () => mediaQuery.revert();
  }, [id]);

  return <section className="au-hero s-hero" id="top" aria-labelledby={id} ref={hero}>
    <div className="au-hero-photo">
      <div className="au-hero-photo-inner">
        {"video" in media
          ? <video src={media.video} poster={media.poster ?? "/images/journey/hero.webp"} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
          : <Image src={media.image} alt={media.alt} fill preload sizes="100vw" style={media.position ? { objectPosition: media.position } : undefined} />}
      </div>
      <div className="au-hero-shade" />
    </div>
    <HeroCopy {...copy} />
    <div className="au-hero-ghost" aria-hidden="true" inert><HeroCopy {...copy} ghost /></div>
    <span className="au-hero-scroll" aria-hidden="true"><span />Scroll</span>
    {tags ? <div className="au-ribbon"><div className="au-marquee-track">{[0, 1].map(copyIndex => <ul key={copyIndex} aria-hidden={copyIndex ? true : undefined}>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>)}</div></div> : null}
  </section>;
}
