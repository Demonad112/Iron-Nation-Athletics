import { useState } from 'react'
import { motion } from 'framer-motion'
import { resultArt } from '../art/resultArt'
import { BeforeAfter } from '../components/BeforeAfter'
import { TestimonialCarousel } from '../components/TestimonialCarousel'
import {
  ButtonLink,
  CTABand,
  GlassCard,
  PageHero,
  SampleBadge,
  SectionHeading,
} from '../components/ui'
import {
  categoryLabels,
  results,
  resultsCta,
  resultsHero,
  sliderDemo,
  testimonials,
  type ResultCategory,
} from '../content/results'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'

type Filter = 'all' | ResultCategory
const filters: Filter[] = ['all', 'hypertrophy', 'fat-loss', 'contest-prep', 'rehab']

export default function Results() {
  useDocumentMeta(
    'Results & Testimonials',
    'Sample client transformations and testimonials from Iron Nation Athletics. Placeholder results shown for preview.',
  )
  const reveal = useReveal()
  const [filter, setFilter] = useState<Filter>('all')
  const shown = filter === 'all' ? results : results.filter((r) => r.category === filter)

  return (
    <>
      <PageHero eyebrow={resultsHero.eyebrow} title={resultsHero.title} lead={resultsHero.lead}>
        <ButtonLink to="/contact" arrow>
          Start your own
        </ButtonLink>
      </PageHero>

      <section className="pb-14 md:pb-20">
        <div className="container-ina">
          <SectionHeading eyebrow="Transformations" title="Client results" />
          <div
            role="group"
            aria-label="Filter results by category"
            className="mb-8 flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className="chip"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : categoryLabels[f]}
              </button>
            ))}
          </div>
          <p className="sr-only" role="status">
            Showing {shown.length} {shown.length === 1 ? 'result' : 'results'}
          </p>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((r, i) => {
              const Art = resultArt[r.art]
              return (
                <motion.li key={r.id} {...reveal(i)}>
                  <GlassCard className="glass-hover h-full overflow-hidden">
                    <div className="knurl relative flex h-40 items-center justify-center bg-black/30">
                      <Art className="h-28 w-auto" />
                      <SampleBadge className="absolute left-3 top-3" />
                    </div>
                    <div className="p-5">
                      <p className="eyebrow">{categoryLabels[r.category]}</p>
                      <p className="font-heading mt-2 text-2xl uppercase leading-none">
                        {r.headline}
                      </p>
                      <p className="mt-3 text-sm text-muted">{r.detail}</p>
                      <p className="eyebrow mt-4 !text-[var(--text)]">{r.name}</p>
                    </div>
                  </GlassCard>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="glass cut-both border-x-0 py-24 md:py-28">
        <div className="container-ina grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading eyebrow="Compare" title={sliderDemo.title} lead={sliderDemo.lead} />
          <BeforeAfter
            beforeLabel={sliderDemo.beforeLabel}
            afterLabel={sliderDemo.afterLabel}
            caption={sliderDemo.caption}
          />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ina max-w-4xl">
          <SectionHeading eyebrow="In their words" title="Testimonials" />
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>

      <CTABand {...resultsCta} />
    </>
  )
}
