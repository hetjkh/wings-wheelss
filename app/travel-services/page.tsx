import type { Metadata } from "next";
import ServicesPage from "../components/services-page";

export const metadata: Metadata = {
  title: "Travel Services | Wings & Wheels",
  description: "Flights, hotels, visas, transfers, holidays and travel support, coordinated by Wings & Wheels around one journey, from Dubai to Africa and worldwide.",
};

export default function TravelServices() {
  return <ServicesPage />;
}
