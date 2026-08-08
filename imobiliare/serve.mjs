// Static server with HTTP Range support.
// Range is non-negotiable: without a 206 response, video.currentTime silently
// does nothing, seekable.length stays 0, and the scroll scrub appears to be a
// JavaScript bug when it is actually the server. python3 -m http.server cannot
// do this.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'web');
const PORT = Number(process.env.PORT) || 8844;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';
  const fp = path.join(ROOT, path.normalize(rel));
  if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.stat(fp, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const type = TYPES[path.extname(fp).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;

    if (range) {
      const m = /bytes=(\d+)-(\d*)/.exec(range);
      if (m) {
        const start = +m[1];
        const end = m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
        if (start >= st.size || start > end) {
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
        return fs.createReadStream(fp, { start, end }).pipe(res);
      }
    }

    res.writeHead(200, {
      'Content-Length': st.size,
      'Accept-Ranges': 'bytes',
      'Content-Type': type,
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(fp).pipe(res);
  });
}).listen(PORT, () => console.log(`range-server -> http://localhost:${PORT}`));
