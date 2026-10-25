import type { MuscleGroup } from '../art/muscles'
import type { FAQItem } from '../components/ui'

// Personal Training copy. TODO(client): every string is placeholder marketing copy.

export const trainingHero = {
  eyebrow: 'In person · Calgary', // TODO(client)
  title: 'Personal Training', // TODO(client)
  lead: 'One-on-one coaching built around your structure, your schedule and the physique you are chasing. Every session has a plan, every plan has a purpose.', // TODO(client)
}

export type ProgramIcon = 'hypertrophy' | 'strength' | 'contest' | 'recomp'

export const programs: {
  id: string
  icon: ProgramIcon
  title: string
  tagline: string
  bestFor: string
  points: string[]
}[] = [
  {
    id: 'hypertrophy',
    icon: 'hypertrophy',
    title: 'Hypertrophy / Muscle Building',
    tagline: 'Add quality size with volume that is tracked, not guessed.',
    bestFor: 'Lifters who want to build visible muscle and have plateaued on their own plan.',
    points: [
      'Volume landmarks set per muscle group',
      'Progressive overload logged every session',
      'Planned deloads before fatigue stalls you',
    ],
  }, // TODO(client)
  {
    id: 'strength',
    icon: 'strength',
    title: 'Strength Foundations',
    tagline: 'Master the big lifts and build a base that carries everything else.',
    bestFor: 'Newer lifters and returners who want clean technique and a stronger base.',
    points: [
      'Squat, hinge, press and pull technique coaching',
      'Linear progression with clear numbers to hit',
      'Mobility work matched to your limiting joints',
    ],
  }, // TODO(client)
  {
    id: 'contest',
    icon: 'contest',
    title: 'Physique & Contest Prep',
    tagline: 'A structured run to the stage, from offseason to peak week.',
    bestFor: 'Competitors in bodybuilding, physique and bikini divisions.',
    points: [
      'Phased prep with weekly adjustments',
      'Posing practice and conditioning checks',
      'Peak week and post-show reverse plan',
    ],
  }, // TODO(client)
  {
    id: 'recomp',
    icon: 'recomp',
    title: 'Body Recomposition',
    tagline: 'Lose fat and keep (or build) muscle with training and food in sync.',
    bestFor: 'Anyone who wants to look leaner and stronger at the same time.',
    points: [
      'Resistance training first, cardio as support',
      'Macro targets with flexible meal structure',
      'Progress judged by photos, tape and strength, not just the scale',
    ],
  }, // TODO(client)
]

export interface MuscleDetail {
  exercises: string[]
  programming: string
}

