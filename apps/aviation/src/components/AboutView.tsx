import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe2, Plane, Users } from 'lucide-react';
import { fadeUp, staggerContainer, heroReveal } from '../lib/motion';
import { CONTACT } from '../data/content';

interface AboutViewProps {
  onBackHome: () => void;
  onContact: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBackHome, onContact }) => {
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
            Aircraft delivery.<br />
            <span className="text-[#C5A880] font-light">Manila-based ferry.</span>
          </motion.h1>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="max-w-3xl space-y-6 text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-16"
        >
          <p>
            Vela Aviation is a Manila-based specialist aviation house for aircraft
            delivery, demo flights, and ferry service across Asia-Pacific and worldwide. From crew
            dispatch to oceanic planning and permits, we arrange the full mission so operators can
            move Boeing and Airbus aircraft with confidence.
          </p>
          <p>
            Whether you need crew-only support, a complete ferry package, or consulting on lease and
            acquisition, our team brings decades of airline and business-aviation experience to every
            flight.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 border-y border-white/10 py-12"
        >
          {[
            {
              icon: Plane,
              title: 'Ferry & delivery',
              body: 'Full ferry service including ground and flight operations arrangements.',
            },
            {
              icon: Users,
              title: 'Crew on call',
              body: 'Boeing and Airbus crews available to dispatch within 24 hours.',
            },
            {
              icon: Globe2,
              title: 'Global reach',
              body: 'Oceanic planning, permits, and consulting for missions across Asia-Pacific and beyond.',
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
            onClick={onContact}
            className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 transition-all"
          >
            Contact us <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={CONTACT.emailHref}
            className="border border-white/25 hover:border-[#C5A880] text-white font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 transition-all inline-flex items-center"
          >
            {CONTACT.email}
          </a>
        </motion.div>
      </section>
    </div>
  );
};
