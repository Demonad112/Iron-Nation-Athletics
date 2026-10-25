/** SVG progress ring with a text alternative (role="img" + label), plus the number inside. */
export function AdherenceRing({ value, size = 132 }: { value: number; size?: number }) {
  const stroke = 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  const label = `Plan adherence ${Math.round(pct)} percent`
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label={label}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--line)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          style={{ transition: 'stroke-dashoffset 0.4s ease-out' }}
        />
      </svg>
      <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading tabular text-4xl leading-none">{Math.round(pct)}%</span>
        <span className="eyebrow mt-1 !text-[0.6rem] !tracking-[0.1em] !text-[var(--muted)]">
          Adherence
        </span>
      </div>
    </div>
  )
}
