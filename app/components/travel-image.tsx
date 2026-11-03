"use client";

import NextImage, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import dimensions from "./image-dimensions.json";

const photos: Record<string, number[]> = dimensions;

/** Match the downloaded resolution to the photograph after object-fit: cover crops it. */
export default function TravelImage({ sizes, quality, ...props }: ImageProps) {
  const image = useRef<HTMLImageElement>(null);
  const [coverWidth, setCoverWidth] = useState<number>();
  const source = typeof props.src === "string" ? props.src : "";
  const photo = photos[source];
  const aspect = photo ? photo[0] / photo[1] : 0;

  useEffect(() => {
    const element = image.current;
    if (!element || !props.fill || !aspect) return;

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
  }, [source, props.fill, aspect]);

  return <NextImage {...props} ref={image} sizes={props.fill && photo && coverWidth ? `${coverWidth}px` : sizes} quality={quality ?? (photo ? 90 : undefined)} />;
}
