import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../public/romanknows');
const mime={'.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2'};
const assets={};
for(const file of await fs.readdir(path.join(root,'assets'))){
 const type=mime[path.extname(file)];if(!type)continue;
 assets[`assets/${file}`]=`data:${type};base64,${(await fs.readFile(path.join(root,'assets',file))).toString('base64')}`;
}
let html=await fs.readFile(path.join(root,'index.html'),'utf8');
let css=await fs.readFile(path.join(root,'styles.css'),'utf8');
css=css.replace(/url\(['"]?(assets\/[^)'"\s]+)['"]?\)/g,(match,name)=>assets[name]?`url('${assets[name]}')`:match);
html=html.replace(/<link rel="preload"[^>]+>/g,'').replace('<link rel="stylesheet" href="styles.css">',`<style>${css}</style>`).replace('href="assets/favicon.svg"',`href="${assets['assets/favicon.svg']}"`).replace(/\s*<script src="(?:slides|app)\.js" defer><\/script>/g,'');
let scripts=`<script>window.ROMANKNOWS_INLINE_ASSETS=${JSON.stringify(assets)};</script>`;
for(const file of ['slides.js','vendor/export.js','app.js']){
 const js=(await fs.readFile(path.join(root,file),'utf8')).replace(/<\/script/gi,'<\\/script');
 scripts+=`\n<script>\n${js}\n</script>`;
}
html=html.replace('</body>',()=>`${scripts}\n</body>`);
const out=path.resolve(here,'../public/RomanKnows_Presentation.html');await fs.writeFile(out,html);console.log(`Standalone presentation: ${out} (${(Buffer.byteLength(html)/1024/1024).toFixed(1)} MB)`);
