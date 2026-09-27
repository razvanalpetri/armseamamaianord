# Alpetri Real Estate

Site cu erou video 3D legat de scroll și cu listările agenției, construit cu
skill-ul `site-3d-scroll`. Trăiește separat de site-ul ARM Sea Mamaia Nord din
`/src`, care rămâne neatins.

Trei pagini:

| pagină | ce face |
|---|---|
| `index.html` | eroul cu scrub la scroll, agenția, listările recente, înainte/după, servicii, contact |
| `listari.html` | toate listările, cu filtre (tranzacție, tip, zonă, camere, buget) și ordonare |
| `proprietate.html?id=…` | fișa unei proprietăți: galerie cu lightbox, cifre, descriere, dotări, hartă, telefon și WhatsApp |

Listările vin dintr-un singur fișier, `web/data/listings.json`. Nu există backend
și nu e nevoie de unul: se editează JSON-ul, se face deploy, gata.

## Pornire locală

```bash
node imobiliare/serve.mjs        # sau: PORT=3000 node imobiliare/serve.mjs
```

Apoi http://localhost:8844

Listările se încarcă prin `fetch`, deci și paginile fără video au nevoie de un
server: deschise direct din fișier (`file://`), lista rămâne goală și apare un
mesaj în locul ei.

**Serverul static trebuie să suporte HTTP Range.** Fără Range, `video.currentTime`
nu face absolut nimic, `seekable.length` rămâne 0, iar scrub-ul pare rupt fără
nicio eroare în consolă. `python3 -m http.server` NU suportă Range. `serve.mjs`
din acest folder suportă. Verificare, se așteaptă 206:

```bash
curl -s -o /dev/null -w "%{http_code}\n" -r 100-200 http://localhost:8844/media/hero.mp4
```

La deploy pe Vercel, Netlify, Cloudflare Pages sau nginx, Range vine implicit.

## Cum se adaugă sau se modifică o listare

Totul e în `web/data/listings.json`, un vector de obiecte. O intrare completă:

```json
{
  "id": "solaris-residence-2-camere",
  "titlu": "Solaris Residence, 2 camere",
  "tip": "apartament",
  "tranzactie": "vanzare",
  "zona": "Tomis Plus",
  "oras": "Constanța",
  "adresa": "Str. Solaris 4, Tomis Plus, Constanța",
  "pret": 78400,
  "camere": 2,
  "suprafata": 54,
  "etaj": "3/7",
  "an": 2026,
  "stadiu": "fațadă",
  "disponibil": "Recepție: trimestrul 1, 2027",
  "recomandat": true,
  "descriere": ["Primul paragraf.", "Al doilea paragraf."],
  "dotari": ["Încălzire în pardoseală", "Loc de parcare inclus"],
  "imagini": ["media/l/solaris-living.jpg", "media/l/solaris-dormitor.jpg"],
  "harta": "https://maps.google.com/?q=Tomis+Plus,+Constanța",
  "adaugat": "2026-09-20"
}
```

| câmp | valori | obligatoriu |
|---|---|---|
| `id` | unic, doar litere mici, cifre și cratime; e adresa paginii | da |
| `tip` | `apartament`, `studio`, `vila`, `casa`, `teren`, `comercial` | da |
| `tranzactie` | `vanzare` sau `inchiriere` | da |
| `pret` | număr, fără puncte; lipsă înseamnă „Preț la cerere" | nu |
| `perioada` | `"lună"` la chirii, se afișează `520 €/lună` | doar la chirii |
| `teren`, `deschidere` | m² de teren și metri de deschidere, folosite mai ales la terenuri | nu |
| `stadiu` | text liber, apare ca etichetă pe imagine: `structură`, `fațadă`, `finisat`, `disponibil` | nu |
| `recomandat` | `true` pune listarea în primele 6 de pe prima pagină | nu |
| `real` | `true` pune eticheta „Fotografii reale" pe imagine și în fișă | nu |
| `imagini` | prima este coperta; căile sunt relative la `web/` | nu, dar arată gol fără |
| `adaugat` | `AAAA-LL-ZZ`, ordonarea „cele mai recente" se face după el | recomandat |

