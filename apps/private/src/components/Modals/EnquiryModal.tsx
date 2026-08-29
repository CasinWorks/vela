import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  bookingPortal,
  easeLuxury,
  pageSlide,
  stepChild,
  stepStagger,
} from '../../lib/motion';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

type Step = 'welcome' | 'service' | 'details' | 'sent';

const SERVICE_OPTIONS = [
  {
    id: 'runway-to-road',
    label: 'Runway to Road VIP',
    hint: 'Aviation + chauffeur in one itinerary',
  },
  {
    id: 'jets',
    label: 'Vela Aviation · Ferry & Delivery',
    hint: 'Aircraft delivery, demo & ferry flights',
  },
  {
    id: 'limousine',
    label: 'Vela Concierge',
    hint: 'NAIA transfers, tours & wedding chauffeur',
  },
  {
    id: 'airport',
    label: 'NAIA Airport VIP Transfer',
    hint: 'Private tarmac-to-hotel ground service',
  },
  {
    id: 'general',
    label: 'General Concierge',
    hint: 'Anything else — we route to the right desk',
  },
] as const;

function resolveTopic(raw?: string): string {
  if (!raw) return 'Runway to Road VIP';
  const lower = raw.toLowerCase();
  if (lower.includes('jet') || lower.includes('ferry') || lower.includes('aviation')) {
    return 'Vela Aviation · Ferry & Delivery';
  }
  if (lower.includes('limousine') || lower.includes('chauffeur') || lower.includes('tour')) {
    return 'Vela Concierge';
  }
  if (lower.includes('naia') || lower.includes('mnl') || lower.includes('airport') || lower.includes('transfer')) {
    return 'NAIA Airport VIP Transfer';
  }
  if (lower.includes('general') || lower.includes('contact')) {
    return 'General Concierge';
  }
  if (lower.includes('runway') || lower.includes('road') || lower.includes('vip')) {
    return 'Runway to Road VIP';
  }
  return raw;
}

