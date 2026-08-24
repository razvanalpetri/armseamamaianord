# Alpetri Real Estate

## Ce este

Agenție imobiliară premium, full-service, pe litoral. Nu un dezvoltator, nu un portal de
anunțuri. Vânzări, închirieri, terenuri, evaluare, consultanță.

**Site de prezentare, nu catalog.** Nu se listează proprietăți la vânzare. Site-ul vinde
agenția, nu un imobil anume. Cine caută listinguri sună.

Diferența față de un portal: portalul îți arată tot și te lasă să te descurci. Alpetri
filtrează întâi și verifică actele înainte de vizionare, nu după. Asta e poziționarea, și
de aici vine tot restul site-ului.

## Cine ajunge aici

Trei oameni, în ordinea valorii:

1. **Vânzătorul / proprietarul.** Are o casă sau un teren de vândut și cântărește cui îl
   dă. Se uită la cum arată site-ul ca proxy pentru cum îi va fi tratată proprietatea.
   Este publicul principal al unui site de prezentare.
2. **Cumpărătorul serios.** Nu caută să răsfoiască anunțuri, caută pe cineva care să
   caute în locul lui. Vrea să vadă cum se lucrează, nu ce este în stoc azi.
3. **Investitorul.** Vrea cifre: preț pe metru, randament, calendar de plăți.

Toți trei se uită de pe telefon, majoritatea seara. Site-ul e proiectat întâi pentru asta.

## Secțiunea fondator

Razvan Alpetri, broker fondator. Este singurul loc din site unde vorbește o persoană,
nu agenția, și de aceea stă imediat după secțiunea de concept.

Argumentul, în ordinea asta: un mod de lucru care lipsea pe piață, expertiza de broker
combinată cu social media și instrumente AI, apoi ce înseamnă concret pentru fiecare
parte, vânzător și cumpărător. Ultimul lucru din secțiune este telefonul.

**Secțiunea nu se închide cu o frază despre cum se lucrează.** A avut două, pe rând, și
au căzut amândouă. Prima, „lucrez direct cu fiecare client, nu veți fi pasat de la un
coleg la altul", semnala om singur exact când site-ul trebuia să sune a echipă. A doua,
scrisă ca să repare prima, spunea că fondatorul conduce mandatul și echipa execută;
clientul a scos-o și pe aceea. Rezultatul e mai bun: după paragraful despre cumpărători
argumentul e complet, iar o a patra frază despre organizare doar amâna telefonul. Dacă
se propune vreodată o închidere nouă aici, întrebarea e ce adaugă peste ce s-a spus deja,
nu cum sună.

Fotografia este obligatorie aici. Fișierul este `web/media/razvan-alpetri.webp`, 700x875.

**Nu se decupează.** Slotul afișează fotografia întreagă, la raportul ei, oricare ar fi
el: coloana de 300 de pixeli dă lățimea, înălțimea vine de la sine. Regula anterioară
cerea decupaj 4:5 strâns pe cap și bust, cu argumentul că la 300 de pixeli un cadru
întreg face persoana ilizibilă. Clientul a cerut explicit să nu se taie nimic, deci
argumentul acela nu mai are cuvântul: dacă o fotografie iese prea mică în coloană,
se lărgește coloana, nu se taie poza.

## Cartonul de titlu

Site-ul **incepe cu numele**, nu cu o propunere de vanzare. Primul ecran e o
suprafata de cerneala cu ALPETRI scris cap la cap, o rigla si doua randuri
marunte. Nimic altceva.

Latimea marcii e blocata prin `textLength` pe SVG, nu cu `font-size` in `vw`.
Diferenta se vede: cu vw marca nimereste aproape de coloana de continut si
niciodata pe ea, iar un logotip care nu se aliniaza cu grila paginii arata
scris, nu desenat.

Nu e o pagina separata si nu e un preloader. Sta in acelasi erou si pleaca la
scroll, in doua trepte: fundalul de cerneala se ridica primul si descopera
turul (pana la 4,2% din erou), numele mai ramane putin peste imagine si pleaca
si el (pana la 7,5%). Titlul primei incaperi intra exact pe cat iese numele, ca
sa nu se citeasca doua mesaje peste aceeasi imagine.

**Nu am folosit un serif inalt-contrast pentru marca**, desi acolo duce reflexul
pentru „font notoriu" la o agentie de lux. Anti-referintele de mai jos interzic
explicit serif subtire peste poza cu piscina, iar primul cadru al turului e
exact o poza cu piscina. Semnalul de marca il da scara, nu familia: acelasi
Archivo Expanded, dus pana la latimea coloanei.

