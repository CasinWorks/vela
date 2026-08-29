/**
 * Sibling site URLs across the Vela ecosystem.
 * Production values come from .env.production / Vercel env vars.
 */
function siteUrl(env: string | undefined, fallback: string) {
  return (env || fallback).replace(/\/$/, '');
}

export const SITES = {
  parent: siteUrl(import.meta.env.VITE_PARENT_URL, 'http://localhost:3000'),
  aviation: siteUrl(import.meta.env.VITE_AVIATION_URL, 'http://localhost:3001'),
  concierge: siteUrl(import.meta.env.VITE_CONCIERGE_URL, 'http://localhost:3002'),
} as const;

/** Deep links into sibling sites — swap VITE_* URLs in Vercel to reconfigure. */
export const SIBLING = {
  parentHome: SITES.parent,
  aviationHome: SITES.aviation,
  aviationContact: `${SITES.aviation}#contact`,
  conciergeHome: SITES.concierge,
  conciergeBook: `${SITES.concierge}/#/book`,
  parentBlueprint: `${SITES.parent}#/blueprint`,
} as const;

export const STUDIO = {
  name: 'CasinWorks',
  credit: 'Studio concept · CasinWorks',
  url: 'https://www.casinworks.com',
  site: 'https://www.casinworks.com',
  email: 'studio@casinworks.com',
} as const;
