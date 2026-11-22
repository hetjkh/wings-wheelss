import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../public/romanknows');
const port=Number(process.env.DECK_PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  try{
    let rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(rel==='/'||rel==='/romanknows'||rel==='/romanknows/')rel='/index.html';
    else if(rel.startsWith('/romanknows/'))rel=rel.slice('/romanknows'.length);
    const file=path.resolve(root,'.'+rel);
    if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    if(!(await stat(file)).isFile())throw new Error('Not a file');
    res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    res.end(await readFile(file));
  }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`Port ${port} is already in use. Open the existing server or choose DECK_PORT.`:e.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`RomanKnows presentation: http://localhost:${port}\nPress Ctrl+C to stop.`));
