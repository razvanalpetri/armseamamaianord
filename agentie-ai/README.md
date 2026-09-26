# NextFlowAI, agenție de automatizare cu AI

Site one-page cu un obiect 3D real, desenat în WebGL și legat de scroll, construit cu
skill-ul `site-3d-scroll` (rețeta C, geometrie reală, fără video). Trăiește separat de
site-ul din `/src` și de `imobiliare/`, care rămân neatinse.

## Pornire locală

```bash
node agentie-ai/serve.mjs        # sau: PORT=3000 node agentie-ai/serve.mjs
```

Apoi http://localhost:8845. Orice server static merge (nu există video, deci HTTP Range nu
e obligatoriu aici). La deploy: Vercel, Netlify sau Cloudflare Pages, cu folderul `web/`
ca rădăcină.

## Structură

```
PRODUCT.md   poziționare, servicii, ton, anti-referințe. Sursa de adevăr pentru copy.
DESIGN.md    paletă OKLCH, tipografie, formele 3D, interdicții. Sursa de adevăr pentru CSS.
serve.mjs    server static
web/
  index.html
  styles.css
  gl.js        obiectul 3D: 9.000 de puncte (5.200 pe mobil), 6 forme, WebGL pur, 17 KB
  app.js       demo WhatsApp derulat de scroll, calculator, acordeon, marquee, formular
  fonts/       Unbounded + Onest, variabile, self-hosted (latin + latin-ext), licență OFL
```

## Obiectul 3D

Aceleași puncte trec prin șase forme, câte una pe secțiune (atributul `data-shape` din HTML):

| `data-shape` | secțiune | formă |
|---|---|---|
| 0 | hero | sferă care respiră |
| 1 | Agenți de vânzări | coloane care cresc |
| 2 | Sisteme 24/7 | ceas cu 24 de gradații, arată 23:47 |
| 3 | Agenți vocali | undă sonoră animată |
| 4 | WhatsApp | balon de conversație cu „scrie..." |
| 5 | Servicii extra | constelație de noduri (integrări) |

Pe desktop obiectul stă în dreapta și reacționează la cursor. Pe mobil stă sus, iar textul
e pe un card opac dedesubt. Cu `prefers-reduced-motion` animația ambientală se oprește,
transformarea legată de scroll rămâne. Dacă WebGL lipsește, canvas-ul dispare și pagina
funcționează normal.

## De completat înainte de publicare

Datele de mai jos sunt substituenți:

| unde | ce |
|---|---|
| `index.html`, secțiunea `#contact` | telefonul `0700 000 000` și linkul `wa.me/40700000000` |
| `index.html` + `app.js` | e-mailul `salut@nextflowai.ro` (și în `mailto:` din formular); domeniul e presupus |
| `index.html`, programul | „L–V, 9–18" |
| `index.html`, FAQ | răspunsul despre GDPR (găzduire UE, DPA, fără antrenare) trebuie să fie adevărat pentru furnizorii folosiți |
| `index.html`, proces | „prototip în 7 zile", „de obicei în două săptămâni": confirmați că le puteți respecta |

Formularul nu are backend: compune un e-mail către adresa de mai sus. Pentru lead-uri
direct în CRM, înlocuiți handler-ul din `app.js` cu un `fetch` către un webhook (n8n,
Make, Formspree).

Conversația WhatsApp („Casa Lemnului"), jurnalul de noapte din hero și cifrele din
calculator sunt exemple și sunt marcate ca atare pe pagină.
