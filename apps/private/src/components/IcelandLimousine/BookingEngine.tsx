import React, { useState } from 'react';
import { Currency, GroundBookingState, GroundVehicle } from '../../types';
import { GROUND_FLEET, BOOKING_ADDONS, ICELAND_TOURS, CURRENCY_RATES, POPULAR_AIRPORTS } from '../../data/mockData';
import { 
  Car, 
  Plane, 
  Clock, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  Luggage, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  PlaneLanding,
  Wine,
  Baby,
  Truck,
  Languages,
  DollarSign,
  CreditCard,
  Building,
  CheckCircle2,
  Info
} from 'lucide-react';

interface BookingEngineProps {
  currency: Currency;
  onBookingComplete: (bookingDetails: GroundBookingState & { totalCalculatedUSD: number; referenceId: string }) => void;
  initialOptions?: {
    serviceType?: string;
    vehicleId?: string;
    tourId?: string;
  };
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  currency,
  onBookingComplete,
  initialOptions
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const today = new Date().toISOString().split('T')[0];

  const [bookingState, setBookingState] = useState<GroundBookingState>({
    serviceType: (initialOptions?.serviceType as any) || 'airport_transfer',
    originAirport: 'MNL',
    pickupAddress: 'Ninoy Aquino International Airport (NAIA / MNL) FBO / VIP Terminal',
    dropoffAddress: 'Makati CBD / Hotel',
    selectedTourId: initialOptions?.tourId || 'golden-circle-luxury',
    flightNumber: 'PR 101 / Private Jet',
    date: today,
    time: '14:30',
    hoursNeeded: 4,
    vehicleId: initialOptions?.vehicleId || 'mb-s-class',
    passengers: 2,
    luggageCount: 2,
    selectedAddons: ['tarmac-vip'],
    specialRequests: '',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    paymentMethod: 'credit_card'
  });

  const selectedVehicle = GROUND_FLEET.find(v => v.id === bookingState.vehicleId) || GROUND_FLEET[0];
  const selectedTour = ICELAND_TOURS.find(t => t.id === bookingState.selectedTourId);

  // Price Calculation Logic
  const calculateTotalUSD = (): number => {
    let base = 0;
    if (bookingState.serviceType === 'airport_transfer') {
      base = selectedVehicle.transferRateKEF_USD;
    } else if (bookingState.serviceType === 'hourly_hire') {
      base = selectedVehicle.hourlyRateUSD * Math.max(3, bookingState.hoursNeeded);
    } else if (bookingState.serviceType === 'day_tour' && selectedTour) {
      // Scale tour base price with vehicle category
      const vehicleMultiplier = bookingState.vehicleId === 'arctic-superjeep' ? 1.4 : bookingState.vehicleId === 'mb-sprinter-lounge' ? 1.5 : 1.0;
      base = Math.round(selectedTour.basePriceUSD * vehicleMultiplier);
    } else if (bookingState.serviceType === 'tarmac_vip') {
      base = selectedVehicle.transferRateKEF_USD + 150; // VIP airside clearance supplement
    }

    // Addons
    const addonsTotal = bookingState.selectedAddons.reduce((sum, addonId) => {
      const addon = BOOKING_ADDONS.find(a => a.id === addonId);
      return sum + (addon ? addon.priceUSD : 0);
    }, 0);

    return base + addonsTotal;
  };

  const totalUSD = calculateTotalUSD();
  const rateObj = CURRENCY_RATES[currency];
  const convertedTotal = Math.round(totalUSD * rateObj.rate);

  const formatPrice = (amountUSD: number) => {
    const val = Math.round(amountUSD * rateObj.rate);
    return `${rateObj.symbol}${val.toLocaleString()} ${currency}`;
  };

  const toggleAddon = (addonId: string) => {
    setBookingState(prev => {
      const exists = prev.selectedAddons.includes(addonId);
      return {
        ...prev,
        selectedAddons: exists
          ? prev.selectedAddons.filter(id => id !== addonId)
          : [...prev.selectedAddons, addonId]
      };
    });
  };

