# DESIGN.md, Copola Estate

Se verifică înainte de fiecare livrare. Dacă build-ul contrazice ceva de aici, build-ul greșește.

## Sursa designului: o referință aleasă de client

Sistemul vizual **nu este inventat**. Este extras din site-ul indicat de client,
`sterling.stn-automations.xyz`, un landing pentru un apartament din Downtown Dubai,
aceeași categorie: o singură proprietate, cu tur walk-through legat de scroll.

Regula, moștenită din skill și confirmată aici: **când clientul indică un site anume,
acela se replică, nu se „îmbunătățește".** Un schimb de font „ca să aibă mai multă
personalitate", făcut peste o referință deja aprobată, este exact felul în care încep
trei runde de refacere.

Tokenii de mai jos sunt citiți din CSS-ul referinței, nu ghiciți dintr-o captură.

## Ce a înlocuit versiunea anterioară

Prima versiune a acestui site avea alt sistem, construit de la zero: negru cu subton verde,
verde de câmp pe suprafețe mari, Bricolage Grotesque la greutatea 780, auriu interzis
explicit, etichete majuscule tracked interzise explicit.

**Toate acele reguli sunt anulate.** Referința folosește auriu și folosește intens
etichete majuscule tracked. Clientul a ales referința. Nu ne întoarcem la regulile vechi
pentru că „erau mai curate", pentru că nu noi le judecăm.

Fonturile Bricolage Grotesque și Public Sans au fost șterse din `web/fonts/`.

## Culoare

```
--paper   #F3F1EC   hârtie caldă, fundalul dominant al secțiunilor de conținut
--ink     #14151A   cerneală, textul pe hârtie
--muted   #83837f   gri secundar, corpul de text din coloana dreaptă
--dark    #0B0C10   aproape negru, turul, secțiunea de contact, footerul
--line    rgba(20,21,26,.14)   rigle fine, singurul separator folosit
--gold    #B69A6B   accent: cifra din acordeon, telefonul, butonul activ
```

Reguli:

- Auriul este **accent**, nu suprafață. Apare pe semnul `+` din întrebări, pe numărul de
  telefon din contact, pe bara preloaderului și pe butonul unei camere dezvăluite. Nimic
  mai mult.
- Separatorul este întotdeauna o **riglă de 1px**, niciodată o umbră, niciodată un card
  cu fundal. Singurele chenare din pagină sunt la cardurile din „Ce intră în preț" și la
  butoanele-pastilă.
- Pagina alternează: tur întunecat, conținut pe hârtie, contact întunecat. Fără gradient
  între ele.

## Tipografie

**O singură familie: Inter variabilă**, self-hostată, latin plus latin-ext, două fișiere
woff2. Referința o încarcă de la Google Fonts la runtime; noi o self-hostăm, ceea ce e
strict mai bun și complet invizibil vizual.

| rol | setare |
|---|---|
| titluri, toate nivelurile | `font-weight:200`, `text-transform:uppercase`, `letter-spacing:-.01em`, `line-height:1.02` |
| corp | `font-weight:300`, `line-height:1.65` |
| etichetă mică (`.kick`) | `.68rem`, `letter-spacing:.32em`, majuscule, încadrată automat în `[ ]` |
| navigație | `.7rem`, `letter-spacing:.2em`, majuscule |
| logo | `1rem`, `letter-spacing:.3em`, majuscule |
| cifre mari | `font-weight:200`, `font-variant-numeric:tabular-nums` |

**Titlurile sunt subțiri și majuscule.** Este gestul central al referinței și nu se
negociază: un titlu gros ar rupe complet raportul dintre titlu și rigla de sub el.

### Diacriticele, verificate, nu presupuse

Verificat cu fontTools în cmap-ul fișierelor livrate, apoi măsurat în browser prin lățimea
reală a glifelor:

```
Inter: ă â î ș ț Ă Â Î Ș Ț €   toate prezente
ș = U+0219, ț = U+021B, cu VIRGULĂ dedesubt, nu sedilă
```

Majusculele contează aici mai mult decât în versiunea anterioară, pentru că **toate
titlurile sunt uppercase**, deci `Ș` și `Ț` apar la corp mare, nu doar în text curent.
Verificat vizual la `clamp(2rem,5vw,4.2rem)`, adică până la circa 67px: virgula stă lipită
de literă. Pragul la care se desprinde, măsurat într-un build anterior, este în jur de
130px, iar pagina nu are niciun text atât de mare de când titlul erou a fost scos.

