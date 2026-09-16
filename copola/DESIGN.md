# DESIGN.md, Copola Estate

Se verifică înainte de fiecare livrare. Dacă build-ul contrazice ceva de aici, build-ul greșește.

## Scena fizică

Cineva stă pe marginea patului, într-un apartament de bloc din Constanța, joi seara, după
program. Telefonul e la 30 cm de față și e singura sursă de lumină din cameră. Se uită la
o casă pe care nu a văzut-o încă, și încearcă să își dea seama dacă îi încape canapeaua
în living și dacă își permite.

Pagina trebuie să arate ca acel moment: fond întunecat care nu obosește ochiul seara, și
camerele vilei intrând în cadru ca niște ferestre luminate.

## Strategia de culoare

**Committed.** Verdele saturat duce între 30 și 60% din suprafață. Nu „neutru plus accent
de 10%", ăla e regimul timid care face pagina să pară un template.

Toate culorile sunt extrase din materialele reale ale vilei, nu dintr-un moodboard:

| sursă reală în vilă | token |
|---|---|
| marmura Nero Marquina din cele două băi | `--nero`, `--nero-2` |
| microcimentul bej de pe peretele băii mari | `--plaster`, `--plaster-2` |
| parchetul laminat gri și stejarul din staging | `--oak` |
| câmpul verde care se vede pe geamul dormitorului mic | `--field`, `--field-hi` |

```
--nero       oklch(15% 0.016 158)   /* ground. Negru de marmură, subton VERDE, niciodată #000 */
--nero-2     oklch(20% 0.018 158)   /* suprafețe ridicate */
--plaster    oklch(95% 0.010  92)   /* microciment, fundal secțiuni luminoase */
--plaster-2  oklch(88% 0.013  90)   /* microciment în umbră */
--oak        oklch(72% 0.045  75)   /* stejar, text secundar pe fond închis */
--oak-d      oklch(46% 0.030  75)   /* text secundar pe fond deschis */
--field      oklch(54% 0.105 135)   /* VERDE ANGAJAT, culoarea de teren */
--field-hi   oklch(68% 0.115 132)   /* hover, accente pe fond închis */
--line       oklch(30% 0.012 158)   /* rigle și chenare pe închis */
```

Reguli:

- Niciun `#000`, niciun `#fff`. Neutrele închise sunt împinse spre verde (marmura), cele
  deschise spre cald (microcimentul). Croma între 0.010 și 0.020 e suficientă.
- Croma scade pe măsură ce luminozitatea se apropie de 0 sau de 100.
- **Negrul de aici are subton verde, nu albastru.** Site-ul din `/imobiliare` folosește
  negru-albastru. Dacă acesta ajunge albastru, cele două devin frați și amândouă pierd.
- Verdele are voie pe suprafețe mari. Secțiunea „Ce intră în preț" e **drenată** în verde,
  nu decorată cu el.
- **Auriul este interzis în orice doză.** Navy cu auriu este reflexul de ordinul întâi al
  categoriei.

## Tipografie

Două familii variabile, self-hostate, patru fișiere woff2. Fără Google Fonts la runtime.

| rol | setare |
|---|---|
| display (hero, titluri secțiune) | Bricolage Grotesque, `opsz 96`, `wght 780`, `wdth 100` |
| titluri mici, subsecțiuni | Bricolage Grotesque, `opsz 24`, `wght 620` |
| corp | Public Sans, `wght 400` |
| date, prețuri, tabele | Public Sans, `wght 560`, `font-variant-numeric: tabular-nums` |

Tracking, calibrat pentru aceste două fețe (NU pentru un didone, valorile diferă):

```
hero               letter-spacing: -.02em ; line-height: 0.98
titluri secțiune   letter-spacing: -.012em; line-height: 1.04
rânduri de listă   letter-spacing: 0      ; line-height: 1.35
corp               letter-spacing: .002em ; line-height: 1.6
```

De ce Bricolage și nu altceva:

- Are **axă optică reală** (`opsz 12..96`). Aceeași familie desenează altfel la 14px și la
  120px, ceea ce niciun grotesc static nu face. Titlurile capătă masă fără să devină greoaie.
- Terminațiile ușor neregulate se citesc ca **desen**, nu ca font implicit. Un grotesc
  perfect neutru la 120px peste un video arată a Figma, nu a brand.
- Public Sans dă cifre tabulare native, deci tabelul de preț și fișa tehnică se aliniază
  fără să import un mono. **Etichetele mici majuscule tracked deasupra fiecărei secțiuni
  sunt interzise**, sunt schelărie de AI și reflexul de ordinul doi al categoriei.

### Diacriticele, verificate în cmap, nu presupuse

Verificat cu fontTools pe fișierele livrate, nu din documentație:

```
Bricolage  : ă â î ș ț Ă Â Î Ș Ț  toate prezente
Public Sans: ă â î ș ț Ă Â Î Ș Ț  toate prezente
ș = U+0219, ț = U+021B, cu VIRGULĂ dedesubt, nu sedilă
```

