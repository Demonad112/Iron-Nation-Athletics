import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { KeyRound, LockKeyhole } from 'lucide-react'
import { GlassCard } from '../ui'
import { DEMO_CODES, portalErrorMessage } from '../../hooks/portal'
import type { PortalErrorKind } from '../../hooks/portal'
import { PortalLoading } from './PortalLoading'

interface Props {
  initialCode: string
  loading: boolean
  error: PortalErrorKind | null
  /** Bumps on every failed attempt so the shake can replay. */
  errorTick: number
  onSubmit: (raw: string) => void
}

export function Locker({ initialCode, loading, error, errorTick, onSubmit }: Props) {
  const uid = useId()
  const [value, setValue] = useState(initialCode)
  const inputId = `${uid}-code`
  const errId = `${uid}-err`
  const hintId = `${uid}-hint`

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <section className="container-ina min-h-[100svh] py-14 md:py-20">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow mb-4 flex items-center gap-2">
          <LockKeyhole size={14} aria-hidden /> Clients
        </p>
        <h1 className="font-heading text-balance text-5xl uppercase leading-[0.95] sm:text-6xl">
          Client Portal
        </h1>
        <span className="rule mt-5" />
        <p className="mt-6 leading-relaxed text-muted md:text-lg">
          Enter your access code to see your plan, nutrition and progress.
        </p>

        <GlassCard className="mt-8 p-6 md:p-8">
          {loading ? (
            <PortalLoading />
          ) : (
            <>
              <form onSubmit={submit} noValidate>
                <label htmlFor={inputId} className="mb-2 block text-sm font-semibold">
                  Access code
                </label>
                <div
                  key={errorTick}
                  className={`flex flex-col gap-3 sm:flex-row ${error ? 'shake' : ''}`}
                >
                  <div className="relative flex-1">
                    <KeyRound
                      size={16}
                      aria-hidden
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                    />
                    <input
                      id={inputId}
                      className="field !pl-9 font-label uppercase tracking-[0.18em]"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="INA-XXXX"
                      autoComplete="off"
                      autoCapitalize="characters"
                      spellCheck={false}
                      maxLength={24}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `${hintId} ${errId}` : hintId}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Access
                  </button>
                </div>
                <p id={hintId} className="mt-2 text-xs text-muted">
                  Format INA-XXXX. Not case sensitive; spaces are ignored.
                </p>
                <div id={errId} role="alert" className="min-h-[1.5rem]">
                  {error && <p className="field-error !text-sm">{portalErrorMessage[error]}</p>}
                </div>
              </form>

              <div className="mt-6 border-t border-[var(--line)] pt-5">
                <p className="eyebrow !text-[var(--muted)]">Try a demo client</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {DEMO_CODES.map((d) => (
                    <li key={d.code}>
                      <button
                        type="button"
                        className="chip !min-h-[2.75rem] text-left"
                        onClick={() => {
                          setValue(d.code)
                          onSubmit(d.code)
                        }}
                      >
                        <span className="block text-[var(--text)]">{d.code}</span>
                        <span className="block text-[0.62rem] font-normal normal-case tracking-normal">
                          {d.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </GlassCard>
        <p className="mt-5 text-xs leading-relaxed text-muted">
          Demo portal with sample data. Real client access will use secure accounts.
        </p>
      </div>
    </section>
  )
}
