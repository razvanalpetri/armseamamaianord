/* Alpetri Capital
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
  [0.00, 'Analiză'],
  [0.22, 'Verificare'],
  [0.48, 'Negociere'],
  [0.74, 'Semnătură'],
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

/* =====================================================================
   Alpetri Capital, efecte si interactiuni adaugate
   ===================================================================== */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------------- bara de progres a paginii ---------------- */
const pageBar = document.getElementById('pageBar');
const hdr = document.getElementById('hdr');
function progressTick() {
  if (hdr && hero) hdr.classList.toggle('solid', hero.getBoundingClientRect().bottom < 80);
  const max = document.documentElement.scrollHeight - innerHeight;
  if (pageBar) pageBar.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max) : 0})`;
}
addEventListener('scroll', progressTick, { passive: true });
addEventListener('resize', progressTick);
progressTick();

/* ---------------- lumina care urmareste cursorul ---------------- */
const glow = document.getElementById('glow');
if (glow && fine && !reduce) {
  let gx = innerWidth / 2, gy = innerHeight / 2, tx = gx, ty = gy;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; glow.classList.add('on'); }, { passive: true });
  document.addEventListener('mouseleave', () => glow.classList.remove('on'));
  (function glowLoop() {
    gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08;
    glow.style.transform = `translate3d(${gx.toFixed(1)}px,${gy.toFixed(1)}px,0)`;
    requestAnimationFrame(glowLoop);
  })();
}

/* ---------------- butoane magnetice ---------------- */
if (fine && !reduce) {
  document.querySelectorAll('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.32;
      b.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
    });
    b.addEventListener('mouseleave', () => {
      b.style.transition = 'transform .5s cubic-bezier(.2,.75,.15,1), color .35s ease, border-color .35s ease';
      b.style.transform = '';
      setTimeout(() => { b.style.transition = ''; }, 500);
    });
  });
}

/* ---------------- piloni: inclinare 3D + reflex de lumina ---------------- */
if (fine && !reduce) {
  document.querySelectorAll('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      // .fade.visible pune transform:none; inline-ul de aici il suprascrie doar la hover
      el.style.transform = `perspective(1100px) rotateX(${((0.5 - py) * 4).toFixed(2)}deg) rotateY(${((px - 0.5) * 5).toFixed(2)}deg)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ---------------- checklist bifat pe masura ce se deruleaza ---------------- */
const checks = [...document.querySelectorAll('#checks li')];
const meterFg = document.getElementById('meterFg');
const meterN = document.getElementById('meterN');
const meterState = document.getElementById('meterState');
const meter = document.querySelector('.meter');
const CIRC = 2 * Math.PI * 52;
let lastDone = -1;
function checksTick() {
  if (!checks.length) return;
  const line = innerHeight * 0.62;   // un punct e bifat cand trece de 62% din ecran
  let done = 0;
  for (const li of checks) {
    const on = reduce || li.getBoundingClientRect().top < line;
    li.classList.toggle('on', on);
    if (on) done++;
  }
  if (done === lastDone) return;
  lastDone = done;
  if (meterFg) meterFg.style.strokeDashoffset = (CIRC * (1 - done / checks.length)).toFixed(2);
  if (meterN) meterN.textContent = done;
  const complete = done === checks.length;
  meter?.classList.toggle('done', complete);
  if (meterState) meterState.textContent = complete ? 'Dosar verificat, puteți semna'
    : done === 0 ? 'Dosar deschis' : 'Verificare în curs';
}
addEventListener('scroll', checksTick, { passive: true });
addEventListener('resize', checksTick);
checksTick();

