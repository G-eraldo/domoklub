import { createHmac, timingSafeEqual } from 'node:crypto'

// Inscription newsletter en double opt-in via Resend (https://resend.com/docs/api-reference).
// Variables : RESEND_API_KEY, NEWSLETTER_FROM, NEWSLETTER_SECRET, RESEND_SEGMENT_ID (facultatif).
const TOKEN_TTL = 7 * 24 * 60 * 60 * 1000
const EMAIL = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]{1,250}\.[a-z]{2,24}$/i

export function newsletterConfig() {
  const apiKey = String(process.env.RESEND_API_KEY || '').trim()
  const from = String(process.env.NEWSLETTER_FROM || '').trim()
  const secret = String(process.env.NEWSLETTER_SECRET || '').trim()
  return {
    enabled: Boolean(apiKey && from && secret.length >= 32),
    apiKey, from, secret,
    segmentId: String(process.env.RESEND_SEGMENT_ID || '').trim(),
    apiBase: String(process.env.RESEND_API_URL || 'https://api.resend.com').replace(/\/+$/, '')
  }
}

export function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase()
  return email.length <= 320 && EMAIL.test(email) ? email : ''
}

const sign = (payload, secret) => createHmac('sha256', secret).update(payload).digest('base64url')

export function createToken(email, secret, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ e: email, t: now })).toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

export function readToken(token, secret, now = Date.now()) {
  const [payload, signature] = String(token || '').split('.')
  if (!payload || !signature) return null
  const expected = Buffer.from(sign(payload, secret))
  const received = Buffer.from(signature)
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null
  try {
    const { e, t } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    const email = normalizeEmail(e)
    return email && Number.isFinite(t) && now - t >= 0 && now - t <= TOKEN_TTL ? email : null
  } catch { return null }
}

export async function resendRequest(path, body, config) {
  return $fetch(`${config.apiBase}${path}`, {
    method: 'POST',
    timeout: 8000,
    headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json' },
    body
  })
}

// Limite simple en mémoire : 5 demandes par heure et par adresse IP.
const attempts = new Map()
export function allowAttempt(key, now = Date.now()) {
  const recent = (attempts.get(key) || []).filter(time => now - time < 60 * 60 * 1000)
  if (recent.length >= 5) { attempts.set(key, recent); return false }
  recent.push(now)
  attempts.set(key, recent)
  if (attempts.size > 5000) attempts.clear()
  return true
}
