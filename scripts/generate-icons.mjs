// Renders public/apple-touch-icon.png (180), icon-192.png and icon-512.png from public/favicon.svg
// with Playwright. Not part of the build: run `node scripts/generate-icons.mjs` after changing the
// favicon, then commit the PNGs.
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const here = path.dirname(fileURLToPath(import.meta.url))
const pub = path.join(here, '..', 'public')
const svg = readFileSync(path.join(pub, 'favicon.svg'), 'utf8')

const browser = await chromium.launch()
for (const [file, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  // Full-bleed black tile (iOS rounds the corners itself) with the mark kept inside the safe area.
  await page.setContent(
    `<body style="margin:0;background:#0a0a0b;display:grid;place-items:center;width:${size}px;height:${size}px">
       <div style="width:${Math.round(size * 0.72)}px;height:${Math.round(size * 0.72)}px">${svg.replace('<svg ', '<svg width="100%" height="100%" ')}</div></body>`,
  )
  await page.screenshot({ path: path.join(pub, file) })
  await page.close()
}
await browser.close()
console.log('Wrote apple-touch-icon.png, icon-192.png, icon-512.png')