/* ---------------- calculator de comision ---------------- */
(function calc() {
  const box = document.getElementById('calc');
  if (!box) return;
  const tabs = [...box.querySelectorAll('.calc-tab')];
  const input = document.getElementById('calcInput');
  const range = document.getElementById('calcRange');
  const out = document.getElementById('calcOut');
  const label = document.getElementById('calcLabel');
  const outLbl = document.getElementById('calcOutLbl');
  const note = document.getElementById('calcNote');
  const cur = document.getElementById('calcCur');
  const fmt = n => Math.round(n).toLocaleString('ro-RO');

  const MODES = {
    sale: { min: 20000, max: 1000000, step: 5000, val: 150000, cur: '€',
      label: 'Prețul de vânzare', outLbl: 'Comision Alpetri Capital, 3%',
      note: 'Se plătește o singură dată, la semnarea contractului de vânzare.',
      fee: v => v * 0.03 },
    rent: { min: 200, max: 5000, step: 50, val: 600, cur: '€ / lună',
      label: 'Chiria lunară', outLbl: 'Comision Alpetri Capital, o chirie',
      note: 'Echivalentul unei chirii lunare, plătit o singură dată, la semnarea contractului.',
      fee: v => v },
  };
  let mode = 'sale', shown = 0, anim = 0;

  function animateTo(v) {
    cancelAnimationFrame(anim);
    const from = shown, t0 = performance.now(), dur = reduce ? 0 : 420;
    (function step(t) {
      const k = dur ? Math.min(1, (t - t0) / dur) : 1;
      shown = from + (v - from) * (1 - Math.pow(1 - k, 3));
      out.textContent = fmt(shown) + ' €';
      if (k < 1) anim = requestAnimationFrame(step);
    })(t0);
  }
  function fill() {
    const p = (range.value - range.min) / (range.max - range.min) * 100;
    range.style.setProperty('--fill', p.toFixed(1) + '%');
  }
  function update(v, fromRange) {
    const m = MODES[mode];
    v = Math.max(0, Math.min(v || 0, m.max * 20));
    if (!fromRange) range.value = Math.max(m.min, Math.min(m.max, v));
    if (document.activeElement !== input || fromRange) input.value = fmt(v);
    fill();
    animateTo(m.fee(v));
  }
  function setMode(next) {
    mode = next;
    const m = MODES[mode];
    box.classList.toggle('rent', mode === 'rent');
    tabs.forEach(t => { const on = t.dataset.mode === mode; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on); });
    Object.assign(range, { min: m.min, max: m.max, step: m.step });
    range.value = m.val;
    label.textContent = m.label; outLbl.textContent = m.outLbl; note.textContent = m.note; cur.textContent = m.cur;
    update(m.val, true);
  }

  tabs.forEach(t => t.addEventListener('click', () => setMode(t.dataset.mode)));
  range.addEventListener('input', () => update(+range.value, true));
  input.addEventListener('input', () => {
    const v = +input.value.replace(/\D/g, '');
    update(v, false);
  });
  input.addEventListener('blur', () => { input.value = fmt(+input.value.replace(/\D/g, '')); });
  setMode('sale');
})();

/* ---------------- formular de callback ----------------
   Nu exista backend: formularul deschide un email precompletat catre agentie.
   La publicare se poate lega la Formspree, Netlify Forms sau un CRM. */
(function callback() {
  const f = document.getElementById('cbForm');
  if (!f) return;
  const msg = document.getElementById('cbMsg');
  f.addEventListener('submit', e => {
    e.preventDefault();
    const nume = f.nume.value.trim(), tel = f.tel.value.trim(), tip = f.tip.value;
    f.nume.classList.toggle('err', !nume);
    const telOk = tel.replace(/\D/g, '').length >= 9;
    f.tel.classList.toggle('err', !telOk);
    if (!nume || !telOk) { msg.textContent = 'Completați numele și un număr de telefon valid.'; return; }
    const body = `Nume: ${nume}\nTelefon: ${tel}\nInteresat de: ${tip}`;
    location.href = `mailto:contact@alpetricapital.ro?subject=${encodeURIComponent('Solicitare apel: ' + tip)}&body=${encodeURIComponent(body)}`;
    msg.textContent = `Mulțumim, ${nume.split(' ')[0]}. Vă sunăm în aceeași zi lucrătoare.`;
    f.reset();
  });
})();
