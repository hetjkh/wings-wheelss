import Link from "next/link";
import { Arrow } from "./icons";
import "./home-faq.css";

const faqs = [
  { question: "Do you support both business and leisure travel?", answer: "Yes. We coordinate corporate travel, family holidays, individual journeys and group trips. The same team brings care and attention to every itinerary, whatever takes you there." },
  { question: "Can you help with group and MICE travel?", answer: "We help organise meetings, incentives, conferences and exhibitions, including flights, accommodation, transfers and coordination for travellers arriving from different locations." },
  { question: "Do you assist with visas and transfers?", answer: "Yes. We can help you understand the visa requirements for your itinerary and coordinate airport and local transfers. Visa approval and processing times are determined by the relevant authorities." },
  { question: "Which regions do you mainly cover?", answer: "We operate from Dubai, with connections across the UAE and key African markets including Sudan, South Sudan, Uganda, Kenya and Tanzania, alongside international destinations." },
  { question: "Do you coordinate complex multi-stop journeys?", answer: "Absolutely. We bring flights, hotels, transfers and the details between each stop into one coordinated plan, including journeys across multiple countries." },
  { question: "Will someone be available during travel?", answer: "Our team stays connected throughout your journey. We’ll share the relevant contact details before you leave so you know who to speak to if your plans change." },
];

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
          {faqs.map(faq => (
            <details key={faq.question} name="home-faq" data-editorial-reveal>
              <summary>
                <span>{faq.question}</span>
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
