import { searchProducts } from '../../utils/content.js'

export default defineEventHandler(async event => {
  const { q, category } = getQuery(event)
  const query = String(q || '').trim()
  const selectedCategory = String(category || '').trim()
  if (query.length > 80 || (selectedCategory && !/^[\p{L}\p{N} -]{1,100}$/u.test(selectedCategory))) throw createError({ statusCode: 400, statusMessage: 'Recherche invalide' })
  return { items: await searchProducts(query, selectedCategory) }
})
