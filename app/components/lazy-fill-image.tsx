"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "./travel-image";

/** Mount a fill image only when it nears the viewport — keeps below-fold services photos off the first paint. */
export function LazyFillImage({
  src,
  alt,
  sizes,
  className,
  style,
  rootMargin = "18% 0px",
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  rootMargin?: string;
}) {
  const slot = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = slot.current;
    if (!el || show) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      setShow(true);
      observer.disconnect();
    }, { rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, show]);

  return <>
    <span ref={slot} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
    {show ? <Image className={className} src={src} alt={alt} fill sizes={sizes} style={style} /> : null}
  </>;
}
