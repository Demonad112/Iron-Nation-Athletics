import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, FileText } from 'lucide-react'
import { MuscleMap } from '../art/MuscleMap'
import { MyoMedicWordmark } from '../components/brand/Logos'
import { ButtonAnchor, ButtonLink, CTABand, GlassCard, SectionHeading } from '../components/ui'
import { bundleCta, insurance, myomedicHero, services, whySportScience } from '../content/myomedic'
import { site } from '../content/site'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'
import { muscleLabels, type MuscleGroup } from '../art/muscles'

const allAreas = Array.from(new Set(services.flatMap((s) => s.areas)))

// Rendered inside <main data-brand="myomedic"> (see Layout), so tokens resolve to navy/coral.
export default function MyoMedic() {
  useDocumentMeta(
    'MyoMedic Massage Therapy',
    'Registered massage therapy in Calgary that combines sport science and manual therapy. Sports massage, deep tissue, injury rehab and more with Cody Innes, R.M.T., C.S.C.S.',
  )
  const reveal = useReveal()
  const [serviceId, setServiceId] = useState<string | null>(null)
  const selected = services.find((s) => s.id === serviceId) ?? null
  const highlight: MuscleGroup[] = selected ? selected.areas : allAreas

  return (
    <>
      <section className="container-ina grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <MyoMedicWordmark className="h-14 w-auto" />
            <p className="eyebrow">{myomedicHero.lockup}</p>
          </div>
          <p className="mt-6 font-label text-sm font-bold tracking-[0.25em] text-[var(--text)]">
            {myomedicHero.credentials}
          </p>
          <h1 className="font-heading mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
            {myomedicHero.title}
          </h1>
          <span className="rule mt-5" />
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            {myomedicHero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonAnchor href={site.rmtBookingUrl} arrow>
              Book RMT
            </ButtonAnchor>
            <ButtonLink to="/pricing?tab=rmt" variant="ghost">
              See pricing
            </ButtonLink>
          </div>
        </div>
        <div className="hidden justify-center gap-4 lg:flex">
          <MuscleMap view="front" highlight={allAreas} className="h-72 w-auto" />
          <MuscleMap view="back" highlight={allAreas} className="h-72 w-auto" />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-ina">
          <SectionHeading
            eyebrow="Services"
            title="Treatment built around your training"
            lead="Choose a service to see the areas it most often treats on the body map below."
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const on = s.id === serviceId
              return (
                <motion.li key={s.id} {...reveal(i)}>
                  <GlassCard
                    className={`flex h-full flex-col border-t-4 p-6 ${on ? 'border-t-[var(--accent)]' : 'border-t-[var(--line)]'}`}
                  >
                    <h3 className="text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                    <p className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                      <Clock size={16} className="text-[var(--accent)]" aria-hidden />
                      {s.durations.map((d) => (
                        <span key={d} className="border border-[var(--line)] px-2 py-0.5 text-xs">
                          {d} min
                        </span>
                      ))}
                    </p>
                    <button
                      type="button"
                      className="chip mt-auto self-start"
                      aria-pressed={on}
                      onClick={() => setServiceId(on ? null : s.id)}
                      style={{ marginTop: '1.25rem' }}
                    >
                      {on ? 'Showing on map' : 'Show treated areas'}
                    </button>
                  </GlassCard>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="glass cut-both border-x-0 py-24 md:py-28">
        <div className="container-ina grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Treatment areas"
              title={selected ? selected.title : 'Where we work'}
              lead={
                selected
                  ? 'Highlighted areas are where this service most often focuses. Every plan is tailored after assessment.'
                  : 'The highlighted areas are the ones most commonly treated across all services. Select a service above to narrow it down.'
              }
            />
            <ul aria-label="Treated areas" className="flex flex-wrap gap-2">
              {highlight.map((g) => (
                <li key={g} className="border border-[var(--accent)] px-3 py-1 text-sm">
                  {muscleLabels[g]}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center gap-3 sm:gap-6">
            <MuscleMap
              view="front"
              highlight={highlight}
              title="Front body map of treated areas"
              className="h-64 w-auto sm:h-80 md:h-[26rem]"
            />
            <MuscleMap
              view="back"
              highlight={highlight}
              title="Back body map of treated areas"
              className="h-64 w-auto sm:h-80 md:h-[26rem]"
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ina">
          <SectionHeading
            eyebrow="The difference"
            title={whySportScience.title}
            lead={whySportScience.lead}
          />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {whySportScience.points.map((p, i) => (
              <motion.li
                key={p.title}
                {...reveal(i)}
                className="border-t-4 border-[var(--accent)] bg-black/30 p-6"
              >
                <h3 className="text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-ina grid gap-6 lg:grid-cols-2">
          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <FileText className="text-[var(--accent)]" size={26} aria-hidden />
              <h2 className="text-2xl md:text-3xl">{insurance.title}</h2>
            </div>
            <p className="mt-4 leading-relaxed text-muted">{insurance.body}</p>
            <p className="mt-4 inline-block border border-dashed border-[var(--accent)] px-3 py-2 text-sm">
              {insurance.placeholder}
            </p>
          </GlassCard>
          <GlassCard className="flex flex-col justify-between gap-6 p-6 md:p-8">
            <div>
              <h2 className="text-2xl md:text-3xl">{bundleCta.text}</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Pair personal training with massage therapy in one monthly package.
              </p>
            </div>
            <div>
              <ButtonLink to={bundleCta.to} variant="ghost" arrow>
                See bundles
              </ButtonLink>
            </div>
          </GlassCard>
        </div>
      </section>

      <div className="pt-8">
        <CTABand
          title="Book your treatment"
          body="Reserve an RMT appointment online, or send an enquiry if you are unsure where to start."
          cta={{ label: 'Book RMT', to: site.rmtBookingUrl }}
        />
      </div>
    </>
  )
}
