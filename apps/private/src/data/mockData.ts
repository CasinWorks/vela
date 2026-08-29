import { GroundVehicle, Aircraft, IcelandTour, BookingAddon, TrustMetric } from '../types';

export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  ISK: { symbol: 'kr', rate: 138, label: 'ISK (kr)' },
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
    title: "Iceland Experts",
    description: "Local knowledge and access to extraordinary experiences.",
    icon: "Compass"
  }
];

export const GROUND_FLEET: GroundVehicle[] = [
  {
    id: "mb-s-class",
    name: "Mercedes-Benz S-Class (LWB)",
    category: "First Class Sedan",
    passengers: 3,
    luggage: 2,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 195,
    transferRateKEF_USD: 390,
    tag: "Chauffeur Flagship",
    description: "The pinnacle of executive comfort. Long-wheelbase configuration with executive rear reclining seats, massage, active noise cancellation, and burmester 3D sound.",
    features: ["Executive rear seating", "Active acoustic glass", "Icelandic glacier water", "High-speed 5G Wi-Fi", "Mobile charging suite"],
    specs: {
      drivetrain: "4MATIC All-Wheel Drive",
      interior: "Nappa Exclusive Leather",
      wifi: true,
      refreshments: "Glacier Spring Water & Mints",
      luggageVolume: "550 Litres"
    }
  },
  {
    id: "mb-v-class-vip",
    name: "Mercedes-Benz V-Class VIP 4MATIC",
    category: "Executive MPV",
    passengers: 6,
    luggage: 6,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 230,
    transferRateKEF_USD: 460,
    tag: "Most Popular for Groups",
    description: "Face-to-face conference seating layout for up to 6 VIP passengers with panoramic roof, integrated tables, refrigerator, and generous luggage capacity.",
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
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 260,
    transferRateKEF_USD: 520,
    tag: "Iceland All-Terrain Luxury",
    description: "Peerless refinement meets Icelandic volcanic capability. Effortlessly navigates snow, lava field passes, and coastal routes with air suspension.",
    features: ["Executive Class rear seats", "Meridian Signature audio", "Heated & cooled massagers", "Dynamic air suspension", "Panoramic skyroof"],
    specs: {
      drivetrain: "Terrain Response 2 AWD",
      interior: "Semi-Aniline Perforated Leather",
      wifi: true,
      refreshments: "Icelandic Spring Water & Amenities",
      luggageVolume: "900 Litres"
    }
  },
  {
    id: "mb-sprinter-lounge",
    name: "Mercedes-Benz Sprinter Executive Lounge",
    category: "VIP Sprinter Lounge",
    passengers: 12,
    luggage: 14,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 340,
    transferRateKEF_USD: 680,
    tag: "Private Delegation",
    description: "Custom bespoke coach-built private jet cabin for the road. Features captain's chairs, 4K display monitors, Apple TV, mood lighting, and bar area.",
    features: ["Captain swivel chairs", "Dual 4K smart screens", "Bar and champagne cooler", "Spacious stand-up cabin", "HDMI/AirPlay presentations"],
    specs: {
      drivetrain: "Heavy-Duty All-Weather Chauffeur",
      interior: "Diamond-Stitched Maybach Leather",
      wifi: true,
      refreshments: "Champagne Bar & Nespresso",
      luggageVolume: "3,200 Litres"
    }
  },
  {
    id: "arctic-superjeep",
    name: "Arctic Spec Super Jeep Luxury 4x4",
    category: "Arctic Spec Super Jeep",
    passengers: 5,
    luggage: 4,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 310,
    transferRateKEF_USD: 620,
    tag: "Glacier & Highland Access",
    description: "Custom modified 44-inch tire luxury expedition vehicle engineered specifically for Icelandic glacier traversing, river crossings, and untamed volcanic highlands.",
    features: ["44-inch Arctic flotation tires", "Central tire inflation system", "Heated leather captain chairs", "Satellite comms & GPS beacon", "Glacier ice-crossing cert"],
    specs: {
      drivetrain: "Heavy Duty Custom 4x4 Locking Diffs",
      interior: "Heated Luxury Overland Trim",
      wifi: true,
      refreshments: "Hot Thermos & Glacier Spirits",
      luggageVolume: "1,100 Litres"
    }
  }
];

