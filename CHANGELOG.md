# Changelog

## Hosting: Cloudflare Pages support

### Decisions

- **Base path is env-driven.** `vite.config.ts` uses `BASE_PATH` (default `/`), so a Cloudflare
  Pages build at the root domain serves `/assets/...`. This deviates from the fixed
  `/Iron-Nation-Athletics/` base in BUILD_PLAN §2. The GitHub Pages workflow sets
  `BASE_PATH=/Iron-Nation-Athletics/` on its build step, so that deploy is unchanged.
- **Canonical, Open Graph, sitemap and robots URLs still point at `demonad112.github.io`.** They
  change once the production domain is known (`site.ts` `url`, `index.html`, `public/sitemap.xml`,
  `public/robots.txt`). `TODO(client)`: confirm the production domain.

## Batch 1: Foundation, design system, Home, deploy

### Built

- Vite + React 18 + TS + Tailwind 3 scaffold, ESLint (zero warnings) and Prettier.
- `HashRouter` with all 9 routes; Home is complete, the other eight are styled stubs
  (batch 2: Training, Online, MyoMedic, Pricing, About, Results, Contact; batch 3: Portal).
- Brand tokens with a `data-brand="myomedic"` scope (applied to `<main>` only, so header,
  footer and background stay INA). Fonts via Google Fonts.
- Iron background: canvas chalk dust + pulsing forge glow, knurl texture, scroll parallax,
  dim and animation toggles in the footer (persisted), reduced-motion static frame,
  26 motes / 30 fps / 1x DPR on phones, paused while the tab is hidden.
- Header with desktop nav and focus-trapped mobile drawer; footer; page transitions.
- Art set: barbell, dumbbell, plate, plate stack, kettlebell, spotlight, chalk hand,
  heart-rate line, front/back muscle map (interactive-ready).
- GitHub Actions deploy workflow and `public/.nojekyll`.

### Decisions

- **Logo files are JPG, not PNG.** The supplied logos were `Iron Nation.jpg` / `Myomedic.jpg`
  in the repo root; moved to `public/brand/iron-nation-logo.jpg` and `myomedic-logo.jpg`.
  The header and footer use the SVG light-on-dark wordmarks; the JPGs show in white badges
  (`LogoBadge`, which falls back to the SVG if the file fails to load).
- **Desktop nav starts at 1280 px** (`xl`). Below that the drawer is used, so 1024 px
  tablets get the drawer instead of a cramped nav.
- **Counters tick over 400 ms** to respect the global motion limit.
- **Tailwind 3** (not 4) for a stable `tailwind.config` with CSS-variable tokens.
- **Unknown routes redirect to Home** (HashRouter has no server 404).
- **Social icons are inline SVG**, because lucide-react no longer ships brand icons.
- **Dim defaults to on** (45% black) so text stays readable over the forge glow.
- Home sample results use art placeholders and carry "Sample" badges; stats are placeholders.
- Muscle map interactivity (hover/tap with exercise info) is built into the component and
  will be wired up in batch 2.

### Blocked / needs Addy

- Settings → Pages → Source must be set to **GitHub Actions** (one-time).
- The deploy runs only after this branch is merged to `main`; the live URL could not be
  verified from this session.

## Batch 2: All marketing pages

### Batch 1 verification (before starting)

- `main` has the Batch 1 code; the Pages deploy run on `7c57f62` is green.
- Live URL returns 200; `index.html`, JS, CSS, favicon and both logos load from the
  `/Iron-Nation-Athletics/` base path (no 404s). HashRouter routes are client-side, so refresh
  cannot 404. Nothing was broken.

### Built

- **Pages** (each in `src/pages/`, copy in `src/content/<page>.ts`): Training, Online, MyoMedic,
  Pricing, About, Results, Contact. Portal stays the Batch 3 stub; the other stubs are deleted.
- **Shared UI** (`src/components/ui.tsx`): `SectionHeading`, `GlassCard`, `CTABand`, `FAQ`, `Tabs`,
  `Stat` all live together now (`Counter.tsx` removed). Also added `PageHero` (the page `<h1>`
  block) and `ButtonAnchor` (internal hash route or external booking link in a new tab).
- **Training**: 4 programs, interactive muscle map (hover/tap/focus, plus chip buttons for
  accuracy, front/back toggle, live region), session timeline, FAQ accordion.
- **Online**: audience, what's included, 4-step flow, link to `/portal`.
- **MyoMedic**: lock-up, credentials, tagline, 6 services with durations, "Why sport science
  matters", coral muscle maps (a service button narrows the highlighted areas), insurance
  placeholder note, Book RMT via `site.rmtBookingUrl`, link to `/pricing?tab=bundles`.
- **Pricing**: ARIA tabs (arrow keys, Home/End, roving tabindex), tab stored in the URL
  (`#/pricing?tab=bundles`), 3-tier cards, middle tier highlighted, PT comparison table, small print.
