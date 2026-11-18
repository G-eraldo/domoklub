import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { launchArticles, launchProducts } from '../apps/web/server/content/launch.js'
import { productImages } from '../apps/web/app/data/productImages.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const serverFile = resolve(root, 'apps/web/.output/server/index.mjs')
const port = await new Promise((resolvePort, reject) => {
  const probe = createServer()
  probe.once('error', reject)
  probe.listen(0, '127.0.0.1', () => {
    const selected = probe.address().port
    probe.close(() => resolvePort(selected))
  })
})
const base = `http://127.0.0.1:${port}`
const server = spawn(process.execPath, [serverFile], {
  cwd: root,
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', NUXT_PUBLIC_SITE_LIVE: 'true' },
  stdio: ['ignore', 'pipe', 'pipe']
})
let serverLog = ''
for (const stream of [server.stdout, server.stderr]) stream.on('data', chunk => { serverLog += chunk.toString().slice(-2000) })

async function ready() {
  for (let attempt = 0; attempt < 40; attempt++) {
    if (server.exitCode !== null) break
    try {
      if ((await fetch(`${base}/api/health`)).ok) return
    } catch { /* server is starting */ }
    await new Promise(resolveWait => setTimeout(resolveWait, 250))
  }
  throw new Error(`Serveur Nuxt indisponible : ${serverLog}`)
}
function tag(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b`, 'gi'))].length
}
function meta(html, name) {
  const element = html.match(new RegExp(`<meta\\s+name="${name}"[^>]*>`, 'i'))?.[0] || ''
  return element.match(/content="([^"]*)"/i)?.[1] || ''
}
async function page(path, expectedStatus = 200) {
  const response = await fetch(`${base}${path}`)
  assert.equal(response.status, expectedStatus, `${path}: code HTTP`)
  return response.text()
}

try {
  await ready()
  const contentPaths = [
    ...launchArticles.filter(item => item.editorialStatus === 'approved').map(item => `/${item.type === 'guide' ? 'guides' : item.type}/${item.slug}`),
    ...launchProducts.filter(item => item.editorialStatus === 'approved').map(item => `/produits/${item.slug}`)
  ]
  for (const path of contentPaths) {
    const html = await page(path)
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || ''
    assert.ok(title.length >= 25 && title.length <= 60, `${path}: title (${title.length})`)
    const description = meta(html, 'description')
    assert.ok(description.length >= 100 && description.length <= 180, `${path}: description (${description.length})`)
    assert.equal(meta(html, 'robots'), 'index,follow', `${path}: robots`)
    assert.ok(html.includes(`href="https://domoklub.fr${path}"`), `${path}: canonical`)
    assert.equal(tag(html, 'h1'), 1, `${path}: un seul H1`)
    const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(match => JSON.parse(match[1]))
    assert.ok(scripts.some(schema => schema['@graph']?.some(entity => entity['@type'] === 'Organization')), `${path}: identité`)
    if (path.startsWith('/guides/')) {
      assert.ok(tag(html, 'table') >= 1, `${path}: tableau de décision`)
      assert.ok(scripts.some(schema => schema['@type'] === 'Article'), `${path}: Article JSON-LD`)
      assert.ok(html.includes('Par <a href="/a-propos"'), `${path}: auteur visible`)
    } else {
      assert.ok(html.includes('/products/'), `${path}: photo produit`)
      assert.ok(html.includes('Lien affilié'), `${path}: signalement affilié`)
      assert.ok(/rel="[^"]*sponsored[^"]*"/i.test(html), `${path}: rel sponsored`)
      const product = launchProducts.find(item => `/produits/${item.slug}` === path)
      const photo = productImages[product.slug]
      assert.ok(photo?.src, `${path}: image mappée`)
      const imageResponse = await fetch(`${base}${photo.src}`)
      assert.equal(imageResponse.status, 200, `${path}: photo servie`)
      assert.ok(imageResponse.headers.get('content-type')?.startsWith('image/'), `${path}: vrai fichier image`)
      if (product.personalReview) {
        assert.ok(html.includes('5/5 · note personnelle'), `${path}: note attribuée`)
        assert.ok(html.includes('Retour d’usage'), `${path}: contexte d’usage`)
        assert.ok(html.includes(product.personalReview.author), `${path}: auteur de la note`)
      } else {
        assert.ok(html.includes('Non testé par DomoKlub'), `${path}: statut documentaire`)
      }
    }
  }
  const sitemap = await page('/sitemap.xml')
  for (const path of contentPaths) {
    assert.ok(sitemap.includes(`<loc>https://domoklub.fr${path}</loc><lastmod>`), `${path}: sitemap et lastmod`)
  }
  assert.ok(!sitemap.includes('/recherche') && !sitemap.includes('/comparer'), 'pages utilitaires hors sitemap')
  for (const path of ['/recherche', '/comparer']) assert.equal(meta(await page(path), 'robots'), 'noindex,follow', `${path}: noindex visible`)
  const robots = await page('/robots.txt')
  assert.ok(robots.includes('Sitemap: https://domoklub.fr/sitemap.xml'), 'robots et sitemap')
  assert.ok(!robots.includes('Disallow: /comparer'), 'comparateur accessible au crawl pour lire noindex')
  await page('/guides/page-inexistante', 404)
  console.log(`SEO SSR valide : ${contentPaths.length} pages de contenu, sitemap, robots et 404.`)
} finally {
  server.kill('SIGTERM')
}
