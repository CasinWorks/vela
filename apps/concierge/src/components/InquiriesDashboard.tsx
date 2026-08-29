import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  Check,
  Download,
  ExternalLink,
  LogOut,
  Mail,
  Phone,
  Trash2,
} from 'lucide-react';
import {
  deleteBooking,
  downloadIcs,
  googleCalendarUrl,
  loadBookings,
  outlookCalendarUrl,
  updateBookingStatus,
  type BookingInquiry,
} from '../lib/bookings';
import { formatMoney } from '../data/fleet';
import { hasPermission, roleLabel, type AuthSession } from '../lib/auth';

interface InquiriesDashboardProps {
  session: AuthSession;
  onBack: () => void;
  onLogout: () => void;
}

function formatEstimate(b: BookingInquiry) {
  return formatMoney(b.estimatedAmount ?? b.estimatedUSD ?? 0, b.estimateCurrency ?? 'EUR');
}

export const InquiriesDashboard: React.FC<InquiriesDashboardProps> = ({
  session,
  onBack,
  onLogout,
}) => {
  const [bookings, setBookings] = useState<BookingInquiry[]>(() => loadBookings());
  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const canUpdate = hasPermission(session.role, 'inquiries:update_status');
  const canExport = hasPermission(session.role, 'inquiries:export_calendar');
  const canDelete = hasPermission(session.role, 'inquiries:delete');

  const refresh = () => setBookings(loadBookings());

  const byDate = useMemo(() => {
    const map = new Map<string, BookingInquiry[]>();
    for (const b of bookings) {
      const list = map.get(b.date) || [];
      list.push(b);
      map.set(b.date, list);
    }
    return map;
  }, [bookings]);

  const monthLabel = new Date(calYear, calMonth, 1).toLocaleString('en', {
    month: 'long',
    year: 'numeric',
  });
  const firstDow = new Date(calYear, calMonth, 1).getDay();
  const dim = new Date(calYear, calMonth + 1, 0).getDate();

  const list = selectedDate
    ? bookings.filter((b) => b.date === selectedDate)
    : bookings;

  const selected = bookings.find((b) => b.id === selectedId) || list[0] || null;

  const setStatus = (id: string, status: BookingInquiry['status']) => {
    if (!canUpdate) return;
    setBookings(updateBookingStatus(id, status));
  };

  const remove = (id: string) => {
    if (!canDelete) return;
    if (!window.confirm('Delete this inquiry permanently?')) return;
    setBookings(deleteBooking(id));
    setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-[#080B0E] text-slate-200 pt-24 pb-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-3">
            <button
              onClick={onBack}
              className="text-[11px] tracking-[0.22em] uppercase text-slate-500 hover:text-[#C5A880] inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Site home
            </button>
            <span className="block text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C5A880]">
              Staff · {roleLabel(session.role)} access
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-white">
              Booking inquiries
            </h1>
            <p className="text-sm text-slate-500 max-w-lg">
              Signed in as {session.name} ({session.email}). Actions respect your role permissions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={refresh}
              className="text-xs tracking-wider uppercase border border-white/20 px-4 py-2 hover:border-[#C5A880] text-slate-300"
            >
              Refresh
            </button>
            <button
              onClick={onLogout}
              className="text-xs tracking-wider uppercase border border-white/20 px-4 py-2 hover:border-red-400/50 text-slate-300 inline-flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 border border-white/10 bg-[#0C1017] p-5 sm:p-6 h-fit">
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
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="font-serif-luxury text-xl text-white">{monthLabel}</h2>
              <button
                type="button"
                onClick={() => {
                  if (calMonth === 11) {
                    setCalMonth(0);
                    setCalYear((y) => y + 1);
                  } else setCalMonth((m) => m + 1);
                }}
                className="p-2 text-slate-400 hover:text-white"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-slate-500 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={`${d}-${i}`} className="py-1">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDow }).map((_, i) => (
                <div key={`pad-${i}`} />
              ))}
              {Array.from({ length: dim }).map((_, i) => {
                const day = i + 1;
                const value = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const count = byDate.get(value)?.length || 0;
                const active = selectedDate === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setSelectedDate(active ? null : value);
                      setSelectedId(null);
                    }}
                    className={`relative aspect-square text-sm transition-colors ${
                      active
                        ? 'bg-[#C5A880] text-[#080B0E] font-semibold'
                        : count
                          ? 'bg-[#C5A880]/15 text-white hover:bg-[#C5A880]/25'
                          : 'text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    {day}
                    {count > 0 && (
                      <span
                        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                          active ? 'bg-[#080B0E]' : 'bg-[#C5A880]'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="mt-4 text-[11px] text-slate-500 hover:text-[#C5A880]"
            >
              Show all inquiries ({bookings.length})
            </button>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {list.length === 0 ? (
              <div className="border border-dashed border-white/15 p-10 text-center text-sm text-slate-500">
                No booking inquiries yet. When guests complete the story booking flow, they appear
                here.
              </div>
            ) : (
              <>
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {list.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedId(b.id)}
                      className={`w-full text-left p-4 border transition-colors ${
                        selected?.id === b.id
                          ? 'border-[#C5A880] bg-[#C5A880]/10'
                          : 'border-white/10 bg-[#0C1017] hover:border-white/25'
                      }`}
                    >
                      <div className="flex justify-between gap-3 text-xs">
                        <span className="font-mono text-[#C5A880]">{b.id}</span>
                        <span className="uppercase tracking-wider text-slate-500">{b.status}</span>
                      </div>
                      <div className="text-sm text-white mt-1">
                        {b.guestName} · {b.vehicleName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {b.date} at {b.time} · {formatEstimate(b)}
                      </div>
                    </button>
                  ))}
                </div>

                {selected && (
                  <div className="border border-white/10 bg-[#0C1017] p-6 space-y-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
                          Inquiry detail
                        </div>
                        <h3 className="font-serif-luxury text-2xl text-white mt-1">
                          {selected.guestName}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono mt-1">{selected.id}</p>
                      </div>
                      {canUpdate ? (
                        <div className="flex flex-wrap gap-2">
                          {(['new', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setStatus(selected.id, s)}
                              className={`text-[10px] uppercase tracking-wider px-2.5 py-1 border ${
                                selected.status === s
                                  ? 'border-[#C5A880] text-[#C5A880]'
                                  : 'border-white/15 text-slate-500 hover:border-white/30'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 border border-white/10 px-2.5 py-1">
                          Status: {selected.status}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-slate-500 mb-1">Vehicle / service</div>
                        <div className="text-white">
                          {selected.vehicleName}
                          <br />
                          <span className="text-slate-400">
                            {selected.serviceType.replace('_', ' ')}
                            {selected.tourTitle ? ` · ${selected.tourTitle}` : ''}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Schedule</div>
                        <div className="text-white">
                          {selected.date} at {selected.time}
                          <br />
                          <span className="text-slate-400">
                            {selected.passengers} passengers · {formatEstimate(selected)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Pickup</div>
                        <div className="text-white">{selected.pickup}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Drop-off</div>
                        <div className="text-white">{selected.dropoff}</div>
                      </div>
                      <div className="sm:col-span-2 flex flex-wrap gap-4">
                        <a
                          href={`mailto:${selected.guestEmail}`}
                          className="inline-flex items-center gap-1.5 text-[#C5A880] hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" /> {selected.guestEmail}
                        </a>
                        {selected.guestPhone && (
                          <a
                            href={`tel:${selected.guestPhone}`}
                            className="inline-flex items-center gap-1.5 text-[#C5A880] hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5" /> {selected.guestPhone}
                          </a>
                        )}
                      </div>
                      {selected.notes && (
                        <div className="sm:col-span-2">
                          <div className="text-slate-500 mb-1">Notes</div>
                          <div className="text-slate-300">{selected.notes}</div>
                        </div>
                      )}
                    </div>

                    {canExport && (
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <div className="text-[11px] tracking-[0.2em] uppercase text-slate-500 flex items-center gap-2">
                          <CalendarPlus className="w-3.5 h-3.5 text-[#C5A880]" />
                          Add to your calendar
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => downloadIcs(selected)}
                            className="inline-flex items-center gap-2 bg-[#C5A880] text-[#080B0E] text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download .ics
                          </button>
                          <a
                            href={googleCalendarUrl(selected)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 border border-white/20 text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 text-slate-200 hover:border-[#C5A880]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Google Calendar
                          </a>
                          <a
                            href={outlookCalendarUrl(selected)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 border border-white/20 text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 text-slate-200 hover:border-[#C5A880]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Outlook
                          </a>
                        </div>
                        {selected.status === 'confirmed' && (
                          <p className="text-[11px] text-[#C5A880] inline-flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" /> Marked confirmed
                          </p>
                        )}
                      </div>
                    )}

                    {canDelete && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => remove(selected.id)}
                          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-red-400/80 hover:text-red-300 border border-red-500/20 px-3 py-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete inquiry
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
