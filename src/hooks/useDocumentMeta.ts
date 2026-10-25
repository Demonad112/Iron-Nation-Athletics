import { useEffect } from 'react'

const BASE_TITLE = 'Iron Nation Athletics'

export function useDocumentMeta(title?: string, description?: string): void {
  useEffect(() => {
    document.title = title
      ? `${title} | ${BASE_TITLE}`
      : `${BASE_TITLE} | Personal Training & Coaching in Calgary`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}
