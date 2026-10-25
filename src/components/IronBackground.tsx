import { useEffect, useRef } from 'react'
import { useBackgroundSettings } from '../hooks/useBackgroundSettings'
import { usePhone, usePrefersReducedMotion } from '../hooks/useMediaQuery'

// Full-page background behind the glass blocks:
//   canvas  -> drifting chalk dust + a slow-pulsing red forge glow (parallax on scroll)
//   .knurl  -> faint diamond steel texture
//   dim     -> optional darkening layer so text stays readable over the glow

interface Mote {
  x: number // 0..1 of width
  y: number // 0..1 of height
  r: number // px radius
  vy: number // fractions of height per second (upwards)
  sway: number
  phase: number
  alpha: number
  depth: number // parallax factor
}

// Seeded so the dust field looks the same on every load.
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeMotes(count: number): Mote[] {
  const rand = rng(20261025)
  return Array.from({ length: count }, () => ({
    x: rand(),
    y: rand(),
    r: 0.6 + rand() * 1.8,
    vy: 0.004 + rand() * 0.012,
    sway: 0.004 + rand() * 0.01,
    phase: rand() * Math.PI * 2,
    alpha: 0.08 + rand() * 0.28,
    depth: 0.2 + rand() * 0.8,
  }))
}
const FORGE_PERIOD_S = 11
const PHONE_FRAME_MS = 1000 / 30

export function IronBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { dim, animated } = useBackgroundSettings()
  const reduced = usePrefersReducedMotion()
  const phone = usePhone()
  const run = animated && !reduced

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Lighter field on phones: fewer motes, lower DPR, 30 fps cap.
    const motes = makeMotes(phone ? 26 : 80)
    const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1 : 1.5)
    let w = 0
    let h = 0
    let scrollY = window.scrollY
    let raf = 0
    let last = 0
    let t0 = performance.now()
    let elapsed = 0

    const size = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, w, h)

      // Forge glow: pulses 0.55..1 of its strength on an ~11 s cycle, drifts with scroll.
      const pulse = run ? 0.775 + 0.225 * Math.sin((seconds / FORGE_PERIOD_S) * Math.PI * 2) : 0.8
      const gx = w * 0.5
      const gy = h * 0.3 - scrollY * 0.12
      const gr = Math.max(w, h) * 0.62
      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr)
      glow.addColorStop(0, `rgba(226, 59, 46, ${0.26 * pulse})`)
      glow.addColorStop(0.45, `rgba(160, 30, 22, ${0.1 * pulse})`)
      glow.addColorStop(1, 'rgba(10, 10, 11, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      // Chalk dust.
      for (const m of motes) {
        const travel = run ? seconds * m.vy : 0
        const y = (((m.y - travel) % 1) + 1) % 1
        const x = m.x + (run ? Math.sin(seconds * 0.4 + m.phase) * m.sway : 0)
        const py = y * h - scrollY * m.depth * 0.08
        const wrapped = ((py % h) + h) % h
        ctx.globalAlpha = m.alpha
        ctx.fillStyle = '#f4f4f5'
        ctx.beginPath()
        ctx.arc(x * w, wrapped, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (phone && now - last < PHONE_FRAME_MS) return
      last = now
      elapsed = (now - t0) / 1000
      draw(elapsed)
    }

    const start = () => {
      if (raf || !run) return
      t0 = performance.now() - elapsed * 1000
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onScroll = () => {
      scrollY = window.scrollY
      if (!run) draw(0) // static frame still parallaxes slightly
    }
    const onResize = () => {
      size()
      draw(elapsed)
    }
    // Pause when the tab is hidden: no wasted frames, no battery drain.
    const onVisibility = () => (document.hidden ? stop() : start())

    size()
    draw(0)
    start()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [run, phone])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[#0a0a0b]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="knurl absolute inset-0 opacity-70"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, transparent 85%)',
        }}
      />
      <div
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: dim ? 0.45 : 0 }}
      />
    </div>
  )
}
