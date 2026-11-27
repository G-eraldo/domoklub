<script setup>
import { sections, canonicalPath, publicRobots, safeJsonLd, breadcrumbJsonLd, defaultOgImage, useAbsoluteUrl } from '~/data/site.js'
import { productImages } from '~/data/productImages.js'

definePageMeta({ layout: 'default' })

const route = useRoute()
const section = sections[String(route.params.section)]
if (!section) throw createError({ statusCode: 404, statusMessage: 'Rubrique introuvable' })
const slug = String(route.params.slug)
const { data: article, pending, error } = await useAsyncData(
  `article-${section.type}-${slug}`,
  () => $fetch('/api/public/article', { query: { type: section.type, slug } })
)
if (error.value?.statusCode === 404) throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })

const paragraphs = computed(() => article.value?.body?.split(/\n\s*\n/).filter(Boolean) || [])
// Libellés et cartes résolus depuis le catalogue : aucun lien interne ne s'affiche avec un slug brut.
const { data: catalog } = await useAsyncData('catalog-all', () => $fetch('/api/public/products'))
const { data: guideList } = await useAsyncData('articles-all', () => $fetch('/api/public/articles', { query: { pageSize: 50 } }))
const articlePath = articleSlug => { const item = guideList.value?.items?.find(entry => entry.slug === articleSlug); return `/${item?.section || 'guides'}/${articleSlug}` }
const relatedProducts = computed(() => (article.value?.relatedProducts || []).map(productSlug => catalog.value?.items?.find(item => item.slug === productSlug)).filter(Boolean))
const articleLabel = relatedSlug => guideList.value?.items?.find(item => item.slug === relatedSlug)?.title || relatedSlug.replaceAll('-', ' ')
const leadImage = computed(() => relatedProducts.value.map(product => productImages[product.slug]).find(image => image && !image.generic))
// Google accepte plusieurs formats d'image pour un article : photo produit carrée + visuel 1200 × 630.
const absoluteUrl = useAbsoluteUrl()
const schemaImages = computed(() => [leadImage.value?.src, defaultOgImage.path].filter(Boolean).map(absoluteUrl))
const approvedRobots = publicRobots()
useSeoMeta({
  title: computed(() => article.value ? (article.value.seoTitle || `${article.value.title} · DomoKlub`) : `${section.title} · DomoKlub`),
  description: computed(() => article.value?.excerpt || section.description),
  ogTitle: computed(() => article.value?.title || section.title),
  ogDescription: computed(() => article.value?.excerpt || section.description),
  ogType: 'article',
  articlePublishedTime: computed(() => article.value?.publishedAt || undefined),
  articleModifiedTime: computed(() => article.value?.updatedAt || undefined),
  robots: computed(() => article.value?.editorialStatus === 'review' ? 'noindex,follow' : approvedRobots)
})
const canonicalUrl = canonicalPath(route.path)
const authorUrl = canonicalPath('/a-propos')
const authorId = canonicalPath('/a-propos#gerald-francois')
const publisherId = canonicalPath('/#organization')
const articleSchema = computed(() => article.value?.editorialStatus === 'approved' && article.value?.publishedAt ? safeJsonLd({
  '@context': 'https://schema.org',
  '@graph': [{
  '@type': 'Article',
  headline: article.value.title,
  image: schemaImages.value,
  inLanguage: 'fr-FR',
  description: article.value.excerpt,
  mainEntityOfPage: canonicalUrl,
  datePublished: article.value.publishedAt,
  dateModified: article.value.updatedAt || article.value.publishedAt,
  author: { '@type': 'Person', '@id': authorId, name: 'Gérald François', url: authorUrl },
  publisher: { '@id': publisherId }
  }, ...(article.value.faq?.length ? [{ '@type': 'FAQPage', mainEntity: article.value.faq.map(entry => ({ '@type': 'Question', name: entry.q, acceptedAnswer: { '@type': 'Answer', text: entry.a } })) }] : []), breadcrumbJsonLd([{ name: 'Accueil', path: '/' }, { name: section.title, path: `/${route.params.section}` }, { name: article.value.title, path: route.path }], absoluteUrl)]
}) : null)
useHead(() => ({ link: [{ rel: 'canonical', href: canonicalUrl }], script: articleSchema.value ? [{ type: 'application/ld+json', innerHTML: articleSchema.value }] : [] }))
</script>

