"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./cookie-consent.css";

const STORAGE_KEY = "ww-cookie-consent";

/** Bottom sheet for accepting or rejecting non-essential cookies. */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    setOpen(false);
  };

  if (!open) return null;

  return <div className="ck" role="dialog" aria-modal="false" aria-labelledby="ck-title" aria-describedby="ck-copy">
    <div className="ck-sheet">
      <div className="ck-copy">
        <p className="ck-kicker">Cookies</p>
        <h2 id="ck-title">We use cookies to keep journeys smooth</h2>
        <p id="ck-copy">
          Essential cookies keep the site working. With your OK, we may also use cookies to improve the experience.
          Read our <Link href="/privacy">Privacy Policy</Link> for details.
        </p>
      </div>
      <div className="ck-actions">
        <button type="button" className="ck-accept" onClick={() => choose("accepted")}>Accept cookies</button>
        <button type="button" className="ck-reject" onClick={() => choose("rejected")}>Reject</button>
      </div>
    </div>
  </div>;
}
