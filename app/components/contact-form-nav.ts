/** Soft signal that the next Contact visit should open on the form. */
const KEY = "ww-contact-form";

export function markContactFormIntent() {
  try { sessionStorage.setItem(KEY, "1"); } catch { /* private mode */ }
}

export function consumeContactFormIntent() {
  try {
    if (sessionStorage.getItem(KEY) !== "1") return false;
    sessionStorage.removeItem(KEY);
    return true;
  } catch {
    return false;
  }
}

export function shouldOpenContactForm() {
  if (typeof window === "undefined") return false;
  const marked = consumeContactFormIntent();
  return window.location.hash === "#form" || marked;
}

/** Use on any in-site CTA that should open the contact form. */
export function contactFormProps() {
  return {
    href: "/contact#form" as const,
    scroll: false,
    onClick: () => { markContactFormIntent(); },
  };
}
