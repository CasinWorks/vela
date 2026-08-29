import React, { useState, useEffect } from 'react';
import { ActiveDivision } from '../types';
import { SITES } from '../config/sites';
import { SiteNavLinks, SIBLING_NAV } from './SiteNavLinks';
import { MenuToggle, MobileNavItem, MobileNavMenu } from './MobileNavMenu';

interface NavigationProps {
  activeDivision: ActiveDivision;
  goDivision: (division: ActiveDivision) => void;
  onOpenEnquiry: (serviceHint?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeDivision,
  goDivision,
  onOpenEnquiry,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToJourneys = () => {
    setMobileMenuOpen(false);
    if (activeDivision !== 'parent') {
      goDivision('parent');
      setTimeout(() => {
        document.getElementById('journeys-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('journeys-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goPortal = () => {
    setMobileMenuOpen(false);
    goDivision('parent');
  };

  const goAbout = () => {
    setMobileMenuOpen(false);
    goDivision('about');
  };

  const openContact = () => {
    setMobileMenuOpen(false);
    onOpenEnquiry('General Contact');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080B0E]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-4'
            : 'bg-gradient-to-b from-[#080B0E]/90 via-[#080B0E]/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="site-shell flex items-center justify-between">
          <a
            id="brand-logo-button"
            href={SITES.parent}
            onClick={(e) => {
              setMobileMenuOpen(false);
              try {
                const target = new URL(SITES.parent, window.location.href);
                if (target.origin === window.location.origin) {
                  e.preventDefault();
                  goPortal();
                }
              } catch {
                e.preventDefault();
                goPortal();
              }
            }}
            className="text-left group flex items-center space-x-3.5 sm:space-x-4 cursor-pointer focus:outline-none"
          >
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl sm:text-3xl font-semibold tracking-[0.15em] text-white leading-none">
                VELA
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.35em] text-white uppercase font-light leading-tight mt-0.5">
                PRIVATE
              </span>
            </div>
            <div className="h-6 w-px bg-white/20 hidden sm:block" />
            <div className="hidden sm:block">
              <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.22em] text-[#C5A880] uppercase block">
                PRIVATE AVIATION &amp; LUXURY TRAVEL
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-6 xl:space-x-8 text-xs tracking-[0.22em] font-medium text-slate-300 uppercase">
            <SiteNavLinks variant="nav" />
            <button
              id="nav-link-journeys"
              type="button"
              onClick={scrollToJourneys}
              className="hover:text-[#C5A880] transition-colors cursor-pointer"
            >
              Journeys
            </button>
            <button
              id="nav-link-about"
              type="button"
              onClick={goAbout}
              className={`hover:text-[#C5A880] transition-colors cursor-pointer ${
                activeDivision === 'about' ? 'text-[#C5A880]' : ''
              }`}
            >
              About
            </button>
            <button
              id="nav-link-contact"
              type="button"
              onClick={openContact}
              className="hover:text-[#C5A880] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-4 sm:space-x-5">
            <button
              id="nav-enquire-gold-btn"
              type="button"
              onClick={() => onOpenEnquiry('Runway to Road VIP Inquiry')}
              className="hidden sm:inline-flex bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold text-xs tracking-[0.2em] uppercase px-5 sm:px-6 py-2.5 transition-all shadow-md cursor-pointer"
            >
              Enquire
            </button>
            <MenuToggle
              open={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-[#C5A880] p-1.5 transition-colors cursor-pointer focus:outline-none"
              ariaLabel="Menu"
            />
          </div>
        </div>
      </header>

      <MobileNavMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} hideFrom="md:hidden">
        {SIBLING_NAV.map((link) => (
          <MobileNavItem key={link.id}>
            <a
              id={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left hover:text-[#C5A880] text-xl tracking-[0.22em] uppercase text-slate-200"
            >
              {link.label}
            </a>
          </MobileNavItem>
        ))}
        <MobileNavItem>
          <button
            type="button"
            onClick={scrollToJourneys}
            className="block w-full text-left hover:text-[#C5A880] text-xl tracking-[0.22em] uppercase text-slate-200"
          >
            Journeys
          </button>
        </MobileNavItem>
        <MobileNavItem>
          <button
            type="button"
            onClick={goAbout}
            className="block w-full text-left hover:text-[#C5A880] text-xl tracking-[0.22em] uppercase text-slate-200"
          >
            About
          </button>
        </MobileNavItem>
        <MobileNavItem>
          <button
            type="button"
            onClick={openContact}
            className="block w-full text-left hover:text-[#C5A880] text-xl tracking-[0.22em] uppercase text-slate-200"
          >
            Contact
          </button>
        </MobileNavItem>
        <MobileNavItem>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenEnquiry('Runway to Road VIP Inquiry');
            }}
            className="inline-flex mt-2 bg-[#C5A880] hover:bg-[#d6ba94] text-[#080B0E] font-semibold tracking-[0.2em] uppercase px-6 py-3 transition-colors"
          >
            Enquire
          </button>
        </MobileNavItem>
      </MobileNavMenu>
    </>
  );
};
