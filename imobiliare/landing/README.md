# Landing Alpetri Real Estate

Pagina de prezentare a agenției, cu servicii și prețuri, pe identitatea din logo
(negru și auriu). Este independentă de site-ul cu scroll 3D din `../web`, care
rămâne neatins.

## Pornire locală

```bash
node imobiliare/serve.mjs landing        # sau: PORT=3000 node imobiliare/serve.mjs landing
```

Apoi http://localhost:8844. Aici nu există video cu scrub, deci merge și orice alt
server static.

## Publicare

Folderul `imobiliare/landing` se urcă exact cum este (Netlify Drop, Vercel,
Cloudflare Pages, orice hosting static). Nu are pas de build și nu are dependențe.

## Date de contact

Telefonul `0725.367.954` (`tel:+40725367954`) și emailul `razvanalpetri@yahoo.ro` sunt
cele reale. WhatsApp folosește același număr, scris o singură dată pe
`<body data-wa="40725367954">`; linkurile `https://wa.me/40725367954` din HTML sunt
rezerva pentru browsere fără JavaScript.

## De completat înainte de publicare

| unde | ce |
|---|---|
| `index.html`, `og:image` | adresa completă după publicare, de exemplu `https://alpetri.ro/media/og-image.jpg`, altfel previzualizarea nu apare în WhatsApp și Facebook |

## De confirmat cu agenția

- Comisionul la închirieri este scris „50% din tranzacție”, exact ca în brief. Pe
  piață se spune de obicei „50% din chiria lunară”. Dacă asta e intenția, se schimbă
  un singur rând în secțiunea Servicii (și eticheta din formular).
- Brieful folosea și „RON”, și „lei”. Pe pagină apare peste tot „lei”, e aceeași
  monedă.

## Cum funcționează contactul

- Fiecare serviciu are un link „Vreau …” care deschide WhatsApp cu un mesaj deja
  scris pentru serviciul respectiv.
- Formularul din secțiunea Contact nu trimite nimic către un server: compune un
  mesaj din serviciu, nume și detalii și deschide WhatsApp. Pagina nu salvează date.
- Pe telefon, după primul ecran, apare jos o bară fixă cu „Sunați” și „WhatsApp”.

## Structură

```
index.html      pagina
styles.css      tot stilul, tokenii de culoare sunt în :root
app.js          linkuri WhatsApp, formular, header, bara de apel, paralaxa bannerului
DESIGN.md       deciziile de design și cum a fost făcut bannerul
fonts/          Cinzel și Archivo, self-hosted, latin + latin-ext
media/
  emblem.webp     emblema din logo, cu transparență       (bannerul, sus)
  wordmark.webp   ALPETRI REAL ESTATE, cu transparență    (bannerul, jos)
  emblem-sm.webp  emblema pentru header
  lockup.webp     logo-ul întreg pentru footer
  team-razvan.webp, team-bianca.webp   portretele din secțiunea Echipa, fotografiile originale încadrate 4:5
  og-image.jpg    imaginea care apare când linkul e trimis pe WhatsApp / Facebook
  favicon-32.png, apple-touch-icon.png
```
