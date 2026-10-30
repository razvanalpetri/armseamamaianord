# Closr Agency: marketing site

One-page site for Closr Agency, an AI automation agency: English at `/`, Romanian at
`/ro`. It uses the same Liquid Glass design system as the Closr product site in
`apps/web` (copied, not shared, so each site can be deployed and changed on its own).

## Run locally

From the **repository root** (npm workspace):

```bash
npm install
npm run dev:agency        # http://localhost:3001 (EN) and /ro (RO)
```

Production build: `npm run build:agency`, then `npm run start -w apps/agency`.
Checks: `npm run lint -w apps/agency` and `npm run typecheck -w apps/agency`.

## Editing

- All text: `content/en.ts` and `content/ro.ts` (`ro` is typed against `en`, so the
  compiler flags anything missing in Romanian).
- Contact: `content/contact.ts`. The only call to action is a free audit requested by
  Instagram DM (`https://ig.me/m/<handle>`). Change the handle or the audit length
  there and every button and text follows. The site has no form and collects no data.
- Hero panel: `components/sections/FlowMockup.tsx`, an example automation run
  (labelled as an example). Its height is fixed at 34rem and reserved by
  `.defer-render-flow` in `app/globals.css`; change both together.

## Deploy on Vercel

Create a second Vercel project from the same repository with **Root Directory**
`apps/agency` (framework: Next.js, default commands). Add `NEXT_PUBLIC_SITE_URL` with
the agency's domain.
