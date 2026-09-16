# Copola Estate, vila din Valu lui Traian

## Ce este

Landing de vânzare pentru **un singur produs**: vila nouă din Valu lui Traian,
județul Constanța. Nu portofoliu, nu site de agenție, nu ansamblu. Un obiect,
un preț, un număr de telefon.

Copola Estate este dezvoltatorul. Vinde ce a construit, direct, fără intermediar.

## Produsul, exact

| | |
|---|---|
| Preț | 200.000 € + TVA |
| Compartimentare | 1 living, 1 bucătărie, 3 dormitoare, 2 băi, balcoane |
| Regim | parter + etaj, scară interioară |
| Predare | la cheie, obiecte sanitare incluse, **fără mobilă** |
| Utilități | incluse |
| Încălzire | în pardoseală |
| Locație | Valu lui Traian, județul Constanța |

Contact: 0725 367 954, razvanalpetri@yahoo.ro

## Cine ajunge aici

Doi oameni, în ordinea valorii:

1. **Familia care cumpără prima casă la curte.** Vine din apartament în Constanța.
   Are o singură frică reală: „la cheie" înseamnă altceva la fiecare dezvoltator, și
   descoperă la semnare că mai are de băgat 30.000 €. Vrea să știe **ce intră și ce nu**,
   scris negru pe alb, înainte să sune.
2. **Investitorul local.** Compară 200.000 € + TVA cu ce mai e în Valu și în Constanța.
   Vrea metri, finisaje reale și cât de departe e de A4 și de oraș.

Amândoi se uită de pe telefon. Mulți, seara, după program. Site-ul se proiectează
întâi pentru ecranul de telefon ținut în mână, nu pentru laptopul designerului.

## Momentul erou

O singură propoziție: **camera intră în vilă și o parcurge fără tăietură, din livingul
mobilat, pe scară, până în dormitorul de la etaj unde se face seară și se aprind luminile.**

Nu e decor. Vila se predă goală, iar o casă goală nu se vinde din fotografie: cumpărătorul
nu poate estima dacă îi încape canapeaua. Walkthrough-ul rezolvă exact asta. De aceea
mobilierul din video există: ca să dea scară, nu ca să mintă.

Turul este împărțit în **patru capitole**, cu legendă care se schimbă pe măsură ce derulezi:
livingul, spre scară, dormitorul matrimonial, se lasă seara. Capitolele poartă singurul
text din hero, iar acel text apare doar după ce ai început să derulezi.

## Regula de onestitate, neneogociabilă

Mobilierul din walkthrough și din galerie este **staging virtual**. Vila se predă
nemobilată. Asta nu se ascunde în footer cu corp 11, se spune în trei locuri:

1. Un **slider înainte/după** în galerie, cu fotografia reală a camerei goale sub cea
   mobilată. Cumpărătorul trage cu degetul și vede exact ce primește.
2. O linie explicită în secțiunea „Ce intră în preț".
3. Footer.

Motivul nu e juridic, e comercial. Un cumpărător care descoperă singur că mobila nu
intră în preț nu mai sună. Unul căruia i-ai spus tu, sună.

## Tonul

Al unui om care a construit casa, nu al unui copywriter. Măsurat, concret, fără adjective
care nu se pot verifica.

| nu așa | așa |
|---|---|
| „Casa visurilor tale te așteaptă" | „Trei dormitoare, două băi, 200.000 € plus TVA." |
| „Finisaje premium de excepție" | „Marmură neagră în ambele băi. Tâmplărie aluminiu negru." |
| „Locație privilegiată" | „Valu lui Traian. Zece minute de centura Constanței." |
| „Vă oferim soluții complete" | „Se predă la cheie. Mobila nu intră. Utilitățile, da." |

Reguli de scriere:

- **Fără liniuțe folosite ca punctuație** (nici `-`, nici `--`). Virgulă, două puncte,
  punct și virgulă, paranteze.
- Cifrele sunt argumente. Unde există un număr real, numărul intră în copy.
- Niciun titlu nu se repetă în paragraful de sub el.
- Nu se promite nimic ce nu e în tabelul de mai sus.

## Referința

Clientul a indicat explicit un site de replicat: **`sterling.stn-automations.xyz`**, landing
pentru un apartament din Downtown Dubai, aceeași categorie ca al nostru, o singură
proprietate cu tur walk-through legat de scroll.

Sistemul vizual vine de acolo și se respectă. Detaliile sunt în DESIGN.md. Regula de lucru:
**referința aleasă de client bate orice preferință a noastră.** Nu o „îmbunătățim".

Tot la cererea clientului, **textul din hero a fost eliminat**. Turul începe fără titlu,
fără subtitlu și fără propoziție de poziționare. Rămâne doar cromul: legenda de capitol,
contorul și rigla.

## Anti-referințe

Ce NU este acest site:

- **NU portal de anunțuri.** Fără grilă de carduri cu poză mică și preț roșu, fără
  „vezi toate proprietățile".
- **NU landing de SaaS.** Fără trei carduri identice cu iconiță, titlu și două rânduri.
- **NU clona site-ului din `/imobiliare`.** Acela e un site de agenție, cu altă paletă,
  alt font și alt erou.

Anti-referințele din versiunea anterioară care interziceau auriul și etichetele majuscule
tracked **nu mai sunt valabile**: referința aleasă de client le folosește pe amândouă.

## Principii strategice

1. **Un singur gest de conversie, prezent tot timpul.** Telefonul. Nu formular cu opt câmpuri.
2. **Ce nu intră în preț se spune la fel de tare ca ce intră.** Este singurul avantaj
   competitiv pe care un dezvoltator mic îl poate construi într-o zi.
3. **Fotografia reală bate staging-ul.** Unde există alegere între cadrul mobilat și cel
   real, cel real rămâne accesibil la un gest de deget.
4. **Nimic nu se centrează din reflex.** Stiva centrată iconiță, titlu, subtitlu este interzisă.
5. Dacă cineva citește pagina 8 secunde și nu a reținut *preț, număr de camere, localitate*,
   pagina a eșuat.

## Relația cu repo-ul

Acest site trăiește în `/copola` și este complet independent de `/imobiliare`
(Alpetri Real Estate) și de `/src` (ARM Sea Mamaia Nord). Nu partajează build, fonturi,
CSS sau media. Niciunul dintre celelalte două nu se modifică.

## De verificat cu clientul

- Pozele arată **calorifere de perete** în toate cele trei dormitoare, dar specificația
  spune încălzire în pardoseală. Probabil sistem mixt. Copy-ul actual scrie
  „încălzire în pardoseală" conform specificației primite și trebuie corectat dacă e mixt.
- Nu există fotografie a bucătăriei. Secțiunea galerie o omite în loc să o inventeze.
- Suprafața utilă în metri pătrați lipsește și este a doua întrebare pe care o pune
  oricine, după preț.
