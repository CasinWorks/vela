import React from 'react';
import { Car, ExternalLink } from 'lucide-react';
import { SIBLING } from '../config/sites';

type Variant = 'nav' | 'footer' | 'mobile';

interface EcosystemLinksProps {
  variant: Variant;
}

const linkClass = {
  nav: 'hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5',
  footer: 'inline-flex items-center gap-2 hover:text-[#C5A880] transition-colors',
  mobile: 'block w-full text-left hover:text-[#C5A880] text-xl font-serif-luxury tracking-normal normal-case',
};

export const EcosystemLinks: React.FC<EcosystemLinksProps> = ({ variant }) => {
  const cls = linkClass[variant];
  const wrap = variant === 'footer' ? 'flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2' : undefined;

  const links = (
    <>
      <a href={SIBLING.parentHome} className={cls}>
        Vela Private
        {variant !== 'mobile' && variant !== 'footer' && <ExternalLink className="w-3 h-3 opacity-60" />}
      </a>
      <a href={SIBLING.conciergeBook} className={cls}>
        {variant === 'nav' ? (
          <>
            Chauffeur <Car className="w-3 h-3 opacity-70" />
          </>
        ) : (
          <>Vela Concierge · Chauffeur</>
        )}
      </a>
    </>
  );

  if (wrap) return <div className={wrap}>{links}</div>;
  return links;
};
