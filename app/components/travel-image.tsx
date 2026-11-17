"use client";

import NextImage, { type ImageProps } from "next/image";

type TravelImageProps = ImageProps & {
  /** Kept for call sites that pin sizes during hover/expand animations. */
  lockSizes?: boolean;
  /** Deprecated: blur-up placeholders are off. Kept so existing call sites still type-check. */
  reveal?: boolean;
};

/** Keep phone requests honest — never ask for more than a full viewport, never 110vw+. */
function normalizeSizes(sizes?: string) {
  if (!sizes) return sizes;
  return sizes
    // Safari can pick a 1px art-direction candidate and show a blue "?" broken image.
    .replace(/,\s*1px\b/gi, "")
    .replace(/\b1px\b/gi, "100vw")
    .replace(/\b1(?:0[1-9]|1[0-9]{2})vw\b/g, "100vw")
    .replace(/\b(\d{3,})vw\b/g, "100vw");
}

/**
 * Site image wrapper: no blur-up, lazy by default, mobile-safe sizes.
 * Pass priority/preload only for the true first-screen hero.
 */
export default function TravelImage({
  sizes,
  quality,
  lockSizes: _lockSizes = false,
  reveal: _reveal = false,
  placeholder,
  blurDataURL,
  decoding,
  loading,
  priority,
  fetchPriority,
  ...props
}: TravelImageProps) {
  const eager = Boolean(priority || loading === "eager" || (props as { preload?: boolean }).preload);

  return <NextImage
    {...props}
    sizes={normalizeSizes(sizes)}
    quality={quality ?? 100}
    placeholder={placeholder ?? "empty"}
    blurDataURL={blurDataURL}
    decoding={decoding ?? "async"}
    loading={eager ? "eager" : (loading ?? "lazy")}
    priority={priority}
    fetchPriority={fetchPriority ?? (eager ? "high" : "auto")}
  />;
}
