import type { Metadata } from "next";
import { casko, logoFonts } from "./fonts";
import { LogoTabs } from "./logo-tabs";
import "./logo.css";
import "./logo-lab.css";

export const metadata: Metadata = {
  title: "Logo | Wings & Wheels",
  robots: { index: false },
};

function Mark({ className = "" }: { className?: string }) {
  return <span className={`lg-mark ${className}`}>W<span className="lg-amp">&amp;</span>W</span>;
}

export default function LogoPage() {
  const brand = <>
    <section className="lg-hero" aria-label="Primary logo">
      <span className="lg-label">Wings &amp; Wheels · Logo</span>
      <Mark className="lg-mark-hero" />
      <span className="lg-word">Wings &amp; Wheels</span>
      <span className="lg-tag">Travel &amp; Tourism · Dubai</span>
    </section>

    <section className="lg-grid" aria-label="Logo versions">
      <figure className="lg-tile lg-tile-ink">
        <Mark />
        <figcaption>Reversed · Ink</figcaption>
      </figure>
      <figure className="lg-tile lg-tile-terra">
        <Mark />
        <figcaption>Reversed · Terracotta</figcaption>
      </figure>
      <figure className="lg-tile lg-tile-sand">
        <div className="lg-seal">
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <path id="lg-ring" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" fill="none" />
            <text><textPath href="#lg-ring" textLength="486" lengthAdjust="spacing">WINGS &amp; WHEELS · TRAVEL &amp; TOURISM · DUBAI ·</textPath></text>
          </svg>
          <Mark />
        </div>
        <figcaption>Seal</figcaption>
      </figure>
      <figure className="lg-tile lg-tile-paper">
        <div className="lg-lockup">
          <Mark />
          <span className="lg-lockup-rule" />
          <span className="lg-lockup-word"><b>Wings &amp; Wheels</b><small>Travel &amp; Tourism</small></span>
        </div>
        <figcaption>Horizontal lockup</figcaption>
      </figure>
    </section>

    <section className="lg-sizes" aria-label="Logo at small sizes">
      <span className="lg-label">Small sizes</span>
      <div>
        {[96, 64, 40, 24].map(size => <span key={size} className="lg-app" style={{ "--s": `${size}px` } as React.CSSProperties}><Mark /></span>)}
      </div>
    </section>
  </>;

  return <main className={`lg-page ${casko.variable}`}>
    <LogoTabs brand={brand} fonts={logoFonts} />
  </main>;
}
