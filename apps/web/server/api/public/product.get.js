import { getProduct } from '../../utils/content.js'

export default defineEventHandler(async event => {
  const slug = String(getQuery(event).slug || '')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw createError({ statusCode: 400, statusMessage: 'Produit invalide' })
  const product = await getProduct(slug)
  if (!product) throw createError({ statusCode: 404, statusMessage: 'Produit introuvable' })
  return product
})
