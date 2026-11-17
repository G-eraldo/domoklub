import { getProduct } from '../../utils/content.js'

export default defineEventHandler(async event => {
  const raw = String(getQuery(event).slugs || '')
  const slugs = raw.split(',').filter(Boolean)
  if (slugs.length < 2 || slugs.length > 4 || new Set(slugs).size !== slugs.length || slugs.some(slug => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
    throw createError({ statusCode: 400, statusMessage: 'Choisissez 2 à 4 produits distincts' })
  }
  const products = await Promise.all(slugs.map(getProduct))
  if (products.some(product => !product)) throw createError({ statusCode: 404, statusMessage: 'Un produit est introuvable' })
  if (products.some(product => !product.category)) throw createError({ statusCode: 400, statusMessage: 'Catégorie de produit non vérifiée' })
  if (new Set(products.map(product => product.category)).size !== 1) throw createError({ statusCode: 400, statusMessage: 'Les produits doivent appartenir à la même catégorie' })
  return { products }
})
