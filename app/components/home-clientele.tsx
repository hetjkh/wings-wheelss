"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, TravelIcon } from "./icons";
import "./home-clientele.css";

const clients = [
  { src: "/brands/clientele/brand-1.svg", name: "Médecins Sans Frontières" },
  { src: "/brands/clientele/brand-2.svg", name: "Oxfam" },
  { src: "/brands/clientele/brand-3.svg", name: "Nonviolent Peaceforce" },
  { src: "/brands/clientele/brand-4.svg", name: "SPOC" },
  { src: "/brands/clientele/brand-5.svg", name: "Ayoki Fabricon" },
  { src: "/brands/clientele/brand-6.svg", name: "Danish Refugee Council" },
  { src: "/brands/clientele/brand-7.svg", name: "Craft Silicon" },
  { src: "/brands/clientele/brand-8.svg", name: "Glenmark" },
  { src: "/brands/clientele/brand-9.svg", name: "SUN" },
  { src: "/brands/clientele/brand-10.svg", name: "Dar Petroleum Operating Company" },
];

function ClientCard({ client, index, decorative = false }: { client: (typeof clients)[number]; index: number; decorative?: boolean }) {
  return <li className="e-clientele-card">
    <span className="e-clientele-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
    <div className="e-clientele-logo"><Image src={client.src} alt={decorative ? "" : client.name} fill sizes="(max-width: 760px) 142px, (max-width: 1100px) 31vw, 18vw" /></div>
    <span className="e-clientele-name" aria-hidden="true">{client.name}</span>
  </li>;
}

export function HomeClientele() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const grid = section.querySelector<HTMLElement>(".e-clientele-grid");
      if (!grid || getComputedStyle(grid).display === "none") return;
      gsap.from(grid.querySelectorAll(".e-clientele-card"), {
        y: 26, opacity: 0, duration: .75, stagger: .05, ease: "power3.out", clearProps: "opacity,transform",
        scrollTrigger: { trigger: grid, start: "top 88%", once: true },
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
            <div className="e-clientele-title">
              <span className="e-clientele-overline">Good company. Every journey.</span>
              <h2 id="clientele-title" data-editorial-title>
                <span className="e-line"><span>Our</span></span>{" "}
                <span className="e-line"><span>Clientele.</span></span>
              </h2>
            </div>
            <div className="e-clientele-intro">
              <p>We collaborate with the best in the industry to bring you exceptional travel experiences.</p>
              <div className="e-clientele-note"><TravelIcon kind="route" size={24} /><p>Different organisations.<br /><span>The same personal attention.</span></p></div>
            </div>
          </div>
          <div className="e-clientele-wall">
            <div className="e-clientele-wall-top"><span><TravelIcon kind="globe" size={17} /> A shared sense of direction</span><span><b>{String(clients.length).padStart(2, "0")}</b> organisations. One shared journey.</span></div>
            <ul className="e-clientele-grid" aria-label="Client organisations">
              {clients.map((client, index) => <ClientCard key={client.src} client={client} index={index} />)}
            </ul>
            <div className="e-clientele-marquee" role="group" aria-label="Client organisations">
              {[clients.slice(0, 5), clients.slice(5)].map((row, rowIndex) => <div className="e-clientele-marquee-row" key={rowIndex}>
                <div className="e-clientele-marquee-track">
                  {[false, true].map(decorative => <ul key={String(decorative)} aria-hidden={decorative}>
                    {row.map((client, index) => <ClientCard key={client.src} client={client} index={rowIndex * 5 + index} decorative={decorative} />)}
                  </ul>)}
                </div>
              </div>)}
            </div>
            <div className="e-clientele-wall-bottom"><p>Across industries.<br /><span>Across borders.</span></p><Link href="/contact">Let’s talk travel <span><Arrow diagonal /></span></Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
