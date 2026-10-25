// Privacy & Terms placeholder copy. TODO(client): this is NOT legal advice and not final. Have it
// reviewed against Alberta's PIPA (Personal Information Protection Act) and, for MyoMedic massage
// therapy records, the HIA (Health Information Act) and the College of Massage Therapists of
// Alberta's record-keeping rules before the site collects any real personal or health information.

export const privacyHero = {
  eyebrow: 'Legal',
  title: 'Privacy & Terms',
  lead: 'Placeholder policy for the showcase. The final wording will be confirmed before launch.',
}

export interface PolicySection {
  title: string
  body: string[]
}

export const privacySections: PolicySection[] = [
  {
    title: 'This is a showcase',
    body: [
      'This site is a preview build. The Client Portal uses sample data only, and no real client records are stored or shown.',
      'Nothing you type into the contact form is sent anywhere until the site owner connects a form service. Until then, submitting opens a draft in your own email app.',
    ],
  },
  {
    title: 'What we collect',
    body: [
      'Contact form: your name, email, optional phone number, what you are interested in, your goals and preferred times. We use these only to reply to your enquiry.',
      'Browser storage: your device remembers display settings (background on/off), the last portal code you entered, and any check-in or workout ticks you make in the demo. These stay on your device and can be cleared in your browser settings or with Sign out.',
      'Analytics: none is loaded unless the site owner enables a cookieless provider; this page will then name it.',
    ],
  },
  {
    title: 'Health information',
    body: [
      'Please do not send medical history, injuries, medications or other health details through the contact form. Share them only during a consult or treatment, where they are recorded under the appropriate professional rules.',
      'Massage therapy treatment records and any health information collected for MyoMedic are subject to Alberta health-information rules and professional record-keeping standards.',
      // TODO(client) Confirm with a lawyer/privacy officer how PIPA (training and coaching clients) and
      // HIA (health records) apply to each service, and where records are stored.
      'Placeholder: a privacy review for Alberta PIPA and HIA obligations is still to be completed.',
    ],
  },
  {
    title: 'How long we keep it, and your choices',
    body: [
      'Enquiry details are kept only as long as needed to respond and for reasonable business records. You can ask to see, correct or delete your information at any time by emailing the address on the Contact page.',
      // TODO(client) State retention periods and the privacy officer contact.
    ],
  },
  {
    title: 'Using the site',
    body: [
      'Prices, packages, results, testimonials and availability on this preview are samples. Nothing here is an offer or a medical recommendation.',
      'Training and massage therapy involve physical effort. Speak to a health professional before starting a program if you have a medical condition.',
    ],
  },
]
