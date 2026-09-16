// Server static cu HTTP Range. Range NU e optional: fara el, video.currentTime
// nu face absolut nimic, seekable.length ramane 0, si scrub-ul pare rupt fara
// nicio eroare in consola. python3 -m http.server NU suporta Range.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'web');
const PORT = Number(process.env.PORT) || 8845;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mp4': 'video/mp4',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const fp = path.join(ROOT, path.normalize(rel));
  if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.stat(fp, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const type = TYPES[path.extname(fp).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;

    if (range) {
      const m = /bytes=(\d*)-(\d*)/.exec(range);
      let start = m[1] ? +m[1] : 0;
      let end = m[2] ? +m[2] : st.size - 1;
      if (isNaN(start) || isNaN(end) || start > end || end >= st.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${st.size}` });
        return res.end();
      }
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${st.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': type,
        'Cache-Control': 'no-cache',
      });
      fs.createReadStream(fp, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': st.size,
        'Accept-Ranges': 'bytes',
        'Content-Type': type,
        'Cache-Control': 'no-cache',
      });
      fs.createReadStream(fp).pipe(res);
    }
  });
}).listen(PORT, () => console.log(`copola range-server -> http://localhost:${PORT}`));
