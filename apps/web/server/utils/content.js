import { launchArticles, launchProducts, launchOffers } from '../content/launch.js'

const articleTypes = new Set(['test', 'guide', 'tutorial', 'comparison', 'deal'])
const sectionByType = { test: 'tests', guide: 'guides', tutorial: 'tutoriels', comparison: 'comparatifs', deal: 'bons-plans' }
const launchProductOrder = ['sonoff-zbdongle-p', 'aqara-g410-select', 'sonoff-snzb-04p', 'sonoff-zbminil2-e', 'sonoff-orb-socket', 'nodon-sin-4-1-20', 'sonoff-mini-zbrbs', 'sonoff-zbmini-r2', 'home-assistant-green', 'home-assistant-connect-zbt-2', 'sonoff-dongle-pp10']

const cleanSlug = value => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value || '')) ? String(value) : ''
function localVisible(item) {
  const live = useRuntimeConfig().public.siteLive
  return item.editorialStatus === 'approved' || (live !== true && live !== 'true' && item.editorialStatus === 'review')
}
function localPage(items, page, pageSize) {
  const total = items.length
  return { data: items.slice((page - 1) * pageSize, page * pageSize), meta: { pagination: { page, pageSize, pageCount: Math.ceil(total / pageSize), total } }, configured: true }
}
function safeSources(items) {
  return Array.isArray(items) ? items.filter(item => item && typeof item.url === 'string' && /^https:\/\//.test(item.url)).slice(0, 30).map(item => ({ label: cleanText(item.label, 120), url: item.url })) : []
}
function safeSlugs(items) {
  return Array.isArray(items) ? items.map(cleanSlug).filter(Boolean).slice(0, 12) : []
}

function cleanText(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function verifiedValues(values, compatibility = false) {
  const display = Object.create(null)
  const sources = Object.create(null)
  if (!values || typeof values !== 'object' || Array.isArray(values)) return { display, sources }
  for (const [rawKey, record] of Object.entries(values).slice(0, 60)) {
    const key = cleanText(rawKey, 80)
    if (!key || !record || typeof record !== 'object' || Array.isArray(record)) continue
    const sourceUrl = cleanText(record.sourceUrl, 1000)
    const checkedAt = cleanText(record.checkedAt, 40)
    let validSource = false
    try { validSource = new URL(sourceUrl).protocol === 'https:' && !Number.isNaN(Date.parse(checkedAt)) } catch { /* invalid source */ }
    if (!validSource) continue
    let value
    if (compatibility) {
      value = record.status === 'confirmed' ? 'Compatible confirmé' : record.status === 'incompatible' ? 'Incompatible confirmé' : null
    } else {
      value = typeof record.value === 'string' ? cleanText(record.value, 250) : typeof record.value === 'number' && Number.isFinite(record.value) ? record.value : null
    }
    if (value === null || value === '') continue
    display[key] = value
    sources[key] = { url: sourceUrl, checkedAt }
  }
  return { display, sources }
}

function asPublicArticle(item, detail = false) {
  if (!articleTypes.has(item.type)) return null
  const article = {
    id: cleanText(item.documentId, 100),
    title: cleanText(item.title, 180),
    seoTitle: cleanText(item.seoTitle, 100),
    slug: cleanText(item.slug, 160),
    type: item.type,
    topic: cleanText(item.topic, 100),
    excerpt: cleanText(item.excerpt, 320),
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    editorialStatus: item.editorialStatus === 'review' ? 'review' : 'approved'
  }
  article.section = sectionByType[article.type]
  if (detail) {
    article.body = cleanText(item.body, 50000)
    article.intro = cleanText(item.intro, 1200)
    article.sections = Array.isArray(item.sections) ? item.sections.slice(0, 16).map(section => ({
      id: cleanSlug(section?.id), title: cleanText(section?.title, 160),
      paragraphs: Array.isArray(section?.paragraphs) ? section.paragraphs.slice(0, 8).map(value => cleanText(value, 2000)).filter(Boolean) : [],
      bullets: Array.isArray(section?.bullets) ? section.bullets.slice(0, 12).map(value => cleanText(value, 400)).filter(Boolean) : []
    })).filter(section => section.id && section.title) : []
    const table = item.decisionTable
    article.decisionTable = table && Array.isArray(table.columns) && Array.isArray(table.rows) ? {
      title: cleanText(table.title, 120),
      columns: table.columns.slice(0, 4).map(value => cleanText(value, 80)),
      rows: table.rows.slice(0, 12).map(row => Array.isArray(row) ? row.slice(0, 4).map(value => cleanText(value, 200)) : [])
    } : null
    article.relatedProducts = safeSlugs(item.relatedProducts)
    article.relatedArticles = safeSlugs(item.relatedArticles)
    article.sources = safeSources(item.sources)
  }
  return article
}

function asPublicProduct(item) {
  const specs = verifiedValues(item.specs)
  const compatibilities = verifiedValues(item.compatibilities, true)
  const experienced = item.evidenceLevel === 'experienced' && item.usageEvidenceApproved === true
  const review = experienced && item.personalReview ? {
    author: cleanText(item.personalReview.author, 100),
    context: cleanText(item.personalReview.context, 500),
    observations: Array.isArray(item.personalReview.observations) ? item.personalReview.observations.slice(0, 5).map(value => cleanText(value, 700)).filter(Boolean) : [],
    caveat: cleanText(item.personalReview.caveat, 500)
  } : null
  return {
    id: cleanText(item.documentId, 100),
    slug: cleanText(item.slug, 160),
    name: cleanText(item.name, 180),
    seoTitle: cleanText(item.seoTitle, 100),
    seoDescription: cleanText(item.seoDescription, 180),
    brand: cleanText(item.brand, 100),
    category: cleanText(item.category, 100),
    summary: cleanText(item.summary, 500),
    evidenceLevel: review ? 'experienced' : 'documentary',
    personalReview: review,
    specs: specs.display,
    specSources: specs.sources,
    compatibilities: compatibilities.display,
    compatibilitySources: compatibilities.sources,
    updatedAt: item.updatedAt || null,
    editorialStatus: item.editorialStatus === 'review' ? 'review' : 'approved',
    buyerNote: cleanText(item.buyerNote, 1000),
    limitations: Array.isArray(item.limitations) ? item.limitations.slice(0, 12).map(value => cleanText(value, 500)).filter(Boolean) : [],
    editorialSections: Array.isArray(item.editorialSections) ? item.editorialSections.slice(0, 8).map(section => ({
      title: cleanText(section?.title, 160),
      paragraphs: Array.isArray(section?.paragraphs) ? section.paragraphs.slice(0, 6).map(value => cleanText(value, 1400)).filter(Boolean) : []
    })).filter(section => section.title && section.paragraphs.length) : [],
    relatedArticles: safeSlugs(item.relatedArticles),
    sources: safeSources(item.sources)
  }
}

async function fetchCmsCollection(collection, { fields, filters = {}, page = 1, pageSize = 24, sort = 'publishedAt:desc' }) {
  const config = useRuntimeConfig()
  if (!config.strapiUrl) return { data: [], meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } }, configured: false }
  const base = new URL(config.strapiUrl)
  if (!['http:', 'https:'].includes(base.protocol)) throw createError({ statusCode: 500, statusMessage: 'Configuration du CMS invalide' })
  const url = new URL(`/api/${collection}`, base)
  url.searchParams.set('status', 'published')
  url.searchParams.set('filters[approvalState][$eq]', 'approved')
  url.searchParams.set('pagination[page]', String(page))
  url.searchParams.set('pagination[pageSize]', String(pageSize))
  url.searchParams.set('sort[0]', sort)
  fields.forEach((field, index) => url.searchParams.set(`fields[${index}]`, field))
  Object.entries(filters).forEach(([key, value]) => url.searchParams.set(`filters[${key}][$eq]`, String(value)))
  try {
    const response = await $fetch(url.toString(), { timeout: 5000, headers: config.strapiToken ? { Authorization: `Bearer ${config.strapiToken}` } : undefined })
    return { data: Array.isArray(response.data) ? response.data : [], meta: response.meta || {}, configured: true }
  } catch {
    throw createError({ statusCode: 503, statusMessage: 'Les contenus sont temporairement indisponibles' })
  }
}

