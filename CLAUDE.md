# Iron Nation Athletics — project rules

- Spec: BUILD_PLAN.md is the source of truth. Log deviations in CHANGELOG.md.
- Stack: Vite + React + TS + Tailwind, HashRouter, deployed to GitHub Pages under
  /Iron-Nation-Athletics/. Never hard-code root-relative asset paths; use BASE_URL.
- Content: all copy/prices/contacts in src/content/. Mark placeholders TODO(client).
- Brand: INA is parent (black/red, Bebas Neue/Lato/Inter). MyoMedic is a sub-brand
  scoped with data-brand="myomedic" (navy/coral, Montserrat). Don't mix palettes.
- Visual: sharp, heavy, gym/bodybuilding. No rounded-bubble UI, no pastels.
- Motion: always honour prefers-reduced-motion. Animations ≤400ms.
- Samples: any testimonial/result shown must carry a visible "Sample" badge.
- Before every commit: npm run build must pass with zero errors.

## Commands

- `npm run dev` / `npm run build` (tsc + vite) / `npm run lint` / `npm run preview`
- Preview URL path: http://localhost:4173/Iron-Nation-Athletics/ (HashRouter routes after `#`)

## Layout

- `src/content/` copy, `src/art/` SVG art + MuscleMap, `src/components/` shell + shared UI,
  `src/pages/` routes, `src/hooks/` stores and helpers, `src/styles/tokens.css` brand tokens.

## Working style

- Lead with the conclusion, then the detail. Use tables for comparisons and status.
- Act when the intent is clear; ask only when blocked or the choice is genuinely the owner's.
- Say explicitly when an earlier finding is revised.
- Don't sit watching PRs or CI: use a scheduled check-in or PR Auto-fix and come back later.
- Suggest a plugin, connector or tool only when the task needs one.
- The owner is proficient in Python; skip the basics.
- Cloud sessions (web, mobile, desktop cloud) install dependencies via `.claude/hooks/cloud-setup.sh`; it is a no-op locally.
