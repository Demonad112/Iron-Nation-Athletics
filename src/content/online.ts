// Online Coaching copy. TODO(client): every string is placeholder marketing copy.

export const onlineHero = {
  eyebrow: 'Anywhere', // TODO(client)
  title: 'Online Coaching', // TODO(client)
  lead: 'The full Iron Nation method, delivered remotely: a program built for you, a meal plan to match and a coach who reviews your work every week.', // TODO(client)
}

export type OnlineIcon = 'map' | 'plane' | 'target'

export const audience: { icon: OnlineIcon; title: string; body: string }[] = [
  {
    icon: 'map',
    title: 'Outside Calgary',
    body: 'You want Cody’s programming but live too far for sessions. Everything is delivered through the client portal and weekly check-ins.',
  },
  {
    icon: 'plane',
    title: 'Travelling or shift-based',
    body: 'Your schedule moves around. Your plan flexes with it, with gym, hotel and home-gym versions of every week.',
  },
  {
    icon: 'target',
    title: 'Self-trainers wanting structure',
    body: 'You know the basics but need progression, accountability and someone to catch what you cannot see in your own form.',
  },
] // TODO(client)

export type IncludedIcon = 'program' | 'meal' | 'checkin' | 'video' | 'message'

export const included: { icon: IncludedIcon; title: string; body: string }[] = [
  {
    icon: 'program',
    title: 'Monthly program',
    body: 'A periodised training block with sets, reps, RIR, tempo and substitutions.',
  },
  {
    icon: 'meal',
    title: 'Macro-based meal plan',
    body: 'Calorie and macro targets with sample days, built around foods you actually eat.',
  },
  {
    icon: 'checkin',
    title: 'Weekly check-ins',
    body: 'Bodyweight, measurements, sleep and adherence reviewed every week, with adjustments.',
  },
  {
    icon: 'video',
    title: 'Form-video review',
    body: 'Send clips of your key lifts and get written, timestamped feedback.',
  },
  {
    icon: 'message',
    title: 'Direct messaging',
    body: 'Questions answered between check-ins, so you are never stuck guessing.',
  },
] // TODO(client)

export const onlineSteps: { step: string; title: string; body: string }[] = [
  {
    step: '01',
    title: 'Apply',
    body: 'Fill in the contact form with your goals, training history and equipment.',
  },
  {
    step: '02',
    title: 'Intake call',
    body: 'A short video call to confirm fit, review history and set your targets.',
  },
  {
    step: '03',
    title: 'Get your plan',
    body: 'Your first training block and nutrition targets land in your portal within a few days.',
  },
  {
    step: '04',
    title: 'Train & check in',
    body: 'Log your sessions, submit your weekly check-in and get adjustments from Cody.',
  },
] // TODO(client)

export const portalCta = { label: 'See what clients get', to: '/portal' }
