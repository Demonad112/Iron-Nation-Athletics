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
]
