import { GroundVehicle, Aircraft, IcelandTour, BookingAddon, TrustMetric } from '../types';

export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  PHP: { symbol: '₱', rate: 56, label: 'PHP (₱)' },
};

export const TRUST_METRICS: TrustMetric[] = [
  {
    title: "Worldwide Operations",
    description: "Aviation services and luxury travel, wherever you need us.",
    icon: "Globe"
  },
  {
    title: "Personal Service",
    description: "A dedicated team, available 24/7 to support your journey.",
    icon: "UserCheck"
  },
  {
    title: "Discretion & Trust",
    description: "Your privacy is our priority. Always.",
    icon: "ShieldCheck"
  },
  {
    title: "Philippines Experts",
    description: "Local knowledge and access to extraordinary experiences.",
    icon: "Compass"
  }
];

export const GROUND_FLEET: GroundVehicle[] = [
  {
    id: "mb-s-class",
    name: "Mercedes-Benz S-Class",
    category: "First Class Sedan",
    passengers: 3,
    luggage: 2,
    image: "https://images.unsplash.com/photo-1764089859662-a0be6d20f1a9?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 195,
    transferRateKEF_USD: 390,
    tag: "Chauffeur Flagship",
    description: "Executive sedan for chauffeur transfers. Quiet cabin, all-wheel drive, and a classic Mercedes-Benz presence.",
    features: ["Executive rear seating", "Active acoustic glass", "Still water & amenities", "High-speed 5G Wi-Fi", "Mobile charging suite"],
    specs: {
      drivetrain: "4MATIC All-Wheel Drive",
      interior: "Nappa Exclusive Leather",
      wifi: true,
      refreshments: "Still Water & Mints",
      luggageVolume: "550 Litres"
    }
  },
  {
    id: "mb-v-class-vip",
    name: "Mercedes-Benz V-Class VIP 4MATIC",
    category: "Executive MPV",
    passengers: 6,
    luggage: 6,
    image: "https://images.unsplash.com/photo-1765461734605-34657fa04db2?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 230,
    transferRateKEF_USD: 460,
    tag: "Most Popular for Groups",
    description: "Mercedes-Benz V-Class / Vito executive van — six passengers, all-wheel-drive confidence, and space for luggage on group transfers.",
    features: ["Conference club seating", "On-board refrigerator", "Climate controlled zones", "Large luggage capacity", "Fold-out conference table"],
    specs: {
      drivetrain: "4MATIC Permanent AWD",
      interior: "Lugano Leather & Black Ash Wood",
      wifi: true,
      refreshments: "Chilled Water, Sodas & Treats",
      luggageVolume: "1,030 Litres"
    }
  },
  {
    id: "range-rover-auto",
    name: "Range Rover Autobiography LWB 4WD",
    category: "Luxury 4x4 SUV",
    passengers: 4,
    luggage: 4,
    image: "https://images.unsplash.com/photo-1549632891-a0bea6d0355b?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 260,
    transferRateKEF_USD: 520,
    tag: "Philippine All-Terrain Luxury",
    description: "Peerless refinement for Philippine mountain roads — Tagaytay ridge, Cordillera approaches, and monsoon weather — with air suspension.",
    features: ["Executive Class rear seats", "Meridian Signature audio", "Heated & cooled massagers", "Dynamic air suspension", "Panoramic skyroof"],
    specs: {
      drivetrain: "Terrain Response 2 AWD",
      interior: "Semi-Aniline Perforated Leather",
      wifi: true,
      refreshments: "Still Water & Amenities",
      luggageVolume: "900 Litres"
    }
  },
  {
    id: "mb-sprinter-lounge",
    name: "Mercedes-Benz GLE",
    category: "Luxury SUV",
    passengers: 6,
    luggage: 5,
    image: "https://images.unsplash.com/photo-1583918003285-199304164a2f?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 340,
    transferRateKEF_USD: 680,
    tag: "Executive SUV",
    description: "Mercedes-Benz GLE for VIP transfers and private touring. Quiet cabin, all-weather confidence, and seating for up to six.",
    features: ["Heated leather seating", "Panoramic roof", "High-speed Wi-Fi", "Whisper-quiet cabin", "All-wheel drive"],
    specs: {
      drivetrain: "4MATIC All-Wheel Drive",
      interior: "Nappa leather executive trim",
      wifi: true,
      refreshments: "Still water & amenities",
      luggageVolume: "825 Litres"
    }
  },
  {
    id: "arctic-superjeep",
    name: "Range Rover — highland",
    category: "Luxury 4x4 SUV",
    passengers: 4,
    luggage: 4,
    image: "https://images.unsplash.com/photo-1555941543-f8d372e7f4d7?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 310,
    transferRateKEF_USD: 620,
    tag: "Highland touring",
    description: "Range Rover for highland approaches and wet-season roads — high clearance with executive comfort for up to four passengers.",
    features: ["Up to 4 passengers", "Executive specification", "Full-time 4WD", "High ground clearance", "Climate-controlled cabin"],
    specs: {
      drivetrain: "Full-time 4WD",
      interior: "Leather & wood trim",
      wifi: true,
      refreshments: "Still water & amenities",
      luggageVolume: "900 Litres"
    }
  }
];