<template>
  <div>
    <header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><NuxtLink :to="`/${route.params.section}`">{{ section.title }}</NuxtLink><span class="separator">/</span><span aria-current="page">{{ article?.title || 'Article' }}</span></nav><span class="eyebrow">{{ section.eyebrow }}</span><h1>{{ article?.title || 'Article' }}</h1><p>{{ article?.excerpt }}</p></div></header>
    <div class="container page-body detail-layout">
      <div v-if="pending" role="status">Chargement de l’article…</div>
      <div v-else-if="error" class="notice" role="alert">Cet article est temporairement indisponible.</div>
      <article v-else-if="article" class="article-content">
        <div v-if="article.editorialStatus === 'review'" class="notice">Brouillon éditorial en prévisualisation. Il doit être relu et approuvé avant l’ouverture à l’indexation.</div>
        <div v-else class="notice">Ce guide contient des liens vers des fiches qui proposent des liens affiliés. Un achat après un clic peut rémunérer DomoKlub. <NuxtLink to="/affiliation">Notre politique d’affiliation</NuxtLink>. Les faits techniques sont sourcés en bas de page.</div>
        <div class="article-meta"><span>Par <NuxtLink to="/a-propos">Gérald François</NuxtLink></span><span v-if="article.publishedAt">Publié le {{ new Date(article.publishedAt).toLocaleDateString('fr-FR') }}</span><span v-if="article.updatedAt">Vérifié le {{ new Date(article.updatedAt).toLocaleDateString('fr-FR') }}</span><span v-if="article.editorialStatus === 'review'">À valider</span></div>
        <p v-if="article.intro" class="lead">{{ article.intro }}</p>
        <section v-if="article.decisionTable?.rows?.length" class="decision-summary" aria-labelledby="decision-heading"><h2 id="decision-heading">{{ article.decisionTable.title }}</h2><div class="comparison-scroll"><table class="comparison-table decision-table"><thead><tr><th v-for="column in article.decisionTable.columns" :key="column" scope="col">{{ column }}</th></tr></thead><tbody><tr v-for="(row, rowIndex) in article.decisionTable.rows" :key="rowIndex"><td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td></tr></tbody></table></div><p class="table-source">Repères tirés des documentations citées en fin de guide. Compatibilité à vérifier pour votre modèle précis.</p></section>
        <nav v-if="article.sections?.length" class="article-toc" aria-label="Sommaire"><strong>Dans ce guide</strong><ol><li v-for="part in article.sections" :key="part.id"><a :href="`#${part.id}`">{{ part.title }}</a></li></ol></nav>
        <div v-if="article.sections?.length" class="prose"><section v-for="part in article.sections" :id="part.id" :key="part.id" class="article-part"><h2>{{ part.title }}</h2><p v-for="(paragraph, index) in part.paragraphs" :key="index">{{ paragraph }}</p><ul v-if="part.bullets?.length"><li v-for="(point, index) in part.bullets" :key="index">{{ point }}</li></ul></section></div>
        <div v-else class="prose"><p v-for="(paragraph, index) in paragraphs" :key="index" class="body-block">{{ paragraph }}</p></div>
        <section v-if="article.faq?.length" class="related-block faq-block" aria-labelledby="faq-heading"><h2 id="faq-heading">Questions fréquentes</h2><div v-for="(entry, index) in article.faq" :key="index" class="faq-item"><h3>{{ entry.q }}</h3><p>{{ entry.a }}</p></div></section>
        <section v-if="relatedProducts.length" class="related-block" aria-labelledby="related-products"><h2 id="related-products">Produits à examiner</h2><p>Chaque fiche précise si elle repose sur un retour d’usage ou sur la documentation, avec ses limites et un lien marchand vérifié.</p><div class="product-grid related-product-grid"><ProductCard v-for="product in relatedProducts" :key="product.slug" :product="product" /></div></section>
        <section v-if="article.relatedArticles?.length" class="related-block" aria-labelledby="related-articles"><h2 id="related-articles">Continuer la lecture</h2><div class="related-links"><NuxtLink v-for="relatedSlug in article.relatedArticles" :key="relatedSlug" :to="articlePath(relatedSlug)">{{ articleLabel(relatedSlug) }} <span aria-hidden="true">↗</span></NuxtLink></div></section>
        <section class="related-block" aria-labelledby="newsletter-inline"><h2 id="newsletter-inline">Recevoir les prochains guides</h2><p>Un ou deux e-mails par mois avec les nouveaux guides et retours d’usage.</p><NewsletterForm compact /></section>
        <section v-if="article.sources?.length" class="sources-block" aria-labelledby="sources-heading"><h2 id="sources-heading">Sources consultées</h2><p>Les faits techniques viennent de ces documentations. Leur contenu peut évoluer.</p><ul><li v-for="source in article.sources" :key="source.url"><a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label || source.url }}</a></li></ul></section>
      </article>
      <aside v-if="article" class="detail-aside"><h2>À propos de cet article</h2><NuxtLink to="/methodologie">Comment nous travaillons</NuxtLink><NuxtLink to="/affiliation">Liens affiliés et indépendance</NuxtLink><NuxtLink :to="`/${route.params.section}`">Retour aux {{ section.title.toLowerCase() }}</NuxtLink></aside>
    </div>
  </div>
</template>
