import React, { useRef } from 'react';
import { Currency, AviationInquiryState } from '../../types';
import { AIRCRAFT_FLEET, CURRENCY_RATES } from '../../data/mockData';
import { AviationQuoteEngine } from './AviationQuoteEngine';
import { 
  Plane, 
  ShieldCheck, 
  Compass, 
  Globe, 
  Radio, 
  Fuel, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Gauge, 
  Award,
  FileCheck
} from 'lucide-react';

interface VELAJetsViewProps {
  currency: Currency;
  onInquirySubmitted: (inquiry: AviationInquiryState & { referenceCode: string; estimatedFlightHours: number }) => void;
  onOpenEnquiry: (topic?: string) => void;
}

export const VELAJetsView: React.FC<VELAJetsViewProps> = ({
  currency,
  onInquirySubmitted,
  onOpenEnquiry
}) => {
  const estimatorRef = useRef<HTMLDivElement>(null);
  const currRate = CURRENCY_RATES[currency];

  const scrollToEstimator = () => {
    if (estimatorRef.current) {
      estimatorRef.current.scrollIntoView({ behavior: 'smooth' });
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
            src="https://images.unsplash.com/photo-1684838200888-192e2a163cc9?auto=format&fit=crop&w=2000&q=85" 
            alt="Gulfstream business jet on the apron" 
            className="w-full h-full object-cover object-center opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080B0E] via-[#080B0E]/85 to-[#080B0E]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-transparent to-[#080B0E]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-[#C5A880]"></span>
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
                VELA AVIATION • AVIATION DIVISION
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-white leading-tight">
              Aircraft Ferry, Delivery &amp; <br />
              <span className="italic font-light text-slate-100">VIP Private Jet Charter</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-light max-w-xl leading-relaxed">
              Based at the strategic crossroads of Southeast Asia. Specializing in Asia-Pacific aircraft relocations, oceanic flight operations, and bespoke global jet charters.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="jets-hero-request-quote-btn"
                onClick={scrollToEstimator}
                className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-widest uppercase px-8 py-3.5 rounded transition-all shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Mission &amp; Flight Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenEnquiry('Vela Aviation Asia-Pacific Ferry Flight Consultation')}
                className="bg-black/60 hover:bg-black/90 text-slate-200 hover:text-white border border-white/20 font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded transition-all backdrop-blur-sm cursor-pointer"
              >
                Direct Ops Dispatch
              </button>
            </div>

            {/* Aviation Accreditation Bar */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                FAA / CAAP Commercial Captains
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#C5A880]" />
                Asia-Pacific Routing Specialists
              </span>
              <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-[#C5A880]" />
                24/7 Oceanic Flight Following
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. AVIATION MISSION & FERRY CALCULATOR (Requested by User) */}
      <section ref={estimatorRef} id="estimator-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080B0E] relative">
        <div className="max-w-7xl mx-auto">
          <AviationQuoteEngine
            currency={currency}
            onInquirySubmitted={onInquirySubmitted}
          />
        </div>
      </section>

      {/* 3. AIRCRAFT FLEET & CATEGORIES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0E15] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
                AVIATION FLEET &amp; PLAVELARMS
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">
                Global Performance &amp; Oceanic Range
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                From intercontinental ultra-long-range business jets to island-spec turboprop delivery platforms.
              </p>
            </div>

            <button
              onClick={scrollToEstimator}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5A880] hover:text-white transition-colors"
            >
              <span>Request Airframe Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AIRCRAFT_FLEET.map(aircraft => (
              <div 
                key={aircraft.id}
                className="bg-[#0D1219] border border-white/10 rounded-xl overflow-hidden hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-black/40">
                  <img 
                    src={aircraft.image} 
                    alt={aircraft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1219] via-transparent to-black/30" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-black/80 text-[#C5A880] px-3 py-1 rounded border border-[#C5A880]/30 backdrop-blur-sm">
                      {aircraft.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-xs text-white flex items-center gap-2 font-mono">
                    <Gauge className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Range: {aircraft.rangeNm.toLocaleString()} NM</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif-luxury text-2xl text-white">
                      {aircraft.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {aircraft.description}
                    </p>

                    {/* Features pill tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {aircraft.features.slice(0, 3).map((feat, i) => (
                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Charter / Ferry Rate:</span>
                      <span className="text-base font-semibold text-amber-300 font-sans">
                        {formatPrice(aircraft.hourlyRateUSD)}/hr
                      </span>
                    </div>

                    <button
                      onClick={scrollToEstimator}
                      className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs px-5 py-2.5 rounded uppercase tracking-wider transition-all"
                    >
                      Charter Inquiry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. ASIA-PACIFIC FERRY ROUTING CORRIDOR INFO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#080B0E]">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#101622] to-[#0A0D14] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
                ASIA-PACIFIC ROUTING MASTERY
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">
                Why the Philippines is the Strategic Gateway for Aircraft Ferry Flights
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Positioned at the heart of Southeast Asia, Manila (RPLL) and Clark (RPLC) provide essential technical fuel stops, weather diversions, and Asia-Pacific ATC transitions between North Asia, ASEAN, and transpacific legs.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  "Complete oceanic flight plan filing (Manila, Singapore & Tokyo FIRs)",
                  "Transport of FAA certified survival rafts and SOLAS immersion suits",
                  "Overflight, landing permits & diplomatic clearances worldwide",
                  "Dual-qualified US FAA and CAAP ferry flight crews"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-xl p-6 space-y-4">
              <h4 className="font-display-luxury text-xs uppercase tracking-widest text-white font-semibold">
                Typical Asia-Pacific Ferry Route
              </h4>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span className="text-slate-400">1. Departure Point</span>
                  <span className="text-white font-semibold">Tokyo (RJTT) / Seoul (RKSI)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span className="text-slate-400">2. Island Transition</span>
                  <span className="text-[#C5A880] font-semibold">Taipei (RCTP) / Guam (PGUM)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-[#C5A880]/30">
                  <span className="text-slate-300">3. Manila Hub</span>
                  <span className="text-amber-300 font-bold">NAIA / Clark FBO (RPLL/RPLC)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span className="text-slate-400">4. ASEAN Terminal</span>
                  <span className="text-white font-semibold">Singapore (WSSS) / Hong Kong (VHHH) / Sydney (YSSY)</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => onOpenEnquiry('Asia-Pacific Flight Planning Technical Brief')}
                  className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-white font-semibold flex items-center justify-center gap-1.5 w-full pt-2"
                >
                  <span>Request Oceanic Technical Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
