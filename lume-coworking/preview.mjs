import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('./dist/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' };
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1');
    const target = path.resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!target.startsWith(path.resolve(root) + path.sep)) { res.writeHead(403); res.end('Forbidden'); return; }
    const bytes = await fs.readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    res.end(bytes);
  } catch (_) { res.writeHead(404); res.end('Not found'); }
});
server.on('error', error => { console.error('Não foi possível iniciar o preview:', error.message); process.exitCode = 1; });
server.listen(4173, '127.0.0.1', () => console.log('Lume Coworking: http://127.0.0.1:4173'));
