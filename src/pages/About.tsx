import { motion } from 'framer-motion'
import { CoachSilhouette } from '../art'
import { ButtonLink, CTABand, GlassCard, PageHero, SectionHeading } from '../components/ui'
import {
  aboutCta,
  aboutHero,
  credentialTimeline,
  philosophy,
  story,
  whyIronNation,
} from '../content/about'
import { images } from '../content/images'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useReveal } from '../hooks/useReveal'

function Portrait({ className = '' }: { className?: string }) {
  return images.coachPortrait ? (
    <img
      src={images.coachPortrait}
      alt={aboutHero.portraitAlt}
      loading="eager"
      className={`aspect-[4/5] w-full object-cover ${className}`}
    />
  ) : (
    <div
      className={`glass knurl flex aspect-[4/5] items-end justify-center overflow-hidden ${className}`}
      role="img"
      aria-label="Placeholder portrait of Cody Innes"
    >
      <CoachSilhouette className="h-full w-full" />
    </div>
  )
}

export default function About() {
  useDocumentMeta(
    'About Cody Innes',
    'Meet Cody Innes, R.M.T. and C.S.C.S., the Calgary coach and massage therapist behind Iron Nation Athletics and MyoMedic.',
  )
  const reveal = useReveal()

  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        lead={aboutHero.lead}
        aside={<Portrait className="mx-auto max-w-sm" />}
      >
        <ButtonLink to="/contact" arrow>
          Work with Cody
        </ButtonLink>
        <ButtonLink to="/results" variant="ghost">
          See results
        </ButtonLink>
      </PageHero>

      <section className="pb-14 md:pb-20">
        <div className="container-ina max-w-4xl">
          <div className="mb-10 lg:hidden">
            <Portrait className="mx-auto max-w-xs" />
          </div>
          <div>
            <SectionHeading eyebrow="Story" title="From the weight room to the treatment room" />
            <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
              {story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass cut-both border-x-0 py-24 md:py-28">
        <div className="container-ina">
          <SectionHeading eyebrow="Philosophy" title="How Cody coaches" />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {philosophy.map((p, i) => (
              <motion.li
                key={p.title}
                {...reveal(i)}
                className="border-t-4 border-[var(--accent)] bg-black/30 p-6"
              >
                <h3 className="font-heading text-3xl uppercase">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-ina">
          <SectionHeading eyebrow="Credentials" title="Qualifications & timeline" />
          <ol className="relative max-w-3xl border-l-4 border-[var(--accent)] pl-6 md:pl-10">
            {credentialTimeline.map((c, i) => (
              <motion.li key={c.year + c.title} {...reveal(i)} className="relative pb-9 last:pb-0">
                <span
                  className="absolute -left-[2.15rem] top-1.5 h-3 w-3 bg-[var(--text)] md:-left-[3.15rem]"
                  aria-hidden
                />
                <p className="eyebrow">{c.year}</p>
                <h3 className="font-heading mt-1 text-3xl uppercase">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.detail}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-ina">
          <SectionHeading
            eyebrow="Why Iron Nation"
            title="What you get that you won't get elsewhere"
          />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {whyIronNation.map((w, i) => (
              <motion.li key={w.title} {...reveal(i)}>
                <GlassCard className="glass-hover h-full p-6">
                  <h3 className="font-heading text-2xl uppercase">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
                </GlassCard>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand {...aboutCta} />
    </>
  )
}
