/** Studio-concept copy — no real operator identities. All photography is Unsplash stock. */

export const CONTACT = {
  email: 'studio@casinworks.com',
  emailHref: 'mailto:studio@casinworks.com',
  formEmail: 'christianjoshuacasin@gmail.com',
  site: 'https://aviation.casinworks.com',
};

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Distinct stock set — nothing reused from a client gallery. */
export const IMAGES = {
  hero: unsplash('photo-1474303333531-939da2e6ca31', 2400),
  intro: unsplash('photo-1529074963764-98f45c47344b', 1800),
  specialty: unsplash('photo-1559628233-100c798642d4', 1800),
  planning: unsplash('photo-1464037866556-6812c9d1c72e', 1600),
  crew: unsplash('photo-1570710899776-56f259394217', 1600),
  secondary: unsplash('photo-1419242902214-272b3f66ee7a', 2000),
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
  { src: unsplash('photo-1474303333531-939da2e6ca31', 2000), alt: 'White aircraft climbing after takeoff', area: 'feat' as const },
  { src: unsplash('photo-1436491865332-7a61a109cc05', 1200), alt: 'Airliner against a clear sky', area: 'tall' as const },
  { src: unsplash('photo-1559628233-100c798642d4', 1600), alt: 'Aircraft in flight over open country', area: 'board' as const },
  { src: unsplash('photo-1570710899776-56f259394217', 1600), alt: 'Business jet on approach', area: 'fly' as const },
  { src: unsplash('photo-1464037866556-6812c9d1c72e', 1600), alt: 'Flight deck instruments at night', area: 'crew' as const },
  { src: unsplash('photo-1569629743817-70d8db6c323b', 2000), alt: 'Private jet on the apron at dusk', area: 'wide' as const },
  { src: unsplash('photo-1529074963764-98f45c47344b', 1400), alt: 'Airport operations at sunrise', area: 'cap' as const },
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
