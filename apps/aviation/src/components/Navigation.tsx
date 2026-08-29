import React, { useEffect, useState } from 'react';
import { SiteNavLinks } from './SiteNavLinks';
import { MenuToggle, MobileNavItem, MobileNavMenu } from './MobileNavMenu';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'specialty', label: 'Our Specialty' },
  { id: 'team', label: 'Our Team' },
] as const;

interface NavigationProps {
  activeView?: 'home' | 'about';
  onGoHome: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeView = 'home',
  onGoHome,
  onOpenAbout,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    if (mobileOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (activeView !== 'home') {
      onGoHome();
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080B0E]/80 backdrop-blur-xl border-b border-white/8 py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onGoHome();
            }}
            className="text-left cursor-pointer group"
          >
            <span className="font-serif-luxury text-2xl sm:text-[1.75rem] font-semibold tracking-[0.18em] text-white leading-none group-hover:text-[#C5A880] transition-colors">
              VELA
            </span>
            <span className="block text-[9px] sm:text-[10px] font-sans tracking-[0.4em] text-[#C5A880] uppercase font-light leading-tight mt-1">
              Aviation
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[11px] tracking-[0.2em] font-medium text-slate-300/90 uppercase">
            {LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#C5A880] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenAbout();
              }}
              className={`relative hover:text-white transition-colors cursor-pointer after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-[#C5A880] after:transition-all after:duration-300 ${
                activeView === 'about' ? 'text-[#C5A880] after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            >
              About
            </button>
            <SiteNavLinks variant="nav" />
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenContact();
              }}
              className="hidden sm:inline-flex bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 transition-colors cursor-pointer"
            >
              Contact
            </button>
            <MenuToggle
              open={mobileOpen}
              onToggle={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-1.5"
              ariaLabel="Menu"
            />
          </div>
        </div>
      </header>

      <MobileNavMenu open={mobileOpen} onClose={() => setMobileOpen(false)} hideFrom="md:hidden">
        {LINKS.map((link) => (
          <MobileNavItem key={link.id}>
            <button
              type="button"
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left hover:text-[#C5A880] text-xl font-serif-luxury tracking-normal normal-case text-slate-200"
            >
              {link.label}
            </button>
          </MobileNavItem>
        ))}
        <MobileNavItem>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenAbout();
            }}
            className="block w-full text-left hover:text-[#C5A880] text-xl font-serif-luxury tracking-normal normal-case text-slate-200"
          >
            About Us
          </button>
        </MobileNavItem>
        <MobileNavItem className="pt-4 border-t border-white/10 space-y-4 text-sm tracking-[0.2em] uppercase">
          <span className="text-[10px] text-[#C5A880] tracking-[0.28em] block mb-2">Our websites</span>
          <SiteNavLinks variant="mobile" />
        </MobileNavItem>
        <MobileNavItem>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenContact();
            }}
            className="inline-flex mt-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold tracking-[0.2em] uppercase px-6 py-3 transition-colors"
          >
            Contact us
          </button>
        </MobileNavItem>
      </MobileNavMenu>
    </>
  );
};
