import { newsletterConfig, readToken, resendRequest } from '../../utils/newsletter.js'

export default defineEventHandler(async event => {
  const config = newsletterConfig()
  if (!config.enabled) return sendRedirect(event, '/newsletter?statut=indisponible', 302)
  const email = readToken(getQuery(event).token, config.secret)
  if (!email) return sendRedirect(event, '/newsletter?statut=lien-invalide', 302)
  try {
    await resendRequest('/contacts', {
      email,
      unsubscribed: false,
      ...(config.segmentId ? { segments: [{ id: config.segmentId }] } : {})
    }, config)
  } catch (error) {
    // Un contact déjà existant n'est pas une erreur pour le lecteur.
    if (![409, 422].includes(error?.response?.status)) return sendRedirect(event, '/newsletter?statut=erreur', 302)
  }
  return sendRedirect(event, '/newsletter?statut=confirme', 302)
})
