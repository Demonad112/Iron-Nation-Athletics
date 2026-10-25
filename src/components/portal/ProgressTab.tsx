import { useId, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Table2 } from 'lucide-react'
import { GlassCard } from '../ui'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { fmtDate } from '../../hooks/portal'
import type { ClientProfile, SeriesPoint } from '../../types/client'

function SeriesChart({ title, unit, data }: { title: string; unit: string; data: SeriesPoint[] }) {
  const [asTable, setAsTable] = useState(false)
  const reduced = usePrefersReducedMotion()
  const tableId = useId()
  const first = data[0]
  const last = data[data.length - 1]
  const delta = Math.round((last.value - first.value) * 10) / 10
  const summary = `${title}: ${first.value} ${unit} on ${fmtDate(first.date)} to ${last.value} ${unit} on ${fmtDate(last.date)}, a change of ${delta > 0 ? '+' : ''}${delta} ${unit} over ${data.length} check-ins.`
  const rows = data.map((p) => ({ ...p, label: fmtDate(p.date, false) }))
  return (
    <GlassCard className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl uppercase">{title}</h2>
          <p className="text-sm text-muted">
            {last.value} {unit} now ·{' '}
            <span className="tabular">
              {delta > 0 ? '+' : ''}
              {delta} {unit}
            </span>{' '}
            since {fmtDate(first.date, false)}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-ghost !min-h-[2.75rem] !px-3"
          aria-expanded={asTable}
          aria-controls={tableId}
          onClick={() => setAsTable((v) => !v)}
        >
          <Table2 size={14} aria-hidden /> {asTable ? 'View as chart' : 'View as table'}
        </button>
      </div>

      <div id={tableId} className="mt-4">
        {asTable ? (
          <div
            className="max-h-72 overflow-auto border border-[var(--line)]"
            tabIndex={0}
            role="region"
            aria-label={`${title} data table, scrollable`}
          >
            <table className="w-full text-left text-sm">
              <caption className="sr-only">{summary}</caption>
              <thead className="sticky top-0 bg-[var(--surface-solid)]">
                <tr>
                  <th scope="col" className="px-3 py-2">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-2 text-right">
                    {title} ({unit})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {data.map((p) => (
                  <tr key={p.date}>
                    <td className="px-3 py-2">{fmtDate(p.date)}</td>
                    <td className="tabular px-3 py-2 text-right">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <figure>
            <div role="img" aria-label={summary} className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rows} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
                  <CartesianGrid stroke="var(--line)" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: 'var(--muted)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--line)' }}
                    interval="preserveStartEnd"
                    minTickGap={28}
                  />
                  <YAxis
                    tick={{ fill: 'var(--muted)', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={48}
                    domain={[
                      (min: number) => Math.floor(min - 1),
                      (max: number) => Math.ceil(max + 1),
                    ]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--surface-solid)',
                      border: '1px solid var(--line)',
                      borderRadius: 0,
                      color: 'var(--text)',
                    }}
                    labelStyle={{ color: 'var(--muted)' }}
                    formatter={(v) => [`${v} ${unit}`, title]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    dot={{ r: 3, fill: 'var(--accent)', strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                    isAnimationActive={!reduced}
                    animationDuration={400}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <figcaption className="sr-only">{summary}</figcaption>
          </figure>
        )}
      </div>
    </GlassCard>
  )
}

export function ProgressTab({ client }: { client: ClientProfile }) {
  const p = client.progress
  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <SeriesChart title="Bodyweight" unit="kg" data={p.bodyweight} />
        <SeriesChart title="Waist" unit="cm" data={p.waist} />
      </div>

      <GlassCard className="p-5 md:p-6">
        <h2 className="font-heading text-2xl uppercase">Strength PRs</h2>
        <div
          className="mt-3 overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Strength PRs table, scrollable"
        >
          <table className="w-full min-w-[30rem] text-left text-sm">
            <caption className="sr-only">Personal records by lift</caption>
            <thead className="border-b border-[var(--line)] text-xs uppercase tracking-[0.14em] text-muted">
              <tr>
                <th scope="col" className="py-2 pr-3">
                  Lift
                </th>
                <th scope="col" className="px-3 py-2 text-right">
                  Best set
                </th>
                <th scope="col" className="px-3 py-2 text-right">
                  Previous
                </th>
                <th scope="col" className="py-2 pl-3 text-right">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {p.strengthPRs.map((r) => (
                <tr key={r.lift}>
                  <th scope="row" className="py-3 pr-3 font-semibold">
                    {r.lift}
                  </th>
                  <td className="tabular whitespace-nowrap px-3 py-3 text-right">
                    {r.weightKg} kg × {r.reps}
                  </td>
                  <td className="tabular px-3 py-3 text-right text-muted">
                    {r.previousKg === null ? '–' : `${r.previousKg} kg`}
                    {r.previousKg !== null && (
                      <span className="ml-2 text-[var(--accent)]">
                        +{Math.round((r.weightKg - r.previousKg) * 10) / 10}
                      </span>
                    )}
                  </td>
                  <td className="py-3 pl-3 text-right text-muted">{fmtDate(r.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="p-5 md:p-6">
        <h2 className="font-heading text-2xl uppercase">Check-in history</h2>
        <div
          className="mt-3 overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Check-in history table, scrollable"
        >
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">Past weekly check-ins, newest first</caption>
            <thead className="border-b border-[var(--line)] text-xs uppercase tracking-[0.14em] text-muted">
              <tr>
                {[
                  'Date',
                  'Weight',
                  'Waist',
                  'Sleep',
                  'Energy',
                  'Stress',
                  'Hunger',
                  'Adh.',
                  'Notes',
                ].map((h) => (
                  <th key={h} scope="col" className="px-2 py-2 first:pl-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {p.checkIns.map((c) => (
                <tr key={c.date}>
                  <th scope="row" className="whitespace-nowrap py-3 pr-2 font-semibold">
                    {fmtDate(c.date, false)}
                  </th>
                  <td className="tabular whitespace-nowrap px-2 py-3">{c.bodyweightKg} kg</td>
                  <td className="tabular whitespace-nowrap px-2 py-3">{c.waistCm} cm</td>
                  <td className="tabular px-2 py-3">{c.sleep}</td>
                  <td className="tabular px-2 py-3">{c.energy}</td>
                  <td className="tabular px-2 py-3">{c.stress}</td>
                  <td className="tabular px-2 py-3">{c.hunger}</td>
                  <td className="tabular px-2 py-3">{c.adherence}%</td>
                  <td className="px-2 py-3 text-muted">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
