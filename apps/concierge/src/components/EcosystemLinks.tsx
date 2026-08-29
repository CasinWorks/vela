import React from 'react';
import { ExternalLink, Plane } from 'lucide-react';
import { SIBLING } from '../config/sites';

type Variant = 'nav' | 'footer' | 'mobile';

interface EcosystemLinksProps {
  variant: Variant;
}

const linkClass = {
  nav: 'hover:text-[#C5A880] transition-colors inline-flex items-center gap-1.5',
  footer: 'block hover:text-[#C5A880] transition-colors',
  mobile: 'block hover:text-[#C5A880]',
};

export const EcosystemLinks: React.FC<EcosystemLinksProps> = ({ variant }) => {
  const cls = linkClass[variant];
  const wrap = variant === 'footer' ? 'flex flex-col gap-2' : undefined;

  const links = (
    <>
      <a href={SIBLING.parentHome} className={cls}>
        Vela Private
        {variant !== 'mobile' && variant !== 'footer' && <ExternalLink className="w-3 h-3 opacity-60" />}
      </a>
      <a href={SIBLING.aviationHome} className={cls}>
        {variant === 'nav' ? (
          <>
            Vela Aviation <Plane className="w-3 h-3 opacity-70" />
          </>
        ) : (
          <>Vela Aviation · Aviation</>
        )}
      </a>
    </>
  );

  if (wrap) return <div className={wrap}>{links}</div>;
  return links;
};
