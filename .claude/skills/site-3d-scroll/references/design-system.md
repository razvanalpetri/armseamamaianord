# Not looking AI-generated

The bar: a visitor should ask "how was this made?", not "which AI made this?"

## The category-reflex check

Run it at two altitudes. The second one catches what the first misses.

**First order.** If someone could guess the palette from the business category alone, it is the training-data reflex:

| category | reflex to refuse |
|---|---|
| seafood restaurant | navy + white + thin serif |
| fine dining | bone/beige + deep green + lots of silence |
| fitness | black + neon green/yellow |
| fintech | navy + gold |
| crypto | neon on black |
| healthcare | white + teal |
| dev tool | dark blue |

**Second order.** If someone could guess the *aesthetic family* from category-plus-anti-references, that is the trap one tier deeper. "Premium restaurant that isn't generic" → editorial-typographic with numbered chapters and a thin italic serif. That is itself the reflex. Avoiding the first cliché and landing straight in the second one is the most common failure.

Currently saturated, needs a real reason to enter:

- **Editorial-typographic.** Display serif (often italic) + small mono labels + ruled separators + monochrome restraint + numbered sections. Every Stripe-adjacent brand has landed here.

## Fonts

### The selection procedure

1. Write **three concrete brand-voice words**. Physical-object words, not "modern" or "elegant". "Warm and mechanical and opinionated." "Loud and generous and unpretentious."
2. Name the **physical object** the brand is: a fish-market chalkboard, a 1970s terminal manual, a museum caption, a mid-century diner receipt, a concert poster.
3. List the three fonts you'd reach for **by reflex**, and reject any on the list below.
4. Browse a real catalogue with the three words in mind.
5. Cross-check: if the final pick matches the original reflex, start over.

### Reflex-reject list

Training-data defaults. They create monoculture:

> Fraunces · Newsreader · Lora · Crimson (all cuts) · Playfair Display · Cormorant (all cuts) · Syne · IBM Plex (all) · Space Mono · Space Grotesk · Inter · DM Sans · DM Serif Display/Text · Outfit · Plus Jakarta Sans · Instrument Sans · Instrument Serif

This applies to **new** decisions. If the brand already ships one of these, identity preservation wins.

### When the user names a reference site, use its actual font

Extract it, do not approximate it, and **do not "upgrade" it**. A real sequence from a build:

> User picked restaurantgem.com as the reference. It uses **Gilda Display**. The font was swapped to Bodoni Moda "for more drama". Three rounds of rejected alternatives followed before going back to the reference's own font family. The user's chosen reference is the highest-signal input available; overriding it is pure downside.

### Weight is a real axis

A thin high-contrast didone at 160px over a photograph **disappears**, the hairlines vanish into the image and it reads as "expensive restaurant" rather than whatever the brand actually is. If the brief says abundance, generosity, volume, the display face needs mass. If the brief says refinement, contrast is fine but the scrim underneath has to carry it.

### Retune the tracking when you swap the font

Font families are not drop-in replacements. Swapping a didone for a delicate roman with a small x-height without retuning gives you glued-together capitals:

| | didone | delicate roman |
|---|---|---|
| hero caps tracking | `.015em` | `.05em` |
| hero line-height | `.9` | `1` |
| section titles | `-.01em` | `.005em` |
| uppercase list rows | `.015em` / lh `1.05` | `.035em` / lh `1.2` |

### Verify the glyph coverage, measured, not assumed

For any non-English site. Free display fonts routinely ship without Romanian, Polish, Turkish, Vietnamese diacritics, and the browser silently substitutes another font **mid-word**. It looks like a rendering bug.

```js
// run in the page, after document.fonts.ready
const c = document.createElement('canvas').getContext('2d');
for (const ch of 'ăâîșțĂÂÎȘȚ') {
  c.font = '100px "Your Font", monospace'; const a = c.measureText(ch).width;
  c.font = '100px monospace';              const b = c.measureText(ch).width;
  console.log(ch, Math.abs(a - b) < 0.5 ? 'MISSING (fallback)' : 'ok');
}
```

