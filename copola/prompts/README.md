# Prompturile erou

Regula, din skill: **JSON pentru modelele de imagine, proză etichetată pentru cele de video.**
Modelele de imagine parsează structură și o răsplătesc. Cele de video sunt antrenate pe
descrieri în proză, deci cheile JSON devin zgomot, iar prompturile lungi stivuiesc cuvinte
declanșatoare și produc respingeri false de moderare.

## Fișiere

| fișier | ce conține |
|---|---|
| `staging-template.json` | schema de editare, cu clauzele de conservare. Se copiază și se schimbă doar `subject`, `add_furniture` și `must_preserve_exactly`. |
| `staging-camere.json` | ce diferă la fiecare dintre cele 7 camere |
| `video-clipuri.md` | cele 4 prompturi de clip, în proză |
| `pipeline.md` | comenzile exacte, de la fotografie la `hero.mp4` |

## Modele folosite

| pas | model | cost măsurat |
|---|---|---|
| staging și relight | `nano_banana_pro`, 4:3, 2k | 2 credite / imagine |
| cadru de amurg | `nano_banana_pro`, 16:9, 2k | 2 credite |
| clipuri | `kling3_0`, 5s, 16:9 | 8,75 credite / clip |

Total cheltuit pentru livrarea asta: **9 imagini plus 4 clipuri, aproximativ 55 de credite.**

## Două lucruri care au trebuit reluate

1. **Fronturile de mobilier sanitar au ieșit canelate**, deși în realitate sunt plate.
   Obiectele sanitare intră în preț, deci abaterea era o denaturare, nu o licență estetică.
   Reparat cu un bloc `critical_fixture_lock` plus `fluted, ribbed, reeded, slatted,
   grooved, panelled` în `negative_prompt`.
2. **Trimiterea clipurilor a fost blocată de o recomandare de preset** („IN THE DARK").
   Se retrimite cu `declined_preset_id`, altfel nu se creează niciun job.
