import { useSyncExternalStore } from 'react'
import { readStore, writeStore } from './storage'

// Small external store so the footer toggle and the canvas stay in sync without a provider.
export interface BackgroundSettings {
  /** Darken the background behind the glass blocks. */
  dim: boolean
  /** Animate the particles and forge glow. Reduced-motion forces this off at render time. */
  animated: boolean
}

const KEY = 'ina.bg.v1'
const DEFAULTS: BackgroundSettings = { dim: true, animated: true }

function load(): BackgroundSettings {
  const raw = readStore(KEY)
  if (!raw) return DEFAULTS
  try {
    const parsed = JSON.parse(raw) as Partial<BackgroundSettings>
    return {
      dim: typeof parsed.dim === 'boolean' ? parsed.dim : DEFAULTS.dim,
      animated: typeof parsed.animated === 'boolean' ? parsed.animated : DEFAULTS.animated,
    }
  } catch {
    return DEFAULTS
  }
}

let state = load()
const listeners = new Set<() => void>()

export function setBackgroundSettings(patch: Partial<BackgroundSettings>): void {
  state = { ...state, ...patch }
  writeStore(KEY, JSON.stringify(state))
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useBackgroundSettings(): BackgroundSettings {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => DEFAULTS,
  )
}
