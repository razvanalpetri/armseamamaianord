# Alpetri Real Estate

Site cu erou video 3D legat de scroll, construit cu skill-ul `site-3d-scroll`.
Trăiește separat de site-ul ARM Sea Mamaia Nord din `/src`, care rămâne neatins.

## Pornire locală

```bash
node imobiliare/serve.mjs        # sau: PORT=3000 node imobiliare/serve.mjs
```

Apoi http://localhost:8844

**Serverul static trebuie să suporte HTTP Range.** Fără Range, `video.currentTime`
nu face absolut nimic, `seekable.length` rămâne 0, iar scrub-ul pare rupt fără
nicio eroare în consolă. `python3 -m http.server` NU suportă Range. `serve.mjs`
din acest folder suportă. Verificare, se așteaptă 206:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -r 100-200 http://localhost:8844/media/hero.mp4
```

La deploy pe Vercel, Netlify, Cloudflare Pages sau nginx, Range vine implicit.

## Structură

```
PRODUCT.md      poziționare, ton, anti-referințe. Sursa de adevăr pentru copy.
DESIGN.md       paletă OKLCH, tipografie, interdicții. Sursa de adevăr pentru CSS.
prompts/        prompturile JSON ale cadrelor erou, pentru regenerare
serve.mjs       server static cu HTTP Range
web/            livrabilul
  index.html
  styles.css
  app.js
  fonts/        Archivo variabil, self-hosted (latin + latin-ext)
  media/        hero.mp4, hero-sm.mp4, imagini
build/          material brut din generare, gitignorat
```

## Eroul

Tur filmat printr-o vilă mediteraneană de lux cu piscină. Trei clipuri Kling 3.0
înlănțuite, fiecare o singură mișcare continuă de cameră:

```
glisare pe lângă piscină → intrare sub loggia → prin ușile glisante în living
```

Cadrul de start al fiecărui clip se extrage din **randarea** clipului precedent
(`ffmpeg -sseof -0.25`), nu din același still. Dacă ambele clipuri primesc
aceeași imagine de referință, al doilea pornește ușor deplasat și cusătura se
vede.

15 s, 1600x900 la sursă, encodat all-keyframe (`keyint=1`) la 30 fps ca
scrub-ul să nu sară între keyframe-uri.

Videoul se afișează **fără filtru de întunecare**. Contrastul pentru textul din
hero se obține local, dintr-un gradient doar în banda de jos. Mijlocul cadrului
rămâne complet curat.

Se livrează două variante: `hero.mp4` (1280, 11,6 MB) și `hero-sm.mp4`
(1100, 7,4 MB) pentru ecrane sub 820px sau conexiuni 2G/3G. Alegerea se face
în JS **înainte** de încărcare, altfel se descarcă amândouă.

Fișierele all-keyframe sunt mari prin construcție. Dacă e nevoie de mai mic:
scurtați durata, coborâți rezoluția, sau creșteți CRF. VP9/WebM a fost testat
și măsurat, iese de aproape 3x mai mare la calitate egală pe conținutul ăsta
(beton, plasă de schelă, pietriș), deci nu e livrat.

## De completat înainte de publicare

Telefonul `0725.367.954` este cel real. Datele de mai jos sunt încă substituent:

| unde | ce |
|---|---|
| `index.html`, `contact@alpetri.ro` | emailul real |
| `index.html`, `Strada Exemplu 12, Constanța` | adresa reală |
| `index.html`, blocul `dl.field` | cele 4 cifre despre agenție |
| `index.html`, programul | orele reale |

Orașul a fost presupus Constanța, din contextul repo-ului. Corectați dacă e altul.

Site-ul este de **prezentare**: nu listează proprietăți, prețuri sau filtre de
căutare. Asta e o decizie, nu o scăpare, și e scrisă în PRODUCT.md ca principiul 1.
Dacă apare nevoia de listinguri, ele merg pe o pagină separată, nu în prima.

Imaginile și videoul sunt generate cu AI și au caracter ilustrativ, ceea ce este
declarat în footer.
