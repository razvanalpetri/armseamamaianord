# DESIGN.md, Alpetri Real Estate

Documentul ăsta se verifică înainte de fiecare livrare. Dacă build-ul contrazice ceva de
aici, build-ul greșește.

## Scena fizică

Cineva stă în mașină, seara, în parcarea de lângă un ansamblu în construcție. Telefonul e
în mână, ecranul e singura sursă de lumină de la nivelul feței. Afară e albastru, blocul e
gri, iar în două apartamente de la etajul 5 sunt aprinse luminile.

Site-ul trebuie să arate ca acel moment. De aici vine toată paleta. Nu am ales culorile ca
să fie „premium", le-am extras din scena pe care o vinde eroul.

## Strategia de culoare

**Committed.** O culoare saturată duce între 30 și 60% din suprafață. Nu „neutru plus un
accent de 10%", ăla e regimul restrâns și face pagina timidă.

Referință numită, ca ambiția să nu devină bej: **șantier luminat cu sodiu, la ora albastră.**

Chihlimbarul NU este auriu. Auriul e metalic și decorativ, apare în reflexul navy+gold al
categoriei. Chihlimbarul de aici e **lumină**, are luminozitate mare și croma mare, și e
literalmente payoff-ul din clipul erou: fereastra aprinsă.

```
--ink        oklch(14% 0.020 258)   /* ground, blue-black, niciodată #000 */
--ink-2      oklch(19% 0.022 258)   /* suprafețe ridicate */
--concrete   oklch(62% 0.012  72)   /* beton, gri cald */
--concrete-d oklch(44% 0.014  72)   /* beton în umbră, text secundar pe deschis */
--limestone  oklch(94% 0.012  78)   /* travertin, fundal secțiuni luminoase */
--amber      oklch(78% 0.155  68)   /* fereastra aprinsă, culoarea angajată */
--amber-hi   oklch(86% 0.130  72)   /* hover, accente pe fundal închis */
--line       oklch(32% 0.014 258)   /* rigle, chenare pe închis */
```

Reguli:

- Niciun `#000`, niciun `#fff`. Toate neutrele sunt împinse spre albastru (ground) sau spre
  cald (piatră). Croma 0.012 la 0.022 e suficientă.
- Croma scade pe măsură ce luminozitatea se apropie de 0 sau 100.
- Chihlimbarul are voie pe suprafețe mari. Secțiunea de conversie e drenată în chihlimbar,
  nu decorată cu el.

## Tipografie

**O singură familie, două lățimi.** Archivo Variable, self-hosted, axe `wght 100..900` și
`wdth 62..125`. Două fișiere woff2 (latin + latin-ext), nu Google Fonts la runtime.

| rol | setare |
|---|---|
| display (hero, titluri secțiune) | Archivo `wdth 125`, `wght 780`, caps |
| titluri mici / subsecțiuni | Archivo `wdth 112`, `wght 640` |
| corp | Archivo `wdth 100`, `wght 400` |
| date, cifre, tabele | Archivo `wdth 100`, `wght 500`, `font-variant-numeric: tabular-nums` |

Tracking, calibrat pentru un grotesc lat (NU pentru didone, valorile diferă):

```
hero caps          letter-spacing: .005em ; line-height: 1.0
titluri secțiune   letter-spacing: .01em  ; line-height: 1.02
rânduri caps listă letter-spacing: .04em  ; line-height: 1.25
corp               letter-spacing: 0      ; line-height: 1.55
```

De ce Archivo și nu altceva:

- Are **masă**. Un didone cu contrast mare, la 160px peste un video întunecat, dispare.
  Briefingul spune structural și masiv, deci fața de display are nevoie de greutate.
- Axa de lățime dă un Expanded arhitectural din același fișier, fără a doua familie.
- Cifre tabulare native, deci secțiunile de date arată ca fișă de teren fără să import un
  mono. **Etichetele mici mono, tracked, deasupra fiecărei secțiuni sunt interzise**, sunt
  schelărie de AI și reflexul de ordinul doi al categoriei.
- Diacriticele românești sunt verificate în cmap, nu presupuse: `ă â î ș ț Ă Â Î Ș Ț` toate
  prezente, iar `ș`/`ț` sunt **U+0219 / U+021B, cu virgulă dedesubt**, nu sedilă.
  Se reverifică vizual la fiecare livrare, glifa poate exista și totuși să fie desenată greșit.

### Diacriticele cu virgula dedesubt nu au voie in linia de display

`ș` si `ț` (U+0219 / U+021B) au virgula desenata **detasat sub linia de baza**.
La corp de text si la titluri de sectiune arata corect. La 130px si peste,
distanta dintre litera si virgula creste proportional, virgula ajunge in banda
randului urmator si se citeste ca un apostrof pus gresit. Marirea interliniajului
nu rezolva, pentru ca problema nu e spatiul, ci faptul ca semnul pare desprins
de litera lui.

