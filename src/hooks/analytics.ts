import { analytics } from '../content/site'

/** Loads the optional analytics script, only when both fields in site.ts → analytics are set. */
export function loadAnalytics(): void {
  const { scriptSrc, siteId, idAttr } = analytics
  if (!scriptSrc || !siteId) return
  const s = document.createElement('script')
  s.defer = true
  s.src = scriptSrc
  s.setAttribute(idAttr, siteId)
  document.head.appendChild(s)
}
