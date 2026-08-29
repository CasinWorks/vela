export type ActiveDivision = 'parent' | 'limousine' | 'jets' | 'blueprint' | 'about';

export type Currency = 'USD' | 'EUR' | 'PHP' | 'GBP';

export interface GroundVehicle {
  id: string;
  name: string;
  category: 'First Class Sedan' | 'Executive MPV' | 'Luxury SUV' | 'Luxury 4x4 SUV';
  passengers: number;
  luggage: number;
  image: string;
  hourlyRateUSD: number;
  transferRateKEF_USD: number;
  features: string[];
  specs: {
    drivetrain: string;
    interior: string;
    wifi: boolean;
    refreshments: string;
    luggageVolume: string;
  };
  tag?: string;
  description: string;
}

export interface Aircraft {
  id: string;
  name: string;
  category: 'Light Jet' | 'Super-Midsize Jet' | 'Heavy / Ultra Long Range' | 'Turboprop / Ferry Spec';
  passengers: number;
  rangeNm: number;
  speedKts: number;
  image: string;
  hourlyRateUSD: number;
  features: string[];
  capabilities: string[];
  description: string;
  idealFor: string;
}

export interface IcelandTour {
  id: string;
  title: string;
  tagline: string;
  durationHours: number;
  basePriceUSD: number;
  image: string;
  highlights: string[];
  description: string;
  recommendedVehicleId: string;
  distanceKm: number;
  isPopular?: boolean;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  iconName: string;
}

export interface GroundBookingState {
  serviceType: 'airport_transfer' | 'hourly_hire' | 'day_tour' | 'tarmac_vip';
  originAirport?: 'MNL' | 'CRK' | 'custom';
  pickupAddress: string;
  dropoffAddress: string;
  selectedTourId?: string;
  flightNumber?: string;
  date: string;
  time: string;
  hoursNeeded: number;
  vehicleId: string;
  passengers: number;
  luggageCount: number;
  selectedAddons: string[];
  specialRequests: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: 'invoice' | 'credit_card' | 'wire';
}

export interface AviationInquiryState {
  serviceType: 'charter' | 'ferry_delivery' | 'oceanic_support' | 'aircraft_management';
  originIcao: string;
  destinationIcao: string;
  aircraftCategory: string;
  passengers: number;
  departureDate: string;
  returnDate?: string;
  isRoundTrip: boolean;
  requiresFerryCrew: boolean;
  requiresFuelPermits: boolean;
  requiresOceanicRafts: boolean;
  clientName: string;
  clientCompany?: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}

export interface TrustMetric {
  title: string;
  description: string;
  icon: string;
}

export interface ArchitectureComponentDoc {
  name: string;
  type: 'Global / Umbrella' | 'Vela Concierge' | 'Vela Aviation' | 'Shared Engine';
  props: string[];
  description: string;
  stateManaged: string;
}
