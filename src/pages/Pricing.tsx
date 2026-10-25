import { useSearchParams } from 'react-router-dom'
import { Check, Minus } from 'lucide-react'
import { ButtonLink, CTABand, GlassCard, PageHero, Tabs } from '../components/ui'
import {
  pricingHero,
  pricingSmallPrint,
  pricingTabs,
  ptComparison,
  tiers,
  type PricingTabId,
  type Tier,
} from '../content/pricing'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const cad = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
})

const isTab = (v: string | null): v is PricingTabId => pricingTabs.some((t) => t.id === v)

function TierCard({ tier }: { tier: Tier }) {
  return (
    <GlassCard
      className={`relative flex h-full flex-col p-6 md:p-8 ${
        tier.highlight ? 'border-[var(--accent)] lg:-my-3 lg:py-11' : ''
      }`}
    >
      {tier.highlight && (
        <span className="absolute -top-3 left-6 bg-[var(--accent-fill)] px-3 py-1 font-label text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--accent-ink)]">
          Most popular
        </span>
      )}
      <h3 className="font-heading text-3xl uppercase">{tier.name}</h3>
      <p className="mt-4 flex items-baseline gap-2">
        <span className="font-heading tabular text-6xl">{cad.format(tier.price)}</span>
        <span className="text-sm text-muted">CAD {tier.unit}</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{tier.blurb}</p>
      <ul className="mt-5 space-y-2 text-sm">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-3">
            <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <ButtonLink
          to={`/contact?interest=${tier.interest}&plan=${encodeURIComponent(tier.name)}`}
          variant={tier.highlight ? 'primary' : 'ghost'}
          arrow
        >
          Choose {tier.name}
        </ButtonLink>
      </div>
    </GlassCard>
  )
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <>
        <Check size={18} className="mx-auto text-[var(--accent)]" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    )
  }
  if (value === false) {
    return (
      <>
        <Minus size={18} className="mx-auto text-muted" aria-hidden />
        <span className="sr-only">Not included</span>
      </>
    )
  }
  return <>{value}</>
}

function ComparisonTable() {
  return (
    <div className="mt-14">
      <h2 className="font-heading text-3xl uppercase md:text-4xl">Compare PT tiers</h2>
      <div className="glass relative mt-5 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <caption className="sr-only">Comparison of in-person personal training tiers</caption>
          <thead>
            <tr className="border-b border-[var(--line)]">
              <th
                scope="col"
                className="px-4 py-3 font-label text-xs uppercase tracking-[0.18em] text-muted"
              >
                Feature
              </th>
              {ptComparison.columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={`px-4 py-3 text-center font-label text-xs uppercase tracking-[0.18em] ${
                    i === 1 ? 'bg-[var(--accent-fill)] text-[var(--accent-ink)]' : ''
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ptComparison.rows.map((r) => (
              <tr key={r.label} className="border-b border-[var(--line)] last:border-0">
                <th scope="row" className="px-4 py-3 font-medium">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className={`px-4 py-3 text-center ${i === 1 ? 'bg-white/5' : ''}`}>
                    <Cell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Pricing() {
  useDocumentMeta(
    'Pricing & Packages',
    'Sample pricing for in-person training, online coaching, MyoMedic massage therapy and bundles in Calgary. Prices shown are placeholders for preview.',
  )
  const [params, setParams] = useSearchParams()
  const raw = params.get('tab')
  const tab: PricingTabId = isTab(raw) ? raw : 'pt'
  const panel = tiers[tab]

  return (
    <>
      <PageHero eyebrow={pricingHero.eyebrow} title={pricingHero.title} lead={pricingHero.lead} />

      <section className="pb-20 md:pb-28">
        <div className="container-ina">
          <Tabs
            tabs={pricingTabs}
            value={tab}
            onChange={(id) => setParams({ tab: id }, { replace: true })}
            label="Pricing categories"
          >
            <p className="mb-10 max-w-2xl text-muted">{panel.intro}</p>
            <ul className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
              {panel.items.map((t) => (
                <li key={t.name}>
                  <TierCard tier={t} />
                </li>
              ))}
            </ul>
            {tab === 'pt' && <ComparisonTable />}
          </Tabs>
          <p className="mt-10 text-sm text-muted">{pricingSmallPrint}</p>
        </div>
      </section>

      <CTABand
        title="Not sure which fits?"
        body="Book a free consult and Cody will recommend a package for your goals."
        cta={{ label: 'Talk to Cody', to: '/contact' }}
      />
    </>
  )
}
