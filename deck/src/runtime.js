// Presentation runtime (inlined into dist/index.html).
//   (default)  slide-by-slide presenter with animated transitions
//   ?list      all slides stacked (scroll view)
//   ?export    static stacked slides (used by the command-line exporters)
//   ?record    presenter without UI, driven by window.__deck (used by the video exporter)
(() => {
  const q = new URLSearchParams(location.search);
  const root = document.documentElement;
  if (q.has('export')) { root.classList.add('export'); return; }

  const record = q.has('record');
  const list = q.has('list');
  const slides = [...document.querySelectorAll('section.slide')];
  const N = slides.length;
  const $ = (h) => { const t = document.createElement('template'); t.innerHTML = h.trim(); return t.content.firstElementChild; };
  const I = {
    dl: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></svg>',
    prev: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
    full: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    grid: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
  };

  // ---------------------------------------------------------------- in-browser export (PPT / PDF)
  // Each slide is rasterised with html-to-image (visuals only, text hidden) and its live text is
  // measured from the DOM, so the PPT keeps editable text and the PDF keeps searchable text.
  const PT = 0.5, PX = 1 / 144;            // css px -> pt, css px -> inch (1920px = 13.333in)
  const PPT_FONT = { 'RK Light': 'Gilroy-Light', 'RK Regular': 'Gilroy-Regular', 'RK Medium': 'Gilroy-Medium', 'RK Semibold': 'Gilroy-SemiBold', Consolas: 'Consolas' };
  const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  // @font-face rules for the rasteriser (same local() sources as input.css; system fonts, nothing is downloaded)
  const FONT_CSS = [['RK Light', 'Gilroy-Light', 'Manrope ExtraLight'], ['RK Regular', 'Gilroy-Regular', 'Manrope'],
    ['RK Medium', 'Gilroy-Medium', 'Manrope Medium'], ['RK Semibold', 'Gilroy-SemiBold', 'Manrope SemiBold']]
    .map(([f, a, b]) => `@font-face{font-family:"${f}";src:local("${a}"),local("${b}");}`).join('');
