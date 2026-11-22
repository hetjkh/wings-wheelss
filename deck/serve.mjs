// Local preview server with a working "Export to PPT" button.
//   npm start   ->  http://localhost:5173
import http from 'node:http';
import { execFile } from 'node:child_process';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const PORT = Number(process.env.PORT) || 5173;
const ROOT = path.resolve('.');
const FORMATS = {
  pptx: { script: 'export.mjs', file: path.join(ROOT, 'out', 'RomanKnows_Presentation.pptx'), name: 'RomanKnows_Presentation.pptx',
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
  mp4: { script: 'record.mjs', file: path.join(ROOT, 'out', 'RomanKnows_Presentation.mp4'), name: 'RomanKnows_Presentation.mp4', type: 'video/mp4' },
  pdf: { script: 'pdf.mjs', file: path.join(ROOT, 'out', 'RomanKnows_Presentation.pdf'), name: 'RomanKnows_Presentation.pdf', type: 'application/pdf' },
};
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp',
};

let exporting = null;
const run = (file) => new Promise((res, rej) =>
  execFile(process.execPath, [file], { cwd: ROOT }, (err, out, errOut) => (err ? rej(new Error(errOut || err.message)) : res(out))));
// one export at a time (they share dist/ and out/)
const exportDeck = async (fmt) => {
  while (exporting) await exporting.catch(() => {});
  exporting = (async () => { await run('build.mjs'); await run(fmt.script); })();
  try { await exporting; } finally { exporting = null; }
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/export') {
    try {
      const fmt = FORMATS[url.searchParams.get('format') || 'pptx'];
      if (!fmt) throw new Error('unknown format');
      await exportDeck(fmt);
      res.writeHead(200, {
        'Content-Type': fmt.type,
        'Content-Length': statSync(fmt.file).size,
        'Content-Disposition': `attachment; filename="${fmt.name}"`,
      });
      createReadStream(fmt.file).pipe(res);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Export failed: ' + e.message);
    }
    return;
  }
  let p = decodeURIComponent(url.pathname);
  if (p === '/') p = '/dist/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
server.requestTimeout = 0; // video export takes a few minutes
server.listen(PORT, () => console.log(`Deck preview: http://localhost:${PORT}  (Export PPT / PDF / Video buttons are top-right)`));
