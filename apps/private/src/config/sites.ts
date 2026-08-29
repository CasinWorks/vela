/**
 * Sibling site URLs across the Vela ecosystem.
 * Production values come from .env.production / Vercel env vars.
 * Parent is always vela.casinworks.com — private.casinworks.com does not exist.
 */
const PROD = {
  parent: 'https://vela.casinworks.com',
  aviation: 'https://aviation.casinworks.com',
  concierge: 'https://concierge.casinworks.com',
} as const;

function siteUrl(env: string | undefined, devFallback: string, prodFallback: string) {
  const raw = (env || (import.meta.env.PROD ? prodFallback : devFallback)).replace(/\/$/, '');
  return raw.replace('://private.casinworks.com', '://vela.casinworks.com');
}

export const SITES = {
  parent: siteUrl(import.meta.env.VITE_PARENT_URL, 'http://localhost:3000', PROD.parent),
  aviation: siteUrl(import.meta.env.VITE_AVIATION_URL, 'http://localhost:3001', PROD.aviation),
  concierge: siteUrl(import.meta.env.VITE_CONCIERGE_URL, 'http://localhost:3002', PROD.concierge),
} as const;

export const SIBLING = {
  parentHome: SITES.parent,
  aviationHome: SITES.aviation,
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
