import { getArticles, getProducts } from '../utils/content.js'

function xml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  if (config.public.siteLive !== true && config.public.siteLive !== 'true') return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>'

  const paths = new Set(['/', '/methodologie', '/a-propos', '/affiliation'])
  const modified = new Map()
  function addContent(path, updatedAt) {
    paths.add(path)
    if (updatedAt && !Number.isNaN(Date.parse(updatedAt))) modified.set(path, updatedAt)
  }
  const sectionTypes = ['test', 'guide', 'tutorial', 'comparison', 'deal']
  for (const type of sectionTypes) {
    const first = await getArticles({ type, pageSize: 100 })
    if (first.items.length) paths.add(`/${first.items[0].section}`)
    for (const article of first.items) if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) addContent(`/${article.section}/${article.slug}`, article.updatedAt)
    const pageCount = Math.min(first.pagination.pageCount || 1, 10)
    for (let page = 2; page <= pageCount; page++) {
      const result = await getArticles({ type, page, pageSize: 100 })
      for (const article of result.items) if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) addContent(`/${article.section}/${article.slug}`, article.updatedAt)
    }
  }
  const firstProducts = await getProducts({ pageSize: 100 })
  if (firstProducts.items.length) paths.add('/produits')
  for (const product of firstProducts.items) if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug)) addContent(`/produits/${product.slug}`, product.updatedAt)
  const productPages = Math.min(firstProducts.pagination.pageCount || 1, 10)
  for (let page = 2; page <= productPages; page++) {
    const result = await getProducts({ page, pageSize: 100 })
    for (const product of result.items) if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug)) addContent(`/produits/${product.slug}`, product.updatedAt)
  }
  const urls = [...paths].map(path => `<url><loc>${xml(new URL(path, config.public.siteUrl).toString())}</loc>${modified.has(path) ? `<lastmod>${xml(modified.get(path))}</lastmod>` : ''}</url>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`
})
