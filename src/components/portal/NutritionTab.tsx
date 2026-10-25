import { useState } from 'react'
import { GlassCard } from '../ui'
import type { ClientProfile, Macros } from '../../types/client'

type DayType = 'trainingDay' | 'restDay'

// Share of calories from each macro (4 / 4 / 9 kcal per gram).
const BARS: { key: 'protein' | 'carbs' | 'fat'; label: string; kcalPer: number }[] = [
  { key: 'protein', label: 'Protein', kcalPer: 4 },
  { key: 'carbs', label: 'Carbs', kcalPer: 4 },
  { key: 'fat', label: 'Fat', kcalPer: 9 },
]

function MacroBars({ t }: { t: Macros }) {
  return (
    <div>
      <p className="font-heading tabular text-6xl leading-none">
        {t.kcal.toLocaleString('en-CA')}
        <span className="ml-2 text-2xl uppercase text-muted">kcal</span>
      </p>
      <ul className="mt-6 space-y-4">
        {BARS.map((b) => {
          const grams = t[b.key]
          const pct = Math.round(((grams * b.kcalPer) / t.kcal) * 100)
          return (
            <li key={b.key}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold">{b.label}</span>
                <span className="tabular">
                  {grams} g <span className="text-muted">· {pct}% of kcal</span>
                </span>
              </div>
              <div
                role="meter"
                aria-label={`${b.label} target`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                aria-valuetext={`${grams} grams, ${pct} percent of calories`}
                className="h-3 bg-[var(--line)]"
              >
                <div className="h-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function NutritionTab({ client }: { client: ClientProfile }) {
  const [day, setDay] = useState<DayType>('trainingDay')
  const n = client.nutrition
  const plan = n[day]
  const total = plan.meals.reduce(
    (a, m) => ({
      kcal: a.kcal + m.macros.kcal,
      protein: a.protein + m.macros.protein,
      carbs: a.carbs + m.macros.carbs,
      fat: a.fat + m.macros.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  )
  return (
    <div>
      <div role="group" aria-label="Day type" className="flex flex-wrap gap-2">
        <button
          type="button"
          className="chip"
          aria-pressed={day === 'trainingDay'}
          onClick={() => setDay('trainingDay')}
        >
          Training day
        </button>
        <button
          type="button"
          className="chip"
          aria-pressed={day === 'restDay'}
          onClick={() => setDay('restDay')}
        >
          Rest day
        </button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <GlassCard className="p-6">
          <h2 className="eyebrow mb-4">Daily targets</h2>
          <MacroBars t={plan.targets} />
          {n.notes && <p className="mt-6 text-sm leading-relaxed text-muted">{n.notes}</p>}
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="eyebrow mb-4">Sample day</h2>
          <ol className="divide-y divide-[var(--line)]">
            {plan.meals.map((m) => (
              <li key={m.name} className="py-4 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-heading text-xl uppercase">
                    {m.name} <span className="text-sm text-muted">· {m.time}</span>
                  </h3>
                  <p className="tabular text-sm text-muted">
                    {m.macros.kcal} kcal · P{m.macros.protein} C{m.macros.carbs} F{m.macros.fat}
                  </p>
                </div>
                <ul className="mt-1 list-inside list-disc text-sm leading-relaxed text-muted">
                  {m.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-2 border-t border-[var(--line)] pt-3 text-sm tabular">
            Plan total: {total.kcal} kcal · P{total.protein} C{total.carbs} F{total.fat}
          </p>
        </GlassCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="eyebrow mb-4">Grocery list</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {n.grocery.map((g) => (
              <div key={g.category}>
                <h3 className="font-heading text-xl uppercase">{g.category}</h3>
                <ul className="mt-1 space-y-1 text-sm text-muted">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--accent)]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="eyebrow mb-4">Supplements</h2>
          <ul className="divide-y divide-[var(--line)]">
            {n.supplements.map((s) => (
              <li key={s.name} className="py-3 first:pt-0">
                <p className="font-semibold">
                  {s.name} <span className="font-normal text-muted">· {s.dose}</span>
                </p>
                <p className="text-sm text-muted">{s.timing}</p>
                <p className="text-sm leading-relaxed text-muted">{s.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            Sample guidance only. Check supplements with your doctor.
          </p>
        </GlassCard>
      </div>
    </div>
  )
}
