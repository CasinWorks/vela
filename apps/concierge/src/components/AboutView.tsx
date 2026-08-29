import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Clock, Car } from 'lucide-react';
import { fadeUp, staggerContainer, heroReveal } from '../lib/motion';

interface AboutViewProps {
  onOpenBooking: () => void;
  onOpenEnquiry: (topic?: string) => void;
  onBackHome: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenBooking,
  onOpenEnquiry,
  onBackHome,
}) => {
  return (
    <div className="w-full bg-[#080B0E] text-slate-200 pt-28 sm:pt-32 pb-24">
      <section className="max-w-[1100px] mx-auto px-6 sm:px-10 lg:px-16">
        <button
          type="button"
          onClick={onBackHome}
          className="text-[11px] tracking-[0.22em] uppercase text-slate-500 hover:text-[#C5A880] mb-10 transition-colors"
        >
          ← Back home
        </button>

        <motion.div
          className="space-y-5 mb-14 sm:mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={heroReveal}
            className="block text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]"
          >
            About Us
          </motion.span>
          <motion.h1
            variants={heroReveal}
            className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-white leading-[1.08]"
          >
            Driven by Icelanders.<br />
            <span className="text-[#C5A880] font-light">Designed around you.</span>
          </motion.h1>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="max-w-3xl space-y-6 text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-16"
        >
          <p>
            Vela Concierge is a studio concept for private chauffeur and day touring in Iceland, offering
            customized transfers and daytrips from 2 – 16 hours, designed to fit the interests and
            timetable for business or personal layover visits and/or cruise passengers seeking a
            do-it-yourself excursion. You will be driven and escorted by an Icelandic driver-guide
            in a comfortable vehicle that is suited for the terrain you will explore. If you have
            more time available, we will discuss your interests and prepare a personal tour that is
            sure to awe and inspire you.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 border-y border-white/10 py-12"
        >
          {[
            {
              icon: Clock,
              title: '2 – 16 hour journeys',
              body: 'Transfers and daytrips shaped to your layover, cruise schedule, or full-day itinerary.',
            },
            {
              icon: Car,
              title: 'Terrain-ready fleet',
              body: 'Comfortable vehicles matched to the roads and landscapes you want to experience.',
            },
            {
              icon: MapPin,
              title: 'Icelandic driver-guides',
              body: 'Local escorts who know the terrain, the stories, and how to make the most of your time.',
            },
          ].map((item) => (
            <div key={item.title} className="space-y-3">
              <item.icon className="w-5 h-5 text-[#C5A880]" />
              <h3 className="font-serif-luxury text-xl text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 transition-all"
          >
            Start booking <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onOpenEnquiry('Vela Concierge')}
            className="border border-white/25 hover:border-[#C5A880] text-white font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 transition-all"
          >
            Message concierge
          </button>
        </motion.div>
      </section>
    </div>
  );
};
