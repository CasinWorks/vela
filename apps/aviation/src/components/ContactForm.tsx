import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { CONTACT } from '../data/content';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [sentTo, setSentTo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const payload = {
      name,
      email,
      phone,
      message,
      _subject: `Vela Aviation enquiry from ${name}`,
      _captcha: 'false',
      _template: 'table',
    };

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.formEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      const ok =
        res.ok &&
        (data?.success === true || data?.success === 'true' || data?.success === undefined);

      if (!ok) throw new Error('FormSubmit failed');
      setSentTo(email);
      setStatus('sent');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n');

      window.location.href = `mailto:${CONTACT.formEmail}?subject=${encodeURIComponent(
        `Vela Aviation enquiry from ${name}`
      )}&body=${encodeURIComponent(body)}`;
      setSentTo(email);
      setStatus('sent');
    }
  };

  if (status === 'sent') {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif-luxury text-2xl text-white">Message sent</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          Thank you. We will reply to {sentTo || 'you'} as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-slate-300 font-medium">Full name *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#080B0E] border border-white/15 px-3 py-3 text-white focus:border-[#C5A880] outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-slate-300 font-medium">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-[#080B0E] border border-white/15 px-3 py-3 text-white focus:border-[#C5A880] outline-none"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-slate-300 font-medium">Email *</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#080B0E] border border-white/15 px-3 py-3 text-white focus:border-[#C5A880] outline-none"
        />
      </div>
      <div className="space-y-1">
        <label className="text-slate-300 font-medium">Message *</label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-[#080B0E] border border-white/15 px-3 py-3 text-white focus:border-[#C5A880] outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase py-3.5 transition-all disabled:opacity-60"
      >
        <Send className="w-3.5 h-3.5" />
        {status === 'sending' ? 'Sending…' : 'Send email'}
      </button>
      <p className="text-[11px] text-slate-500 text-center flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <a href={CONTACT.emailHref} className="inline-flex items-center gap-1 hover:text-[#C5A880]">
          <Mail className="w-3 h-3" /> {CONTACT.email}
        </a>
      </p>
    </form>
  );
};
