import { motion } from 'framer-motion'
import { ClipboardCheck, Dumbbell as DumbbellIcon, HeartPulse, Utensils } from 'lucide-react'
import {
  credentials,
  featuredResults,
  finalCta,
  hero,
  method,
  pillars,
  stats,
} from '../content/home'
import { images } from '../content/images'
import { Barbell, Dumbbell, HeartRateLine, Plate, Spotlight } from '../art'
import { resultArt } from '../art/resultArt'
import { MuscleMap } from '../art/MuscleMap'
import { LogoBadge } from '../components/brand/Logos'
import { ButtonLink, CTABand, GlassCard, SampleBadge, SectionHeading, Stat } from '../components/ui'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'

const methodIcons = [ClipboardCheck, DumbbellIcon, Utensils, HeartPulse]

export default function Home() {
  useDocumentMeta()
  const reveal = useReveal()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Spotlight className="pointer-events-none absolute -top-10 left-1/2 hidden h-[130%] w-[60rem] -translate-x-1/2 opacity-40 md:block" />
        <div className="container-ina relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:py-28">
          <div>
            <p className="eyebrow mb-5">{hero.eyebrow}</p>
            <h1 className="font-heading text-balance text-[3.4rem] uppercase leading-[0.92] sm:text-7xl lg:text-[6.5rem]">
              {hero.headline[0]}
              <br />
              <span className="text-[var(--accent)]">{hero.headline[1]}</span>
            </h1>
            <span className="rule mt-6" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              {hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={hero.primaryCta.to} arrow>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink to={hero.secondaryCta.to} variant="ghost">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            {images.heroTraining ? (
              <img
                src={images.heroTraining}
                alt="Training session at Iron Nation Athletics"
                loading="eager"
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div className="glass knurl relative flex aspect-[5/4] items-center justify-center overflow-hidden p-6 lg:aspect-[4/5]">
                <Barbell className="w-full max-w-md -rotate-6" />
                <Dumbbell className="absolute -bottom-2 right-2 w-32 rotate-12 opacity-90 md:w-44" />
                <Plate className="absolute -left-8 top-4 w-28 opacity-60 md:w-36" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section aria-label="By the numbers" className="glass border-x-0">
        <div className="container-ina grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Two pillars */}
      <section className="py-20 md:py-28">
        <div className="container-ina">
          <SectionHeading eyebrow="Two ways in" title="Train hard. Recover smarter." />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div {...reveal(0)}>
              <GlassCard className="glass-hover flex h-full flex-col p-7 md:p-9">
                <p className="eyebrow">{pillars.ina.eyebrow}</p>
                <h3 className="font-heading mt-2 text-4xl uppercase md:text-5xl">
                  {pillars.ina.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--muted)]">{pillars.ina.body}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {pillars.ina.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--accent)]" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <ButtonLink to={pillars.ina.cta.to} arrow>
                    {pillars.ina.cta.label}
                  </ButtonLink>
                  <Dumbbell className="w-28 opacity-90 md:w-36" />
                </div>
              </GlassCard>
            </motion.div>

            {/* MyoMedic scope: previews the coral/navy accent inside the INA page. */}
            <motion.div {...reveal(1)} data-brand="myomedic">
              <GlassCard className="glass-hover flex h-full flex-col p-7 md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{pillars.myomedic.eyebrow}</p>
                    <h3 className="font-heading mt-2 text-4xl md:text-5xl">
                      {pillars.myomedic.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      {pillars.myomedic.tag}
                    </p>
                  </div>
                  <MuscleMap
                    view="front"
                    highlight={['shoulders', 'quads', 'calves']}
                    className="h-28 w-auto shrink-0 md:h-36"
                  />
                </div>
                <p className="mt-4 leading-relaxed text-[var(--muted)]">{pillars.myomedic.body}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {pillars.myomedic.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--accent)]" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <ButtonLink to={pillars.myomedic.cta.to} arrow>
                    {pillars.myomedic.cta.label}
                  </ButtonLink>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Method */}
      <section className="glass cut-both border-x-0 py-24 md:py-32">
        <div className="container-ina">
          <SectionHeading
            eyebrow="The method"
            title="Assess. Program. Fuel. Recover."
            lead="Four steps, repeated every training block. Simple on paper, relentless in practice."
          />
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((m, i) => {
              const Icon = methodIcons[i]
              return (
                <motion.li
                  key={m.step}
                  {...reveal(i)}
                  className="relative border-t-4 border-[var(--accent)] bg-black/30 p-6"
                >
                  <span className="font-heading text-6xl text-[var(--text)] opacity-15">
                    {m.step}
                  </span>
                  <Icon className="mt-2 text-[var(--accent)]" size={28} aria-hidden />
                  <h3 className="font-heading mt-3 text-3xl uppercase">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{m.body}</p>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Featured results */}
      <section className="py-20 md:py-28">
        <div className="container-ina">
          <SectionHeading eyebrow="Proof" title="Results that show up" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredResults.map((r, i) => {
              const Art = resultArt[r.art]
              return (
                <motion.article key={r.name} {...reveal(i)}>
                  <GlassCard className="glass-hover h-full overflow-hidden">
                    <div className="knurl relative flex h-44 items-center justify-center bg-black/30">
                      <Art className="h-32 w-auto" />
                      <SampleBadge className="absolute left-3 top-3" />
                    </div>
                    <div className="p-6">
                      <p className="font-heading text-3xl uppercase leading-none">{r.headline}</p>
                      <p className="mt-3 text-sm text-[var(--muted)]">{r.detail}</p>
                      <p className="eyebrow mt-4 !text-[var(--text)]">{r.name}</p>
                    </div>
                  </GlassCard>
                </motion.article>
              )
            })}
          </div>
          <div className="mt-8">
            <ButtonLink to="/results" variant="ghost" arrow>
              See all results
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Credential bar */}
      <section aria-label="Credentials" className="glass border-x-0">
        <div className="container-ina flex flex-col items-center justify-between gap-8 py-9 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {credentials.map((c) => (
              <div key={c.abbr} className="text-center md:text-left">
                <p className="font-heading text-4xl text-[var(--accent)]">{c.abbr}</p>
                <p className="text-xs uppercase tracking-[0.15em] text-[var(--muted)]">{c.name}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <LogoBadge brand="ina" className="h-16 w-16" />
            <LogoBadge brand="myomedic" className="h-16 w-16" />
            <HeartRateLine className="hidden h-10 w-28 lg:block" />
          </div>
        </div>
      </section>

      <div className="pt-8">
        <CTABand {...finalCta} />
      </div>
    </>
  )
}
