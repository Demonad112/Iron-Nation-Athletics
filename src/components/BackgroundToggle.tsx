import { Eye, EyeOff, Pause, Play } from 'lucide-react'
import { setBackgroundSettings, useBackgroundSettings } from '../hooks/useBackgroundSettings'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

export function BackgroundToggle() {
  const { dim, animated } = useBackgroundSettings()
  const reduced = usePrefersReducedMotion()

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Background settings">
      <button
        type="button"
        className="btn btn-ghost !min-h-9 !px-3 !text-[0.7rem]"
        aria-pressed={dim}
        onClick={() => setBackgroundSettings({ dim: !dim })}
      >
        {dim ? <EyeOff size={14} aria-hidden /> : <Eye size={14} aria-hidden />}
        Background dim: {dim ? 'On' : 'Off'}
      </button>
      <button
        type="button"
        className="btn btn-ghost !min-h-9 !px-3 !text-[0.7rem] disabled:cursor-not-allowed disabled:opacity-50"
        aria-pressed={animated && !reduced}
        disabled={reduced}
        title={reduced ? 'Your system asks for reduced motion' : undefined}
        onClick={() => setBackgroundSettings({ animated: !animated })}
      >
        {animated && !reduced ? <Pause size={14} aria-hidden /> : <Play size={14} aria-hidden />}
        Animation: {animated && !reduced ? 'On' : 'Off'}
      </button>
    </div>
  )
}
