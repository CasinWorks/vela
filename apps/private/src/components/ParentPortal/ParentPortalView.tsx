import React from 'react';
import { motion } from 'motion/react';
import { ActiveDivision } from '../../types';
import { SITES } from '../../config/sites';
import { fadeUp, heroReveal, staggerContainer, staggerItem, easeLuxury } from '../../lib/motion';
import { 
  ArrowRight, 
  Globe, 
  User, 
  Gem, 
  Mountain, 
  Plane, 
  MapPin, 
  Briefcase
} from 'lucide-react';

const stock = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const STOCK = {
  hero: stock('photo-1684838200888-192e2a163cc9', 2400),
  aviationCard: stock('photo-1684838200815-36eef38f353c', 1600),
  conciergeCard: stock('photo-1563458563737-e60b1f1b345f', 1600),
  chauffeur: stock('photo-1583918003285-199304164a2f', 1200),
  iceland: stock('photo-1768078557772-79741862c07d', 1200),
  aviationJourney: stock('photo-1540962351504-03099e0a754b', 1200),
  vipArrival: stock('photo-1693835195915-b30cc5ae885c', 1200),
  cta: stock('photo-1635783651424-c7a21cd71549', 2400),
};

interface ParentPortalViewProps {
  setActiveDivision: (division: ActiveDivision) => void;
  currency?: string;
  onOpenEnquiry: (subject?: string) => void;
  onNavigateToBooking?: (opts?: any) => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = ({
  onOpenEnquiry
}) => {
  const goJets = () => {
    window.location.href = SITES.aviation;
  };
  const goLimousine = () => {
    window.location.href = SITES.concierge;
  };
  return (
    <div className="w-full bg-[#080B0E] text-slate-200 selection:bg-[#C5A880] selection:text-[#080B0E]">
      
      {/* 1. HERO SECTION & INTEGRATED TRUST INDICATORS (Seamless Single-Hero Canvas) */}
      <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: easeLuxury }}
        >
          <img 
            src={STOCK.hero} 
            alt="Gulfstream business jet on the apron" 
            className="w-full h-full object-cover object-right md:object-center brightness-[0.80]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080B0E]/90 via-[#080B0E]/60 to-transparent w-full md:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080B0E]/70 via-transparent to-[#080B0E]/80" />
        </motion.div>

        <div className="relative z-10 site-shell w-full my-auto py-12 sm:py-16">
          <motion.div
            className="max-w-2xl xl:max-w-3xl min-[1800px]:max-w-4xl space-y-6 sm:space-y-7"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={heroReveal} className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              THE JOURNEY, HANDLED.
            </motion.div>

            <motion.h1 variants={heroReveal} className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl min-[1800px]:text-[5.5rem] font-normal text-white leading-[1.08] tracking-tight">
              Private Aviation<br />
              <span className="text-[#C5A880] font-serif-luxury font-light mr-3">&amp;</span>
              <span className="text-white font-serif-luxury font-light">Luxury Travel</span>
            </motion.h1>

            <motion.p variants={heroReveal} className="text-slate-300 text-sm sm:text-base min-[1800px]:text-lg font-light max-w-lg min-[1800px]:max-w-xl leading-relaxed">
              From the aircraft to the road, we take care of every detail so you can enjoy the journey.
            </motion.p>

