import React from 'react';
import { ActiveDivision } from '../types';
import { SITES } from '../config/sites';
import { ShieldCheck, Plane, Car, Mail, MapPin, Award } from 'lucide-react';
import { DemoFooterLinks } from './DemoFooterLinks';

interface FooterProps {
  goDivision: (division: ActiveDivision) => void;
  onOpenEnquiry: (topic?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ goDivision, onOpenEnquiry }) => {
  return (
    <footer className="bg-[#05070A] border-t border-white/10 text-slate-400 text-sm">
      <div className="site-shell py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="border border-[#C5A880]/50 p-2 rounded bg-black/60">
                <span className="font-display-luxury text-xl font-bold tracking-widest text-white">VELA</span>
              </div>
              <div>
                <span className="font-display-luxury text-lg tracking-[0.2em] font-semibold text-white block">
                  VELA PRIVATE
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">
                  Private Aviation & Luxury Travel
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Two specialist divisions united under one seamless standard of discreet excellence. Connecting private jet aviation, transatlantic aircraft delivery, and bespoke luxury chauffeur journeys across the volcanic landscapes of Iceland.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                100% Confidential VIP Protocol
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded">
                <Award className="w-3.5 h-3.5 text-[#C5A880]" />
                Certified Ground Handler
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-display-luxury text-xs uppercase tracking-widest text-white font-semibold border-b border-white/10 pb-2">
              Our websites
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => goDivision('parent')}
                  className="hover:text-[#C5A880] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  Vela Private Portal
                </button>
              </li>
              <li>
                <a href={SITES.aviation} className="hover:text-[#C5A880] transition-colors flex items-center gap-2">
                  <Plane className="w-3 h-3 text-[#C5A880]" />
                  Vela Aviation
                </a>
              </li>
              <li>
                <a href={SITES.concierge} className="hover:text-[#C5A880] transition-colors flex items-center gap-2">
                  <Car className="w-3 h-3 text-[#C5A880]" />
                  Vela Concierge
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goDivision('about')}
                  className="hover:text-[#C5A880] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  About Us
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-display-luxury text-xs uppercase tracking-widest text-white font-semibold border-b border-white/10 pb-2">
              Specialist Services
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><button type="button" onClick={() => onOpenEnquiry('KEF Airport Transfer')} className="hover:text-white transition-colors">KEF Airport VIP Transfer</button></li>
              <li><button type="button" onClick={() => onOpenEnquiry('FBO Tarmac Escort')} className="hover:text-white transition-colors">Tarmac Airside Escort</button></li>
              <li><button type="button" onClick={() => onOpenEnquiry('Golden Circle Tour')} className="hover:text-white transition-colors">Golden Circle Private Tour</button></li>
              <li><button type="button" onClick={() => onOpenEnquiry('Transatlantic Ferry Flight')} className="hover:text-white transition-colors">Transatlantic Aircraft Ferry</button></li>
              <li><a href={SITES.concierge} className="hover:text-white transition-colors">Chauffeur &amp; Day Tours</a></li>
              <li><a href={SITES.aviation} className="hover:text-white transition-colors">On-Demand Jet Charter</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-display-luxury text-xs uppercase tracking-widest text-white font-semibold border-b border-white/10 pb-2">
              24/7 Operations Hub
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Reykjavík Airport (BIRK) & Keflavík FBO (BIKF), Iceland</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <a href="mailto:studio@casinworks.com" className="text-slate-200 hover:text-[#C5A880]">
                  studio@casinworks.com
                </a>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenEnquiry()}
                  className="w-full bg-white/5 hover:bg-[#C5A880] hover:text-[#080B0E] text-slate-200 text-xs font-semibold py-2 px-3 rounded border border-white/10 transition-all uppercase tracking-wider text-center"
                >
                  Direct VIP Request
                </button>
              </div>
            </div>
          </div>
        </div>

        <DemoFooterLinks goDivision={goDivision} />

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-6">
            <span>© {new Date().getFullYear()} Vela Private. Studio concept by CasinWorks.</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href={SITES.concierge} className="text-slate-400 hover:text-[#C5A880]">concierge.casinworks.com</a>
            <span>•</span>
            <a href={SITES.aviation} className="text-slate-400 hover:text-[#C5A880]">aviation.casinworks.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
