import Link from "next/link";
import Image from "./travel-image";
import { TravelIcon, type IconKind } from "./icons";

export type Audience = {
  title: string;
  text: string;
  href: string;
  image: string;
  alt: string;
  icon: IconKind;
};

export function AboutAudiences({ items }: { items: Audience[] }) {
  return <div className="au-aud">
    <ul className="au-aud-grid" aria-label="How people travel with us">
      {items.map((item, index) => <li key={item.title}>
        <Link href={item.href} className="au-aud-col" data-cursor="Explore">
          <span className="au-aud-media" aria-hidden="true">
            <Image src={item.image} alt="" fill sizes="(max-width: 900px) 55vw, 32vw" />
          </span>
          <span className="au-aud-copy">
            <span className="au-aud-icon"><TravelIcon kind={item.icon} size={34} /></span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </span>
          <span className="au-aud-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </Link>
      </li>)}
    </ul>
  </div>;
}
