import React, { useState } from 'react';
import { 
  FileCode, 
  Layers, 
  Layout, 
  Workflow, 
  Palette, 
  Database, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  Compass, 
  Car, 
  Plane,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const ArchitectureBlueprintView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'components' | 'booking_flow' | 'design_tokens' | 'api_schemas'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="w-full bg-[#06090C] text-slate-200 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Title */}
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-3 py-1 rounded-full font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>PRINCIPAL UI/UX ARCHITECT &amp; REACT SYSTEM BLUEPRINT</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white">
            Vela Private Multi-Site Digital Ecosystem Architecture
          </h1>

          <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
            Comprehensive blueprint integrating <strong className="text-white">Vela Concierge</strong> (luxury ground transportation) and <strong className="text-white">Vela Aviation</strong> (private aviation &amp; ferry operations) under a unified <strong className="text-[#C5A880]">"From Runway to Road"</strong> luxury portal.
          </p>
        </div>

        {/* Blueprint Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {[
            { id: 'overview', label: '1. Ecosystem Topology & Layouts', icon: Layers },
            { id: 'booking_flow', label: '2. Chauffeur Booking UX Flow', icon: Workflow },
            { id: 'components', label: '3. React Component Architecture', icon: Layout },
            { id: 'design_tokens', label: '4. Luxury Design System & Tokens', icon: Palette },
            { id: 'api_schemas', label: '5. Data & API Schemas', icon: Database }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-[#C5A880] text-[#080B0E] shadow-lg'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & TOPOLOGY */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* 3-Site Hierarchy Visual */}
            <div className="bg-[#0B0F15] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="font-display-luxury text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#C5A880]" />
                Multi-Site Ecosystem Sitemap &amp; Routing Topology
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                
                {/* Parent Portal */}
                <div className="bg-black/60 border border-[#C5A880]/50 rounded-xl p-6 space-y-4 relative">
                  <span className="absolute -top-3 left-4 text-[10px] uppercase font-bold tracking-widest bg-[#C5A880] text-[#080B0E] px-2.5 py-0.5 rounded">
                    Umbrella Portal
                  </span>
                  <h3 className="font-serif-luxury text-xl text-white">Vela Private Landing</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Acts as the high-converting luxury umbrella brand. Merges private aviation and VIP ground transport into one synchronized experience.
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Hero with "The Journey, Handled"
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      4 Global Trust Indicators
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Dual Split-Card Navigation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Runway-to-Road Simulator
                    </li>
                  </ul>
                </div>

                {/* Sub-Site 1: Vela Concierge */}
                <div className="bg-black/60 border border-white/15 rounded-xl p-6 space-y-4 relative">
                  <span className="absolute -top-3 left-4 text-[10px] uppercase font-bold tracking-widest bg-white/10 text-white border border-white/20 px-2.5 py-0.5 rounded">
                    Sub-Site 1: Ground Fleet
                  </span>
                  <h3 className="font-serif-luxury text-xl text-white">Vela Concierge Rebuild</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Modernized VIP ground transport platform replacing flat legacy scrollables with interactive luxury booking.
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Step-by-step Interactive Booking Engine
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      AWD Philippine-Engineered Fleet Specs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Private Day Tours (Tagaytay, El Nido, Bohol)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Airside NAIA/Clark Tarmac Escort
                    </li>
                  </ul>
                </div>

                {/* Sub-Site 2: Vela Aviation */}
                <div className="bg-black/60 border border-white/15 rounded-xl p-6 space-y-4 relative">
                  <span className="absolute -top-3 left-4 text-[10px] uppercase font-bold tracking-widest bg-white/10 text-white border border-white/20 px-2.5 py-0.5 rounded">
                    Sub-Site 2: Private Aviation
                  </span>
                  <h3 className="font-serif-luxury text-xl text-white">Vela Aviation Rebuild</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Specialized private jet charters, Asia-Pacific aircraft ferry flights, and oceanic flight dispatch operations.
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      ICAO/IATA Route Distance Estimator
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Asia-Pacific Ferry Logistics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Ultra Long Range &amp; Light Jet Fleet
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                      Survival Equipment &amp; Crew Placement
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Strategic Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
                <h4 className="font-semibold text-white text-sm">Discreet Single Sign-On / VIP Profile</h4>
                <p className="text-xs text-slate-400">
                  Shared passenger parameters (beverage preferences, tail numbers, passport clearance) synchronized across both flight and ground legs.
                </p>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <Zap className="w-5 h-5 text-[#C5A880]" />
                <h4 className="font-semibold text-white text-sm">Zero-Flicker Client Routing</h4>
                <p className="text-xs text-slate-400">
                  Unified state management in React allows instantaneous division switching without reloading stylesheets or losing in-progress quotes.
                </p>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <Sparkles className="w-5 h-5 text-[#C5A880]" />
                <h4 className="font-semibold text-white text-sm">Multi-Currency Transparent Engine</h4>
                <p className="text-xs text-slate-400">
                  Live conversion between USD ($), EUR (€), GBP (£), and PHP (₱) with VAT and airport fees transparently itemized.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: BOOKING UX FLOW */}
        {activeTab === 'booking_flow' && (
          <div className="space-y-8">
            <div className="bg-[#0B0F15] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="font-display-luxury text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Workflow className="w-5 h-5 text-[#C5A880]" />
                Vela Concierge 5-Step Booking State Machine
              </h2>

              <div className="space-y-4">
                {[
                  {
                    step: 'Step 1: Service Categorization',
                    desc: 'User chooses between Airport Transfer (NAIA/Clark), Hourly/Daily Chauffeur Hire, Bespoke Day Tour (Tagaytay, El Nido, Bohol), or Tarmac VIP Private Jet Escort.',
                    state: 'serviceType: "airport_transfer" | "hourly_hire" | "day_tour" | "tarmac_vip"',
                    validation: 'Mandatory single selection; auto-configures default pick-up parameters.'
                  },
                  {
                    step: 'Step 2: Route, Schedule & ADS-B Tracking',
                    desc: 'Captures Date, Time, Pickup Address, Dropoff Destination, and Inbound Flight Number (PR / Private Tail) with automatic flight delay compensation.',
                    state: 'pickupAddress, dropoffAddress, date, time, flightNumber, hoursNeeded, passengers, luggageCount',
                    validation: 'Enforces minimum date (today onwards), passenger ceiling warning vs vehicle capacity.'
                  },
                  {
                    step: 'Step 3: Fleet Vehicle Selection',
                    desc: 'Presents Mercedes S-Class, V-Class VIP, Range Rover Autobiography, GLE, or highland Range Rover with 360-specs and live converted pricing.',
                    state: 'vehicleId: string (mapped to GROUND_FLEET array)',
                    validation: 'Dynamic capacity check: flags passenger/luggage overload with visual recommendations.'
                  },
                  {
                    step: 'Step 4: Bespoke VIP Add-Ons',
                    desc: 'Enables selection of VIP Tarmac Escort, Veuve Clicquot Champagne, ISOFIX Child Seats, Dedicated Luggage Van, or Multilingual Historian/Cultural Guide.',
                    state: 'selectedAddons: string[], specialRequests: string',
                    validation: 'Multi-select toggle with real-time recalculation of total cost.'
                  },
                  {
                    step: 'Step 5: Lead Passenger & Quote Generation',
                    desc: 'Captures Primary Passenger Name, Email, Phone, and Payment Method (Card, Invoice, Wire) and produces instant Reservation Code & PDF Voucher.',
                    state: 'guestName, guestEmail, guestPhone, paymentMethod, totalCalculatedUSD, referenceId',
                    validation: 'Regex email and international phone format validation before submission.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-black/50 border border-white/10 rounded-xl p-5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="font-display-luxury text-sm font-bold text-white">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-mono text-[#C5A880] bg-white/5 px-2 py-0.5 rounded border border-[#C5A880]/20">
                        {item.state}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                    <div className="text-[11px] text-slate-400 font-mono pt-1">
                      Validation: <span className="text-slate-300">{item.validation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REACT COMPONENT ARCHITECTURE */}
        {activeTab === 'components' && (
          <div className="space-y-8">
            <div className="bg-[#0B0F15] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="font-display-luxury text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layout className="w-5 h-5 text-[#C5A880]" />
                Reusable React Component Hierarchy
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Navigation.tsx',
                    scope: 'Global Header',
                    props: '{ activeDivision, setActiveDivision, currency, setCurrency, onOpenEnquiry }',
                    purpose: 'High-contrast sticky luxury navigation with real-time Division Switcher, Currency Selector, and Mobile Drawer.'
                  },
                  {
                    name: 'BookingEngine.tsx',
                    scope: 'Vela Concierge',
                    props: '{ currency, onBookingComplete, initialOptions }',
                    purpose: '5-step wizard managing route selection, vehicle specs, add-on pricing, and client reservations.'
                  },
                  {
                    name: 'AviationQuoteEngine.tsx',
                    scope: 'Vela Aviation',
                    props: '{ currency, onInquirySubmitted }',
                    purpose: 'ICAO/IATA flight range estimator, oceanic compliance check, and RFP dispatch for private aircraft ferry.'
                  },
                  {
                    name: 'ParentPortalView.tsx',
                    scope: 'Umbrella Portal',
                    props: '{ setActiveDivision, currency, onOpenEnquiry, onNavigateToBooking }',
                    purpose: 'Exact visual replica of the reference mockup: Hero, 4 Trust Metrics, Split-Cards, and Runway-to-Road Simulator.'
                  },
                  {
                    name: 'EnquiryModal.tsx',
                    scope: 'Global Modal',
                    props: '{ isOpen, onClose, defaultTopic }',
                    purpose: '24/7 VIP Concierge modal accessible across all 3 sites with direct dispatch priority.'
                  },
                  {
                    name: 'BookingSuccessModal.tsx',
                    scope: 'Confirmation Modal',
                    props: '{ booking, isOpen, onClose }',
                    purpose: 'Presents official booking voucher, reference code, calendar export (.ics), and direct print/share triggers.'
                  }
                ].map((comp, idx) => (
                  <div key={idx} className="bg-black/50 border border-white/10 rounded-xl p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono text-sm font-bold text-[#C5A880]">{comp.name}</h4>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                        {comp.scope}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 truncate">
                      Props: <span className="text-slate-300">{comp.props}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {comp.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DESIGN SYSTEM & TOKENS */}
        {activeTab === 'design_tokens' && (
          <div className="space-y-8">
            <div className="bg-[#0B0F15] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="font-display-luxury text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#C5A880]" />
                Dark Luxury Design Tokens &amp; Aesthetic Guidelines
              </h2>

              {/* Color Swatches */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                  Color Palette (Dark Luxury / Obsidian &amp; Gold)
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 space-y-2" style={{ backgroundColor: '#080B0E' }}>
                    <div className="text-xs font-bold text-white">#080B0E</div>
                    <div className="text-[10px] text-slate-400">Obsidian Night Canvas</div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 space-y-2" style={{ backgroundColor: '#C5A880' }}>
                    <div className="text-xs font-bold text-[#080B0E]">#C5A880</div>
                    <div className="text-[10px] text-[#080B0E]/80">Vela Warm Champagne Gold</div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 space-y-2" style={{ backgroundColor: '#0D1219' }}>
                    <div className="text-xs font-bold text-white">#0D1219</div>
                    <div className="text-[10px] text-slate-400">Elevated Glass Container</div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 space-y-2" style={{ backgroundColor: '#161E2A' }}>
                    <div className="text-xs font-bold text-white">#161E2A</div>
                    <div className="text-[10px] text-slate-400">Interactive Focus &amp; Hover</div>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                  Typography Hierarchy
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Display Headings: Cinzel &amp; Cormorant Garamond</span>
                    <div className="font-serif-luxury text-2xl text-white">
                      "From runway to road. Private Aviation &amp; Luxury Travel"
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Body &amp; Technical UI: Plus Jakarta Sans</span>
                    <div className="font-sans text-sm text-slate-300">
                      High legibility at dense viewport sizes (16px base body, 1.6 line height, 65-75ch maximum column constraints).
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: API SCHEMAS */}
        {activeTab === 'api_schemas' && (
          <div className="space-y-8">
            <div className="bg-[#0B0F15] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="font-display-luxury text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Database className="w-5 h-5 text-[#C5A880]" />
                Backend &amp; Third-Party API Integration Contracts
              </h2>

              <div className="space-y-4 font-mono text-xs">
                <div className="bg-black/80 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-[#C5A880]">
                    <span>POST /api/v1/chauffeur/reservations</span>
                    <span className="text-slate-500">JSON Payload</span>
                  </div>
                  <pre className="text-slate-300 overflow-x-auto p-2 bg-[#080B0E] rounded text-[11px]">
{`{
  "serviceType": "airport_transfer",
  "flightNumber": "PR101",
  "originAirportIcao": "RPLL",
  "pickupDateTime": "2026-08-26T14:30:00Z",
  "dropoffCoordinates": { "lat": 14.5547, "lng": 121.0244 },
  "vehicleId": "mb-s-class",
  "guest": {
    "name": "Lord Alexander Sterling",
    "email": "vip@domain.com",
    "phone": "+639171234567"
  },
  "addons": ["tarmac-vip", "champagne-glacier"],
  "currency": "USD",
  "totalPriceUSD": 570
}`}
                  </pre>
                </div>

                <div className="bg-black/80 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-[#C5A880]">
                    <span>POST /api/v1/aviation/ferry-inquiry</span>
                    <span className="text-slate-500">JSON Payload</span>
                  </div>
                  <pre className="text-slate-300 overflow-x-auto p-2 bg-[#080B0E] rounded text-[11px]">
{`{
  "missionType": "ferry_delivery",
  "originIcao": "RJTT",
  "destinationIcao": "WSSS",
  "intermediateStops": ["RCTP", "RPLL"],
  "aircraftClass": "gulfstream-g650er",
  "oceanicRequirements": {
    "dualFerryCrew": true,
    "survivalRafts": true,
    "fuelOverflightPermits": true
  },
  "targetDeparture": "2026-09-01"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
