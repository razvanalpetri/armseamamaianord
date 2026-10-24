# DESIGN.md, ALPETRI PROPERTIES SEASON

Se verifică înainte de fiecare livrare a paginii de campanie.

## Identitate

Aceeași ca landing-ul din `../landing` (vezi `../landing/DESIGN.md`): logo-ul
Alpetri Real Estate, negru mat cald, auriu metalic, Cinzel pentru titluri și
prețuri, Archivo pentru text și cifre funcționale (telefon, bugete). Fonturile,
tokenii, butoanele, headerul, echipa și footerul sunt copiate identic; o schimbare
de identitate se face în ambele foldere.

Numele campaniei, „Alpetri Properties Season”, apare ca semnătură: în Cinzel,
spațiat, între două linii aurii, ca rândul „REAL ESTATE” din logo. Logo-ul
agenției rămâne în header și în footer.

## Funnel-ul

Ordinea e fixă, pentru că așa citește un vizitator venit dintr-o reclamă:

1. Hero centrat: semnătura campaniei, comutatorul, titlul, VSL-ul, butonul.
   Centrarea e convenția paginilor cu VSL, aleasă, nu din reflex.
2. Pentru cine este (problema în stânga, lista în dreapta).
3. Ce primiți (patru puncte numerotate roman, ca „Cum lucrăm” de pe site).
4. Cum funcționează (trei pași legați de o linie aurie) și un buton.
5. Cu cine vorbiți: portretele reale ale echipei, în locul recenziilor pe care nu
   le avem.
6. Întrebări frecvente.
7. CTA final drenat în auriu, singura suprafață mare aurie, cu emblema presată în
   metal.

## Cele două variante

Textele ambelor variante stau în HTML, marcate cu `data-for="investitie"` sau
`data-for="locuinta"`; `data-persona` de pe `<body>` decide ce se vede. Elementele
comune nu au `data-for`. Când se adaugă text nou, se scrie pentru ambele categorii
sau se lasă comun. Investitorul citește cifre (preț pe metru pătrat, chirie,
randament, verificări); cine caută o locuință citește timp câștigat, siguranță și
însoțire (zonă, camere, vizionări, acte).

## VSL

Cadru 16:9 cu colțuri aurii de vizor, emblema slabă în fundal, buton de play auriu.
Lățimea ține cont de înălțimea ecranului, ca videoclipul să încapă întreg sub titlu
pe un laptop (verificat la 1024×768, 1366×768, 1440×900, 1920×1080). Playerul
(YouTube fără cookie-uri, Vimeo sau `<video>`) se creează doar la apăsare.

## Reguli de text

- Plural de politețe, ca pe site.
- Nicio cifră, recenzie, termen sau reducere inventată. Fără „locuri limitate”,
  fără numărătoare inversă: campania nu are încă așa ceva. Ce se promite este ce a
  cerut agenția: consultanță gratuită și opțiunile imobiliare potrivite.
- Fără liniuță de dialog ca punctuație. Intervalele de buget folosesc liniuța de
  interval, „80.000–150.000 €”.

## Verificat la livrare

- Zero overflow orizontal la 390 și 1440 px, pentru ambele variante.
- Diacriticele și „€” există în ambele fonturi (test canvas).
- Doar textele variantei active sunt vizibile (0 elemente greșite din 10).
- Mesajul de WhatsApp se schimbă cu varianta și cu răspunsurile opționale.
- VSL: link de YouTube, link de Vimeo și fișier .mp4 pornesc playerul potrivit;
  schimbarea variantei oprește videoclipul.
- `#investitie`, `#locuinta` și `?pentru=locuinta` deschid varianta corectă.
- Evenimentele `Contact` / `whatsapp_click` pleacă la apăsare, când există pixelul.
