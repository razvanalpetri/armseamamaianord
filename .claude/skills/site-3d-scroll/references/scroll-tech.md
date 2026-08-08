# Scroll wiring

## Two techniques

### A. Video scrub (recommended)

One `<video>`, paused, with `currentTime` driven by scroll position.

**Pros:** one file, trivial to regenerate, tiny amount of code, no preloading logic.
**Cons:** needs HTTP Range on the server; all-keyframe files are large; iOS Safari needs `playsinline` + `muted`.

### B. Frame sequence on canvas

Export the video to JPEGs at 30fps, preload them, `drawImage` the right one per scroll position. This is what Apple actually does.

**Pros:** no Range dependency, perfectly deterministic seeking, works everywhere.
**Cons:** hundreds of files, must preload before it is usable, more code, larger total payload unless the frames are aggressively compressed.

```bash
ffmpeg -i hero.mp4 -vf "fps=30,scale=1600:-2" -q:v 6 frames/f_%04d.jpg
```

Pick B if the site must run on hosting you do not control. Pick A otherwise. Everything below is for A.

## The server MUST support HTTP Range

**This is the highest-value fact in this document.**

Without Range, `video.currentTime = x` silently does nothing. No exception, no console error, no network failure. `seekable.length` is `0` and the video is stuck on frame 1. Hours disappear into debugging the JavaScript when the JavaScript is fine.

`python3 -m http.server` does **not** implement Range. Neither do several minimal static servers.

