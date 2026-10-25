import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { Footer } from './Footer'
import { Header } from './Header'
import { IronBackground } from './IronBackground'
import { ScrollToTop } from './ScrollToTop'

// MyoMedic swaps accent tokens for the page body only. Header, footer and background stay INA,
// so the visitor never feels they left the site.
const brandFor = (pathname: string) => (pathname.startsWith('/myomedic') ? 'myomedic' : 'ina')

export function Layout() {
  const { pathname } = useLocation()
  const reduced = usePrefersReducedMotion()
  const brand = brandFor(pathname)
  // Captured per render so the exiting page keeps its own content during the fade-out.
  const outlet = useOutlet()

  return (
    <>
      <IronBackground />
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-[#e23b2e] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            id="main"
            data-brand={brand === 'myomedic' ? 'myomedic' : undefined}
            className="flex-1"
            style={{ color: 'var(--text)' }}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {outlet}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}
