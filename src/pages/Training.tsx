import { motion } from 'framer-motion'
import { Dumbbell as DumbbellIcon, Scale, ShieldCheck, Trophy } from 'lucide-react'
import { Barbell, Dumbbell } from '../art'
import { MuscleExplorer } from '../components/MuscleExplorer'
import { ButtonLink, CTABand, FAQ, GlassCard, PageHero, SectionHeading } from '../components/ui'
import {
  programs,
  sessionSteps,
  trainingFaq,
  trainingHero,
  type ProgramIcon,
} from '../content/training'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'

const icons: Record<ProgramIcon, typeof DumbbellIcon> = {
  hypertrophy: DumbbellIcon,
  strength: ShieldCheck,
  contest: Trophy,
  recomp: Scale,
}

export default function Training() {
  useDocumentMeta(
    'Personal Training in Calgary',
    'One-on-one hypertrophy, strength and physique coaching in Calgary. Explore our programs, see what a session looks like and book a free consult.',
  )
  const reveal = useReveal()

  return (
    <>
      <PageHero
        eyebrow={trainingHero.eyebrow}
        title={trainingHero.title}
        lead={trainingHero.lead}
        aside={
          <div className="glass knurl relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6">
            <Barbell className="w-full -rotate-6" />
            <Dumbbell className="absolute -bottom-2 right-2 w-32 rotate-12" />
          </div>
        }
      >
        <ButtonLink to="/contact" arrow>
          Book a free consult
        </ButtonLink>
        <ButtonLink to="/pricing?tab=pt" variant="ghost">
          See pricing
        </ButtonLink>
      </PageHero>

      <section className="py-14 md:py-20">
        <div className="container-ina">
          <SectionHeading eyebrow="Programs" title="Four ways to train" />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {programs.map((p, i) => {
              const Icon = icons[p.icon]
              return (
                <motion.li key={p.id} {...reveal(i)}>
                  <GlassCard className="glass-hover flex h-full flex-col border-t-4 border-t-[var(--accent)] p-6 md:p-8">
                    <Icon className="text-[var(--accent)]" size={30} aria-hidden />
                    <h3 className="font-heading mt-3 text-3xl uppercase md:text-4xl">{p.title}</h3>
                    <p className="mt-3 font-semibold">{p.tagline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      <span className="text-[var(--text)]">Best for:</span> {p.bestFor}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--accent)]" aria-hidden />
                          {pt}
                        </li>
                      ))}
                    </ul>
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
            eyebrow="Muscle map"
            title="See how we train each muscle"
            lead="Pick a muscle group to see example exercises and how Cody programs it across the week."
          />
          <MuscleExplorer />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ina">
          <SectionHeading
            eyebrow="Session flow"
            title="What a session looks like"
            lead="Sixty minutes, the same structure every time, so you always know where the work is going."
          />
          <ol className="relative grid gap-5 md:grid-cols-4">
            {sessionSteps.map((s, i) => (
              <motion.li
                key={s.title}
                {...reveal(i)}
                className="relative border-t-4 border-[var(--accent)] bg-black/30 p-6"
              >
                <p className="eyebrow">{s.time}</p>
                <h3 className="font-heading mt-2 text-3xl uppercase">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-ina max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
          <FAQ items={trainingFaq} />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-sm text-muted">Still unsure?</p>
            <ButtonLink to="/contact" variant="ghost">
              Ask Cody
            </ButtonLink>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to put in the work?"
        body="Book a free consult and we will build your first 12 weeks together."
        cta={{ label: 'Book a Session', to: '/contact' }}
      />
    </>
  )
}