Referința (`ALP-001`, `ALP-002`…) se calculează din poziția în fișier. Dacă vreți
una stabilă, puneți `"ref": "ALP-2041"` în obiect.

**Imagini.** Puneți fotografiile în `web/media/l/`, în JPEG, la 1400px lățime.
Dacă puneți și o variantă `nume-s.jpg` de 720px lângă `nume.jpg`, grila o
folosește automat pe cea mică. Fără varianta mică, merge și cu una singură.
Fotografiile din `assets/` (rădăcina repo-ului) sunt HEIC sau JPEG mari și nu se
pun direct, se convertesc întâi.

**Datele de contact** apar în HTML-ul celor trei pagini și în `listings.js`
(butoanele de telefon și WhatsApp din fișă). Se schimbă în toate locurile, vezi
tabelul de mai jos.

## Structură

```
PRODUCT.md      poziționare, ton, anti-referințe. Sursa de adevăr pentru copy.
DESIGN.md       paletă OKLCH, tipografie, interdicții. Sursa de adevăr pentru CSS.
prompts/        prompturile JSON ale cadrelor erou, pentru regenerare
serve.mjs       server static cu HTTP Range
web/            livrabilul
  index.html
  listari.html
  proprietate.html
  styles.css
  app.js        scrub, reveal, marquee, imagine după cursor, înainte/după
  listings.js   citește data/listings.json și randează listările în toate paginile
  data/listings.json
  fonts/        Archivo variabil, self-hosted (latin + latin-ext)
  media/        hero.mp4, hero-sm.mp4, imagini
  media/l/      fotografiile listărilor, 1400px + varianta -s de 720px
build/          material brut din generare, gitignorat
```

## Eroul

Transformare cu cameră fixă, 4 stări generate în lanț (fiecare din precedenta,
ca geometria să rămână blocată), apoi 4 clipuri Kling 3.0 concatenate:

```
placă → structură → înălțime + fațadă → recepție cu lumini → push-in la balcon
```

20,1 s, 1600x900 la sursă, encodat all-keyframe (`keyint=1`) la 30 fps ca
scrub-ul să nu sară între keyframe-uri.

Se livrează două variante: `hero.mp4` (1280, 11,6 MB) și `hero-sm.mp4`
(1100, 7,4 MB) pentru ecrane sub 820px sau conexiuni 2G/3G. Alegerea se face
în JS **înainte** de încărcare, altfel se descarcă amândouă.

Fișierele all-keyframe sunt mari prin construcție. Dacă e nevoie de mai mic:
scurtați durata, coborâți rezoluția, sau creșteți CRF. VP9/WebM a fost testat
și măsurat, iese de aproape 3x mai mare la calitate egală pe conținutul ăsta
(beton, plasă de schelă, pietriș), deci nu e livrat.

## De completat înainte de publicare

Datele de mai jos sunt inventate ca substituent și trebuie înlocuite:

| unde | ce |
|---|---|
| cele trei `.html`, `0722 000 000` | telefonul real (header, marquee, contact, footer, plus `tel:`) |
| `listings.js`, blocul `AGENTIE` | același telefon, în format `+40…` și fără `+` pentru WhatsApp |
| cele trei `.html`, `contact@alpetri.ro` | emailul real |
| cele trei `.html`, `Strada Exemplu 12, Constanța` | adresa reală |
| `data/listings.json` | cele 13 listări sunt exemple; prețurile, zonele și stadiile sunt inventate |
| `index.html`, blocul `dl.field` | cele 4 cifre despre agenție |
| `index.html`, programul | orele reale |

Listarea „Studio Mamaia Nord, mobilat" folosește fotografii reale din `assets/`
(studioul ARM Sea), ca exemplu de listare cu poze proprii. Dacă nu e de închiriat
prin agenție, se șterge din JSON.

Orașul a fost presupus Constanța, din contextul repo-ului. Corectați dacă e altul.

Imaginile ansamblurilor și ale listărilor exemplu sunt generate cu AI și au
caracter ilustrativ, ceea ce este declarat în footer; excepția sunt cele marcate
„fotografii reale". Când apar fotografii reale de pe șantierele proprii, ele
înlocuiesc cadrele generate: stadiul real bate randarea, e principiul 1 din
PRODUCT.md.
