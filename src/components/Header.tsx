import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Menu, X } from 'lucide-react'
import { nav } from '../content/site'
import { IronWordmark } from './brand/Logos'

const FOCUSABLE = 'a[href], button:not([disabled])'

export function Header() {
  // The drawer is tied to the route it was opened on, so navigating closes it with no effect.
  const { pathname } = useLocation()
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === pathname
  const setOpen = useCallback((next: boolean) => setOpenAt(next ? pathname : null), [pathname])
  const drawerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Scroll lock, Escape to close, focus trap, focus return.
  useEffect(() => {
    if (!open) return
    const toggle = toggleRef.current
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const items = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
    items()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setOpen(false)
      if (e.key !== 'Tab') return
      const els = items()
      if (!els.length) return
      const first = els[0]
      const lastEl = els[els.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [open, setOpen])

  return (
    <header className="glass sticky top-0 z-40 border-x-0 border-t-0 !bg-[rgba(10,10,11,0.96)]">
      <div className="container-ina flex h-16 items-center gap-6 md:h-[4.5rem]">
        <Link to="/" aria-label="Iron Nation Athletics, home" className="shrink-0">
          <IronWordmark className="h-11 w-auto md:h-12" />
        </Link>

        <nav aria-label="Primary" className="ml-2 hidden flex-1 items-center gap-5 xl:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className="sweep inline-flex min-h-[2.75rem] items-center font-label text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--text)] aria-[current=page]:text-[var(--text)]"
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 xl:flex">
          <Link to="/contact" className="btn btn-primary !px-4">
            Book a Session
          </Link>
          <NavLink
            to="/portal"
            className="btn btn-ghost !px-4 aria-[current=page]:!border-[var(--accent)] aria-[current=page]:bg-white/10"
          >
            <Lock size={14} aria-hidden />
            Client Portal
          </NavLink>
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <Link to="/contact" className="btn btn-primary !min-h-11 !px-3 !text-[0.7rem] sm:!px-4">
            Book
            <span className="hidden sm:inline">&nbsp;a Session</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-ghost !min-h-11 !px-3 min-w-11"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 top-16 z-30 bg-black/60 xl:hidden md:top-[4.5rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              id="mobile-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed bottom-0 right-0 top-16 z-40 flex w-[min(20rem,86vw)] flex-col gap-1 overflow-y-auto border-l border-[var(--line)] bg-[#0f0f11] p-5 md:top-[4.5rem] xl:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {[{ label: 'Home', to: '/' }, ...nav].map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === '/'}
                  className="border-b border-[var(--line)] py-3 font-heading text-3xl uppercase tracking-wide text-[var(--muted)] aria-[current=page]:text-[var(--accent)]"
                >
                  {n.label}
                </NavLink>
              ))}
              <Link to="/portal" className="btn btn-ghost mt-6">
                <Lock size={14} aria-hidden />
                Client Portal
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
