import React from 'react';
import { Currency } from '../../types';
import { CURRENCY_RATES, GROUND_FLEET, BOOKING_ADDONS } from '../../data/mockData';
import { 
  CheckCircle, 
  X, 
  Download, 
  Calendar as CalendarIcon, 
  Car, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Share2,
  Printer
} from 'lucide-react';

interface BookingSuccessModalProps {
  bookingData: any;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  bookingData,
  currency,
  isOpen,
  onClose
}) => {
  if (!isOpen || !bookingData) return null;

  const currRate = CURRENCY_RATES[currency];
  const vehicle = GROUND_FLEET.find(v => v.id === bookingData.vehicleId) || GROUND_FLEET[0];
  const convertedTotal = Math.round(bookingData.totalCalculatedUSD * currRate.rate);

  // Generate downloadable calendar (.ics) string
  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vela Private//Vela Concierge Chauffeur//EN
BEGIN:VEVENT
SUMMARY:Vela Private Chauffeur: ${bookingData.pickupAddress} to ${bookingData.dropoffAddress}
DESCRIPTION:Reservation #${bookingData.referenceId} with Vela Concierge. Vehicle: ${vehicle.name}. Lead Passenger: ${bookingData.guestName}.
LOCATION:${bookingData.pickupAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `VELA-Reservation-${bookingData.referenceId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0C1017] border border-[#C5A880]/50 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0E1520] to-[#0A0E15] border-b border-white/10 p-6 sm:p-8 text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880] mb-3">
            <CheckCircle className="w-10 h-10" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A880] block">
            RESERVATION CONFIRMED &amp; DISPATCHED
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white">
            Your Icelandic Chauffeur is Reserved
          </h2>
          <div className="inline-block bg-black/60 border border-[#C5A880]/30 rounded-lg px-4 py-1 mt-2">
            <span className="text-xs text-slate-400 font-mono">Reference Code: </span>
            <span className="text-sm font-bold text-amber-300 font-mono tracking-wider">
              {bookingData.referenceId}
            </span>
          </div>
        </div>

        {/* Modal Content / Voucher Details */}
        <div className="p-6 sm:p-8 space-y-6 text-xs">
          
          {/* Passenger & Vehicle Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Lead VIP Passenger</span>
              <span className="text-sm font-bold text-white block mt-0.5">{bookingData.guestName}</span>
              <span className="text-slate-400 block">{bookingData.guestEmail} • {bookingData.guestPhone}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Assigned Chauffeur Vehicle</span>
              <span className="text-sm font-bold text-[#C5A880] block mt-0.5">{vehicle.name}</span>
              <span className="text-slate-400 block">{vehicle.category} (AWD)</span>
            </div>
          </div>

          {/* Route Details */}
          <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/10">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Pick-up Location</span>
                <span className="text-white font-medium text-xs">{bookingData.pickupAddress}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Drop-off Destination</span>
                <span className="text-white font-medium text-xs">{bookingData.dropoffAddress}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2 border-t border-white/5 text-slate-300">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{bookingData.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{bookingData.time}</span>
              </div>
              {bookingData.flightNumber && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Flight:</span>
                  <span className="text-amber-300 font-mono">{bookingData.flightNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Total & Guarantees */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-black/60 border border-[#C5A880]/30">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
              <div className="text-left">
                <span className="font-semibold text-white block">VIP Protocol &amp; Flight Tracking Active</span>
                <span className="text-[11px] text-slate-400">Driver contact details dispatched via SMS 2 hrs prior.</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase block">Total Inclusive Amount</span>
              <span className="text-lg font-bold text-amber-300 font-sans">
                {currRate.symbol}{convertedTotal.toLocaleString()} {currency}
              </span>
            </div>
          </div>

          {/* Download and Print Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadCalendar}
                className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2.5 rounded border border-white/15 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={handlePrint}
                className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2.5 rounded border border-white/15 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-300" />
                <span>Print Voucher</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded transition-all cursor-pointer"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
