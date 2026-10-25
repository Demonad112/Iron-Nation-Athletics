# Iron Nation Athletics — Showcase Build Plan

> Repo: `Demonad112/Iron-Nation-Athletics` · Built with Claude Code (cloud) · Preview host: GitHub Pages
> Purpose: a **working showcase** for the client (Cody Innes) — complete, clickable, good-looking, with clearly marked placeholder content. Refinement and real content come later.

---

## 0. How to use this file

1. Commit this file to the repo root as `BUILD_PLAN.md`.
2. Upload the two logos to `public/brand/` (filenames in §3.3).
3. Start a Claude Code cloud session on the repo and paste the **Kickoff Prompt** (§1).
4. For each later batch, paste the matching one-line **Batch Prompt** (§8).
5. After each batch: merge the branch/PR to `main` → GitHub Actions deploys → check the live URL.

---

## 1. Kickoff Prompt (paste into Claude Code — Batch 1)

```
You are building a showcase website for a Calgary personal trainer. The full spec is in
BUILD_PLAN.md at the repo root — read it completely before writing any code. It is the
source of truth for stack, design system, pages, content, and batch scope.

Reference project: https://github.com/Demonad112/upgraded-disco-companion
Clone or browse it read-only and reuse its patterns: animated full-page background behind
semi-transparent glass blocks, background dim toggle, lighter background on phones, and
the Character Import flow (enter an identifier → fetch → render a rich dashboard). Do NOT
copy its PoE2 theme, fonts, or palette — this site has its own brand (BUILD_PLAN §3).

Execute BATCH 1 only (BUILD_PLAN §7). Rules:
- Work autonomously. Don't ask me questions; where the plan is silent, pick the most
  professional option and note it in CHANGELOG.md under "Decisions".
- All client-facing copy, prices, testimonials and contact details are placeholders:
  keep them in src/content/, and mark each with a `// TODO(client)` comment.
- Run `npm run build` and fix every error/warning before committing.
- Finish with a short summary: what was built, decisions taken, anything blocked.
```

---

## 2. Stack & hosting

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Vite + React 18 + TypeScript** | Static output, ports cleanly to Vercel/Cloudflare Pages later |
| Styling | **Tailwind CSS** + CSS variables for brand tokens | Tokens in `src/styles/tokens.css` |
| Routing | **React Router `HashRouter`** | Avoids GitHub Pages 404s on refresh/deep links. Switch to `BrowserRouter` at real launch |
| Animation | **Framer Motion** (UI) + **canvas** (background) | Respect `prefers-reduced-motion` everywhere |
| Charts | **Recharts** | Client portal progress charts |
| Icons | **lucide-react** | |
| Forms | Local state only; contact form → `mailto:` fallback + Formspree slot | No backend in showcase |
| Deploy | **GitHub Actions → GitHub Pages** (`actions/deploy-pages`) | Vite `base: '/Iron-Nation-Athletics/'` |

**Base-path rule:** every asset reference uses `import.meta.env.BASE_URL` or is imported — no hard-coded `/` paths. This is the #1 GitHub Pages failure point.

**One-time GitHub setting (Addy):** Repo → Settings → Pages → Source: **GitHub Actions**.

Live URL will be: `https://demonad112.github.io/Iron-Nation-Athletics/`

---

## 3. Brand & design system

### 3.1 Brand architecture
- **Iron Nation Athletics (INA)** = parent, authoritative brand. Owns the shell: header, nav, footer, home, default theme.
- **MyoMedic** = sub-brand inside INA ("an Iron Nation Athletics service"). Its page switches accent tokens via a `data-brand="myomedic"` scope, but keeps the INA header/footer so the visitor never feels they left the site.

### 3.2 Palette (sampled from logos — refine later)

