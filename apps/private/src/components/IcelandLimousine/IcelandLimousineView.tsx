import React, { useRef } from 'react';
import { Currency, GroundBookingState } from '../../types';
import { GROUND_FLEET, ICELAND_TOURS, CURRENCY_RATES } from '../../data/mockData';
import { BookingEngine } from './BookingEngine';
import { 
  Car, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Users, 
  Luggage, 
  ArrowRight, 
  Star, 
  Clock, 
  PlaneLanding, 
  CheckCircle,
  Wifi,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface IcelandLimousineViewProps {
  currency: Currency;
  onBookingComplete: (details: GroundBookingState & { totalCalculatedUSD: number; referenceId: string }) => void;
  onOpenEnquiry: (topic?: string) => void;
  initialBookingOptions?: {
    serviceType?: string;
    vehicleId?: string;
    tourId?: string;
  };
}

export const IcelandLimousineView: React.FC<IcelandLimousineViewProps> = ({
  currency,
  onBookingComplete,
  onOpenEnquiry,
  initialBookingOptions
}) => {
  const bookingSectionRef = useRef<HTMLDivElement>(null);
  const currRate = CURRENCY_RATES[currency];

  const scrollToBooking = (opts?: { vehicleId?: string; tourId?: string; serviceType?: string }) => {
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatPrice = (amountUSD: number) => {
    const val = Math.round(amountUSD * currRate.rate);
    return `${currRate.symbol}${val.toLocaleString()} ${currency}`;
  };

  return (
    <div className="w-full bg-[#080B0E] text-slate-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549632891-a0bea6d0355b?auto=format&fit=crop&w=2000&q=80" 
            alt="Range Rover on a highland track" 
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080B0E] via-[#080B0E]/80 to-[#080B0E]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-transparent to-[#080B0E]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-[#C5A880]"></span>
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
                VELA CONCIERGE • STUDIO CONCEPT
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-white leading-tight">
              Manila Chauffeurs &amp; <br />
              <span className="italic font-light text-slate-100">Bespoke Philippine Tours</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-light max-w-xl leading-relaxed">
              Experience the islands of the Philippines in total luxury. Discreet VIP airport transfers, executive fleet hire, and private custom itineraries tailored to your schedule.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="limo-hero-book-now-btn"
                onClick={() => scrollToBooking()}
                className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-widest uppercase px-8 py-3.5 rounded transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Booking Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenEnquiry('Vela Concierge Corporate / Delegation Account')}
                className="bg-black/60 hover:bg-black/90 text-slate-200 hover:text-white border border-white/20 font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded transition-all backdrop-blur-sm cursor-pointer"
              >
                Corporate Concierge Line
              </button>
            </div>

            {/* Quick trust badges */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                100% AWD All-Weather Fleet
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                English-Speaking Native Chauffeurs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" />
                NAIA FBO Airside Access
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE INTERACTIVE BOOKING ENGINE (Requested by User) */}
      <section ref={bookingSectionRef} id="booking-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080B0E] relative">
        <div className="max-w-7xl mx-auto">
          <BookingEngine
            currency={currency}
            onBookingComplete={onBookingComplete}
            initialOptions={initialBookingOptions}
          />
        </div>
      </section>

      {/* 3. FLEET SHOWCASE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0E15] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
                OUR LUXURY FLEET
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">
                Engineered for Philippine Terrains
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Every vehicle in our fleet is all-wheel drive, maintained to factory safety standards, and equipped with luxury amenities for monsoon and mountain travel.
              </p>
            </div>

            <button
              onClick={() => scrollToBooking()}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors"
            >
              <span>Instant Fleet Availability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GROUND_FLEET.map(vehicle => (
              <div 
                key={vehicle.id}
                className="bg-[#0D1219] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-56 overflow-hidden bg-black/40">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1219] via-transparent to-black/20" />
                  
                  {vehicle.tag && (
                    <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider bg-black/80 text-[#C5A880] px-2.5 py-1 rounded border border-[#C5A880]/30 backdrop-blur-sm">
                      {vehicle.tag}
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A880]">
                      {vehicle.category}
                    </span>
                    <h3 className="font-display-luxury text-base font-bold text-white">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {vehicle.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                        {vehicle.passengers} Passengers
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Luggage className="w-3.5 h-3.5 text-[#C5A880]" />
                        {vehicle.luggage} Suitcases
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Wifi className="w-3.5 h-3.5 text-[#C5A880]" />
                        5G Wi-Fi
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                        4WD / AWD
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Airport Transfer:</span>
                        <span className="text-sm font-semibold text-amber-300 font-sans">
                          {formatPrice(vehicle.transferRateKEF_USD)}
                        </span>
                      </div>
                      <button
                        onClick={() => scrollToBooking({ vehicleId: vehicle.id })}
                        className="bg-[#C5A880]/15 hover:bg-[#C5A880] text-[#C5A880] hover:text-[#080B0E] border border-[#C5A880]/40 text-xs font-semibold px-4 py-2 rounded uppercase tracking-wider transition-all"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. SIGNATURE BESPOKE DAY TOURS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#080B0E]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              TAILOR-MADE ITINERARIES
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white">
              Private Signature Day Tours
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              No tourist crowds, no rigid schedules. Roam limestone lagoons, rice terraces, and highland ridge roads on your own terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ICELAND_TOURS.map(tour => (
              <div 
                key={tour.id}
                className="bg-[#0D1219] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1219] via-transparent to-black/30" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs">
                    <span className="bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded border border-white/10 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      {tour.durationHours} Hours Duration
                    </span>
                    <span className="bg-black/80 backdrop-blur-sm text-[#C5A880] px-2.5 py-1 rounded border border-[#C5A880]/30 font-mono">
                      ~{tour.distanceKm} km
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif-luxury text-xl font-normal text-white leading-snug">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {tour.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-2">
                      {tour.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                          <CheckCircle className="w-3 h-3 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Private Tour from:</span>
                      <span className="text-sm font-semibold text-amber-300 font-sans">
                        {formatPrice(tour.basePriceUSD)}
                      </span>
                    </div>
                    <button
                      onClick={() => scrollToBooking({ tourId: tour.id, serviceType: 'day_tour' })}
                      className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs px-4 py-2 rounded uppercase tracking-wider transition-all"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
