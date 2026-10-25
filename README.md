# Iron Nation Athletics: showcase site

Working showcase for Cody Innes (Calgary). Spec: [BUILD_PLAN.md](BUILD_PLAN.md). Progress and
decisions: [CHANGELOG.md](CHANGELOG.md). All copy, prices, testimonials and contact details are
**placeholders** marked `TODO(client)`.

Live (after merge to `main`): https://demonad112.github.io/Iron-Nation-Athletics/

## Setup

```bash
npm install
npm run dev       # http://localhost:5173/Iron-Nation-Athletics/
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ at http://localhost:4173/Iron-Nation-Athletics/
npm run lint
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes `dist/` on every push to
`main`. One-time: repo **Settings → Pages → Source: GitHub Actions**.

The site uses `HashRouter` and `base: '/Iron-Nation-Athletics/'`. Reference assets with
`import.meta.env.BASE_URL`, never a bare `/path`. At real launch, set `base: '/'` in
`vite.config.ts` and switch to `BrowserRouter` in `src/App.tsx`.

## Editing content

| What | Where |
|---|---|
| Nav, contact details, socials, booking links | `src/content/site.ts` |
| Home copy, stats, credentials | `src/content/home.ts` |
| Page copy | `src/content/{training,online,myomedic,pricing,about,results,contact}.ts` |
| Sample results and testimonials (shared with Home) | `src/content/results.ts` |
| Formspree endpoint, map embed on/off | `src/content/contact.ts` |
| Photos (URL or `null` for art fallback) and credits | `src/content/images.ts` |
| Colours and fonts | `src/styles/tokens.css` |
| Logos | `public/brand/` |

List every placeholder: `grep -rn "TODO(client)" src`.

## Open Graph image

`public/og-image.png` is generated from `scripts/og-image.html`:
`node scripts/generate-og.mjs` (needs Playwright). Commit the PNG after changes.

## Notes

- The background has footer toggles (dim, animation); `prefers-reduced-motion` shows a static frame.
- The Client Portal (batch 3) will use static JSON, which is **not private**. A real version needs
  auth and a database (e.g. Supabase).
