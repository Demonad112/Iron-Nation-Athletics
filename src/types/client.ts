import type { MuscleGroup } from '../art/muscles'

// Shape of a client profile served from public/clients/<CODE>.json.
// scripts/validate-clients.ts enforces the same shape at build time (keep the two in step).

export interface ClientOverview {
  monthFocus: string
  phase: string
  week: number
  totalWeeks: number
  coachNote: string
  nextCheckIn: string // ISO date
  nextRmt: string | null // ISO date-time, null when the client has no RMT service
  adherence: number // 0-100
  mode: 'in-person' | 'online'
  goal: string
  /** Optional show/event, drives the countdown on the Overview tab (contest prep). */
  event?: { name: string; date: string }
}

export interface TrainingSet {
  sets: number
  reps: string // "8-10", "AMRAP", "30s"
  rpe?: number
  rir?: number
  restSec: number
  tempo?: string // e.g. "3-1-1-0"
}

export interface Exercise extends TrainingSet {
  name: string
  notes?: string
  swap?: string // swap note
}

export interface TrainingDay {
  id: string
  name: string
  focus: string
  muscles: MuscleGroup[]
  exercises: Exercise[]
}

export interface TrainingWeek {
  week: number
  label: string
  days: TrainingDay[]
}

export interface Macros {
  kcal: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  name: string
  time: string
  items: string[]
  macros: Macros
}

export interface GroceryGroup {
  category: string
  items: string[]
}

export interface Supplement {
  name: string
  dose: string
  timing: string
  note: string
}

export interface Nutrition {
  trainingDay: { targets: Macros; meals: Meal[] }
  restDay: { targets: Macros; meals: Meal[] }
  grocery: GroceryGroup[]
  supplements: Supplement[]
  notes?: string
}

export interface CheckInEntry {
  date: string
  bodyweightKg: number
  waistCm: number
  sleep: number
  energy: number
  stress: number
  hunger: number
  adherence: number
  notes: string
}

export interface StrengthPR {
  lift: string
  weightKg: number
  reps: number
  date: string
  previousKg: number | null
}

export interface SeriesPoint {
  date: string
  value: number
}

export interface Progress {
  strengthPRs: StrengthPR[]
  bodyweight: SeriesPoint[]
  waist: SeriesPoint[]
  checkIns: CheckInEntry[]
}

export interface RmtSession {
  date: string
  therapist: string
  durationMin: number
  service: string
  areas: MuscleGroup[]
  notes: string
}

export interface MobilityDrill {
  name: string
  prescription: string
  cue: string
}

export interface Recovery {
  sessions: RmtSession[]
  treatedAreas: MuscleGroup[]
  mobility: { title: string; frequency: string; drills: MobilityDrill[] }
  nextBooking: { date: string; service: string; durationMin: number } | null
}

export interface EducationSnippet {
  title: string
  body: string
}

export interface Guidance {
  month: string
  habits: string[]
  focusCues: string[]
  education: EducationSnippet[]
  rules: string[]
}

export interface ClientProfile {
  code: string
  displayName: string // first name + initial placeholder
  persona: string
  overview: ClientOverview
  training: TrainingWeek[]
  nutrition: Nutrition
  progress: Progress
  recovery: Recovery | null // null: client is not on a MyoMedic service (shows the add-on CTA)
  guidance: Guidance
}
