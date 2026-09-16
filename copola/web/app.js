/* Copola Estate. Fara librarii: nici Lenis, nici GSAP.
   Smooth-scroll-ul din librarii strica position:sticky, iar lerp-ul din bucla
   de scrub de mai jos da exact netezimea pentru care ar fi fost adaugate. */
(function () {
  'use strict';

  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- capitolele turului ----------
     Fractiile corespund taieturilor reale din hero.mp4: patru clipuri de 5,04s
     intr-un montaj de 19,17s, cu doua dizolvari de 0,5s. */
  var CH = [
    { p: 0.00, k: '01 · Parter', t: 'Livingul',               c: 'Open space, cu scara interioară în fundal. Mobila este staging virtual, casa se predă goală.' },
    { p: 0.26, k: '02 · Parter', t: 'Spre scară',             c: 'Parter și etaj, legate de o scară finisată, cu balustradă montată.' },
    { p: 0.53, k: '03 · Etaj',   t: 'Dormitorul matrimonial', c: 'Ușă de balcon pe toată înălțimea, vedere spre oraș.' },
    { p: 0.76, k: '04 · Etaj',   t: 'Se lasă seara',          c: 'Trei dormitoare, două băi. 200.000 € plus TVA, la cheie, nemobilată.' }
  ];

  /* ---------- sursa video se alege INAINTE de incarcare ---------- */
  var vid = $('#tourVid');
  if (vid) {
    var small = window.matchMedia('(max-width: 820px)').matches;
    var conn = navigator.connection;
    if (conn && (conn.saveData || /(^|\W)(2g|slow-2g|3g)($|\W)/.test(conn.effectiveType || ''))) small = true;
    vid.src = small ? 'media/hero-sm.mp4' : 'media/hero.mp4';
    vid.load();
  }

  /* ---------- preloader ---------- */
  var pre = $('#pre'), prb = $('#prb'), prog = 0, preDone = false;
  function setProg(v) { prog = Math.max(prog, Math.min(100, v)); if (prb) prb.style.width = prog + '%'; }
  function hidePre() {
    if (preDone) return; preDone = true; setProg(100);
    setTimeout(function () { if (pre) pre.classList.add('gone'); }, 320);
  }
  var tick = setInterval(function () { setProg(prog + 6); if (prog >= 92) clearInterval(tick); }, 130);
  if (vid) {
    vid.addEventListener('loadeddata', function () { setProg(96); });
    vid.addEventListener('error', hidePre);
  }
  window.addEventListener('load', function () { setTimeout(hidePre, 260); });
  setTimeout(hidePre, 6000);                       // plasa: nu blocam pagina daca ceva nu se incarca

  /* ---------- scrub ---------- */
  var tour = $('#tour'), ov = $('#ov'), ovi = $('#ovi');
  var ovKick = $('#ovKick'), ovTitle = $('#ovTitle'), ovCopy = $('#ovCopy');
  var countN = $('#countN'), rail = $('#rail'), hint = $('#hint');
  var ready = false, target = 0, cur = 0, curCh = -1;

  function markReady() { ready = true; if (vid) vid.pause(); }
  if (vid) {
    vid.addEventListener('loadedmetadata', markReady);
    vid.addEventListener('loadeddata', markReady);
    if (vid.readyState >= 1) markReady();
  }

  /* plasa de siguranta pentru servere fara HTTP Range.
     Fara Range, seek-ul esueaza IN TACERE: currentTime ramane 0 si nu apare
     nicio eroare. ATENTIE, masurat: seekable.length NU e de incredere, servit
     de python3 -m http.server Chromium raporteaza seekable.length === 1 desi
     currentTime nu se misca. De aceea sonda chiar incearca un seek. */
  var scrubOK = true, probing = false, probed = false;
  function probeSeek() {
    if (probed || !vid || !vid.duration) return;
    probed = true; probing = true;
    var mark = Math.min(0.8, vid.duration / 4);
    try { vid.currentTime = mark; } catch (e) { /* ignorat */ }
    setTimeout(function () {
      var moved = vid.currentTime > 0.05;
      probing = false;
      if (moved) { cur = vid.currentTime; }
      else {
        scrubOK = false; vid.loop = true;
        var pl = vid.play(); if (pl && pl.catch) pl.catch(function () {});
      }
    }, 900);
  }
  if (vid) {
    vid.addEventListener('loadeddata', probeSeek);
    if (vid.readyState >= 2) probeSeek();
  }

  (function scrubLoop() {
    if (scrubOK && !probing && ready && vid && vid.duration) {
      cur += (target - cur) * 0.11;
      if (Math.abs(vid.currentTime - cur) > 0.004) {
        try { vid.currentTime = cur; } catch (e) { /* seek respins in timpul altui seek */ }
      }
    }
    requestAnimationFrame(scrubLoop);
  })();

  /* rigla de capitole */
  if (rail) {
    CH.forEach(function (c, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = '<span class="dot"></span><span class="lb"></span>';
      b.querySelector('.lb').textContent = c.t;
      b.setAttribute('aria-label', 'Sari la capitolul ' + (i + 1) + ', ' + c.t);
      b.addEventListener('click', function () {
        var h = tour.offsetHeight - window.innerHeight;
        window.scrollTo({ top: tour.offsetTop + h * (c.p + 0.02), behavior: 'smooth' });
      });
      rail.appendChild(b);
    });
  }
  var railBtns = rail ? $$('button', rail) : [];

  function setChapter(i) {
    if (i === curCh || !CH[i]) return;
    curCh = i;
    var c = CH[i];
    if (ovKick) ovKick.textContent = c.k;
    if (ovTitle) ovTitle.textContent = c.t;
    if (ovCopy) ovCopy.textContent = c.c;
    if (ovi) { ovi.classList.remove('sw'); void ovi.offsetWidth; ovi.classList.add('sw'); }
    if (countN) countN.textContent = ('0' + (i + 1)).slice(-2) + ' / ' + ('0' + CH.length).slice(-2);
    railBtns.forEach(function (b, k) { b.classList.toggle('on', k === i); });
  }

  function tourTick() {
    if (!tour) return;
    var r = tour.getBoundingClientRect();
    var h = tour.offsetHeight - window.innerHeight;
    var p = h > 0 ? clamp(-r.top / h) : 0;
    if (scrubOK && ready && vid && vid.duration) target = p * (vid.duration - 0.05);

    var idx = 0;
    for (var i = 0; i < CH.length; i++) if (p >= CH[i].p) idx = i;
    setChapter(idx);

    /* legenda apare dupa ce primul cadru a fost vazut, si dispare la iesire */
    if (ov) ov.classList.toggle('vis', p > 0.03 && p < 0.985);
    if (hint) hint.style.opacity = (0.65 * (1 - clamp(p / 0.05))).toFixed(3);
  }

  /* ---------- nav ---------- */
  var nav = $('#nav');
  function navTick() { if (nav) nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.5); }

  /* ---------- reveal ----------
     IntersectionObserver rateaza elementele la salturi programatice mari
     (click pe ancora), deci se matura manual. */
  var reveals = $$('.reveal');
  function sweep() {
    var vh = window.innerHeight;
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (el.dataset.shown) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) {
        el.dataset.shown = '1';
        el.classList.add('in');
        if (el.classList.contains('stats')) countUp(el);
      }
    }
  }

  /* ---------- numere care urca ---------- */
  function countUp(box) {
    $$('.n[data-to]', box).forEach(function (el) {
      var to = parseFloat(el.dataset.to) || 0;
      var sep = el.dataset.sep === '1';
      var t0 = null, dur = 1400;
      function fmt(v) {
        var n = Math.round(v);
        return sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : String(n);
      }
      function step(ts) {
        if (t0 === null) t0 = ts;
        var k = Math.min(1, (ts - t0) / dur);
        var e = 1 - Math.pow(1 - k, 3);                 // ease-out cubic
        el.textContent = fmt(to * e);
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  function onScroll() { tourTick(); navTick(); sweep(); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  /* dublul rAF nu e superstitie: daca .in se adauga in acelasi cadru in care
     elementul se randeaza prima data, browserul colapseaza cele doua stari si
     tranzitia nu ruleaza niciodata. */
  requestAnimationFrame(function () { requestAnimationFrame(sweep); });
  window.addEventListener('load', onScroll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sweep);

  /* ---------- comutator mobilat / real ---------- */
  $$('.gal figure').forEach(function (fig) {
    var btn = $('.rt', fig);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var on = fig.classList.toggle('revealed');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? 'Camera mobilată' : 'Camera goală';
    });
  });

  /* ---------- slider real / mobilat ---------- */
  var box = $('#compare');
  if (box) {
    var clip = $('#compareClip'), handle = $('#compareHandle'), dragging = false;
    function setPct(pct) {
      pct = Math.max(0, Math.min(100, pct));
      clip.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      handle.style.insetInlineStart = pct + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }
    function fromX(x) { var r = box.getBoundingClientRect(); setPct(((x - r.left) / r.width) * 100); }

    box.addEventListener('mousedown', function (e) { dragging = true; fromX(e.clientX); e.preventDefault(); });
    window.addEventListener('mousemove', function (e) { if (dragging) fromX(e.clientX); }, { passive: true });
    window.addEventListener('mouseup', function () { dragging = false; });
    box.addEventListener('touchstart', function (e) { dragging = true; fromX(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (!dragging) return; e.preventDefault(); fromX(e.touches[0].clientX);
    }, { passive: false });
    window.addEventListener('touchend', function () { dragging = false; });
    /* urmarirea cursorului fara drag, dar doar unde exista hover real.
       Fara garda asta, touch-ul primeste evenimente de mouse sintetice si sare. */
    box.addEventListener('mousemove', function (e) {
      if (!dragging && window.matchMedia('(hover:hover)').matches) fromX(e.clientX);
    }, { passive: true });
    handle.addEventListener('keydown', function (e) {
      var now = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft')  { setPct(now - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPct(now + 4); e.preventDefault(); }
      if (e.key === 'Home')       { setPct(0);   e.preventDefault(); }
      if (e.key === 'End')        { setPct(100); e.preventDefault(); }
    });
    setPct(50);
  }

  /* ---------- intrebari ---------- */
  $$('.faq .q').forEach(function (q) {
    var h = $('.h', q);
    h.setAttribute('role', 'button');
    h.setAttribute('tabindex', '0');
    h.setAttribute('aria-expanded', 'false');
    function toggle() {
      var on = q.classList.toggle('on');
      h.setAttribute('aria-expanded', on ? 'true' : 'false');
    }
    q.addEventListener('click', toggle);
    h.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); toggle(); }
    });
  });
})();
