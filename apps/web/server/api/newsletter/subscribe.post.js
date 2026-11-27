import { allowAttempt, createToken, newsletterConfig, normalizeEmail, resendRequest } from '../../utils/newsletter.js'

export default defineEventHandler(async event => {
  const config = newsletterConfig()
  if (!config.enabled) throw createError({ statusCode: 503, statusMessage: 'Inscriptions bientôt ouvertes' })
  const body = await readBody(event).catch(() => null)
  // Champ piège invisible : un robot qui le remplit reçoit une réponse normale, sans envoi.
  if (body?.website) return { ok: true }
  const email = normalizeEmail(body?.email)
  if (!email) throw createError({ statusCode: 400, statusMessage: 'Adresse e-mail invalide' })
  if (body?.consent !== true) throw createError({ statusCode: 400, statusMessage: 'Consentement requis' })
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'inconnue'
  if (!allowAttempt(ip)) throw createError({ statusCode: 429, statusMessage: 'Trop de demandes, réessayez plus tard' })

  const siteUrl = useRuntimeConfig().public.siteUrl
  const confirmUrl = new URL('/api/newsletter/confirm', siteUrl)
  confirmUrl.searchParams.set('token', createToken(email, config.secret))
  try {
    await resendRequest('/emails', {
      from: config.from,
      to: [email],
      subject: 'Confirmez votre inscription à la newsletter DomoKlub',
      html: `<p>Bonjour,</p><p>Vous avez demandé à recevoir la newsletter DomoKlub : nouveaux guides, comparatifs et retours d’usage sur Home Assistant et Zigbee.</p><p><a href="${confirmUrl}">Confirmer mon inscription</a></p><p>Ce lien est valable 7 jours. Si vous n’êtes pas à l’origine de cette demande, ignorez ce message : aucune inscription ne sera enregistrée.</p><p>— Gérald, DomoKlub</p>`,
      text: `Confirmez votre inscription à la newsletter DomoKlub : ${confirmUrl}\n\nLien valable 7 jours. Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.`
    }, config)
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Envoi impossible pour le moment' })
  }
  return { ok: true }
})
