import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import "./globals.css";

const heading = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-heading", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Wings & Wheels Travel and Tourism | Corporate, Leisure & Group Travel from Dubai",
  description: "Wings & Wheels Travel and Tourism coordinates flights, hotels, visas, transfers and on-ground support for business, leisure and group travellers from Dubai to Africa and worldwide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
