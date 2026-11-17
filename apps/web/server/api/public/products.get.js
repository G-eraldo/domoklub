import { getProducts } from '../../utils/content.js'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const page = Math.max(1, Math.min(1000, Number.parseInt(query.page, 10) || 1))
  return getProducts({ page, pageSize: 24 })
})
