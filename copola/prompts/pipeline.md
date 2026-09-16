# Pipeline, de la fotografie la hero.mp4

## 1. Cadrele de start și final, tăiate din aceeași fotografie

Sursa staging este 2400x1792. Crop-ul apropiat trebuie să fie un **subset** al celui larg,
altfel push-in-ul nu mai e pur geometric.

```bash
# larg
ffmpeg -y -i s3_living.png -vf "crop=2400:1350:0:221,scale=1600:900" -q:v 2 c1_a.jpg
# apropiat, din aceeasi imagine
ffmpeg -y -i s3_living.png -vf "crop=1440:810:800:400,scale=1600:900" -q:v 2 c1_b.jpg
```

## 2. Cadrul real de legătură, pentru înlănțuire

```bash
ffmpeg -y -sseof -0.25 -i c1.mp4 -vframes 1 -vf format=yuvj420p -q:v 1 c1_end_real.jpg
```

## 3. Concatenare

C1 spre C2 este continuare reală, deci **tăietură dreaptă**. C2 spre C3 și C3 spre C4 sunt
schimbări de cameră, deci **dizolvare de 0,5s**.

`settb=1/30` pe fiecare intrare ȘI pe ieșirea `concat` este obligatoriu: fără el, `xfade`
cade cu „First input link main timebase do not match".

```bash
N="scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=30,format=yuv420p,setsar=1,settb=1/30"
ffmpeg -y -i c1.mp4 -i c2.mp4 -i c3.mp4 -i c4.mp4 -filter_complex "
[0:v]$N[v0];[1:v]$N[v1];[2:v]$N[v2];[3:v]$N[v3];
[v0][v1]concat=n=2:v=1:a=0,settb=1/30[seg1];
[seg1][v2]xfade=transition=fade:duration=0.5:offset=9.5833,settb=1/30[seg2];
[seg2][v3]xfade=transition=fade:duration=0.5:offset=14.1250[out]
" -map "[out]" -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p hero_master.mp4
```

## 4. Encodare pentru scrub

`keyint=1` face fiecare cadru keyframe. Fără el, seek-ul cade pe cel mai apropiat keyframe
și scrub-ul sare în trepte. 30fps, nu 24: la 24 se vede pas la derulare lentă.

```bash
KEY="keyint=1:min-keyint=1:scenecut=0"
ffmpeg -y -i hero_master.mp4 -an -r 30 -vf "scale=1280:-2,format=yuv420p" \
  -c:v libx264 -preset slow -crf 26 -x264-params "$KEY" -movflags +faststart hero.mp4
ffmpeg -y -i hero_master.mp4 -an -r 30 -vf "scale=1000:-2,format=yuv420p" \
  -c:v libx264 -preset slow -crf 28 -x264-params "$KEY" -movflags +faststart hero-sm.mp4
```

Verificare, toate cadrele trebuie să fie `1`:

```bash
ffprobe -v error -select_streams v:0 -show_entries frame=key_frame -of csv=p=0 \
  -read_intervals "%+#12" hero.mp4
```

## 5. VP9 a fost testat și respins

Măsurat pe acest conținut, all-keyframe:

| | H.264 | VP9 |
|---|---|---|
| 1280x720 | 12 MB | 32 MB |
| 1000x562 | 6,2 MB | 20 MB |

De 2,7 ori mai mare la calitate comparabilă, deci **nu se livrează**. H.264 merge oricum în
toate browserele. VP9 a fost folosit doar local, pentru verificare: Chromium-ul din
Playwright nu are codec H.264 (`canPlayType('video/mp4; codecs="avc1.42E01E"')` întoarce
șir gol), deci scrub-ul nu poate fi testat acolo direct pe livrabil.
