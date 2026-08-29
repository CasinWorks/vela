import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Car } from 'lucide-react';
import { SIBLING } from '../config/sites';
import { fadeUp } from '../lib/motion';

export const EcosystemBand: React.FC = () => (
  <section className="relative py-16 sm:py-20 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#0C1017] border-y border-white/8">
    <motion.div
      {...fadeUp}
      className="max-w-[1720px] mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
    >
      <div className="space-y-3 max-w-xl">
        <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
          Vela Private · Ground division
        </span>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white leading-snug">
          Secure a private chauffeur in the Philippines
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          NAIA airport transfers, signature day tours, and wedding chauffeur — managed by Vela Concierge,
          part of the Vela Private ecosystem.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 shrink-0">
        <a
          href={SIBLING.conciergeBook}
          className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-[11px] tracking-[0.18em] uppercase px-6 py-3.5 transition-colors"
        >
          <Car className="w-3.5 h-3.5" />
          Book chauffeur
        </a>
        <a
          href={SIBLING.parentHome}
          className="inline-flex items-center gap-2 border border-white/20 hover:border-[#C5A880] text-white font-semibold text-[11px] tracking-[0.18em] uppercase px-6 py-3.5 transition-colors"
        >
          Vela Private <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  </section>
);