const STEPS: Step[] = ['welcome', 'service', 'details', 'sent'];

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultTopic,
}) => {
  const [step, setStep] = useState<Step>('welcome');
  const [direction, setDirection] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState(() => resolveTopic(defaultTopic));
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('welcome');
      setDirection(1);
      setTopic(resolveTopic(defaultTopic));
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen, defaultTopic]);

  const stepIndex = STEPS.indexOf(step);

  const goNext = () => {
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) {
      setDirection(1);
      setStep(STEPS[i + 1]);
    }
  };

  const goBack = () => {
    const i = STEPS.indexOf(step);
    if (i > 0) {
      setDirection(-1);
      setStep(STEPS[i - 1]);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('welcome');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitting(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDirection(1);
      setStep('sent');
    }, 900);
  };

  const selectService = (label: string) => {
    setTopic(label);
    setDirection(1);
    setStep('details');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] bg-[#080B0E] overflow-y-auto"
      variants={bookingPortal}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(197,168,128,0.16) 0%, transparent 55%), radial-gradient(ellipse 45% 40% at 10% 100%, rgba(197,168,128,0.07) 0%, transparent 50%)',
        }}
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative min-h-full flex flex-col">
        <motion.header
          className="sticky top-0 z-10 bg-[#080B0E]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.55, ease: easeLuxury }}
        >
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goBack}
              className="text-slate-400 hover:text-white inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 'welcome' || step === 'sent' ? 'Close' : 'Back'}
            </button>

            {step !== 'sent' && (
              <div className="flex-1 max-w-xs hidden sm:flex gap-1.5">
                {(['welcome', 'service', 'details'] as const).map((s, i) => (
                  <div key={s} className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-[#C5A880]"
                      initial={false}
                      animate={{ scaleX: i <= stepIndex ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: easeLuxury }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                ))}
              </div>
            )}

            <span className="text-[10px] tracking-[0.22em] uppercase text-[#C5A880] shrink-0">
              VIP Concierge
            </span>
          </div>
        </motion.header>

        <div className="flex-1 max-w-2xl mx-auto w-full px-6 sm:px-10 py-10 sm:py-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={pageSlide}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div variants={stepStagger} initial="hidden" animate="show" className="min-h-[50vh]">
                {step === 'welcome' && (
                  <div className="space-y-10">
                    <motion.div variants={stepChild} className="space-y-5">
                      <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                        <Sparkles className="w-3.5 h-3.5" />
                        24/7 VIP Concierge &amp; Flight Desk
                      </span>
                      <h1 className="font-serif-luxury text-4xl sm:text-5xl text-white leading-[1.05]">
                        Direct concierge
                        <br />
                        <span className="text-[#C5A880] font-light italic">dispatch.</span>
                      </h1>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                        Private aviation and luxury chauffeur specialists on duty in Manila &amp; Singapore.
                        Your enquiry is handled under strict non-disclosure protocol.
                      </p>
                    </motion.div>

                    <motion.ul variants={stepChild} className="space-y-3 text-sm text-slate-300">
                      {[
                        'Response routed within 30 minutes',
                        'Aviation & ground under one team',
                        'Confidential handling as standard',
                      ].map((t) => (
                        <li key={t} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                          {t}
                        </li>
                      ))}
                    </motion.ul>

                    <motion.div variants={stepChild} className="flex flex-wrap gap-4 pt-2">
                      <motion.button
                        type="button"
                        onClick={goNext}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2.5 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 transition-colors"
                      >
                        Begin enquiry <ArrowRight className="w-4 h-4" />
                      </motion.button>
                      <a
                        href="mailto:studio@casinworks.com"
                        className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-slate-400 hover:text-[#C5A880] transition-colors py-4"
                      >
                        <Mail className="w-3.5 h-3.5" /> studio@casinworks.com
                      </a>
                    </motion.div>
                  </div>
                )}

                {step === 'service' && (
                  <div className="space-y-8">
                    <motion.div variants={stepChild} className="space-y-3">
                      <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                        Step 1 · Service
                      </span>
                      <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">
                        How may we assist?
                      </h2>
                      <p className="text-sm text-slate-400 max-w-md">
                        Select the service closest to your request. You can refine details on the next step.
                      </p>
                    </motion.div>

                    <div className="space-y-3">
                      {SERVICE_OPTIONS.map((opt) => {
                        const selected = topic === opt.label;
                        return (
                          <motion.button
                            key={opt.id}
                            type="button"
                            variants={stepChild}
                            onClick={() => selectService(opt.label)}
                            whileHover={{ x: 4 }}
                            className={`w-full text-left p-5 border transition-all duration-300 ${
                              selected
                                ? 'border-[#C5A880] bg-[#C5A880]/10'
                                : 'border-white/10 bg-white/[0.03] hover:border-[#C5A880]/40'
                            }`}
                          >
                            <span className="block font-serif-luxury text-lg text-white">{opt.label}</span>
                            <span className="block text-xs text-slate-400 mt-1">{opt.hint}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 'details' && (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <motion.div variants={stepChild} className="space-y-3">
                      <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                        Step 2 · Your details
                      </span>
                      <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">
                        Journey &amp; contact
                      </h2>
                      <p className="text-sm text-slate-400">
                        Selected: <span className="text-[#C5A880]">{topic}</span>
                      </p>
                    </motion.div>

                    <motion.div variants={stepChild} className="space-y-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-medium tracking-wide">Topic / Service</label>
                        <input
                          type="text"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          className="w-full bg-[#0C1017] border border-white/15 px-4 py-3.5 text-white focus:border-[#C5A880] outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-slate-300 font-medium">Your name *</label>
                          <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full name"
                            className="w-full bg-[#0C1017] border border-white/15 px-4 py-3.5 text-white focus:border-[#C5A880] outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-slate-300 font-medium">Phone *</label>
                          <input
                            required
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+354 …"
                            className="w-full bg-[#0C1017] border border-white/15 px-4 py-3.5 text-white focus:border-[#C5A880] outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-medium">Email *</label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="vip@domain.com"
                          className="w-full bg-[#0C1017] border border-white/15 px-4 py-3.5 text-white focus:border-[#C5A880] outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-300 font-medium">Journey details &amp; timing</label>
                        <textarea
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Dates, guests, flight numbers, aircraft type, special requirements…"
                          className="w-full bg-[#0C1017] border border-white/15 px-4 py-3.5 text-white focus:border-[#C5A880] outline-none resize-none transition-colors"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={stepChild}
                      className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                        Strict non-disclosure protocol
                      </div>
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={submitting ? {} : { scale: 1.02 }}
                        whileTap={submitting ? {} : { scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] disabled:opacity-60 text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {submitting ? 'Dispatching…' : 'Send request'}
                      </motion.button>
                    </motion.div>
                  </form>
                )}

                {step === 'sent' && (
                  <div className="text-center space-y-8 py-8 sm:py-12">
                    <motion.div
                      variants={stepChild}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-[#C5A880]/15 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>
                    <motion.div variants={stepChild} className="space-y-4">
                      <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880] block">
                        Inquiry dispatched
                      </span>
                      <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">
                        Thank you, {name.split(' ')[0] || 'guest'}.
                      </h2>
                      <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                        Your confidential enquiry has been routed to our Senior Duty Concierge and Aviation
                        Flight Dispatch. We will reach you at{' '}
                        <strong className="text-white">{email || phone}</strong> within 30 minutes.
                      </p>
                    </motion.div>
                    <motion.div variants={stepChild} className="flex flex-wrap justify-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-colors"
                      >
                        Close
                      </button>
                      <a
                        href="mailto:studio@casinworks.com"
                        className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-slate-400 hover:text-[#C5A880] transition-colors py-3.5"
                      >
                        <Mail className="w-3.5 h-3.5" /> studio@casinworks.com
                      </a>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
