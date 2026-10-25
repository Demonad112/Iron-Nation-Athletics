import { Compass } from 'lucide-react'
import { ButtonLink, GlassCard } from '../components/ui'
import { nav } from '../content/site'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { Link, useLocation } from 'react-router-dom'

export default function NotFound() {
  useDocumentMeta('Page not found', 'This page does not exist on the Iron Nation Athletics site.')
  const { pathname } = useLocation()
  return (
    <section className="container-ina py-20 md:py-28">
      <p className="eyebrow mb-4 flex items-center gap-2">
        <Compass size={14} aria-hidden /> Error 404
      </p>
      <h1 className="font-heading text-balance text-5xl uppercase leading-[0.95] sm:text-6xl md:text-7xl">
        Page not found
      </h1>
      <span className="rule mt-5" />
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        There is nothing at <code className="break-all text-[var(--text)]">{pathname}</code>. It may
        have moved, or the link may be mistyped. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/" arrow>
          Back to home
        </ButtonLink>
        <ButtonLink to="/contact" variant="ghost">
          Contact
        </ButtonLink>
      </div>
      <GlassCard className="mt-10 max-w-xl p-6">
        <h2 className="eyebrow mb-4 !font-label">Main pages</h2>
        <ul className="grid grid-cols-2 gap-x-6 text-sm">
          {nav.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                className="flex min-h-[2.75rem] items-center text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
              >
                {n.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/portal"
              className="flex min-h-[2.75rem] items-center text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline"
            >
              Client Portal
            </Link>
          </li>
        </ul>
      </GlassCard>
    </section>
  )
}
