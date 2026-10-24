/* ALPETRI PROPERTIES SEASON, pagina de campanie
   Fără biblioteci. Fără acest fișier pagina rămâne pe varianta implicită și
   butoanele deschid conversația de WhatsApp fără mesaj. */

const CAMPAIGN = 'ALPETRI PROPERTIES SEASON';
const PERSONAS = ['investitie', 'locuinta'];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const WA = body.dataset.wa;

/* ---------------- varianta: investiție sau locuință ----------------
   Se alege din link (#investitie, #locuinta sau ?pentru=…), altfel rămâne cea
   din HTML. La schimbare, adresa se actualizează ca linkul copiat să păstreze
   varianta, fără să sară pagina. */
function personaFromUrl() {
  const hash = location.hash.slice(1);
  if (PERSONAS.includes(hash)) return hash;
  const q = new URLSearchParams(location.search).get('pentru');
  return PERSONAS.includes(q) ? q : null;
}

let persona = personaFromUrl() || body.dataset.persona;
const chosen = {};                       // răspunsurile opționale din CTA-ul final

function setPersona(next, { updateUrl = true } = {}) {
  if (!PERSONAS.includes(next)) return;
  persona = next;
  body.dataset.persona = next;
  document.querySelectorAll('[data-persona-btn]').forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.personaBtn === next)));
  if (updateUrl) {
    try { history.replaceState(null, '', '#' + next); } catch (e) { /* adresă blocată în preview */ }
  }
  refreshLinks();
  loadVsl();
  requestAnimationFrame(sweep);          // elementele abia afișate trebuie și ele dezvăluite
}

document.querySelectorAll('[data-persona-btn]').forEach(b =>
  b.addEventListener('click', () => setPersona(b.dataset.personaBtn)));

addEventListener('hashchange', () => {
  const p = personaFromUrl();
  if (!p) return;
  setPersona(p, { updateUrl: false });
  scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* ---------------- mesajul de WhatsApp ---------------- */
function message() {
  const lines = [`Bună ziua! Vin din campania ${CAMPAIGN}.`];
  if (persona === 'investitie') {
    lines.push('Caut o proprietate pentru investiție.');
    if (chosen.buget) lines.push(`Buget aproximativ: ${chosen.buget}.`);
    if (chosen.obiectiv) lines.push(`Obiectiv: ${chosen.obiectiv}.`);
  } else {
    lines.push('Caut o locuință nouă.');
    if (chosen.buget) lines.push(`Buget aproximativ: ${chosen.buget}.`);
    if (chosen.tip) lines.push(`Tip de locuință: ${chosen.tip}.`);
  }
  lines.push('Aș dori consultanță gratuită și opțiunile care mi se potrivesc.');
  return lines.join('\n');
}

const ctas = [...document.querySelectorAll('.wa-cta')];
function refreshLinks() {
  const href = `https://wa.me/${WA}?text=${encodeURIComponent(message())}`;
  ctas.forEach(a => { a.href = href; });
}

// conversia: Meta Pixel și Google, doar dacă au fost lipite în <head>
function track(event, data) {
  try { if (typeof window.fbq === 'function') window.fbq('track', event === 'whatsapp_click' ? 'Contact' : 'ViewContent', data); } catch (e) { /* fără pixel */ }
  try { if (typeof window.gtag === 'function') window.gtag('event', event, data); } catch (e) { /* fără analytics */ }
}
ctas.forEach(a => a.addEventListener('click', () => {
  refreshLinks();                        // mesajul cu ultimele alegeri, chiar înainte de navigare
  track('whatsapp_click', { persona });
}));

// alegerile opționale: una pe grup, a doua apăsare o deselectează
document.querySelectorAll('.chips').forEach(group => {
  const key = group.dataset.group;
  group.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') !== 'true';
    group.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', String(on));
    chosen[key] = on ? btn.dataset.value : '';
    refreshLinks();
  }));
});

/* ---------------- VSL ----------------
   Linkul stă pe #vsl, câte unul pentru fiecare variantă. YouTube, Vimeo sau un
   fișier video. Playerul se încarcă abia la apăsare: pagina rămâne rapidă și
   nu trimite nimic la YouTube până nu vrea vizitatorul. */
