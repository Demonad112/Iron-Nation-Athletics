import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { site, socials } from './src/content/site.ts'

// Build-time HTML injection. HashRouter means crawlers only ever see index.html, so the business
// data (LocalBusiness JSON-LD) and the no-JavaScript fallback are generated into it from site.ts.
function indexHtmlFromSite(): Plugin {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
  return {
    name: 'ina-index-html',
    transformIndexHtml(html) {
      const a = site.addressParts
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HealthAndBeautyBusiness',
        name: site.name,
        url: site.url,
        image: `${site.url}og-image.png`,
        telephone: `+1-${site.phone.replace(/\D/g, '').replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3')}`,
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: a.street,
          addressLocality: a.city,
          addressRegion: a.region,
          postalCode: a.postalCode,
          addressCountry: a.country,
        },
        openingHours: site.openingHours,
        sameAs: socials.map((s) => s.href),
        description:
          'Hypertrophy-focused personal training and online coaching in Calgary, Alberta, with MyoMedic sport-science massage therapy.',
      }
      // JSON.stringify guarantees valid JSON; "<" is escaped so the data can never close the tag.
      const ld = JSON.stringify(jsonLd, null, 2).replace(/</g, '\\u003c')
      const fallback = `<main style="max-width:40rem;margin:0 auto;padding:3rem 1.25rem;font-family:Inter,system-ui,sans-serif;line-height:1.6">
      <h1 style="font-size:2.5rem;margin:0 0 1rem">${esc(site.name)}</h1>
      <p>Hypertrophy-focused personal training and online coaching in ${esc(site.city)}, with MyoMedic sport-science massage therapy.</p>
      <noscript><p><strong>This site needs JavaScript</strong> to show its pages and the client portal. Please enable it, or contact us directly:</p></noscript>
      <p>Phone: <a style="color:#ff6b5e" href="tel:${esc(site.phone.replace(/[^\d+]/g, ''))}">${esc(site.phone)}</a><br />Email: <a style="color:#ff6b5e" href="mailto:${esc(site.email)}">${esc(site.email)}</a><br />${esc(site.address)}<br />${esc(site.hours)}</p>
    </main>`
      return html
        .replace(
          '<!--LOCAL_BUSINESS_JSONLD-->',
          `<script type="application/ld+json">\n${ld}\n    </script>`,
        )
        .replace('<!--STATIC_FALLBACK-->', fallback)
    },
  }
}

// GitHub Pages serves the site under /Iron-Nation-Athletics/.
// Switch to '/' when moving to a custom domain (see README).
export default defineConfig({
  base: '/Iron-Nation-Athletics/',
  plugins: [react(), indexHtmlFromSite()],
  build: { chunkSizeWarningLimit: 700 },
})
