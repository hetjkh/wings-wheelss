"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { office } from "./data";
import { TravelIcon } from "./icons";
import "./social-offer.css";

export const OFFER_SEEN_KEY = "ww-social-offer-seen";

const channels: { label: string; handle: string; href: string; icon: ReactNode }[] = [
  {
    label: "Instagram", handle: "@wingsandwheels.travel",
    href: office.socials.find(social => social.label === "Instagram")!.href,
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>,
  },
  {
    label: "LinkedIn", handle: "Wings & Wheels",
    href: office.socials.find(social => social.label === "LinkedIn")!.href,
    icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
  },
  {
    label: "TikTok", handle: "@wingswheels.travel",
    href: office.socials.find(social => social.label === "TikTok")!.href,
    icon: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6" />,
  },
  {
    label: "Facebook", handle: "Wings & Wheels",
    href: office.socials.find(social => social.label === "Facebook")!.href,
    icon: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />,
  },
  {
    label: "X", handle: "@wingswheels1978",
    href: office.socials.find(social => social.label === "X")!.href,
    icon: <path d="M4 4l7.2 9.2L4.5 20H7l5.1-5.9L16.8 20H20l-7.4-9.5L19.3 4H16.8l-4.7 5.4L7.5 4H4Z" fill="currentColor" stroke="none" />,
  },
];

const claim = `${office.whatsapp}?text=${encodeURIComponent("Hi Wings & Wheels! I just followed your pages and would like to unlock my discounted price.")}`;

/** Landing offer: follow our socials to unlock a discounted fare. Shown once per session. */
export function SocialOffer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [followed, setFollowed] = useState<string[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(OFFER_SEEN_KEY)) return;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(OFFER_SEEN_KEY, "1");
      dialog.current?.showModal();
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const close = () => dialog.current?.close();
  const follow = (label: string) => setFollowed(list => list.includes(label) ? list : [...list, label]);
  const progress = followed.length / channels.length;
  const unlocked = followed.length > 0;

  return <dialog
    ref={dialog}
    className="so"
    aria-labelledby="so-title"
    onClick={event => { if (event.target === event.currentTarget) close(); }}
  >
    <div className="so-ticket" data-unlocked={unlocked}>
      <button type="button" className="so-close" onClick={close} aria-label="Close offer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>

      <div className="so-stub">
        <Image src="/images/library/social-offer-island-flight-v1.webp" alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 900px) 300px, 420px" quality={75} className="so-stub-photo" />
        <div className="so-stub-copy">
          <span className="so-kicker">Social fare</span>
          <p className="so-stub-big"><span>Follow &amp;</span><em>save.</em></p>
          <dl className="so-stub-route">
            <div><dt>From</dt><dd>DXB</dd></div>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15.5v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0v5l-8 5v2l8-2.5v5.5l-2 1.5V21l3.5-1 3.5 1v-1.5l-2-1.5V13l8 2.5Z" /></svg>
            <div><dt>To</dt><dd>Anywhere</dd></div>
          </dl>
        </div>
        <span className="so-stamp" aria-hidden="true">Unlocked</span>
      </div>

      <div className="so-seal" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <defs><path id="so-seal-ring" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" /></defs>
          <text><textPath href="#so-seal-ring" textLength="230" lengthAdjust="spacing">Follow · Save · Fly · Follow · Save · Fly ·</textPath></text>
        </svg>
        <b>%</b>
      </div>

      <span className="so-watermark" aria-hidden="true">%</span>

      <div className="so-body">
        <span className="so-badge">Exclusive for followers</span>
        <h2 id="so-title" className="so-title">
          <span className="so-title-lead">Follow our page to</span>
          <em>unlock a discounted price</em>
          <svg className="so-swoosh" viewBox="0 0 320 16" preserveAspectRatio="none" aria-hidden="true"><path d="M3 11 C 80 3, 200 3, 317 9" /></svg>
        </h2>
        <ol className="so-steps" aria-label="How it works">
          <li><i>1</i>Follow any page</li>
          <li><i>2</i>Unlock your fare</li>
          <li><i>3</i>Claim on WhatsApp</li>
        </ol>

        <ul className="so-channels">
          {channels.map(channel => {
            const done = followed.includes(channel.label);
            return <li key={channel.label}>
              <a
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="so-channel"
                data-network={channel.label.toLowerCase()}
                data-done={done}
                onClick={() => follow(channel.label)}
              >
                <span className="so-channel-icon"><svg viewBox="0 0 24 24" aria-hidden="true">{channel.icon}</svg></span>
                <span className="so-channel-text"><b>{channel.label}</b><span className="sr-only">{done ? ", followed" : `, ${channel.handle}`}</span></span>
                <span className="so-channel-tag" aria-hidden="true">{done ? <TravelIcon kind="check" size={14} /> : "Follow"}</span>
              </a>
            </li>;
          })}
        </ul>

        <div className="so-progress" aria-live="polite">
          <svg className="so-route" viewBox="0 0 300 30" aria-hidden="true">
            <path className="so-route-base" d="M4 24 Q150 -8 296 24" pathLength={1} />
            <path className="so-route-fill" d="M4 24 Q150 -8 296 24" pathLength={1} style={{ strokeDashoffset: 1 - progress }} />
          </svg>
          <span className="so-progress-label">{unlocked ? `${followed.length} of ${channels.length} followed, your discount is unlocked` : "Follow any page to unlock your fare"}</span>
        </div>

        <div className="so-actions">
          <a className="so-claim" href={claim} target="_blank" rel="noreferrer" aria-disabled={!unlocked} tabIndex={unlocked ? undefined : -1} onClick={event => { if (!unlocked) event.preventDefault(); }}>
            Claim my discount on WhatsApp
          </a>
          <button type="button" className="so-later" onClick={close}>Maybe later</button>
        </div>
      </div>
    </div>
  </dialog>;
}
