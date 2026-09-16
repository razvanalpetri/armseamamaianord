# Copola Estate, vila din Valu lui Traian

Landing de vânzare pentru un singur produs, cu erou video legat de scroll. Construit cu
skill-ul `site-3d-scroll`, rețeta **walk-in tour**.

Trăiește în `/copola` și este complet independent de `/imobiliare` (Alpetri Real Estate) și
de `/src` (ARM Sea Mamaia Nord). Niciunul dintre celelalte două nu a fost modificat.

## Pornire locală

```bash
node copola/serve.mjs          # sau: PORT=3000 node copola/serve.mjs
```

Apoi http://localhost:8845

**Serverul static TREBUIE să suporte HTTP Range.** Fără Range, `video.currentTime` nu face
absolut nimic, `seekable.length` rămâne 0, iar scrub-ul pare rupt fără nicio eroare în
consolă. `python3 -m http.server` NU suportă Range. `serve.mjs` din acest folder suportă.
Verificare, se așteaptă **206**:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -r 100-200 http://localhost:8845/media/hero.mp4
```

La deploy pe Vercel, Netlify, Cloudflare Pages sau nginx, Range vine implicit.

## Structură

```
PRODUCT.md      poziționare, ton, anti-referințe. Sursa de adevăr pentru copy.
DESIGN.md       paletă OKLCH, tipografie, interdicții. Sursa de adevăr pentru CSS.
prompts/        prompturile și comenzile exacte, pentru regenerare
serve.mjs       server static cu HTTP Range
web/            livrabilul
  index.html
  styles.css
  app.js
  favicon.svg
  fonts/        Bricolage Grotesque + Public Sans, variabile, self-hostate
  media/        hero.mp4, hero-sm.mp4, poster, 7 camere mobilate, 7 camere reale
```

## Eroul

Walkthrough din **4 clipuri Kling 3.0**, generate din fotografiile reale ale casei după
staging virtual:

```
living, push-in  →  continuare spre scară  →  dormitor matrimonial, push spre balcon
                 →  dormitor 2, zi spre amurg, cameră fixă
```

19,17 s, 30 fps, encodat all-keyframe (`keyint=1`) ca scrub-ul să nu sară între keyframe-uri.

**Dimensiunile, spuse cu voce tare:** `hero.mp4` este de **12 MB** (1280x720) și
`hero-sm.mp4` de **6,2 MB** (1000x562). Fișierele all-keyframe sunt mari prin construcție,
ăsta e prețul unui scrub care nu se mișcă în trepte. Pe localhost nu se simte, pe o
conexiune slabă de mobil se simte. Dacă e nevoie de mai mic: scurtați durata, coborâți
rezoluția sau creșteți CRF. VP9 a fost testat și măsurat, iese de 2,7 ori mai mare pe
conținutul ăsta, deci nu e livrat.

Alegerea între cele două variante se face în JS **înainte** de încărcare, altfel browserul
le poate descărca pe amândouă.

## Onestitate, nu e opțională

Mobilierul din walkthrough și din galerie este **staging virtual**, adăugat digital peste
fotografii reale ale casei. Vila se predă nemobilată. Asta e declarat în **patru** locuri:

1. În textul erou, din prima frază.
2. Cu un buton pe fiecare cameră din galerie, care arată fotografia reală, goală.
3. Cu un slider înainte/după la secțiunea „Așa se predă".
4. În footer.

Ce a fost păstrat neatins în imagini, deși ar fi arătat mai bine altfel: structura,
finisajele, tâmplăria, radiatoarele, obiectele sanitare, și **casa în construcție plus
câmpul care se văd pe geamul dormitorului trei**. Zona e în dezvoltare și pagina nu ascunde
asta, o folosește ca argument.

## De completat înainte de publicare

| unde | ce | de ce |
|---|---|---|
| `index.html`, secțiunea `#cifre` | **suprafața utilă în m²** | este a doua întrebare pe care o pune oricine, după preț. Acum lipsește complet din pagină. |
| `index.html`, `#cifre`, rândul „Încălzire" | **de confirmat: pardoseală, calorifere, sau mixt** | specificația primită spune încălzire în pardoseală, dar fotografiile arată calorifere de perete în toate cele trei dormitoare. Pagina scrie acum „pardoseală, plus calorifere la etaj", ceea ce e o presupunere. |
| `index.html`, `#locatia` | **distanțe reale** către Constanța, A4, mare, școală | secțiunea e scrisă intenționat fără cifre, ca să nu inventez kilometri. Cu numere reale devine mult mai puternică. |
| `index.html`, `#camerele` | **fotografie de bucătărie** | vila are bucătărie, dar nu există nicio poză a ei. Galeria o omite în loc să o inventeze. |
| `index.html`, `#pret`, lista „Nu intră" | de confirmat corpurile de iluminat și mobilierul de bucătărie | listate ca neincluse pe baza faptului că e predare la cheie fără mobilă. Dacă ceva din ele intră totuși, se mută în coloana stângă. |
| `index.html`, `<link rel="canonical">` și `og:url` | domeniul real | acum e `copolaestate.ro`, presupus. |

Datele de contact sunt cele reale și sunt deja în pagină: **0725 367 954**,
**razvanalpetri@yahoo.ro**.

## Ce a fost verificat, cu cifre

Măsurat în Chromium, la 1400x900 și la 390x844:

- `Range` returnează **206**, toate cele **25 de resurse** returnează 200.
- Video: `duration` 19,17 s, `readyState` 4, `seekable.length` 1.
- Scrub: `currentTime` urmărește scroll-ul monoton, 0,15 → 3,71 s; 0,40 → 9,88 s;
  0,70 → 17,30 s; 0,95 → 19,11 s.
- **Zero** overflow orizontal: `scrollWidth` egal cu `innerWidth` la ambele lățimi.
- **Zero** erori de consolă.
- Grila de camere colapsează la o coloană sub 860px, coloanele de preț sub 880px.
- Diacriticele `ă â î ș ț Ă Â Î Ș Ț` și `€` sunt prezente în ambele fonturi, verificat
  întâi în cmap cu fontTools, apoi măsurând lățimea reală a glifelor în browser.

**Ce NU a fost verificat:** redarea efectivă a `hero.mp4` într-un browser real. Chromium-ul
din Playwright nu are codec H.264, așa că scrub-ul a fost dovedit pe o variantă VP9 identică
ca durată și cadre, cu exact același cod. H.264 merge în toate browserele reale, dar
deschideți pagina o dată în Chrome sau Safari înainte de publicare.

De asemenea nu a fost testat pe iOS Safari. `muted` și `playsinline` sunt puse, care sunt
condițiile ca iOS să permită setarea programatică a lui `currentTime`.
