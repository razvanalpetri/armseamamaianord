# DESIGN.md, landing Alpetri Real Estate

Se verifică înainte de fiecare livrare a landing-ului. Dacă pagina contrazice ceva
de aici, pagina greșește.

## De unde vine identitatea

Din logo-ul agenției: emblemă din linii de turnuri, „ALPETRI” în capitale romane,
„REAL ESTATE” într-un grotesc lat și spațiat, totul auriu metalic pe negru mat.
Landing-ul preia exact asta. Culoarea din logo este culoarea angajată; nu se
înlocuiește cu o nuanță „mai de bun gust”.

Regula „fără auriu” din `../DESIGN.md` a fost scrisă pentru site-ul cu scroll din
`../web`, înainte să existe logo-ul. Rămâne valabilă acolo și nu se aplică aici.

## Paletă

```
--ink       oklch(13.5% 0.005 80)   negrul din logo, împins spre cald, niciodată #000
--ink-2     oklch(17% 0.007 80)     suprafețe ridicate (proces, formular)
--line      oklch(29% 0.016 80)     rigle pe negru
--gold-lo   oklch(62% 0.095 76)     auriu în umbră
--gold      oklch(80% 0.105 83)     auriul de text și accent
--gold-hi   oklch(89% 0.075 88)     reflexul metalic
--ivory     oklch(94.5% 0.012 85)   text principal, niciodată #fff
--muted     oklch(74% 0.018 82)     text secundar
--on-gold   oklch(17% 0.02 75)      text pe secțiunea aurie
```

- Secțiunea „Pachet complet” este drenată în auriu, cu emblema presată în metal
  (`multiply`, 20%). E singura suprafață mare aurie și e oferta principală.
- Butonul principal are un gradient vertical discret, ca un profil de metal.
  Text cu gradient nu există nicăieri.

## Tipografie

| rol | font |
|---|---|
| titluri, prețuri, cifrele mari | Cinzel 600, cea mai apropiată literă liberă de „ALPETRI” din logo |
| text, etichete, butoane | Archivo, lățime 100 (106 pe butoane) |
| numere de telefon | Archivo lățime 112, cifre tabulare |

- Ambele fonturi sunt self-hosted, câte două fișiere (latin + latin-ext).
  `ă â î ș ț Ă Â Î Ș Ț` există în cmap la ambele, `ș`/`ț` cu virgulă (U+0219/U+021B),
  verificat și în browser cu testul pe canvas.
- **Cifra 1 din Cinzel arată ca un I roman.** Orice număr care poate conține 1
  (telefon, un preț ca 1.500 lei) se scrie în Archivo. De aceea telefonul mare și
  „1.000 lei” de la videoclipuri sunt în Archivo.
- Titlurile în Cinzel au line-height 1.12, nu 1.0: virgula lui ț coboară sub
  linie și are nevoie de aer. Verificat pe „anunț” la 390 și 1440 px.

## Bannerul din hero

Doar logo-ul, fără fotografie (cerința agenției, după prima variantă în care
fotografia stătea între emblemă și wordmark). Emblema și „ALPETRI REAL ESTATE” sunt
straturi separate, așezate exact ca în logo, ca să rămână clare la orice lățime și
să aibă paralaxă ușoară la mouse (emblema se mișcă puțin, textul din față mai mult).
Scena are 1000 × 946 unități:

| strat | fișier | left | top | width |
|---|---|---|---|---|
| lumină | `.glow`, două gradiente radiale | | | |
| emblemă | `media/emblem.webp` | 15.59% | 0 | 68.94% |
| ALPETRI | `media/wordmark.webp` | 0 | 70.9% | 100% |

Cum au fost făcute straturile: logo-ul trimis de agenție, mărit la 4K (Higgsfield),
apoi auriul separat de negru ca strat cu transparență, față de fundalul estimat, nu
față de negru pur (logo-ul are vignetă; altfel rămâne un pătrat gri vizibil). Tăiat
în emblemă, wordmark și logo întreg (`lockup.webp`, în footer).

`og-image.jpg` este imaginea pentru previzualizarea linkului: logo-ul, prețurile și
telefonul.

## Echipa

Două portrete în același format (640 × 800, 4:5): fundal scos cu Higgsfield, același
contur de lumină aurie din spate, aceeași mărime aparentă a capului, fade la baza
cadrului. În ramă, o lumină aurie și emblema la 14%, ca portretele să stea în logo.
Al doilea portret coboară o treaptă pe desktop, ca scara din „Cum lucrăm”. Numele
sunt scrise exact cum le-a dat agenția: Razvan Alpetri (Broker Imobiliar) și
Badila Bianca (Agent Imobiliar).

## Layout

- Proprietăți logice peste tot (`padding-inline`, `padding-block`).
- Pe telefon logo-ul vine primul, apoi titlul. Pe desktop, text stânga, logo dreapta.
- Intermedierea are cifra mare (2%, 50%), pentru că acolo cifra chiar este oferta.
  Serviciile de marketing sunt o listă de tarife cu puncte de legătură, ca un meniu,
  nu carduri.
- „Cum lucrăm” este o scară care urcă spre dreapta, ca etajele din emblemă.
- Bara fixă de apel există doar sub 760 px și apare după 60% din primul ecran.

## Interdicții

- Text cu gradient, bordură-accent laterală, glassmorphism decorativ.
- Grile de carduri identice, stiva centrată iconiță-titlu-subtitlu.
- Etichete mici majuscule spațiate deasupra secțiunilor. Singura excepție este
  sloganul din footer, care reproduce tipografia din logo.
- Liniuța de dialog folosită ca punctuație în texte.
- Cifre inventate: ani de experiență, număr de tranzacții, recenzii. Pe pagină apar
  doar prețurile date de agenție.

## Ton

Plural de politețe („Ne sunați”, „vă răspundem”), fără „dumneavoastră” în fiecare
frază. Butoanele de serviciu sunt la persoana I („Vreau să vând”), neutre ca registru.

## Verificat la livrare

- Zero overflow orizontal la 360, 390, 820, 1280 și 1440 px.
- Toate resursele răspund 200, consola e curată, cele patru fețe de font se încarcă.
- 9 linkuri WhatsApp cu mesaj precompletat; formularul compune mesajul și deschide
  WhatsApp într-o filă nouă, pagina rămâne deschisă.
- Ancorele din meniu aterizează sub header (84 px de sus).
