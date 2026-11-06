# Landing Alpetri Real Estate

Pagina de prezentare a agenției pentru vânzări imobiliare (comision 3% din
tranzacție), pe identitatea din logo (negru și auriu). Este independentă de site-ul cu scroll 3D din `../web`, care
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

## Adresa publicată

Site-ul e pe Netlify, la https://alpetrirealestate.netlify.app/, împreună cu pagina
vilei (`/vila-valu-lui-traian/`). `og:image`, `og:url` și `canonical` din
`index.html` folosesc această adresă completă, altfel previzualizarea nu apare în
WhatsApp și Facebook. La mutarea pe un domeniu propriu, se schimbă în ambele pagini.

## Oferta afișată

Vânzări imobiliare, cu comision de 3% din prețul de vânzare. Din noiembrie 2026
pagina urmează modelul paginii „Vinde cu Novaria” (structura, nu textele), pe
identitatea Alpetri: comisionul acoperă fotografii și video profesionale, campanii
plătite pe Facebook, Instagram, Google și TikTok (bugetul inclus în comision),
prezentarea pe site și pe conturile agenției, vizionările, negocierea și actele până
la notar. Filmarea cu drona nu face parte din ofertă. Închirierile nu apar.

## Secțiunile, în ordine

1. **Hero**: titlul, ce primește proprietarul, butoanele „Programați o discuție” și
   WhatsApp, logo-ul ca banner și rândul cu patru puncte (3%, producție, reclame, notar).
2. **Diagnosticul**: de ce rămân proprietăți nevândute, trei greșeli și răspunsul nostru.
3. **Servicii complete de vânzare**: 3% mare, ce include, „Vreau să vând”.
4. **Marketing inclus**: producție, distribuție, optimizare, raportare și, alături,
   vila din Valu lui Traian ca exemplu de prezentare (link spre pagina ei).
5. **Cum vindem, în patru pași**.
6. **Portofoliu**: fotografiile vilei, care se deschid pe tot ecranul.
7. **Echipa**: Razvan Alpetri și Badila Bianca.
8. **Întrebări**: cinci întrebări ale proprietarilor, deschise la apăsare.
9. **Contact**: telefonul, WhatsApp, emailul și formularul care compune mesajul.

Din modelul Novaria au rămas pe dinafară, intenționat: bara „0% comision pentru
cumpărători”, „reprezentare exclusivă”, statisticile (ani, recenzii) și secțiunea de
home staging cu AI. Nu sunt date confirmate de agenție; se adaugă când sunt.

## Linkul spre vilă

În footer, deasupra rândului legal, un buton duce la pagina vilei P+1 din Valu lui
Traian (`vila-valu-lui-traian/`). Linkul e relativ, deci funcționează pe orice
domeniu, cu condiția ca folderul vilei să fie publicat lângă landing (arhiva comună
`alpetri-agentie-si-vila-netlify.zip`). Servit singur, cu `serve.mjs landing`,
linkul duce la o pagină inexistentă.

## Cum funcționează contactul

- Butonul „Vreau să vând” și celelalte linkuri de WhatsApp deschid conversația cu un
  mesaj deja scris despre vânzarea unei proprietăți.
- Formularul din secțiunea Contact nu trimite nimic către un server: compune un
  mesaj din nume și detaliile proprietății și deschide WhatsApp. Pagina nu salvează date.
- Pe telefon, după primul ecran, apare jos o bară fixă cu „Sunați” și „WhatsApp”.

## Structură

```
index.html      pagina
styles.css      tot stilul, tokenii de culoare sunt în :root
app.js          linkuri WhatsApp, formular, fotografiile pe tot ecranul, header, bara de apel, paralaxa bannerului
DESIGN.md       deciziile de design și cum a fost făcut bannerul
fonts/          Cinzel și Archivo, self-hosted, latin + latin-ext
media/
  emblem.webp     emblema din logo, cu transparență       (bannerul, sus)
  wordmark.webp   ALPETRI REAL ESTATE, cu transparență    (bannerul, jos)
  emblem-sm.webp  emblema pentru header
  lockup.webp     logo-ul întreg pentru footer
  team-razvan.webp, team-bianca.webp   portretele din secțiunea Echipa, fotografiile originale încadrate 4:5
  foto-1…5-800.webp, foto-1…5-1600.webp  fotografiile vilei, pentru Portofoliu și exemplul din Marketing
  og-image.jpg    imaginea care apare când linkul e trimis pe WhatsApp / Facebook
  favicon-32.png, apple-touch-icon.png
```
