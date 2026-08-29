import React from 'react';
import { FileCode, Layers } from 'lucide-react';
import { SIBLING, STUDIO } from '../config/sites';

/** Studio credit for the CasinWorks portfolio concept. */
export const DemoFooterLinks: React.FC = () => (
  <div className="mt-8 pt-6 border-t border-[#C5A880]/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <a
      href={STUDIO.url}
      className="text-[10px] uppercase tracking-[0.22em] text-[#C5A880] font-semibold hover:text-[#d6ba94] transition-colors"
    >
      {STUDIO.credit}
    </a>
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
      <a
        href={SIBLING.parentHome}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#C5A880] transition-colors"
      >
        <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
        Digital Ecosystem
      </a>
      <a
        href={SIBLING.parentBlueprint}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-[#C5A880] transition-colors"
      >
        <FileCode className="w-3.5 h-3.5" />
        Digital Blueprint
      </a>
    </div>
  </div>
);
