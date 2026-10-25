import { BookOpen, ListChecks, Target } from 'lucide-react'
import { GlassCard } from '../ui'
import type { ClientProfile } from '../../types/client'

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3 leading-relaxed">
          <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 bg-[var(--accent)]" />
          {it}
        </li>
      ))}
    </ul>
  )
}

export function GuidanceTab({ client }: { client: ClientProfile }) {
  const g = client.guidance
  return (
    <div>
      <h2 className="font-heading text-3xl uppercase">{g.month} guidance</h2>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h3 className="eyebrow mb-4 flex items-center gap-2">
            <ListChecks size={14} aria-hidden /> Habits
          </h3>
          <List items={g.habits} />
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="eyebrow mb-4 flex items-center gap-2">
            <Target size={14} aria-hidden /> Focus cues
          </h3>
          <List items={g.focusCues} />
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="eyebrow mb-4 flex items-center gap-2">
            <BookOpen size={14} aria-hidden /> Learn
          </h3>
          <div className="space-y-5">
            {g.education.map((e) => (
              <div key={e.title}>
                <h4 className="font-semibold">{e.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{e.body}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="border-[var(--accent)] p-6">
          <h3 className="eyebrow mb-4">This month&rsquo;s rules</h3>
          <ol className="space-y-3">
            {g.rules.map((r, i) => (
              <li key={r} className="flex gap-3 leading-relaxed">
                <span className="font-heading text-2xl leading-none text-[var(--accent)]">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ol>
        </GlassCard>
      </div>
    </div>
  )
}
