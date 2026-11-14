import type { Metadata } from "next";
import { LegalPage } from "../components/legal-page";
import { office } from "../components/data";

export const metadata: Metadata = {
  title: "Terms & Conditions | Wings & Wheels",
  description: "Terms governing the use of Wings & Wheels Travel and Tourism services and website.",
};

export default function TermsPage() {
  return <LegalPage
    title="Terms & Conditions"
    updated="14 November 2026"
    intro="These terms explain how you may use the Wings & Wheels website and travel services. By booking with us or using this site, you agree to them."
    sections={[
      {
        heading: "1. Who we are",
        body: [
          `${office.company} (“Wings & Wheels”, “we”, “us”) provides travel and tourism services from our office in Dubai, UAE, including flights, hotels, visas, transfers, leisure holidays, corporate travel and group arrangements.`,
          `Our contact details are ${office.email} and ${office.phones.map(phone => phone.label).join(" / ")}.`,
        ],
      },
      {
        heading: "2. Using this website",
        body: [
          "This website is for general information and enquiry purposes. Content may change without notice. You agree not to misuse the site, attempt unauthorised access, or use it for unlawful purposes.",
          "All trademarks, text, imagery and design on this site belong to Wings & Wheels or our partners and may not be copied without permission.",
        ],
      },
      {
        heading: "3. Bookings and quotes",
        body: [
          "Quotes and availability are subject to confirmation by airlines, hotels and other suppliers. A booking is confirmed only when we issue written confirmation and any required deposit or payment has been received.",
          "Prices may change until payment is completed. Taxes, surcharges, visa fees and supplier conditions may apply in addition to advertised fares.",
        ],
      },
      {
        heading: "4. Your responsibilities",
        body: [
          "You are responsible for providing accurate traveller details, holding valid passports and visas, meeting entry requirements for each destination, and reviewing supplier terms before travel.",
          "Please check names, dates and itineraries carefully on confirmation. Fees may apply for corrections after tickets or vouchers are issued.",
        ],
      },
      {
        heading: "5. Changes, cancellations and refunds",
        body: [
          "Changes and cancellations depend on the rules of the airline, hotel or other supplier used for your booking. Some fares and rates are non-refundable or restricted.",
          "We will explain applicable conditions and assist with available options. Any refunds are processed according to supplier timelines and methods.",
        ],
      },
      {
        heading: "6. Limitation of liability",
        body: [
          "We arrange travel services with care, but we are not liable for delays, cancellations, overbooking, force majeure, political events, weather, or failures of third-party suppliers beyond our reasonable control.",
          "Nothing in these terms limits liability that cannot be excluded under applicable UAE law.",
        ],
      },
      {
        heading: "7. Governing law",
        body: [
          "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. Disputes are subject to the courts of Dubai, unless mandatory consumer protections require otherwise.",
        ],
      },
    ]}
  />;
}