| Token | INA | MyoMedic scope |
|---|---|---|
| `--bg` | `#0A0A0B` (near-black) | `#0B1220` (deep navy-black) |
| `--surface` | `rgba(20,20,22,0.62)` glass | `rgba(18,28,48,0.62)` glass |
| `--accent` | `#E23B2E` (dumbbell red) | `#E8473B` (coral red) |
| `--accent-2` | `#8A8F98` (steel) | `#1F2F4A` (logo navy) |
| `--text` | `#F4F4F5` | `#EEF2F7` |
| `--muted` | `#A1A1AA` | `#9AA7BA` |

Dark-only theme for the showcase. Contrast ≥ 4.5:1 for body text.

### 3.3 Logos
- `public/brand/iron-nation-logo.png` — INA logo (supplied by Addy)
- `public/brand/myomedic-logo.png` — MyoMedic logo (supplied by Addy)
- Logos are black-on-white; on the dark site use them inside a white rounded badge **or** rebuild a light-on-dark SVG wordmark in `src/components/brand/` that matches the supplied logos (condensed heavy "IRON" + red dumbbell "I", spaced "NATION ATHLETICS"; MyoMedic circle + medkit cross). If the PNGs are missing, use the SVG wordmarks and note it.

### 3.4 Typography
- Display: **Bebas Neue** (or Anton) — uppercase, tight, heavy; matches the "IRON" wordmark
- Sub-display / labels: **Lato** 700, letter-spaced 0.25em — matches "NATION ATHLETICS"
- Body: **Inter**
- MyoMedic scope headings: **Montserrat** 600 (matches its logo)
- Load via Google Fonts with `display=swap`.

### 3.5 Visual language — "Iron" aesthetic
Gym, hypertrophy, bodybuilding. Sharp, heavy, high-contrast. No bubbly shapes, no pastel.

