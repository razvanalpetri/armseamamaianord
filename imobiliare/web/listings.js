/* Alpetri Real Estate, listari.
   Datele stau in data/listings.json. Fisierul asta le citeste si le randeaza in
   trei locuri: lista scurta de pe prima pagina (#folioList), pagina de listari
   cu filtre (#listGrid) si fisa unei proprietati (#prop).
   Fara framework: 13 listari nu justifica un build. Se ruleaza dupa app.js si
   anunta prin evenimentul `listings:rendered` ca a pus elemente noi in pagina,
   ca reveal-ul si imaginea care urmareste cursorul sa le prinda. */
(function () {
  /* Datele de contact apar si in HTML-ul static. Cand se schimba, se schimba
     in ambele locuri, README-ul are lista. */
  const AGENTIE = {
    telefon: '0722 000 000',
    telefonE164: '+40722000000',
    whatsapp: '40722000000',
  };
  const TIP = { apartament: 'Apartament', studio: 'Studio', vila: 'Vilă', casa: 'Casă', teren: 'Teren', comercial: 'Spațiu comercial' };
  const TRZ = { vanzare: 'Vânzare', inchiriere: 'Închiriere' };
  const nf = new Intl.NumberFormat('ro-RO');
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let cache;
  const load = () => cache ||= fetch('data/listings.json', { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(list => list.map((l, i) => ({ ...l, ref: l.ref || 'ALP-' + String(i + 1).padStart(3, '0') })));

  const price = l => l.pret
    ? nf.format(l.pret) + ' ' + (l.moneda || '€') + (l.perioada ? '/' + l.perioada : '')
    : 'Preț la cerere';
  /* imaginile din media/l/ au si o varianta de 720px, pentru grila */
  const thumb = src => /^media\/l\//.test(src) ? src.replace(/\.jpg$/, '-s.jpg') : src;
  const where = l => [TIP[l.tip] || l.tip, [l.zona, l.oras].filter(Boolean).join(', ')].filter(Boolean).join(' · ');
  const cover = l => (l.imagini && l.imagini[0]) || 'media/poster.jpg';

  function specs(l) {
    const s = [];
    if (l.tip === 'teren') {
      if (l.teren) s.push(nf.format(l.teren) + ' m² teren');
      if (l.deschidere) s.push('deschidere ' + l.deschidere + ' m');
    } else {
      if (l.camere) s.push(l.camere + (l.camere === 1 ? ' cameră' : ' camere'));
      if (l.suprafata) s.push(nf.format(l.suprafata) + ' m²');
      if (l.teren) s.push(nf.format(l.teren) + ' m² teren');
      if (l.etaj) s.push(/^\d/.test(l.etaj) ? 'etaj ' + l.etaj : l.etaj);
    }
    return s.join(' · ');
  }

  function card(l) {
    return `<a class="lst-item fade" href="proprietate.html?id=${encodeURIComponent(l.id)}">
      <span class="lst-fig"><img src="${esc(thumb(cover(l)))}" alt="${esc(l.titlu)}" loading="lazy" decoding="async">
        ${l.stadiu ? `<span class="lst-tag">${esc(l.stadiu)}</span>` : ''}${l.real ? '<span class="lst-tag real">Fotografii reale</span>' : ''}</span>
      <span class="lst-body">
        <span class="lst-name">${esc(l.titlu)}<i>${esc(where(l))}</i></span>
        <span class="lst-meta num"><b>${esc(price(l))}</b><small>${esc(specs(l))}</small></span>
      </span></a>`;
  }

  const rendered = () => document.dispatchEvent(new CustomEvent('listings:rendered'));

  /* ---------------- inclinare 3D pe imagini, doar unde exista cursor ----------------
     Pe touch nu exista pointermove continuu, iar cu reduced-motion nu vrem sa
     miscam nimic. Unghiurile sunt mici intentionat: peste 8 grade se citeste
     ca un card de joc, nu ca o fotografie pe o masa. */
  const canTilt = matchMedia('(hover:hover) and (prefers-reduced-motion: no-preference)').matches;
  function tilt(root) {
    if (!canTilt) return;
    root.querySelectorAll('.lst-fig').forEach(fig => {
      fig.addEventListener('pointermove', e => {
        const r = fig.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        fig.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateZ(6px)`;
      });
      fig.addEventListener('pointerleave', () => { fig.style.transform = ''; });
    });
  }

  /* ---------------- prima pagina: lista scurta ---------------- */
  function homeList(list) {
    const el = document.getElementById('folioList');
    if (!el) return;
    const top = list.filter(l => l.recomandat).concat(list.filter(l => !l.recomandat)).slice(0, 6);
    el.innerHTML = top.map((l, i) => `<a class="folio-item fade" href="proprietate.html?id=${encodeURIComponent(l.id)}" data-img="${i}">
      <span class="folio-idx num">${String(i + 1).padStart(2, '0')}</span>
      <span class="folio-name">${esc(l.titlu)}<i>${esc(where(l))}${specs(l) ? ', ' + esc(specs(l)) : ''}</i></span>
      <span class="folio-meta num"><b>${esc(price(l))}</b><small>${l.stadiu ? 'stadiu: ' + esc(l.stadiu) : ''}</small></span></a>`).join('');
    const figs = document.getElementById('hoverFigs');
    if (figs) figs.innerHTML = top.map(l => `<img class="hover-fig" src="${esc(thumb(cover(l)))}" alt="">`).join('');
    const total = document.getElementById('lstTotal');
    if (total) total.textContent = list.length;
    rendered();
  }

  /* ---------------- pagina de listari, cu filtre ---------------- */
  function listPage(list) {
    const grid = document.getElementById('listGrid');
    if (!grid) return;
    const form = document.getElementById('filters');
    const count = document.getElementById('lstCount');
    const empty = document.getElementById('lstEmpty');

    const zone = [...new Set(list.map(l => l.zona).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ro'));
    form.zona.innerHTML = '<option value="">Oriunde</option>' + zone.map(z => `<option>${esc(z)}</option>`).join('');

    // filtrele vin si din URL, ca linkurile „Chirii" sau „Terenuri" sa aterizeze gata filtrate
    const q = new URLSearchParams(location.search);
    for (const k of ['tranzactie', 'tip', 'zona', 'camere', 'pret', 'sort']) if (q.has(k) && form[k]) form[k].value = q.get(k);

    const by = {
      recente: (a, b) => (b.adaugat || '').localeCompare(a.adaugat || ''),
      'pret-asc': (a, b) => (a.pret || 0) - (b.pret || 0),
      'pret-desc': (a, b) => (b.pret || 0) - (a.pret || 0),
      suprafata: (a, b) => (b.suprafata || b.teren || 0) - (a.suprafata || a.teren || 0),
    };

    function apply(push) {
      const f = Object.fromEntries(new FormData(form));
      const out = list.filter(l =>
        (!f.tranzactie || l.tranzactie === f.tranzactie) &&
        (!f.tip || l.tip === f.tip) &&
        (!f.zona || l.zona === f.zona) &&
        (!f.camere || (l.camere || 0) >= +f.camere) &&
        (!f.pret || (l.pret || 0) <= +f.pret));
      out.sort(by[f.sort] || by.recente);
      grid.innerHTML = out.map(card).join('');
      count.textContent = out.length === 1
        ? '1 proprietate'
        : out.length + ' proprietăți' + (out.length !== list.length ? ' din ' + list.length : '');
      empty.hidden = out.length > 0;
      tilt(grid);
      rendered();
      if (push) {
        const p = new URLSearchParams();
        for (const [k, v] of Object.entries(f)) if (v) p.set(k, v);
        history.replaceState(null, '', p.toString() ? '?' + p : location.pathname);
      }
    }
    form.addEventListener('change', () => apply(true));
    form.addEventListener('input', e => { if (e.target.name === 'pret') apply(true); });
    form.addEventListener('reset', () => setTimeout(() => apply(true)));
    apply(false);
  }

  /* ---------------- fisa unei proprietati ---------------- */
  function propPage(list) {
    const root = document.getElementById('prop');
    if (!root) return;
    const id = new URLSearchParams(location.search).get('id') || decodeURIComponent(location.hash.slice(1));
    const l = list.find(x => x.id === id);
    if (!l) {
      root.innerHTML = `<h1 class="sec">Nu am găsit proprietatea</h1>
        <p class="lede">Poate a fost vândută sau retrasă între timp. <a class="u" href="listari.html">Vedeți toate listările.</a></p>`;
      rendered();
      return;
    }
    document.title = `${l.titlu} | Alpetri Real Estate`;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.content = `${where(l)}. ${price(l)}. ${(l.descriere && l.descriere[0]) || ''}`.slice(0, 160);

    const imgs = (l.imagini && l.imagini.length) ? l.imagini : ['media/poster.jpg'];
    const perM = l.pret && !l.perioada && (l.suprafata || l.teren)
      ? nf.format(Math.round(l.pret / (l.suprafata || l.teren))) + ' €/m²' : '';
    const rows = [
      ['Tip', TIP[l.tip] || l.tip],
      ['Tranzacție', TRZ[l.tranzactie] || l.tranzactie],
      ['Zonă', [l.zona, l.oras].filter(Boolean).join(', ')],
      ['Camere', l.camere],
      ['Suprafață utilă', l.suprafata && nf.format(l.suprafata) + ' m²'],
      ['Teren', l.teren && nf.format(l.teren) + ' m²'],
      ['Deschidere', l.deschidere && l.deschidere + ' m'],
      ['Etaj', l.etaj],
      ['An construcție', l.an],
      ['Stadiu', l.stadiu],
      ['Disponibil', l.disponibil],
    ].filter(([, v]) => v !== undefined && v !== null && v !== '' && v !== false);
    const wa = `https://wa.me/${AGENTIE.whatsapp}?text=${encodeURIComponent('Bună ziua, mă interesează ' + l.titlu + ' (' + l.ref + ').')}`;

    root.innerHTML = `
      <div class="prop-head fade">
        <h1 class="sec">${esc(l.titlu)}</h1>
        <p class="lede">${esc(where(l))}${l.real ? ' · <span class="real-note">fotografii reale, făcute de noi</span>' : ''}</p>
      </div>
      <div class="prop-grid">
        <div class="gal fade">
          <figure class="gal-main">
            <button type="button" class="gal-open" id="galOpen" aria-label="Deschideți galeria pe tot ecranul">
              <img id="galMain" src="${esc(imgs[0])}" alt="${esc(l.titlu)}">
            </button>
            <figcaption class="num"><span id="galIdx">1</span> / ${imgs.length}</figcaption>
          </figure>
          ${imgs.length > 1 ? `<div class="gal-thumbs" id="galThumbs">${imgs.map((s, i) =>
            `<button type="button" class="${i ? '' : 'on'}" data-i="${i}" aria-label="Fotografia ${i + 1}"><img src="${esc(thumb(s))}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
        </div>
        <aside class="prop-sheet fade">
          <p class="prop-price num">${esc(price(l))}${perM ? `<small>${perM}</small>` : ''}</p>
          <dl class="field">${rows.map(([k, v]) => `<div class="field-row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
          <div class="prop-cta">
            <a class="btn" href="tel:${AGENTIE.telefonE164}">Sunați <b class="num">${AGENTIE.telefon}</b></a>
            <a class="btn ghost" href="${wa}" target="_blank" rel="noopener">Scrieți pe WhatsApp</a>
          </div>
          <p class="prop-ref">Referință <span class="num">${esc(l.ref)}</span>. Spuneți-o la telefon și știm despre ce vorbim.</p>
        </aside>
      </div>
      <div class="prop-body">
        <div class="fade"><h2>Despre proprietate</h2>${(l.descriere || []).map(p => `<p>${esc(p)}</p>`).join('')}</div>
        ${l.dotari && l.dotari.length ? `<div class="fade"><h2>Dotări</h2><ul class="dotari">${l.dotari.map(d => `<li>${esc(d)}</li>`).join('')}</ul></div>` : ''}
        <div class="fade"><h2>Locație</h2>
          <p>${esc(l.adresa || [l.zona, l.oras].filter(Boolean).join(', '))}</p>
          ${l.harta ? `<a class="u" href="${esc(l.harta)}" target="_blank" rel="noopener">Deschideți în Google Maps</a>` : ''}
        </div>
      </div>`;

    /* galerie */
    let cur = 0;
    const main = document.getElementById('galMain');
    const idx = document.getElementById('galIdx');
    const thumbs = document.getElementById('galThumbs');
    const show = i => {
      cur = (i + imgs.length) % imgs.length;
      main.src = imgs[cur];
      idx.textContent = cur + 1;
      if (thumbs) thumbs.querySelectorAll('button').forEach((b, k) => b.classList.toggle('on', k === cur));
    };
    if (thumbs) thumbs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });

    /* lightbox */
    const lb = document.getElementById('lb');
    if (lb) {
      const lbImg = lb.querySelector('img');
      const lbIdx = lb.querySelector('.lb-idx');
      const sync = () => { lbImg.src = imgs[cur]; lbIdx.textContent = (cur + 1) + ' / ' + imgs.length; };
      const open = () => { lb.hidden = false; document.body.style.overflow = 'hidden'; sync(); lb.querySelector('.lb-close').focus(); };
      const close = () => { lb.hidden = true; document.body.style.overflow = ''; document.getElementById('galOpen').focus(); };
      const step = d => { show(cur + d); sync(); };
      document.getElementById('galOpen').addEventListener('click', open);
      lb.querySelector('.lb-close').addEventListener('click', close);
      lb.querySelector('.lb-prev').addEventListener('click', () => step(-1));
      lb.querySelector('.lb-next').addEventListener('click', () => step(1));
      lb.addEventListener('click', e => { if (e.target === lb) close(); });
      addEventListener('keydown', e => {
        if (lb.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      });
      let sx = null;
      lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', e => {
        if (sx === null) return;
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
        sx = null;
      });
    }

    /* alte proprietati: intai acelasi tip si aceeasi tranzactie, apoi restul */
    const sim = document.getElementById('simGrid');
    if (sim) {
      const pool = list.filter(x => x.id !== l.id);
      const same = pool.filter(x => x.tip === l.tip && x.tranzactie === l.tranzactie);
      // patru, nu trei: modelul grilei este 4+2 / 3+3 si cu patru se umplu exact doua randuri
      const pick = same.concat(pool.filter(x => !same.includes(x))).slice(0, 4);
      sim.innerHTML = pick.map(card).join('');
      tilt(sim);
    }
    rendered();
  }

  load().then(list => { homeList(list); listPage(list); propPage(list); }).catch(err => {
    console.error('listari:', err);
    const msg = '<p class="lede">Lista nu s-a putut încărca. Site-ul trebuie servit prin HTTP, nu deschis direct din fișier. Vedeți README.</p>';
    for (const id of ['folioList', 'listGrid', 'prop']) { const el = document.getElementById(id); if (el) el.innerHTML = msg; }
  });
})();
