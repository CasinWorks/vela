/** Studio-concept copy — no real operator identities. All photography is Unsplash stock. */

export const CONTACT = {
  email: 'studio@casinworks.com',
  emailHref: 'mailto:studio@casinworks.com',
  formEmail: 'christianjoshuacasin@gmail.com',
  site: 'https://aviation.casinworks.com',
};

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * Same landing-page shot types as TFO Jets (jets-six), Unsplash only — no client media.
 * hero/feat: wing above clouds in flight
 * intro: Gulfstream on the apron
 * specialty: Gulfstream at sunrise
 * planning: glass flight deck
 * crew/board: Falcon 900 with airstairs on the tarmac
 */
export const IMAGES = {
  hero: unsplash('photo-1436491865332-7a61a109cc05', 2400),
  intro: unsplash('photo-1684838200815-36eef38f353c', 1800),
  specialty: unsplash('photo-1684838200888-192e2a163cc9', 1800),
  planning: unsplash('photo-1728518278514-649c8fe6b949', 1600),
  crew: unsplash('photo-1540962351504-03099e0a754b', 1600),
  secondary: unsplash('photo-1684838200888-192e2a163cc9', 2000),
};

export const OFFERINGS = [
  'Crews for Boeing and Airbus, available to be dispatched within 24hrs',
  'Full ferry service, including all ground and flight operations arrangements',
  'Crew only service for Ferry, delivery and Demo flights',
  'Are you looking at buying a used aircraft?',
  'Are you looking for an Airplane to lease, wet lease or dry lease?',
  'Aviation Consulting service.',
];

export const DO_IT_ALL = ['Ferry and delivery', 'Flight planning', 'All permits', 'Crew'];

export const GALLERY_IMAGES = [
  { src: unsplash('photo-1436491865332-7a61a109cc05', 2000), alt: 'Jet wing above the clouds at sunrise', area: 'feat' as const },
  { src: unsplash('photo-1569629743817-70d8db6c323b', 1200), alt: 'Aircraft on final approach', area: 'tall' as const },
  { src: unsplash('photo-1540962351504-03099e0a754b', 1600), alt: 'Aircraft boarding on the tarmac', area: 'board' as const },
  { src: unsplash('photo-1684838200815-36eef38f353c', 1600), alt: 'Jet on the apron under clear skies', area: 'fly' as const },
  { src: unsplash('photo-1728518278514-649c8fe6b949', 1600), alt: 'Flight deck at night', area: 'crew' as const },
  { src: unsplash('photo-1684838200888-192e2a163cc9', 2000), alt: 'Business jet on the apron at sunrise', area: 'wide' as const },
  { src: unsplash('photo-1693835195915-b30cc5ae885c', 1400), alt: 'Aircraft on the apron with cabin door open', area: 'cap' as const },
];

export const TEAM = [
  {
    name: 'Elena Voss',
    role: 'Chief Pilot',
    email: 'studio@casinworks.com',
    image: unsplash('photo-1580489944761-15a19d654956', 800),
    bio: 'Two decades of long-range ferry and delivery work across EASA and FAA theatres. Types include B737, 757, A320 and Gulfstream. Focused on oceanic planning, crew pairing, and quiet execution.',
  },
  {
    name: 'Marcus Hale',
    role: 'Operations Director',
    email: 'studio@casinworks.com',
    image: unsplash('photo-1507003211169-0a1dd7228f2d', 800),
    bio: 'Operations lead for ferry, demo, and lease-support missions. Coordinates permits, ground handling, and 24-hour crew dispatch so the aircraft moves on schedule.',
  },
];

export const STATS = [
  { value: '30+', label: 'Years worldwide' },
  { value: '24h', label: 'Crew dispatch' },
  { value: 'Global', label: 'Ferry network' },
];