## Momentul erou

O singură propoziție: **camera trece peste piscină, intră prin ușile glisante și
străbate vila fără nicio tăietură, din living în bucătărie și mai departe în dormitor.**

Un tur, nu o transformare. Nu explică nimic și nu vinde o proprietate anume: arată
nivelul la care lucrează agenția și lasă privirea să se plimbe.

**Fiecare segment de scroll este o tranziție de cameră** dintr-o încăpere în
următoarea, iar încăperea curentă e scrisă în colțul de jos: Piscină, Living,
Bucătărie, Dormitor. Eticheta nu e decor, e singurul lucru care spune unde te afli
într-un tur fără tăieturi.

**Fiecare încăpere are mesajul ei.** Titlul din hero se schimbă odată cu eticheta,
din aceleași praguri, ca cele două să nu se bată cap în cap:

| segment | mesaj |
|---|---|
| Piscină | Agenția imobiliară potrivită pentru tine. |
| Living | Profesionalism și expertiză în domeniul imobiliarelor |
| Bucătărie | Proprietăți atent selecționate |
| Dormitor | Soluții personalizate atât pentru cumpărător, cât și pentru vânzător |

Cele patru mesaje stau suprapuse și cresc în sus de la aceeași linie de bază, ca
schimbarea să nu miște nimic altceva pe ecran.

Materialele sunt fixe: alb și marmură. Nu lemn, nu bej, nu piatră rustică.

Videoul se vede **curat**, fără filtru de întunecare, cu foarte puțin text peste el.
Aproape tot conținutul scris vine după ce turul s-a terminat de derulat.

## Oferta, si de ce e o lista de randuri

Continutul comercial e dat de client, ad litteram: comision 2% din valoarea
proprietatii, promovare activa pe social media, listare corecta, tururi video,
unelte AI, si site personalizat pentru proprietate la exclusivitati.

Sta intr-o sectiune pe travertin, `#servicii`, intre concept si fondator.
E singura banda deschisa la culoare din pagina, si asta e intentionat: eroul,
conceptul si fondatorul sunt inchise, conversia e chihlimbar. Fara ea, patru
benzi intunecate una dupa alta.

Forma e **randuri cu rigle**, nu grila de carduri. Principiul 4 de mai jos
interzicea listele de servicii; clientul le-a cerut inapoi, deci principiul s-a
schimbat, dar conditia lui a ramas: daca revin, revin ca randuri.

Comisionul are randul lui, deasupra listei, cu cifra tabulara pe coloana din
stanga. Nu e sablonul hero-metric interzis in DESIGN.md: nu e centrat, nu are
statistici de sprijin si nu are accent in gradient. E o cifra intr-un tabel.

**Un lucru de confirmat cu clientul:** randul comisionului spune ca tot ce
urmeaza in lista face parte din mandat si nu se coteaza separat. Este citirea
naturala a briefingului, in care cele doua au venit ca un pachet, dar este un
angajament comercial pe care clientul nu l-a formulat in cuvintele astea.

## Tonul

**Sigur pe el, cald, specific.** Vorbește ca un agent care a văzut casa, nu ca un
funcționar care citește dosarul.

**Vorbește o echipă, nu un om singur.** Clientul a cerut explicit ca site-ul să
sune ca și cum în spate stă o structură, nu un broker care le face pe toate.
Persoana I plural peste tot, iar diviziunea muncii se spune pe nume: cine
evaluează, cine filmează, cine duce campania, cine ține legătura. Fondatorul
rămâne singurul „eu" din pagină. Linia „Lucrez direct cu fiecare client. Nu veți
fi pasat de la un coleg la altul" a fost scoasă din secțiunea fondator: era exact
semnalul opus. Fraza care o înlocuia, despre conducerea mandatului și execuția
de către echipă, a fost scoasă și ea la cererea clientului; secțiunea se încheie
acum pe argumentul pentru cumpărători.

Nu se inventează cifre pentru asta. Nicăieri nu scrie câți oameni sunt.
Impresia vine din felul de a vorbi și din faptul că există un flux de lucru,
nu dintr-un număr pe care nimeni nu l-a confirmat.

Registrul ăsta l-a înlocuit pe primul, care era „măsurat, structural, nesentimental,
ca un om care a fost pe șantier". Acela se potrivea cu eroul inițial, blocuri în
construcție. Eroul e acum o vilă albă de marmură cu piscină, iar vocea de șantier
suna birocratic peste imaginea aia. Faptele au rămas, felul de a le spune s-a schimbat.

