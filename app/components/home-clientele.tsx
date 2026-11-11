import Image from "next/image";
import Link from "next/link";
import TravelImage from "./travel-image";
import { Arrow } from "./icons";
import "./home-clientele.css";

const clients = [
  { name: "Médecins Sans Frontières", sector: "Humanitarian" },
  { name: "Oxfam", sector: "Humanitarian" },
  { name: "Nonviolent Peaceforce", sector: "Peacebuilding" },
  { name: "SPOC", sector: "Corporate" },
  { name: "Ayoki Fabricon", sector: "Industry" },
  { name: "Danish Refugee Council", sector: "Humanitarian" },
  { name: "Craft Silicon", sector: "Technology" },
  { name: "Glenmark", sector: "Healthcare" },
  { name: "SUN", sector: "Energy" },
  { name: "Dar Petroleum Operating Company", sector: "Energy" },
].map((client, index) => ({ ...client, src: `/brands/clientele/brand-${index + 1}.svg` }));

const sectors = ["Humanitarian", "Healthcare", "Technology", "Energy", "Industry", "Corporate"];

export function HomeClientele() {
  return <section className="e-clientele" id="clientele" aria-labelledby="clientele-title">
    <div className="e-clientele-tear" aria-hidden="true">
      <span className="e-clientele-tear-layer e-clientele-tear-under" />
      <span className="e-clientele-tear-layer e-clientele-tear-fibre" />
      <span className="e-clientele-tear-layer e-clientele-tear-face" />
    </div>
    <div className="e-shell">
      <div className="e-section-bar" data-motion-reveal>
        <span className="e-label"><span>06</span><span>Organisations we travel with</span></span>
        <span className="n-kicker">Trusted across industries</span>
      </div>

      <header className="e-clientele-heading">
        <div>
          <span className="e-clientele-eyebrow" data-motion-reveal>Good company. Every journey.</span>
          <h2 id="clientele-title" data-motion-text>Our <em>Clientele.</em></h2>
        </div>
        <div className="e-clientele-lead" data-editorial-reveal>
          <p>Different organisations. Different destinations. The same personal attention, wherever work takes you.</p>
          <ul className="e-clientele-sectors" aria-label="Industries we support">
            {sectors.map(sector => <li key={sector}>{sector}</li>)}
          </ul>
        </div>
      </header>

      <div className="e-clientele-stage">
        <figure className="e-clientele-visual" data-motion-image>
          <TravelImage
            reveal
            src="/images/library/clientele-global-connections-v1.webp"
            alt="A brass globe resting above dark sand, suggesting routes across the world"
            fill
            sizes="(max-width: 900px) 92vw, 34vw"
            className="n-cover"
          />
          <figcaption data-motion-reveal>
            <span>From Dubai</span>
            <strong>To the organisations that move the world.</strong>
          </figcaption>
        </figure>

        <div className="e-clientele-gallery">
          <div className="e-clientele-gallery-head" data-motion-reveal>
            <div>
              <span>Selected organisations</span>
              <strong>Across industries. Across borders.</strong>
            </div>
            <p className="e-clientele-count" aria-label="Client count">
              <span>Portfolio</span>
              <strong>{String(clients.length).padStart(2, "0")}</strong>
            </p>
          </div>

          <ul className="e-clientele-logos" aria-label="Our client organisations" data-motion-stagger>
            {clients.map((client, index) => <li className="e-clientele-client" key={client.src} data-sector={client.sector}>
              <span className="e-clientele-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span className="e-clientele-sector">{client.sector}</span>
              <div className="e-clientele-logo">
                <Image src={client.src} alt={client.name} fill sizes="(max-width: 600px) 42vw, (max-width: 1000px) 29vw, 14vw" />
              </div>
              <span className="e-clientele-name">{client.name}</span>
            </li>)}
          </ul>

          <div className="e-clientele-foot" data-motion-stagger>
            <p>Your people. <em>Our priority.</em></p>
            <Link href="/contact" className="n-panel-cta n-panel-cta-dark e-clientele-contact">
              <span>Let’s talk travel</span>
              <span className="n-panel-cta-dot"><Arrow /></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
