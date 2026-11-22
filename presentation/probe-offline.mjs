import {chromium} from 'playwright-core';
import path from 'node:path';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.on('console',m=>console.log('CONSOLE',m.type(),m.text().slice(0,1800)));
page.on('pageerror',e=>console.log('ERROR',e.message));
await page.goto('file:///'+path.resolve('public/RomanKnows_Presentation.html').replaceAll('\\','/'),{waitUntil:'networkidle'});
console.log('Loaded',await page.evaluate(()=>({exporter:!!window.RomanKnowsExporter,fonts:document.fonts.status,inline:!!window.ROMANKNOWS_INLINE_ASSETS})));
await page.locator('#export-button').click();await page.locator('[data-export="pdf"]').click();
for(let i=0;i<12;i++){
 await page.waitForTimeout(4000);
 console.log(await page.evaluate(()=>({dialog:document.querySelector('#export-dialog').open,status:document.querySelector('#export-status').textContent,toast:document.querySelector('#toast').textContent,exportHost:!!document.querySelector('.export-surface')})));
 if(!await page.locator('#export-dialog').evaluate(e=>e.open))break;
}
await page.screenshot({path:'presentation/qa/offline-export.png'});await browser.close();