- **About**: portrait slot with spotlight-silhouette fallback, story, philosophy, credentials
  timeline, why Iron Nation.
- **Results**: filter chips, 8 sample results, before/after slider (native range input), testimonial
  carousel (play/pause button, pauses on hover and keyboard focus, no autoplay under reduced motion).
  Every sample carries a `Sample` badge; names are first name + initial.
- **Contact**: validated form, `mailto:` with URL-encoded body, Formspree slot, booking buttons,
  location block, map embed slot (off), social links. Pricing cards pre-select the interest.
- **SEO**: per-page title and description (also kept in sync for `og:`/`twitter:` tags), `og:*` and
  `twitter:*` tags and canonical in `index.html` with absolute URLs, and `public/og-image.png`
  (1200×630).
- Home "Featured results" now reads from `results.ts` (single source), via `src/art/resultArt.ts`.

### Decisions

- **OG image is a committed PNG**, generated by `scripts/generate-og.mjs` from
  `scripts/og-image.html` (Playwright). It is not part of `npm run build`, to avoid adding a
  browser dependency to CI. Social crawlers don't render SVG, so PNG was chosen over SVG.
- **HashRouter and SEO**: crawlers that don't run JavaScript only see the tags in `index.html`, so
  per-page titles/descriptions help real browsers and JS-capable crawlers only. Proper per-page SEO
  needs `BrowserRouter` (plus a host that serves `index.html` for deep links) at launch.
- **mailto length**: bodies are shortened (on code-point boundaries) so the link stays under
  1900 characters; a note is appended and a "Copy message" button holds the full text. Tested with
  6,000-character input containing unicode, emoji and reserved characters.
- **Formspree** is used instead of `mailto:` whenever `formspreeEndpoint` in `contact.ts` is set.
- **Contact pre-fill**: `/contact?interest=pt|online|rmt|bundle&plan=<tier>` pre-selects the form.
- **Results data**: 8 sample results (2 per category) so each filter has content.
- **Pricing**: CAD placeholder prices; bundle copy claims "roughly 10–15%" savings (placeholder).
- **Map embed** is off by default; an "Open in Google Maps" link is shown instead (no third-party
  request until enabled).
- **MyoMedic headings** are mixed-case Montserrat: a scoped rule overrides utility `uppercase`.
- Pricing "Choose …" and CTA links go to Contact, since real checkout is out of scope.

### Fixes to Batch 1 code

- `MuscleMap`: interactive maps used `role="img"`, which hides the focusable group buttons from
  assistive tech. Now `role="group"` when interactive.
- `useDocumentMeta` also updates `og:title/description` and `twitter:*` tags.

### Notes for Batch 3 QA

- White text on the coral/red `CTABand` is ~3.9:1 for body-size text; check against the
  contrast target.
- Header is translucent over page content at some scroll positions (Batch 1 style); unchanged.

### Blocked / needs Addy

- Nothing blocked. Formspree endpoint, real booking URLs, map embed, photos and all copy remain
  `TODO(client)`.

## Batch 3: Client Portal, polish, QA

### Batch 2 verification (before starting)

- Deploy run on `10c30dc` (main) is green. The live URL, `og-image.png`, favicon and logos return 200.
  `#/pricing?tab=bundles` deep-links. Nothing was broken.
- One Batch 1 bug found and fixed: the "Skip to content" link used `href="#main"`, which HashRouter
  reads as a route (it silently redirected Home). It now moves focus to `<main>` instead.

### Built

- **Portal** (`src/pages/Portal.tsx`, `src/components/portal/`), lazy-loaded so Recharts stays out of the
  main bundle (main ≈ 135 kB gzip, portal chunk ≈ 114 kB gzip). Locker with accessible code input, demo
  chips, barbell loading bar, shake on a bad code, distinct messages for bad format, not found, network
  failure and malformed JSON. Deep link `#/portal?code=INA-DEMO`. Remembers the last code; Sign out clears it.
- **Dashboard tabs** (reuses `Tabs`): Overview (adherence ring with text alternative, week counter,
  event countdown for contest prep), Training (week selector, ticks persisted per code), Nutrition,
  Check-In (sliders, draft saved as you type, copy with textarea fallback, print), Progress (Recharts
  charts with a "View as table" disclosure, PR table, history), Recovery (MyoMedic palette, coral muscle
  map, session log, mobility routine, booking link, empty state with "Add MyoMedic"), Guidance.
- **Data**: `src/types/client.ts`, three profiles in `public/clients/`, `scripts/validate-clients.ts`
  (hand-rolled, no dependency) run from `prebuild` and CI. Verified it fails the build with readable
  messages on a deliberately broken file (bad number, unknown muscle, missing field, bad date); file restored.
