# Changelog

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
