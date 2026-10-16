import type { Metadata } from "next";
import FranchisePage from "../components/franchise-page";

export const metadata: Metadata = {
  title: "Franchise Opportunities | Wings & Wheels",
  description: "Local ambition. International opportunity. Wings & Wheels is inviting conversations with prospective franchise partners in Saudi Arabia, Egypt and Morocco.",
};

export default function Franchise() {
  return <FranchisePage />;
}
