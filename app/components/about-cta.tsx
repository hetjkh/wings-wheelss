import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./icons";
import { EnquiryButton } from "./site-controls";

export function Cta({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link href={href} className={`au-cta${light ? " au-cta-light" : ""}`}>
    <span>{children}</span>
    <span className="au-cta-dot"><Arrow /></span>
  </Link>;
}

/** The header pill: ink or cream, a fill that sweeps in, and an arrow that turns. Opens the enquiry form unless it is a link. */
export function PillCta({ children, href, service = "General enquiry", destination, light = false }: {
  children: ReactNode;
  href?: string;
  service?: string;
  destination?: string;
  light?: boolean;
}) {
  const className = `au-cta${light ? " au-cta-light" : ""}`;
  const inner = <><span>{children}</span><span className="au-cta-dot"><Arrow /></span></>;
  if (href) return <Link href={href} className={className}>{inner}</Link>;
  return <EnquiryButton className={className} service={service} destination={destination} icon={false}>{inner}</EnquiryButton>;
}
