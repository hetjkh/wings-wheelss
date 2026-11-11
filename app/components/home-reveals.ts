import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

/** Entrance motion stays separate from the transforms used by pinned scenes. */
export function animateHomeReveals(root: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return () => {};

  gsap.registerPlugin(SplitText);
  const cleanups: (() => void)[] = [];
  const animations = new Map<HTMLElement, gsap.core.Animation>();
  const targets = new Map<Element, Set<HTMLElement>>();
  const revealed = new WeakSet<HTMLElement>();
  const completed = new WeakSet<HTMLElement>();
  const imageReady = new Map<HTMLElement, () => Promise<void>>();
  let live = true;
  const select = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
  const pending = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    // Keep restored scroll positions and already-visible content readable.
    return element.getClientRects().length > 0 && rect.bottom > 0
      && (rect.top >= window.innerHeight * .88 || rect.left >= window.innerWidth);
  };

  const reveal = (element: HTMLElement, delay = 0) => {
    revealed.add(element);
    const play = () => { if (live) animations.get(element)?.delay(delay).play(); };
    const prepare = imageReady.get(element);
    if (prepare) void prepare().then(play);
    else play();
  };
  // IntersectionObserver also accounts for the clipped, horizontal destination rail.
  const onIntersection: IntersectionObserverCallback = (entries, source) => {
    let order = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      targets.get(entry.target)?.forEach(element => {
        if (!revealed.has(element)) reveal(element, Math.min(order++ * .035, .1));
      });
      source.unobserve(entry.target);
    });
  };
  // Text begins inside the viewport, where visitors can actually see the lines.
  const observer = new IntersectionObserver(onIntersection, {
    rootMargin: `0px 0px -${Math.round(window.innerHeight * .16)}px 0px`, threshold: 0,
  });
  const imageObserver = new IntersectionObserver(onIntersection, { threshold: 0 });
  const observe = (element: HTMLElement, target: HTMLElement = element, image = false) => {
    const group = targets.get(target) ?? new Set<HTMLElement>();
    group.add(element);
    targets.set(target, group);
    (image ? imageObserver : observer).observe(target);
  };
  const watch = (element: HTMLElement, animation: gsap.core.Animation, target: HTMLElement = element, image = false) => {
    animations.set(element, animation);
    observe(element, target, image);
  };

  select("[data-editorial-title]").filter(pending).forEach(title => {
    watch(title, gsap.from(title.querySelectorAll(".e-line > span"), {
      yPercent: 105, opacity: 0, duration: .85, stagger: .07, ease: "power2.out", paused: true,
    }));
  });

  select("[data-motion-text]").filter(pending).forEach(element => {
    const split = SplitText.create(element, {
      type: "lines", mask: "lines", autoSplit: true,
      onSplit(self) {
        self.masks.forEach(mask => {
          (mask as HTMLElement).style.paddingBottom = ".14em";
          (mask as HTMLElement).style.marginBottom = "-.14em";
        });
        const tween = gsap.from(self.lines, {
          yPercent: 105, opacity: 0, duration: .85, stagger: .07, ease: "power2.out", paused: true,
          onComplete: () => { completed.add(element); },
        });
        animations.set(element, tween);
        // SplitText restores elapsed time after a resize/font change. Continue
        // active entrances instead of jumping every started title to its end.
        if (completed.has(element)) tween.progress(1);
        else if (revealed.has(element)) tween.play();
        return tween;
      },
    });
    observe(element);
    cleanups.push(() => split.revert());
  });

  const content = new Set(select("[data-motion-reveal], [data-editorial-reveal], [data-home-reveal]"));
  select("[data-motion-stagger]").forEach(group => {
    Array.from(group.children).forEach(child => {
      if (child instanceof HTMLElement) content.add(child);
    });
  });
  Array.from(content).filter(pending).forEach(element => {
    watch(element, gsap.from(element, {
      y: 20, opacity: 0, duration: .65, ease: "power2.out", paused: true,
      clearProps: "transform,opacity",
    }));
  });

  select("[data-motion-image]").filter(pending).forEach(frame => {
    const image = frame.querySelector("img");
    const timeline = gsap.timeline({ paused: true });
    timeline.fromTo(frame,
      { clipPath: "inset(4% 2% 4% 2% round 12px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.9, ease: "power2.out", clearProps: "clipPath" }, 0,
    );
    if (image) timeline.from(image, {
      scale: 1.07, duration: 2.4, ease: "power2.out", clearProps: "transform",
    }, 0);
    if (image) imageReady.set(frame, async () => {
      image.loading = "eager";
      // Let the entrance run for its full duration after the photo is decoded.
      // The small inline preview remains visible during a slow download.
      await image.decode().catch(() => {});
    });
    // Observe the stable layout container, independently of the image layer's
    // animated clipping and parallax transforms.
    watch(frame, timeline, frame.parentElement ?? frame, true);
  });

  // Warm upcoming vertical sections and the next horizontal destination cards.
  const warmImages = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll<HTMLImageElement>("[data-motion-image] img").forEach(image => {
        image.loading = "eager";
        void image.decode().catch(() => {});
      });
      warmImages.unobserve(entry.target);
    });
  }, { rootMargin: "180% 100%" });
  select("[data-motion-image]").forEach(frame => warmImages.observe(frame.parentElement ?? frame));

  // Keyboard focus must never land on content that is waiting for an entrance.
  const showFocused = (event: FocusEvent) => {
    if (!(event.target instanceof HTMLElement)) return;
    const target = event.target;
    const link = target.closest("a");
    animations.forEach((animation, element) => {
      if (element.contains(target) || link?.contains(element)) {
        revealed.add(element);
        observer.unobserve(element);
        animation.progress(1);
      }
    });
  };
  root.addEventListener("focusin", showFocused);

  // Open answers change the positions of every chapter that follows them.
  const refresh = () => { root.dispatchEvent(new CustomEvent("home-layout-change")); };
  select("details").forEach(details => {
    details.addEventListener("toggle", refresh);
    cleanups.push(() => details.removeEventListener("toggle", refresh));
  });
  return () => {
    live = false;
    observer.disconnect();
    imageObserver.disconnect();
    warmImages.disconnect();
    root.removeEventListener("focusin", showFocused);
    cleanups.forEach(cleanup => cleanup());
  };
}
