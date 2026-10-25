import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react'
import type { Testimonial } from '../content/results'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { GlassCard, SampleBadge } from './ui'

const INTERVAL_MS = 7000

/**
 * Testimonial carousel. Autoplay is off under reduced motion, pauses on hover/keyboard focus, and has an
 * explicit play/pause button (WCAG 2.2.2). Slide changes fade in 250 ms (none when reduced).
 */
export function TestimonialCarousel({ items }: { items: readonly Testimonial[] }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  // null = follow the user's motion preference; true/false = explicit choice from the button.
  const [choice, setChoice] = useState<boolean | null>(null)
  const [hovering, setHovering] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)

  const userPlaying = choice ?? !reduced
  const running = userPlaying && !hovering && !focusWithin
  const count = items.length

  useEffect(() => {
    if (!running) return
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS)
    return () => window.clearInterval(t)
  }, [running, count])

  const go = (n: number) => setIndex((n + count) % count)
  const t = items[index]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={(e) => {
        // Only keyboard focus pauses; a mouse click on Play must not leave it paused.
        if (e.target.matches(':focus-visible')) setFocusWithin(true)
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocusWithin(false)
      }}
    >
      <GlassCard className="relative min-h-[18rem] overflow-hidden p-6 md:p-10">
        <Quote
          className="absolute right-5 top-5 text-[var(--accent)] opacity-30"
          size={56}
          aria-hidden
        />
        <div aria-live={running ? 'off' : 'polite'} aria-atomic="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={t.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <SampleBadge />
              <blockquote className="mt-5 max-w-3xl text-balance text-xl font-semibold leading-snug md:text-3xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <span className="eyebrow !text-[var(--text)]">{t.name}</span>
                <span className="ml-3 text-sm text-muted">{t.detail}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </GlassCard>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-ghost !px-3" onClick={() => go(index - 1)}>
          <ChevronLeft size={18} aria-hidden />
          <span className="sr-only">Previous testimonial</span>
        </button>
        <button type="button" className="btn btn-ghost !px-3" onClick={() => go(index + 1)}>
          <ChevronRight size={18} aria-hidden />
          <span className="sr-only">Next testimonial</span>
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          aria-pressed={!userPlaying}
          onClick={() => setChoice(!userPlaying)}
        >
          {userPlaying ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
          {userPlaying ? 'Pause' : 'Play'}
          <span className="sr-only"> automatic rotation</span>
        </button>
        <div className="ml-auto flex items-center" role="group" aria-label="Choose testimonial">
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className="group flex h-11 w-8 items-center justify-center"
            >
              <span
                className={`block h-[3px] w-6 transition-colors ${i === index ? 'bg-[var(--accent)]' : 'bg-[var(--line)] group-hover:bg-[var(--muted)]'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
