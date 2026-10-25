// Smoke test: loads every route against a running preview at 375px wide and fails on console
// errors, failed/4xx/5xx same-origin responses, horizontal scroll, or a missing/duplicate <h1>.
//
//   npm run build && npm run preview &        # serves http://localhost:4173/Iron-Nation-Athletics/
//   npm run smoke                              # or: SMOKE_URL=https://demonad112.github.io/Iron-Nation-Athletics/ npm run smoke
//
// Needs Playwright with Chromium (preinstalled in the cloud sandbox; locally `npm i -D playwright`
// then `npx playwright install chromium`). Third-party hosts (Google Fonts) are ignored.
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const base = (process.env.SMOKE_URL ?? 'http://localhost:4173/Iron-Nation-Athletics/').replace(
  /\/?$/,
  '/',
)
const origin = new URL(base).origin
const routes = [
  '/',
  '/training',
  '/online',
  '/myomedic',
  '/pricing',
  '/pricing?tab=bundles',
  '/about',
  '/results',
  '/contact',
  '/contact?interest=rmt&plan=Test',
  '/privacy',
  '/portal',
  '/portal?code=INA-DEMO',
  '/portal?code=INA-PREP',
  '/portal?code=INA-REHAB',
  '/does-not-exist',
]
const extraAssets = [
  'og-image.png',
  'favicon.svg',
  'manifest.webmanifest',
  'apple-touch-icon.png',
  'robots.txt',
  'sitemap.xml',
]

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 375, height: 812 } })
let failures = 0
const fail = (route, msg) => {
  failures++
  console.error(`  ✗ ${route}: ${msg}`)
}

for (const route of routes) {
  const page = await context.newPage()
  await page.addInitScript(() => localStorage.clear())
  const problems = []
  page.on('console', (m) => m.type() === 'error' && problems.push(`console error: ${m.text()}`))
  page.on('pageerror', (e) => problems.push(`page error: ${e.message}`))
  page.on('response', (r) => {
    if (r.url().startsWith(origin) && r.status() >= 400)
      problems.push(`HTTP ${r.status()} ${r.url()}`)
  })
  page.on('requestfailed', (r) => {
    if (r.url().startsWith(origin)) problems.push(`request failed ${r.url()}`)
  })
  try {
    await page.goto(`${base}#${route}`, { waitUntil: 'networkidle' })
    await page.waitForSelector('main h1', { timeout: 8000 })
    await page.waitForTimeout(500)
    const h1s = await page.locator('main h1').count()
    if (h1s !== 1) problems.push(`expected 1 <h1>, found ${h1s}`)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    if (overflow > 0)
      problems.push(`horizontal scroll: page is ${overflow}px wider than the viewport`)
  } catch (e) {
    problems.push(`load failed: ${e.message.split('\n')[0]}`)
  }
  if (problems.length) problems.forEach((p) => fail(route, p))
  else console.log(`  ✓ ${route}`)
  await page.close()
}

for (const a of extraAssets) {
  const res = await context.request.get(base + a)
  if (res.status() !== 200) fail(a, `HTTP ${res.status()}`)
  else console.log(`  ✓ ${a}`)
}

await browser.close()
if (failures) {
  console.error(`\nSmoke test failed: ${failures} problem(s).`)
  process.exit(1)
}
console.log('\nSmoke test passed.')
