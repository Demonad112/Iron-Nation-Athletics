import { useId, useState } from 'react'
import { MuscleMap } from '../art/MuscleMap'
import { SampleBadge } from './ui'

const grown = ['chest', 'shoulders', 'biceps', 'quads'] as const

/**
 * Before/after comparison. The art is a placeholder; the control is a real range input, so it
 * works with keyboard (arrow keys, Home/End), touch drag and screen readers.
 */
export function BeforeAfter({
  beforeLabel,
  afterLabel,
  caption,
}: {
  beforeLabel: string
  afterLabel: string
  caption: string
}) {
  const [pos, setPos] = useState(50)
  const id = useId()

  return (
    <figure>
      <div className="knurl group relative mx-auto aspect-[4/5] max-h-[34rem] w-full max-w-md select-none overflow-hidden border border-[var(--line)] bg-black/40 sm:aspect-[5/4] sm:max-w-none">
        {/* After (underneath, fully visible) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <MuscleMap view="front" highlight={[...grown]} className="h-[92%] w-auto" />
        </div>
        <span className="absolute right-3 top-12 bg-[var(--accent-fill)] px-2 py-1 font-label text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--accent-ink)]">
          {afterLabel}
        </span>

        {/* Before (on top, clipped from the right) */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-[#16161a]"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          aria-hidden
        >
          <MuscleMap view="front" className="h-[84%] w-auto opacity-70" />
          <span className="absolute left-3 top-12 bg-black/70 px-2 py-1 font-label text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">
            {beforeLabel}
          </span>
        </div>

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-[var(--accent)]"
          style={{ left: `${pos}%` }}
          aria-hidden
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[var(--accent-fill)] text-[var(--accent-ink)] group-focus-within:ring-2 group-focus-within:ring-white">
            <span className="font-label text-lg font-bold leading-none">↔</span>
          </span>
        </div>

        <SampleBadge className="absolute left-3 top-3" />

        <label htmlFor={id} className="sr-only">
          Before and after comparison. Move left to show more of the before image, right for more of
          the after.
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuetext={`${pos}% before, ${100 - pos}% after`}
          className="ba-range"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
        <SampleBadge />
        {caption}
      </figcaption>
    </figure>
  )
}
