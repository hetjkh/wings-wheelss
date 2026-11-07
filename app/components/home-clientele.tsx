import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import "./home-clientele.css";

const clients = [
  "Médecins Sans Frontières", "Oxfam", "Nonviolent Peaceforce", "SPOC", "Ayoki Fabricon",
  "Danish Refugee Council", "Craft Silicon", "Glenmark", "SUN", "Dar Petroleum Operating Company",
].map((name, index) => ({ name, src: `/brands/clientele/brand-${index + 1}.svg` }));

export function HomeClientele() {
  return <section className="e-clientele" id="clientele" aria-labelledby="clientele-title">
    <div className="e-clientele-tear" aria-hidden="true">
      <span className="e-clientele-tear-layer e-clientele-tear-under" />
      <span className="e-clientele-tear-layer e-clientele-tear-fibre" />
      <span className="e-clientele-tear-layer e-clientele-tear-face" />
    </div>
    <div className="e-shell">
      <div className="e-section-bar">
        <span className="e-label"><span>06</span><span>Organisations we travel with</span></span>
        <span className="n-kicker">Trusted across industries</span>
      </div>

      <header className="e-clientele-heading">
        <div>
          <span className="e-clientele-eyebrow">Good company. Every journey.</span>
          <h2 id="clientele-title" data-motion-text>Our <em>Clientele.</em></h2>
        </div>
        <p data-editorial-reveal>Different organisations. Different destinations. The same personal attention, wherever work takes you.</p>
      </header>

      <div className="e-clientele-board">
        <div className="e-clientele-board-head">
          <div>
            <span>Selected organisations</span>
            <strong>Across industries. Across borders.</strong>
          </div>
          <div className="e-clientele-board-meta" aria-label="Client count">
            <span>Portfolio</span>
            <strong>10 organisations</strong>
          </div>
        </div>

        <ul className="e-clientele-logos" aria-label="Our client organisations" data-motion-stagger>
          {clients.map((client, index) => <li className="e-clientele-client" key={client.src}>
            <span className="e-clientele-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className="e-clientele-logo">
              <Image src={client.src} alt={client.name} fill sizes="(max-width: 600px) 42vw, (max-width: 1000px) 29vw, 17vw" />
            </div>
            <span className="e-clientele-name" aria-hidden="true">{client.name}</span>
          </li>)}
        </ul>

        <div className="e-clientele-board-foot">
          <p>Your people. <em>Our priority.</em></p>
          <Link href="/contact" className="e-clientele-contact">Let’s talk travel <span><Arrow diagonal /></span></Link>
        </div>
      </div>
    </div>
  </section>;
}