// Example exercises and programming notes shown by the interactive muscle map.
export const muscleDetails: Record<MuscleGroup, MuscleDetail> = {
  shoulders: {
    exercises: ['Seated dumbbell press', 'Cable lateral raise', 'Rear-delt fly', 'Landmine press'],
    programming:
      'Lateral and rear delts respond to high frequency, so they are trained 3× per week with 10–20 reps and stop short of failure. Pressing volume is capped to protect the joint.',
  },
  chest: {
    exercises: ['Incline barbell press', 'Flat dumbbell press', 'Cable fly', 'Weighted dips'],
    programming:
      'Two sessions per week, one heavy (6–10 reps) and one for stretch under load (10–15). The upper chest gets the first slot of the week while you are freshest.',
  },
  biceps: {
    exercises: ['Incline dumbbell curl', 'Preacher curl', 'Hammer curl', 'Chin-up'],
    programming:
      '10–14 hard sets per week, mostly in the lengthened position. Curls go after the heavy pulls so they never limit your back training.',
  },
  forearms: {
    exercises: ['Wrist curl', 'Reverse curl', "Farmer's carry", 'Dead hang'],
    programming:
      'Trained at the end of a session 2× per week. Grip work is also built into carries and straps-free pulling blocks.',
  },
  core: {
    exercises: ['Cable crunch', 'Hanging leg raise', 'Ab wheel rollout', 'Pallof press'],
    programming:
      'Treated like any other muscle: weighted, progressive and trained 2–3× per week. Anti-rotation work keeps the trunk stable under heavy squats and pulls.',
  },
  quads: {
    exercises: ['High-bar back squat', 'Hack squat', 'Leg press', 'Leg extension'],
    programming:
      'Two sessions per week with a heavy compound first and a machine pattern for volume. Depth and tempo are coached so the quad does the work, not the lower back.',
  },
  calves: {
    exercises: ['Standing calf raise', 'Seated calf raise', 'Leg-press calf raise'],
    programming:
      'Short rest, full stretch, a pause at the bottom. Calves recover fast, so they are trained 3–4× per week at 8–15 reps.',
  },
  traps: {
    exercises: ['Barbell shrug', 'Rack pull', 'Cable face pull', 'Prone Y raise'],
    programming:
      'Upper traps get direct shrugs 2× per week. Lower and mid traps are trained with rows and face pulls to keep the shoulders healthy.',
  },
  lats: {
    exercises: ['Weighted pull-up', 'Chest-supported row', 'Lat pulldown', 'Single-arm cable row'],
    programming:
      'A vertical and a horizontal pull in every upper session, 12–18 sets per week. Straps are allowed so grip never caps the back.',
  },
  triceps: {
    exercises: ['Overhead cable extension', 'Close-grip bench', 'Skull crusher', 'Pushdown'],
    programming:
      'The long head is trained overhead for the stretch. 10–14 weekly sets, placed after pressing so elbows stay fresh for the heavy work.',
  },
  lowerBack: {
    exercises: ['Back extension', 'Romanian deadlift', 'Good morning', 'Bird dog'],
    programming:
      'Trained for resilience rather than fatigue: controlled reps, moderate load and enough recovery between hinge days.',
  },
  glutes: {
    exercises: ['Hip thrust', 'Bulgarian split squat', 'Walking lunge', 'Cable kickback'],
    programming:
      'A heavy hip-extension movement and a deep single-leg pattern each week, 10–16 sets, with a full pause at lockout.',
  },
  hamstrings: {
    exercises: ['Romanian deadlift', 'Seated leg curl', 'Lying leg curl', 'Nordic curl'],
    programming:
      'Hip hinge for length under load, then a curl for the knee-flexion function. Two sessions per week with a slow lowering phase.',
  },
}

export const sessionSteps: { time: string; title: string; body: string }[] = [
  {
    time: '0–10 min',
    title: 'Warm-up',
    body: 'Joint prep, activation and ramp-up sets so the first working set is your best.',
  },
  {
    time: '10–35 min',
    title: 'Main lifts',
    body: 'One or two heavy compound movements, coached on load, tempo and bar path.',
  },
  {
    time: '35–55 min',
    title: 'Accessories',
    body: 'Targeted volume for the muscles you are building, taken close to failure and logged.',
  },
  {
    time: '55–60 min',
    title: 'Mobility & wrap-up',
    body: 'Stretch, breathing and a quick debrief so next week starts from what you learned today.',
  },
] // TODO(client)

export const trainingFaq: FAQItem[] = [
  {
    q: 'Do I need gym experience?',
    a: 'No. Programs start from your current level, and technique coaching is part of every session. Experienced lifters get more advanced periodisation instead.',
  },
  {
    q: 'Where do sessions take place?',
    a: 'Sessions run at the Calgary training space listed on the Contact page. The address is a placeholder in this preview.',
  },
  {
    q: 'How often should I train with you?',
    a: 'Most clients book two or three sessions per week and follow the rest of their program solo. We set the right split in your first consult.',
  },
  {
    q: 'Is nutrition coaching included?',
    a: 'Every tier includes guidance on protein, calories and meal timing. Higher tiers add macro targets and a full meal plan. See Pricing for the breakdown.',
  },
  {
    q: 'What if I get injured or have to travel?',
    a: 'Programs are adjusted around injuries, and MyoMedic massage therapy can support the return to training. Travelling clients can switch to online coaching for a month.',
  },
  {
    q: 'What does a first consult cover?',
    a: 'A conversation about goals and history, a basic movement screen and a rough roadmap for your first 12 weeks. There is no obligation to sign up.',
  },
] // TODO(client) replace with Cody's real answers
