import type { Metadata } from "next";
import { ContactPage } from "../components/contact-page";

export const metadata: Metadata = {
  title: "Contact us | Wings & Wheels",
  description: "Talk to the Wings & Wheels travel team about leisure, corporate and group journeys from the UAE.",
};

export default function Contact() {
  return <ContactPage />;
}