export const AIRCRAFT_FLEET: Aircraft[] = [
  {
    id: "gulfstream-g650er",
    name: "Gulfstream G550",
    category: "Heavy / Ultra Long Range",
    passengers: 14,
    rangeNm: 6750,
    speedKts: 488,
    image: "https://images.unsplash.com/photo-1684838200888-192e2a163cc9?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 11800,
    description: "The gold standard in intercontinental private aviation. Flies non-stop from Manila (RPLL) to Los Angeles, Tokyo, or Dubai with low cabin altitude.",
    features: ["Signature oval cabin windows", "Private stateroom & berthable divan", "Ka-band high-speed satellite Wi-Fi", "Full galley & dedicated flight attendant", "Long-range transpacific capability"],
    capabilities: ["Non-stop transpacific", "High altitude cruise (51,000 ft)", "ETOPS oceanic certified", "Oceanic RNP-4 equipped"],
    idealFor: "Intercontinental VIP missions, executive board delegations, nonstop flights to US West Coast, Japan & the Gulf."
  },
  {
    id: "bombardier-challenger-350",
    name: "Dassault Falcon 900",
    category: "Super-Midsize Jet",
    passengers: 12,
    rangeNm: 4500,
    speedKts: 475,
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 7200,
    description: "Three-engine long-range cabin for ASEAN and North Asia missions. Rear-mounted trijet layout with a stand-up cabin and regional-plus range.",
    features: ["Rear-mounted trijet layout", "Stand-up cabin", "Enclosed private lavatory", "Full inflight accessible baggage", "Gourmet hot catering"],
    capabilities: ["Short runway performance", "Steep approach capable", "Full Asia-Pacific routing"],
    idealFor: "ASEAN charter hops, Singapore / Hong Kong / Tokyo private transfers, intra-Asia technical stops."
  },
  {
    id: "embraer-phenom-300e",
    name: "Gulfstream business jet",
    category: "Heavy / Ultra Long Range",
    passengers: 12,
    rangeNm: 6750,
    speedKts: 488,
    image: "https://images.unsplash.com/photo-1684838200815-36eef38f353c?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 4400,
    description: "Large-cabin Gulfstream for ferry, demo, and long-range delivery work. Oval windows, rear-mounted engines, and Asia-Pacific legs from Manila.",
    features: ["Oval cabin windows", "Rear-mounted turbofans", "Long-range cruise", "Dedicated flight attendant"],
    capabilities: ["Rapid turnaround", "Direct climb to 45,000 ft", "Regional high-speed courier"],
    idealFor: "Singapore / Hong Kong / Tokyo / Sydney regional hops, agile business charter."
  },
  {
    id: "ferry-pilatus-pc12",
    name: "Pilatus PC-12 NGX / Ferry Spec",
    category: "Turboprop / Ferry Spec",
    passengers: 8,
    rangeNm: 1800,
    speedKts: 290,
    image: "https://images.unsplash.com/photo-1693835195915-b30cc5ae885c?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 2900,
    description: "The workhorse of island aircraft delivery, short-field ferrying, and remote Philippine airstrip missions. Outfitted for unpaved strips and HF oceanic avionics.",
    features: ["Cargo door for survival gear", "Pratt & Whitney PT6 reliability", "Unpaved gravel runway clearance", "Auxiliary ferry tank compatible"],
    capabilities: ["Palawan & Visayas short-field ops", "Asia-Pacific delivery & ferry", "Oceanic flight planning"],
    idealFor: "Aircraft relocation, island ferry routing, remote Philippine airfield access."
  }
];

