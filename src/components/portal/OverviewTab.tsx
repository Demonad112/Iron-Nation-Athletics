import { CalendarCheck, CalendarClock, Flag, Target } from 'lucide-react'
import { ButtonLink, GlassCard } from '../ui'
import { daysUntil, fmtDate, fmtDateTime, relativeDays } from '../../hooks/portal'
import type { ClientProfile } from '../../types/client'
import { AdherenceRing } from './AdherenceRing'

export function OverviewTab({ client }: { client: ClientProfile }) {
  const o = client.overview
  const weekPct = Math.round((o.week / o.totalWeeks) * 100)
  const eventDays = o.event ? daysUntil(o.event.date) : null
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <GlassCard className="flex items-center gap-6 p-6 lg:row-span-2">
        <AdherenceRing value={o.adherence} />
        <div>
          <h2 className="font-heading text-2xl uppercase">This month</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Sessions and meals completed against the plan.
          </p>
        </div>
      </GlassCard>

      <GlassCard className="p-6 lg:col-span-2">
        <p className="eyebrow flex items-center gap-2">
          <Target size={14} aria-hidden /> Month focus
        </p>
        <p className="mt-3 text-lg leading-snug">{o.monthFocus}</p>
        <p className="mt-3 text-sm text-muted">Goal: {o.goal}</p>
      </GlassCard>

      <GlassCard className="p-6 lg:col-span-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-heading text-2xl uppercase">{o.phase}</h2>
          <p className="font-label text-sm font-bold uppercase tracking-[0.18em]">
            Week {o.week} <span className="text-muted">of {o.totalWeeks}</span>
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Program progress"
          aria-valuemin={0}
          aria-valuemax={o.totalWeeks}
          aria-valuenow={o.week}
          aria-valuetext={`Week ${o.week} of ${o.totalWeeks}`}
          className="mt-4 h-3 w-full bg-[var(--line)]"
        >
          <div className="h-full bg-[var(--accent)]" style={{ width: `${weekPct}%` }} />
        </div>
      </GlassCard>

      <GlassCard className="p-6 lg:col-span-3">
        <h2 className="eyebrow">Coach&rsquo;s note</h2>
        <blockquote className="mt-3 border-l-4 border-[var(--accent)] pl-4 text-base leading-relaxed md:text-lg">
          {o.coachNote}
          <footer className="mt-3 text-sm text-muted">Cody</footer>
        </blockquote>
      </GlassCard>

      <GlassCard className="p-6">
        <p className="eyebrow flex items-center gap-2">
          <CalendarCheck size={14} aria-hidden /> Next check-in
        </p>
        <p className="mt-3 font-heading text-3xl uppercase">{fmtDate(o.nextCheckIn)}</p>
        <p className="text-sm text-muted">{relativeDays(o.nextCheckIn)}</p>
      </GlassCard>

      <GlassCard className="p-6">
        <p className="eyebrow flex items-center gap-2">
          <CalendarClock size={14} aria-hidden /> Next RMT appointment
        </p>
        {o.nextRmt ? (
          <>
            <p className="mt-3 font-heading text-3xl uppercase">{fmtDateTime(o.nextRmt)}</p>
            <p className="text-sm text-muted">{relativeDays(o.nextRmt.slice(0, 10))}</p>
          </>
        ) : (
          <>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              No massage therapy booked. Pair training with MyoMedic recovery.
            </p>
            <div className="mt-4">
              <ButtonLink to="/pricing?tab=bundles" variant="ghost">
                Add MyoMedic
              </ButtonLink>
            </div>
          </>
        )}
      </GlassCard>

      {o.event && eventDays !== null && (
        <GlassCard className="p-6">
          <p className="eyebrow flex items-center gap-2">
            <Flag size={14} aria-hidden /> {o.event.name}
          </p>
          {eventDays >= 0 ? (
            <>
              <p className="mt-3 font-heading text-5xl leading-none">
                {eventDays} <span className="text-2xl uppercase">days</span>
              </p>
              <p className="mt-2 text-sm text-muted">
                {Math.floor(eventDays / 7)} weeks out · {fmtDate(o.event.date)}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">
              Event date {fmtDate(o.event.date)} has passed (sample data).
            </p>
          )}
        </GlassCard>
      )}
    </div>
  )
}
