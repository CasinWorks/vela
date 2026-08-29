import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
  brandLabel?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'General Inquiry',
  brandLabel = '24/7 VIP CONCIERGE',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState(defaultTopic);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setTopic(defaultTopic);
      setSubmitted(false);
    }
  }, [isOpen, defaultTopic]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0C1017] border border-white/15 w-full max-w-lg overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="bg-[#080B0F] border-b border-white/10 p-6">
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C5A880] block">
            {brandLabel}
          </span>
          <h3 className="font-serif-luxury text-2xl text-white mt-1">Direct Concierge Dispatch</h3>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 border border-[#C5A880] flex items-center justify-center mx-auto text-[#C5A880]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif-luxury text-2xl text-white">Inquiry Received</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Our team will contact you at <strong className="text-white">{email || phone}</strong> shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-bold text-xs uppercase tracking-widest px-8 py-3 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Topic *</label>
              <input
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#080B0E] border border-white/15 px-3 py-2.5 text-white focus:border-[#C5A880] outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Full Name *</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#080B0E] border border-white/15 px-3 py-2.5 text-white focus:border-[#C5A880] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#080B0E] border border-white/15 px-3 py-2.5 text-white focus:border-[#C5A880] outline-none"
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
                className="w-full bg-[#080B0E] border border-white/15 px-3 py-2.5 text-white focus:border-[#C5A880] outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#080B0E] border border-white/15 px-3 py-2.5 text-white focus:border-[#C5A880] outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase py-3.5 transition-all"
            >
              Send Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
