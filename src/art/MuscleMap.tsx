import type { KeyboardEvent } from 'react'

import { muscleLabels, type MuscleGroup } from './muscles'

// Each group is drawn for the left half of the body (viewer's left) and mirrored for the
// right half, except the centre-line groups which are drawn whole.
interface Shape {
  d: string
  mirror?: boolean
}

const FRONT: Partial<Record<MuscleGroup, Shape[]>> = {
  shoulders: [{ d: 'M66 78 Q46 76 44 98 Q44 108 52 104 Q60 92 72 88 Z', mirror: true }],
  chest: [{ d: 'M99 80 L99 112 Q80 122 66 106 Q62 90 74 82 Q88 76 99 80 Z', mirror: true }],
  biceps: [{ d: 'M44 108 Q40 128 44 144 L58 144 Q62 128 60 106 Q52 112 44 108 Z', mirror: true }],
  forearms: [{ d: 'M43 148 Q37 176 38 200 L52 200 Q57 176 58 148 Z', mirror: true }],
  core: [{ d: 'M84 116 H116 V170 Q100 182 84 170 Z' }],
  quads: [{ d: 'M70 186 Q60 232 68 284 L97 284 Q101 232 99 186 Q84 192 70 186 Z', mirror: true }],
  calves: [{ d: 'M69 294 Q62 322 69 358 L88 358 Q94 322 92 294 Z', mirror: true }],
}

const BACK: Partial<Record<MuscleGroup, Shape[]>> = {
  traps: [{ d: 'M100 62 L76 78 Q88 100 100 112 Q112 100 124 78 Z' }],
  shoulders: [{ d: 'M72 80 Q48 76 44 98 Q44 108 52 104 Q60 92 74 90 Z', mirror: true }],
  lats: [{ d: 'M76 92 Q66 120 84 150 L98 154 L98 116 Q90 106 76 92 Z', mirror: true }],
  triceps: [{ d: 'M44 108 Q40 128 44 144 L58 144 Q62 128 60 106 Q52 112 44 108 Z', mirror: true }],
  lowerBack: [{ d: 'M86 156 H114 V184 H86 Z' }],
  glutes: [{ d: 'M70 188 Q64 214 82 226 Q96 228 99 214 L99 188 Q84 194 70 188 Z', mirror: true }],
  hamstrings: [
    { d: 'M70 232 Q62 262 69 288 L97 288 Q101 262 99 232 Q84 238 70 232 Z', mirror: true },
  ],
  calves: [{ d: 'M69 296 Q62 324 69 358 L88 358 Q94 324 92 296 Z', mirror: true }],
}

interface Props {
  view: 'front' | 'back'
  /** Groups drawn in the accent colour. */
  highlight?: MuscleGroup[]
  /** When set, groups become focusable buttons. */
  onSelect?: (group: MuscleGroup) => void
  /** The currently selected group (draws stronger than a plain highlight). */
  active?: MuscleGroup | null
  className?: string
  title?: string
}

export function MuscleMap({
  view,
  highlight = [],
  onSelect,
  active = null,
  className,
  title,
}: Props) {
  const groups = view === 'front' ? FRONT : BACK
  const interactive = Boolean(onSelect)

  const onKey = (e: KeyboardEvent, g: MuscleGroup) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect?.(g)
    }
  }

  return (
    <svg
      viewBox="0 0 200 380"
      className={className}
      role={interactive ? 'group' : title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={interactive || title ? undefined : true}
      fill="none"
    >
      {/* Silhouette */}
      <g
        fill="var(--text)"
        opacity="0.07"
        stroke="var(--text)"
        strokeOpacity="0.35"
        strokeWidth="1"
      >
        <circle cx="100" cy="30" r="18" />
        <rect x="92" y="46" width="16" height="18" />
        <path d="M70 66 H130 Q150 70 154 100 L160 200 H146 L138 120 L134 176 Q132 192 128 196 L128 362 H72 L72 196 Q68 192 66 176 L62 120 L54 200 H40 L46 100 Q50 70 70 66 Z" />
      </g>
      {(Object.keys(groups) as MuscleGroup[]).map((g) => {
        const on = highlight.includes(g) || active === g
        const strong = active === g
        const shapes = groups[g] ?? []
        return (
          <g
            key={g}
            data-group={g}
            fill={on ? 'var(--accent)' : 'var(--text)'}
            fillOpacity={strong ? 0.95 : on ? 0.6 : 0.12}
            stroke={on ? 'var(--accent)' : 'var(--text)'}
            strokeOpacity={on ? 1 : 0.3}
            strokeWidth={strong ? 2 : 1}
            style={{ cursor: interactive ? 'pointer' : undefined, transition: 'fill-opacity .2s' }}
            {...(interactive
              ? {
                  role: 'button',
                  tabIndex: 0,
                  'aria-label': muscleLabels[g],
                  'aria-pressed': strong,
                  onClick: () => onSelect?.(g),
                  onMouseEnter: () => onSelect?.(g),
                  onFocus: () => onSelect?.(g),
                  onKeyDown: (e: KeyboardEvent) => onKey(e, g),
                }
              : {})}
          >
            {shapes.map((s, i) => (
              <g key={i}>
                <path d={s.d} />
                {s.mirror && <path d={s.d} transform="translate(200 0) scale(-1 1)" />}
              </g>
            ))}
          </g>
        )
      })}
    </svg>
  )
}
