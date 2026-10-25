// Contact page copy and form settings. TODO(client): the address, hours and endpoints below are
// placeholders. Shared contact details (email, phone, address, hours, booking URLs) live in site.ts.

export const contactHero = {
  eyebrow: 'Get started', // TODO(client)
  title: 'Contact & Booking', // TODO(client)
  lead: 'Send an enquiry and Cody will reply within one business day, or book a session directly.', // TODO(client)
}

/**
 * Formspree form endpoint, e.g. 'https://formspree.io/f/xxxxxxxx'. When set, the form posts there
 * and stays on the page. When empty, submitting opens the visitor's email app with a mailto: link.
 */
export const formspreeEndpoint = '' // TODO(client) create a Formspree form and paste its URL

/** Google Maps embed. Off by default so no third-party requests are made until the client opts in. */
export const mapEmbed = {
  enabled: false, // TODO(client) set true once a real address is confirmed
  // TODO(client) paste the iframe `src` from Google Maps → Share → Embed a map
  src: '',
  title: 'Map showing the Iron Nation Athletics training space',
}

export const interests = [
  { value: 'pt', label: 'In-person personal training' },
  { value: 'online', label: 'Online coaching' },
  { value: 'rmt', label: 'MyoMedic massage therapy (RMT)' },
  { value: 'bundle', label: 'Bundle (training + recovery)' },
] as const

export type InterestValue = (typeof interests)[number]['value']

export const mailSubject = 'Enquiry from the Iron Nation Athletics website'

export const consultNote = 'Free 20-minute consult for new clients.' // TODO(client)
