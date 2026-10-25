// Validates public/clients/*.json against the shapes in src/types/client.ts. Runs from `prebuild`
// and in CI, so a bad demo file fails the build with a readable path-by-path message.
// Hand-rolled on purpose: no schema library for three small files. Keep in step with the types.
import { readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { muscleLabels } from '../src/art/muscles.ts'

const dir = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'public', 'clients')
const CODE = /^INA-[A-Z0-9]{2,12}$/
const DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/
const muscles = new Set(Object.keys(muscleLabels))

type Check = (v: unknown, path: string, errs: string[]) => void
const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const str: Check = (v, p, e) => {
  if (typeof v !== 'string' || v.trim() === '') e.push(`${p}: expected a non-empty string`)
}
const date: Check = (v, p, e) => {
  if (typeof v !== 'string' || !DATE.test(v) || Number.isNaN(Date.parse(v)))
    e.push(`${p}: expected an ISO date (YYYY-MM-DD), got ${JSON.stringify(v)}`)
}
const num =
  (min = -Infinity, max = Infinity): Check =>
  (v, p, e) => {
    if (typeof v !== 'number' || !Number.isFinite(v)) e.push(`${p}: expected a number`)
    else if (v < min || v > max) e.push(`${p}: ${v} is outside ${min}..${max}`)
  }
const oneOf =
  (...opts: string[]): Check =>
  (v, p, e) => {
    if (typeof v !== 'string' || !opts.includes(v))
      e.push(`${p}: expected one of ${opts.join(', ')}, got ${JSON.stringify(v)}`)
  }
const muscle: Check = (v, p, e) => {
  if (typeof v !== 'string' || !muscles.has(v))
    e.push(`${p}: unknown muscle group ${JSON.stringify(v)}`)
}
const arr =
  (item: Check, min = 0): Check =>
  (v, p, e) => {
    if (!Array.isArray(v)) return void e.push(`${p}: expected an array`)
    if (v.length < min) e.push(`${p}: expected at least ${min} item(s)`)
    v.forEach((x, i) => item(x, `${p}[${i}]`, e))
  }
const nullable =
  (c: Check): Check =>
  (v, p, e) => {
    if (v !== null) c(v, p, e)
  }
const obj =
  (shape: Record<string, Check>, optional: string[] = []): Check =>
  (v, p, e) => {
    if (!isObj(v)) return void e.push(`${p}: expected an object`)
    for (const [k, c] of Object.entries(shape)) {
      if (v[k] === undefined) {
        if (!optional.includes(k)) e.push(`${p}.${k}: missing`)
      } else c(v[k], `${p}.${k}`, e)
    }
    for (const k of Object.keys(v)) if (!(k in shape)) e.push(`${p}.${k}: unknown field`)
  }

const macros = (minKcal: number) =>
  obj({ kcal: num(minKcal, 8000), protein: num(0, 600), carbs: num(0, 1000), fat: num(0, 400) })
const meal = obj({ name: str, time: str, items: arr(str, 1), macros: macros(0) })
const dayPlan = obj({ targets: macros(500), meals: arr(meal, 1) })
const series = arr(obj({ date, value: num(0, 500) }), 2)

const profile = obj({
  code: (v, p, e) => {
    if (typeof v !== 'string' || !CODE.test(v)) e.push(`${p}: must match ${CODE}`)
  },
  displayName: str,
  persona: str,
  overview: obj(
    {
      monthFocus: str,
      phase: str,
      week: num(1, 60),
      totalWeeks: num(1, 60),
      coachNote: str,
      nextCheckIn: date,
      nextRmt: nullable(date),
      adherence: num(0, 100),
      mode: oneOf('in-person', 'online'),
      goal: str,
      event: obj({ name: str, date }),
    },
    ['event'],
  ),
  training: arr(
    obj({
      week: num(1, 60),
      label: str,
      days: arr(
        obj({
          id: str,
          name: str,
          focus: str,
          muscles: arr(muscle, 1),
          exercises: arr(
            obj(
              {
                name: str,
                sets: num(1, 20),
                reps: str,
                rpe: num(1, 10),
                rir: num(0, 10),
                restSec: num(0, 600),
                tempo: str,
                notes: str,
                swap: str,
              },
              ['rpe', 'rir', 'tempo', 'notes', 'swap'],
            ),
            1,
          ),
        }),
        1,
      ),
    }),
    1,
  ),
  nutrition: obj(
    {
      trainingDay: dayPlan,
      restDay: dayPlan,
      grocery: arr(obj({ category: str, items: arr(str, 1) }), 1),
      supplements: arr(obj({ name: str, dose: str, timing: str, note: str })),
      notes: str,
    },
    ['notes'],
  ),
  progress: obj({
    strengthPRs: arr(
      obj({
        lift: str,
        weightKg: num(0, 800),
        reps: num(1, 100),
        date,
        previousKg: nullable(num(0, 800)),
      }),
      1,
    ),
    bodyweight: series,
    waist: series,
    checkIns: arr(
      obj({
        date,
        bodyweightKg: num(20, 400),
        waistCm: num(30, 250),
        sleep: num(1, 10),
        energy: num(1, 10),
        stress: num(1, 10),
        hunger: num(1, 10),
        adherence: num(0, 100),
        notes: (v, p, e) => {
          if (typeof v !== 'string') e.push(`${p}: expected a string`)
        },
      }),
    ),
  }),
  recovery: nullable(
    obj({
      sessions: arr(
        obj({
          date,
          therapist: str,
          durationMin: num(10, 240),
          service: str,
          areas: arr(muscle),
          notes: str,
        }),
      ),
      treatedAreas: arr(muscle),
      mobility: obj({
        title: str,
        frequency: str,
        drills: arr(obj({ name: str, prescription: str, cue: str }), 1),
      }),
      nextBooking: nullable(obj({ date, service: str, durationMin: num(10, 240) })),
    }),
  ),
  guidance: obj({
    month: str,
    habits: arr(str, 1),
    focusCues: arr(str, 1),
    education: arr(obj({ title: str, body: str }), 1),
    rules: arr(str, 1),
  }),
})

let failed = 0
const files = readdirSync(dir).filter((f) => f.endsWith('.json'))
if (files.length === 0) {
  console.error(`validate-clients: no .json files in ${dir}`)
  process.exit(1)
}
for (const f of files) {
  const errs: string[] = []
  let data: unknown
  try {
    data = JSON.parse(readFileSync(join(dir, f), 'utf8'))
  } catch (err) {
    errs.push(`not valid JSON: ${(err as Error).message}`)
  }
  if (data !== undefined) {
    profile(data, '$', errs)
    if (isObj(data) && data.code !== basename(f, '.json'))
      errs.push(`$.code: "${String(data.code)}" does not match the file name ${f}`)
  }
  if (errs.length) {
    failed++
    console.error(`\n✗ public/clients/${f}`)
    for (const m of errs.slice(0, 25)) console.error(`  - ${m}`)
    if (errs.length > 25) console.error(`  … and ${errs.length - 25} more`)
  } else console.log(`✓ public/clients/${f}`)
}
if (failed) {
  console.error(`\nvalidate-clients: ${failed} of ${files.length} client file(s) failed.`)
  process.exit(1)
}
