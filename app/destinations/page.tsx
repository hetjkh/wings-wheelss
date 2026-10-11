import type { Metadata } from "next";
import DestinationsPage from "../components/destinations-page";

export const metadata: Metadata = {
  title: "Destinations | Wings & Wheels",
  description: "From cities built for business to islands made for switching off, discover destinations across the Middle East, Africa and beyond with Wings & Wheels.",
};

export default function Destinations() {
  return <DestinationsPage />;
}
