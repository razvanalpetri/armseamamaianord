# Prompturile de clip

Proză etichetată, nu JSON. `kling3_0` respinge un flag `--negative_prompt`, deci negativele
intră pe linia `AVOID:`.

**Cuvintele interzise** în linia CAMERA, pentru că produc mișcare plutitoare, de vis:
cinematic, smooth, gently, elegant, sweeping, gracefully, majestic, ethereal.
Se înlocuiesc cu **distanță plus durată**: „about three metres across the full five seconds,
horizon locked, constant speed".

## Lanțul

```
C1  living, cadru larg  -> cadru apropiat   push-in            EROU
C2  continuarea lui C1  -> fara cadru final trecere spre scara
C3  dormitor matrimonial, larg -> apropiat  push spre balcon
C4  dormitor 2, zi -> amurg                 cameră fixă        FINAL
```

**C1 și C3** au ambele cadre tăiate din **aceeași fotografie**, unul larg și unul apropiat.
Asta e regula care face diferența: dacă un obiect apare doar în cadrul final, modelul îl
crește din podea în loc să miște camera spre el.

**C2 pornește din cadrul real extras din C1**, nu din aceeași imagine de referință:

```bash
ffmpeg -sseof -0.25 -i c1.mp4 -vframes 1 -vf format=yuvj420p -q:v 1 c1_end_real.jpg
```

`-sseof -0.25`, nu ultimul cadru: ultimul e cel mai moale din GOP.
`format=yuvj420p` e obligatoriu, altfel ffmpeg refuză să scrie mjpeg din ieșirea full-range
a lui Kling.

**C4** schimbă doar lumina, cu camera fixă. Cadrul de amurg a fost generat **separat, ca
imagine**, înainte de animare. Dacă i-ai cere lui Kling și mișcare și schimbare de lumină,
depășești bugetul de schimbare și clipul se întinde.

---

## C1, eroul

```
SUBJECT: a furnished open plan living room in a new house, a cream boucle sectional sofa on a wool rug in the foreground, an oak dining table with six cream chairs in the far zone, a staircase with a white balustrade behind a white column, an olive tree in a terracotta pot.
ACTION: nothing in the room changes, appears or moves. No furniture grows, slides or materialises. Nobody enters. Only the camera moves.
CAMERA: the camera itself walks forward about three metres across the full five seconds, from behind the sofa towards the dining table, ending closer on the dining table and the staircase. Horizon locked, no rotation, no tilt, constant speed.
LIGHTING: soft warm daylight from the windows on the right, unchanged for the whole shot.
STYLE: shot on 35mm, natural depth of field, fine film grain, real estate walkthrough footage.
AVOID: objects appearing, furniture materialising, furniture sliding, walls moving, staircase changing shape, warping, morphing, camera shake, zoom snap, people, hands, pets, text, watermark, flicker.
```

## C2, continuarea spre scară

```
SUBJECT: a furnished open plan living room in a new house seen from behind a cream boucle sofa, an oak dining table with six cream chairs, an olive tree in a terracotta pot, and a staircase with a white balustrade rising behind a white column on the left.
ACTION: nothing in the room changes, appears or moves. No furniture grows, slides or materialises. Nobody enters. Only the camera moves.
CAMERA: the camera itself keeps walking forward about two metres across the full five seconds, past the dining table and towards the staircase, ending close on the stair treads rising out of frame. Horizon locked, no rotation, no tilt, constant speed.
LIGHTING: soft warm daylight from the windows on the right, unchanged for the whole shot.
STYLE: shot on 35mm, natural depth of field, fine film grain, real estate walkthrough footage.
AVOID: objects appearing, furniture materialising, furniture sliding, walls moving, staircase changing shape, doors opening, warping, morphing, camera shake, zoom snap, people, hands, text, watermark, flicker.
```

## C3, dormitorul matrimonial

```
SUBJECT: a furnished bedroom in a new house, an oatmeal linen bed with white bedding and a camel throw, two oak nightstands with lit ceramic lamps, an oak bench at the foot of the bed, a tall black framed balcony door with sheer linen curtains, bare trees and a town visible outside.
ACTION: nothing in the room changes, appears or moves. The curtains stay perfectly still. No furniture grows or materialises. Nobody enters. Only the camera moves.
CAMERA: the camera itself walks forward about two and a half metres across the full five seconds, from the doorway towards the balcony door, ending closer on the glass and the view outside. Horizon locked, no rotation, no tilt, constant speed.
LIGHTING: soft warm late afternoon daylight through the balcony door, the bedside lamps lit, unchanged for the whole shot.
STYLE: shot on 35mm, natural depth of field, fine film grain, real estate walkthrough footage.
AVOID: objects appearing, furniture materialising, bed moving, curtains billowing, walls moving, warping, morphing, camera shake, zoom snap, people, hands, text, watermark, flicker.
```

## C4, finalul, zi spre amurg

```
SUBJECT: a furnished bedroom in a new house at the end of the afternoon, an oatmeal linen bed with a rust throw on the right, a cream boucle lounge chair and a black floor lamp beside a black framed balcony door, houses and trees beyond the glass.
ACTION: nothing moves and nothing appears. No furniture shifts position. The only thing that changes is the light: the sky beyond the glass fades from sunset to deep blue dusk, small warm window lights come on in the houses outside, and inside the room the bedside lamp and the floor lamp grow brighter until they are the main light source.
CAMERA: locked off tripod, absolutely no camera movement, identical framing from the first frame to the last.
LIGHTING: starts as warm late afternoon sun through the glass, ends as blue dusk outside with warm lamplight inside.
STYLE: shot on 35mm, natural depth of field, fine film grain, real estate walkthrough footage.
AVOID: camera movement, zoom, pan, tilt, shake, furniture moving, objects appearing, walls moving, warping, morphing, people, hands, text, watermark, flicker, strobing.
```