## Layout

```
.wrap   max-width:1400px; padding-inline:5vw
.sec    padding-block:14vh          .sec.tight  padding-block:9vh
.lead   grid 1.1fr .9fr; gap:6vw; align-items:end
```

- Fiecare secțiune începe cu același bloc `.lead`: titlu în stânga, două paragrafe în
  dreapta, aliniate la bază. Este ritmul referinței și se respectă peste tot.
- Gutterul este `5vw`, nu un rem fix. Toate elementele din tur sunt ancorate la `5vw`.
- **Proprietăți logice**, `padding-inline` și `padding-block`, niciodată shorthand-ul
  `padding` care omoară padding-ul orizontal al containerului.
- Galeria are celule **inegale**, pe grilă de 6 coloane: 4, 2, 2, 2, 2, 3, 3. Referința
  folosește 4 coloane cu celule portret, dar fotografiile noastre sunt landscape, deci
  proporțiile au fost adaptate ca să nu tăiem camerele.

## Hero, fără text

Clientul a cerut explicit ca **textul din hero să dispară**. Rămâne doar cromul turului,
exact componentele referinței minus blocul de titlu:

- legenda de capitol, jos-stânga, care se schimbă pe măsură ce derulezi
- contorul `01 / 04` plus „Turul casei", jos-dreapta
- rigla de capitole, dreapta, cu punct activ și etichetă la hover
- indiciul „Derulați ca să intrați", care dispare după primul gest

Nu se readaugă titlu, subtitlu sau propoziție de poziționare în hero. Dacă textul trebuie
să reapară, se cere clientului, nu se decide aici.

## Adaptări față de referință, și de ce

Trei, toate din cauza conținutului, nu din gust:

1. **Videoul este întunecat cu `brightness(.78)` și vinieta e dusă la `.62`.** Referința
   are un apartament întunecat, noaptea. Al nostru este un living alb, în plină zi, peste
   care cromul alb devenea ilizibil. Măsurat: eticheta riglei nu se putea citi.
2. **Etichetele din tur au `text-shadow`.** Același motiv.
3. **Pe ecrane sub 700px indiciul urcă la `16vh`.** La 390px se atingea de contor, care stă
   la `9vh` pe latura opusă. Măsurat, nu estimat.

## Interdicții pentru acest proiect

- Text cu gradient (`background-clip:text`).
- Umbre ca decor. Singurele umbre permise sunt cele de lizibilitate din tur.
- Carduri în carduri.
- Grile în care toate celulele au aceeași dimensiune.
- Titluri la altă greutate decât 200, sau care nu sunt majuscule.
- Altă familie de font în afară de Inter.
- Readăugarea textului în hero.

## Erou, constrângeri tehnice

- Cadrul de start și cel de final ale unui clip se taie **din aceeași fotografie**, unul
  larg și unul apropiat. Altfel modelul materializează obiectele care apar doar în cadrul
  final, în loc să miște camera spre ele.
- Un singur gest continuu de cameră pe clip, fără rotație, fără tilt, viteză constantă.
  Cuvinte interzise în prompt: cinematic, smooth, gently, elegant, sweeping, gracefully.
- Buget de schimbare 15 la 25% pe clip de 5s. La clipul final se schimbă doar lumina.
- Encodare pentru scrub: fiecare cadru keyframe (`keyint=1`), 30fps, `+faststart`.
- Serverul TREBUIE să suporte HTTP Range. Pagina are o plasă care redă videoul în buclă
  dacă seek-ul eșuează, dar plasa nu înlocuiește un server corect.
  **`seekable.length` nu este un indicator de încredere**, măsurat: fără Range, Chromium
  raportează totuși `seekable.length === 1` deși `currentTime` rămâne 0. Detecția trebuie
  să încerce efectiv un seek.

## Onestitate vizuală

Neschimbat față de versiunea anterioară, și nenegociabil:

- Fiecare fotografie mobilată are un buton care arată fotografia reală, goală.
- Slider real/mobilat la secțiunea „Așa se predă".
- Prima întrebare din acordeon este chiar „Mobila din imagini intră în preț?".
- Notă în footer.
- Casa în construcție și câmpul vizibile pe geamul dormitorului trei rămân în imagine.