Textul sursă se scrie **exclusiv** cu U+0219 / U+021B. Formele cu sedilă (U+015F, U+0163)
sunt interzise în copy. Bricolage nici măcar nu are `ţ` cu sedilă, deci o sedilă strecurată
în copy ar cădea pe font de rezervă și s-ar vedea.

### `ș` și `ț` nu au voie în linia de display

Regulă moștenită dintr-un build anterior, măsurată acolo și valabilă și aici: la peste
130px, virgula de sub `ș` și `ț` se desprinde vizual de literă și se citește ca un apostrof
pus greșit. Mărirea interliniajului nu rezolvă, pentru că problema nu e spațiul.

**În `h1.display` se folosesc doar cuvinte fără `ș` și `ț`.** Restul paginii păstrează
diacriticele complete. `ă`, `â`, `î` nu au problema asta, semnul lor stă deasupra.

Titlul ales respectă regula: „La cheie înseamnă exact ce scrie mai jos." Are `î` și `ă`,
niciun `ș`, niciun `ț`.

Fonturi respinse explicit ca reflex de categorie: Playfair Display, Cormorant, Instrument
Serif și Sans, Inter, DM Sans și Serif, Fraunces, Syne, Space Grotesk, Outfit, Plus Jakarta
Sans. Respins separat: **Archivo**, pentru că e fața site-ului din `/imobiliare`.

## Text peste video

Alb peste imagine eșuează mai des decât reușește. Se aplică toate trei, nu unul:

```css
.hero-media { filter: saturate(.94) brightness(.72); }
.hero::before {
  content: ""; position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(180deg,
    oklch(15% .016 158 / .72) 0%,  oklch(15% .016 158 / .48) 34%,
    oklch(15% .016 158 / .84) 68%, oklch(15% .016 158 / .97) 100%);
}
.hero h1 { text-shadow: 0 2px 44px oklch(10% .014 158 / .85), 0 1px 4px oklch(10% .014 158 / .5); }
```

Cadrele erou au fost tăiate cu **spațiu negativ sus**, ca titlul să aibă unde sta.

## Layout

- Ritm variabil. Padding identic peste tot arată a template.
- **Proprietăți logice**, `padding-inline` și `padding-block`, niciodată shorthand-ul
  `padding` care omoară padding-ul orizontal al containerului.
- Cardurile sunt răspunsul leneș. Carduri în carduri sunt întotdeauna greșite.
- Nu se centrează tot. Stiva centrată iconiță, titlu, subtitlu este interzisă.
- Fișa tehnică e **tabel cu cifre aliniate**, nu grilă de carduri cu iconițe.

## Interdicții pentru acest proiect

- Bordură-accent laterală (`border-left: 4px solid`).
- Text cu gradient (`background-clip: text`).
- Glassmorphism ca decor.
- Șablonul hero-metric: cifră mare, etichetă mică, statistici de sprijin, accent gradient.
- Grile de carduri identice.
- Modal ca prima idee.
- Corp de text scris integral cu majuscule.
- Etichete mici majuscule tracked deasupra fiecărei secțiuni.
- Navy cu auriu, în orice doză. Auriu, în orice doză.
- Serif italic de display.
- Negru cu subton albastru, pentru că e paleta celuilalt site din repo.

## Erou, constrângeri tehnice

- Cadrul de start și cel de final ale unui clip se taie **din aceeași fotografie**, unul larg
  și unul apropiat. Altfel modelul materializează obiectele care apar doar în cadrul final,
  în loc să miște camera spre ele.
- Un singur gest continuu de cameră pe clip. Fără rotație, fără tilt, viteză constantă.
  Cuvinte interzise în prompt: cinematic, smooth, gently, elegant, sweeping, gracefully.
  Se înlocuiesc cu distanță plus durată („about three metres across the full five seconds").
- Buget de schimbare 15 la 25% pe clip de 5s. Peste 40% apare smearing.
- La clipul final se schimbă **doar lumina**, nu și geometria. Cadrul de amurg se generează
  separat ca imagine, înainte de animare, ca să rămânem în buget.
- Audio oprit pe toate clipurile.
- Encodare pentru scrub: fiecare cadru keyframe (`keyint=1`), 30fps, `+faststart`.
  Fișierele all-keyframe sunt mari prin construcție. Dimensiunea se spune cu voce tare
  înainte de livrare, nu se descoperă în producție.
- Serverul TREBUIE să suporte HTTP Range. Fără Range, `video.currentTime` nu face absolut
  nimic, `seekable.length` rămâne 0, iar scrub-ul pare rupt fără nicio eroare în consolă.
  `python3 -m http.server` NU suportă Range.

## Onestitate vizuală

Mobilierul e staging virtual. Regula din PRODUCT.md se traduce în design astfel:

- Galeria are un **slider înainte/după** pe cel puțin o cameră, cu fotografia reală dedesubt.
  Mânerul e vizibil din start, nu ascuns până la hover, altfel nimeni nu îl găsește pe telefon.
- Fiecare imagine cu staging poartă atributul `data-staged="true"` și o notă vizibilă,
  nu un `title` pe care nimeni nu îl citește.
- Fotografiile reale ale băilor și ale camerelor goale rămân accesibile în pagină.
