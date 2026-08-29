import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plane, Car, ShieldCheck, Globe2, Users } from 'lucide-react';
import { SITES } from '../../config/sites';
import { fadeUp, staggerContainer, heroReveal } from '../../lib/motion';

interface AboutViewProps {
  onOpenEnquiry: (topic?: string) => void;
  onBackHome: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenEnquiry, onBackHome }) => {
  return (
    <div className="w-full bg-[#080B0E] text-slate-200 pt-28 sm:pt-32 pb-24">
      <section className="site-shell">
        <div className="max-w-[1100px]">
        <button
          type="button"
          onClick={onBackHome}
          className="text-[11px] tracking-[0.22em] uppercase text-slate-500 hover:text-[#C5A880] mb-10 transition-colors"
        >
          ← Back to portal
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
            One standard.<br />
            <span className="text-[#C5A880] font-light">Two specialist houses.</span>
          </motion.h1>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="max-w-3xl space-y-6 text-slate-300 text-sm sm:text-base font-light leading-relaxed mb-16"
        >
          <p>
            Vela Private is the umbrella for discreet private aviation and luxury ground transport.
            We connect runway to road under one concierge standard — without mixing the brands into
            a single booking form.
          </p>
          <p>
            Through Vela Aviation we deliver ferry flights, crew dispatch, and oceanic planning worldwide.
            Through Vela Concierge we offer licenced, customized transfers and daytrips from 2 –
            16 hours — driven and escorted by Icelandic driver-guides in vehicles suited to the
            terrain you will explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <motion.a
            href={SITES.aviation}
            {...fadeUp}
            whileHover={{ y: -4 }}
            className="group border border-white/10 hover:border-[#C5A880]/50 p-8 sm:p-10 transition-colors bg-[#0C1017]"
          >
            <Plane className="w-6 h-6 text-[#C5A880] mb-5" />
            <h2 className="font-serif-luxury text-2xl text-white mb-3">Vela Aviation</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Aircraft delivery, ferry flights, oceanic planning, and crew dispatch for Boeing and
              Airbus operators worldwide.
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              Visit aviation site{' '}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>

          <motion.a
            href={SITES.concierge}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="group border border-white/10 hover:border-[#C5A880]/50 p-8 sm:p-10 transition-colors bg-[#0C1017]"
          >
            <Car className="w-6 h-6 text-[#C5A880] mb-5" />
            <h2 className="font-serif-luxury text-2xl text-white mb-3">Vela Concierge</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Customized transfers and daytrips for layover, business, and cruise guests — with
              Icelandic driver-guides and terrain-ready vehicles.
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
              Visit ground site{' '}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </div>

        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 border-y border-white/10 py-12"
        >
          {[
            {
              icon: ShieldCheck,
              title: 'Discreet by design',
              body: 'VIP protocol from first enquiry to last mile — confidentiality is non-negotiable.',
            },
            {
              icon: Globe2,
              title: 'Reykjavík rooted',
              body: 'Operated from Iceland with international reach across ferry and delivery missions.',
            },
            {
              icon: Users,
              title: 'Human concierge',
              body: 'Real specialists on duty — we coordinate aviation and ground as one journey when you need both.',
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
            onClick={() => onOpenEnquiry('General Contact')}
            className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 transition-all"
          >
            Contact concierge
          </button>
          <a
            href={`${SITES.concierge}/#/book`}
            className="border border-white/25 hover:border-[#C5A880] text-white font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5 transition-all inline-flex items-center"
          >
            Book Vela Concierge
          </a>
        </motion.div>
        </div>
      </section>
    </div>
  );
};
