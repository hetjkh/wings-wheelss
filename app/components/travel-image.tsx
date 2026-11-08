"use client";

import NextImage, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import dimensions from "./image-dimensions.json";
import homePreviews from "./home-image-previews.json";

const photos: Record<string, number[]> = dimensions;
const previews: Record<string, string> = homePreviews;

type TravelImageProps = ImageProps & {
  /** Keep the given sizes; expanding hover panels must not re-resolve srcset mid-animation. */
  lockSizes?: boolean;
  /** Keep a small photo visible while a homepage entrance loads its full image. */
  reveal?: boolean;
};

/** Match the downloaded resolution to the photograph after object-fit: cover crops it. */
export default function TravelImage({ sizes, quality, lockSizes = false, reveal = false, ...props }: TravelImageProps) {
  const image = useRef<HTMLImageElement>(null);
  const [coverWidth, setCoverWidth] = useState<number>();
  const source = typeof props.src === "string" ? props.src : "";
  const photo = photos[source];
  const aspect = photo ? photo[0] / photo[1] : 0;
  const preview = reveal ? previews[source] : undefined;

  useEffect(() => {
    const element = image.current;
    if (!element || !props.fill || !aspect || lockSizes) return;

    const measure = (width: number, height: number) => {
      if (!width || !height) return;
      // A landscape photo in a tall card is scaled by its height, not its box width.
      // Leave a little headroom for the site's parallax and hover zoom effects.
      const cover = Math.ceil(Math.max(width, height * aspect) * 1.12);
      setCoverWidth(previous => previous === cover ? previous : cover);
    };

    // Use layout dimensions, not the transformed bounding box. Scroll/hover
    // transforms must not trigger larger downloads or synchronous layout reads.
    const observer = new ResizeObserver(([entry]) => {
      measure(entry.contentRect.width, entry.contentRect.height);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [source, props.fill, aspect, lockSizes]);

  return <NextImage {...props} ref={image} placeholder={props.placeholder ?? (preview ? "blur" : "empty")} blurDataURL={props.blurDataURL ?? preview} sizes={props.fill && photo && coverWidth && !lockSizes ? `${coverWidth}px` : sizes} quality={quality ?? (photo ? 90 : undefined)} />;
}
