# The hero video

An AI video that is scrubbed by scroll position. Built from stills, not from a 3D scene. No Blender, no modelling.

## Tools

`hf` (Higgsfield CLI, aliases `higgsfield` / `higgs`), check with `hf --help`. Working models as of this writing:

| model | use |
|---|---|
| `nano_banana_pro` | image edit / generate. Best for retouching real photos: removing people, relighting, filling a container with food, compositing. Higher resolution and better relight than gpt_image_2. |
| `gpt_image_2` | image generate. Alternative when Nano Banana refuses or recomposes badly. |
| `kling3_0` | image-to-video. Accepts `--start-image` and `--end-image`. Reliable. |
| `seedance_2_0` | image-to-video. Was failing on every job during the last build; try it, fall back to kling3_0. |

```bash
hf generate create <model> --prompt "..." [--image-references f.jpg] [--start-image a.jpg --end-image b.jpg] --wait --wait-timeout 25m
```

Media flags accept a local path (auto-uploaded) or a UUID. `--wait` prints the result URL on stdout; `curl` it down.

Install (offer it before falling back to anything else):

```bash
brew install higgsfield-ai/tap/higgsfield     # macOS / Linux
npm install -g @higgsfield/cli                # cross-platform, Node 18+, works on Windows
```

Then `hf auth login`. Tokens are short-lived, so a failing account call usually means re-login, not a broken install.

Alternatives if the user has no Higgsfield account: Kling web UI, Runway ML, Pika. Google Whisk + Veo also work for the stills-to-video step. The technique does not depend on the vendor: **start frame + end frame = transition video.**

## The prompt format

**Labelled prose. Not JSON.**

JSON prompts genuinely help *image* models (they parse structure). They **hurt video models**, those are trained on caption prose, so JSON keys become noise tokens. Long prompts also stack trigger words and produce false NSFW rejections; a 400-word JSON prompt got rejected where a 60-word prose one passed.

```
SUBJECT:  what is in frame, stated plainly
ACTION:   what changes, and explicitly what does NOT change
CAMERA:   the move, as distance + duration, plus what is locked
LIGHTING: source and direction, and that it is unchanged
STYLE:    lens, depth of field, grain
AVOID:    the failure modes, comma separated
```

`kling3_0` rejects a `--negative_prompt` flag. Fold negatives into the `AVOID:` line instead.

### Camera language

Words that produce floaty, drifting, dreamlike motion, avoid all of them:

> cinematic, smooth, gently, elegant, sweeping, gracefully, majestic, ethereal

Replace with **distance and duration**:

> "a steady dolly push-in of about two metres across the full 10 seconds, horizon locked, no rotation, no tilt, constant speed"

### The materialisation rule

**This is the one that ruins takes.** If an object appears in the end frame but not the start frame, the model will *create* it, growing it out of the floor, fading it in, morphing it from nothing. It will not move the camera to reveal it.

Real failure: start frame was a terrace with no table in the foreground, end frame was the same terrace *with* a laid table. The client wanted "the camera walks toward the table". What was delivered was a table rising out of the ground.

**Fix: crop both frames out of the SAME photograph.** A wide crop and a close crop. Now the object exists in both at different scales and a geometric push-in is the only interpretation available.

```bash
# wide
ffmpeg -y -i src.png -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -q:v 1 push_a.jpg
# close, cropped from the same source
ffmpeg -y -i src.png -vf "crop=1500:838:640:698,scale=1920:1080" -q:v 1 push_b.jpg
```

### The change budget

Roughly **15-25% of frame content may change across a 5s clip.** Past ~40% you get blur, warping and morphing.

Real failure: start frame was a terrace at dusk, end frame was a table in harsh midday sun. Way over budget, so the whole clip smeared. Fix was to regrade the end frame to blue hour with Nano Banana *first*, then animate.

If start and end are too far apart, either bring them closer or **drop the end frame entirely**. For "things fall into a container", a start image alone plus a good ACTION line beats a forced end frame, because there is no target the model has to reconcile.

### Two working prompts

Pure camera push-in, nothing may change:

```
SUBJECT: a laid table on a lakeside restaurant terrace at dusk, with one large empty black pan already on it.
ACTION: absolutely nothing in the scene changes, appears or moves. No object grows, rises or materialises. Only faint slow ripples on the lake.
CAMERA: the camera itself walks forward toward that same table, a steady dolly push-in of about two metres across the full 10 seconds, ending close on the empty pan. Horizon locked, no rotation, no tilt, constant speed.
LIGHTING: warm terrace lights above, cool blue dusk from the lake.
STYLE: shot on 35mm, shallow depth of field, natural film grain.
AVOID: objects appearing, table growing, table rising from the floor, furniture materialising, food appearing, camera shake, zoom, warping, morphing, people, hands, text, watermark, flicker.
```

