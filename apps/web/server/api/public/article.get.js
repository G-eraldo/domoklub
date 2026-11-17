import { articleTypes, getArticle } from '../../utils/content.js'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const slug = String(query.slug || '')
  const type = String(query.type || '')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !articleTypes.has(type)) throw createError({ statusCode: 400, statusMessage: 'Article invalide' })
  const article = await getArticle(slug, type)
  if (!article) throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
  return article
})
