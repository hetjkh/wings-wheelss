"use client";

import { useState, type CSSProperties } from "react";
import Image from "./travel-image";

type DayStop = { time: string; label: string; photo: string };

function DayPhoto({ stop, index }: { stop: DayStop; index: number }) {
  const [ready, setReady] = useState(false);

  return <li style={{ "--i": index } as CSSProperties} data-image-ready={ready}>
    <Image
      src={stop.photo}
      alt=""
      fill
      sizes="(max-width: 800px) 92vw, 100vw"
      loading="eager"
      onLoad={async event => {
        const image = event.currentTarget;
        try {
          await image.decode();
          setReady(true);
        } catch {
          // Keep the preceding photograph visible if this image cannot decode.
        }
      }}
    />
    <span className="k-day-caption"><b>{stop.time}</b>{stop.label}</span>
  </li>;
}

export function CorporateDayPhotos({ stops }: { stops: DayStop[] }) {
  return <ol className="j-shell k-day-photos">
    {stops.map((stop, index) => <DayPhoto key={stop.time} stop={stop} index={index} />)}
  </ol>;
}
