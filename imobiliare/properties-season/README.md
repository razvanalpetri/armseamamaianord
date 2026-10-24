# ALPETRI PROPERTIES SEASON

Pagina de campanie (sales funnel) pentru cine vrea să cumpere un imobil: ca
investiție sau ca locuință nouă. Aceeași identitate ca landing-ul din `../landing`
(logo-ul Alpetri Real Estate, negru și auriu), dar o pagină separată, cu un singur
scop: vizitatorul apasă butonul și trimite un mesaj pe WhatsApp ca să primească
consultanță gratuită și opțiunile imobiliare potrivite.

## Structura funnel-ului

1. **Hero**: numele campaniei, comutatorul „Cumpărați pentru: Investiție / Locuință”,
   titlul deasupra VSL-ului, VSL-ul și butonul de WhatsApp.
2. **Body**: pentru cine este consultanța, ce primește clientul, cum funcționează,
   cu cine vorbește (echipa), întrebări frecvente.
3. **CTA final** (secțiunea aurie): două întrebări opționale (buget și obiectiv sau
   tip de locuință), apoi butonul „Trimite mesaj pe WhatsApp”.

Toată pagina se adaptează categoriei alese: titlurile, textele, lista de beneficii,
pașii, o întrebare din FAQ, întrebările din CTA și mesajul de WhatsApp.

## Linkuri pentru reclame

| link | ce se deschide |
|---|---|
| `https://ADRESA/#investitie` | varianta pentru investitori |
| `https://ADRESA/#locuinta` | varianta pentru cine își caută o locuință |
| `https://ADRESA/?pentru=locuinta` | la fel, dacă platforma de reclame nu acceptă `#` |
| `https://ADRESA/` | varianta implicită: `data-persona` de pe `<body>` (acum `investitie`) |

Când vizitatorul schimbă varianta din comutator, adresa se actualizează, ca linkul
copiat să păstreze varianta.

## Cum se pune VSL-ul

În `index.html`, pe elementul `<div class="vsl" id="vsl" …>`:

```html
data-src-investitie="https://www.youtube.com/watch?v=XXXXXXXXXXX"
data-src-locuinta="https://vimeo.com/123456789"
```

- Merge un link de **YouTube** (inclusiv nelistat sau Shorts), de **Vimeo** sau un
  **fișier video** pus în folder (de exemplu `media/vsl-investitie.mp4`).
- Dacă aveți un singur videoclip, puneți-l doar într-un câmp: se folosește pentru
  ambele variante.
- Coperta: la YouTube se ia automat. Pentru Vimeo sau fișier, puneți o imagine în
  `data-poster-investitie` / `data-poster-locuinta` (de exemplu `media/coperta.jpg`).
- Playerul se încarcă doar când vizitatorul apasă pe play, ca pagina să rămână rapidă.
- Cât timp câmpurile sunt goale, în cadru scrie „Aici va rula videoclipul de prezentare”.

Un fișier video mare urcat direct în site îngreunează pagina; pentru un VSL lung,
YouTube nelistat sau Vimeo e varianta mai sigură.

## Mesajul de WhatsApp

Numărul este pe `<body data-wa="40725367954">`. Mesajul se compune singur, de exemplu:

```
Bună ziua! Vin din campania ALPETRI PROPERTIES SEASON.
Caut o proprietate pentru investiție.
Buget aproximativ: 80.000–150.000 €.
Obiectiv: venit din chirie.
Aș dori consultanță gratuită și opțiunile care mi se potrivesc.
```

Rândurile de buget și obiectiv apar doar dacă vizitatorul le-a ales. Primul rând
vă spune din ce campanie vine conversația.

## Urmărirea conversiilor

Lipiți codul Meta Pixel sau Google Analytics în `<head>`, unde este comentariul
pregătit. Pagina trimite apoi singură:

| acțiune | Meta Pixel | Google |
|---|---|---|
| apăsare pe orice buton de WhatsApp | `Contact` | `whatsapp_click` |
| pornirea VSL-ului | `ViewContent` | `vsl_play` |

Fiecare eveniment are și varianta: `persona: investitie` sau `persona: locuinta`.

## Publicare

Folderul `imobiliare/properties-season` se urcă exact cum este, ca site separat pe
Netlify (sau în același site, într-un subfolder). Nu are build și nu are dependențe.

Local: `node imobiliare/serve.mjs properties-season`, apoi http://localhost:8844.

### De completat înainte de publicare

| unde | ce |
|---|---|
| `index.html`, `data-src-*` pe `#vsl` | linkul VSL-ului |
| `index.html`, `og:image` | adresa completă după publicare, de exemplu `https://ADRESA/media/og-image.jpg` |
| `index.html`, `<head>` | codul Meta Pixel / Google Analytics, dacă rulați reclame |

## Structură

```
index.html      pagina, cu textele ambelor variante (atributul data-for)
styles.css      fonturile, tokenii, butoanele, headerul, echipa și footerul sunt
                identice cu ../landing/styles.css; restul e specific funnel-ului
app.js          comutatorul, mesajul de WhatsApp, VSL-ul, evenimentele de conversie
DESIGN.md       deciziile de design și regulile de text
fonts/          Cinzel și Archivo, self-hosted
media/          logo, emblemă, portretele echipei, og-image.jpg, favicon
```
