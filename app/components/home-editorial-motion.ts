import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Called inside HomeExperience's scoped GSAP matchMedia context. */
export function animateHomeEditorial(root: HTMLElement, desktop: boolean) {
  const cleanup: (() => void)[] = [];
  const select = <T extends HTMLElement>(selector: string) => Array.from(root.querySelectorAll<T>(selector));

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
  gsap.fromTo(".e-people-title [data-ink]", { color: "#c8bcab" }, { color: "#3d2d20", stagger: .12, ease: "none", scrollTrigger: { trigger: ".e-people-title", start: "top 85%", end: "bottom 45%", scrub: .4 } });
  gsap.fromTo(".e-type-photo", { clipPath: "inset(0 50% 0 50% round 100px)" }, { clipPath: "inset(0 0% 0 0% round 100px)", stagger: .15, ease: "none", scrollTrigger: { trigger: ".e-people-title", start: "top 90%", end: "bottom 55%", scrub: .6 } });

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

    // Like the inner pages, the next torn surface travels over the held chapter.
    select("[data-home-cover]").forEach(section => {
      const next = section.nextElementSibling as HTMLElement | null;
      if (!next) return;
      const cover = gsap.timeline({ scrollTrigger: {
        trigger: section,
        start: () => section.offsetHeight > window.innerHeight - 70 ? "bottom bottom" : "top 70px",
        endTrigger: next, end: "top 70px", pin: section, pinSpacing: false,
        scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
      } });
      cover.to(section, { "--e-cover": .5, ease: "none" }, 0)
        .fromTo(next, { "--e-tear-x": "-16px" }, { "--e-tear-x": "16px", ease: "none" }, 0);
    });
  }
  return () => cleanup.forEach(fn => fn());
}
