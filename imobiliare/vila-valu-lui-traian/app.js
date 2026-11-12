/* Vilă P+1 în Valu lui Traian, pagina proprietății
   Fără biblioteci. Pagina funcționează și fără acest fișier: linkurile de
   WhatsApp deschid conversația goală, telefonul merge oricum, calculatorul
   arată exemplul implicit, iar formularul se trimite direct către Netlify. */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- măsurare ----------------
   Trimite evenimentul în dataLayer (pentru Google Tag Manager) și prin gtag(),
   dacă Google tag a fost lipit în <head>. Fără ele, doar umple dataLayer.
   Evenimente: click_whatsapp, click_call, lead_form. */
function track(name, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const sectiune = a.closest('section[id], header, footer, .dock')?.id || a.closest('header, footer, .dock')?.className || 'pagina';
  if (a.href.startsWith('https://wa.me/')) track('click_whatsapp', { sectiune });
  else if (a.href.startsWith('tel:')) track('click_call', { sectiune });
});

/* ---------------- WhatsApp cu mesaj precompletat ----------------
   Numărul stă într-un singur loc, pe <body data-wa>. */
const WA = document.body.dataset.wa;
const WA_MSG = 'Bună ziua! Am văzut vila din Valu lui Traian (242.000 €) și aș dori să programez o vizionare.';
const waLink = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
document.querySelectorAll('.wa-visit').forEach(a => { a.href = waLink(WA_MSG); });

/* ---------------- calculatorul de rată ----------------
   rată = C·r / (1 − (1+r)^−n), cu C = preț − avans, r = dobânda/12/100, n = ani·12.
   La valorile implicite (15%, 30 de ani, 5,5%) rezultă 1.168 € pe lună. */
const calc = document.getElementById('calculator');
if (calc) {
  const PRET = 242000;
  const $ = id => document.getElementById(id);
  const eur = new Intl.NumberFormat('ro-RO', { maximumFractionDigits: 0, useGrouping: 'always' });
  const pct = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sAvans = $('c-avans'), sAni = $('c-ani'), sDob = $('c-dob');
  const ani = n => (n % 100 >= 20 || n % 100 === 0 ? `${n} de ani` : `${n} ani`);

  let shown = null, raf = 0;
  function showRate(target) {            // cifra urcă sau coboară lin spre noua valoare
    const out = $('r-rata');
    cancelAnimationFrame(raf);
    if (reduceMotion || shown === null) { shown = target; out.textContent = eur.format(target); return; }
    const from = shown, t0 = performance.now(), D = 260;
    const step = t => {
      const k = Math.min(1, (t - t0) / D);
      shown = Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3)));
      out.textContent = eur.format(shown);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  function compute() {
    const avansPct = +sAvans.value, n = +sAni.value * 12, r = +sDob.value / 12 / 100;
    const avans = PRET * avansPct / 100, credit = PRET - avans;
    const rata = credit * r / (1 - Math.pow(1 + r, -n));
    $('o-avans').textContent = `${avansPct}%`;
    $('o-ani').textContent = ani(+sAni.value);
    $('o-dob').textContent = `${pct.format(+sDob.value)}%`;
    $('r-avans').textContent = `${eur.format(avans)} €`;
    $('r-credit').textContent = `${eur.format(credit)} €`;
    $('r-venit').textContent = `${eur.format(Math.ceil(rata / 0.40 / 10) * 10)} €`;
    $('r-bar').style.setProperty('--a', avansPct / 100);
    for (const s of [sAvans, sAni, sDob]) {
      s.style.setProperty('--f', `${(s.value - s.min) / (s.max - s.min) * 100}%`);
    }
    sAvans.setAttribute('aria-valuetext', `${avansPct}%, adică ${eur.format(avans)} €`);
    sAni.setAttribute('aria-valuetext', ani(+sAni.value));
    sDob.setAttribute('aria-valuetext', `${pct.format(+sDob.value)}% pe an`);
    showRate(Math.round(rata));
  }
  calc.addEventListener('input', compute);
  compute();
}

/* ---------------- formularul de vizionare ----------------
   Se trimite către Netlify Forms fără reîncărcarea paginii. Confirmarea apare
   doar dacă serverul a răspuns cu succes; altfel apare butonul de WhatsApp,
   cu mesajul completat din formular. */
