// All values in this file are placeholders until Cody supplies the real details.

export interface NavItem {
  label: string
  to: string
}

export const nav: NavItem[] = [
  { label: 'Training', to: '/training' },
  { label: 'Online', to: '/online' },
  { label: 'MyoMedic', to: '/myomedic' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Results', to: '/results' },
  { label: 'Contact', to: '/contact' },
]

export const site = {
  name: 'Iron Nation Athletics',
  short: 'INA',
  owner: 'Cody Innes', // TODO(client) confirm spelling and preferred display name
  city: 'Calgary, Alberta', // TODO(client)
  email: 'hello@ironnationathletics.example', // TODO(client)
  phone: '(403) 555-0142', // TODO(client)
  address: '123 Placeholder Ave SW, Calgary, AB', // TODO(client)
  hours: 'Mon–Fri 6:00 am – 8:00 pm · Sat 8:00 am – 2:00 pm', // TODO(client)
  /** Structured versions of the address and hours, used for the LocalBusiness JSON-LD. */
  addressParts: {
    street: '123 Placeholder Ave SW', // TODO(client)
    city: 'Calgary',
    region: 'AB',
    postalCode: 'T2P 0A0', // TODO(client) placeholder postal code
    country: 'CA',
  },
  openingHours: ['Mo-Fr 06:00-20:00', 'Sa 08:00-14:00'], // TODO(client) schema.org format
  /** Public site URL (no hash). TODO(client) update when the custom domain is live. */
  url: 'https://demonad112.github.io/Iron-Nation-Athletics/',
  bookingUrl: '#/contact', // TODO(client) replace with real booking link (PT)
  rmtBookingUrl: '#/contact', // TODO(client) replace with Jane App (or similar) link
}

export const socials = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/' }, // TODO(client)
  { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/' }, // TODO(client)
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/' }, // TODO(client)
] as const

export const footerLinks = [
  { label: 'Personal Training', to: '/training' },
  { label: 'Online Coaching', to: '/online' },
  { label: 'MyoMedic RMT', to: '/myomedic' },
  { label: 'Pricing & Packages', to: '/pricing' },
  { label: 'Results', to: '/results' },
  { label: 'Client Portal', to: '/portal' },
  { label: 'Privacy & Terms', to: '/privacy' },
]

/**
 * Optional lightweight analytics. Empty by default: nothing is loaded and no cookie banner is needed.
 * TODO(client) To enable a cookieless provider (Plausible, Umami, Fathom…), paste its script URL and
 * the provider's site identifier. Review privacy implications first (see README → Analytics).
 */
export const analytics = {
  scriptSrc: '', // e.g. 'https://plausible.io/js/script.js'
  /** Plausible: the domain. Umami: the website id (set `idAttr` to 'data-website-id'). */
  siteId: '',
  idAttr: 'data-domain' as 'data-domain' | 'data-website-id',
}
