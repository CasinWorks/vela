# Vela — studio concept (CasinWorks)

Three branded sites under one repository. This is a **portfolio concept** for [casinworks.com](https://www.casinworks.com) — not a live operator.

| App | Folder | Dev port | Production |
|-----|--------|----------|------------|
| **Vela Private** (parent portal) | `apps/private` | 3000 | `https://vela.casinworks.com` |
| **Vela Aviation** | `apps/aviation` | 3001 | `https://aviation.casinworks.com` |
| **Vela Concierge** | `apps/concierge` | 3002 | `https://concierge.casinworks.com` |

## Local development

```bash
npm install

npm run dev:private     # http://localhost:3000
npm run dev:aviation    # http://localhost:3001
npm run dev:concierge   # http://localhost:3002
```

Copy `.env.example` to each app (or root) and adjust URLs if needed.

## Vercel (monorepo)

Create **3 Vercel projects** from `CasinWorks/vela`. For each project set **Root Directory**:

| Vercel project | Root Directory | Build command | Output | Domain |
|----------------|----------------|---------------|--------|--------|
| vela-private | `apps/private` | `npm run build` | `dist` | `vela.casinworks.com` |
| vela-aviation | `apps/aviation` | `npm run build` | `dist` | `aviation.casinworks.com` |
| vela-concierge | `apps/concierge` | `npm run build` | `dist` | `concierge.casinworks.com` |

On each project, enable **Include source files outside of the Root Directory** so workspaces install from the repo root.

Set these env vars on **all three** projects:

```
VITE_PARENT_URL=https://vela.casinworks.com
VITE_AVIATION_URL=https://aviation.casinworks.com
VITE_CONCIERGE_URL=https://concierge.casinworks.com
```

### DNS (casinworks.com registrar)

Add CNAME records pointing at Vercel:

| Hostname | Type | Value |
|----------|------|--------|
| `vela` | CNAME | `cname.vercel-dns.com` |
| `aviation` | CNAME | `cname.vercel-dns.com` |
| `concierge` | CNAME | `cname.vercel-dns.com` |

Then attach each hostname in the matching Vercel project (Settings → Domains).

Booking email (`/api/booking-notify`) is optional demo infrastructure. Leave `RESEND_API_KEY` unset unless you want test sends to your own inbox.

## Structure

```
apps/
  private/     Vela Private portal
  aviation/    Vela Aviation
  concierge/   Vela Concierge + story booking + staff RBAC demo
```
