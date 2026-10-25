import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './useMediaQuery'

/** Ticks from 0 to `target` once `active` flips true. 400 ms cap per the motion rules. */
export function useCountUp(target: number, active: boolean, durationMs = 400): number {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (reduced) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, reduced, durationMs])

  return reduced && active ? target : value
}
