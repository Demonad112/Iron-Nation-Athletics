// Results copy. TODO(client): every result and testimonial here is SAMPLE data. Replace with real,
// consented client results before launch. Each one is rendered with a visible "Sample" badge and
// uses first name plus initial only.

export type ResultCategory = 'hypertrophy' | 'fat-loss' | 'contest-prep' | 'rehab'

export const categoryLabels: Record<ResultCategory, string> = {
  hypertrophy: 'Hypertrophy',
  'fat-loss': 'Fat Loss',
  'contest-prep': 'Contest Prep',
  rehab: 'Rehab',
}

export type ResultArt = 'plates' | 'kettlebell' | 'barbell'

export interface ClientResult {
  id: string
  name: string
  category: ResultCategory
  headline: string
  detail: string
  art: ResultArt
  /** Shown in the Home "featured results" strip. */
  featured?: boolean
}

export const resultsHero = {
  eyebrow: 'Proof', // TODO(client)
  title: 'Results', // TODO(client)
  lead: 'Sample transformations and testimonials, shown with placeholder clients until real, consented results replace them.', // TODO(client)
}

export const results: ClientResult[] = [
  {
    id: 'marcus',
    name: 'Marcus T.',
    category: 'hypertrophy',
    headline: '+7 kg lean mass',
    detail: '16-week lean bulk · in-person',
    art: 'plates',
    featured: true,
  },
  {
    id: 'priya',
    name: 'Priya S.',
    category: 'fat-loss',
    headline: '−12 kg, deadlift 1.8× bodyweight',
    detail: '24-week recomposition · online',
    art: 'kettlebell',
    featured: true,
  },
  {
    id: 'dan',
    name: 'Dan K.',
    category: 'contest-prep',
    headline: 'Stage-ready in 18 weeks',
    detail: 'Contest prep · online + RMT',
    art: 'barbell',
    featured: true,
  },
  {
    id: 'aisha',
    name: 'Aisha R.',
    category: 'rehab',
    headline: 'Back to pressing pain-free',
    detail: 'Shoulder rehab · bundle',
    art: 'barbell',
  },
  {
    id: 'liam',
    name: 'Liam H.',
    category: 'hypertrophy',
    headline: '+5 cm on the arms',
    detail: '20-week arm specialization · in-person',
    art: 'plates',
  },
  {
    id: 'sofia',
    name: 'Sofia M.',
    category: 'fat-loss',
    headline: '−9 kg, kept all her muscle',
    detail: '18-week cut · online',
    art: 'kettlebell',
  },
  {
    id: 'jordan',
    name: 'Jordan P.',
    category: 'contest-prep',
    headline: 'First-time podium finish',
    detail: '20-week prep · in-person',
    art: 'plates',
  },
  {
    id: 'noah',
    name: 'Noah B.',
    category: 'rehab',
    headline: 'Cleared to squat after a back strain',
    detail: 'Return-to-training · bundle',
    art: 'kettlebell',
  },
] // TODO(client) replace with real, consented results

export const sliderDemo = {
  title: 'Before & after',
  lead: 'Drag the handle, or use the arrow keys, to compare. The images are placeholder art, not real clients.',
  beforeLabel: 'Week 0',
  afterLabel: 'Week 16',
  caption: 'Marcus T. · 16-week lean bulk',
} // TODO(client)

export interface Testimonial {
  id: string
  quote: string
  name: string
  detail: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'I had trained for years without a plan. Eight weeks in, my lifts were up and my shoulders finally stopped hurting.',
    name: 'Marcus T.',
    detail: 'In-person training',
  },
  {
    id: 't2',
    quote:
      'The weekly check-ins kept me honest. I lost the weight without feeling like I was on a diet.',
    name: 'Priya S.',
    detail: 'Online coaching',
  },
  {
    id: 't3',
    quote:
      'Having my coach and my massage therapist on the same page meant prep week was calm instead of chaotic.',
    name: 'Dan K.',
    detail: 'Contest prep + RMT',
  },
  {
    id: 't4',
    quote:
      'I came in after a shoulder injury expecting to be told to stop lifting. Instead I got a plan to keep training safely.',
    name: 'Aisha R.',
    detail: 'Rehab bundle',
  },
] // TODO(client) replace with real, consented testimonials

export const resultsCta = {
  title: 'Be the next real result', // TODO(client)
  body: 'Book a free consult and start your first 12 weeks.', // TODO(client)
  cta: { label: 'Book a Session', to: '/contact' },
}
