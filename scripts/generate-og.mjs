// Renders public/og-image.png (1200×630) from scripts/og-image.html with Playwright.
// Not part of the build: run `node scripts/generate-og.mjs` after changing the artwork, then commit
// the PNG. Requires Playwright (`npm i -D playwright` or a global install) and network access
// for Google Fonts (falls back to Impact if unavailable).
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const here = path.dirname(fileURLToPath(import.meta.url))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page
  .goto(`file://${path.join(here, 'og-image.html')}`, { waitUntil: 'networkidle' })
  .catch(() => {})
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(here, '..', 'public', 'og-image.png') })
await browser.close()
console.log('Wrote public/og-image.png')
