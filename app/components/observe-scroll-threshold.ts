/** Batch header measurements and only notify React when the appearance changes. */
export function observeScrollThreshold(read: () => boolean, notify: (value: boolean) => void) {
  let frame = 0;
  let previous: boolean | undefined;
  const update = () => {
    frame = 0;
    const next = read();
    if (next !== previous) {
      previous = next;
      notify(next);
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}
