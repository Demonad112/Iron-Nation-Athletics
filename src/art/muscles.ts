export type MuscleGroup =
  | 'shoulders'
  | 'chest'
  | 'biceps'
  | 'forearms'
  | 'core'
  | 'quads'
  | 'calves'
  | 'traps'
  | 'lats'
  | 'triceps'
  | 'lowerBack'
  | 'glutes'
  | 'hamstrings'

export const frontGroups: MuscleGroup[] = [
  'shoulders',
  'chest',
  'biceps',
  'forearms',
  'core',
  'quads',
  'calves',
]
export const backGroups: MuscleGroup[] = [
  'traps',
  'shoulders',
  'lats',
  'triceps',
  'lowerBack',
  'glutes',
  'hamstrings',
  'calves',
]

export const muscleLabels: Record<MuscleGroup, string> = {
  shoulders: 'Shoulders',
  chest: 'Chest',
  biceps: 'Biceps',
  forearms: 'Forearms',
  core: 'Core',
  quads: 'Quads',
  calves: 'Calves',
  traps: 'Traps',
  lats: 'Lats',
  triceps: 'Triceps',
  lowerBack: 'Lower back',
  glutes: 'Glutes',
  hamstrings: 'Hamstrings',
}
