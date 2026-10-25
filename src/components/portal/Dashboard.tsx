import { useState } from 'react'
import { Info, LogOut } from 'lucide-react'
import { Tabs } from '../ui'
import type { ClientProfile } from '../../types/client'
import { CheckInTab } from './CheckInTab'
import { GuidanceTab } from './GuidanceTab'
import { NutritionTab } from './NutritionTab'
import { OverviewTab } from './OverviewTab'
import { ProgressTab } from './ProgressTab'
import { RecoveryTab } from './RecoveryTab'
import { TrainingTab } from './TrainingTab'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'training', label: 'Training' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'checkin', label: 'Check-In' },
  { id: 'progress', label: 'Progress' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'guidance', label: 'Guidance' },
] as const

export function Dashboard({ client, onSignOut }: { client: ClientProfile; onSignOut: () => void }) {
  const [tab, setTab] = useState<string>('overview')
  return (
    <>
      <div className="border-b border-[var(--line)] bg-[var(--surface-solid)]">
        <p role="note" className="container-ina flex items-start gap-2 py-3 text-sm font-semibold">
          <Info size={16} aria-hidden className="mt-0.5 shrink-0 text-[var(--accent)]" />
          Demo portal — sample data. Real client access will use secure accounts.
        </p>
      </div>

      <section className="container-ina py-10 md:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">
              {client.code} · {client.persona}
            </p>
            <h1 className="font-heading text-balance text-5xl uppercase leading-[0.95] md:text-6xl">
              {client.displayName}&rsquo;s portal
            </h1>
            <span className="rule mt-4" />
          </div>
          <button type="button" className="btn btn-ghost" onClick={onSignOut}>
            <LogOut size={14} aria-hidden /> Sign out
          </button>
        </div>

        <Tabs tabs={TABS} value={tab} onChange={setTab} label="Portal sections">
          {tab === 'overview' && <OverviewTab client={client} />}
          {tab === 'training' && <TrainingTab client={client} />}
          {tab === 'nutrition' && <NutritionTab client={client} />}
          {tab === 'checkin' && <CheckInTab client={client} />}
          {tab === 'progress' && <ProgressTab client={client} />}
          {tab === 'recovery' && <RecoveryTab client={client} />}
          {tab === 'guidance' && <GuidanceTab client={client} />}
        </Tabs>
      </section>
    </>
  )
}
