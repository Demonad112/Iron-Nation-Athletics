import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On route change: scroll to top and move focus to the new page's main heading, so keyboard and
 * screen-reader users land at the start of the new content (HashRouter doesn't reload the page).
 * The first load is skipped so the browser's own focus handling is left alone.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    window.scrollTo(0, 0)
    if (first.current) {
      first.current = false
      return
    }
    // The new <main> mounts after the old one fades out and lazy routes load later, so poll briefly.
    let tries = 0
    const timer = window.setInterval(() => {
      const main = document.querySelector<HTMLElement>('main#main')
      const h1 = main?.dataset.path === pathname ? main.querySelector('h1') : null
      if (h1) {
        h1.setAttribute('tabindex', '-1')
        h1.focus({ preventScroll: true })
        window.clearInterval(timer)
      } else if (++tries > 40) window.clearInterval(timer)
    }, 50)
    return () => window.clearInterval(timer)
  }, [pathname])
  return null
}
