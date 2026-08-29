import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plane } from 'lucide-react';
import { SIBLING } from '../config/sites';
import { fadeUp } from '../lib/motion';

export const EcosystemBand: React.FC = () => (
  <section className="relative py-16 sm:py-20 bg-[#0C1017] border-y border-white/10">
    <motion.div {...fadeUp} className="site-shell flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
      <div className="space-y-3 max-w-xl">
        <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
          Vela Private · Aviation division
        </span>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white leading-snug">
          Aircraft delivery &amp; ferry worldwide
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Vela Aviation — demo flights, ferry service, and crew dispatch. Part of the same Vela Private group
          that operates Vela Concierge.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 shrink-0">
        <a
          href={SIBLING.aviationHome}
          className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-[11px] tracking-[0.18em] uppercase px-6 py-3.5 transition-colors"
        >
          <Plane className="w-3.5 h-3.5" />
          Visit Vela Aviation
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
