<script setup>
import { canonicalPath, publicRobots } from '~/data/site.js'
definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = String(route.params.slug)
const { data: product, pending, error } = await useAsyncData(`product-${slug}`, () => $fetch('/api/public/product', { query: { slug } }))
if (error.value?.statusCode === 404) throw createError({ statusCode: 404, statusMessage: 'Produit introuvable' })
const { data: offers, error: offersError } = await useAsyncData(`offers-${slug}`, () => $fetch('/api/public/offers', { query: { slug } }))
const articleLabels = { 'demarrer-home-assistant-green': 'Démarrer avec Home Assistant Green', 'choisir-coordinateur-zigbee-home-assistant': 'Choisir un coordinateur Zigbee', 'matter-thread-zigbee-differences': 'Matter, Thread et Zigbee' }

const approvedRobots = publicRobots()
useSeoMeta({
  title: computed(() => product.value ? `${product.value.name} : fiche et compatibilités · DomoKlub` : 'Produit · DomoKlub'),
  description: computed(() => product.value?.summary || 'Fiche produit documentée par DomoKlub.'),
  ogTitle: computed(() => product.value?.name || 'Produit · DomoKlub'),
  ogDescription: computed(() => product.value?.summary || 'Fiche produit documentée par DomoKlub.'),
  robots: computed(() => product.value?.editorialStatus === 'review' ? 'noindex,follow' : approvedRobots)
})
useHead({ link: [{ rel: 'canonical', href: canonicalPath(route.path) }] })

const specs = computed(() => Object.entries(product.value?.specs || {}).filter(([, value]) => ['string', 'number'].includes(typeof value)))
const compatibilities = computed(() => Object.entries(product.value?.compatibilities || {}).filter(([, value]) => typeof value === 'string'))
</script>

<template>
  <div>
    <header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><NuxtLink to="/produits">Produits</NuxtLink><span class="separator">/</span><span aria-current="page">{{ product?.name || 'Produit' }}</span></nav><span class="eyebrow">Fiche produit documentée</span><h1>{{ product?.name || 'Produit' }}</h1><p>{{ product?.summary }}</p></div></header>
    <div class="container page-body"><p v-if="pending" role="status">Chargement du produit…</p><div v-else-if="error" class="notice" role="alert">Cette fiche est temporairement indisponible.</div><div v-else-if="product" class="detail-layout"><div class="article-content">
      <div v-if="product.editorialStatus === 'review'" class="notice">Brouillon en prévisualisation. Vérification éditoriale requise avant l’indexation.</div>
      <div class="notice">{{ product.evidenceLevel === 'tested' ? 'Produit testé par DomoKlub : le rapport d’essai doit préciser méthode et mesures.' : 'Non testé par DomoKlub. Cette fiche repose sur la documentation du fabricant et ne comporte aucune note.' }}</div>
      <div class="article-meta"><span>{{ product.brand || 'Marque non renseignée' }}</span><span>{{ product.category || 'Catégorie non renseignée' }}</span><span v-if="product.updatedAt">Vérifié le {{ new Date(product.updatedAt).toLocaleDateString('fr-FR') }}</span></div>
      <section v-if="product.buyerNote" aria-labelledby="buyer-heading"><h2 id="buyer-heading">Pour qui ?</h2><p>{{ product.buyerNote }}</p></section>
      <section v-if="product.limitations?.length" aria-labelledby="limits-heading"><h2 id="limits-heading">À savoir avant l’achat</h2><ul><li v-for="limit in product.limitations" :key="limit">{{ limit }}</li></ul></section>
      <section aria-labelledby="spec-heading"><h2 id="spec-heading">Caractéristiques vérifiées</h2><p v-if="!specs.length">Aucune caractéristique vérifiée n’est encore renseignée.</p><div v-else class="comparison-scroll"><table class="comparison-table"><tbody><tr v-for="[label, value] in specs" :key="label"><th scope="row">{{ label }}</th><td>{{ value }}<a v-if="product.specSources?.[label]" class="source-note" :href="product.specSources[label].url" target="_blank" rel="noopener noreferrer">Source · {{ new Date(product.specSources[label].checkedAt).toLocaleDateString('fr-FR') }}</a></td></tr></tbody></table></div></section>
      <section aria-labelledby="compat-heading"><h2 id="compat-heading">Compatibilités documentées</h2><p v-if="!compatibilities.length">Compatibilités non vérifiées.</p><div v-else class="comparison-scroll"><table class="comparison-table"><tbody><tr v-for="[label, value] in compatibilities" :key="label"><th scope="row">{{ label }}</th><td>{{ value }}<a v-if="product.compatibilitySources?.[label]" class="source-note" :href="product.compatibilitySources[label].url" target="_blank" rel="noopener noreferrer">Source · {{ new Date(product.compatibilitySources[label].checkedAt).toLocaleDateString('fr-FR') }}</a></td></tr></tbody></table></div></section>
      <section aria-labelledby="offers-heading"><h2 id="offers-heading">Voir chez un marchand</h2><div v-if="offersError" class="notice" role="alert">Les liens marchands sont temporairement indisponibles.</div><div v-else-if="offers?.items?.length" class="offer-list"><div v-for="offer in offers.items" :key="offer.url" class="offer-card"><div><strong>{{ offer.merchantName }}</strong><small>Lien affilié · Vérifié le {{ new Date(offer.checkedAt).toLocaleDateString('fr-FR') }} · Prix et disponibilité à confirmer chez le marchand</small></div><a class="button button-primary" :href="offer.url" target="_blank" rel="sponsored noopener noreferrer">Voir chez {{ offer.merchantName }} <span aria-hidden="true">↗</span></a></div></div><p v-else class="notice">Aucun lien marchand vérifié n’est disponible pour ce produit. Aucun prix n’est affiché.</p></section>
      <section v-if="product.relatedArticles?.length" class="related-block" aria-labelledby="read-heading"><h2 id="read-heading">Pour décider</h2><div class="related-links"><NuxtLink v-for="articleSlug in product.relatedArticles" :key="articleSlug" :to="`/guides/${articleSlug}`">{{ articleLabels[articleSlug] || articleSlug }} <span aria-hidden="true">↗</span></NuxtLink></div></section>
      <section v-if="product.sources?.length" class="sources-block" aria-labelledby="product-sources"><h2 id="product-sources">Sources</h2><ul><li v-for="source in product.sources" :key="source.url"><a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label || source.url }}</a></li></ul></section>
    </div><aside class="detail-aside"><h2>Aller plus loin</h2><NuxtLink to="/comparer">Comparer les produits</NuxtLink><NuxtLink to="/methodologie">Méthode éditoriale</NuxtLink><NuxtLink to="/affiliation">Politique d’affiliation</NuxtLink></aside></div></div>
  </div>
</template>
