import { allowAttempt, newsletterConfig, normalizeEmail, resendRequest } from '../../utils/newsletter.js'

export default defineEventHandler(async event => {
  const config = newsletterConfig()
  if (!config.enabled) throw createError({ statusCode: 503, statusMessage: 'Inscriptions bientôt ouvertes' })
  const body = await readBody(event).catch(() => null)
  // Champ piège invisible : un robot qui le remplit reçoit une réponse normale, sans inscription.
  if (body?.website) return { ok: true }
  const email = normalizeEmail(body?.email)
  if (!email) throw createError({ statusCode: 400, statusMessage: 'Adresse e-mail invalide' })
  if (body?.consent !== true) throw createError({ statusCode: 400, statusMessage: 'Consentement requis' })
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'inconnue'
  if (!allowAttempt(ip)) throw createError({ statusCode: 429, statusMessage: 'Trop de demandes, réessayez plus tard' })

  let alreadySubscribed = false
  try {
    await resendRequest('/contacts', {
      email,
      unsubscribed: false,
      ...(config.segmentId ? { segments: [{ id: config.segmentId }] } : {})
    }, config)
  } catch (error) {
    // Un contact déjà présent n'est pas une erreur pour le lecteur ; pas de second e-mail de bienvenue.
    if (![409, 422].includes(error?.response?.status)) throw createError({ statusCode: 502, statusMessage: 'Inscription impossible pour le moment' })
    alreadySubscribed = true
  }
  if (alreadySubscribed) return { ok: true }

  const siteUrl = useRuntimeConfig().public.siteUrl
  const link = path => new URL(path, siteUrl).toString()
  // L'e-mail de bienvenue est un plus : son échec n'annule pas l'inscription.
  await resendRequest('/emails', {
    from: config.from,
    to: [email],
    subject: 'Bienvenue dans la newsletter DomoKlub',
    html: `<p>Bonjour,</p><p>Merci pour votre inscription à la newsletter DomoKlub. Vous recevrez un ou deux e-mails par mois avec les nouveaux guides et mes retours d’usage sur Home Assistant et Zigbee.</p><p>Pour commencer :</p><ul><li><a href="${link('/comparatifs/modules-zigbee-pour-debuter')}">Les modules Zigbee que j’utilise chez moi</a></li><li><a href="${link('/guides/zha-ou-zigbee2mqtt')}">ZHA ou Zigbee2MQTT : lequel choisir ?</a></li><li><a href="${link('/guides/home-assistant-green-raspberry-pi-ou-mini-pc')}">Quelle machine pour Home Assistant ?</a></li></ul><p>Chaque newsletter contient un lien de désinscription. Si vous n’êtes pas à l’origine de cette inscription, écrivez-nous en répondant à ce message et nous vous retirerons de la liste.</p><p>— Gérald, DomoKlub</p>`,
    text: `Merci pour votre inscription à la newsletter DomoKlub.\n\nPour commencer : ${link('/comparatifs/modules-zigbee-pour-debuter')}\n\nChaque newsletter contient un lien de désinscription.`
  }, config).catch(() => null)
  return { ok: true }
})
