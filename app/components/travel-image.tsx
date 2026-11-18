"use client";

import NextImage, { type ImageProps } from "next/image";

type TravelImageProps = ImageProps & {
  /** Kept for call sites that pin sizes during hover/expand animations. */
  lockSizes?: boolean;
  /** Deprecated: blur-up placeholders are off. Kept so existing call sites still type-check. */
  reveal?: boolean;
};

/** Keep broken 1px candidates out. Allow up to 280vw so tall mobile panels can request a retina file. */
function normalizeSizes(sizes?: string) {
  if (!sizes) return sizes;
  return sizes
    .replace(/,\s*1px\b/gi, "")
    .replace(/\b1px\b/gi, "100vw")
    .replace(/\b(\d{3,})vw\b/g, (match, width: string) => Number(width) > 280 ? "100vw" : match);
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
