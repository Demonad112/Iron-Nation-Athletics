import { usePrefersReducedMotion } from './useMediaQuery'

/** Staggered scroll reveal props for framer-motion elements; empty under reduced motion. */
export function useReveal() {
  const reduced = usePrefersReducedMotion()
  return (i = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.35, delay: Math.min(i * 0.06, 0.24), ease: 'easeOut' as const },
        }
}
