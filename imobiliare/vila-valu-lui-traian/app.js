/* Vilă P+1 în Valu lui Traian, pagina proprietății
   Fără biblioteci. Pagina funcționează și fără acest fișier: linkurile de
   WhatsApp deschid conversația goală, iar telefonul merge oricum. */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- WhatsApp cu mesaj precompletat ----------------
   Numărul stă într-un singur loc, pe <body data-wa>. */
const WA = document.body.dataset.wa;
const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

/* Toate butoanele de WhatsApp (.wa-visit) poartă același mesaj; dacă vizitatorul
   a ales în secțiunea Vizionare când ar vrea să vină, preferința intră în mesaj. */
const chips = document.querySelector('.chips[data-group="cand"]');
function visitMessage() {
  const lines = ['Bună ziua! Mă interesează vila P+1 din Valu lui Traian (242.000 €, TVA inclus).'];
  lines.push('Aș dori să programez o vizionare.');
  const pick = chips?.querySelector('[aria-pressed="true"]');
  if (pick) lines.push(`Prefer: ${pick.dataset.value}.`);
  return lines.join('\n');
}
function refreshVisit() {
  const href = waLink(visitMessage());
  document.querySelectorAll('.wa-visit').forEach(a => { a.href = href; });
}
refreshVisit();

chips?.addEventListener('click', e => {
  const b = e.target.closest('button[data-value]');
  if (!b) return;
  const on = b.getAttribute('aria-pressed') !== 'true';
  chips.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', 'false'));
  b.setAttribute('aria-pressed', String(on));   // a doua apăsare deselectează
  refreshVisit();
});

/* Evenimentul de conversie pentru Meta Pixel și Google Analytics, dacă au fost
   lipite în <head>. Fără ele, nu se întâmplă nimic. */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="https://wa.me/"]');
  if (!a) return;
  window.fbq?.('track', 'Contact', { content_name: 'Vila P+1 Valu lui Traian' });
  window.gtag?.('event', 'whatsapp_click', { property: 'vila-valu-lui-traian' });
});

/* ---------------- fotografiile, pe tot ecranul ----------------
   Fără JavaScript sau fără <dialog>, linkurile deschid direct fotografia mare. */
const lb = document.getElementById('lb');
const shots = [...document.querySelectorAll('.photos a')];
if (lb?.showModal && shots.length) {
  const img = lb.querySelector('.lb-img');
  const count = lb.querySelector('.lb-count .num');
  let cur = 0;
  const show = n => {
    cur = (n + shots.length) % shots.length;
    img.src = shots[cur].href;
    img.alt = shots[cur].querySelector('img').alt;
    count.textContent = cur + 1;
    new Image().src = shots[(cur + 1) % shots.length].href;   // următoarea, din timp
  };
  shots.forEach((a, n) => a.addEventListener('click', e => {
    e.preventDefault();
    show(n);
    lb.showModal();
  }));
  lb.querySelector('.lb-prev').addEventListener('click', () => show(cur - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(cur + 1));
  lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });   // clic pe fundal
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  // glisare pe telefon
  let x0 = null;
  img.addEventListener('pointerdown', e => { x0 = e.clientX; });
  img.addEventListener('pointerup', e => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
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

/* ---------------- anul din footer ---------------- */
const year = document.querySelector('.ftr-legal .num');
if (year) year.textContent = new Date().getFullYear();