            <motion.div variants={heroReveal} className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-btn-private-aviation"
                onClick={goJets}
                className="inline-flex items-center gap-2.5 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 rounded-none transition-all duration-200 shadow-xl cursor-pointer"
              >
                <span>PRIVATE AVIATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-btn-experience-iceland"
                onClick={goLimousine}
                className="inline-flex items-center gap-2.5 bg-black/40 hover:bg-black/70 text-white border border-white/40 hover:border-white font-semibold text-xs tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 rounded-none backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <span>EXPERIENCE ICELAND</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-20 w-full border-t border-white/15 bg-gradient-to-t from-[#080B0E]/90 via-[#080B0E]/40 to-transparent backdrop-blur-[2px] py-10 sm:py-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
        >
          <div className="site-shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            {[
              { icon: Globe, title: 'Worldwide Operations', body: 'Aviation services and luxury travel, wherever you need us.' },
              { icon: User, title: 'Personal Service', body: 'A dedicated team, available 24/7 to support your journey.' },
              { icon: Gem, title: 'Discretion & Trust', body: 'Your privacy is our priority. Always.' },
              { icon: Mountain, title: 'Iceland Experts', body: 'Local knowledge and access to extraordinary experiences.' },
            ].map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={staggerItem}
                className="flex flex-col items-center text-center py-6 sm:py-2 sm:px-6 lg:px-8 first:pl-0 last:pr-0 space-y-3"
              >
                <div className="text-[#C5A880]">
                  <pillar.icon className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.2]" />
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium text-white tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xs">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. TWO SPECIALIST DIVISIONS SECTION (CRISP LIGHT OFF-WHITE BACKGROUND) */}
      <section className="py-24 sm:py-28 bg-[#F6F7F9] text-[#1A202C]">
        <div className="site-shell">
          
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
              TWO SPECIALIST DIVISIONS. ONE SEAMLESS EXPERIENCE.
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#0F172A]">
              From runway to road.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-xl mx-auto">
              Whether you arrive by private jet or explore Iceland from the ground, our team is here to deliver a seamless journey, start to finish.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 xl:gap-14">
            <motion.div 
              id="card-aviation-division"
              onClick={goJets}
              {...fadeUp}
              whileHover={{ y: -6 }}
              transition={{ ...fadeUp.transition, y: { duration: 0.35 } }}
              className="group bg-white border border-slate-200/80 rounded-none shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 md:h-80 overflow-visible bg-slate-900">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={STOCK.aviationCard} 
                    alt="Gulfstream business jet on the taxiway"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Floating Dark Circular Badge overlapping exactly between the image and the lower content card */}
                <div className="absolute -bottom-8 left-8 sm:left-10 z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#111827] border-2 border-[#C5A880]/70 text-[#C5A880] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Plane className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
                </div>
              </div>

              <div className="pt-12 pb-8 px-8 sm:px-10 space-y-4 flex-1 flex flex-col justify-between bg-white relative z-10">
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#0F172A]">
                    VELA AVIATION
                  </h3>
                  <div className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
                    PRIVATE AVIATION
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                    Aircraft delivery, ferry flights, demo crews and aviation consulting worldwide.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] group-hover:text-[#a88960] transition-colors inline-flex items-center gap-2">
                    EXPLORE AVIATION
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              id="card-concierge-division"
              onClick={goLimousine}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.12 }}
              whileHover={{ y: -6 }}
              className="group bg-white border border-slate-200/80 rounded-none shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 md:h-80 overflow-visible bg-slate-900">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={STOCK.conciergeCard} 
                    alt="Range Rover chauffeur SUV"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Floating Dark Circular Badge overlapping exactly between the image and the lower content card */}
                <div className="absolute -bottom-8 left-8 sm:left-10 z-20 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#111827] border-2 border-[#C5A880]/70 text-[#C5A880] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Mountain className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.5]" />
                </div>
              </div>

              <div className="pt-12 pb-8 px-8 sm:px-10 space-y-4 flex-1 flex flex-col justify-between bg-white relative z-10">
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#0F172A]">
                    VELA CONCIERGE
                  </h3>
                  <div className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
                    LUXURY TRANSPORTATION
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                    Private chauffeur, airport transfers and tailor-made experiences across Iceland.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] group-hover:text-[#a88960] transition-colors inline-flex items-center gap-2">
                    EXPLORE CONCIERGE
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. "JOURNEYS DESIGNED AROUND YOU" 4-CARD FEATURE MATRIX (DARK BACKGROUND) */}
      <section id="journeys-section" className="py-24 sm:py-28 bg-[#080B0E]">
        <div className="site-shell">
          
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-3 mb-16 sm:mb-20">
            <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              JOURNEYS DESIGNED AROUND YOU
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-normal text-white">
              More than a service. A complete experience.
            </h2>
          </motion.div>

          {/* 4-column matrix fitting the full grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6 xl:gap-8">
            
            {/* Card 1: PRIVATE CHAUFFEUR */}
            <div 
              onClick={goLimousine}
              className="group cursor-pointer flex flex-col space-y-0"
            >
              <div className="aspect-[16/10] w-full overflow-visible relative bg-[#0D1219]">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={STOCK.chauffeur} 
                    alt="Mercedes-Benz GLE chauffeur SUV"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Floating Centered Bottom Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0D1219] border-2 border-[#C5A880]/70 text-[#C5A880] flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <User className="w-5 h-5 stroke-[1.5]" />
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 pt-8 sm:pt-9 px-2">
                <h3 className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-white">
                  PRIVATE CHAUFFEUR
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-[240px]">
                  Travel in comfort with your own professional driver.
                </p>
              </div>
            </div>

            {/* Card 2: BESPOKE ICELAND */}
            <div 
              onClick={goLimousine}
              className="group cursor-pointer flex flex-col space-y-0"
            >
              <div className="aspect-[16/10] w-full overflow-visible relative bg-[#0D1219]">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={STOCK.iceland} 
                    alt="Icebergs at Jökulsárlón glacier lagoon, Iceland"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Floating Centered Bottom Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0D1219] border-2 border-[#C5A880]/70 text-[#C5A880] flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <MapPin className="w-5 h-5 stroke-[1.5]" />
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 pt-8 sm:pt-9 px-2">
                <h3 className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-white">
                  BESPOKE ICELAND
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-[240px]">
                  Tell us what you want to see. We'll create the perfect journey.
                </p>
              </div>
            </div>

            {/* Card 3: PRIVATE AVIATION */}
            <div 
              onClick={goJets}
              className="group cursor-pointer flex flex-col space-y-0"
            >
              <div className="aspect-[16/10] w-full overflow-visible relative bg-[#0D1219]">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={STOCK.aviationJourney} 
                    alt="Dassault Falcon 900 private jet"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Floating Centered Bottom Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0D1219] border-2 border-[#C5A880]/70 text-[#C5A880] flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Plane className="w-5 h-5 stroke-[1.5]" />
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 pt-8 sm:pt-9 px-2">
                <h3 className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-white">
                  PRIVATE AVIATION
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-[240px]">
                  Specialist aircraft services delivered by experienced professionals.
                </p>
              </div>
            </div>

            {/* Card 4: VIP ARRIVAL */}
            <div 
              onClick={goLimousine}
              className="group cursor-pointer flex flex-col space-y-0"
            >
              <div className="aspect-[16/10] w-full overflow-visible relative bg-[#0D1219]">
                <div className="w-full h-full overflow-hidden">
                  <img 
                    src={STOCK.vipArrival} 
                    alt="Pilatus PC-12 ready in the hangar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Floating Centered Bottom Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0D1219] border-2 border-[#C5A880]/70 text-[#C5A880] flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Briefcase className="w-5 h-5 stroke-[1.5]" />
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-2 pt-8 sm:pt-9 px-2">
                <h3 className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-white">
                  VIP ARRIVAL
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed max-w-[240px]">
                  From touchdown to destination, everything is taken care of.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BOTTOM CALL-TO-ACTION (Exact 1:1 Match to Mockup) */}
      <section className="relative py-28 overflow-hidden">
        {/* Dark Icelandic Horizon Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={STOCK.cta} 
            alt="Sea cliffs in Vestmannaeyjar, Iceland"
            className="w-full h-full object-cover brightness-60 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/60 to-[#080B0E]" />
        </div>

        <div className="relative z-10 site-shell">
          <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-white">
            Your journey, perfectly managed.
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
            One team across aviation and ground services, committed to delivering exceptional journeys every time.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              id="cta-bottom-enquire-now-btn"
              onClick={() => onOpenEnquiry('Runway to Road Complete VIP Itinerary')}
              className="inline-flex items-center gap-2.5 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-none transition-all duration-200 shadow-xl cursor-pointer"
            >
              <span>ENQUIRE NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          </div>
        </div>
      </section>

    </div>
  );
};
