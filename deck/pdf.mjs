// Export dist/index.html -> out/RomanKnows_Presentation.pdf (one 1920x1080 page per slide, selectable text)
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
mkdirSync('out', { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?export');
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: '@page{size:1920px 1080px;margin:0} html,body{background:none!important} .slide{break-after:page;break-inside:avoid} .slide:last-child{break-after:auto}' });
await page.waitForTimeout(500);
await page.pdf({ path: 'out/RomanKnows_Presentation.pdf', width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('wrote out/RomanKnows_Presentation.pdf');
