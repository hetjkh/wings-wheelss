import type { Metadata } from "next";
import PartnershipPage from "../components/partnership-page";

export const metadata: Metadata = {
  title: "Corporate Partnerships | Wings & Wheels",
  description: "Not just corporate travel. A corporate travel partnership: preferred rates, partner benefits and a dedicated account manager, arranged around how your company travels.",
};

export default function CorporatePartnerships() {
  return <PartnershipPage />;
}