const articleListFields = ['title', 'seoTitle', 'slug', 'type', 'topic', 'excerpt', 'publishedAt', 'updatedAt']
const articleDetailFields = [...articleListFields, 'body', 'sources', 'decisionTable']
const productFields = ['name', 'seoTitle', 'seoDescription', 'slug', 'brand', 'category', 'summary', 'evidenceLevel', 'usageEvidenceApproved', 'specs', 'compatibilities', 'updatedAt']

export async function getArticles({ type, topic, page = 1, pageSize = 12 } = {}) {
  const filters = { ...(type ? { type } : {}), ...(topic ? { topic } : {}) }
  const result = !useRuntimeConfig().strapiUrl
    ? localPage(launchArticles.filter(item => localVisible(item) && (!type || item.type === type) && (!topic || item.topic === topic)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)), page, pageSize)
    : await fetchCmsCollection('articles', { fields: articleListFields, filters, page, pageSize })
  return { items: result.data.map(item => asPublicArticle(item)).filter(item => item?.slug && item.title), pagination: result.meta.pagination || {}, configured: result.configured }
}

export async function getArticle(slug, type) {
  const result = !useRuntimeConfig().strapiUrl
    ? localPage(launchArticles.filter(item => localVisible(item) && item.slug === slug && item.type === type), 1, 1)
    : await fetchCmsCollection('articles', { fields: articleDetailFields, filters: { slug, type }, pageSize: 1 })
  const item = result.data[0]
  return item ? asPublicArticle(item, true) : null
}

export async function getProducts({ page = 1, pageSize = 24 } = {}) {
  const result = !useRuntimeConfig().strapiUrl
    ? localPage(launchProducts.filter(localVisible).sort((a, b) => {
      const first = launchProductOrder.indexOf(a.slug)
      const second = launchProductOrder.indexOf(b.slug)
      return (first < 0 ? 999 : first) - (second < 0 ? 999 : second) || a.name.localeCompare(b.name, 'fr')
    }), page, pageSize)
    : await fetchCmsCollection('products', { fields: productFields, page, pageSize, sort: 'name:asc' })
  return { items: result.data.map(asPublicProduct).filter(item => item.slug && item.name), pagination: result.meta.pagination || {}, configured: result.configured }
}

