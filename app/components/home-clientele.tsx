"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home-clientele.css";

const clients = [
  { src: "/brands/brand-1.png", name: "Médecins Sans Frontières" },
  { src: "/brands/brand-2.png", name: "Oxfam" },
  { src: "/brands/brand-3.png", name: "Nonviolent Peaceforce" },
  { src: "/brands/brand-4.png", name: "Client partner" },
  { src: "/brands/brand-5.png", name: "Ayoki Fabricon" },
  { src: "/brands/brand-6.png", name: "Danish Refugee Council" },
  { src: "/brands/brand-7.png", name: "Craft Silicon" },
  { src: "/brands/brand-8.png", name: "Glenmark" },
  { src: "/brands/brand-9.png", name: "SUN" },
  { src: "/brands/brand-10.png", name: "Dar Petroleum Operating Company" },
];

export function HomeClientele() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(section.querySelectorAll(".e-clientele-card"), {
        y: 24, opacity: 0, duration: .8, stagger: .055, ease: "power3.out",
        scrollTrigger: { trigger: ".e-clientele-wall", start: "top 85%", once: true },
      });
    }, section);
    return () => context.revert();
  }, []);

  return (
    <section className="e-clientele" id="clientele" aria-labelledby="clientele-title" ref={root}>
      <div className="e-shell">
        <div className="e-section-bar">
          <span className="e-label"><span>06</span><span>Organisations we travel with</span></span>
          <span className="n-kicker">Trusted across industries</span>
        </div>
        <div className="e-clientele-layout">
          <div className="e-clientele-heading">
            <span className="e-clientele-overline">Good company. Every journey.</span>
            <h2 id="clientele-title" data-editorial-title>
              <span className="e-line"><span>Our</span></span>
              <span className="e-line"><span>Clientele.</span></span>
            </h2>
            <p>We collaborate with the best in the industry to bring you exceptional travel experiences.</p>
            <div className="e-clientele-note"><span aria-hidden="true">↗</span><p>Different organisations.<br />The same personal attention.</p></div>
          </div>
          <div className="e-clientele-wall">
            <div className="e-clientele-wall-top"><span>A shared sense of direction</span><span>01 — 10</span></div>
            <ul className="e-clientele-grid" aria-label="Client organisations">
              {clients.map((client, index) => <li key={client.src} className="e-clientele-card">
                <span className="e-clientele-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <Image src={client.src} alt={client.name} width={320} height={180} sizes="(max-width: 700px) 36vw, (max-width: 1100px) 23vw, 16vw" />
                <span className="e-clientele-name" aria-hidden="true">{client.name}</span>
              </li>)}
            </ul>
            <div className="e-clientele-wall-bottom"><span>Across industries. Across borders.</span><span aria-hidden="true">W&amp;W</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
