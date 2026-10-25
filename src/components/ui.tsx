import { useId, useRef, useState } from 'react'
import type { ElementType, KeyboardEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-heading text-balance text-4xl uppercase md:text-5xl">{title}</h2>
      <span className={`rule mt-4 ${align === 'center' ? 'mx-auto' : ''}`} />
      {lead && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{lead}</p>}
    </div>
  )
}

export function GlassCard({
  as: Tag = 'div',
  className = '',
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return <Tag className={`glass ${className}`}>{children}</Tag>
}

export function SampleBadge({ className = '' }: { className?: string }) {
  return <span className={`sample-badge ${className}`}>Sample</span>
}

export function ButtonLink({
  to,
  variant = 'primary',
  arrow = false,
  children,
}: {
  to: string
  variant?: 'primary' | 'ghost'
  arrow?: boolean
  children: ReactNode
}) {
  return (
    <Link to={to} className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'}`}>
      {children}
      {arrow && <ArrowRight size={16} aria-hidden />}
    </Link>
  )
}

export function CTABand({
  title,
  body,
  cta,
}: {
  title: string
  body: string
  cta: { label: string; to: string }
}) {
  return (
    <section className="cut-both bg-[var(--accent-fill)] py-20 text-white md:py-24">
      <div className="container-ina flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="font-heading text-balance text-4xl uppercase md:text-6xl">{title}</h2>
          <p className="mt-3 text-base text-white md:text-lg">{body}</p>
        </div>
        {cta.to.startsWith('#/') || cta.to.startsWith('/') ? (
          <Link
            to={cta.to.startsWith('#') ? cta.to.slice(1) : cta.to}
            className="btn bg-[#0a0a0b] !text-white hover:bg-black"
          >
            {cta.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        ) : (
          <a
            href={cta.to}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#0a0a0b] !text-white hover:bg-black"
          >
            {cta.label}
            <ArrowRight size={16} aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </section>
  )
}

/** Page-level heading block: the one <h1> on each marketing page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  eyebrow: string
  title: string
  lead?: string
  children?: ReactNode
  aside?: ReactNode
}) {
  return (
    <section className="container-ina grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="font-heading text-balance text-5xl uppercase leading-[0.95] sm:text-6xl md:text-7xl">
          {title}
        </h1>
        <span className="rule mt-5" />
        {lead && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
      {aside && <div className="hidden lg:block">{aside}</div>}
    </section>
  )
}

/**
 * Button for a URL that may be an in-app hash route ("#/contact", rendered as a router link) or
 * an external booking link (opens in a new tab).
 */
export function ButtonAnchor({
  href,
  variant = 'primary',
  arrow = false,
  children,
}: {
  href: string
  variant?: 'primary' | 'ghost'
  arrow?: boolean
  children: ReactNode
}) {
  if (href.startsWith('#/')) {
    return (
      <ButtonLink to={href.slice(1)} variant={variant} arrow={arrow}>
        {children}
      </ButtonLink>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'}`}
    >
      {children}
      {arrow && <ArrowRight size={16} aria-hidden />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export interface FAQItem {
  q: string
  a: string
}

/** Accordion: one panel open at a time, each header is a real button. */
export function FAQ({ items }: { items: readonly FAQItem[] }) {
  const base = useId()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="glass divide-y divide-[var(--line)]">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <h3 className="!font-body !text-base !normal-case !leading-snug">
              <button
                type="button"
                id={`${base}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[3.25rem] w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold hover:bg-white/5 md:px-6"
              >
                {item.q}
                <ChevronDown
                  size={18}
                  aria-hidden
                  className={`shrink-0 text-[var(--accent)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={`${base}-a${i}`}
              role="region"
              aria-labelledby={`${base}-q${i}`}
              className="acc-panel"
              data-open={isOpen}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed text-muted md:px-6">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export interface TabItem {
  id: string
  label: string
}

/**
 * Tabs per the WAI-ARIA pattern: tablist/tab/tabpanel, roving tabindex, arrow keys, Home/End.
 * Activation follows focus. The caller owns the selected value (so it can live in the URL).
 */
export function Tabs({
  tabs,
  value,
  onChange,
  label,
  children,
}: {
  tabs: readonly TabItem[]
  value: string
  onChange: (id: string) => void
  label: string
  children: ReactNode
}) {
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const index = Math.max(
    0,
    tabs.findIndex((t) => t.id === value),
  )

  const onKeyDown = (e: KeyboardEvent) => {
    const last = tabs.length - 1
    let next = -1
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    if (next < 0) return
    e.preventDefault()
    onChange(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:overflow-visible md:px-0">
        <div
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="flex min-w-max border-b border-[var(--line)] md:min-w-0"
        >
          {tabs.map((t, i) => {
            const selected = i === index
            return (
              <button
                key={t.id}
                ref={(el) => {
                  refs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${t.id}`}
                aria-selected={selected}
                aria-controls={selected ? `${base}-panel` : undefined}
                tabIndex={selected ? 0 : -1}
                onClick={() => onChange(t.id)}
                className={`relative min-h-[3rem] whitespace-nowrap px-5 py-3 font-label text-xs font-bold uppercase tracking-[0.18em] transition-colors md:flex-1 ${
                  selected ? 'bg-white/5 text-[var(--text)]' : 'text-muted hover:text-[var(--text)]'
                }`}
              >
                {t.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 bottom-[-1px] h-[3px] bg-[var(--accent)] transition-transform duration-200 ${
                    selected ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
      <div
        key={value}
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${tabs[index].id}`}
        tabIndex={0}
        className="fade-in pt-8"
      >
        {children}
      </div>
    </div>
  )
}

function formatStat(n: number, compact?: boolean) {
  if (compact && n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  return n.toLocaleString('en-CA')
}

/** Animated counter that ticks up once when scrolled into view. */
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
        {formatStat(shown, compact)}
        <span className="text-[var(--accent)]">{suffix}</span>
      </p>
      <p className="eyebrow mt-1 !text-[var(--muted)]">{label}</p>
    </div>
  )
}
