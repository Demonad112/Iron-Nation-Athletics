import type { CheckInEntry, ClientProfile } from '../types/client'
import { readStore, writeStore } from './storage'

export const CODE_PATTERN = /^INA-[A-Z0-9]{2,12}$/
export const DEMO_CODES = [
  { code: 'INA-DEMO', label: 'Hypertrophy · lean bulk' },
  { code: 'INA-PREP', label: 'Contest prep · online' },
  { code: 'INA-REHAB', label: 'Train + Recover' },
] as const

export const LAST_CODE_KEY = 'ina.portal.code'
export const doneKey = (code: string) => `ina.portal.done.${code}`
export const checkInKey = (code: string) => `ina.portal.checkin.${code}`

/** Trim, drop inner spaces, upper-case; a bare "DEMO" becomes "INA-DEMO". */
export function normaliseCode(raw: string): string {
  const c = raw.replace(/\s+/g, '').toUpperCase()
  return /^[A-Z0-9]{2,12}$/.test(c) && !c.startsWith('INA') ? `INA-${c}` : c
}

export type PortalErrorKind = 'format' | 'notfound' | 'network' | 'malformed'

export class PortalError extends Error {
  kind: PortalErrorKind
  constructor(kind: PortalErrorKind) {
    super(kind)
    this.kind = kind
  }
}

export const portalErrorMessage: Record<PortalErrorKind, string> = {
  format: 'Codes look like INA-DEMO: letters and numbers after “INA-”.',
  notfound: 'Code not found. Check it and try again.',
  network: 'Could not reach the portal. Check your connection and try again.',
  malformed: 'This profile could not be read. Please tell Cody the file looks damaged.',
}

const TOP_LEVEL = ['overview', 'training', 'nutrition', 'progress', 'guidance'] as const

/**
 * Loads a demo profile. The code is checked against CODE_PATTERN before it goes anywhere near a
 * URL, so it can never contain slashes or dots (no path traversal), and the base path comes from
 * BASE_URL so it works under /Iron-Nation-Athletics/.
 */
export async function fetchClient(code: string, signal?: AbortSignal): Promise<ClientProfile> {
  if (!CODE_PATTERN.test(code)) throw new PortalError('format')
  let res: Response
  try {
    res = await fetch(`${import.meta.env.BASE_URL}clients/${code}.json`, { signal })
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err
    throw new PortalError('network')
  }
  if (res.status === 404) throw new PortalError('notfound')
  if (!res.ok) throw new PortalError('network')
  let data: unknown
  try {
    data = await res.json()
  } catch {
    // Static hosts and the preview server may answer an unknown file with the HTML shell.
    if ((res.headers.get('content-type') ?? '').includes('text/html'))
      throw new PortalError('notfound')
    throw new PortalError('malformed')
  }
  const d = data as Partial<ClientProfile> | null
  if (!d || typeof d !== 'object' || d.code !== code || TOP_LEVEL.some((k) => !(k in d)))
    throw new PortalError('malformed')
  return d as ClientProfile
}

// ---- per-code persisted state ----

export function readDone(code: string): string[] {
  try {
    const v: unknown = JSON.parse(readStore(doneKey(code)) ?? '[]')
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export const writeDone = (code: string, done: string[]) =>
  writeStore(doneKey(code), JSON.stringify(done))

export interface CheckInDraft {
  bodyweightKg: string
  waistCm: string
  sleep: number
  energy: number
  stress: number
  hunger: number
  adherence: string
  notes: string
  savedAt: string | null
}

export function defaultCheckIn(client: ClientProfile): CheckInDraft {
  const last = client.progress.checkIns[0] as CheckInEntry | undefined
  return {
    bodyweightKg: last ? String(last.bodyweightKg) : '',
    waistCm: last ? String(last.waistCm) : '',
    sleep: 7,
    energy: 7,
    stress: 4,
    hunger: 5,
    adherence: String(client.overview.adherence),
    notes: '',
    savedAt: null,
  }
}

const clamp = (n: unknown, d: number) =>
  typeof n === 'number' && n >= 1 && n <= 10 ? Math.round(n) : d

export function readCheckIn(client: ClientProfile): CheckInDraft {
  const base = defaultCheckIn(client)
  try {
    const v = JSON.parse(
      readStore(checkInKey(client.code)) ?? 'null',
    ) as Partial<CheckInDraft> | null
    if (!v || typeof v !== 'object') return base
    return {
      bodyweightKg: typeof v.bodyweightKg === 'string' ? v.bodyweightKg : base.bodyweightKg,
      waistCm: typeof v.waistCm === 'string' ? v.waistCm : base.waistCm,
      sleep: clamp(v.sleep, base.sleep),
      energy: clamp(v.energy, base.energy),
      stress: clamp(v.stress, base.stress),
      hunger: clamp(v.hunger, base.hunger),
      adherence: typeof v.adherence === 'string' ? v.adherence : base.adherence,
      notes: typeof v.notes === 'string' ? v.notes : '',
      savedAt: typeof v.savedAt === 'string' ? v.savedAt : null,
    }
  } catch {
    return base
  }
}
export const writeCheckIn = (code: string, draft: CheckInDraft) =>
  writeStore(checkInKey(code), JSON.stringify(draft))

/** Plain-text check-in the client can paste into a message to Cody. */
export function buildCheckInText(
  client: ClientProfile,
  d: CheckInDraft,
  today = new Date(),
): string {
  const iso = today.toISOString().slice(0, 10)
  const num = (s: string, unit: string) => (s.trim() ? `${s.trim()} ${unit}` : 'not entered')
  return [
    `Weekly check-in: ${client.displayName} (${client.code})`,
    `Date: ${iso} · Week ${client.overview.week} of ${client.overview.totalWeeks}`,
    '',
    `Bodyweight: ${num(d.bodyweightKg, 'kg')}`,
    `Waist: ${num(d.waistCm, 'cm')}`,
    `Sleep: ${d.sleep}/10`,
    `Energy: ${d.energy}/10`,
    `Stress: ${d.stress}/10`,
    `Hunger: ${d.hunger}/10`,
    `Plan adherence: ${d.adherence.trim() ? `${d.adherence.trim()}%` : 'not entered'}`,
    '',
    'Notes:',
    d.notes.trim() || 'None',
  ].join('\n')
}

// ---- dates ----

/** Parses YYYY-MM-DD as a local date (new Date('2026-10-31') would be UTC and can show the day before). */
export function parseDate(s: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s)
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(s)
}

export const fmtDate = (s: string, withYear = true) =>
  parseDate(s).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  })

export const fmtDateTime = (s: string) =>
  parseDate(s).toLocaleString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

export function daysUntil(s: string, now = new Date()): number {
  const a = parseDate(s)
  const startA = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime()
  const startB = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return Math.round((startA - startB) / 86_400_000)
}

export function relativeDays(s: string, now = new Date()): string {
  const n = daysUntil(s, now)
  if (n === 0) return 'today'
  if (n === 1) return 'tomorrow'
  if (n === -1) return 'yesterday'
  return n > 0 ? `in ${n} days` : `${-n} days ago`
}

export const fmtRest = (sec: number) =>
  sec === 0
    ? 'none'
    : sec < 60
      ? `${sec}s`
      : `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
