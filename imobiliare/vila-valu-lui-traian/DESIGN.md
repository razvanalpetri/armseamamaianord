# DESIGN.md, pagina vilei din Valu lui Traian

Se verifică înainte de fiecare livrare. Identitatea, paleta, tipografia, tonul și
interdicțiile sunt cele din [`../landing/DESIGN.md`](../landing/DESIGN.md); aici
sunt doar deciziile proprii acestei pagini.

## O singură proprietate, deci prețul e afișul

Pagina vinde o casă, nu o agenție. Hero-ul are două coloane: în stânga titlul și
butonul de vizionare, în dreapta fișa de preț. Fișa are rama aurie cu colțuri
marcate, ca vizorul VSL-ului din campanie, și ține tot ce decide un cumpărător în
primele secunde: prețul, TVA-ul, suprafața utilă, terenul, camerele, telefonul.
Pe telefon fișa vine imediat sub butoane.

Prețul se afișează cu TVA inclus, 242.000 €, iar sub el „200.000 € + TVA”, ca să
nu existe surpriză la vizionare.

## Cifrele cu 1

În Cinzel, cifra 1 arată ca un I roman, deci „P+1” s-ar citi „P+I”. Orice cifră
care poate conține 1 stă în Archivo:

- în titluri, prin `.d` (Archivo, lățime 110, greutate 580, 0,9em), lângă Cinzel;
- suprafețele din fișa de preț, cifrele compartimentării, „15 minute” din schemă;
- prețul rămâne în Cinzel pentru că 242.000 nu conține 1.

## Fotografiile

Doar fotografiile vilei trimise de agenție; pagina nu adaugă imagini de stoc sau
generate.
Grila are una mare și patru mici pe desktop (prima, livingul cu scara, e cea mai
puternică) și una mare peste două rânduri de câte două pe telefon. Ramele sunt
subțiri, ca la portretele echipei; auriul apare doar la hover.

La apăsare, fotografia se deschide pe tot ecranul într-un `<dialog>` nativ: Esc
închide, săgețile tastaturii și glisarea schimbă fotografia, focusul revine pe
fotografia apăsată. Pe telefon săgețile stau sub fotografie, la îndemâna degetului.
Fără JavaScript, fiecare miniatură e un link către fotografia mare.

`alt`-ul descrie doar ce se vede în fotografie, fără să numească încăperea mai
precis decât se poate verifica din imagine.

## Fișa tehnică

Compartimentarea apare de două ori, intenționat: o dată în cifre mari (3, 1, 1, 2),
pentru cine scanează, și o dată în fișa tehnică, rând cu rând, pentru cine compară
anunțuri. Fișa are etichetele în stânga și valorile în dreapta, cu rigle subțiri,
ca o fișă de teren (principiul 3 din `../PRODUCT.md`), nu carduri.

## Locația

O schemă, nu o hartă: Constanța și Valu lui Traian legate de o linie punctată cu
„15 minute”. Agenția a dat zona (în spatele Penny), nu un pin, așa că pagina nu
desenează o hartă care ar sugera o adresă exactă. Linkul spre Google Maps duce la
zonă.

## Vizionarea

Secțiunea aurie este CTA-ul din campanie, preluat identic: o întrebare opțională
cu trei variante („Cât mai curând”, „În cursul săptămânii”, „În weekend”) care
intră în mesajul de WhatsApp, apoi butonul negru. Toate butoanele de vizionare de
pe pagină (hero, secțiunea aurie, bara de pe telefon) trimit același mesaj.

## Verificat la livrare

- Zero overflow orizontal la 360, 390, 820, 1280 și 1440 px.
- Toate resursele răspund 200, consola e curată, cele patru fețe de font se încarcă,
  `ă â î ș ț` randate în ambele familii.
- 3 linkuri WhatsApp cu mesaj precompletat; alegerea zilei intră în mesaj și se
  scoate la a doua apăsare.
- Galeria: deschidere, înainte, înapoi, trecerea de la ultima la prima, Esc și
  butonul de închidere, pe desktop și pe telefon.
- Ancorele din meniu aterizează sub header (84 px de sus).
