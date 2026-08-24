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
--amber-d    oklch(52% 0.135  55)   /* acelasi accent, pe travertin */
--line       oklch(32% 0.014 258)   /* rigle, chenare pe închis */
```

Reguli:

- Niciun `#000`, niciun `#fff`. Toate neutrele sunt împinse spre albastru (ground) sau spre
  cald (piatră). Croma 0.012 la 0.022 e suficientă.
- Croma scade pe măsură ce luminozitatea se apropie de 0 sau 100.
- Chihlimbarul are voie pe suprafețe mari. Secțiunea de conversie e drenată în chihlimbar,
  nu decorată cu el.
- `--amber` la 78% luminozitate n-are contrast pe travertin, se spală. Pe fundal
  deschis se folosește `--amber-d`, aceeași nuanță coborâtă la 52%. Nu e o a doua
  culoare, e aceeași culoare la altă lumină de fond.

### Ritmul benzilor

Pagina alternează, iar ordinea nu e decorativă: erou (video) → concept (`--ink`)
→ ofertă (`--limestone`) → fondator (`--ink-2`) → conversie (`--amber`) → footer.
Banda deschisă din mijloc e obligatorie. Fără ea sunt patru suprafețe întunecate
una după alta, iar contactul în chihlimbar de la final vine ca o lovitură, nu ca
o concluzie.

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
hero caps          letter-spacing: .005em ; line-height: 1.15
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

### Diacriticele cu virgula dedesubt cer interliniaj, nu cuvinte evitate

`ș` si `ț` (U+0219 / U+021B) au virgula desenata **detasat sub linia de baza**. In
Archivo ea coboara **0.29em**, masurat pe acest build. Inaltimea capitalei este
~0.72em, deci un titlu cu majuscule are nevoie de `line-height` mai mare de 1.01 ca
virgula sa nu intre in banda randului urmator.

Prima versiune a regulii spunea sa evitam cuvintele cu `ș` si `ț` in linia de display.
Era o solutie prin ocolire si a picat imediat ce clientul a dat titluri proprii care
le contin. Regula corecta este despre interliniaj:

```
h1.display   line-height: 1.15    /* 0.43em liberi, peste cei 0.29em necesari */
```

Verificat pe titlul de patru randuri „Soluții personalizate atât pentru cumpărător,
cât și pentru vânzător": la 1.0 virgula lui `Ț` din SOLUȚII cadea peste ATÂT; la 1.15
sta corect sub litera ei.

`ă`, `â`, `î` nu au problema asta, semnul lor sta deasupra si nu afecteaza interliniajul.

**Se verifica vizual la fiecare titlu nou de mai multe randuri.** Masuratoarea pe
latime de glifa da fals pozitiv, nu inlocuieste privitul.

Fonturi respinse explicit ca reflex: Playfair Display, Cormorant, Instrument Serif/Sans,
Inter, DM Sans/Serif, Fraunces, Syne, Space Grotesk, Outfit, Plus Jakarta Sans.

## Logotipul din cartonul de titlu

Numele se scrie cu **aceeași familie ca restul paginii**, Archivo la `wdth 125`
și `wght 860`. Nu s-a adus un al doilea font.

Cererea a fost „un font notoriu". Reflexul e un didone cu contrast mare, tipul
de literă din logourile caselor de modă. A fost respins pentru un motiv concret,
nu din gust: anti-referințele proiectului interzic serif subțire peste fotografie
cu piscină, iar primul cadru al turului este exact asta. Un Bodoni alb peste
marmură albă la ora prânzului dispare, exact cum dispare un didone la 160px peste
video, motivul pentru care s-a ales Archivo de la început.

Semnalul de marcă îl dă **scara**, nu familia:

```
.wm-svg text  font-variation-settings: 'wdth' 125, 'wght' 860
              font-size: 200px  (in viewBox 0 0 1000 168)
svg           width: 100%  ->  marca ocupa exact coloana de continut
text          textLength="1000" lengthAdjust="spacingAndGlyphs"
```

`textLength` nu e o subtilitate. Cu `font-size` în `vw` marca ajunge aproape de
marginea coloanei și niciodată pe ea, iar diferența de câțiva pixeli se citește:
logotipul arată scris, nu desenat. Măsurat pe acest build, la 1440px coloana are
1312,0px și textul 1311,9px; la 390px, 350,0 și 350,0.

