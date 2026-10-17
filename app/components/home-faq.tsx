import { faqs } from "./faqs";
import Link from "next/link";
import { Arrow } from "./icons";
import "./home-faq.css";


export function HomeFaq() {
  return (
    <section className="e-faq" id="faqs" aria-labelledby="home-faq-title">
      <div className="e-shell e-faq-grid">
        <div className="e-faq-intro">
          <span className="e-label"><span>09</span><span>Good to know</span></span>
          <h2 id="home-faq-title" data-editorial-title>
            <span className="e-line"><span>FAQs</span></span>
          </h2>
          <p data-editorial-reveal>A few things you might be wondering before you travel with us.</p>
          <Link href="/contact" className="e-link" data-editorial-reveal>Let’s talk<Arrow /></Link>
        </div>

        <div className="e-faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} name="home-faq" data-editorial-reveal>
              <summary>
                <span>{String(index + 1).padStart(2, "0")} — {faq.question}</span>
                <span className="e-faq-mark" aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
