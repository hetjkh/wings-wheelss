import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./icons";
import { EnquiryButton } from "./site-controls";
import { ContactFormLink } from "./contact-form-link";

export function Cta({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  const className = `au-cta${light ? " au-cta-light" : ""}`;
  const inner = <><span>{children}</span><span className="au-cta-dot"><Arrow /></span></>;
  if (href === "/contact#form") return <ContactFormLink className={className}>{inner}</ContactFormLink>;
  return <Link href={href} className={className}>{inner}</Link>;
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
  if (href === "/contact#form") return <ContactFormLink className={className}>{inner}</ContactFormLink>;
  if (href) return <Link href={href} className={className}>{inner}</Link>;
  return <EnquiryButton className={className} service={service} destination={destination} icon={false}>{inner}</EnquiryButton>;
}