- **Signature background (the variation on the companion's constellation sky):** full-page canvas with
  - slow-drifting **chalk-dust particles** (white, low opacity),
  - a faint **steel/knurling texture** layer (SVG pattern, diamond knurl),
  - a soft **red forge glow** that pulses very slowly behind the hero,
  - parallax on scroll (subtle).
  Dim layer behind glass blocks with an on/off toggle in the footer (same pattern as companion). Lighter particle count on phones. Static fallback under `prefers-reduced-motion`.
- **Code-made illustration set** (`src/art/`, SVG components, no external dependencies): barbell with plates, dumbbell, plate stack, kettlebell, muscle-group silhouettes (front/back body map with highlightable groups — reused in Training and MyoMedic pages), stage-lighting spotlight cones, chalk handprint, heart-rate line.
- **Stock photo slots:** `src/content/images.ts` holds named slots (`heroTraining`, `coachPortrait`, `rmtTreatment`, etc.). Each slot accepts a URL (Unsplash/Pexels free licence, credited in the footer) or `null`. **When `null`, the section must still look finished using the code-made art.** Ship the showcase with art-only fallbacks; Addy drops real photo URLs or Cody's own photos in later.
- **Section dividers:** angled cuts (clip-path) and thick red rule lines — echoing the MyoMedic logo's underline bar.
- **Motion:** counters that tick up (clients trained, kg lifted), staggered card reveals, red underline sweep on hover. Keep it fast — nothing longer than 400 ms.

---

## 4. Information architecture

Top nav (desktop) / slide-out drawer (mobile). Persistent **"Book a Session"** red CTA in header. **Client Portal** sits at the far right, styled as a secondary button with a lock icon.

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Brand impact, both offerings, proof, CTA |
| `/training` | Personal Training | In-person PT programs |
| `/online` | Online Coaching | Remote coaching for non-Calgary clients |
| `/myomedic` | MyoMedic RMT | Sub-brand page (MyoMedic theme scope) |
| `/pricing` | Pricing & Packages | PT, online, RMT, bundles |
| `/about` | About Cody | Bio, credentials, philosophy |
| `/results` | Results | Transformations + testimonials |
| `/contact` | Contact / Book | Form, booking link, location |
| `/portal` | Client Portal | Code-entry demo dashboard |

---

## 5. Page specs

All copy lives in `src/content/*.ts`. Write strong, specific, professional copy — not lorem ipsum — but mark it `TODO(client)`.

### 5.1 Home
1. **Hero** — "BUILT IN CALGARY. FORGED IN IRON." style headline, sub-line about hypertrophy-focused coaching + sport-science recovery, two CTAs: *Start Training* / *Book Massage Therapy*. Forge-glow background, barbell art.
2. **Stat strip** — animated counters (placeholder numbers).
3. **Two pillars** — side-by-side glass cards: Iron Nation Athletics (Train) and MyoMedic (Recover). MyoMedic card previews its coral/navy accent.
4. **The Method** — 3–4 step process: Assess → Program → Fuel → Recover.
5. **Featured results** — 3 transformation cards (art placeholders, labelled "Sample").
6. **Credential bar** — R.M.T. · C.S.C.S.
7. **Final CTA** band.

### 5.2 Personal Training
- Program cards: **Hypertrophy / Muscle Building**, **Strength Foundations**, **Physique & Contest Prep**, **Body Recomposition**.
- Interactive **muscle map**: hover/tap a muscle group → shows example exercises and how Cody programs it.
- "What a session looks like" timeline (warm-up → main lifts → accessories → mobility).
- FAQ accordion.

### 5.3 Online Coaching
- Who it's for (outside Calgary, travelling, self-trainers wanting structure).
- What's included: monthly program, macro-based meal plan, weekly check-ins, form-video review, messaging.
- "How it works" 4-step flow, ending in a link to the **Client Portal** demo ("See what clients get →").

### 5.4 MyoMedic (sub-brand, `data-brand="myomedic"`)
- Header lock-up: MyoMedic logo + "Massage Therapy · Cody Innes".
- Credentials line: **R.M.T. · C.S.C.S.**
- Hero tagline: **"Redefining Massage Therapy"** — sub-line: **"Combining sport science & massage therapy."**
- Services (placeholders): Sports Massage, Deep Tissue, Therapeutic / Injury Rehab, Pre/Post-Competition, Myofascial Release, Assisted Stretching & Mobility. Each card: duration options + short description.
- "Why sport science matters" section — how a C.S.C.S. background changes treatment (assessment, load management, return-to-training).
- Reuse the **muscle map** in coral to show treatment areas.
- Insurance receipts / direct-billing note — clearly placeholder.
- CTA: Book RMT (booking-link placeholder, e.g. Jane App slot).
- Cross-link: "Training with Iron Nation? Bundle and save →" Pricing.

### 5.5 Pricing & Packages
- Tabs: **In-Person PT** · **Online Coaching** · **MyoMedic RMT** · **Bundles**.
- 3-tier cards per tab, middle tier highlighted. CAD placeholder prices.
- Bundles = PT + RMT combos (e.g. "Train + Recover" monthly).
- Comparison table for PT tiers.
- Small print: "Pricing shown is a sample for preview."

### 5.6 About Cody
- Portrait slot (art fallback: spotlight silhouette).
- Story, coaching philosophy, credentials timeline, "Why Iron Nation".

### 5.7 Results
- Filterable grid (Hypertrophy / Fat Loss / Contest Prep / Rehab).
- Before/after **slider** component (art placeholders).
- Testimonials carousel. **Every sample testimonial and result must display a visible "Sample" badge** in the showcase, and use first-name-plus-initial placeholders. Real ones replace them before launch.

### 5.8 Contact / Book
- Form: name, email, phone, interest (PT / Online / RMT / Bundle), goals, preferred times. Client-side validation. Submits to `mailto:` (Formspree endpoint slot in `src/content/contact.ts`).
- Booking buttons (PT, RMT) → placeholder URLs.
- Location block: "Calgary, Alberta" + placeholder address and hours, Google Maps embed slot (off by default).
- Social links placeholders.

---

## 6. Client Portal (the showcase centrepiece)

Modelled on the companion's **Character Import**: user enters a code → app fetches the matching profile → renders a dashboard.

### 6.1 Flow
1. `/portal` shows a glass "locker" card: code input (format `INA-XXXX`, case-insensitive, trims spaces), **Access** button, and a hint row with demo codes as clickable chips.
2. On submit: fetch `${BASE_URL}clients/<code>.json`. Loading state (barbell loading-bar animation). Invalid code → shake animation + "Code not found".
3. Remember last code in `localStorage` (try/catch). "Sign out" clears it.
4. Banner across the top of the dashboard: **"Demo portal — sample data. Real client access will use secure accounts."**

### 6.2 Demo codes (ship all three)

| Code | Persona | Shows off |
|---|---|---|
| `INA-DEMO` | Hypertrophy, 12-week lean bulk, in-person | Full PPL split, surplus meal plan, strength PRs |
| `INA-PREP` | Physique contest prep, 16 weeks out, online | Peak-week countdown, carb cycling, posing practice |
| `INA-REHAB` | Train + Recover bundle, returning from shoulder strain | RMT session notes, modified program, mobility homework |

### 6.3 Dashboard tabs
| Tab | Contents |
|---|---|
| **Overview** | Month focus, phase + week counter, coach's note, next check-in date, next RMT appointment, adherence ring |
| **Training** | Week selector; day cards with exercises (sets × reps, RPE/RIR, rest, tempo, notes); "mark complete" toggles (localStorage); exercise swap notes |
| **Nutrition** | Daily macro targets (kcal/P/C/F) as bars; sample day meal plan with meals + macros; training-day vs rest-day toggle; grocery list; supplement notes |
| **Check-In** | Weekly form: bodyweight, waist, sleep, energy, stress, hunger (1–10 sliders), adherence %, notes, photo-upload placeholder. Saves to localStorage; "Copy check-in" button produces formatted text to send to Cody |
| **Progress** | Recharts line charts (bodyweight, waist), strength PR table, check-in history |
| **Recovery** (MyoMedic) | RMT session log, treated areas on the muscle map, home mobility/stretch routine, next booking |
| **Guidance** | Monthly guidance doc: habits, focus cues, education snippets, "this month's rules" |

### 6.4 Data model
- `src/types/client.ts` — TypeScript interfaces for the whole profile.
- `public/clients/*.json` — one file per demo code, validated against the types at build (a small script or zod schema in `scripts/validate-clients.ts`, run in `prebuild`).
- Note in README: real version needs auth + a database (e.g. Supabase) — static JSON is **not** private.

---

## 7. Batches (3 total)

Each batch ends with: `npm run build` clean → commit → push → PR/merge to `main` → Actions deploy succeeds → live URL checked.

### Batch 1 — Foundation, design system, Home, live deploy
1. Scaffold Vite + React + TS; Tailwind; ESLint/Prettier; folder structure (`src/{components,pages,content,art,styles,types,hooks}`).
2. `vite.config.ts` with `base: '/Iron-Nation-Athletics/'`; `HashRouter`; route stubs for all 9 pages.
3. GitHub Actions workflow `.github/workflows/deploy.yml` (build → upload-pages-artifact → deploy-pages); `public/.nojekyll`.
4. Brand tokens (§3.2), fonts (§3.4), MyoMedic theme scope.
5. Logo components (PNG + SVG fallback).
6. Iron background canvas + dim toggle + reduced-motion fallback + mobile lightening.
7. Shell: header (desktop nav + mobile drawer), footer (links, socials, photo credits, background toggle), page transitions.
8. Code-made art set (§3.5) — at least barbell, dumbbell, plate, kettlebell, muscle map.
9. Full **Home** page (§5.1).
10. `CLAUDE.md` (§9), `README.md` (setup, deploy, how to edit content), `CHANGELOG.md`.

**Done when:** live URL loads, Home looks finished on desktop + phone, all nav links route without 404 on refresh.

### Batch 2 — All marketing pages
1. Training (§5.2) incl. interactive muscle map.
2. Online Coaching (§5.3).
3. MyoMedic (§5.4) in its theme scope.
4. Pricing (§5.5) with tabs + comparison table.
5. About (§5.6), Results (§5.7) with before/after slider + Sample badges, Contact (§5.8).
6. Shared components extracted: `SectionHeading`, `GlassCard`, `CTABand`, `FAQ`, `Tabs`, `Stat`.
7. Per-page `<title>` + meta description; Open Graph image (code-generated PNG via a build script or static SVG).

**Done when:** every page is fully populated, consistent, responsive, and cross-linked.

### Batch 3 — Client Portal, polish, QA
1. Types, three demo JSON profiles, validation script in `prebuild`.
2. Portal entry flow (§6.1) + all seven dashboard tabs (§6.3).
3. Polish pass: spacing rhythm, hover states, focus rings, keyboard nav, alt text, image `loading="lazy"`.
4. LocalBusiness JSON-LD (placeholder address, Calgary AB).
5. QA checklist (§10); fix everything found.
6. Update README with a "Showcase walkthrough" section (what to click, demo codes) for presenting to Cody.

**Done when:** all §10 checks pass and the demo codes work on the live URL.

---

## 8. Batch Prompts (paste one per new session)

```
Read BUILD_PLAN.md and CHANGELOG.md. Execute BATCH 2 only (§7). Same rules as the
kickoff: autonomous, placeholders in src/content with TODO(client), clean build, log
decisions in CHANGELOG.md, end with a short summary.
```

```
Read BUILD_PLAN.md and CHANGELOG.md. Execute BATCH 3 only (§7), then run the full QA
checklist in §10 and fix every failure. Same rules as before. End with a summary and
the demo codes.
```

---

## 9. `CLAUDE.md` contents (create in Batch 1)

```
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
```

---

## 10. QA checklist

- [ ] `npm run build` clean; Actions deploy green
- [ ] Every route loads directly and after refresh on the live URL
- [ ] No broken assets on live (check DevTools Network for 404s)
- [ ] Layout correct at 375, 768, 1280, 1920 px; no horizontal scroll at 375
- [ ] Mobile drawer opens/closes, traps focus, closes on route change
- [ ] Background toggle works and persists; reduced-motion shows static background
- [ ] MyoMedic page uses its palette; returning to other pages restores INA palette
- [ ] All three demo codes load; bad code shows error; code is case-insensitive
- [ ] Check-in saves, survives reload, "Copy" produces readable text
- [ ] Charts render on mobile
- [ ] Contact form validates; mailto opens with populated body
- [ ] All samples badged; all placeholders tagged `TODO(client)` (`grep -r "TODO(client)" src` lists them)
- [ ] Lighthouse (mobile): Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95

---

## 11. Assumptions & later work

**Assumed for showcase**
- Cody's credentials: R.M.T., C.S.C.S. MyoMedic tagline: "Redefining Massage Therapy — Combining sport science & massage therapy."
- All services, prices, numbers, testimonials, address, hours, booking links are placeholders.
- No backend, no auth, no payments.

**Failure points to watch**
- Asset paths breaking under the `/Iron-Nation-Athletics/` base path.
- Canvas background tanking mobile performance — cap particles, pause when tab hidden.
- Third-party photo hotlinks disappearing — art fallbacks prevent blank sections.

**Post-showcase (refinement phase)**
- Real photos of Cody, gym, and treatment room; final copy and pricing from Cody.
- Move to permanent host (Vercel or Cloudflare Pages) + custom domain; switch to `BrowserRouter`.
- Real client portal: auth + database (Supabase), coach admin view to publish monthly plans, photo uploads, check-in notifications.
- Real booking integration (Jane App or similar) and form backend.
- Privacy policy (health data in Alberta — PIPA/HIA review before collecting real client info).
- Analytics.
