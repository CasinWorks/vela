/** Shared premium motion presets — luxury easing, restrained motion. */
import type { Transition, Variants } from 'motion/react';

export const easeLuxury = [0.22, 1, 0.36, 1] as const;

export const transitionLuxury: Transition = {
  duration: 0.85,
  ease: easeLuxury,
};

export const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: transitionLuxury,
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-8% 0px' },
  transition: { duration: 1, ease: easeLuxury },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: transitionLuxury,
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: transitionLuxury,
  },
};

export const heroReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: easeLuxury },
  },
};

export const pageSlide: Variants = {
  enter: { opacity: 0, x: 28, filter: 'blur(4px)' },
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: easeLuxury },
  },
  exit: {
    opacity: 0,
    x: -20,
    filter: 'blur(4px)',
    transition: { duration: 0.35, ease: easeLuxury },
  },
};

export const mobileMenuStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

export const mobileMenuItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeLuxury },
  },
};
