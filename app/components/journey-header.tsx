"use client";

import { useEffect, useState } from "react";
import { SiteNavigation } from "./site-navigation";
import { observeScrollThreshold } from "./observe-scroll-threshold";

export type JourneyLink = { label: string; href: string };

/** The header settles into its compact state as the intro reaches the top. */
export function JourneyHeader({ introId = "about" }: { introId?: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const intro = document.getElementById(introId);
    return observeScrollThreshold(
      () => intro ? intro.getBoundingClientRect().top <= 88 : window.scrollY > 48,
      setScrolled,
    );
  }, [introId]);
  return <SiteNavigation scrolled={scrolled} enquiry />;
}