const lead = document.getElementById('lead');
if (lead) {
  const status = document.getElementById('lead-status');
  const fail = document.getElementById('lead-fail');
  const failWa = document.getElementById('lead-wa');
  const done = document.getElementById('lead-done');
  const btn = lead.querySelector('button[type="submit"]');

  // un răspuns ales poate fi scos apăsându-l din nou (câmpurile sunt opționale)
  lead.querySelectorAll('.chips input').forEach(r => {
    r.addEventListener('pointerdown', () => { r.dataset.was = r.checked ? '1' : ''; });
    r.addEventListener('click', () => { if (r.dataset.was) { r.checked = false; r.dataset.was = ''; } });
  });

  lead.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(lead);
    const get = k => (data.get(k) || '').toString().trim();
    btn.disabled = true;
    fail.hidden = true;
    status.textContent = 'Se trimite…';
    let ok = false;
    try {
      const res = await fetch(lead.getAttribute('action') || location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      ok = res.ok;
    } catch { ok = false; }
    btn.disabled = false;
    status.textContent = '';

    if (ok) {
      track('lead_form', { plata: get('plata') || 'nespus', cand: get('cand') || 'nespus' });
      lead.hidden = true;
      done.hidden = false;
      done.focus();
      return;
    }
    const lines = [WA_MSG, `Nume: ${get('nume')}`, `Telefon: ${get('telefon')}`];
    if (get('cand')) lines.push(`Pot veni: ${get('cand')}`);
    if (get('plata')) lines.push(`Plată: ${get('plata')}`);
    failWa.href = waLink(lines.join('\n'));
    fail.hidden = false;
    failWa.focus();
  });
}

/* ---------------- fotografiile și planurile, pe tot ecranul ----------------
   Un singur <dialog> pentru ambele grupuri (data-lb="foto" / "plan").
   Fără JavaScript sau fără <dialog>, linkurile deschid direct imaginea mare. */
const lb = document.getElementById('lb');
if (lb?.showModal) {
  const img = lb.querySelector('.lb-img');
  const count = lb.querySelector('.lb-count .num');
  const total = lb.querySelector('.lb-total');
  let set = [], cur = 0;
  const show = n => {
    cur = (n + set.length) % set.length;
    img.src = set[cur].href;
    img.alt = set[cur].querySelector('img').alt;
    count.textContent = cur + 1;
    new Image().src = set[(cur + 1) % set.length].href;   // următoarea, din timp
  };
  for (const group of ['foto', 'plan']) {
    const items = [...document.querySelectorAll(`a[data-lb="${group}"]`)];
    items.forEach((a, n) => a.addEventListener('click', e => {
      e.preventDefault();
      set = items;
      total.textContent = items.length;
      show(n);
      lb.showModal();
    }));
  }
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

/* ---------------- header, bara de apel, linia de progres ---------------- */
const hdr = document.getElementById('hdr');
const dock = document.getElementById('dock');
const progress = document.getElementById('progress');
const hero = document.getElementById('top');
function chrome() {
  const y = scrollY;
  hdr?.classList.toggle('solid', y > 24);
  dock?.classList.toggle('on', y > innerHeight * 0.6);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress?.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
  // emblema din hero coboară puțin mai încet decât pagina
  if (hero && !reduceMotion && y < hero.offsetHeight) hero.style.setProperty('--sy', (y * 0.14).toFixed(1));
}
addEventListener('scroll', chrome, { passive: true });
addEventListener('resize', chrome);
chrome();

/* ---------------- apariția la scroll ----------------
   IntersectionObserver ratează elemente la saltul programatic spre ancore,
   de aceea măturăm manual la fiecare scroll. .stagger își arată copiii pe rând. */
document.querySelectorAll('.stagger').forEach(el => {
  [...el.children].forEach((kid, i) => kid.style.setProperty('--i', i));
});
function countUp(el) {                    // cifrele din secțiunea dezvoltatorului
  const target = +el.dataset.count, t0 = performance.now(), D = 1100;
  const step = t => {
    const k = Math.min(1, (t - t0) / D);
    el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  };
  el.textContent = '0';
  requestAnimationFrame(step);
}
const reveals = [...document.querySelectorAll('.reveal, .stagger')];
function sweep() {
  const vh = innerHeight;
  for (const el of reveals) {
    if (el.classList.contains('in')) continue;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) {
      el.classList.add('in');
      el.querySelectorAll('[data-count]').forEach(countUp);
    }
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
