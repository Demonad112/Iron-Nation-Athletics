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
