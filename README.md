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
npm run format:check   # prettier --check . (also runs in CI)
npm run validate       # checks public/clients/*.json (also runs automatically before every build)
npm run smoke          # Playwright smoke test against a running preview (see "Smoke test")
```

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes `dist/` on every push to
`main`. One-time: repo **Settings → Pages → Source: GitHub Actions**.

The site uses `HashRouter` and `base: '/Iron-Nation-Athletics/'`. Reference assets with
`import.meta.env.BASE_URL`, never a bare `/path`. At real launch, set `base: '/'` in
`vite.config.ts` and switch to `BrowserRouter` in `src/App.tsx`.

## Editing content

| What                                                | Where                                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| Nav, contact details, socials, booking links        | `src/content/site.ts`                                                     |
| Home copy, stats, credentials                       | `src/content/home.ts`                                                     |
| Page copy                                           | `src/content/{training,online,myomedic,pricing,about,results,contact}.ts` |
| Sample results and testimonials (shared with Home)  | `src/content/results.ts`                                                  |
| Formspree endpoint, map embed on/off                | `src/content/contact.ts`                                                  |
| Photos (URL or `null` for art fallback) and credits | `src/content/images.ts`                                                   |
| Colours and fonts                                   | `src/styles/tokens.css`                                                   |
| Logos                                               | `public/brand/`                                                           |

List every placeholder: `grep -rn "TODO(client)" src`.

## Open Graph image

`public/og-image.png` is generated from `scripts/og-image.html`:
`node scripts/generate-og.mjs` (needs Playwright). Commit the PNG after changes.

## Notes

- The background has footer toggles (dim, animation); `prefers-reduced-motion` shows a static frame.
- The Client Portal uses static JSON, which is **not private**: anyone can fetch
  `/clients/<CODE>.json`. A real version needs auth and a database (e.g. Supabase).

## Showcase walkthrough

A 10-minute route for presenting to Cody. Live: https://demonad112.github.io/Iron-Nation-Athletics/

1. **Home** – hero, animated stat strip, the two pillars (INA red, MyoMedic coral/navy), the method,
   sample results. Try the footer **Display** toggles (background dim and animation).
2. **Training** – hover or tap the muscle map (front/back toggle, chips below it), then the FAQ.
3. **Online** → **MyoMedic** (note the palette switch; header and footer stay INA) → **Pricing**
   (tabs, deep link `#/pricing?tab=bundles`, PT comparison table; the page prints cleanly).
4. **Results** – filter chips, before/after slider (drag, or use arrow keys), testimonial carousel. All
   samples carry a yellow "Sample" badge.
5. **Contact** – submit empty to see validation, then a valid enquiry (opens an email draft; add a
   Formspree URL to post instead). The consent box is required.
6. **Client Portal** (`/portal`) – the centrepiece. Click a demo chip or type a code:

   | Code        | Persona                                     | Look for                                                                                        |
   | ----------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------- |
   | `INA-DEMO`  | Marcus T., 12-week lean bulk, in-person     | PPL-style split, surplus meal plan, strength PRs; Recovery shows the "Add MyoMedic" empty state |
   | `INA-PREP`  | Dana K., contest prep, 16 weeks out, online | Event countdown, carb-cycling days, posing practice                                             |
   | `INA-REHAB` | Priya S., Train + Recover, shoulder strain  | RMT session notes, treated areas on the coral muscle map, mobility homework                     |

   Things to try: tick sessions complete in **Training** and reload (they persist per code); move the
   sliders in **Check-In**, reload, then **Copy check-in**; open **Progress** and press "View as
   table"; **Recovery** uses the MyoMedic palette; **Sign out** forgets the code. A deep link such as
   `#/portal?code=INA-REHAB` opens a client directly. Codes are case-insensitive and spaces are ignored.

### What is placeholder

Everything. Names, prices, results, testimonials, address, hours, booking links, contact details and
all three client profiles are samples. `grep -rn "TODO(client)" src` lists every item in `src/`.
Client profiles live in `public/clients/` (first name + initial only).

### Swapping in real content

| Task                   | How                                                                                                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copy, prices, contacts | `src/content/*.ts` (see "Editing content"). Address and hours also feed the search-engine JSON-LD in `index.html` (`site.addressParts`, `site.openingHours`).                                                         |
| Photos                 | Put a URL (or a file under `public/`, referenced with `import.meta.env.BASE_URL`) in `src/content/images.ts`; add the credit to `photoCredits`. `null` keeps the code-made art.                                       |
| Contact form → inbox   | Create a form at formspree.io and paste the endpoint into `formspreeEndpoint` in `src/content/contact.ts`.                                                                                                            |
| Google Map             | In `src/content/contact.ts` set `mapEmbed.enabled = true` and paste the embed `src`. This loads Google, so mention it in the privacy page.                                                                            |
| Booking links          | `bookingUrl` and `rmtBookingUrl` in `src/content/site.ts`.                                                                                                                                                            |
| A new demo client      | Copy a file in `public/clients/`, rename it `INA-XXXX.json` (the `code` field must match), edit, run `npm run validate`, and add a chip in `DEMO_CODES` in `src/hooks/portal.ts`. The shape is `src/types/client.ts`. |

### Analytics

Off by default (nothing is loaded and no consent banner is needed). To enable, fill `analytics` in
`src/content/site.ts` with a script URL and site id. Use a cookieless provider (Plausible, Umami,
Fathom, self-hosted). Even cookieless tools process IP addresses and page URLs, so update the Privacy &
Terms page, and confirm Alberta PIPA obligations and whether a consent notice is needed. Anything that
sets cookies or builds cross-site profiles needs a consent banner first.

### SEO limits (HashRouter)

`robots.txt` and `sitemap.xml` list the site root only. Search engines ignore everything after `#`, so
individual pages can't be indexed or listed until the site moves to `BrowserRouter` and a host that
serves `index.html` for deep links (Vercel/Cloudflare Pages). The LocalBusiness JSON-LD is injected into
`index.html` at build time from `site.ts` (see `vite.config.ts`).

### Smoke test

`scripts/smoke.mjs` loads every route at 375 px and fails on console errors, 4xx/5xx responses from the
site, horizontal scroll, or a wrong number of `<h1>`s. It needs Playwright with Chromium.

```bash
npm run build
npm run preview -- --port 4173 &      # then:
npm run smoke
SMOKE_URL=https://demonad112.github.io/Iron-Nation-Athletics/ npm run smoke   # against the live site
```

It is not part of the deploy workflow: CI would need a browser download and the test hasn't been run
there yet. CI does run `npm run validate`, `prettier --check .`, lint and build.

### Icons

`node scripts/generate-icons.mjs` regenerates `apple-touch-icon.png` and the 192/512 px manifest icons
from `public/favicon.svg` (Playwright required; commit the PNGs).
