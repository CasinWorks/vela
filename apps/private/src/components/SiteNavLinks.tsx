import React from 'react';
import { SITES } from '../config/sites';

type Variant = 'nav' | 'mobile';

export const SIBLING_NAV = [
  { id: 'nav-link-aviation', href: SITES.aviation, label: 'Aviation' },
  { id: 'nav-link-iceland', href: SITES.concierge, label: 'Concierge' },
] as const;

interface SiteNavLinksProps {
  variant: Variant;
}

const navClass = 'hover:text-[#C5A880] transition-colors cursor-pointer';
const mobileClass =
  'block w-full text-left hover:text-[#C5A880] text-xl tracking-[0.22em] uppercase text-slate-200';

export const SiteNavLinks: React.FC<SiteNavLinksProps> = ({ variant }) => {
  const cls = variant === 'nav' ? navClass : mobileClass;

  return (
    <>
      {SIBLING_NAV.map((link) => (
        <a key={link.id} id={link.id} href={link.href} className={cls}>
          {link.label}
        </a>
      ))}
    </>
  );
};
