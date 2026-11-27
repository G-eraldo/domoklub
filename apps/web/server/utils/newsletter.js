// Inscription newsletter simple via Resend (https://resend.com/docs/api-reference) :
// contact ajouté directement, puis e-mail de bienvenue.
// Variables : RESEND_API_KEY, NEWSLETTER_FROM, RESEND_SEGMENT_ID (facultatif).
const EMAIL = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]{1,250}\.[a-z]{2,24}$/i

export function newsletterConfig() {
  const apiKey = String(process.env.RESEND_API_KEY || '').trim()
  const from = String(process.env.NEWSLETTER_FROM || '').trim()
  return {
    enabled: Boolean(apiKey && from),
    apiKey, from,
    segmentId: String(process.env.RESEND_SEGMENT_ID || '').trim(),
    apiBase: String(process.env.RESEND_API_URL || 'https://api.resend.com').replace(/\/+$/, '')
  }
}

export function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase()
  return email.length <= 320 && EMAIL.test(email) ? email : ''
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
