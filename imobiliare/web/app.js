/* Alpetri Real Estate
   Fara Lenis si fara alta biblioteca de smooth scroll: rup position:sticky,
   iar lerp-ul din bucla de scrub da exact netezimea pentru care ar fi adaugate. */

const clamp = v => Math.min(1, Math.max(0, v));

/* ---------------- sursa video, in functie de latime ----------------
   Fisierul all-keyframe e mare prin constructie. Telefonul primeste varianta
   mica. Se seteaza inainte de incarcare, altfel se descarca ambele. */
(function pickSource() {
  const v = document.getElementById('heroVideo');
  if (!v) return;
  const small = innerWidth <= 820 ||
    (navigator.connection && /2g|3g/.test(navigator.connection.effectiveType || ''));
  if (!small) return;
  // Se rescrie <source>, nu atributul src al lui <video>: un src pe element ar
  // dezactiva complet lista de surse si ar rupe fallback-ul WebM.
  const mp4 = document.getElementById('srcMp4');
  if (mp4) mp4.src = 'media/hero-sm.mp4';
  v.load();
})();

/* ---------------- scrub ---------------- */
const hero = document.getElementById('top');
const vid = document.getElementById('heroVideo');
const heroContent = document.getElementById('heroContent');
const stageNow = document.getElementById('stageNow');
const stageBar = document.getElementById('stageBar');

const STAGES = [
  [0.00, 'Teren'],
  [0.22, 'Structură'],
  [0.48, 'Fațadă'],
  [0.74, 'Recepție'],
];

let ready = false, target = 0, cur = 0;
const mark = () => { ready = true; vid.pause(); };
vid.addEventListener('loadedmetadata', mark);
vid.addEventListener('loadeddata', mark);
if (vid.readyState >= 1) mark();

(function loop() {
  if (ready && vid.duration) {
    cur += (target - cur) * 0.11;
    if (Math.abs(vid.currentTime - cur) > 0.004) {
      try { vid.currentTime = cur; } catch (e) { /* seek ignorat in tranzitie */ }
    }
  }
  requestAnimationFrame(loop);
})();

function heroTick() {
  if (!hero) return;
  const r = hero.getBoundingClientRect();
  const h = hero.offsetHeight - innerHeight;
  const p = h > 0 ? clamp(-r.top / h) : 0;

  if (ready && vid.duration) target = p * (vid.duration - 0.05);

  // titlul se ridica odata ce incepe partea interesanta din clip
  const out = clamp((p - 0.42) / 0.2);
  heroContent.style.opacity = (1 - out).toFixed(3);
  heroContent.style.transform = `translateY(${-out * 56}px)`;

  if (stageBar) stageBar.style.width = (p * 100).toFixed(2) + '%';
  if (stageNow) {
    let label = STAGES[0][1];
    for (const [at, name] of STAGES) if (p >= at) label = name;
    if (stageNow.textContent !== label) stageNow.textContent = label;
  }
}
addEventListener('scroll', heroTick, { passive: true });
addEventListener('resize', heroTick);
heroTick();

/* ---------------- reveal la scroll ----------------
   IntersectionObserver rateaza elemente la saltul programatic al ancorelor,
   deci maturam manual. */
const reveals = [...document.querySelectorAll('.fade')];
function sweep() {
  const vh = innerHeight;
  for (const el of reveals) {
    if (el.dataset.shown) continue;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.9 && r.bottom > 0) { el.dataset.shown = '1'; el.classList.add('visible'); }
  }
}
addEventListener('scroll', sweep, { passive: true });
addEventListener('resize', sweep);
// dublul rAF nu e superstitie: sweep sincron la parsare adauga .visible in
// acelasi frame in care elementul se randeaza prima data, browserul comaseaza
// cele doua stari si tranzitia nu ruleaza niciodata.
requestAnimationFrame(() => requestAnimationFrame(sweep));
addEventListener('load', sweep);
document.fonts?.ready.then(sweep);