const vsl = document.getElementById('vsl');
const vslPlayer = document.getElementById('vslPlayer');
const vslPlay = document.getElementById('vslPlay');
const cap = s => s[0].toUpperCase() + s.slice(1);

function parseVideo(src) {
  if (!src) return null;
  let m = src.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  if (m) return { type: 'youtube', id: m[1] };
  m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return { type: 'vimeo', id: m[1] };
  return { type: 'file', src };
}

let video = null;
function loadVsl() {
  if (!vsl) return;
  const own = vsl.dataset['src' + cap(persona)];
  const other = vsl.dataset['src' + cap(PERSONAS.find(p => p !== persona))];
  video = parseVideo((own || other || '').trim());
  vslPlayer.replaceChildren();
  vsl.classList.remove('is-playing', 'has-poster');
  vsl.querySelector('.vsl-poster')?.remove();
  vsl.classList.toggle('is-empty', !video);
  if (!video) return;

  const custom = (vsl.dataset['poster' + cap(persona)] || '').trim();
  const poster = custom || (video.type === 'youtube' ? `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg` : '');
  if (poster) {
    const img = Object.assign(document.createElement('img'), { className: 'vsl-poster', alt: '', src: poster, decoding: 'async' });
    // unele videoclipuri nu au copertă la rezoluție mare
    if (!custom && video.type === 'youtube') img.addEventListener('error', () => {
      img.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
    }, { once: true });
    vsl.insertBefore(img, vslPlayer);
    vsl.classList.add('has-poster');
  }
}

vslPlay?.addEventListener('click', () => {
  if (!video) return;
  let el;
  if (video.type === 'youtube' || video.type === 'vimeo') {
    el = document.createElement('iframe');
    el.src = video.type === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
      : `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`;
    el.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    el.allowFullscreen = true;
    el.title = 'Videoclipul de prezentare ALPETRI PROPERTIES SEASON';
  } else {
    el = Object.assign(document.createElement('video'), { src: video.src, controls: true, autoplay: true, playsInline: true });
  }
  vslPlayer.replaceChildren(el);
  vsl.classList.add('is-playing');
  track('vsl_play', { persona });
});

/* ---------------- header și butonul fix de pe telefon ----------------
   Butonul apare după hero și se ascunde când CTA-ul final e pe ecran, ca să nu
   fie două butoane identice unul peste altul. */
const hdr = document.getElementById('hdr');
const dock = document.getElementById('dock');
const finalCta = document.getElementById('consultanta');
function chrome() {
  hdr?.classList.toggle('solid', scrollY > 24);
  if (dock) {
    const r = finalCta?.getBoundingClientRect();
    const finalVisible = r && r.top < innerHeight && r.bottom > 0;
    dock.classList.toggle('on', scrollY > innerHeight * 0.75 && !finalVisible);
  }
}
addEventListener('scroll', chrome, { passive: true });
addEventListener('resize', chrome);

/* ---------------- apariția la scroll ----------------
   Măturare manuală la scroll: IntersectionObserver ratează elemente la saltul
   programatic spre ancore. */
const reveals = [...document.querySelectorAll('.reveal')];
function sweep() {
  if (reduceMotion) { reveals.forEach(el => el.classList.add('in')); return; }
  const vh = innerHeight;
  for (const el of reveals) {
    if (el.classList.contains('in')) continue;
    const r = el.getBoundingClientRect();
    if (r.height && r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
  }
}
addEventListener('scroll', sweep, { passive: true });
addEventListener('resize', sweep);
addEventListener('load', sweep);
document.fonts?.ready.then(sweep);

/* ---------------- pornire ---------------- */
setPersona(persona, { updateUrl: false });
chrome();
// dublul rAF: fără el, clasa se adaugă în același cadru în care elementul se
// desenează prima oară și tranziția nu mai rulează
requestAnimationFrame(() => requestAnimationFrame(sweep));

const year = document.querySelector('.ftr-legal .num');
if (year) year.textContent = new Date().getFullYear();
