# Image prompts

**Rule: JSON for image models. Prose for video models.**

Image models parse structure and reward it. Video models are trained on caption prose, so JSON keys become noise tokens and long prompts stack moderation triggers. Do not use the same format for both.

Video prompt format is in [hero-video.md](hero-video.md). This file is images only.

## Schema

Keep one JSON file per image in `prompts/`, named after the output. It costs nothing and makes regeneration and iteration trivial, because you edit one field instead of rewriting a paragraph.

```json
{
  "format": "16:9 horizontal, single still image, first frame of an exploded-view rotation animation",
  "reference": "match the exact bun, patty, cheese and colour style of the provided reference",
  "subject": "one assembled double smash cheeseburger, three-quarter front angle, slightly above eye level, on lightly crumpled parchment; sesame brioche crown, lettuce, two tomato slices, bacon, smash patty, drooping American cheese, caramelised onions, second patty, cheese, pickles, house sauce, toasted heel",
  "environment": "clean warm off-white cream seamless studio background, soft contact shadow",
  "lighting": "big soft daylight key from the upper left, gentle fill from the right, small speculars on cheese and grease",
  "camera": "50mm, three-quarter front angle about 25 degrees off-axis, slightly high, f/8, subject centred with generous clean space all around for a rotation move",
  "color_grading": "bright warm neutral whites, natural saturated food colour",
  "negative_prompt": "dark background, exploded, floating layers, gaps, text, labels, watermark, hands, plate, side profile flat view, cartoon"
}
```

Fields that earn their place:

| field | why |
|---|---|
| `format` | states the aspect ratio and **what the image is for**. "First frame of a rotation animation" changes how the model composes. |
| `reference` | when a reference image is attached, say what must be matched from it. |
| `subject` | the one long descriptive field. Be specific about angle and height. |
| `environment` | background and shadow, separately from the subject. |
| `lighting` | key, fill, speculars. Vague lighting is why generated product shots look flat. |
| `camera` | focal length, angle, aperture, and **where the empty space is**. |
| `color_grading` | stops the model drifting to teal-orange. |
| `negative_prompt` | the failure modes for this specific shot. |

## The edit schema

For editing a real photograph rather than generating from nothing, the shape changes. Preservation becomes the dominant instruction:

```json
{
  "task": "colour-grade and relight this photograph from bright midday sun to warm blue-hour dusk, keeping the scene and composition identical",
  "source": "provided photograph: an outdoor lakeside deck table loaded with stainless-steel seafood platters, blue marine ropes, shot in harsh bright autumn midday sunlight",
  "instruction": "keep every platter, every piece of seafood, every lemon wedge, the table, the ropes and the framing EXACTLY as they are, identical positions, identical arrangement, identical camera angle and aspect ratio. Only the TIME OF DAY and LIGHTING change.",
  "new_lighting": "warm blue-hour dusk after sunset: soft warm amber light spilling from overhead terrace string lights, cool deep-blue ambient on the lake and sky beyond, rich golden highlights on the food, far treeline a dark silhouette against a fading orange-to-blue sky",
  "mood": "intimate evening dinner by the lake, warm, inviting, premium; the food must look more appetising than in daylight",
  "must_preserve_exactly": [
    "all platters and their exact contents and arrangement",
    "the table and its legs",
    "the camera angle, perspective, crop and aspect ratio",
    "the sharpness and detail of every piece of food"
  ],
  "quality_bar": "photographic and natural, like the same shot taken three hours later. No flat blue filter, no fake HDR glow, no crushed shadows, food stays razor sharp",
  "negative_prompt": "changed food, moved platters, different arrangement, missing platters, people, hands, harsh midday sun, flat blue filter, teal-orange overgrade, fake bloom, HDR halo, crushed blacks, blur, different angle, crop, zoom, text, watermark, cartoon"
}
```

`must_preserve_exactly` as an explicit array is the difference between an edit and a reinterpretation. Nano Banana Pro will otherwise recompose, re-crop, and quietly change the aspect ratio.

## Non-negotiable clauses

Put these in every image prompt where they apply:

- **Resolution.** State it. `"2048 resolution"`. The sharpness gap against the default is large and free.
- **Framing lock**, on every edit: same camera angle, same framing, same aspect ratio, do not recompose.
- **Negative space** where text will go. Hero stills need clean area at the top or one side, or the headline lands on top of the subject.
- **Orientation.** Hero sections are wide. Say horizontal.
- **Consistency chain.** When generating a set that must match, feed the first image back as a reference for every subsequent one. Do not regenerate from text alone and hope.

## Quick sanity check before animating

Look at the stills side by side and ask: **how much of the frame changed?** More than about a quarter and the video model will smear it. If they are too far apart, fix it at the still stage: relight one, or insert an intermediate state.
