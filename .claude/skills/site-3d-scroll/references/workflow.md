# Working with the model on this

Extracted from teardowns of three builds (a 3D basketball e-commerce site, an Apple-style product page, a restaurant site) plus one full build of our own. These are the process rules that separated the good outputs from the mediocre ones.

## 1. Research before prompting

Do not design from imagination. Study 2-3 real sites in the same tier and break each down: layout structure, spacing rhythm, type organisation, whether animations are decorative or functional, how responsiveness is handled.

Then extract their design system mechanically rather than by eye. Fonts via the `@font-face` rules, colours via the CSS custom properties, type scale via `getComputedStyle` on real headings. See design-system.md for the snippets.

## 2. Lock the goals before opening the editor

Models perform better with constraints, worse with vague instructions, and **regress when asked to fix broad problems**. Reduce ambiguity before starting.

For a real project the locked goals were: immersive 3D e-commerce, scroll-driven storytelling, real-time customisation, every visual and sound generated from code. Four constraints, no room to wander.

## 3. Write the master prompt

A structured document that governs the whole build, not a one-liner. Its skeleton:

1. **Establish the role.** "Act as an expert front-end engineer and creative UI developer."
2. **Lock the reference.** "Do not redesign, do not simplify, do not reinterpret. The reference is the only source of truth."
3. **General rules.** Layout, typography, colour and spacing must match. Where images may come from.
4. **Extract the design system.** Every font and every font size per text type. Primary / accent / secondary / button colours.
5. **Section breakdown.** Preserve section order, alignment, container widths, proportions. No creative alterations.
6. **Responsive behaviour and performance.**
7. **Visual accuracy.** All font sizes, weights and letter-spacing must match. All spacing and proportions pixel-perfect. Do not omit elements.
8. **Close firmly.** "All instructions above must be followed with extreme precision."

The recurring theme is *stop it improving things*. Improvement is the default behaviour and it is usually what breaks fidelity to a reference the user already approved.

Pass the reference image alongside the prompt, not just the text.

## 4. Iterate surgically

The master prompt never produces perfection on the first run. That is normal. Anyone claiming a perfect first try is editing out the iteration.

Vague feedback creates chaos. Specific, measurable feedback lands in one round.

| vague | surgical |
|---|---|
| "the layout feels off" | "hero container max-width 1200px, centred" |
| "something's wrong with the scroll" | "scroll should transition from hero to section two where the ball grows, rolls over, then in section three shrinks to normal and sits centred" |
| "the colours are bad" | "background to `oklch(16% .01 30)`, accent stays, raise scrim to .86 at 62%" |

**Always close with: "Fix only these items. Do not change anything else."** Without that line, unrelated things get "helpfully" fixed and regressions appear.

## 5. One problem at a time

Never "build me a 3D e-commerce website". That prompt produces a bad website.

Isolate:

- generate the 3D ball using custom geometry and colour maps
- write a shader that creates the nebula effect
- scroll the ball from hero downward with GSAP
- synthesise a click sound with the Web Audio API

Each is a separate conversation, each verified before the next. You are not asking the model to hold an entire project in its head.

## 6. Understand what you ship

The model will write code you could not have written from scratch: shader maths, procedural noise, coordinate-system translation. You do not need to write a shader from memory, but you do need to know what each piece does and why it is there. Otherwise the first time it breaks, you are stuck.

Let the model write the first draft. Own the final version.

## 7. Ship and show the work

The proof is the artefact, not the credentials. In one documented case an anonymous account with no portfolio posted this kind of work, was noticed by the creator of three.js, and got five client projects and a job offer out of it. No name, no following.

## Selling it (context, since this is usually the point)

The sales motion that goes with this build:

- **Targets:** local service businesses. Restaurants, barber shops, dental offices, real estate agents, fitness studios. Not SaaS, not big e-commerce. Businesses that want to look expensive online.
- **Find them:** Instagram accounts with 500-5,000 followers with a link in bio, or Google Maps by category. Open the link. If the site looks like 2015, that is a prospect.
- **Do the work first.** Do not DM "I can build you a website", that gets ignored. Spend 20 minutes rebuilding their homepage with their logo, colours and photos, record a 30-second screen recording showing their current site beside your version, and send that.
- **The message:** "I saw your website and rebuilt a version of your homepage with 3D animation. Took me 20 minutes. Here's what it looks like. If you want it, it's yours, no charge for the homepage. I just want a testimonial."
- **The economics:** free homepage as the door opener, charge for the additional pages, custom animations and maintenance. Personalised outreach converts around 10x better than generic.

The build is the easy part. Everything above about not looking AI-generated is what makes it sellable rather than a demo.
