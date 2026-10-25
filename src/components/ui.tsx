import type { ElementType, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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
    <section className="cut-both bg-[var(--accent)] py-20 text-white md:py-24">
      <div className="container-ina flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="font-heading text-balance text-4xl uppercase md:text-6xl">{title}</h2>
          <p className="mt-3 text-base text-white/85 md:text-lg">{body}</p>
        </div>
        <Link to={cta.to} className="btn bg-[#0a0a0b] !text-white hover:bg-black">
          {cta.label}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  )
}
