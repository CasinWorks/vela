import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';
import { GROUND_FLEET, PRIVATE_TOURS, AIRPORT_TRANSFER, formatMoney } from '../data/fleet';
import { addBooking, type ServiceType } from '../lib/bookings';
import { notifyBookingByEmail } from '../lib/notifyBooking';
import { easeLuxury, bookingPortal, pageSlide, stepStagger, stepChild } from '../lib/motion';

type Step = 'welcome' | 'vehicle' | 'service' | 'calendar' | 'details' | 'confirm';

interface StoryBookingProps {
  onClose: () => void;
  onComplete: () => void;
  initialVehicleId?: string;
  initialTourId?: string;
}

const TIME_SLOTS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export const StoryBooking: React.FC<StoryBookingProps> = ({
  onClose,
  onComplete,
  initialVehicleId,
  initialTourId,
}) => {
  const today = new Date();
  const [step, setStep] = useState<Step>('welcome');
  const [vehicleId, setVehicleId] = useState(initialVehicleId || GROUND_FLEET[0].id);
  const [serviceType, setServiceType] = useState<ServiceType>(
    initialTourId ? 'day_tour' : 'airport_transfer'
  );
  const [tourId, setTourId] = useState(initialTourId || PRIVATE_TOURS[0].id);
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [hoursNeeded, setHoursNeeded] = useState(4);
  const [passengers, setPassengers] = useState(2);
  const [pickup, setPickup] = useState('Ninoy Aquino International Airport (NAIA / MNL)');
  const [dropoff, setDropoff] = useState('Makati CBD');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [refId, setRefId] = useState('');
  const [direction, setDirection] = useState(1);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const vehicle = GROUND_FLEET.find((v) => v.id === vehicleId) || GROUND_FLEET[0];
  const tour = PRIVATE_TOURS.find((t) => t.id === tourId);

  const estimate = useMemo(() => {
    if (serviceType === 'airport_transfer') {
      return { amount: vehicle.transferRateKEF_EUR, currency: 'EUR' as const };
    }
    if (serviceType === 'hourly_hire') {
      return {
        amount: vehicle.hourlyRateEUR * Math.max(3, hoursNeeded),
        currency: 'EUR' as const,
      };
    }
    if (serviceType === 'day_tour' && tour) {
      return { amount: tour.basePrice, currency: tour.currency };
    }
    return { amount: vehicle.transferRateKEF_EUR, currency: 'EUR' as const };
  }, [serviceType, vehicle, tour, hoursNeeded]);

  const estimateLabel = formatMoney(estimate.amount, estimate.currency);
  const maxPassengers =
    serviceType === 'airport_transfer'
      ? Math.min(vehicle.passengers, AIRPORT_TRANSFER.maxPassengers)
      : serviceType === 'day_tour' && tour
        ? Math.min(vehicle.passengers, tour.maxPassengers)
        : vehicle.passengers;

  const steps: Step[] = ['welcome', 'vehicle', 'service', 'calendar', 'details', 'confirm'];
  const stepIndex = steps.indexOf(step);

  const goNext = () => {
    const i = steps.indexOf(step);
    if (i < steps.length - 1) {
      setDirection(1);
      setStep(steps[i + 1]);
    }
  };
  const goBack = () => {
    const i = steps.indexOf(step);
    if (i > 0) {
      setDirection(-1);
      setStep(steps[i - 1]);
    } else onClose();
  };

  const canContinue = () => {
    if (step === 'calendar') return Boolean(date && time);
    if (step === 'details') return Boolean(guestName && guestEmail && pickup && dropoff);
    return true;
  };

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError('');

    const result = addBooking({
      serviceType,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      tourId: serviceType === 'day_tour' ? tour?.id : undefined,
      tourTitle: serviceType === 'day_tour' ? tour?.title : undefined,
      date,
      time,
      hoursNeeded,
      passengers,
      pickup,
      dropoff,
      guestName,
      guestEmail,
      guestPhone,
      notes,
      estimatedAmount: estimate.amount,
      estimateCurrency: estimate.currency,
    });

    if (result.ok === false) {
      setSubmitError(result.error);
      setSubmitting(false);
      return;
    }

    // Email is best-effort — local booking always wins if Resend is offline/misconfigured
    await notifyBookingByEmail(result.booking);

    setRefId(result.booking.id);
    setDirection(1);
    setStep('confirm');
    setSubmitting(false);
  };

  const monthLabel = new Date(calYear, calMonth, 1).toLocaleString('en', {
    month: 'long',
    year: 'numeric',
  });
  const firstDow = new Date(calYear, calMonth, 1).getDay();
  const dim = daysInMonth(calYear, calMonth);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <motion.div
      className="fixed inset-0 z-[70] bg-[#080B0E] overflow-y-auto"
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
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(197,168,128,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 35% at 90% 100%, rgba(197,168,128,0.08) 0%, transparent 50%)',
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative min-h-full flex flex-col">
        <motion.header
          className="sticky top-0 z-10 bg-[#080B0E]/95 backdrop-blur border-b border-white/10 px-6 sm:px-10 py-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.55, ease: easeLuxury }}
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={goBack}
              className="text-slate-400 hover:text-white inline-flex items-center gap-2 text-xs tracking-wider uppercase"
            >
              <ArrowLeft className="w-4 h-4" />
              {step === 'welcome' ? 'Close' : 'Back'}
            </button>
            <div className="flex-1 max-w-xs hidden sm:flex gap-1.5">
              {steps.filter((s) => s !== 'confirm').map((s, i) => (
                <div key={s} className="h-1 flex-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-[#C5A880]"
                    initial={false}
                    animate={{ scaleX: i <= stepIndex && step !== 'confirm' ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: easeLuxury }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              ))}
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
              Vela Concierge
            </span>
          </div>
        </motion.header>

        <div className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-10 py-10 sm:py-14">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={pageSlide}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <motion.div variants={stepStagger} initial="hidden" animate="show" className="min-h-[40vh]">
          {step === 'welcome' && (
            <div className="space-y-8">
              <motion.div variants={stepChild} className="space-y-4">
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                  Book your journey
                </span>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl text-white leading-tight">
                  Your Philippine story,<br />
                  <span className="text-[#C5A880] font-light">one step at a time.</span>
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                  Choose your vehicle, pick a date on the calendar, and send a booking request.
                  Transparent pricing — confirmed by our concierge.
                </p>
              </motion.div>
              <motion.ul variants={stepChild} className="space-y-3 text-sm text-slate-300">
                {[
                  'See both cars and live rates',
                  'Airport transfer, hourly hire, or day tour',
                  'Pick date & time on the calendar',
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                    {t}
                  </li>
                ))}
              </motion.ul>
              <motion.button
                variants={stepChild}
                type="button"
                onClick={goNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4"
              >
                Begin <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {step === 'vehicle' && (
            <div className="space-y-8">
              <motion.div variants={stepChild} className="space-y-3">
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                  Step 1 · Fleet
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">Which car?</h2>
              </motion.div>
              <div className="space-y-4">
                {GROUND_FLEET.map((v) => {
                  const selected = vehicleId === v.id;
                  return (
                    <motion.button
                      key={v.id}
                      type="button"
                      variants={stepChild}
                      onClick={() => {
                        setVehicleId(v.id);
                        setSubmitError('');
                      }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.995 }}
                      className={`w-full text-left overflow-hidden border transition-colors ${
                        selected
                          ? 'border-[#C5A880] bg-[#C5A880]/10'
                          : 'border-white/10 bg-[#0C1017] hover:border-white/25'
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-0">
                        <div className="aspect-[16/10] sm:aspect-auto sm:h-full min-h-[140px]">
                          <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5 sm:p-6 space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
                                {v.category}
                              </div>
                              <h3 className="font-serif-luxury text-2xl text-white">{v.name}</h3>
                            </div>
                            {selected && <CheckCircle2 className="w-5 h-5 text-[#C5A880]" />}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{v.description}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1">
                            <span className="inline-flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-[#C5A880]" /> {v.passengers} pax
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Car className="w-3.5 h-3.5 text-[#C5A880]" /> NAIA from {formatMoney(v.transferRateKEF_EUR)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> {formatMoney(v.hourlyRateEUR)}/hr
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 'service' && (
            <div className="space-y-8">
              <motion.div variants={stepChild} className="space-y-3">
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                  Step 2 · Service
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">What do you need?</h2>
              </motion.div>
              <div className="space-y-3">
                {(
                  [
                    {
                      id: 'airport_transfer' as const,
                      title: 'Airport transfer',
                      blurb: `${AIRPORT_TRANSFER.route} · from ${formatMoney(AIRPORT_TRANSFER.fromEUR)} · up to ${AIRPORT_TRANSFER.maxPassengers} passengers`,
                    },
                    {
                      id: 'hourly_hire' as const,
                      title: 'Hourly chauffeur',
                      blurb: `${formatMoney(vehicle.hourlyRateEUR)}/hr · 3 hour minimum`,
                    },
                    {
                      id: 'day_tour' as const,
                      title: 'Private day tour / special',
                      blurb: 'El Nido, Bohol, Tagaytay & Taal, Banaue, Intramuros, wedding',
                    },
                  ] as const
                ).map((s) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    variants={stepChild}
                    onClick={() => setServiceType(s.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.995 }}
                    className={`w-full text-left p-5 border transition-colors ${
                      serviceType === s.id
                        ? 'border-[#C5A880] bg-[#C5A880]/10'
                        : 'border-white/10 bg-[#0C1017] hover:border-white/25'
                    }`}
                  >
                    <div className="font-serif-luxury text-xl text-white">{s.title}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.blurb}</div>
                    {s.id === 'airport_transfer' && (
                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                        {AIRPORT_TRANSFER.description}
                      </p>
                    )}
                  </motion.button>
                ))}
              </div>

              {serviceType === 'hourly_hire' && (
                <motion.div variants={stepChild} className="space-y-2">
                  <label className="text-xs text-slate-400">Hours needed</label>
                  <input
                    type="number"
                    min={3}
                    max={14}
                    value={hoursNeeded}
                    onChange={(e) => setHoursNeeded(Math.max(3, parseInt(e.target.value) || 3))}
                    className="w-32 bg-[#0C1017] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
                  />
                </motion.div>
              )}

              {serviceType === 'day_tour' && (
                <motion.div variants={stepChild} className="space-y-3">
                  <label className="text-xs text-slate-400">Select tour</label>
                  {PRIVATE_TOURS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setTourId(t.id);
                        setSubmitError('');
                      }}
                      className={`w-full text-left p-4 border transition-all ${
                        tourId === t.id
                          ? 'border-[#C5A880] bg-[#C5A880]/10'
                          : 'border-white/10 bg-[#0C1017]'
                      }`}
                    >
                      <div className="flex justify-between gap-3">
                        <div>
                          <span className="text-sm text-white block">{t.title}</span>
                          {t.subtitle && (
                            <span className="text-[11px] text-[#C5A880]">{t.subtitle}</span>
                          )}
                        </div>
                        <span className="text-sm text-[#C5A880] shrink-0">
                          from {formatMoney(t.basePrice, t.currency)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {t.durationHours}h · up to {t.maxPassengers} passengers
                      </p>
                      {t.note && (
                        <p className="text-[11px] text-amber-200/80 mt-1.5">{t.note}</p>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}

              <motion.div variants={stepChild} className="pt-2 text-sm text-slate-300">
                Estimated total:{' '}
                <span className="text-[#C5A880] font-semibold text-lg">{estimateLabel}</span>
              </motion.div>
            </div>
          )}

          {step === 'calendar' && (
            <div className="space-y-8">
              <motion.div variants={stepChild} className="space-y-3">
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                  Step 3 · Schedule
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">Pick a date &amp; time</h2>
              </motion.div>

              <motion.div variants={stepChild} className="border border-white/10 bg-[#0C1017] p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <button
                    type="button"
                    onClick={() => {
                      if (calMonth === 0) {
                        setCalMonth(11);
                        setCalYear((y) => y - 1);
                      } else setCalMonth((m) => m - 1);
                    }}
                    className="p-2 text-slate-400 hover:text-white"
                    aria-label="Previous month"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="inline-flex items-center gap-2 text-white font-serif-luxury text-xl">
                    <CalendarDays className="w-5 h-5 text-[#C5A880]" />
                    {monthLabel}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (calMonth === 11) {
                        setCalMonth(0);
                        setCalYear((y) => y + 1);
                      } else setCalMonth((m) => m + 1);
                    }}
                    className="p-2 text-slate-400 hover:text-white"
                    aria-label="Next month"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] tracking-wider uppercase text-slate-500 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="py-1">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDow }).map((_, i) => (
                    <div key={`e-${i}`} />
                  ))}
                  {Array.from({ length: dim }).map((_, i) => {
                    const day = i + 1;
                    const value = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const disabled = value < todayStr;
                    const selected = date === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          setDate(value);
                          setSubmitError('');
                        }}
                        className={`aspect-square text-sm transition-colors ${
                          disabled
                            ? 'text-slate-700 cursor-not-allowed'
                            : selected
                              ? 'bg-[#C5A880] text-[#080B0E] font-semibold'
                              : 'text-slate-200 hover:bg-white/10'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={stepChild} className="space-y-3">
                <label className="text-xs text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> Pickup time
                </label>
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTime(t);
                        setSubmitError('');
                      }}
                      className={`px-3 py-2 text-xs border transition-colors ${
                        time === t
                          ? 'border-[#C5A880] bg-[#C5A880] text-[#080B0E] font-semibold'
                          : 'border-white/15 text-slate-300 hover:border-white/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-8">
              <motion.div variants={stepChild} className="space-y-3">
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
                  Step 4 · Details
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">Who &amp; where?</h2>
              </motion.div>

              <motion.div variants={stepChild} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Full name *</label>
                    <input
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#0C1017] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Phone</label>
                    <input
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#0C1017] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400">Email *</label>
                  <input
                    required
                    type="email"
                    value={guestEmail}
                    onChange={(e) => {
                      setGuestEmail(e.target.value);
                      setSubmitError('');
                    }}
                    className="w-full bg-[#0C1017] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400 inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> Pickup *
                  </label>
                  <input
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-[#0C1017] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400">Drop-off *</label>
                  <input
                    required
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full bg-[#0C1017] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400">Passengers</label>
                  <input
                    type="number"
                    min={1}
                    max={maxPassengers}
                    value={Math.min(passengers, maxPassengers)}
                    onChange={(e) =>
                      setPassengers(Math.min(maxPassengers, Math.max(1, parseInt(e.target.value) || 1)))
                    }
                    className="w-28 bg-[#0C1017] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-400">Notes</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Flight number, child seats, special requests…"
                    className="w-full bg-[#0C1017] border border-white/15 px-3 py-2.5 text-white outline-none focus:border-[#C5A880] resize-none"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={stepChild}
                className="border border-white/10 bg-[#0C1017] p-5 space-y-2 text-xs text-slate-400"
              >
                <div className="flex justify-between">
                  <span>Vehicle</span>
                  <span className="text-white">{vehicle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>When</span>
                  <span className="text-white">
                    {date} · {time}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-white/10">
                  <span className="text-slate-300">Estimated total</span>
                  <span className="text-[#C5A880] font-semibold">{estimateLabel}</span>
                </div>
              </motion.div>

              {submitError && (
                <motion.div
                  variants={stepChild}
                  className="border border-red-500/35 bg-red-950/35 px-4 py-3 text-xs text-red-300 leading-relaxed"
                >
                  {submitError}
                </motion.div>
              )}
            </div>
          )}

          {step === 'confirm' && (
            <div className="text-center space-y-6 py-8">
              <motion.div
                variants={stepChild}
                className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: easeLuxury, delay: 0.15 }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </motion.div>
              <motion.h2 variants={stepChild} className="font-serif-luxury text-3xl sm:text-4xl text-white">
                Request received
              </motion.h2>
              <motion.p
                variants={stepChild}
                className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed"
              >
                Reference <strong className="text-[#C5A880] font-mono">{refId}</strong>. Our concierge
                will confirm availability and final pricing shortly.
              </motion.p>
              <motion.div variants={stepChild} className="text-xs text-slate-500 space-y-1">
                <p>
                  {vehicle.name} · {date} at {time}
                </p>
                <p>Estimate {estimateLabel}</p>
              </motion.div>
              <motion.button
                variants={stepChild}
                type="button"
                onClick={onComplete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-3.5"
              >
                Done
              </motion.button>
            </div>
          )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {step !== 'welcome' && step !== 'confirm' && (
          <motion.div
            key={`footer-${step}`}
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: easeLuxury, delay: 0.15 }}
            className="sticky bottom-0 border-t border-white/10 bg-[#080B0E]/95 backdrop-blur px-6 sm:px-10 py-4"
          >
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500 hidden sm:block">
                {step === 'details' ? (
                  <>
                    Estimate <span className="text-[#C5A880] font-semibold">{estimateLabel}</span>
                  </>
                ) : (
                  vehicle.name
                )}
              </div>
              <button
                type="button"
                disabled={!canContinue() || submitting}
                onClick={() => (step === 'details' ? submit() : goNext())}
                className="ml-auto inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] disabled:opacity-40 disabled:cursor-not-allowed text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3.5"
              >
                {step === 'details'
                  ? submitting
                    ? 'Submitting…'
                    : 'Submit booking'
                  : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
