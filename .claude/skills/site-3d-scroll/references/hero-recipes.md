# Hero recipes: the four flavours

Distilled from six video tutorials, two PDFs, and five sites actually built with this pipeline. Pick one deliberately. Mixing two in one hero is how you get mush.

| flavour | what it is | best for | difficulty |
|---|---|---|---|
| **A. Exploded scrub** | assembled to teardown, video scrubbed by scroll | physical products, ecom, gadgets, snacks | medium |
| **B. Object loop** | one generated object rotating/floating, carried across sections | a single hero centrepiece: a bottle, a watch, a building | medium |
| **C. Real three.js** | actual geometry the model writes, cursor and scroll reactive | immersive "scroll into the object", luxury, spa, parfum | hard |
| **D. Video background** | full-height loop behind copy, no 3D at all | lifestyle: apartments, restaurants, travel, food | easy |

**D is not a lesser option.** A well-shot loop with real copy beats a badly executed 3D scrub every time. It is the right pick for anything where atmosphere sells and there is no single hero object.

C is the only one that is genuinely smooth under fast scroll, because it is real geometry rather than video decode. It is also the only one where the user can interact with the object. Do not start there.

## Recipe A: exploded product

1. Still 1: product assembled, clean background, `"2048 resolution"` stated in the prompt.
2. Still 2: exploded, parts floating. **Feed still 1 in as a reference** or the two will not match.
3. Kling: still 1 as start, still 2 as end, 3-5s, audio off.
4. Scrub. Forward on scroll down, reverse on scroll up.

Hero sections are wide, so ask for **horizontal orientation** on still 1.

## Recipe B: object loop, and the ping-pong trick

For a centrepiece that must run forever without a visible restart, export a **ping-pong loop**: the clip forward, then the same clip reversed, concatenated. The end frame equals the start frame by construction, so it is seamless with no crossfade.

```bash
ffmpeg -y -i clip.mp4 -filter_complex \
  "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]" -map "[v]" -an \
  -c:v libvpx-vp9 -crf 32 -b:v 0 loop.webm
```

Then carry the object across sections: as the user scrolls, move and scale it between anchor points so it visually stitches the page together instead of sitting in one band.

### Luxury object shot set

For a watch, bottle, or jewellery piece, three clips cover a whole page. Generate **one hero still first** and pass it as the start frame to all three, so the object stays identical across the site:

| clip | prompt core |
|---|---|
| `orbit` | "slow perfectly smooth 360 degree studio turntable, floating in a black void, dramatic rim lighting, one continuous rotation, no cuts" |
| `macro` | "extreme close-up glide across the dial, engraved indices passing, light rippling across brushed metal, one smooth macro fly-through, no cuts" |
| `exploded` | "assembling itself from floating components converging in mid-air into the finished piece, one continuous assembly motion" |

"One continuous X, no cuts" is doing real work in all three. Without it the model invents shot changes.

## Recipe C: real three.js

Prompt the model directly for it. Phrasings that work:

> "animated 3D javascript background"
> "scroll-based animation using 3D"
> "scroll INTO the 3D object"

No Spline, no Higgsfield, no video. The model writes the three.js. It comes out buttery smooth where a heavy video scrub stutters.

Build it one problem at a time: geometry first, then the material or shader, then the scroll wiring, then the interaction. Never one prompt for all of it.

## Recipe D: video background

Full-height loop, overlay at 25-35% only if the text needs contrast, and copy that tells a story rather than listing features. Source the video from stock, or generate stills and animate them.

The mistake here is a video with too much motion. A hero loop should be almost still: slow water, drifting steam, a curtain moving. Anything faster fights the copy.

## Recipe: walk-in tour (property, venue, hotel)

The strongest hero for anything you walk into. Chain 5s clips, each **one continuous camera move**, audio off.

**The rule that makes it work: the end frame of a clip is the start frame of the next one.** That is what makes the stitch invisible. Write the shot list against real photographs before generating anything.

A real shot list from a Dubai apartment build, where the numbers are the listing's own photos:

```
C1  01 -> 02   180 degree turn: from the balcony, turning back into the living room   HERO
C2  02 -> 04   glide through the living room (sofa to TV)
C3  04 -> 09   pull-back revealing the open plan (dining bar + kitchen)
C4  09 -> 05   entering the kitchen
C5  05 -> 06   down the hall into the bedroom
C6  06 -> 14   day to night: push toward the window, the city lights come on          FINALE
```

Minimum viable tour: C1, C2, C3, C6. The rest is bonus.

Two things worth stealing from that list: **open on a turn rather than a push** (a 180 from a balcony into a room is far more arresting than walking forward), and **end on a state change** (day to night) so the tour has a payoff instead of just stopping.

## Recipe: staged transformation

Empty plot to finished building. Also works for renovation before/after, a dish being plated, a room being furnished.

Generate the **states** as stills first, then the motion between them:

```
f1_empty.png  ->  f2_foundation.png  ->  f3_frame.png  ->  f4_villa.png
        n1.mp4            n2.mp4              n3.mp4
```

Each still is generated from the previous one as reference, so the camera and the site stay locked. Then concat the clips into one `reveal.mp4` and scrub it.

Keep the camera **completely static** across the whole sequence. The building changes; nothing else does. A moving camera plus a changing subject blows the change budget instantly.

## The before/after slider

Pairs with the transformation recipe and costs almost nothing. Two stacked images, the top one clipped, the clip driven by pointer position:

```css
.ba { position: relative }
.ba img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover }
.ba .aft { clip-path: inset(0 0 0 50%) }
```

```js
const set = x => {
  const r = box.getBoundingClientRect();
  const p = Math.max(0, Math.min(1, (x - r.left) / r.width));
  aft.style.clipPath = `inset(0 0 0 ${p * 100}%)`;
  handle.style.left = `${p * 100}%`;
};
box.addEventListener('mousedown', e => { drag = true; set(e.clientX) });
box.addEventListener('touchstart', e => { drag = true; set(e.touches[0].clientX) }, { passive: true });
addEventListener('mousemove', e => { if (drag) set(e.clientX) });
addEventListener('touchmove', e => { if (drag) { e.preventDefault(); set(e.touches[0].clientX) } }, { passive: false });
addEventListener('mouseup',  () => drag = false);
addEventListener('touchend', () => drag = false);
// follow the pointer without dragging, but only where hovering exists
box.addEventListener('mousemove', e => {
  if (!drag && matchMedia('(hover:hover)').matches) set(e.clientX);
});
```

The `(hover:hover)` guard matters: without it, touch devices get erratic behaviour from synthetic mouse events.

Same mechanic drives a **day/night** comparison, which is the single best way to sell a property with a view.

## Tool stack

- **Stills:** Nano Banana 2 / Pro. Free tier in Google AI Studio is roughly 600-750 generations a month. Always state the resolution. Leave negative space at the top of hero stills for the headline.
- **Video:** Kling 3.0, Seedance, Higgsfield. Start frame + end frame. Audio off, always.
- **Build:** Claude Code. Fable 5 is the strongest model for web design and 3D work specifically.
- **Design references:** Dribbble, Mobbin, MotionSites, Awwwards.
- **Deploy:** Vercel or Netlify, one click.

## Workflow principles

- **Write the hero copy first**, then build the 3D around it. Not the other way round.
- **Iterate small**: structure, then 3D, then polish. Never one giant prompt.
- **Carry the big 3D element across sections** with scroll-driven move and zoom. It is what makes a page feel like one object instead of a stack of bands.
- The site is not the moat. Positioning and the outcome you sell are. A beautiful site that does not say what the business does is a portfolio piece, not a sale.
