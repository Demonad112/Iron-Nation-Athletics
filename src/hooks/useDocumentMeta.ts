import { useEffect } from 'react'

const BASE_TITLE = 'Iron Nation Athletics'
const DEFAULT_TITLE = `${BASE_TITLE} | Personal Training & Coaching in Calgary`

function setMeta(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute('content', content)
}

// Keeps title, description and the Open Graph / Twitter text in step with the route. HashRouter
// means crawlers that don't run JavaScript only ever see the tags in index.html.
export function useDocumentMeta(title?: string, description?: string): void {
  useEffect(() => {
    const full = title ? `${title} | ${BASE_TITLE}` : DEFAULT_TITLE
    document.title = full
    setMeta('meta[property="og:title"]', full)
    setMeta('meta[name="twitter:title"]', full)
    if (description) {
      setMeta('meta[name="description"]', description)
      setMeta('meta[property="og:description"]', description)
      setMeta('meta[name="twitter:description"]', description)
    }
  }, [title, description])
}
