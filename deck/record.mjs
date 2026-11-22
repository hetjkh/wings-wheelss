// Record the animated presentation to out/RomanKnows_Presentation.mp4 (1920x1080, 30 fps, H.264).
//   node record.mjs            (HOLD_MS=7000 per slide by default)
import { chromium } from 'playwright-core';
import ffmpeg from '@ffmpeg-installer/ffmpeg';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const HOLD = Number(process.env.HOLD_MS) || 7000;   // time each slide stays on screen (includes its entrance animation)
const FRAMES = path.resolve('dist/frames');
rmSync(FRAMES, { recursive: true, force: true });
mkdirSync(FRAMES, { recursive: true });
mkdirSync('out', { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?record');
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(600);

const cdp = await ctx.newCDPSession(page);
const frames = []; // { t, file }
let n = 0;
let writing = Promise.resolve();
cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
  const file = path.join(FRAMES, `f${String(++n).padStart(6, '0')}.jpg`);
  frames.push({ t: metadata.timestamp, file });
  writing = writing.then(() => import('node:fs/promises').then((fs) => fs.writeFile(file, Buffer.from(data, 'base64'))));
  cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
});
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });
await page.waitForTimeout(400);

const N = await page.evaluate(() => window.__deck.N);
console.log(`recording ${N} slides x ${HOLD / 1000}s ...`);
await page.evaluate(() => window.__deck.go(0));
for (let i = 0; i < N; i++) {
  await page.waitForTimeout(i === N - 1 ? HOLD + 1500 : HOLD);
  if (i < N - 1) await page.evaluate(() => window.__deck.next());
}
await cdp.send('Page.stopScreencast');
await writing;
await browser.close();
console.log(`captured ${frames.length} frames`);

// ---- encode: concat demuxer with real frame timestamps -> constant 30 fps
const lines = ['ffconcat version 1.0'];
frames.forEach((f, i) => {
  const next = frames[i + 1];
  const dur = next ? Math.max(0.001, next.t - f.t) : 1.5;
  lines.push(`file '${f.file.replace(/\\/g, '/')}'`, `duration ${dur.toFixed(4)}`);
});
lines.push(`file '${frames[frames.length - 1].file.replace(/\\/g, '/')}'`);
const list = path.resolve('dist/frames.txt');
writeFileSync(list, lines.join('\n'));
const out = path.resolve('out/RomanKnows_Presentation.mp4');
execFileSync(ffmpeg.path, [
  '-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list,
  '-vf', 'fps=30,scale=1920:1080,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-movflags', '+faststart', out,
], { stdio: 'inherit' });
rmSync(FRAMES, { recursive: true, force: true });
console.log('wrote out/RomanKnows_Presentation.mp4');
