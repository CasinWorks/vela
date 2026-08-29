export type ServiceType = 'airport_transfer' | 'hourly_hire' | 'day_tour';

export interface BookingInquiry {
  id: string;
  createdAt: string;
  status: 'new' | 'confirmed' | 'completed' | 'cancelled';
  serviceType: ServiceType;
  vehicleId: string;
  vehicleName: string;
  tourId?: string;
  tourTitle?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  hoursNeeded: number;
  passengers: number;
  pickup: string;
  dropoff: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes: string;
  /** Numeric estimate in `estimateCurrency` */
  estimatedAmount: number;
  estimateCurrency: 'EUR' | 'PHP' | 'ISK';
  /** @deprecated kept for older localStorage entries */
  estimatedUSD?: number;
}

const STORAGE_KEY = 'vela-concierge-bookings-v1';

export type BookingInput = Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>;

export type AddBookingResult =
  | { ok: true; booking: BookingInquiry }
  | { ok: false; reason: 'duplicate'; existing: BookingInquiry; error: string };

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isActiveStatus(status: BookingInquiry['status']) {
  return status !== 'cancelled';
}

/** Same guest + same slot + same service/vehicle (active inquiries only). */
export function findDuplicateBooking(input: BookingInput): BookingInquiry | null {
  const email = normalizeEmail(input.guestEmail);
  if (!email || !input.date || !input.time) return null;

  return (
    loadBookings().find((b) => {
      if (!isActiveStatus(b.status)) return false;
      if (normalizeEmail(b.guestEmail) !== email) return false;
      if (b.date !== input.date || b.time !== input.time) return false;
      if (b.vehicleId !== input.vehicleId) return false;
      if (b.serviceType !== input.serviceType) return false;
      if (input.serviceType === 'day_tour' && (b.tourId || '') !== (input.tourId || '')) {
        return false;
      }
      return true;
    }) ?? null
  );
}

export function loadBookings(): BookingInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BookingInquiry[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((b) => ({
      ...b,
      estimatedAmount: b.estimatedAmount ?? b.estimatedUSD ?? 0,
      estimateCurrency: b.estimateCurrency ?? 'EUR',
    }));
  } catch {
    return [];
  }
}

export function saveBookings(bookings: BookingInquiry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function addBooking(booking: BookingInput): AddBookingResult {
  const duplicate = findDuplicateBooking(booking);
  if (duplicate) {
    return {
      ok: false,
      reason: 'duplicate',
      existing: duplicate,
      error: `A booking request for this date, time, and vehicle already exists (ref ${duplicate.id}).`,
    };
  }

  const entry: BookingInquiry = {
    ...booking,
    guestEmail: normalizeEmail(booking.guestEmail),
    id: `IL-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  const all = [entry, ...loadBookings()];
  saveBookings(all);
  return { ok: true, booking: entry };
}

export function updateBookingStatus(id: string, status: BookingInquiry['status']) {
  const all = loadBookings().map((b) => (b.id === id ? { ...b, status } : b));
  saveBookings(all);
  return all;
}

export function deleteBooking(id: string) {
  const all = loadBookings().filter((b) => b.id !== id);
  saveBookings(all);
  return all;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/** Build ICS datetime in local as floating time (no Z) for chauffeur jobs in the Philippines. */
function toIcsLocal(date: string, time: string, durationHours = 2) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const start = `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`;
  const endDate = new Date(y, m - 1, d, hh + durationHours, mm);
  const end = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;
  return { start, end };
}

export function bookingToIcs(b: BookingInquiry): string {
  const hours = b.serviceType === 'hourly_hire' ? Math.max(3, b.hoursNeeded) : b.serviceType === 'day_tour' ? 8 : 2;
  const { start, end } = toIcsLocal(b.date, b.time, hours);
  const summary = `Vela Concierge · ${b.vehicleName} · ${b.guestName}`;
  const description = [
    `Ref: ${b.id}`,
    `Service: ${b.serviceType.replace('_', ' ')}`,
    b.tourTitle ? `Tour: ${b.tourTitle}` : null,
    `Guest: ${b.guestName}`,
    `Phone: ${b.guestPhone}`,
    `Email: ${b.guestEmail}`,
    `Passengers: ${b.passengers}`,
    `Pickup: ${b.pickup}`,
    `Drop-off: ${b.dropoff}`,
    b.notes ? `Notes: ${b.notes}` : null,
    `Estimate: ${
      b.estimateCurrency === 'PHP'
        ? `₱${b.estimatedAmount.toLocaleString('en-PH')}`
        : b.estimateCurrency === 'ISK'
          ? `${b.estimatedAmount.toLocaleString('is-IS')} ISK`
          : `€${b.estimatedAmount.toLocaleString()}`
    }`,
  ]
    .filter(Boolean)
    .join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vela Concierge//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${b.id}@concierge.casinworks.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${b.pickup}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcs(b: BookingInquiry) {
  const blob = new Blob([bookingToIcs(b)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vela-concierge-${b.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Google Calendar template URL (opens in browser / app). */
export function googleCalendarUrl(b: BookingInquiry): string {
  const hours = b.serviceType === 'hourly_hire' ? Math.max(3, b.hoursNeeded) : b.serviceType === 'day_tour' ? 8 : 2;
  const { start, end } = toIcsLocal(b.date, b.time, hours);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Vela Concierge · ${b.vehicleName} · ${b.guestName}`,
    dates: `${start}/${end}`,
    details: `Ref ${b.id}\n${b.guestName}\n${b.guestPhone}\n${b.guestEmail}\nPickup: ${b.pickup}\nDrop-off: ${b.dropoff}`,
    location: b.pickup,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Outlook web compose. */
export function outlookCalendarUrl(b: BookingInquiry): string {
  const hours = b.serviceType === 'hourly_hire' ? Math.max(3, b.hoursNeeded) : b.serviceType === 'day_tour' ? 8 : 2;
  const [y, m, d] = b.date.split('-').map(Number);
  const [hh, mm] = b.time.split(':').map(Number);
  const start = new Date(y, m - 1, d, hh, mm);
  const end = new Date(y, m - 1, d, hh + hours, mm);
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: `Vela Concierge · ${b.vehicleName} · ${b.guestName}`,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
    body: `Ref ${b.id}\nGuest: ${b.guestName}\n${b.guestPhone}\n${b.guestEmail}\nPickup: ${b.pickup}\nDrop-off: ${b.dropoff}`,
    location: b.pickup,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}
