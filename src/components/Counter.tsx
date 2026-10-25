import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'

function format(n: number, compact?: boolean) {
  if (compact && n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  return n.toLocaleString('en-CA')
}

export function Stat({
  value,
  suffix = '',
  label,
  compact,
}: {
  value: number
  suffix?: string
  label: string
  compact?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shown = useCountUp(value, inView)

  return (
    <div ref={ref} className="text-center md:text-left">
      <p className="font-heading tabular text-5xl text-[var(--text)] md:text-6xl">
        {format(shown, compact)}
        <span className="text-[var(--accent)]">{suffix}</span>
      </p>
      <p className="eyebrow mt-1 !text-[var(--muted)]">{label}</p>
    </div>
  )
}
