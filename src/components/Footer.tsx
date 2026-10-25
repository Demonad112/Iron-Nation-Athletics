import { Link, NavLink } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { footerLinks, site, socials } from '../content/site'
import { photoCredits } from '../content/images'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '../art/social'
import { IronWordmark } from './brand/Logos'
import { BackgroundToggle } from './BackgroundToggle'

const socialIcon = { instagram: InstagramIcon, youtube: YouTubeIcon, facebook: FacebookIcon }

export function Footer() {
  return (
    <footer className="glass mt-0 border-x-0 border-b-0">
      <div className="container-ina grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <IronWordmark className="h-14 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            Hypertrophy-focused coaching and sport-science recovery in {site.city}.
          </p>
          <ul className="mt-5 flex gap-3">
            {socials.map((s) => {
              const Icon = socialIcon[s.id]
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                  >
                    <Icon />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-4 !font-label">Explore</h2>
          <ul className="text-sm">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className="flex min-h-[2.75rem] items-center text-[var(--muted)] underline-offset-4 hover:text-[var(--text)] hover:underline aria-[current=page]:font-semibold aria-[current=page]:text-[var(--text)] aria-[current=page]:underline"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4 !font-label">Visit</h2>
          <ul className="space-y-3 text-sm text-[var(--muted)]">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
              {site.address}
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
              {site.phone}
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
              {site.email}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-4 !font-label">Display</h2>
          <BackgroundToggle />
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="container-ina flex flex-col gap-2 py-5 text-xs text-[var(--muted)] md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Showcase preview: copy, prices, results and
            contact details are samples.{' '}
            <Link to="/privacy" className="underline hover:text-[var(--text)]">
              Privacy &amp; Terms
            </Link>
          </p>
          <p>
            {photoCredits.length === 0 ? (
              'Imagery: original code-made illustrations.'
            ) : (
              <>
                Photos:{' '}
                {photoCredits.map((c, i) => (
                  <span key={c.url}>
                    {i > 0 && ', '}
                    <a href={c.url} className="underline" target="_blank" rel="noreferrer noopener">
                      {c.label}
                    </a>
                  </span>
                ))}
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
