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
const intro = document.getElementById('heroIntro');

// Cartonul de titlu. Doua praguri, nu unul: valul de cerneala pleaca primul si
// descopera turul, iar numele mai sta cateva procente peste imagine inainte sa
// plece si el. Daca ar pleca odata, ar arata a preloader care se stinge.
const VEIL_END = 0.042;   // pana aici se ridica fundalul
const WM_END   = 0.075;   // pana aici sta logotipul

// Cate o eticheta per clip: fiecare segment de scroll e o tranzitie de camera
// dintr-o incapere in urmatoarea, si eticheta face tranzitia vizibila.
const STAGES = [
  [0.00, 'Piscină'],
  [0.25, 'Living'],
  [0.50, 'Bucătărie'],
  [0.75, 'Dormitor'],
];

const heroLines = [...document.querySelectorAll('.hero-line')];
let curSeg = 0;
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

  // Fiecare segment de scroll are mesajul lui. Indexul se calculeaza din
  // aceleasi praguri ca etichetele de incapere, ca textul si eticheta sa se
  // schimbe in acelasi moment.
  let seg = 0;
  for (let k = 0; k < STAGES.length; k++) if (p >= STAGES[k][0]) seg = k;
  if (seg !== curSeg) {
    curSeg = seg;
    for (const el of heroLines) el.classList.toggle('on', +el.dataset.seg === seg);
  }

  // h <= 0 inseamna erou fara inaltime de derulare, adica prefers-reduced-motion.
  // Acolo p ramane 0 pentru totdeauna: valul nu s-ar ridica niciodata, iar
  // opacitatea 0 scrisa inline pe titlu ar bate orice regula din foaia de stil,
  // pentru ca stilul inline castiga. Deci nu scriem nimic si lasa CSS-ul, care
  // are un carton static pregatit exact pentru cazul asta.
  if (intro && h > 0) {
    const veil = 1 - clamp(p / VEIL_END);
    const wm = 1 - clamp(p / WM_END);
    intro.style.setProperty('--veil', veil.toFixed(3));
    intro.style.setProperty('--wm', wm.toFixed(3));
    // scos din compunere cand nu mai are ce arata: altfel un strat de ecran
    // intreg cu opacity 0 ramane in stiva la fiecare cadru al scrub-ului
    intro.style.visibility = wm < 0.002 ? 'hidden' : 'visible';
    if (hdr) hdr.classList.toggle('revealed', wm < 0.45);
    // Titlul intra exact pe cat iese marca. Fara asta cele doua se suprapun in
    // tranzitie si se citesc doua mesaje deodata peste aceeasi imagine.
    if (heroContent) heroContent.style.opacity = (1 - wm).toFixed(3);
  }

  if (stageBar) stageBar.style.width = (p * 100).toFixed(2) + '%';
  if (stageNow) {
    let label = STAGES[0][1];
    for (const [at, name] of STAGES) if (p >= at) label = name;
    if (stageNow.textContent !== label) stageNow.textContent = label;
  }
}
/* ---------------- header ----------------
   Declarat inaintea primei chemari a lui heroTick: `const` nu se ridica
   utilizabil, iar heroTick il citeste ca sa comute .revealed. */
const hdr = document.querySelector('.hdr');

addEventListener('scroll', heroTick, { passive: true });
addEventListener('resize', heroTick);
heroTick();

// Fara carton de titlu nimic nu ar mai comuta .revealed si marca ar ramane
// invizibila. Plasa de siguranta, nu cale normala.
if (hdr && !intro) hdr.classList.add('revealed');

/* fundal plin dupa erou */
function hdrTick() {
  if (!hdr || !hero) return;
  hdr.classList.toggle('solid', scrollY > hero.offsetHeight - innerHeight * 0.6);
}
addEventListener('scroll', hdrTick, { passive: true });
addEventListener('resize', hdrTick);
hdrTick();

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
