import { motion } from 'framer-motion'
import {
  CalendarCheck,
  ClipboardList,
  MapPin,
  MessageCircle,
  Plane,
  Target,
  Utensils,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { ButtonLink, CTABand, GlassCard, PageHero, SectionHeading } from '../components/ui'
import {
  audience,
  included,
  onlineHero,
  onlineSteps,
  portalCta,
  type IncludedIcon,
  type OnlineIcon,
} from '../content/online'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'

const audienceIcons: Record<OnlineIcon, LucideIcon> = { map: MapPin, plane: Plane, target: Target }
const includedIcons: Record<IncludedIcon, LucideIcon> = {
  program: ClipboardList,
  meal: Utensils,
  checkin: CalendarCheck,
  video: Video,
  message: MessageCircle,
}

export default function Online() {
  useDocumentMeta(
    'Online Coaching',
    'Remote hypertrophy coaching from Calgary: monthly programs, macro-based meal plans, weekly check-ins and form-video review, wherever you train.',
  )
  const reveal = useReveal()

  return (
    <>
      <PageHero eyebrow={onlineHero.eyebrow} title={onlineHero.title} lead={onlineHero.lead}>
        <ButtonLink to="/contact?interest=online" arrow>
          Apply for coaching
        </ButtonLink>
        <ButtonLink to="/pricing?tab=online" variant="ghost">
          See pricing
        </ButtonLink>
      </PageHero>

      <section className="py-14 md:py-20">
        <div className="container-ina">
          <SectionHeading eyebrow="Who it's for" title="Coaching without the commute" />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {audience.map((a, i) => {
              const Icon = audienceIcons[a.icon]
              return (
                <motion.li key={a.title} {...reveal(i)}>
                  <GlassCard className="glass-hover h-full p-6 md:p-8">
                    <Icon className="text-[var(--accent)]" size={30} aria-hidden />
                    <h3 className="font-heading mt-3 text-3xl uppercase">{a.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
                  </GlassCard>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="glass cut-both border-x-0 py-24 md:py-28">
        <div className="container-ina">
          <SectionHeading
            eyebrow="What's included"
            title="Everything you need to progress"
            lead="One monthly price covers training, nutrition and accountability."
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => {
              const Icon = includedIcons[item.icon]
              return (
                <motion.li
                  key={item.title}
                  {...reveal(i)}
                  className="border-t-4 border-[var(--accent)] bg-black/30 p-6"
                >
                  <Icon className="text-[var(--accent)]" size={28} aria-hidden />
                  <h3 className="font-heading mt-3 text-2xl uppercase">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ina">
          <SectionHeading eyebrow="How it works" title="From first message to first block" />
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {onlineSteps.map((s, i) => (
              <motion.li
                key={s.step}
                {...reveal(i)}
                className="relative border-t-4 border-[var(--accent)] bg-black/30 p-6"
              >
                <span className="font-heading text-6xl text-[var(--text)] opacity-15">
                  {s.step}
                </span>
                <h3 className="font-heading mt-1 text-3xl uppercase">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </motion.li>
            ))}
          </ol>
          <div className="mt-10">
            <ButtonLink to={portalCta.to} variant="ghost" arrow>
              {portalCta.label}
            </ButtonLink>
          </div>
        </div>
      </section>

      <CTABand
        title="Train with Cody from anywhere"
        body="Apply today and get your first training block within days."
        cta={{ label: 'Apply for coaching', to: '/contact?interest=online' }}
      />
    </>
  )
}
