"use client";

import dynamic from "next/dynamic";

const SectionOverlaps = dynamic(() => import("./section-overlaps").then(module => module.SectionOverlaps), { ssr: false });
const CookieConsent = dynamic(() => import("./cookie-consent").then(module => module.CookieConsent), { ssr: false });

/** Non-critical chrome: load after hydration so it does not compete with LCP. */
export function DeferredChrome() {
  return <>
    <SectionOverlaps />
    <CookieConsent />
  </>;
}