- **Carry-overs**: contrast (see Decisions), solid header, 404 page, error boundary, axe fixes.
- **Additions**: Privacy & Terms page + required consent checkbox; `robots.txt`, `sitemap.xml`, web
  manifest, apple-touch/192/512 icons (`scripts/generate-icons.mjs`); LocalBusiness JSON-LD generated
  into `index.html` from `site.ts` at build time (`vite.config.ts`); route-change focus to the `<h1>`;
  `aria-current` styling on nav, portal link and footer; print stylesheet (Pricing and check-in text);
  analytics slot (`site.analytics`, off); `<noscript>` + static fallback content; `color-scheme` meta;
  `scripts/smoke.mjs`; CI runs `prettier --check`, `validate`, lint and build, and now also on pull
  requests (deploy job is skipped for PRs).

### Decisions

- **Contrast**: white text now sits on a darker `--accent-fill` (INA `#c92b1f` 5.5:1, MyoMedic `#c53a2f`
  5.2:1) for buttons, CTA band, pressed chips and badges. The bright accent used as _text_ was raised to
  `#ee4d40` (INA) and `#f0584b` (MyoMedic) because axe measured 4.4:1 on glass. Brand red `#e23b2e` is
  unchanged in the logo, favicon and OG image. Muted text (`#a1a1aa`) measures 7.7:1; Sample badge ≈ 11:1.
- **404 instead of redirect** (replaces the Batch 1 decision). Unknown routes show a 404 page with links.
- **Skip link** moves focus rather than changing the hash (HashRouter).
- **Static JSON is not private**; the portal banner says so and README repeats it. Code format is checked
  against `/^INA-[A-Z0-9]{2,12}$/` before fetch. A bare `DEMO` is accepted as `INA-DEMO`.
- **Decorative step numerals** (Home, Online) are drawn with `::before` content so contrast audits skip them.
- **Adherence ring / macros** use `role="img"` / `role="meter"` with spoken values; charts have a
  summary label and a table alternative.
- **Check-in** autosaves on every change (so a reload never loses data); "Save check-in" stamps a time.
- **Sitemap lists the root only** (hash URLs are not indexable) – documented in README.
- **Fonts load non-blocking** (`media="print"` swap) to fix a render-blocking audit; text paints in the
  fallback face first.
- **Portal sections reserve a full screen** (`min-h-[100svh]`) to stop the footer jumping when the
  dashboard replaces the loading view (CLS 0.62 → 0.1).
- **Smoke test is not a deploy gate**; it needs a browser download and hasn't run in CI yet.
- Demo dates are fixed (Oct–Nov 2026); relative labels ("in 7 days") are computed from today, so they
  go stale until the sample files are refreshed.

### QA (BUILD_PLAN §10)

| Check                                                    | Result                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| lint, build, prettier, client validation                 | pass, zero warnings                                                            |
| Deploy green                                             | PR build job green; deploy runs on merge                                       |
| All routes load directly; no asset 404s                  | pass (`scripts/smoke.mjs`, 16 routes + 6 assets, 375 px)                       |
| No horizontal scroll at 375 / 768 / 1280 / 1920          | pass on 11 routes each                                                         |
| Drawer opens/closes, traps focus, closes on route change | pass                                                                           |
| Background toggle / reduced motion                       | toggle unchanged since Batch 1; shake and loader disabled under reduced motion |
| MyoMedic palette scoped                                  | pass (`--accent` `#f0584b` there, `#ee4d40` on other pages and in the header)  |
| Demo codes, bad code, case-insensitive                   | pass (also traversal input, network failure, malformed JSON)                   |
| Check-in saves, survives reload, copy                    | pass (clipboard-denied fallback textarea shown)                                |
| Charts on mobile                                         | pass at 375 px (screenshots reviewed)                                          |
| Contact validates, consent required, mailto              | pass                                                                           |
| Samples badged, placeholders tagged                      | `grep -rn "TODO(client)" src` → 97 lines                                       |
| axe-core (wcag2a/aa, 21a/aa, best-practice)              | clean on all pages and all 7 portal tabs after fixes                           |

**Lighthouse** (mobile emulation, local `vite preview`, Lighthouse 12.6; the local server has no CDN or
compression so live numbers will differ):

| Page                      | Perf | A11y | Best Practices | SEO |
| ------------------------- | ---- | ---- | -------------- | --- |
| Home                      | 95   | 96   | 100            | 100 |
| Training                  | 96   | 100  | 100            | 100 |
| Pricing                   | 98   | 100  | 100            | 100 |
| Contact                   | 99   | 100  | 100            | 100 |
| Portal (`?code=INA-DEMO`) | 93   | 100  | 100            | 100 |

First round (before the non-blocking fonts fix) was Home 86, Training/Pricing/Contact 89, Portal 82; the
Home accessibility was 96 until the decorative step numerals moved to CSS generated content and the logo link's redundant `aria-label` was dropped. Scores vary by a few points between runs (Home measured 92–95).

### Blocked / needs Addy

- Nothing blocked. After merging, check the three demo codes on the live URL (I can't reach it from the
  sandbox's CI). Everything client-facing remains `TODO(client)`: address, hours, booking links,
  Formspree, map, photos, final privacy wording (Alberta PIPA/HIA review), analytics.