/* ---------------- marquee, condus de viteza scroll-ului ---------------- */
const marquees = [...document.querySelectorAll('.marquee')].map(el => ({
  el, dir: el.classList.contains('reverse') ? -1 : 1, x: 0, half: 0,
}));
function measure() { for (const m of marquees) m.half = m.el.scrollWidth / 2; }
addEventListener('resize', measure);
addEventListener('load', measure);
document.fonts?.ready.then(measure);
measure();

let lastY = scrollY, vel = 0;
addEventListener('scroll', () => {
  vel += (scrollY - lastY) * 0.06;   // factor mic, altfel zboara
  lastY = scrollY;
  vel = Math.max(-6, Math.min(6, vel));
}, { passive: true });

(function mqLoop() {
  vel *= 0.92;
  for (const m of marquees) {
    if (!m.half) continue;
    m.x -= (0.35 + vel) * m.dir;
    m.x = ((m.x % m.half) + m.half) % m.half;   // continutul e duplicat exact de doua ori
    m.el.style.transform = `translate3d(${-m.x}px,0,0)`;
  }
  requestAnimationFrame(mqLoop);
})();

/* ---------------- imaginea care urmareste cursorul peste lista ---------------- */
const items = [...document.querySelectorAll('.folio-item')];
const figs = [...document.querySelectorAll('.hover-fig')];
const list = document.getElementById('folioList');
let mx = 0, my = 0, fx = 0, fy = 0, on = false;

items.forEach(it => it.addEventListener('mouseenter', () => {
  figs.forEach(f => f.classList.remove('active'));
  const f = figs[+it.dataset.img];
  if (f) { f.classList.add('active'); on = true; }
}));
list?.addEventListener('mouseleave', () => { figs.forEach(f => f.classList.remove('active')); on = false; });
addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (!on) { fx = mx; fy = my; }   // altfel imaginea zboara din ultima pozitie cand reapare
}, { passive: true });

(function figLoop() {
  fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
  const t = `translate3d(${(fx - 140).toFixed(1)}px,${(fy - 170).toFixed(1)}px,0)`;
  for (const f of figs) if (f.classList.contains('active')) f.style.transform = t;
  requestAnimationFrame(figLoop);
})();

/* ---------------- parallax pe statement ---------------- */
const stBg = document.getElementById('stBg');
if (stBg) {
  const sec = stBg.parentElement;
  addEventListener('scroll', () => {
    const r = sec.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;   // cull ieftin
    const p = (innerHeight - r.top) / (innerHeight + r.height);
    stBg.style.transform = `translateY(${((p - 0.5) * 16).toFixed(2)}%)`;
  }, { passive: true });
}

/* ---------------- before / after ---------------- */
const box = document.getElementById('ba');
if (box) {
  const aft = box.querySelector('.aft');
  const handle = document.getElementById('baHandle');
  let drag = false;

  const set = x => {
    const r = box.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (x - r.left) / r.width));
    aft.style.clipPath = `inset(0 0 0 ${p * 100}%)`;
    handle.style.insetInlineStart = `${p * 100}%`;
  };

  box.addEventListener('mousedown', e => { drag = true; set(e.clientX); });
  box.addEventListener('touchstart', e => { drag = true; set(e.touches[0].clientX); }, { passive: true });
  addEventListener('mousemove', e => { if (drag) set(e.clientX); });
  addEventListener('touchmove', e => {
    if (drag) { e.preventDefault(); set(e.touches[0].clientX); }
  }, { passive: false });
  addEventListener('mouseup', () => { drag = false; });
  addEventListener('touchend', () => { drag = false; });

  // urmarirea fara drag doar unde exista hover real, altfel touch-ul primeste
  // evenimente de mouse sintetice si bara sare aiurea
  box.addEventListener('mousemove', e => {
    if (!drag && matchMedia('(hover:hover)').matches) set(e.clientX);
  });
}

/* ---------------- ancore ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = id ? document.getElementById(id) : null;
    if (!el) return;
    e.preventDefault();
    scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: 'smooth' });
  });
});
