"use client";

import { useEffect, useState } from "react";
import { SiteNavigation } from "./site-navigation";
import { observeScrollThreshold } from "./observe-scroll-threshold";

export type JourneyLink = { label: string; href: string };

/** Compact floating nav as soon as the page starts to move. */
export function JourneyHeader({ introId = "about" }: { introId?: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // scrollY only — getBoundingClientRect on every frame was janking mobile scroll.
    return observeScrollThreshold(() => window.scrollY > 24, setScrolled);
  }, [introId]);
  return <SiteNavigation scrolled={scrolled} enquiry />;
}
