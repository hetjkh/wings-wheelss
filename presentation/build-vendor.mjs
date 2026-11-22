import { build } from 'esbuild';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import * as icons from 'simple-icons';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const dest=path.resolve(here,'../public/romanknows');
await mkdir(path.join(dest,'assets'),{recursive:true});
await mkdir(path.join(dest,'vendor'),{recursive:true});
for(const weight of [300,400,500,600]) await copyFile(path.join(here,`node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff2`),path.join(dest,`assets/inter-${weight}.woff2`));
await copyFile(path.join(here,'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'),path.join(dest,'assets/mono.woff2'));
const names=['React','Typescript','Tailwindcss','Nextdotjs','Nodedotjs','Python','Mongodb','Sqlite','Jsonwebtokens','Nginx','Openrouter','Docker'];
for(const n of names){const icon=icons['si'+n]; if(icon)await writeFile(path.join(dest,`assets/${n.toLowerCase()}.svg`),icon.svg.replace('<svg ','<svg fill="currentColor" '));}
await copyFile(path.join(here,'node_modules/@fontsource/inter/LICENSE'),path.join(dest,'assets/Inter-LICENSE.txt'));
await copyFile(path.join(here,'node_modules/@fontsource/ibm-plex-mono/LICENSE'),path.join(dest,'assets/Mono-LICENSE.txt'));
await build({entryPoints:[path.join(here,'export-entry.mjs')],outfile:path.join(dest,'vendor/export.js'),bundle:true,minify:true,format:'iife',globalName:'RomanKnowsExporter',platform:'browser',target:['chrome110','firefox115','safari17'],legalComments:'eof'});
console.log('Local export bundle, fonts and technology marks built.');
