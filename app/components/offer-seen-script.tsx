"use client";

import { OFFER_SEEN_KEY } from "./social-offer";

/**
 * Emits the pre-hydration offer flag only in the server HTML.
 * Returning null on the client avoids the React 19 / Next 16
 * "Encountered a script tag while rendering React component" warning.
 */
export function OfferSeenScript() {
  if (typeof window !== "undefined") return null;
  return (
    <script
      id="offer-preloader-seen"
      dangerouslySetInnerHTML={{
        __html: `try{if(sessionStorage.getItem(${JSON.stringify(OFFER_SEEN_KEY)}))document.documentElement.classList.add("so-offer-seen")}catch(e){}`,
      }}
    />
  );
}
