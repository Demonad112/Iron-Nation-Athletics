// localStorage can throw (private windows, blocked site data), so every access is wrapped.
export function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStore(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage unavailable: the setting simply won't persist */
  }
}
