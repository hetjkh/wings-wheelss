// Builds dist/index.html as ONE self-contained file: CSS, export libraries and every image are embedded,
// so it opens straight from disk (file://) and PPT/PDF export run in the browser with no server.
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { html } from './src/slides.mjs';

mkdirSync('dist', { recursive: true });
execSync('npx @tailwindcss/cli -i src/input.css -o dist/tw.css', { stdio: 'inherit' });

const safe = (s) => s.replace(/<\/script/gi, '<\\/script'); // keep embedded JS from closing its own <script>

// classic scripts, loaded in this order (jszip must come before pptxgen)
const VENDOR = ['node_modules/jszip/dist/jszip.min.js', 'node_modules/pptxgenjs/dist/pptxgen.min.js',
  'node_modules/html-to-image/dist/html-to-image.js', 'node_modules/jspdf/dist/jspdf.umd.min.js'];
const vendorTags = VENDOR.map((f) => `<script>${safe(readFileSync(f, 'utf8'))}</script>`).join('\n');

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' };
const cache = new Map();
const dataUri = (rel) => {
  if (!cache.has(rel)) {
    const ext = rel.slice(rel.lastIndexOf('.')).toLowerCase();
    cache.set(rel, `data:${MIME[ext]};base64,${readFileSync(rel.replace(/^\.\.\//, '')).toString('base64')}`);
  }
  return cache.get(rel);
};

let out = html(null)
  .replace('<link rel="stylesheet" href="null">', `<style>${readFileSync('dist/tw.css', 'utf8')}</style>`)
  .replace(/\.\.\/assets\/[^'")\s]+/g, dataUri)
  .replace('</head>', vendorTags + '</head>');

writeFileSync('dist/index.html', out);
console.log(`built dist/index.html (${(out.length / 1048576).toFixed(1)} MB, self-contained)`);
