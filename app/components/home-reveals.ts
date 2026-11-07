import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

/** Complements the pinned scenes without animating their moving containers. */
export function animateHomeReveals(root: HTMLElement) {
  gsap.registerPlugin(SplitText);
  const cleanups: (() => void)[] = [];
  const select = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
  const belowFold = (element: HTMLElement) => element.getClientRects().length > 0 && element.getBoundingClientRect().top > window.innerHeight * .9;

  select("[data-motion-text]").filter(belowFold).forEach(element => {
    const split = SplitText.create(element, {
      type: "lines", mask: "lines", autoSplit: true,
      onSplit(self) {
        self.masks.forEach(mask => {
          (mask as HTMLElement).style.paddingBottom = ".14em";
          (mask as HTMLElement).style.marginBottom = "-.14em";
        });
        return gsap.from(self.lines, {
          yPercent: 105, opacity: 0, duration: 1.05, stagger: .09, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 91%", once: true },
        });
      },
    });
    cleanups.push(() => split.revert());
  });

  select("[data-motion-stagger]").filter(belowFold).forEach(group => {
    const tween = gsap.from(group.children, {
      y: 22, opacity: 0, duration: .85, stagger: .065, ease: "power3.out",
      clearProps: "transform,opacity", scrollTrigger: { trigger: group, start: "top 92%", once: true },
    });
    const show = () => { tween.progress(1); };
    group.addEventListener("focusin", show);
    cleanups.push(() => group.removeEventListener("focusin", show));
  });

  select("[data-motion-image]").filter(belowFold).forEach(frame => {
    const tween = gsap.fromTo(frame,
      { clipPath: "inset(12% 4% 12% 4% round 8px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.3, ease: "power3.inOut", clearProps: "clipPath",
        scrollTrigger: { trigger: frame, start: "top 94%", once: true } },
    );
    const link = frame.closest("a");
    const show = () => { tween.progress(1); };
    link?.addEventListener("focus", show);
    cleanups.push(() => link?.removeEventListener("focus", show));
  });

  // Open answers change the positions of every chapter that follows them.
  const refresh = () => { root.dispatchEvent(new CustomEvent("home-layout-change")); };
  select("details").forEach(details => {
    details.addEventListener("toggle", refresh);
    cleanups.push(() => details.removeEventListener("toggle", refresh));
  });
  return () => cleanups.forEach(cleanup => cleanup());
}
