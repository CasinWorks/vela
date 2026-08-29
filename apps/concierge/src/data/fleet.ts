export interface GroundVehicle {
  id: string;
  name: string;
  category: 'Luxury SUV' | 'Premium 4x4';
  passengers: number;
  luggage: number;
  image: string;
  /** Hourly chauffeur hire — from rate */
  hourlyRateEUR: number;
  /** KEF ↔ Reykjavík private transfer — from rate */
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

export type OfferCurrency = 'EUR' | 'ISK';

export interface IcelandTour {
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

/** Studio-concept luxury fleet — stock photography only */
export const GROUND_FLEET: GroundVehicle[] = [
  {
    id: 'mercedes-gls',
    name: 'Mercedes-Benz GLS',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 5,
    image: unsplash('photo-1618843479313-40f8aa3b3032'),
    hourlyRateEUR: 170,
    transferRateKEF_EUR: 200,
    tag: 'Flagship Chauffeur',
    description:
      'Executive three-row luxury for VIP transfers and private touring. Configured for up to six passengers with a quiet cabin and all-weather confidence.',
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
    image: unsplash('photo-1503376780353-7e6692767b70'),
    hourlyRateEUR: 190,
    transferRateKEF_EUR: 200,
    tag: 'All-Terrain',
    description:
      'High-clearance luxury for Iceland’s demanding roads — lava fields, highland approaches, and winter conditions — with executive comfort for up to four passengers.',
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

/** Studio-concept tours — destination photography is Unsplash stock */
export const ICELAND_TOURS: IcelandTour[] = [
  {
    id: 'jokulsarlon-diamond-beach',
    title: 'Jökulsárlón & Diamond Beach',
    subtitle: 'Glacier lagoon',
    durationHours: 10,
    basePrice: 2100,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1504893524553-b855bce32c67'),
    description:
      'We will visit the lagoon Jökulsárlón where a glacier calves into the lake. It is possible to sail around the glaciers and taste 1000-year-old Icelandic water. A few metres away is the famous Diamond Beach.',
    highlights: [
      'Jökulsárlón glacier lagoon',
      'Optional lagoon boat sailing',
      'Diamond Beach',
    ],
  },
  {
    id: 'vik-reynisdrangar',
    title: 'Vík Reynisdrangar',
    subtitle: 'South Coast Adventure',
    durationHours: 9,
    basePrice: 1800,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1476610182048-b716b8518aae'),
    description:
      'Seljalandsfoss, Skógafoss, Sólheimajökull, Vík, Black Beach, and Dyrhólaey when open. Come with us for a tour through the amazing landscape of the South Coast of Iceland.',
    highlights: [
      'Seljalandsfoss & Skógafoss',
      'Sólheimajökull',
      'Vík · Black Beach · Dyrhólaey',
    ],
  },
  {
    id: 'golden-circle',
    title: 'Gullfoss, Geysir & Þingvellir',
    subtitle: 'Classic Golden Circle',
    durationHours: 7,
    basePrice: 1500,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1464822759023-fed622ff2c3b'),
    description:
      'In Þingvellir you will enjoy beautiful landscape while listening to the great history of the place. From there we go to the boiling Geysir and the powerful waterfall Gullfoss.',
    highlights: [
      'Þingvellir National Park',
      'Geysir geothermal area',
      'Gullfoss waterfall',
    ],
  },
  {
    id: 'vestmannaeyjar',
    title: 'Vestmannaeyjar',
    subtitle: 'Westman Islands',
    durationHours: 8,
    basePrice: 2000,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1507272931001-fc06c17e4f43'),
    description:
      'Westman Islands are islands off the South Coast of Iceland. On one of them is a little and beautiful town of 4–5 thousand inhabitants. Incredible nature and big history touch everyone who goes there. We will sail out by ferry.',
    highlights: [
      'Ferry to the Westman Islands',
      'Island town & nature',
      'Rich local history',
    ],
  },
  {
    id: 'northern-lights',
    title: 'Private Northern Lights Tour',
    subtitle: 'Aurora hunt',
    durationHours: 4,
    basePrice: 1000,
    currency: 'EUR',
    maxPassengers: 6,
    image: unsplash('photo-1531366936337-7c912a4589a7'),
    description:
      'To see the Northern Lights dancing in the sky is a wonder. Because of the bright nights during summer it is not possible to see the Northern Lights from the beginning of May to around 20 August.',
    highlights: [
      'Private aurora chase',
      'Dark-sky locations',
      'Seasonal availability',
    ],
    note: 'Not available early May – ~20 August (bright nights).',
  },
  {
    id: 'wedding-chauffeur',
    title: 'Wedding Chauffeur',
    subtitle: 'Brúðkaups akstur',
    durationHours: 4,
    basePrice: 59900,
    currency: 'ISK',
    maxPassengers: 6,
    image: unsplash('photo-1519741497674-611481863552'),
    description:
      'The wedding day is one of the biggest events in our lives. Why not have a chauffeur in a decorated car to make the experience greater? Brúðkaupsdagurinn er einn stærsti viðburður lífsins — því ekki að hafa einkabílstjóra á skreyttum bíl?',
    highlights: [
      'Decorated chauffeur car',
      'Wedding-day timing',
      'From 59.900 ISK',
    ],
  },
];

export function formatMoney(amount: number, currency: OfferCurrency = 'EUR') {
  if (currency === 'ISK') {
    return `${amount.toLocaleString('is-IS')} ISK`;
  }
  return `€${amount.toLocaleString('en-US')}`;
}

/** Airport transfer — to/from KEF · from €200 · up to 4 passengers */
export const AIRPORT_TRANSFER = {
  title: 'Airport Transfer',
  subtitle: 'To / from the airport',
  description:
    'Do you want to enter the country with comfort and style, and leave it in that way also? Rent a car with a private chauffeur.',
  fromEUR: 200,
  maxPassengers: 4,
  route: 'KEF ↔ Reykjavík',
  image: unsplash('photo-1485291571150-772bcfc10da1'),
};

export const STOCK = {
  hero: unsplash('photo-1492144534655-ae79c964c9d7'),
  cta: unsplash('photo-1419242902214-272b3f66ee7a'),
};
