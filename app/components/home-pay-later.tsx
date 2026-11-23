import Image from "next/image";
import { Arrow } from "./icons";
import { ContactFormLink } from "./contact-form-link";
import tabby from "../../public/images/Tabby.webp";
import tamara from "../../public/images/Tamara-En.webp";
import ziina from "../../public/brands/ZIINA Geometric Logo on Purple Aura.png";
import "./home-pay-later.css";

const steps = [
  { title: "Book today", text: "Reserve your domestic or international flight tickets instantly." },
  { title: "Pay in 4", text: "Split the total into four simple, interest-free payments." },
  { title: "Travel worry-free", text: "Quick approval, secure checkout, and full transparency." },
];

export function HomePayLater() {
  return (
    <section className="e-pay-later" id="pay-later" aria-labelledby="pay-later-title">
      <div className="e-shell">
        <div className="e-section-bar" data-motion-reveal>
          <span className="e-label"><span>07</span><span>A little more freedom to fly</span></span>
          <span className="n-kicker">Your journey. Your pace.</span>
        </div>
        <div className="e-pay-heading">
          <h2 id="pay-later-title" data-editorial-title>
            <span className="e-line"><span>Pay later.</span></span>
            <span className="e-line"><span>Fly sooner.</span></span>
          </h2>
          <p data-editorial-reveal>Book your flight tickets today and spread the cost over easy, interest-free installments with Tabby, Tamara and Ziina. No waiting—secure your seat now and pay at your own pace.</p>
        </div>
        <div className="e-pay-providers" aria-label="Payment options">
          <div className="e-pay-provider" data-editorial-reveal>
            <Image src={tabby} alt="Tabby" sizes="(max-width: 700px) 40vw, 28vw" className="e-pay-tabby" />
          </div>
          <div className="e-pay-provider" data-editorial-reveal>
            <Image src={tamara} alt="Tamara" sizes="(max-width: 700px) 40vw, 28vw" className="e-pay-tamara" />
          </div>
          <div className="e-pay-provider e-pay-provider-ziina" data-editorial-reveal>
            <Image src={ziina} alt="Ziina" sizes="(max-width: 700px) 40vw, 28vw" className="e-pay-ziina" />
          </div>
        </div>
        <ol className="e-pay-steps">
          {steps.map((step, index) => (
            <li key={step.title} data-editorial-reveal>
              <span className="e-pay-step-number" aria-hidden="true">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="e-pay-action" data-motion-stagger>
          <ContactFormLink className="n-panel-cta n-panel-cta-dark" data-cursor="Let's plan"><span>Book your tickets</span><span className="n-panel-cta-dot"><Arrow /></span></ContactFormLink>
          <p>Ask us about paying with Tabby, Tamara or Ziina when you book.</p>
        </div>
      </div>
    </section>
  );
}
