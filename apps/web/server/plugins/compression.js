import { brotliCompressSync, gzipSync, constants } from 'node:zlib'

// Compression des pages HTML rendues côté serveur (Brotli, sinon gzip).
// Le proxy Traefik de Dokploy ne compresse pas par défaut ; un proxy qui compresse
// ignore les réponses déjà encodées, donc ce plugin reste compatible.
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    if (typeof response.body !== 'string' || response.body.length < 1024) return
    // Les pages d'erreur sont rendues par une requête interne (/__nuxt_error) relue en texte par
    // le gestionnaire d'erreurs : les compresser ici corromprait la 404.
    if (event.path?.startsWith('/__nuxt_error')) return
    const accept = String(getRequestHeader(event, 'accept-encoding') || '')
    const headers = response.headers || (response.headers = {})
    if (/\bbr\b/.test(accept)) {
      response.body = brotliCompressSync(Buffer.from(response.body), { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } })
      headers['content-encoding'] = 'br'
    } else if (/\bgzip\b/.test(accept)) {
      response.body = gzipSync(Buffer.from(response.body), { level: 6 })
      headers['content-encoding'] = 'gzip'
    } else {
      return
    }
    headers.vary = 'Accept-Encoding'
    delete headers['content-length']
  })
})
