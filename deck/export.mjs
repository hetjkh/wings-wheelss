// Export dist/index.html -> PPTX (editable text over rendered visuals) and optional PDF.
//   node export.mjs                -> out/RomanKnows_Presentation.pptx   (hybrid: native text + background art)
//   node export.mjs --flat         -> also out/RomanKnows_Presentation_flat.pptx (each slide is one image)
import { chromium } from 'playwright-core';
import pptxgen from 'pptxgenjs';
import { mkdirSync, readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const args = process.argv.slice(2);
const SCALE = 2;           // screenshot density (3840x2160)
const PX = 1 / 144;        // css px -> inches (1920px = 13.333in)
const PT = 0.5;            // css px -> pt

// css family -> installed PowerPoint family name
const FONT = {
  'RK Light': 'Gilroy-Light',
  'RK Regular': 'Gilroy-Regular',
  'RK Medium': 'Gilroy-Medium',
  'RK Semibold': 'Gilroy-SemiBold',
  Consolas: 'Consolas',
};

mkdirSync('out', { recursive: true });
mkdirSync('dist/art', { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: SCALE });
await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?export');
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);

// ---------- 1. collect text lines + notes ----------
const data = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('section.slide').forEach((sec) => {
    const base = sec.getBoundingClientRect();
    const lines = [];
    const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const el = node.parentElement;
      if (!el || el.closest('svg, script, style')) continue;
      if (!node.nodeValue.trim()) continue;
      const cs = getComputedStyle(el);
      const upper = cs.textTransform === 'uppercase';
      // split into visual lines by character rects
      const range = document.createRange();
      const chars = [];
      for (let i = 0; i < node.nodeValue.length; i++) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rs = range.getClientRects();
        if (!rs.length) continue;
        const r = rs[0];
        if (r.width === 0 && node.nodeValue[i] !== ' ') continue;
        chars.push({ c: node.nodeValue[i], r });
      }
      let cur = null;
      const flush = () => { if (cur && cur.text.trim()) lines.push(cur); cur = null; };
      for (const { c, r } of chars) {
        const newLine = !cur || Math.abs(r.top - cur.top) > r.height * 0.5;
        if (c === ' ' && newLine) continue; // leading space: start box at first visible glyph
        if (newLine) {
          flush();
          cur = { text: '', left: r.left, right: r.right, top: r.top, height: r.height };
        }
        cur.text += c;
        cur.right = Math.max(cur.right, r.right);
      }
      flush();
      const m = cs.color.match(/[\d.]+/g).map(Number);
      const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
      for (const l of lines.filter((x) => !x.done)) {
        l.done = true;
        l.align = cs.textAlign === 'right' || cs.textAlign === 'end' ? 'right' : cs.textAlign === 'center' ? 'center' : 'left';
        l.text = l.text.replace(/\s+/g, ' ');
        l.text = l.text.trim();
        if (upper) l.text = l.text.toUpperCase();
        l.x = l.left - base.left;
        l.y = l.top - base.top;
        l.w = l.right - l.left;
        l.h = l.height;
        l.size = parseFloat(cs.fontSize);
        l.family = fam;
        l.weight = parseInt(cs.fontWeight, 10) || 400;
        l.color = '#' + [m[0], m[1], m[2]].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
        l.alpha = m.length > 3 ? m[3] : 1;
        const ls = parseFloat(cs.letterSpacing);
        l.spacing = isNaN(ls) ? 0 : ls;
        l.align = cs.textAlign === 'right' || cs.textAlign === 'end' ? 'right' : cs.textAlign === 'center' ? 'center' : 'left';
      }
    }
    out.push({ notes: sec.dataset.notes || '', lines: lines.filter((l) => l.text) });
  });
  return out;
});
console.log(`collected ${data.reduce((a, s) => a + s.lines.length, 0)} text lines on ${data.length} slides`);

// ---------- 2. screenshots ----------
const sections = page.locator('section.slide');
const n = await sections.count();
const flat = [];
for (let i = 0; i < n; i++) {
  const f = `dist/art/full${String(i + 1).padStart(2, '0')}.jpg`;
  await sections.nth(i).screenshot({ path: f, type: 'jpeg', quality: 92 });
  flat.push(f);
}
await page.addStyleTag({ content: '.slide, .slide * { text-shadow: none !important; -webkit-text-fill-color: transparent !important; }' });
const art = [];
for (let i = 0; i < n; i++) {
  const f = `dist/art/art${String(i + 1).padStart(2, '0')}.jpg`;
  await sections.nth(i).screenshot({ path: f, type: 'jpeg', quality: 92 });
  art.push(f);
}
await browser.close();

// ---------- 3. build pptx ----------
function build(file, mode) {
  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'W', width: 1920 * PX, height: 1080 * PX });
  pptx.layout = 'W';
  pptx.title = 'RomanKnows — Project-1 Presentation';
  pptx.author = 'Ronit Kaushal, Het Jani, Vaghela Mitrajsinh';
  pptx.company = 'Institute of Advanced Research, Gandhinagar';
  data.forEach((s, i) => {
    const sl = pptx.addSlide();
    sl.background = { color: '00101C' };
    sl.addImage({ path: mode === 'flat' ? flat[i] : art[i], x: 0, y: 0, w: 1920 * PX, h: 1080 * PX });
    if (mode !== 'flat') {
      for (const l of s.lines) {
        const pad = 60; // extra room so PowerPoint never wraps
        let x = l.x, w = l.w + pad;
        if (l.align === 'right') x = l.x + l.w - w + 0;
        if (l.align === 'center') x = l.x - pad / 2;
        sl.addText(l.text, {
          x: x * PX, y: l.y * PX, w: w * PX, h: l.h * PX,
          fontFace: FONT[l.family] || l.family, fontSize: Math.round(l.size * PT * 100) / 100,
          bold: l.family === 'Consolas' && l.weight >= 600,
          color: l.color.slice(1), transparency: l.alpha < 1 ? Math.round((1 - l.alpha) * 100) : 0,
          charSpacing: Math.round(l.spacing * PT * 100) / 100,
          align: l.align, valign: 'middle', margin: 0, wrap: false, fit: 'none', paraSpaceAfter: 0, paraSpaceBefore: 0,
        });
      }
    }
    if (s.notes) sl.addNotes(s.notes);
  });
  return pptx.writeFile({ fileName: file });
}

await build('out/RomanKnows_Presentation.pptx', 'hybrid');
console.log('wrote out/RomanKnows_Presentation.pptx');
if (args.includes('--flat')) {
  await build('out/RomanKnows_Presentation_flat.pptx', 'flat');
  console.log('wrote out/RomanKnows_Presentation_flat.pptx');
}
