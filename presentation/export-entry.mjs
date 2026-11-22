import { toPng, getFontEmbedCSS } from 'html-to-image';
import PptxGenJS from 'pptxgenjs';
import { jsPDF } from 'jspdf';

export async function exportSlides(format, slides, progress, signal) {
  await document.fonts.ready;
  const host=document.createElement('div');
  host.className='export-surface';
  host.style.cssText='position:fixed;left:-20000px;top:0;width:1600px;height:900px;pointer-events:none;';
  document.body.append(host);
  const pdf=format==='pdf'?new jsPDF({orientation:'landscape',unit:'pt',format:[960,540],compress:true}):null;
  const pptx=format==='pptx'?new PptxGenJS():null;
  if(pptx){pptx.layout='LAYOUT_WIDE';pptx.author='RomanKnows · Group 13';pptx.subject='Project-1 · IT · 2026–2027';pptx.title='RomanKnows — Website Vulnerability Assessment';pptx.company='Institute of Advanced Research';pptx.lang='en-IN';}
  let fontCSS;
  try {
    for(let i=0;i<slides.length;i++){
      if(signal?.aborted)throw new DOMException('Export cancelled','AbortError');
      progress(i+1,slides.length,'Rendering');
      const clone=slides[i].cloneNode(true);
      clone.classList.add('exporting');clone.classList.remove('active');clone.removeAttribute('id');clone.removeAttribute('aria-hidden');
      clone.style.cssText='display:block;position:relative;width:1600px;height:900px;transform:none;animation:none;opacity:1;';
      clone.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));
      clone.querySelectorAll('[data-ui]').forEach(el=>el.remove());
      clone.querySelectorAll('[id]').forEach(el=>{
        const old=el.id;el.id=`${old}-export-${i}`;
        clone.querySelectorAll('[marker-end],[marker-start],[clip-path]').forEach(ref=>{
          for(const key of ['marker-end','marker-start','clip-path'])if(ref.hasAttribute(key))ref.setAttribute(key,ref.getAttribute(key).replaceAll(`#${old}`,`#${el.id}`));
        });
      });
      host.replaceChildren(clone);
      await Promise.all([...clone.querySelectorAll('img')].map(im=>im.decode().catch(()=>{throw new Error(`Image could not load: ${im.getAttribute('src')}`)})));
      if(fontCSS===undefined)fontCSS=await getFontEmbedCSS(clone);
      const png=await toPng(clone,{width:1600,height:900,pixelRatio:1.5,fontEmbedCSS:fontCSS,cacheBust:false,backgroundColor:'#061923',skipAutoScale:true});
      if(signal?.aborted)throw new DOMException('Export cancelled','AbortError');
      if(pdf){if(i)pdf.addPage([960,540],'landscape');pdf.addImage(png,'PNG',0,0,960,540,undefined,'FAST');}
      if(pptx){const slide=pptx.addSlide();slide.addImage({data:png,x:0,y:0,w:13.333333,h:7.5});slide.addNotes(slides[i].dataset.notes||slides[i].innerText);}
      await new Promise(resolve=>setTimeout(resolve,30));
    }
    progress(slides.length,slides.length,'Saving');
    if(pdf){pdf.setProperties({title:'RomanKnows — Website Vulnerability Assessment',author:'Group 13 · Institute of Advanced Research'});pdf.save('RomanKnows_Browser_Presentation.pdf');}
    if(pptx)await pptx.writeFile({fileName:'RomanKnows_Browser_Presentation.pptx',compression:true});
  } finally {host.remove();}
}
