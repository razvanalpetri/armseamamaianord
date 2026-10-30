# CLAUDE.md

## Closr

Closr sells AI setters: they reply to DMs on WhatsApp, Instagram and Telegram
24/7, qualify leads with the customer's own questions, book calls, and let a
human take over any chat in one click.

## Repo layout

| Path | What it is |
| --- | --- |
| `apps/web/` | **Closr marketing landing page** (Next.js). npm workspace. |
| `apps/agency/` | **Closr Agency site** (AI automation agency, Next.js). npm workspace. Same design system as `apps/web`. |
| `src/`, `index.html`, root `package.json` | Older Vite + React starter (unrelated to Closr, untouched). |
| `imobiliare/` | Static real-estate sites (unrelated to Closr). |

The root `package.json` declares `"workspaces": ["apps/*"]`. The root `.npmrc`
sets `install-strategy=shallow` so `apps/web` gets its own React 19 / Next
install instead of resolving the root Vite app's React 18. Don't remove it.

## Stack

- **Web app (`apps/web`)**: Next.js 16 (App Router, Turbopack), React 19,
  TypeScript (strict), Tailwind CSS v4 (CSS-first tokens in `app/globals.css`),
  Framer Motion (`LazyMotion` + `m.*`), lucide-react icons.
- **Waitlist API**: `app/api/waitlist/route.ts` → Supabase (`@supabase/supabase-js`,
  service-role key, server only). Not connected yet (see Status).
- Hosting target: Vercel (Root Directory `apps/web`).

## Commands (run from the repo root)

```bash
npm install            # installs every workspace
npm run dev:web        # http://localhost:3000
npm run build:web
npm run dev:agency     # http://localhost:3001
npm run build:agency
npm run lint -w apps/web
npm run typecheck -w apps/web
```

## Conventions for apps/web

- **All copy lives in `apps/web/content/en.ts` and `ro.ts`.** No hard-coded
  text in components. `ro.ts` is typed as `Dictionary` (= the shape of `en.ts`),
  so add keys to `en.ts` first and the compiler flags what's missing in Romanian.
- English is served at `/`, Romanian at `/ro`. Two root layouts
  (`app/(en)` and `app/(ro)`) give each language a correct `<html lang>`.
  `lib/i18n.ts` (`localePath`, `sectionHref`) builds every internal link, and
  `lib/site.ts` (`pageMetadata`) builds titles, canonical and hreflang.
- **No fake social proof**: no testimonials, customer logos, user counts or
  invented statistics. Leave the space out until there are real results.
- **Pricing**: every number lives in `apps/web/content/pricing.ts` (plan prices,
  yearly prices, credits, limits, which features each plan lists, comparison
  cells, credit packs, trial length). The words are in `en.ts` / `ro.ts` under
  `pricing`, keyed by the same ids. Prices are formatted per language by
  `lib/pricing.ts` (€97 in EN, 97 € in RO), and per-month yearly prices and pack
  savings are computed, so change a price only in `pricing.ts`. Plan CTAs point
  to `#waitlist` until Stripe checkout exists.
- Brand: dark only, violet. Colour tokens are CSS variables in `@theme`
  (`--color-bg`, `--color-primary`, …). Fonts: Space Grotesk (headings) +
  Inter (body) via `next/font`, with `latin-ext` for Romanian diacritics.
- Surfaces use a **Liquid Glass** material (after Apple's iOS 26), defined in
  `app/globals.css`. Build with these classes instead of ad-hoc borders and fills:
  - `.glass` (cards and panels), plus `.glass-tint` for the one surface in a group that leads
  - `.glass-pill` (chips, tags, icon buttons), `.lg-icon` (feature icons), `.lg-badge` (tinted badges)
  - `.glass-field` and `.glass-chip` (form controls), `.lg-inset` (a well inside a glass panel)
  - `.lg-nav` (floating navbar capsule), `.lg-sheet` (mobile menu), `.lg-segment` / `.lg-thumb` (EN|RO),
    `.lg-bezel` (phone frame)
  - `.btn-primary` / `.btn-secondary` (glass pills)

  The glass needs colour behind it: `<Ambient>` (in `RootShell`) is a fixed
  light layer under the page, so `body` stays transparent. `<GlassLight>` moves
  the specular highlight of the `.glass` under the pointer (desktop only).
  Keep the ambient light static: animated light would make every visible glass
  surface re-blur on each frame.
- Motion must respect `prefers-reduced-motion`. Scroll reveals are CSS
  (`<Reveal>` + `<RevealObserver>`), not Framer, to keep hydration cheap.
- Performance: below-the-fold sections use `.defer-render`
  (`content-visibility: auto`). If you change the hero phone's size, update the
  reserved height in `.defer-render-phone`, or the page will shift on load.

## Closr Agency (`apps/agency`)

- Same conventions as `apps/web` (copy in `content/en.ts` / `ro.ts`, EN at `/`,
  RO at `/ro`, Liquid Glass classes, no invented stats, testimonials or client
  logos, motion respects reduced motion). The design system is a copy of
  `apps/web`'s files (`app/globals.css` and the shared components), so a change
  to the look has to be made in both apps.
- The only call to action is a free audit by **Instagram DM**; the handle and
  audit length live in `content/contact.ts`. No form, no data collection.
- Industries are who the agency builds for, not a client list. Don't promise
  specific results, prices or timelines; the FAQ says they come after the audit.

## Status

- [x] **Landing page (`apps/web`)**: done. All 10 sections, EN/RO, SEO
  (hreflang, sitemap, robots), SVG favicon, Privacy/Terms placeholder pages,
  404, waitlist form UI and API route with validation and a honeypot.
- [ ] **Waitlist backend**: add `supabase/migrations/0002_waitlist.sql`
  (table `waitlist`: email unique, business_name, channel, language,
  created_at; RLS on, insert only via the service role), then set
  `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Until then the form shows
  "The waitlist isn't connected yet".
- [x] **Pricing section**: Starter / Growth / Scale, monthly and yearly
  billing, credit packs, comparison table, pricing FAQ (EN + RO).
- [ ] Stripe checkout for the plan CTAs (they link to the waitlist for now).
- [ ] Replace the `[contact email]` placeholders and the placeholder
  Privacy/Terms text before Meta app review.
- [x] **Closr Agency site (`apps/agency`)**: one page, EN + RO, Instagram DM CTA.
