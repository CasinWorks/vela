import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { easeLuxury, mobileMenuItem, mobileMenuStagger } from '../lib/motion';

interface MobileNavMenuProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Tailwind visibility class — matches Jets: md:hidden */
  hideFrom?: string;
}

export const MobileNavItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div variants={mobileMenuItem} className={className}>
    {children}
  </motion.div>
);

/** Jets-style mobile menu: full-screen fade + staggered link slide */
export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  open,
  onClose,
  children,
  hideFrom = 'md:hidden',
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: easeLuxury }}
        className={`fixed inset-0 z-40 bg-[#080B0E]/98 backdrop-blur-xl pt-28 px-6 sm:px-10 overflow-y-auto ${hideFrom}`}
      >
        <motion.div
          variants={mobileMenuStagger}
          initial="hidden"
          animate="show"
          className="max-w-lg mx-auto space-y-8 text-sm tracking-[0.22em] uppercase text-slate-200"
        >
          {children}
        </motion.div>
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 -z-10 cursor-default"
          onClick={onClose}
          tabIndex={-1}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

interface MenuToggleProps {
  open: boolean;
  onToggle: () => void;
  className?: string;
  ariaLabel?: string;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({
  open,
  onToggle,
  className = '',
  ariaLabel = 'Menu',
}) => (
  <motion.button
    type="button"
    onClick={onToggle}
    className={className}
    aria-label={ariaLabel}
    whileTap={{ scale: 0.92 }}
    transition={{ duration: 0.2, ease: easeLuxury }}
  >
    <AnimatePresence mode="wait" initial={false}>
      {open ? (
        <motion.span
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25, ease: easeLuxury }}
          className="block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </motion.span>
      ) : (
        <motion.span
          key="open"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.25, ease: easeLuxury }}
          className="block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
);