| nu așa | așa |
|---|---|
| „Casa visurilor tale te așteaptă" | „O casă bună nu se vinde repede. Se vinde bine." |
| „Verificăm cadastru, intabulare, sarcini, situația juridică" | „Ca să nu vă atașați de o casă care are o problemă" |
| „Soluții imobiliare integrate" | „Vindem, închiriem, evaluăm, și rămânem lângă dumneavoastră până la semnătură" |

Reguli de scriere:

- **Conduceți cu ce câștigă clientul, nu cu procedura.** Procedura vine imediat după,
  în aceeași frază, ca dovadă. Nu invers.
- **Fără liniuțe de dialog folosite ca punctuație** (nici `-`, nici `--`). Virgulă, două
  puncte, punct și virgulă, paranteze.
- Adresare la persoana a II-a plural, „dumneavoastră", în tot corpul paginii.
  **Excepție, deocamdată nerezolvată:** titlul și subtitlul din hero sunt scrise de
  client cu „tine" („potrivită pentru tine", „alese pentru tine"). Textul a fost
  păstrat exact cum a fost dat. Amestecul se vede, iar decizia de unificare, în
  oricare direcție, îi aparține clientului.
- Cifrele sunt argumente. Unde există un număr real, numărul intră în copy.
- Niciun titlu nu se repetă în paragraful de sub el.
- Enumerările birocratice de trei sau mai mulți termeni (cadastru, intabulare, sarcini,
  autorizații) au voie **o singură dată pe pagină**, acolo unde chiar sunt lista de
  verificări. În rest se spune consecința, nu lista.

## Anti-referințe

Ce NU este acest site:

- **NU portal de anunțuri.** Fără grilă infinită de carduri cu poze mici și preț roșu.
  Fără filtre în bara laterală ca prim gest.
- **NU imobiliară americană de lux.** Fără navy cu auriu, fără serif subțire pe poză cu
  piscină, fără agent care zâmbește în costum pe fundal alb.
- **NU site de dezvoltator.** Nu vindem un singur ansamblu. Vindem judecata agenției
  despre mai multe.
- **NU landing de SaaS.** Fără trei carduri identice cu iconiță, titlu și două rânduri.
- **NU editorial cu serif italic și etichete mono.** Este reflexul de ordinul doi al
  categoriei „premium care nu vrea să fie generic". Îl refuzăm explicit.

## Principii strategice

1. **Site de prezentare.** Nicio proprietate listată, niciun preț, niciun filtru de
   căutare. Dacă apare tentația unei grile de anunțuri, răspunsul e nu.
2. **Un singur gest de conversie, prezent tot timpul.** Telefonul. Nu formular cu opt
   câmpuri.
3. **Fără cifre despre agenție.** Vechimea, numărul de tranzacții și restul
   indicatorilor au fost scoase la cererea clientului. Dacă se întorc vreodată, se
   întorc ca fișă de teren, cifre tabulare aliniate, nu ca dashboard cu carduri.
4. **Lista de servicii s-a întors, ca rânduri.** Secțiunile „Ce facem" și „Cum
   lucrăm" fuseseră eliminate la cererea clientului; oferta a revenit tot la
   cererea lui, cu conținut concret de data asta, în `#servicii`. Condiția a
   rămas în picioare: rânduri cu rigle, nu grilă de carduri, și niciun pas de
   proces numerotat ca etapă de flux. Numerele 01–05 sunt indici de listă, nu
   etape.
5. **Nimic nu se centrează din reflex.** Stiva centrată iconiță-titlu-subtitlu este
   interzisă.
6. Site-ul nu e avantajul competitiv. Poziționarea este. Dacă cineva îl citește 8 secunde
   și nu a înțeles că e o agenție care filtrează și verifică înainte, site-ul a eșuat.

## Date de contact

Reale, confirmate de client:

| | |
|---|---|
| Telefon | 0725.367.954 |
| Email | razvanalpetri@yahoo.ro |
| Birou | Calea Dobrogei 236B |
| Vizionări | Stabilit la telefon |
| Comision | 2% din valoarea proprietății |

Orașul, Constanța, este singurul câmp încă presupus. A fost dedus din contextul
repo-ului și nu a fost confirmat explicit.

## Relația cu repo-ul

Acest site trăiește în `/imobiliare` și este complet independent de site-ul ARM Sea Mamaia
Nord din `/src`, care rămâne funcțional și neatins. Nu partajează build, fonturi sau CSS.
