"use client";

import dynamic from "next/dynamic";

const SectionOverlaps = dynamic(() => import("./section-overlaps").then(module => module.SectionOverlaps), { ssr: false });
const SiteCursor = dynamic(() => import("./site-cursor").then(module => module.SiteCursor), { ssr: false });
const SocialOffer = dynamic(() => import("./social-offer").then(module => module.SocialOffer), { ssr: false });

/** Non-critical chrome: load after hydration so it does not compete with LCP. */
export function DeferredChrome() {
  return <>
    <SectionOverlaps />
    <SiteCursor />
    <SocialOffer />
  </>;
}