`lengthAdjust="spacingAndGlyphs"` întinde și glifele, nu doar spațiile. La
`wdth 125` lățimea naturală a cuvântului ALPETRI e deja foarte aproape de
raportul din viewBox, deci deformarea e sub pragul vizibil. Dacă se schimbă
numele, se reverifică: un cuvânt mult mai scurt sau mai lung va fi întins vizibil
și atunci se ajustează viewBox-ul, nu se lasă așa.

Marca din colțul de sus pornește invizibilă și intră când pleacă cartonul. Cât
timp numele stă pe tot ecranul, același nume scris mărunt în colț e o repetiție.

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
vilă de lux cu piscină, în alb și marmură, parcursă încăpere cu încăpere: piscină,
living, bucătărie open space cu insulă, dormitor.

Patru clipuri de 5s, deci 20s și 640vh. Un clip per încăpere, ca fiecare segment de
scroll să fie o tranziție de cameră, marcată și de eticheta din colț.

Paleta filmării, alb și marmură, e alta decât paleta paginii, albastru-negru cu
chihlimbar. Asta e intenționat: eroul e o fereastră luminoasă într-o pagină întunecată.
Legătura o face imaginea de statement, aceeași vilă la ora albastră, unde albul rămâne
alb sub lumina caldă și accentul chihlimbar redevine literal.

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
### Encodare pentru scrub: `keyint=4`, nu `keyint=1`

Skill-ul cere `keyint=1`, adică fiecare cadru keyframe. Am măsurat, și regula
costă de două ori dimensiunea fără să aducă nimic.

Test în browser, scrub continuu (se setează `currentTime` la fiecare rAF, fără
să se aștepte `seeked`, exact ca bucla de lerp sub scroll), 2,5 s pe tot clipul:

| GOP | cadre distincte afișate | fps efectiv | H.264 1280x720 @ CRF 20 |
|---|---|---|---|
| 1 | 131 | 52,4 | 16 MB |
| **3** | **147** | **58,8** | 11 MB |
| **6** | **141** | **56,4** | 8,4 MB |
| 12 | 84 | 33,6 | 7,4 MB |

Un GOP între 3 și 6 este **la fel de fluid** ca all-keyframe. Prăbușirea e între
6 și 12, unde o căutare aterizează prea des pe keyframe și se pierd jumătate din
cadre. Livrăm `keyint=4`, marjă de siguranță sub prag.

Ce cumpără asta: la aceeași dimensiune, CRF 21 în loc de CRF 28. La `keyint=1`
nu există predicție între cadre, deci fiecare cadru e un JPEG de sine stătător,
iar la 0,14 biți/pixel arată exact ca un JPEG prost. Cu GOP 4, trei din patru
cadre sunt P-frame-uri ieftine și I-frame-urile primesc biții rămași.

Măsurătoarea e făcută pe VP9 în Chromium. Direcția e clară, dar dacă apare
vreodată scrub sacadat pe Safari sau iOS, prima verificare e coborârea la
`keyint=2`, nu creșterea CRF-ului.

### `prefers-reduced-motion` rupe orice e condus de progresul scroll-ului

Sub reduced-motion eroul devine `100svh`, deci `offsetHeight - innerHeight` este
0 și progresul rămâne 0 pentru totdeauna. Orice se calculează din el rămâne
înghețat la starea de start: valul de cerneală al cartonului nu s-ar mai ridica
niciodată și pagina ar sta acoperită.

Două reguli ies de aici, ambele verificate pe acest build:

1. Bucla de scroll **nu scrie stil inline** când `h <= 0`. Stilul inline bate
   orice regulă din foaia de stil, deci un `opacity: 0` scris acolo nu mai poate
   fi corectat din CSS, nici măcar dintr-un `@media`. Prima versiune stingea
   titlul eroului exact așa.
2. `@media (prefers-reduced-motion: reduce)` are propria stare pentru carton:
   voal parțial peste primul cadru, nume vizibil, marcă din header vizibilă.
   Nu e degradare, e o a doua compoziție.

- 30fps, nu 24. La 24 se vede stepping la scroll lent.
- `+faststart`, ca redarea să înceapă înainte de sosirea întregului fișier.
- Dimensiunea se spune cu voce tare înainte de livrare.
- Serverul TREBUIE să suporte HTTP Range. Fără Range, `currentTime` nu face nimic și nu
  apare nicio eroare nicăieri.
