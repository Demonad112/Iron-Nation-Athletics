import { CalendarClock, Stethoscope } from 'lucide-react'
import { MuscleMap } from '../../art/MuscleMap'
import { muscleLabels } from '../../art/muscles'
import { site } from '../../content/site'
import { fmtDate, fmtDateTime } from '../../hooks/portal'
import type { ClientProfile } from '../../types/client'
import { ButtonAnchor, ButtonLink, GlassCard } from '../ui'

export function RecoveryTab({ client }: { client: ClientProfile }) {
  const r = client.recovery
  if (!r) {
    return (
      <div data-brand="myomedic" className="text-[var(--text)]">
        <GlassCard className="mx-auto max-w-2xl p-8 text-center">
          <Stethoscope size={36} aria-hidden className="mx-auto text-[var(--accent)]" />
          <h2 className="font-heading mt-4 text-3xl">Recovery with MyoMedic</h2>
          <p className="mt-3 leading-relaxed text-muted">
            This plan doesn&rsquo;t include massage therapy yet. Add MyoMedic to see your session
            notes, treated areas, home mobility routine and next booking right here.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/pricing?tab=bundles" arrow>
              Add MyoMedic
            </ButtonLink>
            <ButtonLink to="/myomedic" variant="ghost">
              About MyoMedic
            </ButtonLink>
          </div>
        </GlassCard>
      </div>
    )
  }
  return (
    <div data-brand="myomedic" className="text-[var(--text)]">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <GlassCard className="p-6">
          <h2 className="font-heading text-2xl">Treated areas</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <MuscleMap
              view="front"
              highlight={r.treatedAreas}
              title={`Front view. Treated: ${r.treatedAreas.map((m) => muscleLabels[m]).join(', ')}`}
              className="mx-auto h-56 w-auto"
            />
            <MuscleMap view="back" highlight={r.treatedAreas} className="mx-auto h-56 w-auto" />
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Treated areas">
            {r.treatedAreas.map((m) => (
              <li
                key={m}
                className="border border-[var(--accent)] px-2 py-0.5 text-xs font-semibold"
              >
                {muscleLabels[m]}
              </li>
            ))}
          </ul>
        </GlassCard>

        <div className="space-y-5">
          <GlassCard className="p-6">
            <p className="eyebrow flex items-center gap-2">
              <CalendarClock size={14} aria-hidden /> Next booking
            </p>
            {r.nextBooking ? (
              <>
                <p className="font-heading mt-3 text-3xl">{fmtDateTime(r.nextBooking.date)}</p>
                <p className="text-sm text-muted">
                  {r.nextBooking.service} · {r.nextBooking.durationMin} min
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-muted">Nothing booked yet.</p>
            )}
            <div className="mt-4">
              <ButtonAnchor href={site.rmtBookingUrl} arrow>
                {r.nextBooking ? 'Manage booking' : 'Book RMT'}
              </ButtonAnchor>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="font-heading text-2xl">Session log</h2>
            <ol className="mt-3 divide-y divide-[var(--line)]">
              {r.sessions.map((s) => (
                <li key={s.date} className="py-4 first:pt-0">
                  <p className="font-semibold">
                    {fmtDate(s.date)}{' '}
                    <span className="font-normal text-muted">
                      · {s.service} · {s.durationMin} min · {s.therapist}
                    </span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.notes}</p>
                  <p className="mt-1 text-xs text-muted">
                    Areas: {s.areas.map((m) => muscleLabels[m]).join(', ')}
                  </p>
                </li>
              ))}
            </ol>
          </GlassCard>
        </div>
      </div>

      <GlassCard className="mt-5 p-6">
        <h2 className="font-heading text-2xl">{r.mobility.title}</h2>
        <p className="text-sm text-muted">{r.mobility.frequency}</p>
        <ol className="mt-4 grid gap-4 md:grid-cols-2">
          {r.mobility.drills.map((d, i) => (
            <li key={d.name} className="border border-[var(--line)] p-4">
              <p className="font-semibold">
                <span className="tabular mr-2 text-[var(--accent)]">{i + 1}.</span>
                {d.name}
              </p>
              <p className="tabular text-sm">{d.prescription}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{d.cue}</p>
            </li>
          ))}
        </ol>
      </GlassCard>
    </div>
  )
}
