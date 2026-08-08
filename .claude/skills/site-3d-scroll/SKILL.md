---
name: site-3d-scroll
description: Build a premium scroll-driven website with an AI-generated 3D hero video for any business, restaurant, e-commerce product, rental/Airbnb, local service, SaaS. Use when the user asks for a "wow" site, a 3D site, a scroll-based site, an award-winning landing page, a site with a product animation, or names a business and asks for a website. Covers the whole pipeline: generating the hero video with Higgsfield (Nano Banana Pro + Kling), wiring it to scroll, and designing the page so it does not look AI-generated.
---

# Scroll-driven site with an AI 3D hero

Builds the whole thing end to end: a hero video generated from AI stills, scrubbed by scroll position, inside a page designed well enough that nobody asks "which AI made this?"

**The output is not a template.** Two sites built with this skill should not look alike. What is fixed is the *pipeline* and the *quality bar*, not the design.

## The four things that make or break it

Most attempts fail on these. They are in priority order.

1. **The hero video must not morph.** If an object exists in the end frame but not the start frame, the model materialises it out of thin air and the result is unusable. See [references/hero-video.md](references/hero-video.md).
2. **The server must support HTTP Range.** Without it, video scrubbing silently does nothing: `currentTime` stays at 0 and there is no error anywhere. `python3 -m http.server` does **not** support Range. See [references/scroll-tech.md](references/scroll-tech.md).
3. **The design must survive the category-reflex check.** If someone can guess the palette and the font family from the business category alone, it reads as AI output. See [references/design-system.md](references/design-system.md).
4. **Every change must be verified in a browser, on desktop AND mobile.** Not "it should work". Measured. See [references/verification.md](references/verification.md).

## Flow

```
1. INTAKE        what business, what assets exist, what is the one hero moment
2. RESEARCH      find 2-3 real reference sites, extract their design systems
3. DESIGN LOCK   write PRODUCT.md + DESIGN.md before any code
4. HERO VIDEO    stills -> start/end frames -> Kling -> chain -> encode for scrub
5. BUILD         page sections, scroll wiring
6. VERIFY        desktop + mobile, measured, screenshots
7. ITERATE       surgically, one problem at a time
```

Do not reorder. Building before the design lock produces slop that then has to be thrown away. This is the single most common failure.

### 1. Intake

Ask only what you cannot infer. You need:

- **What kind of business** (drives the section blueprint, see [references/site-blueprints.md](references/site-blueprints.md))
- **Real assets?** Photos, logo, brand colours, an existing site to scrape. Real photos beat generated ones almost always for anything that physically exists. If they have a live site, scrape it: `curl` the page, pull `wp-content/uploads` or equivalent, build a contact sheet, pick the good ones.
- **The one hero moment.** A single sentence describing what the video does. "The camera walks up to the table and the empty pan fills with seafood falling from above." If you cannot say it in one sentence, it will not read on screen.

Then **pick the hero flavour**, deliberately, from [references/hero-recipes.md](references/hero-recipes.md):

| | flavour | best for |
|---|---|---|
| A | exploded scrub, assembled to teardown | physical products, ecom, gadgets |
| B | object loop carried across sections | one hero centrepiece: bottle, watch, building |
| C | real three.js geometry | immersive "scroll into the object", luxury |
| D | video background loop | lifestyle: apartments, restaurants, travel |
| + | walk-in tour | property, venue, hotel |
| + | staged transformation | construction, renovation, before/after |

D is not the lesser option. A good loop with real copy beats a badly executed 3D scrub every time.

### 2. Research

Never design from imagination. Find real sites in the same tier and extract what they actually use:

```js
// run in the browser console on the reference site
[...document.styleSheets].flatMap(s => { try { return [...s.cssRules] } catch { return [] } })
  .filter(r => r.type === 5)                       // @font-face
  .map(r => r.style.fontFamily + ' -> ' + r.style.src.slice(0, 120))
```

and for the design tokens:

```js
getComputedStyle(document.documentElement)   // then read the --custom-properties
getComputedStyle(document.querySelector('h1'))  // fontFamily, fontSize, letterSpacing, lineHeight
```

Feed a screenshot of the reference into your own analysis and extract: layout structure, spacing rhythm, type scale, colour roles, whether animation is decorative or functional.

**When the user says "I like this site", that is the highest-signal input in the entire project.** Do not "improve" on it. Replicating a reference the user chose beats inventing something they did not ask for. A font swap "for more drama" against a reference the user already approved is how three rounds of rework start.

### 3. Design lock

Write two files in the project root before writing any HTML:

