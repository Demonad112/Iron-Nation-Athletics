// Pure helpers for the contact form: validation and the mailto: message.

export interface ContactValues {
  name: string
  email: string
  phone: string
  interest: string
  goals: string
  times: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export const emptyContact: ContactValues = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  goals: '',
  times: '',
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(
  field: keyof ContactValues,
  values: ContactValues,
): string | undefined {
  const v = values[field].trim()
  switch (field) {
    case 'name':
      return v.length < 2 ? 'Enter your name.' : undefined
    case 'email':
      if (!v) return 'Enter your email address.'
      return EMAIL.test(v) ? undefined : 'Enter a valid email address, like name@example.com.'
    case 'phone': {
      if (!v) return undefined
      const digits = v.replace(/\D/g, '')
      return /^[\d\s().+-]+$/.test(v) && digits.length >= 10 && digits.length <= 15
        ? undefined
        : 'Enter a phone number with at least 10 digits, or leave it blank.'
    }
    case 'interest':
      return v ? undefined : 'Choose what you are interested in.'
    case 'goals':
      return v.length < 10
        ? 'Tell us a little about your goals (at least 10 characters).'
        : undefined
    default:
      return undefined
  }
}

export const fieldOrder: (keyof ContactValues)[] = [
  'name',
  'email',
  'phone',
  'interest',
  'goals',
  'times',
]

export function validateAll(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const f of fieldOrder) {
    const e = validateField(f, values)
    if (e) errors[f] = e
  }
  return errors
}

export function buildMessage(values: ContactValues, interestLabel: string, plan = ''): string {
  return [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim() || 'not provided'}`,
    `Interested in: ${interestLabel}${plan ? ` (${plan})` : ''}`,
    `Preferred times: ${values.times.trim() || 'not provided'}`,
    '',
    'Goals:',
    values.goals.trim(),
  ].join('\n')
}

const TRUNCATED =
  '\n\n[Message shortened to fit an email link. Please add anything that is missing.]'

/**
 * Builds a mailto: URL with an encoded subject and body. Some mail clients and browsers reject
 * very long links, so the body is shortened (on code-point boundaries) until the URL fits.
 */
export function buildMailto(
  to: string,
  subject: string,
  body: string,
  maxLength = 1900,
): { url: string; truncated: boolean } {
  const make = (b: string) =>
    `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(b.replace(/\n/g, '\r\n'))}`
  let url = make(body)
  if (url.length <= maxLength) return { url, truncated: false }
  const chars = Array.from(body)
  let keep = chars.length
  while (url.length > maxLength && keep > 0) {
    keep = Math.floor(keep * 0.9)
    url = make(chars.slice(0, keep).join('') + TRUNCATED)
  }
  return { url, truncated: true }
}
