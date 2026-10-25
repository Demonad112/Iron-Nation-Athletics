import type { SVGProps } from 'react'

// Code-made illustration set. Everything draws with currentColor / CSS tokens so it
// follows the active brand scope. Decorative by default (aria-hidden).
type ArtProps = SVGProps<SVGSVGElement>

const base = { 'aria-hidden': true, focusable: false, fill: 'none' } as const

export function Barbell(props: ArtProps) {
  return (
    <svg viewBox="0 0 600 160" {...base} {...props}>
      <rect x="40" y="74" width="520" height="12" fill="var(--accent-2)" />
      <rect x="150" y="68" width="300" height="24" fill="var(--text)" opacity="0.18" />
      {[
        [64, 20, 120],
        [88, 20, 100],
        [112, 14, 80],
      ].map(([x, w, h]) => (
        <g key={x}>
          <rect x={x} y={80 - h / 2} width={w} height={h} fill="var(--accent)" />
          <rect x={600 - x - w} y={80 - h / 2} width={w} height={h} fill="var(--accent)" />
        </g>
      ))}
      <rect x="40" y="62" width="14" height="36" fill="var(--text)" opacity="0.7" />
      <rect x="546" y="62" width="14" height="36" fill="var(--text)" opacity="0.7" />
    </svg>
  )
}

export function Dumbbell(props: ArtProps) {
  return (
    <svg viewBox="0 0 240 120" {...base} {...props}>
      <rect x="70" y="52" width="100" height="16" fill="var(--accent-2)" />
      <rect x="20" y="22" width="26" height="76" fill="var(--accent)" />
      <rect x="46" y="32" width="18" height="56" fill="var(--accent)" opacity="0.8" />
      <rect x="194" y="22" width="26" height="76" fill="var(--accent)" />
      <rect x="176" y="32" width="18" height="56" fill="var(--accent)" opacity="0.8" />
      <rect x="64" y="46" width="6" height="28" fill="var(--text)" opacity="0.5" />
      <rect x="170" y="46" width="6" height="28" fill="var(--text)" opacity="0.5" />
    </svg>
  )
}

export function Plate(props: ArtProps) {
  return (
    <svg viewBox="0 0 200 200" {...base} {...props}>
      <circle cx="100" cy="100" r="92" fill="var(--accent)" />
      <circle cx="100" cy="100" r="76" stroke="#000" strokeOpacity="0.25" strokeWidth="3" />
      <circle cx="100" cy="100" r="62" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
      <circle cx="100" cy="100" r="18" fill="var(--bg)" />
      <circle cx="100" cy="100" r="18" stroke="var(--text)" strokeOpacity="0.5" strokeWidth="3" />
      <text
        x="100"
        y="58"
        textAnchor="middle"
        fontFamily="Bebas Neue, Impact, sans-serif"
        fontSize="20"
        fill="#fff"
        fillOpacity="0.85"
        letterSpacing="3"
      >
        20 KG
      </text>
    </svg>
  )
}

export function PlateStack(props: ArtProps) {
  const plates = [
    { w: 200, c: 'var(--accent)' },
    { w: 176, c: 'var(--accent)' },
    { w: 148, c: 'var(--text)' },
    { w: 120, c: 'var(--accent-2)' },
    { w: 92, c: 'var(--accent)' },
  ]
  return (
    <svg viewBox="0 0 220 220" {...base} {...props}>
      <rect x="104" y="14" width="12" height="190" fill="var(--text)" opacity="0.5" />
      {plates.map((p, i) => (
        <rect
          key={i}
          x={110 - p.w / 2}
          y={176 - i * 30}
          width={p.w}
          height="26"
          fill={p.c}
          opacity={p.c === 'var(--text)' ? 0.85 : 1}
        />
      ))}
    </svg>
  )
}

export function Kettlebell(props: ArtProps) {
  return (
    <svg viewBox="0 0 200 220" {...base} {...props}>
      <path
        d="M68 78 C60 20 140 20 132 78"
        stroke="var(--accent-2)"
        strokeWidth="18"
        strokeLinecap="square"
      />
      <circle cx="100" cy="142" r="64" fill="var(--accent)" />
      <ellipse
        cx="78"
        cy="122"
        rx="16"
        ry="26"
        fill="#fff"
        opacity="0.15"
        transform="rotate(25 78 122)"
      />
      <rect x="64" y="198" width="72" height="12" fill="var(--accent)" opacity="0.5" />
    </svg>
  )
}

/** Stage-lighting cones. Sits behind portraits and heroes. */
export function Spotlight(props: ArtProps) {
  return (
    <svg viewBox="0 0 400 400" {...base} {...props}>
      <defs>
        <linearGradient id="ina-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="200,0 80,400 320,400" fill="url(#ina-cone)" />
      <polygon points="40,0 -60,400 140,400" fill="url(#ina-cone)" opacity="0.5" />
      <polygon points="360,0 260,400 460,400" fill="url(#ina-cone)" opacity="0.5" />
    </svg>
  )
}

export function ChalkHand(props: ArtProps) {
  return (
    <svg viewBox="0 0 120 140" {...base} {...props}>
      <g fill="currentColor">
        <rect x="22" y="14" width="14" height="56" rx="7" transform="rotate(-12 29 42)" />
        <rect x="42" y="6" width="14" height="62" rx="7" transform="rotate(-4 49 37)" />
        <rect x="62" y="6" width="14" height="62" rx="7" transform="rotate(4 69 37)" />
        <rect x="82" y="16" width="14" height="52" rx="7" transform="rotate(14 89 42)" />
        <path d="M18 80 C4 70 -4 90 14 104 L34 128 C60 144 92 136 98 108 L98 66 L26 66 Z" />
      </g>
    </svg>
  )
}

export function HeartRateLine(props: ArtProps) {
  return (
    <svg viewBox="0 0 400 80" {...base} {...props}>
      <polyline
        points="0,40 90,40 110,40 124,12 142,68 158,26 170,40 260,40 280,40 294,16 310,62 324,40 400,40"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

/** Portrait fallback: a head-and-shoulders silhouette lit by a spotlight cone. */
export function CoachSilhouette(props: ArtProps) {
  return (
    <svg viewBox="0 0 320 400" {...base} {...props}>
      <path d="M110 0 H210 L300 400 H20 Z" fill="var(--text)" opacity="0.07" />
      <ellipse cx="160" cy="392" rx="120" ry="10" fill="var(--accent)" opacity="0.45" />
      <circle cx="160" cy="150" r="50" fill="var(--text)" opacity="0.2" />
      <path
        d="M52 392 Q54 262 124 232 Q160 250 196 232 Q266 262 268 392 Z"
        fill="var(--text)"
        opacity="0.2"
      />
      <path d="M124 232 Q160 250 196 232 L184 205 H136 Z" fill="var(--accent)" opacity="0.6" />
    </svg>
  )
}
