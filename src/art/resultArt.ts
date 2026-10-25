import { Kettlebell, Plate, PlateStack } from '.'
import type { ResultArt } from '../content/results'

// Placeholder illustration for each sample result.
export const resultArt = {
  plates: PlateStack,
  kettlebell: Kettlebell,
  barbell: Plate,
} as const satisfies Record<ResultArt, unknown>
