# CLAUDE.md

## Closr

Closr sells AI setters: they reply to DMs on WhatsApp, Instagram and Telegram
24/7, qualify leads with the customer's own questions, book calls, and let a
human take over any chat in one click.

## Repo layout

| Path | What it is |
| --- | --- |
| `apps/web/` | **Closr marketing landing page** (Next.js). npm workspace. |
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
- Pricing values are placeholders marked `TBD` in the content files.
- Brand: dark only. Colour tokens are CSS variables in `@theme` (`--color-bg`,
  `--color-primary`, …). Use the `.glass`, `.btn-primary`, `.glow-text` and
  `.icon-tile` helpers. Fonts: Space Grotesk (headings) + Inter (body) via
  `next/font`, with `latin-ext` for Romanian diacritics.
- Motion must respect `prefers-reduced-motion`. Scroll reveals are CSS
  (`<Reveal>` + `<RevealObserver>`), not Framer, to keep hydration cheap.
- Performance: below-the-fold sections use `.defer-render`
  (`content-visibility: auto`). If you change the hero phone's size, update the
  reserved height in `.defer-render-phone`, or the page will shift on load.

## Status

- [x] **Landing page (`apps/web`)**: done. All 10 sections, EN/RO, SEO
  (hreflang, sitemap, robots), SVG favicon, Privacy/Terms placeholder pages,
  404, waitlist form UI and API route with validation and a honeypot.
- [ ] **Waitlist backend**: add `supabase/migrations/0002_waitlist.sql`
  (table `waitlist`: email unique, business_name, channel, language,
  created_at; RLS on, insert only via the service role), then set
  `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Until then the form shows
  "The waitlist isn't connected yet".
- [ ] Replace the `TBD` prices, the `[contact email]` placeholders and the
  placeholder Privacy/Terms text before Meta app review.
