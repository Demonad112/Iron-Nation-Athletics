import { Clock, ExternalLink, MapPin, Mail, Phone } from 'lucide-react'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '../art/social'
import { ContactForm } from '../components/ContactForm'
import { ButtonAnchor, GlassCard, PageHero } from '../components/ui'
import { consultNote, contactHero, mapEmbed } from '../content/contact'
import { site, socials } from '../content/site'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const socialIcon = { instagram: InstagramIcon, youtube: YouTubeIcon, facebook: FacebookIcon }
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`

export default function Contact() {
  useDocumentMeta(
    'Contact & Booking',
    'Book personal training or massage therapy in Calgary, or send Cody an enquiry. Placeholder contact details shown for preview.',
  )

  return (
    <>
      <PageHero eyebrow={contactHero.eyebrow} title={contactHero.title} lead={contactHero.lead} />

      <section className="pb-20 md:pb-28">
        <div className="container-ina grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h2 className="font-heading text-3xl uppercase">Book directly</h2>
              <p className="mt-2 text-sm text-muted">{consultNote}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonAnchor href={site.bookingUrl}>Book PT</ButtonAnchor>
                <ButtonAnchor href={site.rmtBookingUrl} variant="ghost">
                  Book RMT
                </ButtonAnchor>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="font-heading text-3xl uppercase">Find us</h2>
              <address className="mt-4 space-y-3 text-sm not-italic">
                <p className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
                  <span>{site.address}</span>
                </p>
                <p className="flex gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
                  <span>{site.hours}</span>
                </p>
                <p className="flex gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
                  <a
                    className="underline-offset-4 hover:underline"
                    href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}
                  >
                    {site.phone}
                  </a>
                </p>
                <p className="flex gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
                  <a
                    className="break-all underline-offset-4 hover:underline"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </p>
              </address>

              {mapEmbed.enabled && mapEmbed.src ? (
                <iframe
                  title={mapEmbed.title}
                  src={mapEmbed.src}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="mt-5 aspect-[4/3] w-full border border-[var(--line)]"
                />
              ) : (
                <div className="knurl mt-5 flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-dashed border-[var(--line)] bg-black/30 p-4 text-center">
                  <MapPin size={28} className="text-[var(--accent)]" aria-hidden />
                  <p className="text-xs text-muted">Map embed is off in this preview.</p>
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    Open in Google Maps <ExternalLink size={14} aria-hidden />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              )}
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="font-heading text-3xl uppercase">Follow along</h2>
              <ul className="mt-4 flex gap-3">
                {socials.map((s) => {
                  const Icon = socialIcon[s.id]
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.label} (opens in a new tab)`}
                        className="flex h-11 w-11 items-center justify-center border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <Icon />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  )
}
