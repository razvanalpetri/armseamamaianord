/* Alpetri Real Estate, landing page
   Fără biblioteci. Pagina funcționează și fără acest fișier: linkurile de
   WhatsApp deschid conversația goală, iar formularul trimite doar textul. */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- WhatsApp cu mesaj precompletat ----------------
   Numărul stă într-un singur loc, pe <body data-wa>. */
const WA = document.body.dataset.wa;
const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

document.querySelectorAll('[data-wa-text]').forEach(a => {
  a.href = waLink(a.dataset.waText);
});

const form = document.getElementById('composer');
if (form) {
  form.action = `https://wa.me/${WA}`;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const svc = form.querySelector('#f-svc').value.trim();
    const name = form.querySelector('#f-name').value.trim();
    const msg = form.querySelector('#f-msg').value.trim();
    const lines = [name ? `Bună ziua! Mă numesc ${name}.` : 'Bună ziua!'];
    if (svc) lines.push(`Mă interesează: ${svc}.`);
    if (msg) lines.push(`Despre proprietate: ${msg}`);
    // Un link real, nu window.open: cu 'noopener', window.open întoarce mereu
    // null, deci nu se poate ști dacă fila s-a deschis sau a fost blocată. Linkul
    // rămâne vizibil sub buton, pentru cazul în care deschiderea a fost blocată.
    const open = document.getElementById('composer-open');
    open.href = waLink(lines.join('\n'));
    open.hidden = false;
    open.click();
  });
}

/* ---------------- header și bara de apel ---------------- */
const hdr = document.getElementById('hdr');
const dock = document.getElementById('dock');
function chrome() {
  const y = scrollY;
  hdr?.classList.toggle('solid', y > 24);
  dock?.classList.toggle('on', y > innerHeight * 0.6);
}
addEventListener('scroll', chrome, { passive: true });
addEventListener('resize', chrome);
chrome();

/* ---------------- apariția la scroll ----------------
   IntersectionObserver ratează elemente la saltul programatic spre ancore,
   de aceea măturăm manual la fiecare scroll. */
const reveals = [...document.querySelectorAll('.reveal')];
function sweep() {
  const vh = innerHeight;
  for (const el of reveals) {
    if (el.classList.contains('in')) continue;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
  }
}
if (reduceMotion) {
  reveals.forEach(el => el.classList.add('in'));
} else {
  addEventListener('scroll', sweep, { passive: true });
  addEventListener('resize', sweep);
  // dublul rAF: fără el, clasa se adaugă în același cadru în care elementul se
  // desenează prima oară, browserul comasează stările și tranziția nu mai rulează
  requestAnimationFrame(() => requestAnimationFrame(sweep));
  addEventListener('load', sweep);
  document.fonts?.ready.then(sweep);
}

/* ---------------- paralaxă pe banner, doar cu mouse ----------------
   Straturile se mișcă diferit (emblema în spate, ALPETRI în față), ceea ce dă
   adâncime. Valorile ajung în CSS prin --px / --py, între -1 și 1. */
const stage = document.getElementById('stage');
const hero = document.getElementById('top');
if (stage && hero && !reduceMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let raf = 0, px = 0, py = 0;
  hero.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    px = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
    py = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    if (!raf) raf = requestAnimationFrame(() => {
      stage.style.setProperty('--px', px.toFixed(3));
      stage.style.setProperty('--py', py.toFixed(3));
      raf = 0;
    });
  });
  hero.addEventListener('pointerleave', () => {
    stage.style.setProperty('--px', 0);
    stage.style.setProperty('--py', 0);
  });
}

/* ---------------- anul din footer ---------------- */
const year = document.querySelector('.ftr-legal .num');
if (year) year.textContent = new Date().getFullYear();
