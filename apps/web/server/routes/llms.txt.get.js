import { getArticles, getProducts } from '../utils/content.js'

// Sommaire Markdown du site pour les assistants IA (proposition llms.txt), généré depuis les contenus publiés.
export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  const url = path => new URL(path, config.public.siteUrl).toString()
  const [articles, products] = await Promise.all([getArticles({ pageSize: 100 }), getProducts({ pageSize: 100 })])
  const line = (title, path, text) => `- [${title}](${url(path)})${text ? ` : ${text}` : ''}`
  const guides = articles.items.filter(item => item.type === 'guide')
  const comparisons = articles.items.filter(item => item.type === 'comparison')
  return [
    '# DomoKlub',
    '',
    '> Média français sur la maison connectée : Home Assistant, Zigbee et Matter. Guides sourcés, avis d’usage personnels de l’éditeur (Gérald François) et fiches produits avec liens affiliés signalés.',
    '',
    '## Guides',
    ...guides.map(item => line(item.title, `/${item.section}/${item.slug}`, item.excerpt)),
    '',
    '## Comparatifs',
    ...comparisons.map(item => line(item.title, `/${item.section}/${item.slug}`, item.excerpt)),
    '',
    '## Produits',
    ...products.items.map(item => line(item.name, `/produits/${item.slug}`, item.summary)),
    '',
    '## À propos',
    line('Méthodologie', '/methodologie', 'niveaux de preuve et règles de publication'),
    line('Affiliation', '/affiliation', 'liens Domadoo et Amazon, indépendance éditoriale'),
    line('À propos', '/a-propos', 'l’éditeur et son installation'),
    ''
  ].join('\n')
})