export async function getProduct(slug) {
  const result = !useRuntimeConfig().strapiUrl
    ? localPage(launchProducts.filter(item => localVisible(item) && item.slug === slug), 1, 1)
    : await fetchCmsCollection('products', { fields: productFields, filters: { slug }, pageSize: 1 })
  return result.data[0] ? asPublicProduct(result.data[0]) : null
}

export async function getOffersForProduct(productDocumentId) {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(productDocumentId)) return []
  const fields = ['merchantName', 'url', 'productDocumentId', 'active', 'checkedAt', 'expiresAt']
  const result = !useRuntimeConfig().strapiUrl
    ? localPage(launchOffers.filter(item => localVisible(item) && item.productDocumentId === productDocumentId && item.active === true), 1, 20)
    : await fetchCmsCollection('offers', { fields, filters: { productDocumentId, active: true }, pageSize: 20, sort: 'checkedAt:desc' })
  const now = Date.now()
  return result.data.flatMap(item => {
    const merchantName = cleanText(item.merchantName, 80)
    const checkedAt = cleanText(item.checkedAt, 40)
    const expiresAt = cleanText(item.expiresAt, 40)
    if (!merchantName || item.active !== true || Number.isNaN(Date.parse(checkedAt)) || Number.isNaN(Date.parse(expiresAt)) || Date.parse(expiresAt) <= now) return []
    try {
      const url = new URL(item.url)
      if (url.protocol !== 'https:' || url.username || url.password) return []
      return [{ merchantName, url: url.toString(), checkedAt, expiresAt }]
    } catch { return [] }
  })
}

export async function searchProducts(query, category = '') {
  const q = cleanText(query, 80)
  if (q.length < 2) return []
  const config = useRuntimeConfig()
  if (!config.strapiUrl) return launchProducts.filter(item => localVisible(item) && (!category || item.category.toLowerCase() === category.toLowerCase()) && `${item.name} ${item.brand} ${item.category}`.toLowerCase().includes(q.toLowerCase())).slice(0, 20).map(asPublicProduct)
  const base = new URL(config.strapiUrl)
  const url = new URL('/api/products', base)
  url.searchParams.set('status', 'published')
  url.searchParams.set('filters[approvalState][$eq]', 'approved')
  url.searchParams.set('filters[$or][0][name][$containsi]', q)
  url.searchParams.set('filters[$or][1][brand][$containsi]', q)
  if (category) url.searchParams.set('filters[category][$eq]', category)
  url.searchParams.set('pagination[pageSize]', '20')
  productFields.forEach((field, index) => url.searchParams.set(`fields[${index}]`, field))
  try {
    const result = await $fetch(url.toString(), { timeout: 5000, headers: config.strapiToken ? { Authorization: `Bearer ${config.strapiToken}` } : undefined })
    return (result.data || []).map(asPublicProduct).filter(item => item.slug && item.name)
  } catch {
    throw createError({ statusCode: 503, statusMessage: 'Recherche de produits indisponible' })
  }
}

export async function searchPublished(query) {
  const q = cleanText(query, 80)
  if (q.length < 2) return { articles: [], products: [] }
  const config = useRuntimeConfig()
  if (!config.strapiUrl) return {
    articles: launchArticles.filter(item => localVisible(item) && `${item.title} ${item.excerpt}`.toLowerCase().includes(q.toLowerCase())).slice(0, 24).map(asPublicArticle),
    products: launchProducts.filter(item => localVisible(item) && `${item.name} ${item.brand}`.toLowerCase().includes(q.toLowerCase())).slice(0, 24).map(asPublicProduct)
  }
  const base = new URL(config.strapiUrl)
  async function search(collection, fields, keys) {
    const url = new URL(`/api/${collection}`, base)
    url.searchParams.set('status', 'published')
    url.searchParams.set('filters[approvalState][$eq]', 'approved')
    url.searchParams.set('pagination[pageSize]', '24')
    fields.forEach((field, index) => url.searchParams.set(`fields[${index}]`, field))
    keys.forEach((key, index) => url.searchParams.set(`filters[$or][${index}][${key}][$containsi]`, q))
    try { return (await $fetch(url.toString(), { timeout: 5000, headers: config.strapiToken ? { Authorization: `Bearer ${config.strapiToken}` } : undefined })).data || [] } catch { throw createError({ statusCode: 503, statusMessage: 'La recherche est temporairement indisponible' }) }
  }
  const [articles, products] = await Promise.all([
    search('articles', articleListFields, ['title', 'excerpt']),
    search('products', productFields, ['name', 'brand'])
  ])
  return { articles: articles.map(item => asPublicArticle(item)).filter(item => item?.slug && item.title), products: products.map(asPublicProduct).filter(item => item.slug && item.name) }
}

export { articleTypes }
