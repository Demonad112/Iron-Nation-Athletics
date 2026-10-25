// Pricing copy. TODO(client): every price, feature and tier name is a placeholder (CAD).

export type PricingTabId = 'pt' | 'online' | 'rmt' | 'bundles'

export const pricingTabs: { id: PricingTabId; label: string }[] = [
  { id: 'pt', label: 'In-Person PT' },
  { id: 'online', label: 'Online Coaching' },
  { id: 'rmt', label: 'MyoMedic RMT' },
  { id: 'bundles', label: 'Bundles' },
]

export interface Tier {
  name: string
  price: number
  unit: string
  blurb: string
  features: string[]
  highlight?: boolean
  /** Contact form interest this tier should pre-select. */
  interest: 'pt' | 'online' | 'rmt' | 'bundle'
}

export const pricingHero = {
  eyebrow: 'Packages', // TODO(client)
  title: 'Pricing & Packages',
  lead: 'Straightforward monthly packages for training, coaching and massage therapy, with bundles when you want both.',
}

export const pricingSmallPrint = 'Pricing shown is a sample for preview.'

export const tiers: Record<PricingTabId, { intro: string; items: Tier[] }> = {
  pt: {
    intro:
      'Hour-long sessions in Calgary, billed monthly. Pick the frequency that suits your goals.',
    items: [
      {
        name: 'Foundation',
        price: 320,
        unit: '/ month',
        blurb: '4 sessions a month. Ideal for technique and a program to run solo.',
        features: ['4 × 60 min sessions', 'Custom training program', 'Basic nutrition guidance'],
        interest: 'pt',
      },
      {
        name: 'Standard',
        price: 600,
        unit: '/ month',
        blurb: '8 sessions a month. The sweet spot for steady, visible progress.',
        features: [
          '8 × 60 min sessions',
          'Custom program, updated monthly',
          'Macro targets',
          'Daily message support',
        ],
        highlight: true,
        interest: 'pt',
      },
      {
        name: 'Elite',
        price: 840,
        unit: '/ month',
        blurb: '12 sessions a month. Maximum coaching for contest prep and fast change.',
        features: [
          '12 × 60 min sessions',
          'Full meal plan',
          'Weekly body-composition tracking',
          'Priority support',
        ],
        interest: 'pt',
      },
    ],
  },
  online: {
    intro: 'Remote coaching with the same programming, delivered through the client portal.',
    items: [
      {
        name: 'Essentials',
        price: 149,
        unit: '/ month',
        blurb: 'A monthly program and monthly check-in.',
        features: ['Monthly training program', 'Macro targets', 'Monthly check-in'],
        interest: 'online',
      },
      {
        name: 'Coached',
        price: 229,
        unit: '/ month',
        blurb: 'Weekly check-ins and adjustments. Most clients start here.',
        features: [
          'Monthly program, adjusted weekly',
          'Macro-based meal plan',
          'Weekly check-ins',
          'Form-video review',
        ],
        highlight: true,
        interest: 'online',
      },
      {
        name: 'Premium',
        price: 329,
        unit: '/ month',
        blurb: 'Closest to in-person coaching, with a monthly video call.',
        features: [
          'Everything in Coached',
          'Monthly video call',
          'Daily message access',
          'Contest-prep add-ons',
        ],
        interest: 'online',
      },
    ],
  },
  rmt: {
    intro: 'Registered massage therapy with a sport-science approach. Prices are per visit.',
    items: [
      {
        name: 'Focused',
        price: 75,
        unit: '/ 30 min',
        blurb: 'A targeted treatment for one area.',
        features: ['30 minute treatment', 'Receipt for insurance', 'Home-care tips'],
        interest: 'rmt',
      },
      {
        name: 'Standard',
        price: 130,
        unit: '/ 60 min',
        blurb: 'Full assessment and treatment. The most popular visit.',
        features: [
          '60 minute treatment',
          'Movement assessment',
          'Home mobility plan',
          'Receipt for insurance',
        ],
        highlight: true,
        interest: 'rmt',
      },
      {
        name: 'Extended',
        price: 185,
        unit: '/ 90 min',
        blurb: 'Time for full-body work or complex injuries.',
        features: [
          '90 minute treatment',
          'Assessment and re-test',
          'Return-to-training plan',
          'Receipt for insurance',
        ],
        interest: 'rmt',
      },
    ],
  },
  bundles: {
    intro:
      'Training and recovery in one monthly price. Bundles save roughly 10–15% versus booking separately.',
    items: [
      {
        name: 'Train + Recover Lite',
        price: 449,
        unit: '/ month',
        blurb: 'Light training load with a monthly treatment.',
        features: [
          '4 PT sessions',
          '1 × 60 min RMT visit',
          'Training program',
          'Basic nutrition guidance',
        ],
        interest: 'bundle',
      },
      {
        name: 'Train + Recover',
        price: 799,
        unit: '/ month',
        blurb: 'Steady training with fortnightly recovery work.',
        features: [
          '8 PT sessions',
          '2 × 60 min RMT visits',
          'Macro targets',
          'Daily message support',
        ],
        highlight: true,
        interest: 'bundle',
      },
      {
        name: 'Full Stack',
        price: 1199,
        unit: '/ month',
        blurb: 'Everything in one plan, for serious prep and rehab.',
        features: [
          '12 PT sessions',
          '3 × 60 min RMT visits',
          'Full meal plan',
          'Weekly tracking and priority support',
        ],
        interest: 'bundle',
      },
    ],
  },
}

// Comparison table for the PT tiers. Booleans render as an included / not-included icon.
export const ptComparison: {
  columns: string[]
  rows: { label: string; values: (string | boolean)[] }[]
} = {
  columns: ['Foundation', 'Standard', 'Elite'],
  rows: [
    { label: 'Sessions per month', values: ['4', '8', '12'] },
    { label: 'Session length', values: ['60 min', '60 min', '60 min'] },
    { label: 'Custom program', values: [true, true, true] },
    { label: 'Nutrition guidance', values: ['Basic', 'Macro targets', 'Full meal plan'] },
    { label: 'Form-video review', values: [false, true, true] },
    { label: 'Message support', values: ['Email', 'Daily', 'Priority'] },
    { label: 'Body-composition tracking', values: ['Monthly', 'Every 2 weeks', 'Weekly'] },
    { label: 'MyoMedic discount', values: [false, '10%', '15%'] },
  ],
}
