# Failure catalogue

Every entry below was hit in a real build. Symptom first, because that is what you will have.

## Video

**Scrubbing does nothing. `currentTime` stays 0. No error anywhere.**
The server does not support HTTP Range. `curl -s -o /dev/null -w "%{http_code}" -r 100-200 <url>` returns 200 instead of 206. `python3 -m http.server` cannot do this. Use the Node server in scroll-tech.md.

**An object rises out of the ground / fades in from nothing.**
It exists in the end frame but not the start frame, so the model created it. Crop both frames from the same photograph at different scales.

**The whole clip is smeared and warped.**
Start and end differ by more than ~40% of frame content. Bring them closer (relight or regrade the end frame first), or drop the end frame and drive the motion with the ACTION line alone.

**The camera drifts dreamily instead of moving deliberately.**
The prompt contains "cinematic", "smooth", "gently", "sweeping". Replace with distance + duration + "horizon locked, constant speed".

**Visible jump between two chained clips.**
Both clips were given the same reference image. Extract the real frame with `ffmpeg -sseof -0.25` from the rendered clip 1 and feed that as clip 2's start.

**Scrubbing looks chunky / steps between positions.**
Not encoded all-keyframe. Add `-x264-params "keyint=1:min-keyint=1:scenecut=0"`. Also use 30fps, not 24.

**`ffmpeg` refuses to extract frames: "Non full-range YUV is non-standard ... Could not open encoder".**
Kling output is full-range. Add `format=yuvj420p` to the filter chain.

**The image model returns a square and recomposes the shot.**
Nano Banana Pro does this unless explicitly forbidden. Add a framing lock to the prompt, and crop back with ffmpeg as a safety net.

**The generation is rejected as NSFW for a completely innocuous subject.**
The prompt is too long. Moderation is keyword pattern matching and long prompts stack trigger tokens. Shorten to ~60 words of plain prose.

**Every job on one model returns "failed".**
Model-side outage. Switch models (`seedance_2_0` → `kling3_0`) rather than debugging the prompt.

## Layout and CSS

**All content is flush against the viewport edge.**
`padding` shorthand in a later rule overwrote the container's horizontal padding. Use `padding-inline` / `padding-block`.

**Elements have the `.visible` class but computed opacity is 0 and they never appear.**
The class was added in the same frame the element first rendered, so the browser collapsed both states and the transition never ran. Wrap the initial sweep in a double `requestAnimationFrame`, and also re-run on `load` and `document.fonts.ready`.

**Reveal animations never fire after an anchor-link jump.**
`IntersectionObserver` misses elements on large programmatic scrolls. Use a scroll-driven sweep.

**Sticky hero stops sticking after adding smooth scrolling.**
Lenis and friends break `position: sticky`. Remove the library; the lerp in the scrub loop provides the smoothing.

**The marquee flies across the screen on one wheel flick.**
Scroll-velocity factor too high and unclamped. `vel += delta * 0.06`, clamp to ±6, decay `0.92`, base drift `0.35`.

**Uppercase headings look glued together after a font swap.**
Tracking was tuned for the previous family. Retune per family; see design-system.md.

**Words render with one letter in a different font.**
The font lacks that glyph and the browser substituted. Run the canvas measurement test. Very common for diacritics in free display fonts.

## Verification harness

**Screenshots come back solid black although the DOM is correct.**
The preview pane went `hidden` and the compositor stopped painting. Check `document.visibilityState`. Practical workarounds: only the first screenshot after `preview_start` paints reliably, and a large composited layer (a full-viewport video, a `100vh` parallax with `will-change`) can black out the whole capture. Render sections into standalone slice files so the target section sits at scroll 0, and screenshot those.

**CSS transitions report `running` but never progress.**
Same cause: the tab's animation clock is frozen because it is backgrounded. Not a bug in the page.

**`scrollTo` appears to do nothing.**
`html { scroll-behavior: smooth }` plus consecutive `scrollTo` calls cancel each other. Use `window.scrollTo({ top, behavior: 'instant' })` when scripting.

**Preview server will not start: "port in use by node (not a preview server)".**
An earlier manual run of the same server is still holding it. Kill it, set `"autoPort": true` in `.claude/launch.json`, and make the server read `process.env.PORT`.

## Process

**Three rounds of rejected designs.**
Almost always one of: (a) building before the design lock, (b) overriding a reference the user explicitly liked, (c) landing in the second-order category reflex after successfully dodging the first.

**The model "fixes" things nobody asked about.**
End every change request with "Fix only these items. Do not change anything else."

**A tone or design decision keeps reverting between sessions.**
It was never written to `PRODUCT.md` / `DESIGN.md`. Update those files in the same turn as the change.

**The user says the images look bad.**
Look at them yourself before defending the CSS. Phone snapshots with a finger in frame, a stranger's face in the foreground, or a bright sky exactly where the headline sits are all "change the photo" problems, not "add more scrim" problems.