  const renderAddonIcon = (name: string) => {
    switch (name) {
      case 'PlaneLanding': return <PlaneLanding className="w-5 h-5 text-[#C5A880]" />;
      case 'Wine': return <Wine className="w-5 h-5 text-[#C5A880]" />;
      case 'Baby': return <Baby className="w-5 h-5 text-[#C5A880]" />;
      case 'Truck': return <Truck className="w-5 h-5 text-[#C5A880]" />;
      case 'Languages': return <Languages className="w-5 h-5 text-[#C5A880]" />;
      default: return <Sparkles className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingState.guestName || !bookingState.guestEmail || !bookingState.guestPhone) {
      alert('Please fill in your primary contact details.');
      return;
    }

    const ref = `IL-${Math.floor(100000 + Math.random() * 900000)}`;
    onBookingComplete({
      ...bookingState,
      totalCalculatedUSD: totalUSD,
      referenceId: ref
    });
  };

  return (
    <div id="booking-engine-container" className="w-full max-w-5xl mx-auto bg-[#0C1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Top Wizard Steps Header */}
      <div className="bg-[#080B0F] border-b border-white/10 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
              VELA CONCIERGE CHAUFFEUR RESERVATIONS
            </span>
            <h2 className="font-serif-luxury text-xl sm:text-2xl text-white mt-0.5">
              Bespoke Ground Journey Configurator
            </h2>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Total Estimate:</span>
            <span className="font-semibold text-lg text-amber-300 font-sans">
              {rateObj.symbol}{convertedTotal.toLocaleString()} {currency}
            </span>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-5 gap-2 mt-6">
          {[
            { num: 1, title: 'Service Type' },
            { num: 2, title: 'Route & Time' },
            { num: 3, title: 'Select Vehicle' },
            { num: 4, title: 'VIP Add-ons' },
            { num: 5, title: 'Confirm' }
          ].map(step => (
            <button
              key={step.num}
              onClick={() => step.num < currentStep && setCurrentStep(step.num)}
              disabled={step.num > currentStep}
              className={`flex flex-col items-center sm:items-start p-2 rounded transition-all text-left ${
                currentStep === step.num
                  ? 'bg-[#C5A880]/15 border-b-2 border-[#C5A880]'
                  : step.num < currentStep
                  ? 'bg-white/5 opacity-80 cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold ${currentStep === step.num ? 'text-[#C5A880]' : 'text-slate-400'}`}>
                STEP 0{step.num}
              </span>
              <span className="hidden sm:inline text-xs text-white font-medium truncate w-full">
                {step.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Body */}
      <div className="p-6 sm:p-8">
        
        {/* STEP 1: SERVICE TYPE */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-2xl text-white">Select Your Journey Category</h3>
              <p className="text-xs text-slate-400 mt-1">Choose between airport transfers, hourly private driver hire, or bespoke day tours.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 1: Airport Transfer */}
              <div
                onClick={() => {
                  setBookingState(prev => ({
                    ...prev,
                    serviceType: 'airport_transfer',
                    pickupAddress: 'Ninoy Aquino International Airport (NAIA / MNL)',
                    dropoffAddress: 'Makati CBD / Hotel'
                  }));
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  bookingState.serviceType === 'airport_transfer'
                    ? 'bg-[#C5A880]/10 border-[#C5A880] shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <PlaneLanding className="w-6 h-6 text-[#C5A880]" />
                    <span className="text-[10px] uppercase font-semibold text-[#C5A880] bg-black/40 px-2 py-0.5 rounded border border-[#C5A880]/30">
                      Most Booked
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white">NAIA &amp; Clark Airport Transfer</h4>
                  <p className="text-xs text-slate-400">
                    Direct door-to-door transfer between NAIA/Clark airports and Makati, BGC, or Tagaytay. Live flight monitoring included.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Fixed Rates from:</span>
                  <span className="font-semibold text-white">{formatPrice(390)}</span>
                </div>
              </div>

              {/* Option 2: Hourly Hire */}
              <div
                onClick={() => {
                  setBookingState(prev => ({
                    ...prev,
                    serviceType: 'hourly_hire',
                    hoursNeeded: 4
                  }));
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  bookingState.serviceType === 'hourly_hire'
                    ? 'bg-[#C5A880]/10 border-[#C5A880] shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Clock className="w-6 h-6 text-[#C5A880]" />
                    <span className="text-[10px] uppercase font-semibold text-slate-300 bg-black/40 px-2 py-0.5 rounded">
                      Chauffeur at Disposal
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white">Hourly &amp; Daily Chauffeur Hire</h4>
                  <p className="text-xs text-slate-400">
                    Your dedicated personal driver and luxury vehicle at your exact disposal for meetings, shopping, events, or spontaneous sightseeing.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Hourly from:</span>
                  <span className="font-semibold text-white">{formatPrice(195)}/hr</span>
                </div>
              </div>

              {/* Option 3: Bespoke Day Tour */}
              <div
                onClick={() => {
                  setBookingState(prev => ({
                    ...prev,
                    serviceType: 'day_tour',
                    selectedTourId: 'tagaytay-taal-luxury'
                  }));
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  bookingState.serviceType === 'day_tour'
                    ? 'bg-[#C5A880]/10 border-[#C5A880] shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <MapPin className="w-6 h-6 text-[#C5A880]" />
                    <span className="text-[10px] uppercase font-semibold text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-amber-500/30">
                      Private Signature Tours
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white">Private Philippine Day Tours</h4>
                  <p className="text-xs text-slate-400">
                    Tagaytay &amp; Taal, El Nido, Bohol Chocolate Hills, Banaue rice terraces, and Intramuros heritage with expert guides.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Private Tours from:</span>
                  <span className="font-semibold text-white">{formatPrice(850)}</span>
                </div>
              </div>

              {/* Option 4: Tarmac Airside Escort */}
              <div
                onClick={() => {
                  setBookingState(prev => ({
                    ...prev,
                    serviceType: 'tarmac_vip',
                    pickupAddress: 'NAIA Private Jet FBO Ramp / Aircraft Steps'
                  }));
                }}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  bookingState.serviceType === 'tarmac_vip'
                    ? 'bg-[#C5A880]/10 border-[#C5A880] shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
                    <span className="text-[10px] uppercase font-semibold text-[#C5A880] bg-black/40 px-2 py-0.5 rounded">
                      VIP FBO Service
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white">VIP Airside &amp; Private Jet Escort</h4>
                  <p className="text-xs text-slate-400">
                    Vehicle pulled directly up to your private jet steps or commercial airside gate with diplomatic customs clearance assistance.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-400">VIP Package from:</span>
                  <span className="font-semibold text-white">{formatPrice(540)}</span>
                </div>
              </div>

            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs uppercase tracking-widest px-8 py-3 rounded flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue to Route</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ROUTE & SCHEDULE */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-2xl text-white">Route, Timing &amp; Itinerary</h3>
              <p className="text-xs text-slate-400 mt-1">Specify your pickup, destination, flight details, and scheduled service window.</p>
            </div>

            {/* If Tour Service Selected */}
            {bookingState.serviceType === 'day_tour' && (
              <div className="space-y-3">
                <label className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider block">
                  Select Private Itinerary:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ICELAND_TOURS.map(tour => (
                    <div
                      key={tour.id}
                      onClick={() => setBookingState(prev => ({ ...prev, selectedTourId: tour.id }))}
                      className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                        bookingState.selectedTourId === tour.id
                          ? 'bg-[#C5A880]/15 border-[#C5A880]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-white text-xs">{tour.title}</span>
                        <span className="text-[10px] text-[#C5A880] font-mono">{tour.durationHours} hrs</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{tour.tagline}</p>
                      <div className="mt-2 text-[11px] font-semibold text-amber-300">
                        {formatPrice(tour.basePriceUSD)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pick-up / Drop-off form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  Pick-up Location / Airport
                </label>
                <input
                  type="text"
                  value={bookingState.pickupAddress}
                  onChange={(e) => setBookingState({ ...bookingState, pickupAddress: e.target.value })}
                  placeholder="e.g., NAIA (MNL) or Hotel Address"
                  className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  Drop-off Destination
                </label>
                <input
                  type="text"
                  value={bookingState.dropoffAddress}
                  onChange={(e) => setBookingState({ ...bookingState, dropoffAddress: e.target.value })}
                  placeholder="e.g., Raffles Makati / Shangri-La Boracay"
                  className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                  Service Date
                </label>
                <input
                  type="date"
                  value={bookingState.date}
                  min={today}
                  onChange={(e) => setBookingState({ ...bookingState, date: e.target.value })}
                  className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={bookingState.time}
                  onChange={(e) => setBookingState({ ...bookingState, time: e.target.value })}
                  className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* If Airport service, show Flight Tracking Number */}
              {(bookingState.serviceType === 'airport_transfer' || bookingState.serviceType === 'tarmac_vip') && (
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#C5A880]" />
                    Inbound Flight Number (For Live Delay Tracking)
                  </label>
                  <input
                    type="text"
                    value={bookingState.flightNumber}
                    onChange={(e) => setBookingState({ ...bookingState, flightNumber: e.target.value })}
                    placeholder="e.g. PR 101, SQ 918, or N650GA (Tail #)"
                    className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                  <span className="text-[10px] text-slate-500 block">We monitor ADS-B live flight feeds at zero extra cost.</span>
                </div>
              )}

              {/* If Hourly Service, show Duration */}
              {bookingState.serviceType === 'hourly_hire' && (
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    Hours Needed (Minimum 3 hours)
                  </label>
                  <input
                    type="number"
                    min={3}
                    max={24}
                    value={bookingState.hoursNeeded}
                    onChange={(e) => setBookingState({ ...bookingState, hoursNeeded: parseInt(e.target.value) || 3 })}
                    className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              )}

              {/* Passengers & Luggage */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                  Passengers Count
                </label>
                <select
                  value={bookingState.passengers}
                  onChange={(e) => setBookingState({ ...bookingState, passengers: parseInt(e.target.value) })}
                  className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                  <Luggage className="w-3.5 h-3.5 text-[#C5A880]" />
                  Luggage Pieces
                </label>
                <select
                  value={bookingState.luggageCount}
                  onChange={(e) => setBookingState({ ...bookingState, luggageCount: parseInt(e.target.value) })}
                  className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 8, 10, 14].map(n => (
                    <option key={n} value={n}>{n} Standard Suitcases</option>
                  ))}
                </select>
              </div>

            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-slate-400 hover:text-white text-xs uppercase tracking-widest px-4 py-2 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs uppercase tracking-widest px-8 py-3 rounded flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Select Luxury Vehicle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT VEHICLE */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-2xl text-white">Select Fleet Vehicle</h3>
              <p className="text-xs text-slate-400 mt-1">
                All vehicles feature all-wheel drive, premium leather interiors, high-speed Wi-Fi, and still water.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {GROUND_FLEET.map(vehicle => {
                const isSelected = bookingState.vehicleId === vehicle.id;
                const capacityWarning = bookingState.passengers > vehicle.passengers;

                return (
                  <div
                    key={vehicle.id}
                    onClick={() => setBookingState({ ...bookingState, vehicleId: vehicle.id })}
                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C5A880]/15 border-[#C5A880] shadow-xl'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                      
                      {/* Vehicle Image */}
                      <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative bg-black/40">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.name}
                          className="w-full h-full object-cover brightness-95" 
                        />
                        {vehicle.tag && (
                          <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-black/80 text-[#C5A880] px-2 py-0.5 rounded border border-[#C5A880]/30">
                            {vehicle.tag}
                          </span>
                        )}
                      </div>

                      {/* Vehicle Specs */}
                      <div className="flex-1 space-y-2 w-full text-left">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-semibold text-[#C5A880] tracking-wider block">
                              {vehicle.category}
                            </span>
                            <h4 className="font-display-luxury text-base font-semibold text-white">
                              {vehicle.name}
                            </h4>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-slate-400 block">Rate for this service:</span>
                            <span className="font-semibold text-amber-300 text-base font-sans">
                              {bookingState.serviceType === 'hourly_hire' 
                                ? `${formatPrice(vehicle.hourlyRateUSD)}/hr` 
                                : formatPrice(vehicle.transferRateKEF_USD)}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {vehicle.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                            Max {vehicle.passengers} Passengers
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Luggage className="w-3.5 h-3.5 text-[#C5A880]" />
                            Max {vehicle.luggage} Suitcases
                          </span>
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                            {vehicle.specs.drivetrain}
                          </span>
                        </div>

                        {capacityWarning && (
                          <div className="text-[11px] text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded inline-flex items-center gap-1.5 mt-2">
                            <Info className="w-3.5 h-3.5" />
                            Your selected passenger count ({bookingState.passengers}) exceeds this vehicle's standard capacity ({vehicle.passengers}).
                          </div>
                        )}
                      </div>

                      {/* Selection Checkmark button */}
                      <div className="shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                          isSelected ? 'bg-[#C5A880] text-[#080B0E] border-[#C5A880]' : 'border-white/20 text-transparent'
                        }`}>
                          <Check className="w-4 h-4 font-bold" />
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-slate-400 hover:text-white text-xs uppercase tracking-widest px-4 py-2 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs uppercase tracking-widest px-8 py-3 rounded flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Customize Add-ons</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: VIP ADD-ONS */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-2xl text-white">Enhance Your Journey</h3>
              <p className="text-xs text-slate-400 mt-1">Select tailor-made luxury amenities and VIP ground handling extras.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BOOKING_ADDONS.map(addon => {
                const isSelected = bookingState.selectedAddons.includes(addon.id);

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#C5A880]/15 border-[#C5A880] shadow-md'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                          {renderAddonIcon(addon.iconName)}
                        </div>
                        <span className="font-semibold text-amber-300 text-xs">
                          +{formatPrice(addon.priceUSD)}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{addon.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{addon.description}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-end">
                      <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                        isSelected ? 'text-[#C5A880]' : 'text-slate-500'
                      }`}>
                        {isSelected ? '✓ Added' : '+ Add to Trip'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Special Requests Box */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs text-slate-300 font-medium">
                Special Concierge Notes &amp; Dietary/Luggage Requests
              </label>
              <textarea
                rows={2}
                value={bookingState.specialRequests}
                onChange={(e) => setBookingState({ ...bookingState, specialRequests: e.target.value })}
                placeholder="e.g., Inflight connection details, diving gear/golf clubs, specific beverage preferences, confidential security protocol..."
                className="w-full bg-[#141A24] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-slate-400 hover:text-white text-xs uppercase tracking-widest px-4 py-2 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs uppercase tracking-widest px-8 py-3 rounded flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Review &amp; Finalize</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: PASSENGER DETAILS & SUMMARY */}
        {currentStep === 5 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-2xl text-white">Passenger Details &amp; Confirmation</h3>
              <p className="text-xs text-slate-400 mt-1">Review your journey summary and provide primary contact information.</p>
            </div>

            {/* Two Column Layout: Details Form & Itinerary Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Guest info */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                    Primary Lead Passenger / VIP Contact
                  </h4>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-300 font-medium">Full Name / Title *</label>
                    <input
                      required
                      type="text"
                      value={bookingState.guestName}
                      onChange={(e) => setBookingState({ ...bookingState, guestName: e.target.value })}
                      placeholder="e.g., Lord / Dr. Alexander Sterling"
                      className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={bookingState.guestEmail}
                        onChange={(e) => setBookingState({ ...bookingState, guestEmail: e.target.value })}
                        placeholder="vip@domain.com"
                        className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300 font-medium">Mobile / WhatsApp Phone *</label>
                      <input
                        required
                        type="tel"
                        value={bookingState.guestPhone}
                        onChange={(e) => setBookingState({ ...bookingState, guestPhone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs text-slate-300 font-medium block">Preferred Payment Option</label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'credit_card', label: 'Credit Card / ApplePay', icon: CreditCard },
                        { id: 'invoice', label: 'Direct Invoice (B2B)', icon: Building },
                        { id: 'wire', label: 'SWIFT / Wire Transfer', icon: DollarSign }
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setBookingState({ ...bookingState, paymentMethod: method.id as any })}
                          className={`p-2 rounded border text-left flex flex-col items-center justify-center gap-1 ${
                            bookingState.paymentMethod === method.id
                              ? 'bg-[#C5A880]/20 border-[#C5A880] text-white'
                              : 'bg-black/30 border-white/10 text-slate-400'
                          }`}
                        >
                          <method.icon className="w-4 h-4 text-[#C5A880]" />
                          <span className="text-[10px] text-center">{method.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Guarantee Banner */}
                <div className="p-3 bg-black/40 border border-white/10 rounded-lg flex items-center gap-3 text-xs text-slate-400">
                  <ShieldCheck className="w-5 h-5 text-[#C5A880] shrink-0" />
                  <span>
                    Complimentary 60-minute airport wait time &amp; 100% free cancellation up to 24 hours prior to service.
                  </span>
                </div>
              </div>

              {/* Right Column: Itinerary Quote Breakdown */}
              <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-xl p-5 space-y-4">
                <h4 className="font-serif-luxury text-lg text-white border-b border-white/10 pb-2">
                  Trip Summary &amp; Breakdown
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Service:</span>
                    <span className="text-white font-medium capitalize">
                      {bookingState.serviceType.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Vehicle:</span>
                    <span className="text-white font-medium">{selectedVehicle.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Date &amp; Time:</span>
                    <span className="text-white">{bookingState.date} @ {bookingState.time}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Pickup:</span>
                    <span className="text-white truncate max-w-[180px]">{bookingState.pickupAddress}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="text-white truncate max-w-[180px]">{bookingState.dropoffAddress}</span>
                  </div>

                  {bookingState.selectedAddons.length > 0 && (
                    <div className="pt-2 border-t border-white/5 space-y-1">
                      <span className="text-slate-400 block font-semibold text-[11px]">Selected Extras:</span>
                      {bookingState.selectedAddons.map(id => {
                        const addon = BOOKING_ADDONS.find(a => a.id === id);
                        if (!addon) return null;
                        return (
                          <div key={id} className="flex justify-between text-[11px] text-slate-300">
                            <span>• {addon.name}</span>
                            <span>+{formatPrice(addon.priceUSD)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Pricing Total */}
                  <div className="pt-4 border-t border-white/10 space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Base Vehicle &amp; Chauffeur:</span>
                      <span>{formatPrice(totalUSD - bookingState.selectedAddons.reduce((s, id) => s + (BOOKING_ADDONS.find(a => a.id === id)?.priceUSD || 0), 0))}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Philippine VAT (12%) &amp; Tolls:</span>
                      <span className="text-[#C5A880]">Included</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Gratuity &amp; Meet &amp; Greet:</span>
                      <span className="text-[#C5A880]">Included</span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-white/10">
                      <span>Total Quote:</span>
                      <span className="text-amber-300 font-sans">
                        {rateObj.symbol}{convertedTotal.toLocaleString()} {currency}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  id="complete-booking-btn"
                  type="submit"
                  className="w-full bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-bold text-xs uppercase tracking-widest py-3.5 rounded transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Reserve &amp; Generate Voucher</span>
                </button>
              </div>

            </div>

            <div className="flex justify-start pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="text-slate-400 hover:text-white text-xs uppercase tracking-widest px-4 py-2 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Add-ons</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
