import { useState } from 'react'
import { ArrowLeftRight, Check, Circle } from 'lucide-react'
import { GlassCard } from '../ui'
import { muscleLabels } from '../../art/muscles'
import { fmtRest, readDone, writeDone } from '../../hooks/portal'
import type { ClientProfile, Exercise } from '../../types/client'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[4.5rem]">
      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">{label}</dt>
      <dd className="tabular text-sm font-semibold">{value}</dd>
    </div>
  )
}

function ExerciseRow({ ex, index }: { ex: Exercise; index: number }) {
  const effort =
    ex.rir !== undefined
      ? `RPE ${10 - ex.rir} · ${ex.rir} RIR`
      : ex.rpe !== undefined
        ? `RPE ${ex.rpe}`
        : '–'
  return (
    <li className="py-4">
      <p className="font-semibold">
        <span className="tabular mr-2 text-[var(--accent)]">{index + 1}.</span>
        {ex.name}
      </p>
      <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
        <Stat label="Sets × reps" value={`${ex.sets} × ${ex.reps}`} />
        <Stat label="Effort" value={effort} />
        <Stat label="Rest" value={fmtRest(ex.restSec)} />
        {ex.tempo && <Stat label="Tempo" value={ex.tempo} />}
      </dl>
      {ex.notes && <p className="mt-2 text-sm leading-relaxed text-muted">{ex.notes}</p>}
      {ex.swap && (
        <p className="mt-1 flex items-start gap-2 text-sm text-muted">
          <ArrowLeftRight size={14} aria-hidden className="mt-1 shrink-0 text-[var(--accent)]" />
          <span>
            <span className="font-semibold text-[var(--text)]">Swap:</span> {ex.swap}
          </span>
        </p>
      )}
    </li>
  )
}

export function TrainingTab({ client }: { client: ClientProfile }) {
  const [weekIdx, setWeekIdx] = useState(0)
  // Lazy initial read: storage is only touched once per mount, never during an effect.
  const [done, setDone] = useState<string[]>(() => readDone(client.code))
  const week = client.training[weekIdx] ?? client.training[0]

  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter((d) => d !== id) : [...done, id]
    setDone(next)
    writeDone(client.code, next)
  }
  const key = (dayId: string) => `${week.week}:${dayId}`
  const doneCount = week.days.filter((d) => done.includes(key(d.id))).length

  return (
    <div>
      <div role="group" aria-label="Select week" className="flex flex-wrap gap-2">
        {client.training.map((w, i) => (
          <button
            key={w.week}
            type="button"
            className="chip"
            aria-pressed={i === weekIdx}
            onClick={() => setWeekIdx(i)}
          >
            Week {w.week}
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-heading text-3xl uppercase">{week.label}</h2>
        <p className="text-sm text-muted" aria-live="polite">
          {doneCount} of {week.days.length} sessions complete
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {week.days.map((day) => {
          const isDone = done.includes(key(day.id))
          return (
            <GlassCard
              key={day.id}
              className={`p-5 md:p-6 ${isDone ? 'border-[var(--accent)]' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading text-2xl uppercase">{day.name}</h3>
                  <p className="text-sm text-muted">{day.focus}</p>
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {day.muscles.map((m) => (
                      <span
                        key={m}
                        className="border border-[var(--line)] px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted"
                      >
                        {muscleLabels[m]}
                      </span>
                    ))}
                  </p>
                </div>
                <button
                  type="button"
                  aria-pressed={isDone}
                  onClick={() => toggle(key(day.id))}
                  className={`btn shrink-0 !px-3 ${isDone ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {isDone ? <Check size={16} aria-hidden /> : <Circle size={16} aria-hidden />}
                  {isDone ? 'Complete' : 'Mark complete'}
                  <span className="sr-only"> for {day.name}</span>
                </button>
              </div>
              <ol className="mt-3 divide-y divide-[var(--line)] border-t border-[var(--line)]">
                {day.exercises.map((ex, i) => (
                  <ExerciseRow key={ex.name} ex={ex} index={i} />
                ))}
              </ol>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
