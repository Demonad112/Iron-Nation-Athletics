import type { MuscleGroup } from '../art/muscles'

// MyoMedic copy. TODO(client): services, durations and descriptions are placeholders.

export const myomedicHero = {
  lockup: 'Massage Therapy · Cody Innes', // TODO(client) confirm display name
  credentials: 'R.M.T. · C.S.C.S.', // TODO(client) confirm credentials and registration
  title: 'Redefining Massage Therapy',
  sub: 'Combining sport science & massage therapy.',
}

export interface Service {
  id: string
  title: string
  body: string
  durations: number[]
  /** Muscle groups this service commonly treats (drives the coral map). */
  areas: MuscleGroup[]
}

export const services: Service[] = [
  {
    id: 'sports',
    title: 'Sports Massage',
    body: 'Targeted work for the muscles you load most, timed around your training week.',
    durations: [30, 60, 90],
    areas: ['quads', 'hamstrings', 'calves', 'glutes'],
  },
  {
    id: 'deep-tissue',
    title: 'Deep Tissue',
    body: 'Slow, firm pressure for chronic tightness in the back, neck and shoulders.',
    durations: [60, 90],
    areas: ['traps', 'lats', 'lowerBack', 'shoulders'],
  },
  {
    id: 'rehab',
    title: 'Therapeutic / Injury Rehab',
    body: 'Assessment-led treatment for strains, overuse and post-injury stiffness, with a home plan.',
    durations: [45, 60],
    areas: ['shoulders', 'triceps', 'biceps', 'forearms', 'lowerBack'],
  },
  {
    id: 'competition',
    title: 'Pre / Post-Competition',
    body: 'Lighter pre-event work to prime the tissue, deeper recovery work once the weight is down.',
    durations: [30, 45],
    areas: ['quads', 'chest', 'lats', 'calves', 'core'],
  },
  {
    id: 'myofascial',
    title: 'Myofascial Release',
    body: 'Sustained, low-load techniques to restore glide between tissue layers and ease restriction.',
    durations: [45, 60],
    areas: ['chest', 'core', 'quads', 'lats', 'hamstrings'],
  },
  {
    id: 'stretch',
    title: 'Assisted Stretching & Mobility',
    body: 'Partner-assisted stretching and mobility drills to open range you can then use under load.',
    durations: [30, 45, 60],
    areas: ['hamstrings', 'quads', 'glutes', 'shoulders', 'calves'],
  },
] // TODO(client)

export const whySportScience = {
  title: 'Why sport science matters',
  lead: 'A C.S.C.S. background changes what happens on the table. Treatment is planned around your training, not just the spot that hurts.',
  points: [
    {
      title: 'Assessment first',
      body: 'Movement and strength screens find the cause of the tightness, so we treat the pattern rather than chase symptoms.',
    },
    {
      title: 'Load management',
      body: 'Treatment depth and timing are scheduled around your program, so recovery supports the next heavy session instead of costing you it.',
    },
    {
      title: 'Return-to-training',
      body: 'Rehab hands off to a progressive loading plan, so you go back to lifting with a clear route instead of guessing.',
    },
  ],
} // TODO(client)

export const insurance = {
  title: 'Insurance & direct billing',
  // TODO(client) confirm what is offered, which insurers, and the receipt wording.
  body: 'Receipts for extended-health reimbursement are provided after each visit. Direct billing is planned but not confirmed.',
  placeholder: 'Placeholder: coverage and direct-billing details to be confirmed by Cody.',
}

export const bundleCta = {
  text: 'Training with Iron Nation? Bundle and save',
  to: '/pricing?tab=bundles',
}
