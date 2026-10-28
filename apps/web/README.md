# Closr: marketing site

The Next.js 16 landing page for Closr: English at `/`, Romanian at `/ro`.

## Run locally

From the **repository root** (this is an npm workspace):

```bash
npm install
npm run dev:web          # http://localhost:3000 (EN) and /ro (RO)
```

Production build:

```bash
npm run build:web
npm run start -w apps/web
```

Checks: `npm run lint -w apps/web` and `npm run typecheck -w apps/web`.

## Editing content

All text is in `content/en.ts` and `content/ro.ts`. Prices are marked `TBD` in
`pricing.tiers`.

## Environment variables

Copy `.env.example` to `.env.local`. All of them are optional for the landing
page itself:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL for canonical/hreflang links and the sitemap. On Vercel it falls back to the production domain. |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Waitlist storage (backend phase). Without them the form shows "The waitlist isn't connected yet". |

## Deploy on Vercel

1. Import the GitHub repo in Vercel.
2. **Root Directory**: `apps/web`. Framework preset: **Next.js** (auto-detected).
   Leave the build and install commands at their defaults. Vercel installs from
   the repo root because of the npm workspace, and honours the root `.npmrc`.
3. Add `NEXT_PUBLIC_SITE_URL` (for example `https://closr.ai`) under
   Settings → Environment Variables, plus the Supabase variables once the
   backend is ready.
4. Deploy. Every push to the production branch redeploys, and other branches get
   preview URLs.
