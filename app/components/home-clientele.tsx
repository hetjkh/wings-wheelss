import Image from "next/image";
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
  return (
    <section className="e-clientele" id="clientele" aria-labelledby="clientele-title">
      <div className="e-shell">
        <div className="e-section-bar">
          <span className="e-label"><span>05</span><span>Organisations we travel with</span></span>
          <span className="n-kicker">Trusted across industries</span>
        </div>
        <div className="e-clientele-heading">
          <h2 id="clientele-title" data-editorial-title>
            <span className="e-line"><span>Our Clientele</span></span>
          </h2>
          <p>We collaborate with the best in the industry to bring you exceptional travel experiences.</p>
        </div>
        <ul className="e-clientele-grid" aria-label="Client organisations">
          {clients.map(client => (
            <li key={client.src} data-editorial-reveal>
              <Image
                src={client.src}
                alt={client.name}
                width={320}
                height={180}
                sizes="(max-width: 700px) 45vw, (max-width: 1100px) 22vw, 16vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
