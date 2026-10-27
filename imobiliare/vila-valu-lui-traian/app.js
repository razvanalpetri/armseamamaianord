/* Vilă P+1 în Valu lui Traian, pagina proprietății
   Fără biblioteci. Pagina funcționează și fără acest fișier: linkurile de
   WhatsApp deschid conversația goală, iar telefonul merge oricum. */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- WhatsApp cu mesaj precompletat ----------------
   Numărul stă într-un singur loc, pe <body data-wa>. */
const WA = document.body.dataset.wa;
const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

document.querySelectorAll('[data-wa-text]').forEach(a => {
  a.href = waLink(a.dataset.waText);
});

/* Butoanele de vizionare (.wa-visit) poartă același mesaj; dacă vizitatorul a
   ales în secțiunea Vizionare când ar vrea să vină, preferința intră în mesaj. */
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
  const kind = a.classList.contains('wa-visit') ? 'vizionare' : 'fotografii';
  window.fbq?.('track', 'Contact', { content_name: 'Vila P+1 Valu lui Traian', content_category: kind });
  window.gtag?.('event', 'whatsapp_click', { property: 'vila-valu-lui-traian', intent: kind });
});

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