A real dafont script font was missing 6 of 10 Romanian diacritics and had `â`/`î` mapped to plain `a`/`i`, the glyph existed so a naive check passed, but the accent was simply not drawn. Look at the rendered words too, not only the measurement.

**Escape hatch:** a font with broken diacritics can still work as a **wordmark only**, if the brand name itself has no accented characters. Everything else gets a font with full coverage.

### Licensing

dafont and similar are usually **"free for personal use"**. A client's live commercial site needs the paid licence. State this plainly when proposing such a font; do not quietly ship it.

## Colour

Use **OKLCH**. Reduce chroma as lightness approaches 0 or 100. Never `#000` or `#fff`, tint every neutral toward the brand hue (chroma 0.005-0.01 is enough).

Pick a **strategy** before picking values:

| strategy | what it means | when |
|---|---|---|
| Restrained | tinted neutrals + one accent ≤10% | product UI, quiet brands |
| **Committed** | one saturated colour carries 30-60% of the surface | **default for a brand landing page** |
| Full palette | 3-4 named roles, each used deliberately | campaigns |
| Drenched | the surface *is* the colour | heroes |

The "one accent ≤10%" rule is **Restrained only**. Collapsing every design to it by reflex is what makes pages look timid.

Name a real reference before choosing: "Klim orange drench", "Vercel monochrome", "Liquid Death acid-green". Unnamed ambition becomes beige.

If the brand has a colour in its logo, that is the committed colour. Do not substitute a tasteful neighbour.

## Text over photography

White text over a photograph fails more often than it works. Three things fix it, and you usually need all three:

```css
.bg   { filter: saturate(.9) brightness(.72) }             /* tame the photo */
.band::before {                                             /* real scrim, not a 25% wash */
  content:""; position:absolute; inset:0; z-index:1;
  background:linear-gradient(180deg,
    rgba(10,8,7,.72) 0%, rgba(10,8,7,.6) 30%,
    rgba(10,8,7,.86) 62%, rgba(10,8,7,.96) 100%);
}
.title { text-shadow: 0 2px 40px rgba(0,0,0,.85), 0 1px 4px rgba(0,0,0,.5) }
```

And pick the right photo. A bright-sky snapshot with people in the foreground will never hold a headline; a dark, saturated, subject-filling frame will. **Changing the photo is usually cheaper than fighting it with CSS.**

## Layout

- Vary spacing for rhythm. Identical padding everywhere reads as a template.
- Cards are the lazy answer. Nested cards are always wrong.
- Do not centre everything. A centred stack of icon-title-subtitle cards is the single most template-looking layout that exists.
- `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` when cards genuinely are right.

### The padding shorthand trap

```css
.container { max-width: 1440px; margin: 0 auto; padding: 0 52px }
.spacing   { padding: 150px 0 }      /* ← kills the horizontal padding */
```

Same specificity, later rule wins, and every element goes flush to the viewport edge. Use logical properties so they compose:

```css
.container { padding-inline: 52px }
.spacing   { padding-block: 150px }
```

## Hard bans

- **Side-stripe borders** (`border-left: 4px solid` as a card accent). Never intentional.
- **Gradient text** (`background-clip: text` + gradient).
- **Glassmorphism as decoration.**
- **The hero-metric template**: big number, small label, supporting stats, gradient accent.
- **Identical card grids**: same-size cards, icon + heading + text, repeated.
- **Modal as the first idea.**
- **All-caps body copy.**
- **Repeated tiny uppercase tracked labels above every single section.** One strong kicker is voice; using it as section grammar everywhere is AI scaffolding.

## Copy

Every word earns its place. No heading restated in the paragraph beneath it.

**No em dashes.** Not `-`, not `--`. Commas, colons, semicolons, periods, parentheses. They are the single most recognisable AI tell in written copy, and clients notice.

Match the register to the business, and **when the user corrects the register, update `PRODUCT.md` in the same turn**. A tone documented as "generous, direct, no airs" will be dragged back by the next session otherwise. Register shifts look like:

| casual | respectable |
|---|---|
| "Come with the whole crew" | "We look forward to seeing you" |
| "call ahead" (imperative singular) | "please let us know in advance" (polite plural) |
| clipped fragments | complete sentences |
