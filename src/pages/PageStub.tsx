import { Lock } from 'lucide-react'
import { ButtonLink, GlassCard, SectionHeading } from '../components/ui'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

interface Props {
  eyebrow: string
  title: string
  description: string
  batch: 2 | 3
  /** Shown in the page's meta description. */
  meta: string
}

// Route stub: real page body arrives in the batch named by `batch` (see BUILD_PLAN §7).
export default function PageStub({ eyebrow, title, description, batch, meta }: Props) {
  useDocumentMeta(title, meta)
  return (
    <section className="container-ina py-20 md:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} lead={description} />
      <GlassCard className="max-w-xl p-7">
        <p className="eyebrow flex items-center gap-2">
          <Lock size={14} aria-hidden /> In build
        </p>
        <p className="mt-3 text-[var(--muted)]">
          This page is part of the showcase and is scheduled for build batch {batch}. The
          navigation, routing and design system around it are live.
        </p>
        <div className="mt-6">
          <ButtonLink to="/" variant="ghost">
            Back to home
          </ButtonLink>
        </div>
      </GlassCard>
    </section>
  )
}
