"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import "./home-clientele.css";

const clients = [
  "Médecins Sans Frontières", "Oxfam", "Nonviolent Peaceforce", "SPOC", "Ayoki Fabricon",
  "Danish Refugee Council", "Craft Silicon", "Glenmark", "SUN", "Dar Petroleum Operating Company",
].map((name, index) => ({ name, src: `/brands/clientele/brand-${index + 1}.svg` }));

export function HomeClientele() {
  const [paused, setPaused] = useState(false);

  return <section className="e-clientele" id="clientele" aria-labelledby="clientele-title">
    <div className="e-shell">
      <div className="e-section-bar">
        <span className="e-label"><span>06</span><span>Organisations we travel with</span></span>
        <span className="n-kicker">Trusted across industries</span>
      </div>
      <div className="e-clientele-heading">
        <h2 id="clientele-title">Our <em>Clientele.</em></h2>
        <span className="n-kicker">Good company. Every journey.</span>
      </div>
      <div className="e-clientele-stage">
        <div className="e-clientele-story">
          <Image src="/images/library/clientele-global-connections-v1.webp" alt="A golden globe suspended above sculpted dunes, encircled by a glowing travel route" fill sizes="(max-width: 700px) 100vw, 55vw" />
          <div className="e-clientele-story-copy">
            <span className="n-kicker">A shared sense of direction</span>
            <h3>Your people.<br /><em>Our priority.</em></h3>
            <p>Different organisations. Different destinations. The same personal attention, wherever work takes you.</p>
            <Link href="/contact">Let’s talk travel <span><Arrow diagonal /></span></Link>
          </div>
        </div>
        <div className="e-clientele-logos">
          <div className="e-clientele-controls"><span>Across industries. Across borders.</span><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} aria-label={paused ? "Resume logo animation" : "Pause logo animation"}>{paused ? "Play ↗" : "Pause Ⅱ"}</button></div>
          <div className="e-clientele-streams" data-paused={paused}>
            {[clients.slice(0, 5), clients.slice(5)].map((column, index) =>
              <div className="e-clientele-window" key={index}>
                <div className="e-clientele-track">
                  {[false, true].map(duplicate => <ul key={String(duplicate)} aria-hidden={duplicate} aria-label={duplicate ? undefined : "Client organisations"}>
                    {column.map(client => <li className="e-clientele-card" key={client.src}>
                      <div className="e-clientele-logo"><Image src={client.src} alt={duplicate ? "" : client.name} fill sizes="(max-width: 700px) 110px, 160px" /></div>
                      <span aria-hidden="true">{client.name}</span>
                    </li>)}
                  </ul>)}
                </div>
              </div>
            )}
          </div>
          <div className="e-clientele-footnote"><span>10 organisations</span><span>One shared journey ↗</span></div>
        </div>
      </div>
    </div>
  </section>;
}
