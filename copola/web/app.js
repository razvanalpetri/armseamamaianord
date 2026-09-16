/* Copola Estate. Fara librarii: nici Lenis, nici GSAP.
   Smooth-scroll-ul din librarii strica position:sticky, iar lerp-ul din bucla
   de scrub de mai jos da exact netezimea pentru care ar fi fost adaugate. */
(function () {
  'use strict';

  var clamp = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- sursa video se alege INAINTE de incarcare ----------
     Daca pui ambele in <source>, browserul le poate descarca pe amandoua. */
  var vid = $('#heroVideo');
  if (vid) {
    var small = window.matchMedia('(max-width: 820px)').matches;
    var conn = navigator.connection;
    if (conn && (conn.saveData || /(^|\W)(2g|slow-2g|3g)($|\W)/.test(conn.effectiveType || ''))) small = true;
    vid.src = small ? 'media/hero-sm.mp4' : 'media/hero.mp4';
    vid.load();
  }

  /* ---------- scrub-ul eroului ---------- */
  var hero = $('#top');
  var heroInner = $('#heroInner');
  var heroCue = $('#heroCue');
  var ready = false, target = 0, cur = 0;

  function markReady() { ready = true; if (vid) vid.pause(); }
  if (vid) {
    vid.addEventListener('loadedmetadata', markReady);
    vid.addEventListener('loadeddata', markReady);
    if (vid.readyState >= 1) markReady();
  }

  /* ---------- plasa de siguranta pentru servere fara HTTP Range ----------
     Daca serverul nu trimite 206, seek-ul esueaza IN TACERE: currentTime ramane
     0 si nu apare nicio eroare nicaieri. In loc sa lasam eroul inghetat pe
     primul cadru, il redam in bucla.

     ATENTIE, masurat: `seekable.length` NU este un indicator de incredere.
     Servit de `python3 -m http.server`, care nu suporta Range, Chromium
     raporteaza totusi seekable.length === 1, desi currentTime nu se misca.
     De aceea sonda de mai jos chiar incearca un seek si verifica rezultatul. */
  var scrubOK = true, probing = false, probed = false;

  function probeSeek() {
    if (probed || !vid || !vid.duration) return;
    probed = true;
    probing = true;                                   // suspenda bucla de scrub
    var mark = Math.min(0.8, vid.duration / 4);
    try { vid.currentTime = mark; } catch (e) { /* ignorat */ }
    setTimeout(function () {
      var moved = vid.currentTime > 0.05;
      probing = false;
      if (moved) {
        cur = vid.currentTime;                        // evita un salt la reluare
      } else {
        scrubOK = false;
        vid.loop = true;
        var pl = vid.play();
        if (pl && pl.catch) pl.catch(function () {});
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
        try { vid.currentTime = cur; } catch (e) { /* seek respins in timpul unui alt seek */ }
      }
    }
    requestAnimationFrame(scrubLoop);
  })();

  function heroTick() {
    if (!hero) return;
    var r = hero.getBoundingClientRect();
    var h = hero.offsetHeight - window.innerHeight;
    var p = h > 0 ? clamp(-r.top / h) : 0;
    if (scrubOK && ready && vid && vid.duration) target = p * (vid.duration - 0.05);

    var out = clamp((p - 0.46) / 0.2);
    if (heroInner) {
      heroInner.style.opacity = (1 - out).toFixed(3);
      heroInner.style.transform = 'translateY(' + (-out * 56).toFixed(1) + 'px)';
    }
    if (heroCue) heroCue.style.opacity = (1 - clamp(p / 0.06)).toFixed(3);
  }

  /* ---------- bara devine opaca dupa ce pleci din hero ---------- */
  var bar = $('#bar');
  function barTick() {
    if (bar) bar.classList.toggle('solid', window.scrollY > window.innerHeight * 0.6);
  }

  /* ---------- reveal, cu maturare la scroll ----------
     IntersectionObserver rateaza elementele la salturi programatice mari
     (click pe ancora), deci se matura manual. */
  var reveals = $$('.fade');
  function sweep() {
    var vh = window.innerHeight;
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (el.dataset.shown) continue;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) { el.dataset.shown = '1'; el.classList.add('visible'); }
    }
  }

  function onScroll() { heroTick(); barTick(); sweep(); }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  /* dublul rAF nu e superstitie: daca .visible se adauga in acelasi cadru in care
     elementul se randeaza prima data, browserul colapseaza cele doua stari si
     tranzitia nu ruleaza niciodata. */
  requestAnimationFrame(function () { requestAnimationFrame(sweep); });
  window.addEventListener('load', onScroll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sweep);

  /* ---------- comutator mobilat / real pe fiecare camera ---------- */
  $$('.room').forEach(function (room) {
    var btn = $('.room-toggle', room);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var on = room.classList.toggle('revealed');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? 'Vezi camera mobilată' : 'Vezi camera goală';
    });
  });

  /* ---------- slider real / mobilat ---------- */
  var box = $('#compare');
  if (box) {
    var clip = $('#compareClip');
    var handle = $('#compareHandle');
    var dragging = false;

    function setPct(pct) {
      pct = Math.max(0, Math.min(100, pct));
      clip.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      handle.style.insetInlineStart = pct + '%';
      handle.setAttribute('aria-valuenow', Math.round(pct));
    }
    function fromX(x) {
      var r = box.getBoundingClientRect();
      setPct(((x - r.left) / r.width) * 100);
    }

    box.addEventListener('mousedown', function (e) { dragging = true; fromX(e.clientX); e.preventDefault(); });
    window.addEventListener('mousemove', function (e) { if (dragging) fromX(e.clientX); }, { passive: true });
    window.addEventListener('mouseup', function () { dragging = false; });

    box.addEventListener('touchstart', function (e) { dragging = true; fromX(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      e.preventDefault();
      fromX(e.touches[0].clientX);
    }, { passive: false });
    window.addEventListener('touchend', function () { dragging = false; });

    /* urmarirea cursorului fara drag, dar doar unde exista hover real.
       Fara garda asta, touch-ul primeste evenimente de mouse sintetice si sare. */
    box.addEventListener('mousemove', function (e) {
      if (!dragging && window.matchMedia('(hover:hover)').matches) fromX(e.clientX);
    }, { passive: true });

    handle.addEventListener('keydown', function (e) {
      var now = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
      if (e.key === 'ArrowLeft') { setPct(now - 4); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPct(now + 4); e.preventDefault(); }
      if (e.key === 'Home') { setPct(0); e.preventDefault(); }
      if (e.key === 'End') { setPct(100); e.preventDefault(); }
    });

    setPct(50);
  }
})();
