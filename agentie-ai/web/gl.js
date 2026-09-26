/* Obiectul 3D al paginii: un nor de puncte desenat in WebGL pur, fara biblioteca.
 * Aceleasi N puncte au sase forme precalculate (sfera, coloane, ceas, unda, balon,
 * constelatie). Shaderul interpoleaza intre ele dupa uShape, iar uShape vine din
 * pozitia scroll-ului fata de sectiunile cu atributul data-shape.
 * Formele si ordinea lor sunt documentate in DESIGN.md. */
(() => {
  'use strict';
  const canvas = document.getElementById('gl');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
  if (!gl) { canvas.remove(); return; }

  const small = matchMedia('(max-width: 999px)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = small ? 5200 : 9000;

  /* ---------- generarea formelor ---------- */
  let seed = 1234567;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2831853 * v); };
  const TAU = Math.PI * 2;

  function sphere() {
    const a = new Float32Array(N * 3), R = 1.12;
    for (let i = 0; i < N; i++) {
      const y = 1 - 2 * (i + .5) / N, r = Math.sqrt(1 - y * y), ph = i * 2.399963;
      const k = R * (1 + (rnd() - .5) * .05);
      a.set([Math.cos(ph) * r * k, y * k, Math.sin(ph) * r * k], i * 3);
    }
    return a;
  }

  // sapte coloane care cresc: vanzarile urca
  function bars() {
    const a = new Float32Array(N * 3), cols = 7, w = .22, base = -1.25;
    const hs = [], areas = [];
    for (let k = 0; k < cols; k++) { const h = .38 + k * .34; hs.push(h); areas.push(4 * w * h + 2 * w * w); }
    const tot = areas.reduce((s, v) => s + v, 0);
    let i = 0;
    for (let k = 0; k < cols; k++) {
      const n = k === cols - 1 ? N - i : Math.round(N * areas[k] / tot);
      const cx = -1.2 + k * .4, h = hs[k];
      for (let j = 0; j < n && i < N; j++, i++) {
        const side = rnd() * (4 * w * h + 2 * w * w);
        let x, y, z;
        const u = rnd() - .5, v = rnd();
        if (side < 4 * w * h) {
          const f = Math.floor(side / (w * h));
          y = base + v * h;
          if (f === 0) { x = u * w; z = w / 2; } else if (f === 1) { x = u * w; z = -w / 2; }
          else if (f === 2) { x = w / 2; z = u * w; } else { x = -w / 2; z = u * w; }
        } else { x = u * w; z = (v - .5) * w; y = base + (side < 4 * w * h + w * w ? h : 0); }
        a.set([cx + x, y, z], i * 3);
      }
    }
    return a;
  }

  // ceas cu 24 de gradatii, limbile arata 23:47
  function clock() {
    const a = new Float32Array(N * 3), R = .98, rr = .045;
    const nT = Math.round(N * .55), nK = Math.round(N * .31);
    let i = 0;
    for (; i < nT; i++) {
      const t = rnd() * TAU, p = rnd() * TAU, q = R + rr * Math.cos(p);
      a.set([Math.cos(t) * q, Math.sin(t) * q, rr * Math.sin(p)], i * 3);
    }
    for (let j = 0; j < nK; j++, i++) {
      const k = Math.floor(rnd() * 24), ang = Math.PI / 2 - k / 24 * TAU;
      const len = k % 6 === 0 ? .26 : .12, r0 = 1.1 + rnd() * len, s = (rnd() - .5) * .04;
      a.set([Math.cos(ang) * r0 - Math.sin(ang) * s, Math.sin(ang) * r0 + Math.cos(ang) * s, (rnd() - .5) * .05], i * 3);
    }
    const hands = [[(23 % 12 + 47 / 60) / 12, .5], [47 / 60, .8]];
    for (; i < N; i++) {
      const [f, L] = hands[rnd() < .42 ? 0 : 1], ang = Math.PI / 2 - f * TAU, r0 = rnd() * L, s = gauss() * .018;
      a.set([Math.cos(ang) * r0 - Math.sin(ang) * s, Math.sin(ang) * r0 + Math.cos(ang) * s, gauss() * .02], i * 3);
    }
    return a;
  }

  // cinci fire de unda; faza fiecarui fir e codata in z, shaderul le misca
  function wave() {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const s = Math.floor(rnd() * 5), x = (rnd() * 2 - 1) * 1.6;
      a.set([x, gauss() * .018, (s - 2) * .11 + gauss() * .008], i * 3);
    }
    return a;
  }

  // balon de conversatie cu trei puncte „scrie..."
  const dotIdx = new Float32Array(N).fill(-1);
  function bubble() {
    const a = new Float32Array(N * 3), W = 2.2, H = 1.45, r = .46, cy = .12;
    const sx = W / 2 - r, sy = H / 2 - r, seg = [2 * sx, 2 * sy, 2 * sx, 2 * sy], arc = Math.PI / 2 * r;
    const per = seg.reduce((s, v) => s + v, 0) + 4 * arc;
    const nO = Math.round(N * .62), nTail = Math.round(N * .1);
    let i = 0;
    for (; i < nO; i++) {
      let t = rnd() * per, x, y;
      const pts = [
        () => [-sx + t, H / 2], () => [W / 2, sy - t], () => [sx - t, -H / 2], () => [-W / 2, -sy + t],
      ];
      const corners = [[sx, sy, 0], [sx, -sy, -Math.PI / 2], [-sx, -sy, Math.PI], [-sx, sy, Math.PI / 2]];
      let done = false;
      for (let e = 0; e < 4 && !done; e++) {
        if (t < seg[e]) { [x, y] = pts[e](); done = true; break; }
        t -= seg[e];
        if (t < arc) { const [ox, oy, a0] = corners[e], an = a0 + Math.PI / 2 - t / r; x = ox + Math.cos(an) * r; y = oy + Math.sin(an) * r; done = true; break; }
        t -= arc;
      }
      if (!done) { x = -W / 2; y = 0; }
      a.set([x + gauss() * .015, y + cy + gauss() * .015, gauss() * .05], i * 3);
    }
    const bx = -W / 2 + .38, by = -H / 2 + cy, tip = [-W / 2 + .05, by - .42];
    for (let j = 0; j < nTail; j++, i++) {
      const from = rnd() < .5 ? [bx, by] : [bx + .36, by], t = rnd();
      a.set([from[0] + (tip[0] - from[0]) * t + gauss() * .012, from[1] + (tip[1] - from[1]) * t + gauss() * .012, gauss() * .04], i * 3);
    }
    for (; i < N; i++) {
      const d = Math.floor(rnd() * 3), R = .13 * Math.cbrt(rnd());
      const th = rnd() * TAU, ph = Math.acos(2 * rnd() - 1);
      dotIdx[i] = d;
      a.set([(d - 1) * .48 + R * Math.sin(ph) * Math.cos(th), cy + R * Math.cos(ph), R * Math.sin(ph) * Math.sin(th)], i * 3);
    }
    return a;
  }

  // constelatie: noduri legate intre ele, integrarile
  function constellation() {
    const a = new Float32Array(N * 3), nodes = [];
    let guard = 0;
    while (nodes.length < 15 && guard++ < 4000) {
      const p = [(rnd() * 2 - 1) * 1.25, (rnd() * 2 - 1) * 1.05, (rnd() * 2 - 1) * .7];
      if ((p[0] / 1.25) ** 2 + (p[1] / 1.05) ** 2 + (p[2] / .7) ** 2 > 1) continue;
      if (nodes.every(q => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) > .48)) nodes.push(p);
    }
    const edges = new Set();
    nodes.forEach((p, i) => {
      nodes.map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2])])
        .filter(([j]) => j !== i).sort((x, y) => x[1] - y[1]).slice(0, 2)
        .forEach(([j]) => edges.add(i < j ? i + ',' + j : j + ',' + i));
    });
    const E = [...edges].map(s => s.split(',').map(Number));
    const sizes = nodes.map(() => .05 + rnd() * .07);
    const nN = Math.round(N * .36);
    for (let i = 0; i < N; i++) {
      if (i < nN) {
        const k = Math.floor(rnd() * nodes.length), p = nodes[k], s = sizes[k];
        a.set([p[0] + gauss() * s, p[1] + gauss() * s, p[2] + gauss() * s], i * 3);
      } else {
        const [m, n] = E[Math.floor(rnd() * E.length)], p = nodes[m], q = nodes[n], t = rnd();
        a.set([p[0] + (q[0] - p[0]) * t + gauss() * .01, p[1] + (q[1] - p[1]) * t + gauss() * .01, p[2] + (q[2] - p[2]) * t + gauss() * .01], i * 3);
      }
    }
    return a;
  }

  const shapes = [sphere(), bars(), clock(), wave(), bubble(), constellation()];
  const rand = new Float32Array(N * 4), meta = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    rand.set([rnd(), rnd(), rnd(), rnd() < .075 ? 1 : 0], i * 4);
    const th = rnd() * TAU, ph = Math.acos(2 * rnd() - 1), R = 2.2 + rnd() * 2.2;
    meta.set([dotIdx[i], R * Math.sin(ph) * Math.cos(th), R * Math.cos(ph), R * Math.sin(ph) * Math.sin(th)], i * 4);
  }

  /* ---------- shadere ---------- */
  const VS = `
precision highp float;
attribute vec3 p0, p1, p2, p3, p4, p5;
attribute vec4 aRand, aMeta;
uniform float uShape, uTime, uScatter, uSize, uDpr, uScale, uAspect, uFy;
uniform vec2 uOffset, uRot;
uniform vec3 uMouse;
varying float vAlpha, vAccent;

mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
float wt(float i, float seg, float f) {
  return (1. - step(.5, abs(i - seg))) * (1. - f) + (1. - step(.5, abs(i - seg - 1.))) * f;
}

void main() {
  float s = clamp(uShape, 0., 5.);
  float seg = min(floor(s), 4.);
  float d = aRand.x * .4;
  float f = smoothstep(d, d + .6, s - seg);

  vec3 a0 = rotY(uTime * .16) * p0;
  a0 *= 1. + .05 * sin(p0.y * 3. + uTime * 1.3) * sin(p0.x * 2.6 + uTime * 1.05);

  vec3 a3 = p3;
  float env = 1. - pow(abs(a3.x) / 1.6, 2.); env *= env;
  float ph = a3.z * 9.;
  a3.y += (sin(a3.x * 3. - uTime * 2.3 + ph) * .42 + sin(a3.x * 6.4 + uTime * 3.1 + ph * 1.7) * .15)
        * env * (.72 + .28 * sin(uTime * 1.2 + ph));

  vec3 a4 = p4;
  if (aMeta.x > -.5) a4.y += max(0., sin(uTime * 4.2 - aMeta.x * 1.1)) * .13;

  vec3 a5 = rotY(uTime * .1) * p5;

  vec3 pos = a0 * wt(0., seg, f) + p1 * wt(1., seg, f) + p2 * wt(2., seg, f)
           + a3 * wt(3., seg, f) + a4 * wt(4., seg, f) + a5 * wt(5., seg, f);
  pos = mix(pos, aMeta.yzw, uScatter * (.55 + .45 * aRand.x));
  pos = rotX(uRot.x) * rotY(uRot.y) * pos;
  pos *= uScale;
  pos.xy += uOffset;

  vec2 dm = pos.xy - uMouse.xy;
  float dl = length(dm);
  pos.xy += dm / max(dl, 1e-3) * uMouse.z * smoothstep(.75, 0., dl) * .32;

  float z = 6. - pos.z;
  gl_Position = vec4(pos.x * uFy / uAspect, pos.y * uFy, 0., z);
  gl_PointSize = uSize * uDpr * (.6 + aRand.y * .8) * (1. + aRand.w * .5) * (6. / z) * mix(.8, 1., uScale);
  vAlpha = mix(.3, 1., smoothstep(-1.3, 1.1, pos.z));
  vAccent = aRand.w;
}`;
  const FS = `
precision mediump float;
uniform vec3 uInk, uSignal;
uniform float uAlpha;
varying float vAlpha, vAccent;
void main() {
  float r = length(gl_PointCoord - .5);
  float a = smoothstep(.5, .34, r) * vAlpha * uAlpha;
  if (a < .01) discard;
  gl_FragColor = vec4(mix(uInk, uSignal, vAccent) * a, a);
}`;

  function sh(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  let prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) { console.warn('[veghe] WebGL dezactivat:', e.message); canvas.remove(); return; }
  gl.useProgram(prog);

  const attr = (name, data, size) => {
    const loc = gl.getAttribLocation(prog, name);
    if (loc < 0) return;
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  };
  shapes.forEach((d, k) => attr('p' + k, d, 3));
  attr('aRand', rand, 4);
  attr('aMeta', meta, 4);

  const U = {};
  ['uShape', 'uTime', 'uScatter', 'uSize', 'uDpr', 'uScale', 'uAspect', 'uFy', 'uOffset', 'uRot', 'uMouse', 'uInk', 'uSignal', 'uAlpha']
    .forEach(n => U[n] = gl.getUniformLocation(prog, n));
  // culorile din DESIGN.md, convertite din OKLCH in sRGB
  gl.uniform3f(U.uInk, .102, .082, .067);
  gl.uniform3f(U.uSignal, .933, .302, .110);
  gl.uniform1f(U.uSize, small ? 3.1 : 3.4);
  const FY = 1 / Math.tan(17.5 * Math.PI / 180);   // fov vertical 35 de grade
  gl.uniform1f(U.uFy, FY);

  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  /* ---------- dimensiuni ---------- */
  let W = 1, H = 1, aspect = 1, halfH = 6 / FY, halfW = halfH, dpr = 1;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, small ? 1.75 : 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    aspect = W / H; halfW = halfH * aspect;
    gl.uniform1f(U.uAspect, aspect); gl.uniform1f(U.uDpr, dpr);
    measure();
  }

  /* ---------- scroll -> forma, pozitie, marime ---------- */
  const anchors = [...document.querySelectorAll('[data-shape]')];
  let keys = [];
  function layout(shape) {
    if (innerWidth < 1000) {
      // obiectul sus, textul jos; marimea tinuta in latimea ecranului
      const s = Math.min(.55, halfW * .9 / 1.4);
      return { x: 0, y: halfH * .47, s };
    }
    // dreapta ecranului; coloana de text sta in stanga
    const k = shape === 0 ? .9 : shape === 3 ? .8 : .86;
    return { x: halfW * (shape === 0 ? .56 : .5), y: shape === 0 ? .04 : 0, s: k };
  }
  function measure() {
    keys = anchors.map(el => {
      const r = el.getBoundingClientRect(), top = r.top + scrollY;
      const shape = +el.dataset.shape, l = layout(shape);
      // pe mobil obiectul sta deasupra textului, deci ancora e marginea de sus a sectiunii
      const at = innerWidth < 1000 ? (shape === 0 ? 0 : top) : top + r.height / 2 - innerHeight / 2;
      return { at, shape, ...l, el };
    }).sort((a, b) => a.at - b.at);
  }
  const ss = (a, b, t) => { t = Math.min(1, Math.max(0, (t - a) / (b - a))); return t * t * (3 - 2 * t); };
  function target() {
    const y = scrollY;
    if (!keys.length) return { shape: 0, x: 0, y: 0, s: 1 };
    if (y <= keys[0].at) return keys[0];
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i], b = keys[i + 1];
      if (y <= b.at) {
        const t = ss(.18, .82, (y - a.at) / (b.at - a.at));
        let oy = a.y + (b.y - a.y) * t;
        // mobil, hero: obiectul urca odata cu pagina, ca sa nu treaca peste titlu,
        // apoi coboara inapoi in capitolul urmator
        if (a.shape === 0 && innerWidth < 1000) oy += (y - a.at) * (2 * halfH / innerHeight) * (1 - t);
        return { shape: a.shape + (b.shape - a.shape) * t, x: a.x + (b.x - a.x) * t, y: oy, s: a.s + (b.s - a.s) * t };
      }
    }
    return keys[keys.length - 1];
  }
  function anyVisible() {
    for (const el of anchors) {
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) return true;
    }
    return false;
  }

  /* ---------- pointer ---------- */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let mx = 0, my = 0, mwx = 99, mwy = 99, mStr = 0, lastMove = -1e9;
  if (fine) addEventListener('pointermove', e => {
    mx = e.clientX / W * 2 - 1; my = -(e.clientY / H * 2 - 1);
    lastMove = performance.now();
  }, { passive: true });

  /* ---------- bucla ---------- */
  const cur = { shape: 0, x: 0, y: 0, s: 1 };
  let first = true, t0 = performance.now(), wasDrawn = true, lost = false;
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); lost = true; });

  function frame(now) {
    if (lost) return;
    requestAnimationFrame(frame);
    const T = (now - t0) / 1000;
    const tg = target();
    if (first) { Object.assign(cur, tg); first = false; }
    const k = .075;
    cur.shape += (tg.shape - cur.shape) * .085;
    cur.x += (tg.x - cur.x) * k; cur.y += (tg.y - cur.y) * k; cur.s += (tg.s - cur.s) * k;

    if (!anyVisible()) {
      if (wasDrawn) { gl.clear(gl.COLOR_BUFFER_BIT); wasDrawn = false; }
      return;
    }
    wasDrawn = true;

    const intro = reduce ? 1 : Math.min(1, T / 2.2), ease = 1 - Math.pow(1 - intro, 3);
    const time = reduce ? 4 : T;

    // cursorul in coordonatele lumii (planul z = 0)
    const active = fine && now - lastMove < 2500;
    mStr += ((active ? 1 : 0) - mStr) * .06;
    mwx += (mx * halfW - mwx) * .2; mwy += (my * halfH - mwy) * .2;

    gl.uniform1f(U.uShape, cur.shape);
    gl.uniform1f(U.uTime, time);
    gl.uniform1f(U.uScatter, 1 - ease);
    gl.uniform1f(U.uAlpha, Math.min(1, intro * 1.6));
    gl.uniform1f(U.uScale, cur.s);
    gl.uniform2f(U.uOffset, cur.x, cur.y);
    const sway = reduce ? 0 : Math.sin(time * .23) * .22;
    gl.uniform2f(U.uRot, .1 + (fine ? my * .12 : 0), sway + (fine ? mx * .28 : 0));
    gl.uniform3f(U.uMouse, mwx, mwy, reduce ? 0 : mStr);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, N);
  }

  let rw = innerWidth;
  addEventListener('resize', () => {
    // pe mobil bara browserului schimba doar inaltimea; pastram canvas-ul, remasuram ancorele
    if (innerWidth !== rw || !small) { rw = innerWidth; resize(); } else measure();
  });
  addEventListener('load', measure);
  document.fonts && document.fonts.ready.then(measure);
  // continutul sectiunilor (detalii deschise, FAQ) poate schimba inaltimea paginii
  if ('ResizeObserver' in window) new ResizeObserver(() => measure()).observe(document.body);

  resize();
  requestAnimationFrame(frame);
  window.__veghe = { get state() { return { ...cur, keys: keys.map(k => [Math.round(k.at), k.shape]) }; }, N };
})();
