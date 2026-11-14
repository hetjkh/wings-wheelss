import type { Metadata } from "next";
import { LegalPage } from "../components/legal-page";
import { office } from "../components/data";

export const metadata: Metadata = {
  title: "Privacy Policy | Wings & Wheels",
  description: "How Wings & Wheels Travel and Tourism collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return <LegalPage
    title="Privacy Policy"
    updated="14 November 2026"
    intro="This policy explains what personal information we collect, why we use it, and the choices you have when you visit our website or travel with Wings & Wheels."
    sections={[
      {
        heading: "1. Who controls your data",
        body: [
          `${office.company} is responsible for personal information collected through this website and our booking services.`,
          `You can reach us at ${office.email} or ${office.phones[0].label}. Our office is at ${office.address.join(", ")}.`,
        ],
      },
      {
        heading: "2. Information we collect",
        body: [
          "We may collect your name, email, phone number, travel preferences, passport or visa details needed for bookings, payment-related information processed by trusted providers, and messages you send us.",
          "When you browse our site we may collect technical data such as device type, browser, pages visited and approximate location, including through cookies if you accept them.",
        ],
      },
      {
        heading: "3. How we use your information",
        body: [
          "We use your information to respond to enquiries, arrange travel, communicate itinerary updates, improve our website, and meet legal or regulatory requirements.",
          "We do not sell your personal information. We may share it with airlines, hotels, visa partners, payment providers and other suppliers only as needed to deliver your journey.",
        ],
      },
      {
        heading: "4. Cookies",
        body: [
          "We use essential cookies to run the site securely. With your consent, we may also use analytics or preference cookies to understand how the site is used and remember choices such as cookie settings.",
          "You can accept or reject non-essential cookies through the cookie sheet on this website, and you can change your browser settings at any time.",
        ],
      },
      {
        heading: "5. How long we keep data",
        body: [
          "We keep personal information only as long as needed for bookings, customer support, accounting and legal obligations, then delete or anonymise it where practical.",
        ],
      },
      {
        heading: "6. Your choices",
        body: [
          "You may ask us to access, correct or delete personal information we hold about you, or withdraw cookie consent for non-essential cookies, subject to legal requirements for booking records.",
          `To make a request, email ${office.email} with enough detail for us to identify your enquiry.`,
        ],
      },
      {
        heading: "7. Security and updates",
        body: [
          "We take reasonable technical and organisational steps to protect personal information. No method of transmission over the internet is completely secure.",
          "We may update this policy from time to time. The “Last updated” date at the top of this page will change when we do.",
        ],
      },
    ]}
  />;
}
