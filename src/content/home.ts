// Home page copy. TODO(client): every string below is placeholder marketing copy.

export const hero = {
  eyebrow: 'Calgary · Alberta', // TODO(client)
  headline: ['Built in Calgary.', 'Forged in iron.'], // TODO(client)
  sub: 'Hypertrophy-focused coaching and sport-science recovery under one roof. Train hard, recover smarter, and build a physique that lasts.', // TODO(client)
  primaryCta: { label: 'Start Training', to: '/training' },
  secondaryCta: { label: 'Book Massage Therapy', to: '/myomedic' },
}

export const stats = [
  { value: 250, suffix: '+', label: 'Clients trained' }, // TODO(client) real numbers
  { value: 12000, suffix: '+', label: 'Sessions coached' }, // TODO(client)
  { value: 1800000, suffix: ' kg', label: 'Lifted under supervision', compact: true }, // TODO(client)
  { value: 9, suffix: ' yrs', label: 'In the industry' }, // TODO(client)
]

export const pillars = {
  ina: {
    eyebrow: 'Train',
    title: 'Iron Nation Athletics',
    body: 'Evidence-based hypertrophy and strength programming, in person in Calgary or online anywhere. Every rep has a purpose, every block has a plan.', // TODO(client)
    points: [
      'Muscle building & recomposition',
      'Contest prep & physique coaching',
      'Online coaching with weekly check-ins',
    ], // TODO(client)
    cta: { label: 'Explore training', to: '/training' },
  },
  myomedic: {
    eyebrow: 'Recover',
    title: 'MyoMedic',
    tag: 'an Iron Nation Athletics service',
    body: 'Registered massage therapy built on strength-and-conditioning science. Treatment that understands your training load, not just your sore spots.', // TODO(client)
    points: [
      'Sports & deep tissue massage',
      'Injury rehab & return-to-training',
      'Pre/post-competition recovery',
    ], // TODO(client)
    cta: { label: 'Explore MyoMedic', to: '/myomedic' },
  },
}

export const method = [
  {
    step: '01',
    title: 'Assess',
    body: 'Movement screen, history, goals and a look at your schedule. We start with where you really are.',
  }, // TODO(client)
  {
    step: '02',
    title: 'Program',
    body: 'A periodised plan built around your structure, recovery capacity and the muscle you want to add.',
  }, // TODO(client)
  {
    step: '03',
    title: 'Fuel',
    body: 'Macro targets and meal structure that match your training phase, with no extreme rules.',
  }, // TODO(client)
  {
    step: '04',
    title: 'Recover',
    body: 'Sleep, mobility and massage therapy keep the work productive and the injuries away.',
  }, // TODO(client)
] as const

// All sample data. Each is rendered with a visible "Sample" badge.
export const featuredResults = [
  {
    name: 'Marcus T.',
    headline: '+7 kg lean mass',
    detail: '16-week lean bulk · in-person',
    art: 'plates',
  }, // TODO(client) replace with real, consented results
  {
    name: 'Priya S.',
    headline: '−12 kg, deadlift 1.8× bodyweight',
    detail: '24-week recomposition · online',
    art: 'kettlebell',
  }, // TODO(client)
  {
    name: 'Dan K.',
    headline: 'Stage-ready in 18 weeks',
    detail: 'Contest prep · online + RMT',
    art: 'barbell',
  }, // TODO(client)
] as const

export const credentials = [
  { abbr: 'R.M.T.', name: 'Registered Massage Therapist' }, // TODO(client) confirm credential and registration
  { abbr: 'C.S.C.S.', name: 'Certified Strength & Conditioning Specialist' }, // TODO(client) confirm credential
]

export const finalCta = {
  title: 'Ready to build something that lasts?', // TODO(client)
  body: 'Book a free consult and we will map out your first 12 weeks.', // TODO(client)
  cta: { label: 'Book a Session', to: '/contact' },
}
