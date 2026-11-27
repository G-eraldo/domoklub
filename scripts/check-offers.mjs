import { launchOffers, launchProducts } from '../apps/web/server/content/launch.js'

const now = process.argv[2] ? Date.parse(process.argv[2]) : Date.now()
if (Number.isNaN(now)) {
  console.error('Date de contrôle invalide. Utiliser une date ISO en argument.')
  process.exit(1)
}

const expectedProducts = new Set(launchProducts.filter(product => product.editorialStatus === 'approved').map(product => product.documentId))
const seenProducts = new Set()
const seenUrls = new Set()
const errors = []
const reviewWindow = 30 * 24 * 60 * 60 * 1000

for (const offer of launchOffers) {
  if (!expectedProducts.has(offer.productDocumentId)) errors.push(`Produit inconnu : ${offer.productDocumentId}`)
  const key = `${offer.merchantName}:${offer.productDocumentId}`
  if (seenProducts.has(key)) errors.push(`Offre en double : ${key}`)
  seenProducts.add(key)
  if (offer.editorialStatus !== 'approved' || offer.active !== true) errors.push(`Offre inactive : ${offer.productDocumentId}`)
  if (offer.merchantName === 'Amazon') {
    if (!/^[A-Z0-9]{10}$/.test(offer.asin || '')) errors.push(`ASIN Amazon invalide : ${offer.productDocumentId}`)
    if (seenUrls.has(offer.asin)) errors.push(`ASIN en double : ${offer.productDocumentId}`)
    seenUrls.add(offer.asin)
  } else try {
    const url = new URL(offer.url)
    if (url.protocol !== 'https:' || url.host !== 'www.domadoo.fr' || url.searchParams.get('domid') !== '159') {
      errors.push(`Lien partenaire à vérifier : ${offer.productDocumentId}`)
    }
    if (seenUrls.has(url.toString())) errors.push(`Lien en double : ${offer.productDocumentId}`)
    seenUrls.add(url.toString())
  } catch {
    errors.push(`URL invalide : ${offer.productDocumentId}`)
  }
  if (Number.isNaN(Date.parse(offer.checkedAt))) errors.push(`Date de vérification absente : ${offer.productDocumentId}`)
  const expiresAt = Date.parse(offer.expiresAt)
  if (Number.isNaN(expiresAt) || expiresAt <= now + reviewWindow) {
    errors.push(`Renouveler le contrôle avant expiration : ${offer.productDocumentId} (${offer.expiresAt})`)
  }
}

for (const product of expectedProducts) for (const merchant of ['Domadoo', 'Amazon']) if (!seenProducts.has(`${merchant}:${product}`)) errors.push(`Offre ${merchant} manquante : ${product}`)

if (errors.length) {
  for (const error of errors) console.error(error)
  process.exit(1)
}
console.log(`${launchOffers.length} offres structurées et datées : contrôle OK au ${new Date(now).toISOString().slice(0, 10)}.`)
