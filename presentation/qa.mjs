import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('presentation/qa');await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--disable-gpu','--no-first-run']});
const page=await browser.newPage({viewport:{width:1600,height:1050},deviceScaleFactor:1,acceptDownloads:true});
const errors=[];page.on('pageerror',error=>{errors.push(error.message);console.log('PAGE ERROR',error.message);});page.on('console',message=>{if(message.type()==='error'){errors.push(message.text());console.log('BROWSER ERROR',message.text().slice(0,500));}});
const local=process.argv.includes('--standalone');
await page.goto(local?'file:///'+path.resolve('public/RomanKnows_Presentation.html').replaceAll('\\','/'):'http://127.0.0.1:4173',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(out,'studio-desktop.png')});
const overview=await page.evaluate(()=>({slides:RomanKnowsStudio.slideCount,images:[...document.querySelectorAll('#slides img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
console.log('Initial:',JSON.stringify(overview));
if(errors.length){await browser.close();throw new Error('Initial browser errors: '+errors.join('; '));}
await page.setViewportSize({width:1600,height:900});await page.evaluate(()=>document.body.classList.add('presenting'));await page.waitForTimeout(250);
const fits=[];
for(let i=0;i<15;i++){
 await page.evaluate(index=>RomanKnowsStudio.goTo(index),i);await page.waitForTimeout(70);
 await page.screenshot({path:path.join(out,`slide-${String(i+1).padStart(2,'0')}.png`)});
 const issues=await page.evaluate(()=>{
  const slide=document.querySelector('#slides>.active'),bounds=slide.getBoundingClientRect(),issues=[];
  for(const el of slide.querySelectorAll('[data-edit]')){
   const r=el.getBoundingClientRect();if(r.bottom>bounds.bottom-18||r.right>bounds.right-20||r.left<bounds.left)issues.push({text:el.textContent.slice(0,70),type:'slide-boundary',bottom:r.bottom});
   const panel=el.closest('.workflow-step,.outline-step,.module-item,.model-stage,.tech-card,.dictionary-card,.diagram-node');
   if(panel){const p=panel.getBoundingClientRect();if(r.bottom>p.bottom-8||r.right>p.right-8)issues.push({text:el.textContent.slice(0,70),type:'panel-overflow',panel:panel.className,delta:r.bottom-p.bottom});}
  }return issues;
 });if(issues.length)fits.push({slide:i+1,issues});
}
console.log('Layout:',JSON.stringify(fits));
await page.evaluate(()=>{document.body.classList.remove('presenting');RomanKnowsStudio.goTo(0);});await page.setViewportSize({width:1440,height:1000});
await page.keyboard.press('ArrowRight');if(await page.evaluate(()=>RomanKnowsStudio.activeSlide)!==2)throw new Error('Keyboard navigation failed');
await page.locator('#overview-button').click();await page.locator('.overview-item[data-slide="9"]').click();if(await page.evaluate(()=>RomanKnowsStudio.activeSlide)!==10)throw new Error('Overview navigation failed');
await page.evaluate(()=>RomanKnowsStudio.goTo(0));await page.locator('#edit-button').click();
const field=page.locator('#slide-1 [data-edit]').first();await field.fill('RomanKnows QA');await page.waitForTimeout(700);await page.reload({waitUntil:'networkidle'});
if(await page.locator('#slide-1 [data-edit]').first().textContent()!=='RomanKnows QA')throw new Error('Edit persistence failed');
await page.evaluate(()=>localStorage.removeItem('romanknows-slide-text-v1'));await page.reload({waitUntil:'networkidle'});
await page.locator('#present-button').click();await page.waitForTimeout(250);if(!await page.evaluate(()=>document.body.classList.contains('presenting')))throw new Error('Present mode failed');await page.locator('#exit-present').click();
await page.evaluate(()=>RomanKnowsStudio.goTo(12));await page.locator('#slide-13 .dashboard-snapshot').click();if(!await page.locator('#image-dialog').evaluate(el=>el.open))throw new Error('Screenshot zoom failed');await page.locator('#image-dialog .close-dialog').click();
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>RomanKnowsStudio.goTo(0));await page.waitForTimeout(150);await page.screenshot({path:path.join(out,'studio-mobile.png')});
const mobile=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));console.log('Mobile:',JSON.stringify(mobile));
await page.setViewportSize({width:1600,height:1000});
if(process.argv.includes('--exports')){
 for(const format of ['pdf','pptx']){
  console.log('Export starting',format);const downloadPromise=page.waitForEvent('download',{timeout:180000});
  await page.locator('#export-button').click();await page.locator(`[data-export="${format}"]`).click();const download=await downloadPromise;await download.saveAs(path.resolve(`public/RomanKnows_HTML_Deck.${format}`));await page.waitForFunction(()=>!document.querySelector('#export-dialog').open,{timeout:30000});console.log('Export saved',format,await download.failure());
 }
}
await page.emulateMedia({media:'print'});await page.pdf({path:path.resolve('public/RomanKnows_HTML_Print.pdf'),preferCSSPageSize:true,printBackground:true});
await fs.writeFile(path.join(out,'results.json'),JSON.stringify({overview,fits,mobile,errors},null,2));console.log('Errors:',JSON.stringify(errors));
await browser.close();
if(errors.length||fits.length||mobile.scroll>mobile.width)process.exitCode=1;
