<script setup>
import { canonicalPath, publicRobots, safeJsonLd, breadcrumbJsonLd, useAbsoluteUrl } from '~/data/site.js'
import { productImages } from '~/data/productImages.js'
definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = String(route.params.slug)
const { data: product, pending, error } = await useAsyncData(`product-${slug}`, () => $fetch('/api/public/product', { query: { slug } }))
if (error.value?.statusCode === 404) throw createError({ statusCode: 404, statusMessage: 'Produit introuvable' })
const { data: offers, error: offersError } = await useAsyncData(`offers-${slug}`, () => $fetch('/api/public/offers', { query: { slug } }))
const { data: catalog } = await useAsyncData('catalog-all', () => $fetch('/api/public/products'))
const { data: guideList } = await useAsyncData('articles-all', () => $fetch('/api/public/articles', { query: { pageSize: 50 } }))
const articlePath = articleSlug => { const item = guideList.value?.items?.find(entry => entry.slug === articleSlug); return `/${item?.section || 'guides'}/${articleSlug}` }
const articleLabel = articleSlug => guideList.value?.items?.find(item => item.slug === articleSlug)?.title || articleSlug.replaceAll('-', ' ')
// Maillage entre fiches : même catégorie d'abord, sinon d'autres produits du catalogue.
const sameCategory = computed(() => (catalog.value?.items || []).filter(item => item.slug !== slug && item.category && item.category === product.value?.category))
const otherProducts = computed(() => (sameCategory.value.length ? sameCategory.value : (catalog.value?.items || []).filter(item => item.slug !== slug)).slice(0, 3))
const comparePath = computed(() => sameCategory.value.length ? `/comparer?produits=${[slug, ...sameCategory.value.slice(0, 3).map(item => item.slug)].join(',')}` : '')

const approvedRobots = publicRobots()
const productPhotoUrl = productImages[slug] ? canonicalPath(productImages[slug].src) : undefined
useSeoMeta({
  title: computed(() => product.value ? (product.value.seoTitle || `${product.value.name} · DomoKlub`) : 'Produit · DomoKlub'),
  description: computed(() => product.value?.seoDescription || product.value?.summary || 'Fiche produit documentée par DomoKlub.'),
  ogTitle: computed(() => product.value?.name || 'Produit · DomoKlub'),
  ogDescription: computed(() => product.value?.summary || 'Fiche produit documentée par DomoKlub.'),
  ogImage: productPhotoUrl,
  ogImageWidth: productPhotoUrl ? 800 : undefined,
  ogImageHeight: productPhotoUrl ? 800 : undefined,
  ogImageAlt: productImages[slug]?.alt,
  twitterCard: 'summary_large_image',
  robots: computed(() => product.value?.editorialStatus === 'review' ? 'noindex,follow' : approvedRobots)
})
const absoluteUrl = useAbsoluteUrl()
const breadcrumbSchema = computed(() => product.value ? safeJsonLd({ '@context': 'https://schema.org', ...breadcrumbJsonLd([{ name: 'Accueil', path: '/' }, { name: 'Produits', path: '/produits' }, { name: product.value.name, path: route.path }], absoluteUrl) }) : null)
const canonicalUrl = canonicalPath(route.path)
useHead(() => ({ link: [{ rel: 'canonical', href: canonicalUrl }], script: breadcrumbSchema.value ? [{ type: 'application/ld+json', innerHTML: breadcrumbSchema.value }] : [] }))

const specs = computed(() => Object.entries(product.value?.specs || {}).filter(([, value]) => ['string', 'number'].includes(typeof value)))
const compatibilities = computed(() => Object.entries(product.value?.compatibilities || {}).filter(([, value]) => typeof value === 'string'))
</script>

