import { PageHero, GlassCard } from '../components/ui'
import { privacyHero, privacySections } from '../content/privacy'
import { site } from '../content/site'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Privacy() {
  useDocumentMeta(
    'Privacy & Terms',
    'How Iron Nation Athletics handles your information. Placeholder policy for the showcase.',
  )
  return (
    <>
      <PageHero {...privacyHero} />
      <section className="container-ina pb-20 md:pb-28">
        <GlassCard className="max-w-3xl space-y-8 p-6 md:p-10">
          {privacySections.map((s) => (
            <div key={s.title}>
              <h2 className="font-heading text-3xl uppercase">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="border-t border-[var(--line)] pt-6 text-sm text-muted">
            Questions? Email{' '}
            <a className="underline hover:text-[var(--accent)]" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </GlassCard>
      </section>
    </>
  )
}