export const AIRCRAFT_FLEET: Aircraft[] = [
  {
    id: "gulfstream-g650er",
    name: "Gulfstream G650ER",
    category: "Heavy / Ultra Long Range",
    passengers: 14,
    rangeNm: 7500,
    speedKts: 516,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 11800,
    description: "The gold standard in transatlantic and intercontinental private aviation. Flies non-stop from Reykjavik (KEF) to Los Angeles, Tokyo, or Dubai with low cabin altitude.",
    features: ["Lowest cabin altitude in class", "Private stateroom & berthable divan", "Ka-band high-speed satellite Wi-Fi", "Full galley & dedicated flight attendant", "16 panoramic oval windows"],
    capabilities: ["Non-stop transatlantic", "High altitude cruise (51,000 ft)", "Polar route certified", "Oceanic RNP-4 equipped"],
    idealFor: "Intercontinental VIP missions, executive board delegations, nonstop flights to US West Coast & Asia."
  },
  {
    id: "bombardier-challenger-350",
    name: "Bombardier Challenger 350",
    category: "Super-Midsize Jet",
    passengers: 9,
    rangeNm: 3200,
    speedKts: 470,
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 7200,
    description: "Optimal performance and stand-up flat floor cabin. Connects Iceland effortlessly to all major European capitals (London, Paris, Zurich, Milan) and North America's east coast.",
    features: ["Flat floor widebody cabin", "HD entertainment & sound system", "Enclosed private lavatory", "Full inflight accessible baggage", "Gourmet hot catering"],
    capabilities: ["Steep approach certified (London City)", "Short runway performance", "Full North Atlantic tracks"],
    idealFor: "European charter hops, London/Paris to Iceland private transfers, North Atlantic technical stops."
  },
  {
    id: "embraer-phenom-300e",
    name: "Embraer Phenom 300E",
    category: "Light Jet",
    passengers: 6,
    rangeNm: 2010,
    speedKts: 464,
    image: "https://images.unsplash.com/photo-1519074069444-1ba4eae16e6e?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 4400,
    description: "The world's best-selling light jet for a decade. Exceptional speed, low operating cost, and BMW-designed interior for rapid regional charter and fast ferry hops.",
    features: ["Bossa Nova luxury interior", "Largest baggage compartment in light jets", "Single-point refueling", "Upper oval cabin cross-section"],
    capabilities: ["Rapid turnaround", "Direct climb to 45,000 ft", "Regional high-speed courier"],
    idealFor: "Greenland / Faroe Islands / UK / Scandinavia regional hops, agile business charter."
  },
  {
    id: "ferry-pilatus-pc12",
    name: "Pilatus PC-12 NGX / Ferry Spec",
    category: "Turboprop / Ferry Spec",
    passengers: 8,
    rangeNm: 1800,
    speedKts: 290,
    image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=1200&q=80",
    hourlyRateUSD: 2900,
    description: "The workhorse of transatlantic aircraft delivery, oceanic ferrying, and remote Icelandic airstrip missions. Outfitted with survival immersion gear and HF oceanic avionics.",
    features: ["Cargo door for oceanic survival gear", "Pratt & Whitney PT6 reliability", "Unpaved gravel runway clearance", "Auxiliary ferry tank compatible"],
    capabilities: ["Greenland Narsarsuaq & Kulusuk ops", "Transatlantic delivery & ferry", "Oceanic flight planning"],
    idealFor: "Aircraft relocation, transatlantic ferry routing, extreme remote Icelandic airfield access."
  }
];

