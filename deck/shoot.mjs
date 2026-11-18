// Renders every <section class="slide"> of dist/index.html to a PNG (default scale 1 = 1920x1080)
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

export async function shoot({ scale = 1, outDir = 'dist/shots', only = null, type = 'png', quality = 95, hideText = false } = {}) {
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: scale });
  await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?export');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  if (hideText) {
    await page.addStyleTag({ content: '.slide, .slide * { text-shadow: none !important; -webkit-text-fill-color: transparent !important; }' });
  }
  const n = await page.locator('section.slide').count();
  const files = [];
  for (let i = 0; i < n; i++) {
    if (only && !only.includes(i + 1)) continue;
    const f = path.join(outDir, `slide${String(i + 1).padStart(2, '0')}.${type === 'jpeg' ? 'jpg' : 'png'}`);
    await page.locator('section.slide').nth(i).screenshot(type === 'jpeg' ? { path: f, type: 'jpeg', quality } : { path: f });
    files.push(f);
  }
  await browser.close();
  return files;
}

if (process.argv[1] && process.argv[1].endsWith('shoot.mjs')) {
  const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
  const files = await shoot({ only });
  console.log(files.length + ' slides rendered to dist/shots');
}
