import type { Metadata } from "next";
import AfricaPage from "../components/africa-page";

export const metadata: Metadata = {
  title: "Africa | Wings & Wheels",
  description: "Business travel, safaris, holidays and group journeys between the UAE, Africa and beyond, coordinated by Wings & Wheels with on-ground support across key African markets.",
};

export default function Africa() {
  return <AfricaPage />;
}
