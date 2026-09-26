/* Interactiunile paginii, in afara de obiectul 3D (gl.js). */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = v => Math.min(1, Math.max(0, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = n => Math.round(n).toLocaleString('ro-RO');

  /* ---------- header plin dupa hero ---------- */
  const hdr = $('#hdr');
  const hdrTick = () => hdr.classList.toggle('solid', scrollY > 40);

  /* ---------- reveal, sweep legat de scroll (IntersectionObserver rateaza salturile de ancora) ---------- */
  const reveals = $$('.fade');
  function sweep() {
    const vh = innerHeight;
    for (const el of reveals) {
      if (el.dataset.shown) continue;
      const r = el.getBoundingClientRect();
      if (r.top < vh * .9 && r.bottom > 0) { el.dataset.shown = '1'; el.classList.add('visible'); }
    }
  }

  /* ---------- marquee condus de viteza scroll-ului ---------- */
  const mq = $('#mq1');
  let mqHalf = 0, mqX = 0, vel = 0, lastY = scrollY;
  const mqMeasure = () => { mqHalf = mq.scrollWidth / 2; };

  /* ---------- jurnalul de noapte din hero ---------- */
  const logItems = $$('#logList li');
  let logI = 0;
  logItems[0].classList.add('on');
  if (!reduce) setInterval(() => {
    const prev = logItems[logI];
    prev.classList.remove('on'); prev.classList.add('off');
    setTimeout(() => prev.classList.remove('off'), 600);
    logI = (logI + 1) % logItems.length;
    logItems[logI].classList.add('on');
  }, 3200);

  /* ---------- cronometrul apelului, porneste cand capitolul e pe ecran ---------- */
  const callTime = $('#callTime'), voce = $('#voce');
  let callStart = 0;
  setInterval(() => {
    const r = voce.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) {
      if (!callStart) callStart = Date.now();
      const s = Math.floor((Date.now() - callStart) / 1000);
      callTime.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    } else callStart = 0;
  }, 500);

  /* ---------- demo WhatsApp: mesajele apar dupa progresul scroll-ului ---------- */
  const demo = $('#demo'), msgs = $$('#chat .msg'), typing = $('#typing'), facts = $$('#demoFacts li');
  const phClock = $('#phClock'), phStatus = $('#phStatus');
  function demoTick() {
    const r = demo.getBoundingClientRect(), h = demo.offsetHeight - innerHeight;
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = clamp(-r.top / h);
    let last = null, next = null;
    for (const m of msgs) {
      const on = p >= +m.dataset.at;
      if (on !== m.classList.contains('show')) m.classList.toggle('show', on);
      if (on) last = m; else if (!next) next = m;
    }
    // agentul „scrie..." chiar inainte de fiecare raspuns al lui
    const isTyping = next && next.classList.contains('out') && p > +next.dataset.at - .07;
    typing.classList.toggle('show', !!isTyping);
    phStatus.textContent = isTyping ? 'scrie...' : 'online';
    if (last) { const t = last.querySelector('time'); if (t) phClock.textContent = t.textContent; }
    for (const f of facts) f.classList.toggle('on', p >= +f.dataset.at);
  }

  /* ---------- servicii extra, acordeon ---------- */
  $$('#svc button').forEach(b => b.addEventListener('click', () => {
    const li = b.parentElement, open = !li.classList.contains('open');
    li.classList.toggle('open', open);
    b.setAttribute('aria-expanded', open);
  }));

  /* ---------- calculator ---------- */
  const ins = { leads: $('#leads'), miss: $('#miss'), conv: $('#conv'), val: $('#val') };
  function calc() {
    const L = +ins.leads.value, M = +ins.miss.value, C = +ins.conv.value, V = +ins.val.value;
    $('#o-leads').textContent = fmt(L);
    $('#o-miss').textContent = M + '%';
    $('#o-conv').textContent = C + '%';
    $('#o-val').textContent = fmt(V) + ' lei';
    $('#calcSum').textContent = fmt(L * M / 100 * C / 100 * V) + ' lei';
    $('#calcHow').textContent = `${fmt(L)} × ${M}% × ${C}% × ${fmt(V)} lei`;
    for (const i of Object.values(ins)) i.style.setProperty('--p', ((i.value - i.min) / (i.max - i.min) * 100) + '%');
  }
  Object.values(ins).forEach(i => i.addEventListener('input', calc));
  calc();

  /* ---------- formular: fara backend, compune un e-mail ---------- */
  const form = $('#leadForm'), msg = $('#formMsg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nume = form.nume, tel = form.telefon;
    let ok = true;
    for (const f of [nume, tel]) {
      const bad = !f.value.trim() || (f === tel && f.value.replace(/\D/g, '').length < 9);
      f.classList.toggle('bad', bad);
      if (bad && ok) { f.focus(); ok = false; }
    }
    if (!ok) { msg.textContent = 'Completați numele și un număr de telefon valid.'; return; }
    const interes = $$('input[name=interes]:checked', form).map(i => i.value).join(', ') || 'nespecificat';
    const body = `Nume: ${nume.value}\nFirma: ${form.firma.value}\nTelefon: ${tel.value}\nInteres: ${interes}`;
    location.href = 'mailto:salut@nextflowai.ro?subject=' + encodeURIComponent('Audit gratuit, ' + nume.value) +
      '&body=' + encodeURIComponent(body);
    msg.textContent = 'Mulțumim! Se deschide aplicația de e-mail. Vă sunăm în aceeași zi lucrătoare.';
  });

  /* ---------- o singura bucla ---------- */
  addEventListener('scroll', () => {
    vel += (scrollY - lastY) * .06; lastY = scrollY;
    vel = Math.max(-6, Math.min(6, vel));
    hdrTick(); sweep(); demoTick();
  }, { passive: true });
  addEventListener('resize', () => { mqMeasure(); sweep(); demoTick(); });
  addEventListener('load', () => { mqMeasure(); sweep(); });
  document.fonts && document.fonts.ready.then(() => { mqMeasure(); sweep(); });

  (function loop() {
    vel *= .92;
    if (mqHalf) {
      mqX += reduce ? vel * .5 : .45 + vel;
      mqX = ((mqX % mqHalf) + mqHalf) % mqHalf;
      mq.style.transform = `translate3d(${-mqX}px,0,0)`;
    }
    requestAnimationFrame(loop);
  })();

  mqMeasure(); hdrTick(); demoTick();
  // lasam stilurile initiale sa se aplice, altfel tranzitia e sarita
  requestAnimationFrame(() => requestAnimationFrame(sweep));
})();
