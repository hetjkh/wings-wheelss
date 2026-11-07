import gsap from "gsap";

/** Called inside HomeExperience's scoped GSAP matchMedia context. */
export function animateHomeEditorial(root: HTMLElement, desktop: boolean) {
  const cleanup: (() => void)[] = [];
  const select = <T extends HTMLElement>(selector: string) => Array.from(root.querySelectorAll<T>(selector)).filter(element => element.getClientRects().length > 0);

  select("[data-editorial-title]").forEach(title => {
    gsap.from(title.querySelectorAll(".e-line > span"), {
      yPercent: 110, duration: 1.15, stagger: .12, ease: "power3.out",
      scrollTrigger: { trigger: title, start: "top 92%", once: true },
    });
  });
  select("[data-editorial-reveal]").forEach(item => {
    gsap.from(item, { y: 30, opacity: .2, duration: .8, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 94%", once: true } });
  });
  select("[data-editorial-parallax]").forEach(photo => {
    const amount = Number(photo.dataset.editorialParallax) * (desktop ? 1 : .4);
    gsap.fromTo(photo, { yPercent: -amount }, { yPercent: amount, ease: "none", scrollTrigger: { trigger: photo.parentElement, start: "top bottom", end: "bottom top", scrub: .8 } });
  });
  // Bottom-anchored paper layers stay joined to the surface as the edge lifts and settles.
  select(".e-clientele").forEach(section => {
    const under = section.querySelector(".e-clientele-tear-under");
    const fibre = section.querySelector(".e-clientele-tear-fibre");
    const face = section.querySelector(".e-clientele-tear-face");
    if (!under || !fibre || !face) return;
    const drift = desktop ? 1 : .5;
    const paper = gsap.timeline({ scrollTrigger: {
      trigger: section, start: "top bottom", end: "top 22%", scrub: .7,
    } });
    paper.fromTo(under, { x: -5 * drift, scaleY: 1.01 }, { x: 3 * drift, scaleY: 1.07, duration: .45, ease: "sine.out" }, 0)
      .to(under, { x: -2, scaleY: 1.025, duration: .55, ease: "sine.inOut" }, .45)
      .fromTo(fibre, { x: 3 * drift, scaleY: 1 }, { x: -2 * drift, scaleY: 1.05, duration: .5, ease: "sine.out" }, 0)
      .to(fibre, { x: 1, scaleY: 1.012, duration: .5, ease: "sine.inOut" }, .5)
      .fromTo(face, { x: -3 * drift, scaleY: .98 }, { x: 2 * drift, scaleY: 1.025, duration: .55, ease: "sine.out" }, 0)
      .to(face, { x: 0, scaleY: 1, duration: .45, ease: "sine.inOut" }, .55);
  });
  if (desktop) {
    const gallery = root.querySelector<HTMLElement>(".e-destinations")!;
    const track = gallery.querySelector<HTMLElement>(".e-destination-track")!;
    const viewport = gallery.querySelector<HTMLElement>(".e-destination-window")!;
    gallery.classList.add("is-enhanced");
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    const rail = gsap.timeline({ scrollTrigger: { id: "home-destinations", trigger: gallery.querySelector(".e-destinations-pin"), start: "top 70px", end: () => `+=${distance()}`, pin: true, scrub: .7, invalidateOnRefresh: true, refreshPriority: 1 } });
    rail.to(track, { x: () => -distance(), ease: "none" }, 0)
      .fromTo(".e-destination-progress > span", { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    const focusCard = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>(".e-destination");
      if (!card) return;
      viewport.scrollLeft = 0;
      const progress = Math.max(0, Math.min(1, (card.offsetLeft - 56) / (distance() || 1)));
      const trigger = rail.scrollTrigger!;
      window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: "instant" });
      rail.progress(progress);
    };
    track.addEventListener("focusin", focusCard);
    cleanup.push(() => { track.removeEventListener("focusin", focusCard); gallery.classList.remove("is-enhanced"); viewport.scrollLeft = 0; });

    gsap.fromTo(".e-africa-title", { y: 0 }, { y: 90, ease: "none", scrollTrigger: { trigger: ".e-africa-landscape", start: "top top", end: "bottom top", scrub: .8 } });

    // Drift the decorative edge without freezing the preceding chapter underneath it.
    select("[data-home-cover]").forEach(section => {
      const next = section.nextElementSibling as HTMLElement | null;
      if (!next) return;
      gsap.fromTo(next, { "--e-tear-x": "-16px" }, {
        "--e-tear-x": "16px", ease: "none",
        scrollTrigger: { trigger: next, start: "top 75%", end: "top 25%", scrub: true },
      });
    });
  } else if (window.matchMedia("(max-width: 767px) and (min-height: 640px)").matches) {
    const gallery = root.querySelector<HTMLElement>(".e-destinations");
    const track = gallery?.querySelector<HTMLElement>(".e-destination-track");
    const viewport = gallery?.querySelector<HTMLElement>(".e-destination-window");
    const galleryPin = gallery?.querySelector<HTMLElement>(".e-destinations-pin");
    if (gallery && track && viewport && galleryPin) {
      gallery.classList.add("is-mobile-rail");
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const rail = gsap.timeline({ scrollTrigger: {
        id: "home-destinations-mobile", trigger: galleryPin, start: "top 65px",
        end: () => `+=${Math.max(window.innerHeight * .8, distance())}`,
        pin: true, scrub: .7, invalidateOnRefresh: true, refreshPriority: 1,
      } });
      rail.to(track, { x: () => -distance(), ease: "none" }, 0)
        .fromTo(gallery.querySelector(".e-destination-progress > span"), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      const focusCard = (event: FocusEvent) => {
        const card = (event.target as HTMLElement).closest<HTMLElement>(".e-destination");
        if (!card || !rail.scrollTrigger) return;
        const progress = Math.max(0, Math.min(1, card.offsetLeft / (distance() || 1)));
        const trigger = rail.scrollTrigger;
        window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: "instant" });
      };
      track.addEventListener("focusin", focusCard);
      cleanup.push(() => { track.removeEventListener("focusin", focusCard); gallery.classList.remove("is-mobile-rail"); viewport.scrollLeft = 0; });
    }

    const landscape = root.querySelector<HTMLElement>(".e-africa-landscape");
    if (landscape && landscape.getClientRects().length > 0) {
      gsap.fromTo(landscape.querySelector(".e-africa-title"), { yPercent: 12 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: landscape, start: "top bottom", end: "bottom top", scrub: .8 } });
    }

    const togetherPhoto = root.querySelector<HTMLElement>(".e-together-photo");
    if (togetherPhoto) gsap.fromTo(togetherPhoto, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".e-together-hero", start: "top bottom", end: "bottom top", scrub: .7 } });
  }
  return () => cleanup.forEach(fn => fn());
}
