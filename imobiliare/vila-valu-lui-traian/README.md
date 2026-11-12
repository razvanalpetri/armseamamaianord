# Vilă P+1 în Valu lui Traian

Pagina de prezentare a unei singure proprietăți, pe identitatea Alpetri Real Estate
(negru mat și auriu, ca landing-ul din `../landing` și campania din
`../properties-season`). Scopul ei: vizitatorul programează o vizionare pe WhatsApp
sau sună.

## Datele vilei

Sursa de adevăr pentru orice text de pe pagină (date primite în noiembrie 2026):

| câmp | valoare |
|---|---|
| preț | 242.000 € cu TVA inclus (200.000 € + TVA 21%) |
| construcție | P+1, nouă, finalizată în 2026; beton armat, zidărie BCA |
| camere | 4: living + 3 dormitoare; 2 băi; bucătărie separată |
| suprafață utilă | 118,8 mp (parter 60 + etaj 58,8); 126,4 mp cu casa scării; 141,8 mp cu terase și balcoane |
| teren | 427 mp, împrejmuit cu gard și poartă, loc de parcare în curte |
| parter | living 34, bucătărie 15,6, baie 4, hol 6,4, terasă la intrare 5,7 mp |
| etaj | dormitoare 18,1 / 15,5 / 11,9, baie 7,1, hol 6,2, două balcoane de câte 2,3, terasă 5,1 mp |
| la cheie | izolație EPS 80 de 10 cm, PVC cu trei rânduri de sticlă, încălzire în pardoseală, centrală pe gaz, parchet, gresie, faianță, uși, sanitare; fără mobilier și electrocasnice |
| dezvoltator | Copola Estate, firmă de familie, construiește în zona Constanței din 2006; peste 10 vile construite și vândute; 9 de același tip vândute în același cartier; ultima din cele trei ale proiectului, primele două vândute în cinci luni; fără comision de agenție |
| contact | Răzvan Alpetri, 0725 367 954 |
| locație | Valu lui Traian, partea dreaptă, în spatele Penny, cartier nou de vile, la aproximativ 15 minute de Constanța |

Dacă se schimbă prețul: `index.html` (hero, fișa tehnică, cazurile de plată,
calculatorul, întrebările și JSON-LD, footer, meta), `app.js` (`PRET`, mesajul de
WhatsApp) și `media/og-image.jpg`. Rata din hero („de la aproximativ 1.168 €”) e
rezultatul calculatorului la valorile implicite; se schimbă împreună cu prețul.

## Structura paginii

1. **Hero**: „Direct de la dezvoltator”, titlul, rezumatul, butonul de vizionare și
   fișa de preț: „ultima dintre cele trei vile”, 242.000 €, rata orientativă (link
   la calculator), suprafețele, telefonul.
2. **Fotografii**, cu nota că mobilierul e de prezentare.
3. **Ce primiți la cheie**: construcție și izolație, încălzire, finisaje, curte.
4. **Spațiile și construcția**: camerele în cifre, fișa tehnică și tabelul
   „Compartimentare” pe parter și etaj.
5. **Planurile vilei**: `media/plan-parter.png` și `media/plan-etaj.png`, decupate
   din planșa primită; la apăsare se deschide planșa întreagă.
6. **Locația**: textul, schema drumului și harta Google încorporată (iframe lazy).
7. **O cumpărați de la cei care au construit-o**: Copola Estate, cifrele, persoana
   de contact și „Cum decurge cumpărarea” în 4 pași.
8. **Cât costă și cum o puteți plăti**: persoană fizică, firmă, credit și
   calculatorul de rată.
9. **Întrebări frecvente**, cu același text în JSON-LD (FAQPage).
10. **Vizionare**: formularul Netlify Forms și linkurile directe.

## Formularul (Netlify Forms)

Formularul `vizionare` e detectat de Netlify la publicare (`data-netlify="true"`).
Cererile apar în Netlify, la site → Forms. Notificarea pe email se setează acolo
(Forms → Form notifications). Confirmarea apare doar dacă Netlify a răspuns cu
succes; altfel apare butonul de WhatsApp cu datele din formular.

## Măsurare

Lipiți Google tag sau Google Tag Manager în `<head>`, unde e comentariul. `app.js`
trimite în `dataLayer` și prin `gtag()` evenimentele `click_whatsapp`, `click_call`
și `lead_form` (cu `cand` și `plata`). În Google Ads, `lead_form` și
`click_whatsapp` se pot marca drept conversii.

## Fotografiile

Fiecare fotografie există în două mărimi: `foto-N-800.webp` pentru grilă și
`foto-N-1600.webp` pentru ecranul complet (browserul o alege singur pe cea mare pe
ecranele dense). Ordinea din pagină:

| fișier | ce arată |
|---|---|
| `foto-1` | livingul de la parter, cu scara spre etaj (fotografia mare) |
| `foto-2` | livingul cu zona de dining |
| `foto-3` | dormitor |
| `foto-4`, `foto-5` | camere cu ieșire pe balcon |

Pentru o fotografie nouă: o salvați în ambele mărimi (1600 și 800 px lățime, 4:3),
adăugați un `<li>` în `ul.photos` din `#galerie`, cu un `alt` care descrie ce se
vede, și schimbați totalul din `.lb-count`. Pe desktop grila e făcută pentru
cinci: una mare și patru mici.

## Harta

Harta încorporată și linkul „Deschideți zona în Google Maps” caută „Penny Valu lui
Traian”, adică zona, nu casa. Pentru un pin exact, înlocuiți ambele cu linkurile
copiate din Google Maps („Distribuiți” → „Încorporați o hartă” / „Copiați linkul”).

## Mesajul de WhatsApp

Toate butoanele de WhatsApp trimit: „Bună ziua! Am văzut vila din Valu lui Traian
(242.000 €) și aș dori să programez o vizionare.”

## Pornire locală

```bash
node imobiliare/serve.mjs vila-valu-lui-traian
```

Apoi http://localhost:8844

## Publicare

Folderul `vila-valu-lui-traian` se urcă exact cum este (Netlify Drop, Vercel,
Cloudflare Pages). Nu are pas de build și nu are dependențe.

Acum e publicată împreună cu site-ul agenției, la
https://alpetrirealestate.ro/vila-valu-lui-traian/. `og:image`, `og:url` și
`canonical` din `index.html` folosesc această adresă completă, altfel
previzualizarea nu apare în WhatsApp și Facebook. La mutarea pe alt domeniu sau
într-un site separat, se schimbă aici.

## Structură

```
index.html      pagina
styles.css      tot stilul; blocurile comune sunt identice cu ../landing și ../properties-season
app.js          track(), WhatsApp, calculatorul de rată, formularul, fotografii și planuri pe tot ecranul, animații, header, bara de apel
DESIGN.md       deciziile de design
fonts/          Cinzel și Archivo, self-hosted, latin + latin-ext
media/
  emblem.webp     emblema, ca filigran în hero, în schema locației și în secțiunea aurie
  emblem-sm.webp  emblema pentru header
  lockup.webp     logo-ul întreg, în footer
  foto-1…5-800.webp, foto-1…5-1600.webp   fotografiile vilei
  plan-parter.png, plan-etaj.png          planurile, decupate din planșa Copola Estate
  og-image.jpg    previzualizarea linkului: logo, preț, datele vilei, telefon
  favicon-32.png, apple-touch-icon.png
```
