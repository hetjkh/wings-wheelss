"use client";

import NextImage, { type ImageProps } from "next/image";

type TravelImageProps = ImageProps & {
  /** Kept for call sites that pin sizes during hover/expand animations. */
  lockSizes?: boolean;
  /** Deprecated: blur-up placeholders are off. Kept so existing call sites still type-check. */
  reveal?: boolean;
};

/**
 * Site image wrapper: no blur-up, one request, quality preserved.
 * Phone downloads stay capped by next.config deviceSizes (max 1920).
 */
export default function TravelImage({
  sizes,
  quality,
  lockSizes: _lockSizes = false,
  reveal: _reveal = false,
  placeholder,
  blurDataURL,
  decoding,
  ...props
}: TravelImageProps) {
  return <NextImage
    {...props}
    sizes={sizes}
    quality={quality ?? 75}
    placeholder={placeholder ?? "empty"}
    blurDataURL={blurDataURL}
    decoding={decoding ?? "async"}
  />;
}