export const ICELAND_TOURS: IcelandTour[] = [
  {
    id: "tagaytay-taal-luxury",
    title: "Tagaytay & Taal Vista Signature",
    tagline: "Ridge Viewpoint, Taal Volcano & Highland Lunch",
    durationHours: 8,
    basePriceUSD: 1150,
    distanceKm: 140,
    isPopular: true,
    recommendedVehicleId: "range-rover-auto",
    image: "https://images.unsplash.com/photo-1760982228709-49e8d18dd284?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Tagaytay ridge viewpoint over Taal Lake",
      "Private timing away from coach-tour crowds",
      "Highland lunch reservation with lake views",
      "Cool-air stop on the way back to Manila"
    ],
    description: "The classic day trip from Manila reimagined as a private VIP journey. Avoid tourist buses with tailored timings, bespoke lunch stops, and an expert Filipino driver-guide."
  },
  {
    id: "el-nido-palawan",
    title: "El Nido Hidden Lagoons",
    tagline: "Limestone Karsts, Turquoise Water & Private Banca",
    durationHours: 10,
    basePriceUSD: 1450,
    distanceKm: 380,
    isPopular: true,
    recommendedVehicleId: "mb-v-class-vip",
    image: "https://images.unsplash.com/photo-1749995925383-5195d00a6811?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Limestone lagoons of El Nido, Palawan",
      "Private banca island-hopping timed to you",
      "Hidden beaches and snorkel stops",
      "Chauffeur meet-and-greet on the ground"
    ],
    description: "Karst cliffs, turquoise lagoons, and island time on your own terms. Air transfer to Palawan is arranged separately — your chauffeur meets you on arrival."
  },
  {
    id: "bohol-chocolate-hills",
    title: "Chocolate Hills, Bohol",
    tagline: "Conical Hills, Tarsier Sanctuary & Countryside Roads",
    durationHours: 9,
    basePriceUSD: 850,
    distanceKm: 220,
    recommendedVehicleId: "mb-s-class",
    image: "https://images.unsplash.com/photo-1757949640707-805fc997ae4c?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Chocolate Hills viewpoint in Bohol",
      "Philippine tarsier sanctuary",
      "Quiet countryside roads away from coaches",
      "Optional countryside lunch stop"
    ],
    description: "Hundreds of conical mounds across the Bohol countryside, with tarsier sanctuary and rural roads in absolute private comfort. Air transfer arranged separately."
  },
  {
    id: "banaue-batad",
    title: "Banaue & Batad Rice Terraces",
    tagline: "Cordillera Highlands, Ifugao Villages & Amphitheatre Views",
    durationHours: 9,
    basePriceUSD: 1650,
    distanceKm: 350,
    recommendedVehicleId: "arctic-superjeep",
    image: "https://images.unsplash.com/photo-1716863451357-f193111b8f8e?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Banaue amphitheatre rice-terrace views",
      "Batad village and stepped paddies",
      "Cordillera highland weather and roads",
      "Overnight lodging arranged on request"
    ],
    description: "A private luxury expedition into the Cordillera — carved terraces, mountain villages, and a chauffeur-guide who knows the roads and the timing."
  },
  {
    id: "intramuros-manila",
    title: "Intramuros & Old Manila Heritage",
    tagline: "San Agustin, Fort Santiago & the Walled City",
    durationHours: 5,
    basePriceUSD: 950,
    distanceKm: 40,
    recommendedVehicleId: "range-rover-auto",
    image: "https://images.unsplash.com/photo-1743309196261-1b4f7028b297?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "San Agustin Church, Intramuros",
      "Fort Santiago and cobblestone streets",
      "Walled-city walking with the car nearby",
      "Timed around your hotel or NAIA layover"
    ],
    description: "A half-day heritage circuit through the old walled city of Manila — private car, Filipino driver-guide, and timing built around your layover or hotel."
  }
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: "tarmac-vip",
    name: "VIP Tarmac Aircraft Meet & Greet",
    description: "Personal VIP coordinator meets you directly at aircraft stairs/FBO ramp with airside passport clearance.",
    priceUSD: 180,
    iconName: "PlaneLanding"
  },
  {
    id: "champagne-glacier",
    name: "Veuve Clicquot & Filipino Delicacies",
    description: "Chilled bottle of vintage Champagne on ice with artisanal Filipino chocolates and tropical refreshments.",
    priceUSD: 140,
    iconName: "Wine"
  },
  {
    id: "child-seat",
    name: "ISOFIX Executive Child / Infant Seat",
    description: "Premium ergonomic Britax/Cybex leather child safety seat installed and sanitised.",
    priceUSD: 35,
    iconName: "Baby"
  },
  {
    id: "luggage-van",
    name: "Dedicated Secondary Luggage Van Support",
    description: "For excessive oversized luggage, golf sets, diving gear, or filming equipment following your vehicle.",
    priceUSD: 280,
    iconName: "Truck"
  },
  {
    id: "multilingual-guide",
    name: "Multilingual Specialist Driver Guide",
    description: "Certified Filipino cultural historian guide fluent in French, German, Spanish, Mandarin or Japanese.",
    priceUSD: 190,
    iconName: "Languages"
  }
];

export const POPULAR_AIRPORTS = [
  { icao: "RPLL", iata: "MNL", name: "Ninoy Aquino International Airport", city: "Manila, Philippines" },
  { icao: "RPLC", iata: "CRK", name: "Clark International Airport (FBO)", city: "Clark / Angeles, Philippines" },
  { icao: "RPVM", iata: "CEB", name: "Mactan-Cebu International Airport", city: "Cebu, Philippines" },
  { icao: "RPVP", iata: "PPS", name: "Puerto Princesa International Airport", city: "Palawan, Philippines" },
  { icao: "WSSS", iata: "SIN", name: "Singapore Changi Airport", city: "Singapore" },
  { icao: "VHHH", iata: "HKG", name: "Hong Kong International Airport", city: "Hong Kong" },
  { icao: "RJTT", iata: "HND", name: "Tokyo Haneda Airport", city: "Tokyo, Japan" },
  { icao: "YSSY", iata: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney, Australia" },
  { icao: "KLAX", iata: "LAX", name: "Los Angeles International Airport", city: "Los Angeles, USA" },
  { icao: "OMDB", iata: "DXB", name: "Dubai International (Al Maktoum VIP)", city: "Dubai, UAE" }
];
