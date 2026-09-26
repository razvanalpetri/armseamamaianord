# DESIGN.md, Veghe

Se verifică înainte de fiecare livrare. Dacă build-ul contrazice ceva de aici, build-ul greșește.

## Scena fizică

Un pupitru de centrală telefonică din anii '60, pe hârtie caldă, cu o lampă-indicator
roșu-portocaliu aprinsă. E 23:40, atelierul e gol, dar lampa clipește: cineva a preluat
apelul. Lumina e de birou, nu de club.

Obiectul fizic al brandului: **consola unui operator** (butoane, indicatoare, fișe
tipărite), nu un creier luminos.

Trei cuvinte de voce: **atent, neobosit, meșteșugăresc.**

## Strategia de culoare

**Committed.** Vermillion-ul de semnal duce suprafețe mari: banda de conversie e drenată în
el, iar particulele active ale obiectului 3D sunt în el.

Referință numită: **Teenage Engineering, portocaliul de semnal pe gri cald; lampa-indicator
de pe o centrală Bell.** Reflexul categoriei „AI" (mov, cyan, neon pe negru) e refuzat
explicit.

```
--paper     oklch(95.5% 0.012 85)   /* fundalul, hârtie caldă, niciodată #fff */
--paper-2   oklch(91%   0.016 82)   /* suprafețe ușor ridicate */
--ink       oklch(20%   0.012 60)   /* text și particule, negru cald, niciodată #000 */
--ink-2     oklch(38%   0.012 60)   /* text secundar */
--rule      oklch(80%   0.014 80)   /* rigle */
--signal    oklch(64%   0.205 36)   /* lampa-indicator, culoarea angajată */
--signal-d  oklch(52%   0.180 34)   /* hover, text pe hârtie cu contrast suficient */
--night     oklch(18%   0.014 60)   /* benzile „de noapte" (statement, footer) */
```

Reguli:
- Niciun `#000`, niciun `#fff`. Neutrele sunt împinse spre cald (hue 60 la 85).
- Particulele 3D sunt **cerneală pe hârtie** (blending normal, nu aditiv), ca o gravură în
  puncte. Nu strălucesc. Aproximativ 7% sunt `--signal`.

## Tipografie

| rol | font | setare |
|---|---|---|
| display (hero, titluri) | **Unbounded** variabil | `wght 640..760`, fără caps forțat |
| corp, UI, cifre | **Onest** variabil | `wght 400`, `500` pentru UI, `tabular-nums` pentru cifre |

Ambele self-hosted (woff2 latin + latin-ext), licență OFL. Unbounded e lat și rotunjit, ca
etichetele gravate pe un pupitru; Onest e un grotesc cald, lizibil la 15px pe telefon.
Diacriticele ă â î ș ț se verifică prin măsurare, nu se presupun.

Tracking:

```
hero display     letter-spacing: -.02em ; line-height: 1.02
titluri secțiune letter-spacing: -.015em; line-height: 1.08
kicker (unul!)   Onest 500, .08em, uppercase, 12px, doar în hero
```

## Obiectul 3D

WebGL pur (fără bibliotecă), ~9.000 de puncte pe desktop, ~5.000 pe mobil. Un singur
obiect care **trece prin toată pagina** și își schimbă forma pe capitole:

| secțiune | formă | ce spune |
|---|---|---|
| hero | sferă care „respiră" | agentul ascultă |
| vânzări | coloane care cresc | vânzările urcă |
| 24/7 | inel cu 24 de gradații | ceasul nu se oprește |
| voce | panglică-undă animată | vocea |
| WhatsApp | balon de conversație | mesajul |
| servicii extra | constelație de noduri | integrările |

Cursorul împinge punctele (desktop). `prefers-reduced-motion`: fără animație ambientală,
morfarea rămâne legată de scroll.

## Interdicții pentru proiectul ăsta

- Gradient text, glassmorphism, glow neon, fundal negru-mov.
- Grilă de carduri identice icon + titlu + text pentru servicii.
- Emoji de robot, iconițe „creier", ilustrații stock cu roboți.
- Kicker mic uppercase deasupra fiecărei secțiuni (e voie o dată, în hero).
- `border-left` colorat ca accent.
- Liniuțe em dash în copy.
- Lenis sau orice smooth-scroll (strică `position: sticky`).
