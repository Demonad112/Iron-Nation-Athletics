import { useState } from 'react'
import { MuscleMap } from '../art/MuscleMap'
import { backGroups, frontGroups, muscleLabels, type MuscleGroup } from '../art/muscles'
import { muscleDetails } from '../content/training'
import { GlassCard } from './ui'

type View = 'front' | 'back'

const defaults: Record<View, MuscleGroup> = { front: 'chest', back: 'lats' }

/** Muscle map + detail panel. Hover, tap, focus or use the chips to pick a group. */
export function MuscleExplorer() {
  const [view, setView] = useState<View>('front')
  const [group, setGroup] = useState<MuscleGroup>('chest')
  const groups = view === 'front' ? frontGroups : backGroups
  const detail = muscleDetails[group]

  const changeView = (next: View) => {
    setView(next)
    const available = next === 'front' ? frontGroups : backGroups
    if (!available.includes(group)) setGroup(defaults[next])
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <GlassCard className="p-5">
        <div role="group" aria-label="Body view" className="mb-4 flex gap-2">
          {(['front', 'back'] as const).map((v) => (
            <button
              key={v}
              type="button"
              className="chip flex-1"
              aria-pressed={view === v}
              onClick={() => changeView(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <MuscleMap
          view={view}
          active={group}
          onSelect={setGroup}
          title={`Interactive ${view} muscle map`}
          className="mx-auto h-[26rem] w-auto max-w-full"
        />
        <p className="mt-3 text-center text-xs text-muted">Hover, tap or tab to a muscle group.</p>
      </GlassCard>

      <div>
        <div role="group" aria-label="Muscle groups" className="mb-4 flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              className="chip"
              aria-pressed={g === group}
              onClick={() => setGroup(g)}
            >
              {muscleLabels[g]}
            </button>
          ))}
        </div>
        <GlassCard className="p-6 md:p-8">
          <div aria-live="polite" aria-atomic="true">
            <p className="eyebrow">{view} view</p>
            <h3 className="font-heading mt-2 text-4xl uppercase md:text-5xl">
              {muscleLabels[group]}
            </h3>
            <h4 className="eyebrow mt-6 !text-[var(--text)]">Example exercises</h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {detail.exercises.map((ex) => (
                <li
                  key={ex}
                  className="flex gap-3 border border-[var(--line)] bg-black/25 px-3 py-2 text-sm"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-[var(--accent)]" aria-hidden />
                  {ex}
                </li>
              ))}
            </ul>
            <h4 className="eyebrow mt-6 !text-[var(--text)]">How Cody programs it</h4>
            <p className="mt-3 leading-relaxed text-muted">{detail.programming}</p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
