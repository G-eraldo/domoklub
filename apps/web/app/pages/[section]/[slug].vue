<script setup>
import { sections, canonicalPath, publicRobots, safeJsonLd } from '~/data/site.js'

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
const productLabels = { 'home-assistant-green': 'Home Assistant Green', 'home-assistant-connect-zbt-2': 'Home Assistant Connect ZBT-2', 'sonoff-dongle-pp10': 'SONOFF Dongle-PP10', 'sonoff-zbdongle-p': 'SONOFF ZBDongle-P', 'sonoff-orb-socket': 'SONOFF Orb Socket' }
const articleLabels = { 'installer-home-assistant': 'Installer Home Assistant', 'installer-zigbee2mqtt': 'Installer Zigbee2MQTT', 'demarrer-home-assistant-green': 'Démarrer avec Home Assistant Green', 'choisir-coordinateur-zigbee-home-assistant': 'Choisir un coordinateur Zigbee', 'matter-thread-zigbee-differences': 'Matter, Thread et Zigbee' }
const relatedArticlePath = slug => `/guides/${slug}`
const approvedRobots = publicRobots()
useSeoMeta({
  title: computed(() => article.value ? (article.value.seoTitle || `${article.value.title} · DomoKlub`) : `${section.title} · DomoKlub`),
  description: computed(() => article.value?.excerpt || section.description),
  ogTitle: computed(() => article.value?.title || section.title),
  ogDescription: computed(() => article.value?.excerpt || section.description),
  ogType: 'article',
  robots: computed(() => article.value?.editorialStatus === 'review' ? 'noindex,follow' : approvedRobots)
})
const canonicalUrl = canonicalPath(route.path)
const authorUrl = canonicalPath('/a-propos')
const authorId = canonicalPath('/a-propos#gerald-francois')
const publisherId = canonicalPath('/#organization')
const articleSchema = computed(() => article.value?.editorialStatus === 'approved' && article.value?.publishedAt ? safeJsonLd({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.value.title,
  description: article.value.excerpt,
  mainEntityOfPage: canonicalUrl,
  datePublished: article.value.publishedAt,
  dateModified: article.value.updatedAt || article.value.publishedAt,
  author: { '@type': 'Person', '@id': authorId, name: 'Gérald François', url: authorUrl },
  publisher: { '@id': publisherId }
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
        <section v-if="article.relatedProducts?.length" class="related-block" aria-labelledby="related-products"><h2 id="related-products">Produits à examiner</h2><p>Chaque fiche précise si elle repose sur un retour d’usage ou sur la documentation, avec ses limites.</p><div class="related-links"><NuxtLink v-for="productSlug in article.relatedProducts" :key="productSlug" :to="`/produits/${productSlug}`">{{ productLabels[productSlug] || productSlug }} <span aria-hidden="true">↗</span></NuxtLink></div></section>
        <section v-if="article.relatedArticles?.length" class="related-block" aria-labelledby="related-articles"><h2 id="related-articles">Continuer la lecture</h2><div class="related-links"><NuxtLink v-for="relatedSlug in article.relatedArticles" :key="relatedSlug" :to="relatedArticlePath(relatedSlug)">{{ articleLabels[relatedSlug] || relatedSlug }} <span aria-hidden="true">↗</span></NuxtLink></div></section>
        <section v-if="article.sources?.length" class="sources-block" aria-labelledby="sources-heading"><h2 id="sources-heading">Sources consultées</h2><p>Les faits techniques viennent de ces documentations. Leur contenu peut évoluer.</p><ul><li v-for="source in article.sources" :key="source.url"><a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label || source.url }}</a></li></ul></section>
      </article>
      <aside v-if="article" class="detail-aside"><h2>À propos de cet article</h2><NuxtLink to="/methodologie">Comment nous travaillons</NuxtLink><NuxtLink to="/affiliation">Liens affiliés et indépendance</NuxtLink><NuxtLink :to="`/${route.params.section}`">Retour aux {{ section.title.toLowerCase() }}</NuxtLink></aside>
    </div>
  </div>
</template>
