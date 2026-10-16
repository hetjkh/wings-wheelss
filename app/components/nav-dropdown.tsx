import Link from "next/link";
import type { SiteLink } from "./data";

/** A top-level link whose pages open beneath it on hover or keyboard focus. */
export function NavDropdown({ link, current }: { link: SiteLink; current?: string }) {
  const active = link.children?.some(child => child.href === current);
  return <div className="nav-drop">
    <Link href={link.href} aria-current={active ? "page" : undefined} aria-haspopup="true">
      {link.label}
      <svg className="nav-drop-caret" viewBox="0 0 10 6" aria-hidden="true"><path d="m1 1 4 4 4-4" /></svg>
    </Link>
    <div className="nav-drop-menu">
      <div className="nav-drop-panel">
        {link.children?.map((child, i) => <Link key={child.href} href={child.href} aria-current={child.href === current ? "page" : undefined}>
          <span className="nav-drop-number">0{i + 1}</span>
          <strong>{child.label}</strong>
          <span className="nav-drop-note">{child.note}</span>
        </Link>)}
      </div>
    </div>
  </div>;
}
