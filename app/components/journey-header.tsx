"use client";

import { useEffect, useState } from "react";
import { SiteNavigation } from "./site-navigation";
import { observeScrollThreshold } from "./observe-scroll-threshold";

export type JourneyLink = { label: string; href: string };

/** Compact floating nav as soon as the page starts to move. */
export function JourneyHeader({ introId = "about" }: { introId?: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const intro = document.getElementById(introId);
    return observeScrollThreshold(
      () => window.scrollY > 24 || (intro ? intro.getBoundingClientRect().top <= 96 : false),
      setScrolled,
    );
  }, [introId]);
  return <SiteNavigation scrolled={scrolled} enquiry />;
}
