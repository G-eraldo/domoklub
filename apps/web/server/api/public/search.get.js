import { searchPublished } from '../../utils/content.js'

export default defineEventHandler(async event => {
  const query = String(getQuery(event).q || '').trim()
  if (query.length > 80) throw createError({ statusCode: 400, statusMessage: 'Recherche trop longue' })
  return searchPublished(query)
})
