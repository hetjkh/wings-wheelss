import { Footer } from "./footer";
import { About, ContactBand, Guides, Hero, Network, Process, Services, Split, Team } from "./home-sections";
import { SiteChrome } from "./site-controls";

export default function HomePage() {
  return <SiteChrome>
    <a className="skip-link" href="#about">Skip to content</a>
    <main>
      <Hero />
      <About />
      <Services />
      <Process />
      <Network />
      <Guides />
      <Split />
      <Team />
      <ContactBand />
    </main>
    <Footer />
  </SiteChrome>;
}
