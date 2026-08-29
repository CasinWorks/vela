import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

type BookingPayload = {
  id: string;
  serviceType: string;
  vehicleName: string;
  tourTitle?: string;
  date: string;
  time: string;
  hoursNeeded: number;
  passengers: number;
  pickup: string;
  dropoff: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes?: string;
  estimatedAmount: number;
  estimateCurrency: 'EUR' | 'PHP' | 'ISK';
};

function parseRecipients(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
}

function formatEstimate(amount: number, currency: 'EUR' | 'PHP' | 'ISK') {
  if (currency === 'PHP') return `₱${amount.toLocaleString('en-PH')}`;
  if (currency === 'ISK') return `${amount.toLocaleString('is-IS')} ISK`;
  return `€${amount.toLocaleString()}`;
}

function serviceLabel(serviceType: string, tourTitle?: string) {
  if (serviceType === 'day_tour') return tourTitle ? `Day tour — ${tourTitle}` : 'Day tour';
  if (serviceType === 'hourly_hire') return 'Hourly hire';
  if (serviceType === 'airport_transfer') return 'Airport transfer';
  return serviceType;
}

function detailsHtml(b: BookingPayload) {
  const rows: [string, string][] = [
    ['Reference', b.id],
    ['Service', serviceLabel(b.serviceType, b.tourTitle)],
    ['Vehicle', b.vehicleName],
    ['Date', b.date],
    ['Time', b.time],
    ['Passengers', String(b.passengers)],
    ['Pickup', b.pickup],
    ['Drop-off', b.dropoff],
    ['Guest', b.guestName],
    ['Email', b.guestEmail],
    ['Phone', b.guestPhone || '—'],
    ['Estimate', formatEstimate(b.estimatedAmount, b.estimateCurrency)],
  ];
  if (b.serviceType === 'hourly_hire') {
    rows.splice(5, 0, ['Hours', String(b.hoursNeeded)]);
  }
  if (b.notes?.trim()) rows.push(['Notes', b.notes.trim()]);

  return rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#64748b;border-bottom:1px solid #e2e8f0;width:140px;">${label}</td><td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${escapeHtml(value)}</td></tr>`
    )
    .join('');
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapEmail(title: string, intro: string, b: BookingPayload) {
  return `<!DOCTYPE html><html><body style="margin:0;background:#f8fafc;font-family:Georgia,serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border:1px solid #e2e8f0;">
    <div style="padding:24px 28px;background:#080B0E;color:#C5A880;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;">Vela Concierge</div>
    <div style="padding:28px;">
      <h1 style="margin:0 0 12px;font-size:24px;color:#080B0E;">${title}</h1>
      <p style="margin:0 0 24px;color:#475569;font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;">${intro}</p>
      <table style="width:100%;border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">${detailsHtml(b)}</table>
    </div>
  </div>
</body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      ok: false,
      error: 'Email not configured (missing RESEND_API_KEY).',
    });
  }

  const notifyTo = parseRecipients(process.env.BOOKING_NOTIFY_EMAIL);
  if (notifyTo.length === 0) {
    return res.status(503).json({
      ok: false,
      error: 'Email not configured (missing BOOKING_NOTIFY_EMAIL).',
    });
  }

  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'beth.t@example.com';
  const fromName = process.env.BOOKING_FROM_NAME || 'Vela Concierge';
  const from = `${fromName} <${fromEmail}>`;

  const booking = req.body as BookingPayload;
  if (!booking?.id || !booking?.guestEmail || !booking?.guestName) {
    return res.status(400).json({ ok: false, error: 'Invalid booking payload.' });
  }

  const resend = new Resend(apiKey);
  const service = serviceLabel(booking.serviceType, booking.tourTitle);

  try {
    const staff = await resend.emails.send({
      from,
      to: notifyTo,
      replyTo: booking.guestEmail,
      subject: `New booking ${booking.id} — ${booking.guestName}`,
      html: wrapEmail(
        'New booking request',
        `A guest submitted a booking enquiry (${service}). Reply to this email to contact them directly.`,
        booking
      ),
    });

    if (staff.error) {
      return res.status(502).json({ ok: false, error: staff.error.message });
    }

    const guest = await resend.emails.send({
      from,
      to: [booking.guestEmail],
      subject: `We received your request — ${booking.id}`,
      html: wrapEmail(
        'Request received',
        `Thank you, ${escapeHtml(booking.guestName)}. We have received your enquiry and our concierge will confirm availability and final pricing shortly. Your reference is <strong>${escapeHtml(booking.id)}</strong>.`,
        booking
      ),
    });

    if (guest.error) {
      return res.status(502).json({
        ok: false,
        error: guest.error.message,
        staffSent: true,
      });
    }

    return res.status(200).json({
      ok: true,
      staffId: staff.data?.id,
      guestId: guest.data?.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email';
    return res.status(502).json({ ok: false, error: message });
  }
}
