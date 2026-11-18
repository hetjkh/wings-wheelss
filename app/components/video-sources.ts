/** Resolve desktop vs lighter mobile looping-video URLs (`.mobile.mp4` / `.mobile.webm`). */

export type VideoSources = {
  webm?: string;
  mp4: string;
};

/** Width-only: touch desktops / hybrid laptops still get full-resolution hero video. */
const MOBILE_QUERY = "(max-width: 900px)";

export function prefersMobileVideo() {
  if (typeof window === "undefined") return false;
  return matchMedia(MOBILE_QUERY).matches;
}

/** Only skip on Save-Data / very slow networks — mobile still plays light encodes. */
export function shouldDeferHeavyVideo() {
  if (typeof window === "undefined") return true;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (connection?.saveData) return true;
  if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") return true;
  return false;
}

/** Prefer `.mobile.*` on phones; falls back to the desktop path when not mobile. */
export function resolveVideoSources(src: string, mobile = prefersMobileVideo()): VideoSources {
  const isWebm = /\.webm$/i.test(src);
  const base = src.replace(/\.(mp4|webm)$/i, "");
  if (mobile) {
    return {
      webm: `${base}.mobile.webm`,
      mp4: `${base}.mobile.mp4`,
    };
  }
  if (isWebm) return { webm: src, mp4: src.replace(/\.webm$/i, ".mp4") };
  return { webm: src.replace(/\.mp4$/i, ".webm"), mp4: src };
}

const CACHE_NAME = "ww-motion-videos-v3";

/** Best-effort Cache Storage so the next visit can reuse the clip faster. */
export function warmVideoCache(urls: string[]) {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const run = async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      for (const url of urls) {
        if (await cache.match(url)) continue;
        const response = await fetch(url, { credentials: "same-origin", cache: "force-cache" });
        if (response.ok) await cache.put(url, response.clone());
      }
    } catch {
      // Playback still works from the network / HTTP cache.
    }
  };
  // Wait until the visible player has started fetching so we don't double bandwidth.
  const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
  if (idle) idle(() => { void run(); }, { timeout: 4000 });
  else setTimeout(() => { void run(); }, 2500);
}