<template>
  <div>
    <header class="page-hero product-page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><NuxtLink to="/produits">Produits</NuxtLink><span class="separator">/</span><span aria-current="page">{{ product?.name || 'Produit' }}</span></nav><span class="eyebrow">{{ product?.personalReview ? 'Avis personnel et fiche produit' : 'Fiche produit documentée' }}</span><h1>{{ product?.name || 'Produit' }}</h1><p>{{ product?.summary }}</p><p v-if="product" class="affiliate-disclosure">{{ product.personalReview ? 'Avis personnel et caractéristiques documentées' : 'Fiche documentaire' }} · Les liens marchands sont affiliés (Domadoo, Amazon) : un achat après un clic peut rémunérer DomoKlub, sans surcoût pour vous.</p><a v-if="offers?.items?.length" class="button button-primary hero-affiliate-button" :href="offers.items[0].url" target="_blank" rel="sponsored noopener noreferrer">Voir chez {{ offers.items[0].merchantName }} <span aria-hidden="true">↗</span></a></div></header>
    <div class="container page-body"><p v-if="pending" role="status">Chargement du produit…</p><div v-else-if="error" class="notice" role="alert">Cette fiche est temporairement indisponible.</div><div v-else-if="product" class="detail-layout"><div class="article-content">
      <section v-if="product.buyerNote" class="product-decision" aria-labelledby="product-decision-title"><div><span class="eyebrow">En bref</span><h2 id="product-decision-title">À qui convient ce produit ?</h2><p>{{ product.buyerNote }}</p><p class="product-decision-limit">{{ product.limitations?.[0] }}</p></div></section>
      <figure v-if="productImages[slug]" class="product-detail-photo"><img :src="productImages[slug].src" :alt="productImages[slug].alt" width="800" height="800" fetchpriority="high"><figcaption>Photo du produit : {{ productImages[slug].credit }}.</figcaption></figure>
      <div v-if="product.editorialStatus === 'review'" class="notice">Brouillon en prévisualisation. Vérification éditoriale requise avant l’indexation.</div>
      <section v-if="product.personalReview" class="personal-review" aria-labelledby="personal-review-heading"><span class="eyebrow">Retour d’usage</span><h2 id="personal-review-heading">L’avis de {{ product.personalReview.author }}</h2><p>{{ product.personalReview.context }}</p><p v-for="observation in product.personalReview.observations" :key="observation">{{ observation }}</p><p class="personal-review-scope">{{ product.personalReview.caveat }}</p></section>
      <div v-else class="notice">Non testé par DomoKlub. Cette fiche repose sur la documentation du fabricant et ne comporte aucune note.</div>
      <div class="article-meta"><span>Fiche par <NuxtLink to="/a-propos">Gérald François</NuxtLink></span><span>{{ product.brand || 'Marque non renseignée' }}</span><span>{{ product.category || 'Catégorie non renseignée' }}</span><span v-if="product.updatedAt">Vérifié le {{ new Date(product.updatedAt).toLocaleDateString('fr-FR') }}</span></div>
      <section v-if="product.limitations?.length" aria-labelledby="limits-heading"><h2 id="limits-heading">À savoir avant l’achat</h2><ul><li v-for="limit in product.limitations" :key="limit">{{ limit }}</li></ul></section>
      <section v-for="section in product.editorialSections" :key="section.title"><h2>{{ section.title }}</h2><p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p></section>
      <section aria-labelledby="spec-heading"><h2 id="spec-heading">Caractéristiques vérifiées</h2><p v-if="!specs.length">Aucune caractéristique vérifiée n’est encore renseignée.</p><div v-else class="comparison-scroll"><table class="comparison-table"><tbody><tr v-for="[label, value] in specs" :key="label"><th scope="row">{{ label }}</th><td>{{ value }}<a v-if="product.specSources?.[label]" class="source-note" :href="product.specSources[label].url" target="_blank" rel="noopener noreferrer">Source · {{ new Date(product.specSources[label].checkedAt).toLocaleDateString('fr-FR') }}</a></td></tr></tbody></table></div></section>
      <section aria-labelledby="compat-heading"><h2 id="compat-heading">Compatibilités documentées</h2><p v-if="!compatibilities.length">Compatibilités non vérifiées.</p><div v-else class="comparison-scroll"><table class="comparison-table"><tbody><tr v-for="[label, value] in compatibilities" :key="label"><th scope="row">{{ label }}</th><td>{{ value }}<a v-if="product.compatibilitySources?.[label]" class="source-note" :href="product.compatibilitySources[label].url" target="_blank" rel="noopener noreferrer">Source · {{ new Date(product.compatibilitySources[label].checkedAt).toLocaleDateString('fr-FR') }}</a></td></tr></tbody></table></div></section>
      <section aria-labelledby="offers-heading"><h2 id="offers-heading">Voir chez un marchand</h2><div v-if="offersError" class="notice" role="alert">Les liens marchands sont temporairement indisponibles.</div><div v-else-if="offers?.items?.length" class="offer-list"><div v-for="offer in offers.items" :key="offer.url" class="offer-card"><div><strong>{{ offer.merchantName }}</strong><small>Lien affilié · Vérifié le {{ new Date(offer.checkedAt).toLocaleDateString('fr-FR') }} · Prix et disponibilité à confirmer chez le marchand</small></div><a class="button button-primary" :href="offer.url" target="_blank" rel="sponsored noopener noreferrer">Voir chez {{ offer.merchantName }} <span aria-hidden="true">↗</span></a></div></div><p v-else class="notice">Aucun lien marchand vérifié n’est disponible pour ce produit. Aucun prix n’est affiché.</p></section>
      <section v-if="product.relatedArticles?.length" class="related-block" aria-labelledby="read-heading"><h2 id="read-heading">Pour décider</h2><div class="related-links"><NuxtLink v-for="articleSlug in product.relatedArticles" :key="articleSlug" :to="articlePath(articleSlug)">{{ articleLabel(articleSlug) }} <span aria-hidden="true">↗</span></NuxtLink></div></section>
      <section v-if="otherProducts.length" class="related-block" aria-labelledby="other-products-heading"><h2 id="other-products-heading">{{ sameCategory.length ? `Même catégorie : ${product.category}` : 'Autres produits à examiner' }}</h2><div class="product-grid related-product-grid"><ProductCard v-for="item in otherProducts" :key="item.slug" :product="item" /></div><p v-if="comparePath" style="margin-top:1rem"><NuxtLink :to="comparePath" class="text-link">Comparer ces produits côte à côte <span aria-hidden="true">↗</span></NuxtLink></p></section>
      <section v-if="product.sources?.length" class="sources-block" aria-labelledby="product-sources"><h2 id="product-sources">Sources</h2><ul><li v-for="source in product.sources" :key="source.url"><a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label || source.url }}</a></li></ul></section>
    </div><aside class="detail-aside"><h2>Aller plus loin</h2><NuxtLink to="/comparer">Comparer les produits</NuxtLink><NuxtLink to="/methodologie">Méthode éditoriale</NuxtLink><NuxtLink to="/affiliation">Politique d’affiliation</NuxtLink></aside></div></div>
  </div>
</template>