export const ICELAND_TOURS: IcelandTour[] = [
  {
    id: "golden-circle-luxury",
    title: "The Golden Circle Private Signature",
    tagline: "Þingvellir Rift, Geysir Eruptions & Gullfoss Cascade",
    durationHours: 8,
    basePriceUSD: 1150,
    distanceKm: 280,
    isPopular: true,
    recommendedVehicleId: "range-rover-auto",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Walk between continents at UNESCO Þingvellir National Park",
      "VIP access to erupting Strokkur geothermal geysir",
      "Private viewing ledge above thunderous Gullfoss Waterfall",
      "Exclusive lunch reservation at Friðheimar tomato greenhouse or private chef"
    ],
    description: "The classic Icelandic circuit reimagined as a private VIP journey. Avoid tourist buses with tailored timings, bespoke champagne stops, and an expert local driver-guide."
  },
  {
    id: "south-coast-glaciers",
    title: "South Coast Waterfalls & Black Sand Beaches",
    tagline: "Seljalandsfoss, Skógafoss & Reynisfjara Basalt Columns",
    durationHours: 10,
    basePriceUSD: 1450,
    distanceKm: 380,
    isPopular: true,
    recommendedVehicleId: "mb-v-class-vip",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Walk behind the cascade of Seljalandsfoss waterfall",
      "Stand before the majestic 60-meter drop of Skógafoss",
      "Roam the dramatic volcanic black basalt beaches of Reynisfjara",
      "Optional add-on: Private snowmobile or helicopter landing on Eyjafjallajökull"
    ],
    description: "Dramatic glaciers, towering sea cliffs, roaring waterfalls, and black volcanic sands along Iceland's famous southern shoreline in absolute private comfort."
  },
  {
    id: "blue-lagoon-retreat",
    title: "Reykjanes Peninsula & Blue Lagoon VIP Retreat",
    tagline: "Volcanic Fissures, Reykjanesviti & Exclusive Mineral Sanctuary",
    durationHours: 6,
    basePriceUSD: 850,
    distanceKm: 140,
    recommendedVehicleId: "mb-s-class",
    image: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Geothermal bubbling mud pools at Seltún & Gunnuhver",
      "Bridge Between Continents tectonic crossing",
      "VIP Host door-to-door escort to The Retreat Spa at Blue Lagoon",
      "Private changing suite with subterranean lagoon access"
    ],
    description: "The ultimate wellness and arrival transition. Connect directly from your private jet or international flight into geothermal luxury on the Reykjanes peninsula."
  },
  {
    id: "glacier-highlands-superjeep",
    title: "Langjökull Glacier Ice Tunnel & Highland Super Jeep",
    tagline: "Deep Interior Ice Cave & Untamed Lava Fields",
    durationHours: 9,
    basePriceUSD: 1650,
    distanceKm: 320,
    recommendedVehicleId: "arctic-superjeep",
    image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Drive across deep glacial crevasses with our 44-inch Arctic Super Jeep",
      "Enter man-made subglacial ice tunnels 300m into blue glacier ice",
      "Traverse Húsafell and the volcanic Kaldidalur highland mountain pass",
      "Glacier champagne toast on the ice cap"
    ],
    description: "An exhilarating private luxury expedition into Iceland's untamed interior, accessible exclusively with Arctic-grade custom modified luxury vehicles."
  },
  {
    id: "northern-lights-hunt",
    title: "Private Aurora Borealis Chauffeur & Stargazing",
    tagline: "Real-time Solar Storm Tracking & Remote Dark Sky Glens",
    durationHours: 5,
    basePriceUSD: 950,
    distanceKm: 180,
    recommendedVehicleId: "range-rover-auto",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Dedicated aurora meteorologist tracking cloud cover and solar flares",
      "Hot Icelandic cocoa, artisanal spirits, and warm wool blankets",
      "Professional high-aperture camera photos of you under the Northern Lights",
      "Flexible start time based on prime nocturnal solar forecast"
    ],
    description: "Escape light pollution in total warmth. Your private chauffeur hunts active auroral ribbons across dark fjords with real-time satellite telemetry."
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
    name: "Veuve Clicquot & Icelandic Delicacies",
    description: "Chilled bottle of vintage Champagne on ice with artisanal Icelandic chocolates and glacier refreshments.",
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
    description: "For excessive oversized luggage, golf sets, ski gear, or filming equipment following your vehicle.",
    priceUSD: 280,
    iconName: "Truck"
  },
  {
    id: "multilingual-guide",
    name: "Multilingual Specialist Driver Guide",
    description: "Certified Icelandic historian/geologist guide fluent in French, German, Spanish or Mandarin.",
    priceUSD: 190,
    iconName: "Languages"
  }
];

export const POPULAR_AIRPORTS = [
  { icao: "BIKF", iata: "KEF", name: "Keflavík International Airport", city: "Reykjavik, Iceland" },
  { icao: "BIRK", iata: "RKV", name: "Reykjavík City Airport (FBO/Domestic)", city: "Reykjavik, Iceland" },
  { icao: "KTEB", iata: "TEB", name: "Teterboro Airport (NYC VIP)", city: "New York, USA" },
  { icao: "EGLF", iata: "FAB", name: "Farnborough Airport", city: "London, UK" },
  { icao: "LFPB", iata: "LBG", name: "Paris Le Bourget Airport", city: "Paris, France" },
  { icao: "LSGG", iata: "GVA", name: "Geneva Cointrin Airport", city: "Geneva, Switzerland" },
  { icao: "OMDB", iata: "DXB", name: "Dubai International (Al Maktoum VIP)", city: "Dubai, UAE" },
  { icao: "KMIA", iata: "MIA", name: "Miami International / Opa-locka VIP", city: "Miami, USA" },
  { icao: "BGBW", iata: "UAK", name: "Narsarsuaq Airport (Transatlantic Fuel)", city: "Greenland" },
  { icao: "EKVG", iata: "FAE", name: "Vágar Airport", city: "Faroe Islands" }
];