Diagnose in one command, you want **206**, not 200:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -r 100-200 http://localhost:3000/web/hero.mp4
```

Zero-dependency Node server that does it correctly:

```js
// serve.mjs
import http from 'http'; import fs from 'fs'; import path from 'path';
import { fileURLToPath } from 'url';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 8844;   // honour PORT so the harness can assign one
const TYPES = { '.html':'text/html','.mp4':'video/mp4','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.png':'image/png','.css':'text/css','.js':'text/javascript',
  '.otf':'font/otf','.woff':'font/woff','.woff2':'font/woff2' };

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const fp = path.join(ROOT, path.normalize(rel));
  if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.stat(fp, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const type = TYPES[path.extname(fp).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;
    if (range) {
      const m = /bytes=(\d+)-(\d*)/.exec(range);
      const start = +m[1], end = m[2] ? +m[2] : st.size - 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${st.size}`,
        'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1,
        'Content-Type': type, 'Cache-Control': 'no-cache' });
      fs.createReadStream(fp, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Length': st.size, 'Accept-Ranges': 'bytes',
        'Content-Type': type, 'Cache-Control': 'no-cache' });
      fs.createReadStream(fp).pipe(res);
    }
  });
}).listen(PORT, () => console.log(`range-server -> http://localhost:${PORT}`));
```

Reading `PORT` from the environment matters: preview harnesses assign a port, and a hardcoded one collides with whatever is already running.

## The scrub itself

Structure: a tall section with a sticky viewport-height child. Scroll progress through the tall section maps to `currentTime`.

```html
<section class="hero-section" id="top">      <!-- height: 480vh -->
  <div class="hero-sticky">                  <!-- position: sticky; top:0; height:100svh -->
    <video id="heroVideo" muted playsinline preload="auto" poster="poster.jpg" src="hero.mp4"></video>
    <div class="hero-overlay"></div>
    <div class="hero-content" id="heroContent"> ... </div>
  </div>
</section>
```

```js
const clamp = v => Math.min(1, Math.max(0, v));
const hero = document.getElementById('top'),
      vid  = document.getElementById('heroVideo'),
      heroContent = document.getElementById('heroContent');

let ready = false, target = 0, cur = 0;
const mark = () => { ready = true; vid.pause() };
vid.addEventListener('loadedmetadata', mark);
vid.addEventListener('loadeddata', mark);
if (vid.readyState >= 1) mark();

// lerp toward the target so the scrub glides instead of snapping
(function loop() {
  if (ready && vid.duration) {
    cur += (target - cur) * 0.11;
    if (Math.abs(vid.currentTime - cur) > 0.004) { try { vid.currentTime = cur } catch (e) {} }
  }
  requestAnimationFrame(loop);
})();

function heroTick() {
  const r = hero.getBoundingClientRect(), h = hero.offsetHeight - innerHeight;
  const p = clamp((-r.top) / h);
  if (ready && vid.duration) target = p * (vid.duration - 0.05);
  // lift the headline once the interesting part of the clip starts
  const out = clamp((p - 0.42) / 0.2);
  heroContent.style.opacity = (1 - out).toFixed(3);
  heroContent.style.transform = `translateY(${-out * 56}px)`;
}
addEventListener('scroll', heroTick, { passive: true });
addEventListener('resize', heroTick);
heroTick();
```

Notes:

- `480vh` for a 15s clip is a good starting ratio. Longer section = slower scrub.
- **Do not add Lenis or another smooth-scroll library.** They break `position: sticky`, and the lerp above already gives the smoothing they were added for.
- `100svh` not `100vh`, mobile browser chrome otherwise causes a jump.
- `muted` + `playsinline` are required for iOS to allow programmatic `currentTime`.

## Reveal on scroll

`IntersectionObserver` **misses elements on large programmatic scroll jumps** (anchor links, `scrollTo`). Use a scroll-driven sweep instead:

```js
const reveals = [...document.querySelectorAll('.fade')];
function sweep() {
  const vh = innerHeight;
  for (const el of reveals) {
    if (el.dataset.shown) continue;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.9 && r.bottom > 0) { el.dataset.shown = '1'; el.classList.add('visible') }
  }
}
addEventListener('scroll', sweep, { passive: true });
addEventListener('resize', sweep);
// let initial styles commit first, or the transition is skipped and the element stays at opacity 0
requestAnimationFrame(() => requestAnimationFrame(sweep));
addEventListener('load', sweep);
document.fonts?.ready.then(sweep);
```

That double-`requestAnimationFrame` is not superstition. Calling `sweep()` synchronously at parse time can add `.visible` in the same frame the element first renders, the browser collapses the two states, and the transition never runs.

## Interactions worth stealing

### Marquee driven by scroll velocity

Reads as much more expensive than a CSS `@keyframes` loop, because it responds to the user. Drifts on its own, accelerates with the wheel, **reverses direction** when scrolling back.

```js
const marquees = [...document.querySelectorAll('.marquee')].map(el => ({
  el, dir: el.classList.contains('reverse') ? -1 : 1, x: 0, half: 0
}));
function measure() { for (const m of marquees) m.half = m.el.scrollWidth / 2 }
addEventListener('resize', measure); addEventListener('load', measure);
document.fonts?.ready.then(measure); measure();

let lastY = scrollY, vel = 0;
addEventListener('scroll', () => {
  vel += (scrollY - lastY) * 0.06;          // small factor, or it flies
  lastY = scrollY;
  vel = Math.max(-6, Math.min(6, vel));     // clamp, or one flick sends it across the screen
}, { passive: true });

(function loop() {
  vel *= 0.92;
  for (const m of marquees) {
    if (!m.half) { requestAnimationFrame(loop); return }
    m.x -= (0.35 + vel) * m.dir;
    m.x = ((m.x % m.half) + m.half) % m.half;   // wrap; content is duplicated twice
    m.el.style.transform = `translate3d(${-m.x}px,0,0)`;
  }
  requestAnimationFrame(loop);
})();
```

Duplicate the marquee content exactly twice inside the track so the modulo wrap is seamless. The factor and the clamp are the whole difference between "premium" and "unusable", the first version at `0.9` with no clamp was unreadable.

**Outline text** for the marquee is a strong look and costs nothing:

```css
.marquee span {
  font-family: var(--disp);
  font-size: clamp(2.6rem, 7vw, 6.2rem);
  color: transparent;
  -webkit-text-stroke: 1px rgba(221,122,99,.5);
}
@media (max-width: 900px) { .marquee span { -webkit-text-stroke-width: .7px } }
```

### Cursor-following image over a list

The signature interaction on high-end restaurant sites. Hovering a menu row shows its photo floating **over** the list at the cursor, not in a tidy box beside it.

```css
.hover-fig{position:fixed;top:0;left:0;width:250px;height:250px;object-fit:cover;z-index:40;
  opacity:0;visibility:hidden;pointer-events:none;transition:opacity .3s ease;will-change:transform}
.hover-fig.active{opacity:1;visibility:visible}
@media(max-width:1000px){.hover-fig{display:none}}   /* no cursor on touch */
```

```js
const items = [...document.querySelectorAll('.menu-item')],
      figs  = [...document.querySelectorAll('.hover-fig')],
      list  = document.getElementById('list');
let mx=0,my=0,fx=0,fy=0,on=false;
items.forEach(it => it.addEventListener('mouseenter', () => {
  figs.forEach(f => f.classList.remove('active'));
  const f = figs[+it.dataset.img]; if (f) { f.classList.add('active'); on = true }
}));
list.addEventListener('mouseleave', () => { figs.forEach(f=>f.classList.remove('active')); on=false });
addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; if(!on){fx=mx;fy=my} }, {passive:true});
(function loop(){
  fx += (mx-fx)*0.12; fy += (my-fy)*0.12;
  const t = `translate3d(${(fx-125).toFixed(1)}px,${(fy-125).toFixed(1)}px,0)`;
  for (const f of figs) if (f.classList.contains('active')) f.style.transform = t;
  requestAnimationFrame(loop);
})();
```

Snapping `fx/fy` to the cursor while inactive stops the image flying in from the last position when it reappears.

### Parallax band

```js
addEventListener('scroll', () => {
  const r = section.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;   // cheap cull
  const p = (innerHeight - r.top) / (innerHeight + r.height);
  bg.style.transform = `translateY(${(p - .5) * 16}%)`;
}, { passive: true });
```

The background element needs `inset: -14% 0` so the translate never exposes an edge.

## Going further: real 3D

Everything above is video and DOM. When the product genuinely needs to be manipulable (rotate, configure, change colour), the step up is **React Three Fiber + GSAP ScrollTrigger**, with the object as actual geometry.

What that buys, from a real build: procedural textures written as shaders instead of image files, sounds synthesised with the Web Audio API instead of downloaded, and a 3D object that can fly along a curved path into a 2D DOM cart icon (which needs projecting 3D coordinates into screen space). Whole thing under 3MB.

That is a much larger build. Do not start there. Ship the video scrub first.