Things falling into a container (start image only, no end frame):

```
SUBJECT: a large empty black pan in the centre of a laid table on a lakeside restaurant terrace at sunset.
ACTION: whole red crayfish, langoustines, mussels, prawns, clams and lemon wedges fall down from above into the pan one after another and pile up fast, until the pan is completely full. Sprigs of dill land on top last. Everything else in the scene stays perfectly still.
CAMERA: locked off tripod, absolutely no camera movement, identical framing from first frame to last.
LIGHTING: warm sunset over the lake, unchanged for the whole shot.
STYLE: shot on 35mm, shallow depth of field, natural film grain, real food photography.
AVOID: camera movement, zoom, pan, tilt, shake, warping, morphing, the table moving, the pan changing size or position, people, hands, text, watermark, flicker.
```

### The e-commerce variant (exploded view)

For a physical product, the canonical move is **assembled → exploded**, the Apple teardown look:

1. Image 1: the product, clean background, **specify the resolution in the prompt** ("generate at 2048 resolution"). The sharpness difference against the default is large.
2. Image 2: same product, *same angle, same lighting*, parts separated and floating. **Feed image 1 back in as a reference** when generating image 2 or the two will not match.
3. Kling: image 1 as start, image 2 as end. 3-5s.

Hero sections are wide, so generate the hero still in **horizontal** orientation. Say so in the prompt.

## Chaining clips

To go past one 5-10s beat, chain. The seam has to be invisible.

**Do not feed both clips the same reference image.** The model does not reproduce an input frame exactly, so clip 2 starts slightly off from where clip 1 ended and you see a jump.

**Extract the real frame from the rendered clip**, and not the literal last frame, which is the softest one in the GOP:

```bash
ffmpeg -y -sseof -0.25 -i clip1.mp4 -vframes 1 -q:v 1 -vf format=yuvj420p end_of_1.jpg
hf generate create kling3_0 --start-image end_of_1.jpg --prompt "..." --wait
```

Then concat, normalising both to the same size and fps:

```bash
ffmpeg -y -i c1.mp4 -i c2.mp4 -filter_complex \
 "[0:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,fps=30,format=yuv420p,setsar=1[a];\
  [1:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,fps=30,format=yuv420p,setsar=1[b];\
  [a][b]concat=n=2:v=1:a=0[v]" -map "[v]" -an \
 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
 -x264-params "keyint=1:min-keyint=1:scenecut=0" -movflags +faststart hero.mp4
```

**Always verify the seam.** Pull a frame either side and look:

```bash
for t in 9.8 10.2; do ffmpeg -y -ss $t -i hero.mp4 -vframes 1 -vf "scale=480:-2,format=yuvj420p" out_$t.jpg; done
```

## Encoding for scrub

Two flags matter and both are non-obvious.

**Every frame must be a keyframe.** Seeking to an arbitrary time in a normal H.264 file lands on the nearest keyframe, so scrubbing is chunky:

```
-x264-params "keyint=1:min-keyint=1:scenecut=0"
```

**30fps, not 24.** At 24fps slow scrolling shows visible stepping.

`+faststart` puts the moov atom first so playback can begin before the whole file arrives.

The cost: all-keyframe files are large. A 15s 1600x900 clip lands around **20MB**. Fine on localhost, a real wait on a phone. Before shipping, either cut the duration, drop to ~1200px wide, or raise CRF. Say the number out loud to the user rather than letting them discover it in production.

## Preparing stills with Nano Banana Pro

It is very good at editing real photos. Useful edits:

- remove people from an interior
- relight midday → blue hour (do this *before* animating, to stay inside the change budget)
- fill an empty container with food, keeping the plate and table identical
- composite a product onto a different surface

**It recomposes and changes aspect ratio unless you forbid it.** Every edit prompt needs a framing lock:

> "Keep this exact photograph, same camera angle, same table, same lighting, same background, same framing and aspect ratio. Only change: <the one thing>. Do not move the camera, do not recompose."

Even with the lock it sometimes returns a square. Crop back:

```bash
ffmpeg -y -i out.png -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -q:v 1 out.jpg
```

## Frame extraction gotcha

Kling output is often full-range YUV. `ffmpeg` refuses to write mjpeg from it:

```
[mjpeg] Non full-range YUV is non-standard ... Error while opening encoder
```

Add `format=yuvj420p` to the filter chain on any frame extraction.
