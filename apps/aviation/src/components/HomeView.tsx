import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONTACT, OFFERINGS, DO_IT_ALL, GALLERY_IMAGES, TEAM, IMAGES, STATS } from '../data/content';
import { STUDIO } from '../config/sites';
import { ContactForm } from './ContactForm';
import { EcosystemBand } from './EcosystemBand';
import { fadeUp as fadeUpPreset, easeLuxury } from '../lib/motion';

const fadeUp = fadeUpPreset;

export const HomeView: React.FC = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="w-full bg-[#080B0E] text-slate-200">
      {/* ——— HERO ——— */}
      <section id="home" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: easeLuxury }}
        >
          <img
            src={IMAGES.hero}
            alt="Aircraft in flight"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080B0E] via-[#080B0E]/70 to-[#080B0E]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-transparent to-[#080B0E]/50" />
        </motion.div>

        <div className="relative z-10 max-w-[1720px] w-full mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pb-16 sm:pb-24 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-7"
          >
            <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#C5A880]">
              Aircraft Delivery · Demo Flights · Ferry Flights
            </p>
            <h1 className="font-serif-luxury text-[clamp(2.75rem,8vw,5.5rem)] text-white leading-[0.98] tracking-tight">
              We are here<br />
              <span className="text-[#C5A880] font-light italic">to serve</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light max-w-lg leading-relaxed">
              Worldwide aircraft delivery and ferry service with highly qualified pilots —
              dispatched when you need them.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2.5 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.18em] uppercase px-7 py-3.5 transition-colors cursor-pointer"
              >
                Contact us <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollTo('specialty')}
                className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-white/80 hover:text-[#C5A880] transition-colors cursor-pointer"
              >
                Our specialty <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-14 sm:mt-20 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-12 border-t border-white/15 pt-8"
          >
            <div className="grid grid-cols-3 gap-6 sm:gap-10 flex-1 max-w-xl">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-serif-luxury text-2xl sm:text-3xl text-white">{s.value}</div>
                  <div className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-slate-400 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={STUDIO.url}
              className="shrink-0 text-[10px] tracking-[0.22em] uppercase text-[#C5A880] hover:text-white transition-colors"
            >
              Studio concept · CasinWorks
            </a>
          </motion.div>
        </div>
      </section>

      {/* ——— WELCOME (editorial, asymmetric) ——— */}
      <section className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#F6F7F9] text-[#1A202C] overflow-hidden">
        <div className="max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
            <motion.div {...fadeUp} className="lg:col-span-5 space-y-6 relative z-10 lg:pb-16">
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                Welcome
              </span>
              <h2 className="font-serif-luxury text-[clamp(2.25rem,4.5vw,3.75rem)] text-[#0F172A] leading-[1.05]">
                Thirty years of worldwide aviation experience.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light max-w-md">
                With our dedicated team of experts we can assist with all your needs in aviation.
                All our pilots have worldwide flight operations experience.
              </p>
              <button
                onClick={() => scrollTo('team')}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#0F172A] hover:text-[#C5A880] transition-colors border-b border-[#0F172A]/30 hover:border-[#C5A880] pb-1"
              >
                Meet the team <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.12 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={IMAGES.intro}
                  alt="Aircraft on the apron"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 sm:left-8 lg:-left-10 max-w-[220px] bg-[#080B0E] text-white p-5 sm:p-6 shadow-2xl hidden sm:block">
                <p className="font-serif-luxury text-3xl text-[#C5A880]">30+</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mt-1 leading-relaxed">
                  Years across ferry, delivery &amp; demo missions
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ——— SPECIALTY ——— */}
      <section id="specialty" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#080B0E]">
        <div className="max-w-[1720px] mx-auto min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
            <motion.div {...fadeUp} className="space-y-5 min-w-0">
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                Our Specialty
              </span>
              <h2 className="font-serif-luxury text-[clamp(2.25rem,4vw,3.5rem)] text-white leading-[1.05]">
                We can offer
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed max-w-sm">
                Full ferry support or crew-only — flexible to the mission you need today.
              </p>
              <div className="relative w-full max-w-lg overflow-hidden aspect-[4/5] max-h-[480px]">
                <img
                  src={IMAGES.specialty}
                  alt="Business jet at sunrise"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div className="min-w-0 divide-y divide-white/[0.08]">
              {OFFERINGS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group flex items-start gap-4 py-6 first:pt-0"
                >
                  <span className="font-mono text-[11px] text-[#C5A880]/70 pt-1 w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors leading-relaxed flex-1 min-w-0">
                    {item}
                  </p>
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]/40 group-hover:text-[#C5A880] shrink-0 mt-1 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Clear break before dual panels */}
          <div className="mt-16 sm:mt-20 mb-10 sm:mb-12 flex items-center gap-6" aria-hidden>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]/70 shrink-0">
              How we work
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          {/* Do it all / less if needed — clearly separated panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            <motion.div
              {...fadeUp}
              className="relative min-h-[320px] sm:min-h-[400px] overflow-hidden group ring-1 ring-white/10"
            >
              <img
                src={IMAGES.planning}
                alt="Flight planning"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/50 to-transparent" />
              <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white mb-4">We do it all…</h3>
                <ul className="flex flex-wrap gap-2">
                  {DO_IT_ALL.map((item) => (
                    <li
                      key={item}
                      className="text-[11px] tracking-wide uppercase text-[#C5A880] border border-[#C5A880]/35 px-3 py-1.5 bg-black/40 backdrop-blur-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="relative min-h-[320px] sm:min-h-[400px] overflow-hidden group ring-1 ring-white/10"
            >
              <img
                src={IMAGES.crew}
                alt="Aircraft boarding on the tarmac"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-[#080B0E]/55 to-transparent" />
              <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end">
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white mb-3">
                  …and less if needed
                </h3>
                <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
                  We can also provide pilots if that is all you need.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ——— GALLERY ——— */}
      <section id="gallery" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#0A0E15]">
        <div className="max-w-[1720px] mx-auto">
          <motion.div {...fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                Gallery
              </span>
              <h2 className="font-serif-luxury text-[clamp(2.25rem,4vw,3.5rem)] text-white leading-[1.05]">
                See what we are doing
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-xs sm:text-right leading-relaxed">
              Delivery, ferry and demo missions across the globe.
            </p>
          </motion.div>

          {/* Fixed bento — every cell filled; areas remap on mobile */}
          <div
            className="
              grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4
              auto-rows-[minmax(140px,180px)] sm:auto-rows-[minmax(160px,200px)] lg:auto-rows-[200px]
              [grid-template-areas:'feat_feat'_'tall_board'_'tall_fly'_'wide_wide'_'crew_cap']
              md:[grid-template-areas:'feat_feat_tall_board'_'feat_feat_tall_fly'_'crew_wide_wide_cap']
            "
          >
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden min-h-0 bg-[#12161e]"
                style={{ gridArea: img.area }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="pointer-events-none absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-[10px] sm:text-[11px] tracking-wide text-white/90 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {img.alt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— TEAM ——— */}
      <section id="team" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#F6F7F9] text-[#1A202C]">
        <div className="max-w-[1720px] mx-auto">
          <motion.div {...fadeUp} className="max-w-xl mb-14 sm:mb-20 space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
              Our Team
            </span>
            <h2 className="font-serif-luxury text-[clamp(2.25rem,4vw,3.5rem)] text-[#0F172A] leading-[1.05]">
              Experienced professionals
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {TEAM.map((member, i) => (
              <motion.article
                key={member.email}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-6 sm:gap-8 items-start"
              >
                <div className="overflow-hidden aspect-[3/4] bg-[#080B0E]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 pt-1">
                  <div>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#0F172A]">{member.name}</h3>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-[#C5A880] mt-1">{member.role}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{member.bio}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#0F172A] hover:text-[#C5A880] transition-colors"
                  >
                    {member.email} <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <EcosystemBand />

      {/* ——— CONTACT ——— */}
      <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.secondary} alt="" className="w-full h-full object-cover brightness-[0.35]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080B0E] via-[#080B0E]/92 to-[#080B0E]/80" />
        </div>
        <div className="relative z-10 max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div {...fadeUp} className="lg:col-span-5 space-y-5">
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
              24/7 Customer Service
            </span>
            <h2 className="font-serif-luxury text-[clamp(2.25rem,4vw,3.5rem)] text-white leading-[1.05]">
              We are looking forward to assisting you
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Send a message and we will get back to you as soon as possible.
            </p>
            <div className="pt-2 space-y-2 text-sm">
              <a href={CONTACT.emailHref} className="block text-white hover:text-[#C5A880] transition-colors">
                {CONTACT.email}
              </a>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="lg:col-span-7 border border-white/10 bg-[#0C1017]/90 backdrop-blur-md p-6 sm:p-10"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
