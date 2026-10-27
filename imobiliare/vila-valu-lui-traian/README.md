# Vilă P+1 în Valu lui Traian

Pagina de prezentare a unei singure proprietăți, pe identitatea Alpetri Real Estate
(negru mat și auriu, ca landing-ul din `../landing` și campania din
`../properties-season`). Scopul ei: vizitatorul programează o vizionare pe WhatsApp
sau sună.

## Datele vilei

Sursa de adevăr pentru orice text de pe pagină, exact cum le-a dat agenția:

| câmp | valoare |
|---|---|
| preț | 242.000 €, TVA inclus (200.000 € + TVA) |
| regim de înălțime | P+1 |
| structură | beton armat, zidărie din BCA |
| suprafață utilă | 125 mp |
| teren | 427 mp |
| compartimentare | 3 dormitoare, 1 living, 1 bucătărie, 2 băi |
| utilități | toate utilitățile |
| parcare | loc de parcare în curte |
| locație | Valu lui Traian, partea dreaptă, în spatele Penny, cartier nou de vile, liniștit, la 15 minute de Constanța |

Pe pagină nu apar alte cifre: fără an de construcție, finisaje, orientare sau
distanțe inventate. Dacă se schimbă prețul, el apare în `index.html` (hero, fișa
tehnică, secțiunea Vizionare, footer, meta), în `app.js` (mesajul de WhatsApp) și
în `media/og-image.jpg`.

## Structura paginii

1. **Hero**: titlul „Vilă P+1 în Valu lui Traian”, rezumatul, butonul de vizionare
   și fișa de preț (242.000 €, suprafețele, camerele, telefonul).
2. **Fotografii**: până sosesc fotografiile, un panou care le oferă pe WhatsApp.
3. **Spațiile și construcția**: compartimentarea în cifre și fișa tehnică completă.
4. **Locația**: textul, schema Constanța → Valu lui Traian (15 minute) și un link
   spre zona de lângă Penny pe Google Maps.
5. **Echipa**: Razvan Alpetri și Badila Bianca, cei care fac vizionarea.
6. **Vizionare** (secțiunea aurie): o întrebare opțională, „Când ați vrea să vedeți
   vila?”, apoi butonul de WhatsApp.

## Când sosesc fotografiile

Puneți imaginile în `media/` (JPG sau WebP, cam 1600 px pe latura lungă) și
înlocuiți blocul `<div class="photos-ask">…</div>` din secțiunea `#galerie` cu
galeria. Fotografia cea mai bună a exteriorului poate intra și în hero, în
`og-image.jpg` și ca fundal al fișei de preț.

## Harta

Linkul „Vedeți zona pe hartă” caută „Penny Valu lui Traian” pe Google Maps, adică
zona, nu casa. Pentru un pin exact, înlocuiți linkul cu cel copiat din Google Maps
(„Distribuiți” → „Copiați linkul”).

## Mesajul de WhatsApp

Numărul este pe `<body data-wa="40725367954">`. Butoanele de vizionare trimit:

```
Bună ziua! Mă interesează vila P+1 din Valu lui Traian (242.000 €, TVA inclus).
Aș dori să programez o vizionare.
Prefer: în weekend.
```

Ultimul rând apare doar dacă vizitatorul a ales o variantă în secțiunea Vizionare.
Butonul „Primiți fotografiile” cere fotografiile vilei.

## Urmărirea conversiilor

Lipiți codul Meta Pixel sau Google Analytics în `<head>`, unde este comentariul
pregătit. La fiecare apăsare pe WhatsApp pagina trimite `Contact` (Meta) și
`whatsapp_click` (Google), cu intenția: `vizionare` sau `fotografii`.

## Pornire locală

```bash
node imobiliare/serve.mjs vila-valu-lui-traian
```

Apoi http://localhost:8844

## Publicare

Folderul `vila-valu-lui-traian` se urcă exact cum este (Netlify Drop, Vercel,
Cloudflare Pages). Nu are pas de build și nu are dependențe. După publicare,
puneți în `og:image` adresa completă, de exemplu
`https://vila.alpetri.ro/media/og-image.jpg`, altfel previzualizarea nu apare în
WhatsApp și Facebook.

## Structură

```
index.html      pagina
styles.css      tot stilul; blocurile comune sunt identice cu ../landing și ../properties-season
app.js          linkuri WhatsApp, alegerea zilei, evenimente de conversie, header, bara de apel
DESIGN.md       deciziile de design
fonts/          Cinzel și Archivo, self-hosted, latin + latin-ext
media/
  emblem.webp     emblema, ca filigran în hero, în schema locației și în secțiunea aurie
  emblem-sm.webp  emblema pentru header
  lockup.webp     logo-ul întreg, în footer
  team-razvan.webp, team-bianca.webp
  og-image.jpg    previzualizarea linkului: logo, preț, datele vilei, telefon
  favicon-32.png, apple-touch-icon.png
```
