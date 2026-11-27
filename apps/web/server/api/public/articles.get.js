import { articleTypes, getArticles } from '../../utils/content.js'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const type = String(query.type || '')
  if (type && !articleTypes.has(type)) throw createError({ statusCode: 400, statusMessage: 'Type de contenu invalide' })
  const topic = String(query.topic || '')
  if (topic && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic)) throw createError({ statusCode: 400, statusMessage: 'Thème invalide' })
  const page = Math.max(1, Math.min(1000, Number.parseInt(query.page, 10) || 1))
  const pageSize = Math.max(1, Math.min(50, Number.parseInt(query.pageSize, 10) || 12))
  return getArticles({ type, topic, page, pageSize })
})
