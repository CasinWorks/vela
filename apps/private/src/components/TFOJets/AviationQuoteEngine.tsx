import React, { useState } from 'react';
import { Currency, AviationInquiryState } from '../../types';
import { AIRCRAFT_FLEET, POPULAR_AIRPORTS, CURRENCY_RATES } from '../../data/mockData';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Users, 
  Compass, 
  Radio, 
  Fuel, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  Clock,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface AviationQuoteEngineProps {
  currency: Currency;
  onInquirySubmitted: (inquiry: AviationInquiryState & { referenceCode: string; estimatedFlightHours: number }) => void;
}

export const AviationQuoteEngine: React.FC<AviationQuoteEngineProps> = ({
  currency,
  onInquirySubmitted
}) => {
  const [inquiry, setInquiry] = useState<AviationInquiryState>({
    serviceType: 'ferry_delivery',
    originIcao: 'RPLL',
    destinationIcao: 'WSSS',
    aircraftCategory: 'gulfstream-g650er',
    passengers: 4,
    departureDate: new Date().toISOString().split('T')[0],
    returnDate: '',
    isRoundTrip: false,
    requiresFerryCrew: true,
    requiresFuelPermits: true,
    requiresOceanicRafts: true,
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    clientPhone: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const selectedAircraft = AIRCRAFT_FLEET.find(a => a.id === inquiry.aircraftCategory) || AIRCRAFT_FLEET[0];
  const currRate = CURRENCY_RATES[currency];

  // Estimation helper: calculate approximate flight distance & hours
  const calculateFlightEstimates = () => {
    // Rough great-circle distance simulation based on airport pairs
    let nauticalMiles = 1600; // default Asia-Pacific
    if (inquiry.originIcao === 'RPLL' && inquiry.destinationIcao === 'WSSS') nauticalMiles = 1300;
    else if (inquiry.originIcao === 'OMDB' || inquiry.destinationIcao === 'OMDB') nauticalMiles = 3800;
    else if (inquiry.originIcao === 'KLAX' || inquiry.destinationIcao === 'KLAX') nauticalMiles = 6200;
    else if (
      inquiry.originIcao === 'RPLL' ||
      inquiry.destinationIcao === 'RPLL' ||
      inquiry.originIcao === 'RPLC' ||
      inquiry.destinationIcao === 'RPLC'
    )
      nauticalMiles = 1400;

    const speed = selectedAircraft.speedKts || 450;
    const hours = Math.round((nauticalMiles / speed + 0.5) * 10) / 10;
    const estCostUSD = Math.round(hours * selectedAircraft.hourlyRateUSD);

    return {
      nauticalMiles,
      hours,
      estCostUSD
    };
  };

  const estimates = calculateFlightEstimates();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.clientName || !inquiry.clientEmail || !inquiry.clientPhone) {
      alert('Please fill in your primary contact details.');
      return;
    }

    const ref = `VELA-AIR-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmitted(true);
    onInquirySubmitted({
      ...inquiry,
      referenceCode: ref,
      estimatedFlightHours: estimates.hours
    });
  };

  return (
    <div id="aviation-quote-container" className="w-full max-w-5xl mx-auto bg-[#0C1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      
      {/* Header Banner */}
      <div className="bg-[#080B0F] border-b border-white/10 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
              VELA AVIATION • FLIGHT OPS DESK
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white mt-0.5">
              Aircraft Ferry &amp; Charter Mission Estimator
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded text-xs text-slate-300">
            <Radio className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
            <span>Asia-Pacific Dispatch Active</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        
        {/* Section 1: Mission Type */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] block">
            1. Select Aviation Mission Type:
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'ferry_delivery', title: 'Aircraft Delivery / Ferry', desc: 'Asia-Pacific & global relocations with FAA/CAAP ferry crews.' },
              { id: 'charter', title: 'Private VIP Charter', desc: 'On-demand charter flights across ASEAN, North Asia & the Pacific.' },
              { id: 'oceanic_support', title: 'Oceanic Flight Planning', desc: 'HF comms, survival immersion suits, overflight & fuel permits.' },
              { id: 'aircraft_management', title: 'Crew & Management', desc: 'Type-rated captain placement, maintenance ferrying & consulting.' }
            ].map(type => (
              <div
                key={type.id}
                onClick={() => setInquiry({ ...inquiry, serviceType: type.id as any })}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  inquiry.serviceType === type.id
                    ? 'bg-[#C5A880]/15 border-[#C5A880] shadow-md'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{type.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{type.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex justify-end">
                  <span className={`text-[10px] uppercase font-semibold ${inquiry.serviceType === type.id ? 'text-[#C5A880]' : 'text-slate-500'}`}>
                    {inquiry.serviceType === type.id ? 'Selected' : 'Select'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Origin & Destination ICAO/IATA */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] block">
            2. Flight Routing &amp; Airfields:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Origin */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                Origin Airport (ICAO / IATA)
              </label>
              <select
                value={inquiry.originIcao}
                onChange={(e) => setInquiry({ ...inquiry, originIcao: e.target.value })}
                className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                {POPULAR_AIRPORTS.map(apt => (
                  <option key={apt.icao} value={apt.icao}>
                    {apt.iata} / {apt.icao} - {apt.name} ({apt.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                Destination Airport (ICAO / IATA)
              </label>
              <select
                value={inquiry.destinationIcao}
                onChange={(e) => setInquiry({ ...inquiry, destinationIcao: e.target.value })}
                className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                {POPULAR_AIRPORTS.map(apt => (
                  <option key={apt.icao} value={apt.icao}>
                    {apt.iata} / {apt.icao} - {apt.name} ({apt.city})
                  </option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                Target Departure Date
              </label>
              <input
                type="date"
                value={inquiry.departureDate}
                onChange={(e) => setInquiry({ ...inquiry, departureDate: e.target.value })}
                className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* Aircraft Category */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-[#C5A880]" />
                Aircraft Class / Model
              </label>
              <select
                value={inquiry.aircraftCategory}
                onChange={(e) => setInquiry({ ...inquiry, aircraftCategory: e.target.value })}
                className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              >
                {AIRCRAFT_FLEET.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name} • {a.category} (Range: {a.rangeNm} NM)
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Section 3: Specialized Oceanic & Ferry Equipment Toggles */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] block">
            3. Oceanic Compliance &amp; Mission Equipment:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex items-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-lg cursor-pointer hover:border-[#C5A880]/40">
              <input
                type="checkbox"
                checked={inquiry.requiresFerryCrew}
                onChange={(e) => setInquiry({ ...inquiry, requiresFerryCrew: e.target.checked })}
                className="rounded accent-[#C5A880] w-4 h-4"
              />
              <span className="text-xs text-slate-200">
                Captain &amp; First Officer Delivery Crew
              </span>
            </label>

            <label className="flex items-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-lg cursor-pointer hover:border-[#C5A880]/40">
              <input
                type="checkbox"
                checked={inquiry.requiresOceanicRafts}
                onChange={(e) => setInquiry({ ...inquiry, requiresOceanicRafts: e.target.checked })}
                className="rounded accent-[#C5A880] w-4 h-4"
              />
              <span className="text-xs text-slate-200">
                Immersion Suits &amp; Oceanic Rafts
              </span>
            </label>

            <label className="flex items-center space-x-3 bg-white/5 border border-white/10 p-3 rounded-lg cursor-pointer hover:border-[#C5A880]/40">
              <input
                type="checkbox"
                checked={inquiry.requiresFuelPermits}
                onChange={(e) => setInquiry({ ...inquiry, requiresFuelPermits: e.target.checked })}
                className="rounded accent-[#C5A880] w-4 h-4"
              />
              <span className="text-xs text-slate-200">
                Overflight &amp; Diplomatic Permits
              </span>
            </label>
          </div>
        </div>

        {/* Section 4: Live Flight Simulation Calculation Box */}
        <div className="bg-black/60 border border-[#C5A880]/30 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Est. Great Circle Distance</span>
            <span className="text-xl font-bold text-white font-mono">
              ~{estimates.nauticalMiles.toLocaleString()} <span className="text-xs text-[#C5A880]">NM</span>
            </span>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 sm:border-x border-white/10 pt-2 sm:pt-0">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Est. Flight Block Time</span>
            <span className="text-xl font-bold text-amber-300 font-mono">
              ~{estimates.hours} <span className="text-xs text-[#C5A880]">Hours</span>
            </span>
          </div>

          <div className="space-y-1 border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Direct Technical Stops</span>
            <span className="text-sm font-semibold text-white">
              {estimates.nauticalMiles > selectedAircraft.rangeNm ? '1 Stop (Clark / Guam)' : 'Non-Stop Direct'}
            </span>
          </div>
        </div>

        {/* Section 5: Client Contact Information */}
        <div className="space-y-4 pt-2 border-t border-white/10">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] block">
            4. Flight Dispatch Contact Information:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Principal Client Name *</label>
              <input
                required
                type="text"
                value={inquiry.clientName}
                onChange={(e) => setInquiry({ ...inquiry, clientName: e.target.value })}
                placeholder="e.g. Captain / Director Jonathan Hayes"
                className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Company / Aviation Entity (Optional)</label>
              <input
                type="text"
                value={inquiry.clientCompany}
                onChange={(e) => setInquiry({ ...inquiry, clientCompany: e.target.value })}
                placeholder="e.g. Hayes Aviation Capital / Private Office"
                className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Corporate Email Address *</label>
              <input
                required
                type="email"
                value={inquiry.clientEmail}
                onChange={(e) => setInquiry({ ...inquiry, clientEmail: e.target.value })}
                placeholder="dispatch@aviationfirm.com"
                className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Direct Satellite / Mobile Phone *</label>
              <input
                required
                type="tel"
                value={inquiry.clientPhone}
                onChange={(e) => setInquiry({ ...inquiry, clientPhone: e.target.value })}
                placeholder="+1 (212) 555-0199"
                className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Mission Details &amp; Airframe Specifics</label>
            <textarea
              rows={2}
              value={inquiry.notes}
              onChange={(e) => setInquiry({ ...inquiry, notes: e.target.value })}
              placeholder="Aircraft registration tail number, specific insurance ferry limits, preferred oceanic waypoints, FBO handler preferences..."
              className="w-full bg-[#141A24] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Confidential RFP submitted directly to Vela Duty Captain. Response within 60 mins.</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plane className="w-4 h-4" />
            <span>Submit Aviation Mission RFP</span>
          </button>
        </div>

      </form>
    </div>
  );
};
