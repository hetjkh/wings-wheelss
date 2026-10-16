import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "./components/smooth-scroll";
import "./globals.css";

const heading = localFont({
  src: [
    { path: "../public/fonts/apris-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/apris-medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-heading", display: "swap",
});
const body = localFont({
  src: [
    { path: "../public/fonts/founders-light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/founders-regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-body", display: "swap",
});

export const metadata: Metadata = {
  title: "Wings & Wheels Travel and Tourism | Corporate, Leisure & Group Travel from Dubai",
  description: "Wings & Wheels Travel and Tourism coordinates flights, hotels, visas, transfers and on-ground support for business, leisure and group travellers from Dubai to Africa and worldwide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${heading.variable} ${body.variable}`}>
      <body><SmoothScroll />{children}</body>
    </html>
  );
}
