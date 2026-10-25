import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Camera, Check, ClipboardCopy, Printer } from 'lucide-react'
import { GlassCard } from '../ui'
import { buildCheckInText, fmtDate, readCheckIn, writeCheckIn } from '../../hooks/portal'
import type { CheckInDraft } from '../../hooks/portal'
import type { ClientProfile } from '../../types/client'

const SLIDERS = [
  { key: 'sleep', label: 'Sleep', low: 'Poor', high: 'Great' },
  { key: 'energy', label: 'Energy', low: 'Flat', high: 'High' },
  { key: 'stress', label: 'Stress', low: 'Calm', high: 'Maxed' },
  { key: 'hunger', label: 'Hunger', low: 'Full', high: 'Starving' },
] as const

export function CheckInTab({ client }: { client: ClientProfile }) {
  const [draft, setDraft] = useState<CheckInDraft>(() => readCheckIn(client))
  const [today] = useState(() => new Date())
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const fallbackRef = useRef<HTMLTextAreaElement>(null)
  const text = buildCheckInText(client, draft, today)

  // Drafts persist as you type, so a reload never loses work.
  const update = (patch: Partial<CheckInDraft>) => {
    const next = { ...draft, ...patch }
    setDraft(next)
    writeCheckIn(client.code, next)
    setCopyState('idle')
  }
  const onText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    update({ [e.target.name]: e.target.value })

  const save = () => update({ savedAt: new Date().toISOString() })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }
  useEffect(() => {
    if (copyState === 'failed') {
      fallbackRef.current?.focus()
      fallbackRef.current?.select()
    }
  }, [copyState])

  const print = () => {
    const root = document.documentElement
    root.dataset.print = 'checkin'
    const clear = () => {
      delete root.dataset.print
      window.removeEventListener('afterprint', clear)
    }
    window.addEventListener('afterprint', clear)
    window.print()
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <GlassCard className="p-6">
        <h2 className="font-heading text-3xl uppercase">Weekly check-in</h2>
        <p className="mt-1 text-sm text-muted">
          Week {client.overview.week} · due {fmtDate(client.overview.nextCheckIn)}. Saved on this
          device as you type.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {(
            [
              ['bodyweightKg', 'Bodyweight (kg)', '0.1'],
              ['waistCm', 'Waist (cm)', '0.1'],
              ['adherence', 'Adherence (%)', '1'],
            ] as const
          ).map(([name, label, step]) => (
            <div key={name}>
              <label htmlFor={`ci-${name}`} className="mb-1.5 block text-sm font-semibold">
                {label}
              </label>
              <input
                id={`ci-${name}`}
                name={name}
                type="number"
                inputMode="decimal"
                step={step}
                min={name === 'adherence' ? 0 : 20}
                max={name === 'adherence' ? 100 : 400}
                className="field"
                value={draft[name]}
                onChange={onText}
              />
            </div>
          ))}
        </div>

        <div className="mt-7 space-y-6">
          {SLIDERS.map((s) => (
            <div key={s.key}>
              <div className="flex items-baseline justify-between">
                <label htmlFor={`ci-${s.key}`} className="text-sm font-semibold">
                  {s.label}
                </label>
                <output htmlFor={`ci-${s.key}`} className="font-heading tabular text-2xl">
                  {draft[s.key]}
                  <span className="text-sm text-muted"> / 10</span>
                </output>
              </div>
              <input
                id={`ci-${s.key}`}
                type="range"
                min={1}
                max={10}
                step={1}
                value={draft[s.key]}
                onChange={(e) => update({ [s.key]: Number(e.target.value) })}
                aria-valuetext={`${draft[s.key]} out of 10`}
                className="ina-range mt-1"
              />
              <div className="flex justify-between text-xs text-muted" aria-hidden>
                <span>1 · {s.low}</span>
                <span>10 · {s.high}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7">
          <label htmlFor="ci-notes" className="mb-1.5 block text-sm font-semibold">
            Notes for Cody <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="ci-notes"
            name="notes"
            rows={4}
            className="field"
            value={draft.notes}
            onChange={onText}
            placeholder="Wins, struggles, injuries, questions…"
          />
        </div>

        <div className="mt-6 flex items-start gap-3 border border-dashed border-[var(--line)] p-4">
          <Camera size={20} aria-hidden className="mt-0.5 shrink-0 text-[var(--accent)]" />
          <div className="text-sm">
            <p className="font-semibold">Progress photos</p>
            <p className="text-muted">
              Placeholder: photo upload arrives with real client accounts. Nothing is uploaded in
              this demo.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" onClick={save}>
            <Check size={16} aria-hidden /> Save check-in
          </button>
          <p role="status" className="text-sm text-muted">
            {draft.savedAt
              ? `Saved ${new Date(draft.savedAt).toLocaleString('en-CA', { dateStyle: 'medium', timeStyle: 'short' })}`
              : 'Not saved yet'}
          </p>
        </div>
      </GlassCard>

      <GlassCard className="checkin-print h-fit p-6">
        <h2 className="font-heading text-3xl uppercase">Send to Cody</h2>
        <p className="mt-1 text-sm text-muted">Copy this text and send it by message or email.</p>
        <pre
          aria-label="Check-in text preview"
          className="checkin-text mt-4 whitespace-pre-wrap break-words border border-[var(--line)] bg-black/30 p-4 font-body text-sm leading-relaxed"
        >
          {text}
        </pre>
        <div className="no-print mt-4 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={copy}>
            <ClipboardCopy size={16} aria-hidden />
            {copyState === 'copied' ? 'Copied' : 'Copy check-in'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={print}>
            <Printer size={16} aria-hidden /> Print
          </button>
        </div>
        <div role="status" className="no-print">
          {copyState === 'copied' && (
            <p className="mt-3 text-sm text-muted">Copied to the clipboard.</p>
          )}
        </div>
        {copyState === 'failed' && (
          <div className="no-print mt-4">
            <label
              htmlFor="ci-fallback"
              className="mb-1.5 block text-sm font-semibold"
              role="alert"
            >
              Copy was blocked by your browser. The text below is selected: press Ctrl+C (⌘C on
              Mac).
            </label>
            <textarea
              id="ci-fallback"
              ref={fallbackRef}
              readOnly
              rows={9}
              className="field"
              value={text}
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
        )}
      </GlassCard>
    </div>
  )
}