Masurat pe acest build: titlul "De la fundatie la cheie" la 137px punea virgula
lui T la 0.29em sub linia de baza, peste randul "CHEIE". Titlul a fost schimbat
in "De la placa la cheie".

**Regula:** in `h1.display` se folosesc doar cuvinte fara `ș` si `ț`. Restul
paginii pastreaza diacriticele complete, verificate. `ă`, `â`, `î` nu au
problema asta, semnul lor sta deasupra.

Fonturi respinse explicit ca reflex: Playfair Display, Cormorant, Instrument Serif/Sans,
Inter, DM Sans/Serif, Fraunces, Syne, Space Grotesk, Outfit, Plus Jakarta Sans.

## Text peste imagine sau video

**Eroul se vede curat.** Clientul a cerut explicit videoul fără ceață, cu foarte puțin
text peste el. Asta răstoarnă rețeta obișnuită, care întunecă tot cadrul ca să susțină
un titlu mare. Aici titlul se micșorează și coboară, iar contrastul se obține **local**,
doar în banda de jos unde stă textul.

```css
.hero-sticky video { /* niciun filtru: fără brightness, fără desaturare */ }
.hero-scrim {
  background: linear-gradient(180deg,
    oklch(14% .02 258 / .42) 0%,   oklch(14% .02 258 / .10) 14%,
    oklch(14% .02 258 / 0)   34%,  oklch(14% .02 258 / 0)   52%,
    oklch(14% .02 258 / .58) 78%,  oklch(14% .02 258 / .90) 100%);
}
.hero h1 { font-size: clamp(1.75rem, 1.05rem + 2.1vw, 3.1rem); }
```

Mijlocul cadrului, între 34% și 52%, rămâne complet transparent. Banda de sus e doar
cât să țină marca lizibilă.

Pentru imaginile **statice** de fundal, unde textul e mare, regula veche rămâne
valabilă: se aplică toate trei, filtru pe imagine, scrim real și umbră pe titlu.

Cadrele erou se generează cu **spațiu negativ** acolo unde va sta textul.

## Layout

- Ritm variabil. Padding identic peste tot arată a template.
- **Proprietăți logice**, `padding-inline` și `padding-block`, niciodată shorthand-ul
  `padding` care omoară padding-ul orizontal al containerului.
- Cardurile sunt răspunsul leneș. Carduri în carduri sunt întotdeauna greșite.
- Nu se centrează tot. Stiva centrată iconiță-titlu-subtitlu este interzisă.
- Grila de proprietăți are celule **inegale**, nu `repeat(auto-fit)` cu toate la fel.

## Interdicții pentru acest proiect

- Bordură-accent laterală (`border-left: 4px solid`).
- Text cu gradient (`background-clip: text`).
- Glassmorphism ca decor.
- Șablonul hero-metric: cifră mare, etichetă mică, statistici de sprijin, accent gradient.
- Grile de carduri identice.
- Modal ca prima idee.
- Corp de text scris integral cu majuscule.
- Etichete mici majuscule tracked deasupra fiecărei secțiuni.
- Navy cu auriu, în orice doză.
- Serif italic de display. Nu intrăm în reflexul de ordinul doi după ce l-am evitat pe primul.

## Erou, constrângeri tehnice

Rețeta este **turul filmat** (walk-in tour), nu transformarea pe stadii. Subiectul este o
vilă mediteraneană de lux cu piscină, nu un bloc în construcție.

- Fiecare clip este **o singură mișcare continuă de cameră**. Scena stă pe loc; se mișcă
  doar aparatul. Asta e inversul secvenței de transformare, unde camera stătea și se
  schimba subiectul. Nu se amestecă cele două în același clip.
- **Cadrul de start al fiecărui clip se extrage din randarea clipului precedent**
  (`ffmpeg -sseof -0.25`, cu `format=yuvj420p`), niciodată din același still. Dacă
  ambele clipuri primesc aceeași imagine de referință, al doilea pornește ușor deplasat
  și cusătura se vede.
- Nu se folosește `end_image` pentru mișcări de cameră. Un cadru final impus dă modelului
  o țintă de reconciliat și strică mișcarea; linia CAMERA face treaba mai bine singură.
- Limbaj de cameră: distanță plus durată, „horizon locked, constant speed". Cuvintele
  cinematic, smooth, gently, sweeping produc plutire onirică și sunt interzise.
- Encodare pentru scrub: fiecare cadru keyframe, 30fps, `+faststart`. Fișierele
  all-keyframe sunt mari, dimensiunea se spune cu voce tare înainte de livrare.
- Serverul TREBUIE să suporte HTTP Range. Fără Range, `currentTime` nu face nimic și nu
  apare nicio eroare nicăieri.
