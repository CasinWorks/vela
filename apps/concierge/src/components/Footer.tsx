import React from 'react';
import { Car, Mail, Lock } from 'lucide-react';
import { SiteNavLinks } from './SiteNavLinks';
import { DemoFooterLinks } from './DemoFooterLinks';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenEnquiry: (topic?: string) => void;
  onOpenStaff: () => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenEnquiry,
  onOpenStaff,
  onOpenAbout,
}) => {
  return (
    <footer className="bg-[#05070A] border-t border-white/10 text-slate-400 text-sm">
      <div className="site-shell py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-[#C5A880]" />
              <div>
                <span className="font-display-luxury text-lg tracking-[0.15em] font-semibold text-white block">
                  VELA CONCIERGE
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
                  Luxury Ground Division
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Private chauffeur, KEF transfers and bespoke Iceland tours — a specialist division of Vela Private.
              Current fleet: Mercedes-Benz GLE and Range Rover.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs">
              <SiteNavLinks variant="footer" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-display-luxury text-xs uppercase tracking-widest text-white font-semibold border-b border-white/10 pb-2">
              Book &amp; contact
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenAbout} className="hover:text-[#C5A880]">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#C5A880]">
                  Story booking
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnquiry('Vela Concierge')} className="hover:text-[#C5A880]">
                  Concierge message
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStaff}
                  className="hover:text-[#C5A880] inline-flex items-center gap-1.5 text-slate-500"
                >
                  <Lock className="w-3 h-3" /> Staff login
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-display-luxury text-xs uppercase tracking-widest text-white font-semibold border-b border-white/10 pb-2">
              Contact
            </h3>
            <a href="mailto:studio@casinworks.com" className="flex items-center gap-2 text-xs hover:text-[#C5A880]">
              <Mail className="w-3.5 h-3.5 text-[#C5A880]" /> studio@casinworks.com
            </a>
          </div>
        </div>

        <DemoFooterLinks />

        <div className="mt-8 pt-6 border-t border-white/10 text-[10px] tracking-wider uppercase text-slate-500 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Vela Concierge · Part of Vela Private</span>
          <span>Confidential VIP Protocol</span>
        </div>
      </div>
    </footer>
  );
};
