import type { BookingInquiry } from './bookings';

export type NotifyBookingResult =
  | { ok: true }
  | { ok: false; error: string; skipped?: boolean };

/** POST booking details to the Vercel Resend API. Non-fatal if email is offline. */
export async function notifyBookingByEmail(booking: BookingInquiry): Promise<NotifyBookingResult> {
  try {
    const res = await fetch('/api/booking-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: booking.id,
        serviceType: booking.serviceType,
        vehicleName: booking.vehicleName,
        tourTitle: booking.tourTitle,
        date: booking.date,
        time: booking.time,
        hoursNeeded: booking.hoursNeeded,
        passengers: booking.passengers,
        pickup: booking.pickup,
        dropoff: booking.dropoff,
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        guestPhone: booking.guestPhone,
        notes: booking.notes,
        estimatedAmount: booking.estimatedAmount,
        estimateCurrency: booking.estimateCurrency,
      }),
    });

    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!res.ok || !data?.ok) {
      return {
        ok: false,
        error: data?.error || `Email notify failed (${res.status})`,
        skipped: res.status === 503,
      };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Email notify failed',
    };
  }
}
