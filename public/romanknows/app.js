(() => {
  'use strict';
  const definitions=window.ROMANKNOWS_SLIDES;
  const $=s=>document.querySelector(s);
  const storageKey='romanknows-slide-text-v1';
  const asset=src=>window.ROMANKNOWS_INLINE_ASSETS?.[src]||src;
  let active=0, editing=false, exportController=null, bundlePromise=null, saveTimer, toastTimer, thumbnailSerial=0;
  let edits={};
  try{const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))edits=saved;}catch{/* Storage is optional. */}
  function sanitize(markup){
    const input=document.createElement('template');input.innerHTML=String(markup);
    const output=document.createElement('div');
    function visit(node,parent){
      if(node.nodeType===Node.TEXT_NODE){parent.append(document.createTextNode(node.textContent));return;}
      if(node.nodeType!==Node.ELEMENT_NODE)return;
      if(['SCRIPT','STYLE','IFRAME','OBJECT'].includes(node.tagName))return;
      if(node.tagName==='BR'){parent.append(document.createElement('br'));return;}
      let target=parent;
      if(node.tagName==='SPAN'){target=document.createElement('span');if(node.classList.contains('muted'))target.className='muted';parent.append(target);}
      for(const child of node.childNodes)visit(child,target);
      if(['DIV','P'].includes(node.tagName)&&node.nextSibling)parent.append(document.createElement('br'));
    }
    for(const n of input.content.childNodes)visit(n,output);
    return output.innerHTML;
  }
  function render(){
    const host=$('#slides');host.replaceChildren();
    definitions.forEach((data,i)=>{
      const slide=document.createElement('section');slide.className=`deck-slide theme-${data.theme} ${data.className}`;
      slide.id=`slide-${i+1}`;slide.setAttribute('role','group');slide.setAttribute('aria-roledescription','slide');slide.setAttribute('aria-label',`${i+1} of 15: ${data.title}`);slide.dataset.notes=data.notes;slide.innerHTML=data.html;
      slide.querySelectorAll('img').forEach(image=>image.src=asset(image.getAttribute('src')));
      slide.querySelectorAll('[data-edit]').forEach((node,k)=>{node.dataset.edit=`${i+1}-${k}`;if(typeof edits[node.dataset.edit]==='string')node.innerHTML=sanitize(edits[node.dataset.edit]);});
      host.append(slide);
    });
    renderNavigation();goTo(active,false);setEditing(editing);
  }
  function mini(slide){
    const thumb=document.createElement('div');thumb.className='thumbnail';thumb.setAttribute('aria-hidden','true');
    const copy=slide.cloneNode(true);copy.removeAttribute('id');copy.removeAttribute('aria-hidden');copy.classList.remove('active');
    const suffix=`-thumb-${++thumbnailSerial}`;
    copy.querySelectorAll('[id]').forEach(el=>{
      const old=el.id;el.id=old+suffix;
      copy.querySelectorAll('[marker-end],[marker-start],[clip-path]').forEach(ref=>{
        for(const attribute of ['marker-end','marker-start','clip-path'])if(ref.hasAttribute(attribute))ref.setAttribute(attribute,ref.getAttribute(attribute).replaceAll(`#${old}`,`#${old}${suffix}`));
      });
    });
    copy.querySelectorAll('[contenteditable]').forEach(el=>el.removeAttribute('contenteditable'));
    copy.querySelectorAll('a,button').forEach(el=>el.tabIndex=-1);
    thumb.append(copy);return thumb;
  }
  function renderNavigation(){
    const nav=$('#slide-navigation'),grid=$('#overview-grid');nav.replaceChildren();grid.replaceChildren();
    document.querySelectorAll('#slides>.deck-slide').forEach((slide,i)=>{
      const button=document.createElement('button');button.className='nav-item';button.dataset.slide=i;button.setAttribute('aria-label',`Slide ${i+1}: ${definitions[i].title}`);button.append(mini(slide));
      const caption=document.createElement('div');caption.className='nav-caption';const number=document.createElement('b');number.textContent=String(i+1).padStart(2,'0');const title=document.createElement('span');title.textContent=definitions[i].title;caption.append(number,title);button.append(caption);button.addEventListener('click',()=>goTo(i));nav.append(button);
      const tile=document.createElement('button');tile.className='overview-item';tile.dataset.slide=i;tile.setAttribute('aria-label',`Go to slide ${i+1}: ${definitions[i].title}`);tile.append(mini(slide));const overviewCaption=document.createElement('div');overviewCaption.className='overview-caption';const n=document.createElement('span');n.textContent=String(i+1).padStart(2,'0');overviewCaption.append(n,document.createTextNode(definitions[i].title));tile.append(overviewCaption);tile.addEventListener('click',()=>{$('#overview-dialog').close();goTo(i);});grid.append(tile);
    });
    updateNav();
  }
  function updateNav(){document.querySelectorAll('[data-slide]').forEach(el=>el.setAttribute('aria-current',String(Number(el.dataset.slide)===active)));}
  function goTo(index,updateHash=true){
    active=Math.max(0,Math.min(definitions.length-1,Number(index)||0));
    document.querySelectorAll('#slides>.deck-slide').forEach((el,i)=>{el.classList.toggle('active',i===active);el.setAttribute('aria-hidden',String(i!==active));el.inert=i!==active;});
    $('#current-title').textContent=definitions[active].title;$('#current-section').textContent=definitions[active].section.toUpperCase();$('#slide-number').textContent=String(active+1).padStart(2,'0');$('#previous-button').disabled=active===0;$('#next-button').disabled=active===definitions.length-1;updateNav();
    if(updateHash)history.replaceState(null,'',`#slide-${active+1}`);
    document.querySelector(`.nav-item[data-slide="${active}"]`)?.scrollIntoView({block:'nearest'});
    resize();
  }
  function resize(){
    const fit=$('#stage-fit');const scale=Math.min(fit.clientWidth/1600,fit.clientHeight/900);
    $('#slide-frame').style.width=`${1600*scale}px`;$('#slide-frame').style.height=`${900*scale}px`;$('#slides').style.setProperty('--deck-scale',scale);
    if($('#overview-dialog').open)document.querySelectorAll('.overview-item .thumbnail').forEach(el=>el.style.setProperty('--thumb-scale',el.clientWidth/1600));
  }
  function toast(text){$('#toast').textContent=text;$('#toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').hidden=true,5000);}
  function setEditing(value){
    editing=value;document.body.classList.toggle('editing',editing);$('#edit-button').setAttribute('aria-pressed',String(editing));$('#edit-button').querySelector('span').textContent=editing?'Done editing':'Edit text';
    document.querySelectorAll('#slides [data-edit]').forEach(el=>{if(editing){el.contentEditable='plaintext-only';el.spellcheck=true;el.setAttribute('aria-label','Editable slide text');}else{el.removeAttribute('contenteditable');el.removeAttribute('aria-label');}});
    if(editing)$('#save-status').textContent='Click any outlined text to edit';else $('#save-status').textContent=Object.keys(edits).length?'Your edits are saved in this browser':'15 slides · ready to present';
  }
  function saveEdits(){
    try{localStorage.setItem(storageKey,JSON.stringify(edits));$('#save-status').textContent='Edits saved in this browser';}catch{$('#save-status').textContent='Edits kept for this session';}
    renderNavigation();
  }
  async function present(){
    if(document.body.classList.contains('presenting')){exitPresent();return;}
    if(editing)setEditing(false);
    document.body.classList.add('presenting');$('#exit-present').hidden=false;
    try{await document.documentElement.requestFullscreen();}catch{/* In-page presentation remains available. */}
    resize();
  }
  function exitPresent(){document.body.classList.remove('presenting');$('#exit-present').hidden=true;if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});resize();}
  function openOverview(){$('#overview-dialog').showModal();resize();}
  function closeExportMenu(){$('#export-menu').hidden=true;$('#export-button').setAttribute('aria-expanded','false');}
  function loadExporter(){
    if(window.RomanKnowsExporter)return Promise.resolve(window.RomanKnowsExporter);
    if(!bundlePromise)bundlePromise=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='vendor/export.js';script.onload=()=>resolve(window.RomanKnowsExporter);script.onerror=()=>{script.remove();bundlePromise=null;reject(new Error('Could not load export tools. Open this presentation through the local server and retry.'));};document.body.append(script);});
    return bundlePromise;
  }
  async function exportAs(format){
    if(exportController)return;
    closeExportMenu();if(editing)setEditing(false);
    exportController=new AbortController();$('#export-progress').value=0;$('#export-heading').textContent=`Preparing your ${format==='pptx'?'PowerPoint':'PDF'}.`;$('#export-status').textContent='Loading export tools…';$('#cancel-export').disabled=false;$('#export-dialog').showModal();
    try{
      const exporter=await loadExporter();if(exportController.signal.aborted)throw new DOMException('Cancelled','AbortError');
      await exporter.exportSlides(format,[...document.querySelectorAll('#slides>.deck-slide')],(done,total,stage)=>{$('#export-progress').value=done;$('#export-status').textContent=`${stage} slide ${done} of ${total}…`;},exportController.signal);
      toast('Your presentation is ready. Check your browser downloads.');
    }catch(error){if(error.name==='AbortError')toast('Export cancelled. Your edits are still saved.');else{console.error(error);toast(`Export failed: ${error.message}`);}}
    finally{exportController=null;$('#export-dialog').close();}
  }
  $('#previous-button').addEventListener('click',()=>goTo(active-1));$('#next-button').addEventListener('click',()=>goTo(active+1));
  $('#overview-button').addEventListener('click',openOverview);$('#edit-button').addEventListener('click',()=>{setEditing(!editing);if(editing)toast('Click the outlined text. Changes are saved in this browser.');});
  $('#present-button').addEventListener('click',present);$('#exit-present').addEventListener('click',exitPresent);
  $('#export-button').addEventListener('click',()=>{const open=$('#export-menu').hidden;$('#export-menu').hidden=!open;$('#export-button').setAttribute('aria-expanded',String(open));});
  document.addEventListener('click',event=>{if(!event.target.closest('.export-control'))closeExportMenu();});
  document.querySelectorAll('[data-export]').forEach(button=>button.addEventListener('click',()=>exportAs(button.dataset.export)));
  $('#print-button').addEventListener('click',()=>{closeExportMenu();if(editing)setEditing(false);document.fonts.ready.then(()=>window.print());});
  $('#reset-button').addEventListener('click',()=>{closeExportMenu();if(confirm('Restore the original slide wording? This clears text edits saved in this browser.')){edits={};try{localStorage.removeItem(storageKey);}catch{}render();toast('Original wording restored.');}});
  $('#cancel-export').addEventListener('click',()=>{exportController?.abort();$('#cancel-export').disabled=true;$('#export-status').textContent='Cancelling after the current slide…';});
  $('#export-dialog').addEventListener('cancel',event=>{event.preventDefault();$('#cancel-export').click();});
  document.querySelectorAll('.close-dialog').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  $('#slides').addEventListener('input',event=>{const field=event.target.closest('[data-edit]');if(!field)return;edits[field.dataset.edit]=sanitize(field.innerHTML);$('#save-status').textContent='Saving…';clearTimeout(saveTimer);saveTimer=setTimeout(saveEdits,450);});
  $('#slides').addEventListener('click',event=>{const button=event.target.closest('[data-lightbox]');if(!button||editing)return;$('#expanded-image').src=asset(button.dataset.lightbox);$('#expanded-image').alt=button.dataset.caption;$('#expanded-caption').textContent=button.dataset.caption;$('#image-dialog').showModal();});
  document.addEventListener('keydown',event=>{
    if($('dialog[open]'))return;
    if(event.key==='Escape'){closeExportMenu();if(document.body.classList.contains('presenting'))exitPresent();return;}
    if(event.target.closest('[contenteditable],input,textarea,select')||event.ctrlKey||event.metaKey||event.altKey)return;
    if(['ArrowRight','PageDown'].includes(event.key)){event.preventDefault();goTo(active+1);}else if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();goTo(active-1);}else if(event.key==='Home'){event.preventDefault();goTo(0);}else if(event.key==='End'){event.preventDefault();goTo(14);}else if(event.key.toLowerCase()==='f'){event.preventDefault();present();}else if(event.key.toLowerCase()==='o'){event.preventDefault();openOverview();}
  });
  document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement){document.body.classList.remove('presenting');$('#exit-present').hidden=true;}resize();});
  window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#slide-(\d+)$/);if(m)goTo(Number(m[1])-1,false);});
  window.addEventListener('resize',resize);new ResizeObserver(resize).observe($('#stage-fit'));
  const initial=location.hash.match(/^#slide-(\d+)$/);if(initial)active=Math.max(0,Math.min(14,Number(initial[1])-1));
  render();document.fonts.ready.then(()=>{resize();document.body.classList.add('fonts-ready');});
  window.RomanKnowsStudio={goTo,exportAs,get slideCount(){return definitions.length;},get activeSlide(){return active+1;}};
  if(location.protocol==='file:'&&!window.ROMANKNOWS_INLINE_ASSETS)toast('For reliable exports, run “npm run deck” or open the self-contained RomanKnows_Presentation.html file.');
})();
