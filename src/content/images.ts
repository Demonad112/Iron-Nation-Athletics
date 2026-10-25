// Named photo slots. Each is a URL (Unsplash/Pexels free licence, credited in `photoCredits`)
// or `null`. When null, the section renders its code-made art instead, so nothing looks empty.
export const images = {
  heroTraining: null as string | null, // TODO(client) hero photo
  coachPortrait: null as string | null, // TODO(client) portrait of Cody
  rmtTreatment: null as string | null, // TODO(client) treatment-room photo
  gymFloor: null as string | null, // TODO(client) gym photo
}

export type ImageSlot = keyof typeof images

// Shown in the footer. Add { label, url } for every photo URL used above.
export const photoCredits: { label: string; url: string }[] = []
