import type { Metadata } from "next";
import CorporatePage from "../components/corporate-page";

export const metadata: Metadata = {
  title: "Corporate Travel | Wings & Wheels",
  description: "From a single executive journey to ongoing company travel, Wings & Wheels manages flights, hotels, visas, transfers and support from Dubai.",
};

export default function CorporateTravel() {
  return <CorporatePage />;
}
