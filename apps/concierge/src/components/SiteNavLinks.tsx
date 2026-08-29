import React from 'react';
import { SIBLING } from '../config/sites';

type Variant = 'nav' | 'footer' | 'mobile';

interface SiteNavLinksProps {
  variant: Variant;
}

const linkClass = {
  nav: 'hover:text-[#C5A880] transition-colors inline-flex items-center gap-1.5',
  footer: 'block hover:text-[#C5A880] transition-colors',
  mobile: 'block w-full text-left hover:text-[#C5A880] text-lg font-serif-luxury tracking-normal normal-case',
};

export const SiteNavLinks: React.FC<SiteNavLinksProps> = ({ variant }) => {
  const cls = linkClass[variant];
  const wrap = variant === 'footer' ? 'flex flex-col gap-2' : undefined;

  const links = (
    <>
      <a href={SIBLING.parentHome} className={cls}>
        Vela Private
      </a>
      <a href={SIBLING.aviationHome} className={cls}>
        Vela Aviation
      </a>
      <span
        className={
          variant === 'nav'
            ? 'text-[#C5A880]'
            : variant === 'mobile'
              ? 'block w-full text-left text-[#C5A880] text-lg font-serif-luxury tracking-normal normal-case'
              : 'text-[#C5A880]'
        }
      >
        Vela Concierge
      </span>
    </>
  );

  if (wrap) return <div className={wrap}>{links}</div>;
  return links;
};
