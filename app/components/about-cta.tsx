import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./icons";

export function Cta({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link href={href} className={`au-cta${light ? " au-cta-light" : ""}`}>
    <span>{children}</span>
    <span className="au-cta-dot"><Arrow /></span>
  </Link>;
}
