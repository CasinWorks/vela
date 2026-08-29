export interface GroundVehicle {
  id: string;
  name: string;
  category: 'Luxury SUV' | 'Premium 4x4';
  passengers: number;
  luggage: number;
  image: string;
  /** Hourly chauffeur hire — from rate */
  hourlyRateEUR: number;
  /** NAIA (MNL) ↔ Manila / Makati private transfer — from rate */
  transferRateKEF_EUR: number;
  features: string[];
  specs: {
    drivetrain: string;
    interior: string;
    wifi: boolean;
    refreshments: string;
  };
  tag?: string;
  description: string;
}

export type OfferCurrency = 'EUR' | 'PHP';

export interface PrivateTour {
  id: string;
  title: string;
  subtitle?: string;
  durationHours: number;
  basePrice: number;
  currency: OfferCurrency;
  maxPassengers: number;
  image: string;
  description: string;
  highlights: string[];
  /** Seasonal or operational note shown on cards / booking */
  note?: string;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

/**
 * Studio-concept luxury fleet — Unsplash stock, visually matched to the name.
 * GLE: photo-1583918003285 (Mercedes-Benz GLE, not GLS — Unsplash has no clear GLS exterior).
 * Range Rover: photo-1549632891 (RANGE ROVER lettering on the bonnet).
 */
export const GROUND_FLEET: GroundVehicle[] = [
  {
    id: 'mercedes-gle',
    name: 'Mercedes-Benz GLE',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 5,
    image: unsplash('photo-1583918003285-199304164a2f'),
    hourlyRateEUR: 170,
    transferRateKEF_EUR: 200,
    tag: 'Flagship Chauffeur',
    description:
      'Executive luxury SUV for VIP transfers and private touring. Configured for up to six passengers with a quiet cabin and all-weather confidence.',
    features: [
      'Up to 6 passengers',
      'Heated leather seating',
      'Panoramic roof',
      'High-speed Wi-Fi',
      'Whisper-quiet cabin',
    ],
    specs: {
      drivetrain: 'All-Wheel Drive',
      interior: 'Nappa leather executive trim',
      wifi: true,
      refreshments: 'Still water & amenities',
    },
  },
  {
    id: 'range-rover',
    name: 'Range Rover',
    category: 'Premium 4x4',
    passengers: 4,
    luggage: 4,
    image: unsplash('photo-1549632891-a0bea6d0355b'),
    hourlyRateEUR: 190,
    transferRateKEF_EUR: 200,
    tag: 'All-Terrain',
    description:
      'High-clearance luxury for Philippine mountain roads — Tagaytay ridge, Cordillera approaches, and monsoon weather — with executive comfort for up to four passengers.',
    features: [
      'Up to 4 passengers',
      'Executive specification',
      'Full-time 4WD capability',
      'High ground clearance',
      'Climate-controlled cabin',
    ],
    specs: {
      drivetrain: 'Full-time 4WD',
      interior: 'Leather & wood trim',
      wifi: true,
      refreshments: 'Still water & amenities',
    },
  },
];

/**
 * Studio-concept tours — destination photography is Unsplash stock, matched to each label.
 * El Nido lagoon: photo-1749995925383 · Bohol Chocolate Hills: photo-1757949640707
 * Taal: photo-1760982228709 · Batad rice terraces: photo-1716863451357
 * San Agustin, Intramuros: photo-1743309196261
 */
export const PRIVATE_TOURS: PrivateTour[] = [
  {
    id: 'el-nido-palawan',
    title: 'El Nido & Hidden Lagoons',
    subtitle: 'Palawan island day',
    durationHours: 10,
    basePrice: 2100,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1749995925383-5195d00a6811'),
    description:
      'We will visit the limestone lagoons of El Nido, where karst cliffs rise from turquoise water. Island-hopping by private banca, hidden beaches, and time on the water — arranged around your pace.',
    highlights: [
      'Limestone lagoons of El Nido',
      'Private banca island-hopping',
      'Hidden beaches & snorkel stops',
    ],
    note: 'Air transfer to Palawan arranged separately — chauffeur meets you on the ground.',
  },
  {
    id: 'bohol-chocolate-hills',
    title: 'Chocolate Hills, Bohol',
    subtitle: 'Countryside adventure',
    durationHours: 9,
    basePrice: 1800,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1757949640707-805fc997ae4c'),
    description:
      'The Chocolate Hills of Bohol — hundreds of conical mounds across the countryside — with tarsier sanctuary and quiet rural roads. Come with us for a tour through Bohol’s most famous landscape.',
    highlights: [
      'Chocolate Hills viewpoint',
      'Philippine tarsier sanctuary',
      'Bohol countryside roads',
    ],
    note: 'Air transfer to Bohol arranged separately — chauffeur meets you on the ground.',
  },
  {
    id: 'tagaytay-taal',
    title: 'Tagaytay & Taal Vista',
    subtitle: 'Classic day trip from Manila',
    durationHours: 7,
    basePrice: 1500,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1760982228709-49e8d18dd284'),
    description:
      'From Manila we drive south to Tagaytay’s ridge for the view of Taal Volcano in the lake. Cool highland air, a long lunch stop, and the classic day trip when you want the city behind you.',
    highlights: [
      'Tagaytay ridge viewpoint',
      'Taal Volcano in the lake',
      'Highland lunch stop',
    ],
  },
  {
    id: 'banaue-batad',
    title: 'Banaue & Batad Rice Terraces',
    subtitle: 'Cordillera highlands',
    durationHours: 8,
    basePrice: 2000,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1716863451357-f193111b8f8e'),
    description:
      'The rice terraces of Banaue and Batad are carved into the Cordillera — a landscape of steps, villages, and mountain weather. We travel north with a chauffeur-guide who knows the roads and the timing.',
    highlights: [
      'Banaue amphitheatre views',
      'Batad rice terraces',
      'Ifugao highland villages',
    ],
    note: 'Long northbound drive from Manila — overnight lodging can be arranged.',
  },
  {
    id: 'intramuros-manila',
    title: 'Intramuros & Old Manila',
    subtitle: 'Walled-city heritage',
    durationHours: 4,
    basePrice: 1000,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1743309196261-1b4f7028b297'),
    description:
      'Intramuros is the old walled city of Manila — San Agustin, Fort Santiago, cobblestone streets. A half-day heritage circuit with a private car, timed around your hotel or NAIA layover.',
    highlights: [
      'San Agustin Church',
      'Fort Santiago',
      'Walled-city walking with the car nearby',
    ],
  },
  {
    id: 'wedding-chauffeur',
    title: 'Wedding Chauffeur',
    subtitle: 'Serbisyo sa kasalan',
    durationHours: 4,
    basePrice: 59900,
    currency: 'PHP',
    maxPassengers: 6,
    image: unsplash('photo-1519741497674-611481863552'),
    description:
      'The wedding day is one of the biggest events in our lives. Why not have a chauffeur in a decorated car to make the experience greater? Ang araw ng kasalan ay isa sa pinakamahahalagang araw — bakit hindi magkaroon ng pribadong tsuper sa pinalamutiang sasakyan?',
    highlights: [
      'Decorated chauffeur car',
      'Wedding-day timing',
      'From ₱59,900',
    ],
  },
];

export function formatMoney(amount: number, currency: OfferCurrency | 'ISK' = 'EUR') {
  if (currency === 'PHP') {
    return `₱${amount.toLocaleString('en-PH')}`;
  }
  if (currency === 'ISK') {
    return `${amount.toLocaleString('is-IS')} ISK`;
  }
  return `€${amount.toLocaleString('en-US')}`;
}

/** Airport transfer — to/from NAIA · from €200 · up to 4 passengers */
export const AIRPORT_TRANSFER = {
  title: 'Airport Transfer',
  subtitle: 'To / from the airport',
  description:
    'Do you want to enter the country with comfort and style, and leave it in that way also? Rent a car with a private chauffeur.',
  fromEUR: 200,
  maxPassengers: 4,
  route: 'NAIA (MNL) ↔ Makati',
  image: unsplash('photo-1485291571150-772bcfc10da5'),
};

export const STOCK = {
  /** Range Rover, side profile */
  hero: unsplash('photo-1563458563737-e60b1f1b345f'),
  /** El Nido coastline — Palawan, Philippines */
  cta: unsplash('photo-1757258631937-5dfdd0dae3a8'),
};
