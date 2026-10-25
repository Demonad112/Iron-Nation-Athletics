import { useState } from 'react'

const asset = (name: string) => `${import.meta.env.BASE_URL}brand/${name}`

/** Light-on-dark INA wordmark: heavy "IRON" with a red dumbbell "I", spaced "NATION ATHLETICS". */
export function IronWordmark({
  className = '',
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  return (
    <svg
      viewBox="0 0 220 64"
      role="img"
      aria-label="Iron Nation Athletics"
      className={className}
      fill="none"
    >
      <g fill="#E23B2E">
        <rect x="2" y="4" width="22" height="9" />
        <rect x="2" y="36" width="22" height="9" />
        <rect x="9" y="13" width="8" height="23" />
      </g>
      <text
        x="30"
        y="45"
        fontFamily="'Bebas Neue', Impact, sans-serif"
        fontSize="58"
        fill="#F4F4F5"
        letterSpacing="1"
        textLength="188"
        lengthAdjust="spacingAndGlyphs"
      >
        IRON
      </text>
      {!compact && (
        <text
          x="2"
          y="62"
          fontFamily="Lato, sans-serif"
          fontWeight="700"
          fontSize="9.5"
          fill="#F4F4F5"
          letterSpacing="4.6"
        >
          NATION ATHLETICS
        </text>
      )}
    </svg>
  )
}

/** Light-on-dark MyoMedic mark: red disc with a medkit cross, plus the wordmark. */
export function MyoMedicWordmark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 230 64" role="img" aria-label="MyoMedic" className={className} fill="none">
      <circle cx="30" cy="32" r="28" fill="#E8473B" />
      <g stroke="#0B1220" strokeWidth="3" strokeLinejoin="round">
        <rect x="14" y="22" width="32" height="22" rx="3" />
        <path d="M24 22v-4h12v4" />
        <path d="M30 28v10M25 33h10" />
      </g>
      <text
        x="68"
        y="25"
        fontFamily="Montserrat, sans-serif"
        fontWeight="600"
        fontSize="12"
        fill="#9AA7BA"
      >
        Massage Therapy
      </text>
      <text
        x="68"
        y="48"
        fontFamily="Montserrat, sans-serif"
        fontWeight="600"
        fontSize="26"
        fill="#E8473B"
      >
        MyoMedic
      </text>
      <rect x="68" y="53" width="158" height="3" fill="#EEF2F7" />
    </svg>
  )
}

interface BadgeProps {
  brand: 'ina' | 'myomedic'
  className?: string
}

/** The supplied logo on a white badge. Falls back to the SVG wordmark if the file is missing. */
export function LogoBadge({ brand, className = '' }: BadgeProps) {
  const [failed, setFailed] = useState(false)
  const file = brand === 'ina' ? 'iron-nation-logo.jpg' : 'myomedic-logo.jpg'
  const alt = brand === 'ina' ? 'Iron Nation Athletics logo' : 'MyoMedic Massage Therapy logo'

  if (failed) {
    return brand === 'ina' ? (
      <IronWordmark className={className} />
    ) : (
      <MyoMedicWordmark className={className} />
    )
  }
  return (
    <img
      src={asset(file)}
      alt={alt}
      width={500}
      height={500}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`bg-white object-contain ${className}`}
    />
  )
}
