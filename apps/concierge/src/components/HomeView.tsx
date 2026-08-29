import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Users,
  Luggage,
  Wifi,
  ShieldCheck,
  CheckCircle,
  Clock,
  Car,
  PlaneLanding,
  MapPin,
} from 'lucide-react';
import { GROUND_FLEET, ICELAND_TOURS, AIRPORT_TRANSFER, formatMoney, STOCK } from '../data/fleet';
import { EcosystemBand } from './EcosystemBand';
import { fadeUp, easeLuxury, staggerContainer, heroReveal } from '../lib/motion';

interface HomeViewProps {
  onOpenBooking: (opts?: { vehicleId?: string; tourId?: string }) => void;
  onOpenEnquiry: (topic?: string) => void;
}

const HERO_IMG = STOCK.hero;

export const HomeView: React.FC<HomeViewProps> = ({ onOpenBooking, onOpenEnquiry }) => {
  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#080B0E] text-slate-200">
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: easeLuxury }}
        >
          <img
            src={HERO_IMG}
            alt="Range Rover chauffeur SUV"
            className="w-full h-full object-cover object-[62%_center] sm:object-[68%_center] brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080B0E] via-[#080B0E]/75 to-transparent w-full md:w-[70%] lg:w-[58%] xl:w-[50%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080B0E]/70 via-transparent to-[#080B0E]" />
        </motion.div>

        <div className="relative z-10 site-shell w-full">
          <motion.div
            className="max-w-2xl xl:max-w-3xl min-[1800px]:max-w-4xl space-y-6 sm:space-y-7"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={heroReveal} className="text-[11px] sm:text-xs font-sans font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              Vela Concierge · Control your own time
            </motion.div>
            <motion.h1 variants={heroReveal} className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl min-[1800px]:text-[5.5rem] font-normal text-white leading-[1.08] tracking-tight">
              Luxury Car &amp;<br />
              <span className="text-[#C5A880] font-light">Private Chauffeur</span>
            </motion.h1>
            <motion.p variants={heroReveal} className="text-slate-300 text-sm sm:text-base min-[1800px]:text-lg font-light max-w-lg min-[1800px]:max-w-xl leading-relaxed">
              Experience Iceland in style and comfort. Private car and chauffeur with our
              Mercedes-Benz GLE (up to 6 passengers) and Range Rover (up to 4 passengers).
            </motion.p>
            <motion.div variants={heroReveal} className="pt-2 flex flex-wrap items-center gap-4">
              <motion.button
                type="button"
                onClick={() => onOpenBooking()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: easeLuxury }}
                className="inline-flex items-center gap-2.5 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 shadow-xl cursor-pointer"
              >
                Book Now <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
              <button
                onClick={scrollToFleet}
                className="inline-flex items-center gap-2.5 bg-black/40 hover:bg-black/70 text-white border border-white/40 font-semibold text-xs tracking-[0.18em] uppercase px-6 sm:px-7 py-3.5 backdrop-blur-sm transition-all cursor-pointer"
              >
                View Fleet
              </button>
            </motion.div>
            <motion.div variants={heroReveal} className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" /> All-Weather AWD / 4WD
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" /> English-Speaking Chauffeurs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#C5A880]" /> KEF VIP Transfers
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-24 sm:py-28 px-0 bg-[#F6F7F9] text-[#1A202C]">
        <div className="site-shell">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
              How We Serve You
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#0F172A]">
              From runway to road.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 xl:gap-8">
            {[
              {
                icon: PlaneLanding,
                title: 'Airport Transfer',
                body: 'To/from the airport with comfort and style — private chauffeur. From €200, up to 4 passengers.',
              },
              {
                icon: Car,
                title: 'Private Chauffeur',
                body: 'Hourly or full-day hire with a dedicated professional driver for your itinerary.',
              },
              {
                icon: MapPin,
                title: 'Bespoke Day Tours',
                body: 'Golden Circle, South Coast, Jökulsárlón, Westman Islands, aurora — designed around you.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white border border-slate-200/80 p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-[#111827] border-2 border-[#C5A880]/70 text-[#C5A880] flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#0F172A] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="fleet" className="py-24 sm:py-28 px-0 bg-[#080B0E]">
        <div className="site-shell">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
                Our Luxury Fleet
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">
                Two vehicles. Absolute focus.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our current operational fleet: the Mercedes-Benz GLE (up to 6 passengers) and the Range
                Rover (up to 4 passengers).
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14">
            {GROUND_FLEET.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="group bg-white border border-slate-200/80 overflow-visible flex flex-col shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 sm:h-72 md:h-80 overflow-visible bg-slate-900">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {vehicle.tag && (
                    <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider bg-black/80 text-[#C5A880] px-3 py-1 border border-[#C5A880]/30">
                      {vehicle.tag}
                    </span>
                  )}
                  <div className="absolute -bottom-8 left-8 sm:left-10 z-20 w-16 h-16 rounded-full bg-[#111827] border-2 border-[#C5A880]/70 text-[#C5A880] flex items-center justify-center shadow-2xl">
                    <Car className="w-7 h-7 stroke-[1.5]" />
                  </div>
                </div>

                <div className="pt-12 pb-8 px-8 sm:px-10 space-y-4 flex-1 flex flex-col justify-between bg-white relative z-10 text-[#1A202C]">
                  <div className="space-y-2">
                    <div className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
                      {vehicle.category}
                    </div>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#0F172A]">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{vehicle.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 pt-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                      Max {vehicle.passengers} passengers
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Luggage className="w-3.5 h-3.5 text-[#C5A880]" />
                      {vehicle.luggage} suitcases
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-[#C5A880]" />
                      Wi-Fi onboard
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                      {vehicle.specs.drivetrain}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-slate-500 block">KEF transfer · hourly</span>
                      <span className="text-sm font-semibold text-[#0F172A]">
                        {formatMoney(vehicle.transferRateKEF_EUR)} · {formatMoney(vehicle.hourlyRateEUR)}/hr
                      </span>
                    </div>
                    <button
                      onClick={() => onOpenBooking({ vehicleId: vehicle.id })}
                      className="text-xs font-semibold uppercase tracking-wider text-[#C5A880] hover:text-[#a88960] inline-flex items-center gap-2"
                    >
                      Reserve <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="tours" className="py-24 sm:py-28 px-0 bg-[#0A0E15]">
        <div className="site-shell">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              Tailor-Made Itineraries
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white">
              Private Signature Day Tours
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {ICELAND_TOURS.map((tour, i) => (
              <motion.div
                key={tour.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group bg-[#0D1219] border border-white/10 overflow-hidden hover:border-[#C5A880]/50 transition-colors flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs gap-2">
                    <span className="bg-black/80 text-white px-2.5 py-1 border border-white/10 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      {tour.durationHours}h
                    </span>
                    <span className="bg-black/80 text-[#C5A880] px-2.5 py-1 border border-[#C5A880]/30 font-mono">
                      up to {tour.maxPassengers}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    {tour.subtitle && (
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880] block mb-1">
                        {tour.subtitle}
                      </span>
                    )}
                    <h3 className="font-serif-luxury text-lg text-white leading-snug mb-2">{tour.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-4">{tour.description}</p>
                    {tour.note && (
                      <p className="text-[10px] text-amber-200/70 mt-2 leading-relaxed">{tour.note}</p>
                    )}
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[#C5A880]">
                      from {formatMoney(tour.basePrice, tour.currency)}
                    </span>
                    <button
                      onClick={() => onOpenBooking({ tourId: tour.id })}
                      className="text-[10px] font-semibold uppercase tracking-wider text-slate-300 hover:text-[#C5A880] shrink-0"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeUp}
            whileHover={{ y: -4 }}
            className="group mt-6 xl:mt-8 bg-[#0D1219] border border-white/10 overflow-hidden hover:border-[#C5A880]/50 transition-colors grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[240px] overflow-hidden">
              <img
                src={AIRPORT_TRANSFER.image}
                alt={AIRPORT_TRANSFER.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between text-xs gap-2">
                <span className="bg-black/80 text-white px-2.5 py-1 border border-white/10 flex items-center gap-1 font-mono">
                  <PlaneLanding className="w-3.5 h-3.5 text-[#C5A880]" />
                  Transfer
                </span>
                <span className="bg-black/80 text-[#C5A880] px-2.5 py-1 border border-[#C5A880]/30 font-mono">
                  up to {AIRPORT_TRANSFER.maxPassengers}
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880] block">
                  {AIRPORT_TRANSFER.subtitle}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white leading-snug">
                  {AIRPORT_TRANSFER.title} to/from the Airport
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                  {AIRPORT_TRANSFER.description}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-slate-500 block mb-1">
                    To / from Reykjavík
                  </span>
                  <span className="text-lg font-semibold text-[#C5A880]">
                    from {formatMoney(AIRPORT_TRANSFER.fromEUR)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#080B0E] bg-[#C5A880] hover:bg-[#d6ba94] px-5 py-3 transition-colors"
                >
                  Book <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <EcosystemBand />

      <section className="relative py-28 px-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={STOCK.cta}
            alt="Iceland landscape"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/60 to-[#080B0E]" />
        </div>
        <motion.div {...fadeUp} className="relative z-10 site-shell">
          <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-white">
            Your Iceland journey, perfectly managed.
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
            Airport transfers from {formatMoney(AIRPORT_TRANSFER.fromEUR)} (up to {AIRPORT_TRANSFER.maxPassengers}{' '}
            passengers). Private day tours and wedding chauffeur with live estimates in the booking story.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              type="button"
              onClick={() => onOpenBooking()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25, ease: easeLuxury }}
              className="inline-flex items-center gap-2.5 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 shadow-xl cursor-pointer"
            >
              Start booking <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
            <button
              onClick={() => onOpenEnquiry('Vela Concierge')}
              className="inline-flex items-center gap-2.5 border border-white/30 hover:border-[#C5A880] text-white font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all cursor-pointer"
            >
              Message concierge
            </button>
          </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
