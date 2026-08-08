# Verification

Never say "it should work". Measure it, then say what you measured.

## The checklist

Run all of it before reporting done.

### 1. Every asset resolves

```js
(async () => {
  const srcs = [...document.images].map(i => i.getAttribute('src'))
    .concat([...document.querySelectorAll('[style*="url("]')]
      .map(e => (e.getAttribute('style').match(/url\(['"]?([^'")]+)/) || [])[1]))
    .filter(Boolean);
  const out = {};
  for (const s of [...new Set(srcs)]) out[s] = (await fetch(s, { method: 'HEAD' })).status;
  return out;
})()
```

### 2. Range works (only if using video scrub)

```js
(await fetch('web/hero.mp4', { headers: { Range: 'bytes=100-200' } })).status   // must be 206
```

### 3. The video actually loaded

```js
const v = document.querySelector('video');
({ duration: v.duration, readyState: v.readyState })   // readyState 4, duration a real number
```

### 4. No horizontal overflow, at 390px and at 1400px

```js
const over = [];
document.querySelectorAll('body *').forEach(e => {
  const r = e.getBoundingClientRect();
  if (r.width && (r.right > innerWidth + 2 || r.left < -2)
      && getComputedStyle(e).position !== 'fixed'
      && !e.closest('.horizontal-scroll'))            // marquees overflow on purpose
    over.push(e.tagName + '.' + (e.className || '').toString().slice(0, 30));
});
({ docW: document.documentElement.scrollWidth, vw: innerWidth, overflow: [...new Set(over)] })
```

Exclude the marquee container. Everything else must be empty.

### 5. Nothing overlaps on mobile

Measure the boxes rather than eyeballing a screenshot:

```js
['.hero-title', '.hero-sub', '.hero-marks'].map(s => {
  const r = document.querySelector(s).getBoundingClientRect();
  return [s, Math.round(r.top), Math.round(r.bottom)];
})
```

Consecutive `bottom` and `top` must not cross.

### 6. Grid collapse on mobile

```js
['.featured-menu', '.cards', '.ig'].map(s =>
  [s, getComputedStyle(document.querySelector(s)).gridTemplateColumns])
```

Single column at 390px. Cursor-following elements should compute to `display: none`.

### 7. Glyph coverage (non-English only)

See design-system.md. Run it, do not assume.

### 8. Console is clean

## Screenshots

Take them, look at them, and be honest about what you see. If a photo has a finger in the frame or a stranger's face in the foreground, say so instead of shipping it.

### When the preview pane fights you

Two real behaviours worth knowing:

- **Only the first screenshot after opening a preview paints reliably.** Later ones can come back black because the pane goes `hidden` and the compositor stops. Check `document.visibilityState`.
- **A large composited layer can black out the entire capture.** A full-viewport `<video>` or a `100vh` parallax with `will-change: transform` will do it, even though the DOM underneath is fine.

The workaround that actually works: **generate standalone slice files** so the section you want sits at scroll 0, and open each one fresh.

```python
# build one file per section, with reveal animations forced on
s = open('index.html').read()
head = s.split('</head>')[0] + '''
<style>.fade,.about-image{opacity:1!important;transform:none!important;transition:none!important}</style>
</head><body>
'''
def grab(marker):
    i = s.index(marker); j = s.index('</section>', i) + 10
    return s[i:j]
open('_s1.html','w').write(head + grab('<!-- ABOUT -->') + '</body></html>')
```

Then `preview_start` each slice, `resize_window` to the height that contains it, screenshot once.

Delete the slice files when done. Leaving `_s1.html` lying around in a client project is sloppy.

## Reporting

State what you verified, with the numbers. "Verified: `Range` returns 206, video duration 15.07s, zero horizontal overflow at 390px and 1400px, all 16 assets return 200."

Then state what you did **not** verify, and any real limitation you found: file weight, image resolution, licensing, recognisable faces. Those are the things that bite in production, and the user would rather hear them from you than from their client.
