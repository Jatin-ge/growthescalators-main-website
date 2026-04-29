import { NextResponse } from 'next/server'

/**
 * POST /api/lead
 *
 * Receives form submissions from <LeadForm /> on every industry landing page.
 * Delivers the lead via up to two optional channels (email via Resend,
 * generic webhook) and falls back to a server log if neither is configured.
 *
 * Env vars (all optional — see CLAUDE.md for full setup notes):
 *   RESEND_API_KEY         — if set, sends an email via Resend's REST API.
 *   LEAD_NOTIFY_EMAIL      — recipient address (default: Info@growthescalators.com).
 *   LEAD_FROM_EMAIL        — from address (default: onboarding@resend.dev).
 *   LEAD_WEBHOOK_URL       — if set, POSTs the lead body as JSON to this URL.
 *
 * Rate limit: 5 requests per IP per minute (in-memory; resets on cold start).
 * Defensible against trivial form spam without adding a Redis dep.
 */

export const runtime = 'nodejs'

interface LeadPayload {
  name?: string
  email?: string
  phone?: string
  clinic?: string         // doctors / healthcare
  specialization?: string
  city?: string
  budget?: string
  message?: string
  /** Set by the form so server-side knows which industry the lead came from */
  source?: string
}

/* ── Hand-rolled validation. No Zod dep. ─────────────────────────────── */
function validate(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Body must be a JSON object' }
  const b = body as Record<string, unknown>
  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

  const name = str(b.name)
  const email = str(b.email)
  const phone = str(b.phone)

  if (!name)  return { ok: false, error: 'Name is required' }
  if (!email) return { ok: false, error: 'Email is required' }
  if (!phone) return { ok: false, error: 'Phone is required' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Email looks invalid' }
  if (name.length > 200 || email.length > 200 || phone.length > 50) {
    return { ok: false, error: 'Field too long' }
  }

  return {
    ok: true,
    data: {
      name, email, phone,
      clinic:         str(b.clinic),
      specialization: str(b.specialization),
      city:           str(b.city),
      budget:         str(b.budget),
      message:        str(b.message).slice(0, 4000),
      source:         str(b.source) || 'unknown',
    },
  }
}

/* ── Rate limit: 5 req/min/IP. In-memory; per-instance. ──────────────── */
const RATE_WINDOW_MS = 60_000
const RATE_LIMIT = 5
const ipBuckets = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (ipBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (arr.length >= RATE_LIMIT) {
    ipBuckets.set(ip, arr)
    return true
  }
  arr.push(now)
  ipBuckets.set(ip, arr)
  return false
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

/* ── Delivery channels ───────────────────────────────────────────────── */

async function sendViaResend(lead: LeadPayload): Promise<{ ok: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, reason: 'no-key' }

  const to = process.env.LEAD_NOTIFY_EMAIL || 'Info@growthescalators.com'
  const from = process.env.LEAD_FROM_EMAIL || 'Growth Escalators <onboarding@resend.dev>'

  const subject = `New ${lead.source || 'website'} lead: ${lead.name}`
  const lines = [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    lead.clinic         && `Practice / Business: ${lead.clinic}`,
    lead.specialization && `Specialization / Type: ${lead.specialization}`,
    lead.city           && `City: ${lead.city}`,
    lead.budget         && `Monthly marketing spend: ${lead.budget}`,
    `Source: ${lead.source}`,
    '',
    'Message:',
    lead.message || '(blank)',
  ].filter(Boolean) as string[]

  const html = lines.map((l) => `<p>${l.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>`).join('')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from, to, subject,
        text: lines.join('\n'),
        html,
        reply_to: lead.email,
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      return { ok: false, reason: `resend-${res.status}: ${detail.slice(0, 200)}` }
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, reason: `resend-throw: ${(e as Error).message}` }
  }
}

async function sendViaWebhook(lead: LeadPayload): Promise<{ ok: boolean; reason?: string }> {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) return { ok: false, reason: 'no-url' }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
    })
    if (!res.ok) return { ok: false, reason: `webhook-${res.status}` }
    return { ok: true }
  } catch (e) {
    return { ok: false, reason: `webhook-throw: ${(e as Error).message}` }
  }
}

/* ── Handler ─────────────────────────────────────────────────────────── */

export async function POST(req: Request) {
  const ip = clientIp(req)
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests, please try again shortly' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const v = validate(body)
  if (!v.ok) return NextResponse.json({ error: v.error }, { status: 400 })

  const [resendResult, webhookResult] = await Promise.all([
    sendViaResend(v.data),
    sendViaWebhook(v.data),
  ])

  // Always log the lead so it's recoverable from server logs even if both
  // delivery channels failed. Format kept stable on purpose so future log
  // grepping stays predictable.
  console.log(
    '[lead]',
    JSON.stringify({
      receivedAt: new Date().toISOString(),
      ip,
      lead: v.data,
      resend: resendResult,
      webhook: webhookResult,
    }),
  )

  // Soft-success policy: as long as we received and logged the lead, return
  // 200 to the user. Email/webhook failures are operational issues, not user
  // failures — the lead isn't lost (we have the server log + the form
  // doesn't visibly break for the prospect).
  return NextResponse.json({ ok: true })
}