- `PRODUCT.md`, what it is, who lands on it, tone of voice, anti-references ("NOT fine-dining minimalism", "NOT a delivery app"), strategic principles.
- `DESIGN.md`, the physical scene (who is looking at this, where, in what light), colour strategy, type direction, and an explicit forbidden list for this project.

These are not ceremony. They are what you check the build against, and what stops the next session from undoing your decisions. **When the user redirects the tone or the design, update these files in the same turn** or the next session will fight the change.

### 4. Hero video

- Which recipe, and the concrete shot lists: [references/hero-recipes.md](references/hero-recipes.md)
- Pipeline, video prompt format, model names, encoding flags: [references/hero-video.md](references/hero-video.md)
- JSON schema for the still prompts: [references/image-prompts.md](references/image-prompts.md)

**JSON for image prompts, prose for video prompts.** They are different formats for a reason; see image-prompts.md.

#### Preflight, before generating anything

Run this once. Generation costs credits and takes minutes, so failing here is much cheaper than failing halfway through a clip.

```bash
command -v hf >/dev/null && hf account 2>&1 | head -3 || echo "HF_MISSING"
command -v ffmpeg >/dev/null || echo "FFMPEG_MISSING"
```

**`hf` missing.** Offer to install it, and say which command you are about to run. Do not install without asking.

```bash
brew install higgsfield-ai/tap/higgsfield     # macOS / Linux, preferred
npm install -g @higgsfield/cli                # cross-platform, needs Node 18+, works on Windows
```

There is also a `curl ... | sh` installer on the project's README. Prefer brew or npm: piping a remote script into a shell is worth avoiding when a package manager will do the same job.

**`hf` present but the account call fails.** They are not logged in. Tell them to run `hf auth login` themselves and say when it is done. Never ask for their credentials, never run an interactive login on their behalf, and never handle their token. Higgsfield tokens are short-lived, so this recurs; it is not a broken install.

**`ffmpeg` missing.** `brew install ffmpeg` on macOS, `apt install ffmpeg` on Debian/Ubuntu.

**They decline, or have no Higgsfield account.** Only then fall back. The pipeline still works: give them the exact prompts from hero-video.md, they generate the stills and the clip by hand in Kling, Runway, Pika or Google AI Studio, drop the files into the project, and you pick up from the encoding step. Say this plainly instead of stalling.

Also state the credit cost before a long run. A chained hero of two or three clips is several generations, and users should not discover that after the fact.

Short version:

```bash
# 1. prep or clean the frames (people removal, relight, crops)
hf generate create nano_banana_pro --wait --prompt "<edit instruction>" --image-references in.png

# 2. animate between two frames
hf generate create kling3_0 --wait --wait-timeout 25m \
  --start-image a.jpg --end-image b.jpg --prompt "<SUBJECT/ACTION/CAMERA/LIGHTING/STYLE/AVOID>"

# 3. encode for scrubbing: every frame a keyframe, 30fps
ffmpeg -i raw.mp4 -an -r 30 -vf "scale=1600:-2,format=yuv420p" \
  -c:v libx264 -preset slow -crf 24 \
  -x264-params "keyint=1:min-keyint=1:scenecut=0" -movflags +faststart hero.mp4
```

### 5. Build

Section architecture by business type: [references/site-blueprints.md](references/site-blueprints.md).
Scroll wiring, server, and the interaction patterns worth stealing: [references/scroll-tech.md](references/scroll-tech.md).
Typography, colour, and the anti-slop rules: [references/design-system.md](references/design-system.md).

### 6. Verify

[references/verification.md](references/verification.md). Non-negotiable: horizontal overflow at 390px, every asset returns 200, `Range` returns 206, and for non-English sites every diacritic actually exists in the chosen font.

### 7. Iterate

Surgically. Vague feedback makes it worse:

| Bad | Good |
|---|---|
| "the scroll feels off" | "slow the marquee: cap scroll velocity at ±6px/frame and decay 0.92" |
| "the layout is wrong" | "hero container max-width 1200px, centred" |
| "make it better" | "increase tracking on the display caps to .05em, line-height to 1" |

**End every fix request with: "Fix only these items. Do not change anything else."** Without it the model helpfully "improves" things nobody asked about, and that is where regressions come from.

**One problem at a time.** Never "build me a 3D e-commerce site". Instead: generate the hero frames. Then: wire the scrub. Then: the dish list hover. Each verified before the next.

## Known failure catalogue

Every one of these was hit in a real build. [references/pitfalls.md](references/pitfalls.md) has the diagnosis and the fix for each. Skim it before debugging anything; it will usually already be in there.
