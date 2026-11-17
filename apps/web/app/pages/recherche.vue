<script setup>
import { canonicalPath } from '~/data/site.js'
definePageMeta({ layout: 'default' })

const route = useRoute()
const router = useRouter()
const input = ref(String(route.query.q || ''))
const query = computed(() => String(route.query.q || '').trim().slice(0, 80))
const { data, pending, error } = await useAsyncData(
  () => `search-${query.value}`,
  () => query.value.length >= 2 ? $fetch('/api/public/search', { query: { q: query.value } }) : Promise.resolve({ articles: [], products: [] }),
  { watch: [query] }
)
watch(query, value => { input.value = value })
function submit() { router.push({ path: '/recherche', query: input.value.trim() ? { q: input.value.trim().slice(0, 80) } : {} }) }

useSeoMeta({ title: 'Recherche · DomoKlub', description: 'Rechercher les contenus et produits publiés sur DomoKlub.', ogTitle: 'Recherche · DomoKlub', ogDescription: 'Trouver les bons repères pour votre maison connectée.', robots: 'noindex,follow' })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/recherche') }] })
</script>

<template>
  <div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Recherche</span></nav><span class="eyebrow">Trouver un repère</span><h1>Que cherchez-vous<span style="color:var(--orange)"> ?</span></h1><p>Explorez les contenus et produits vérifiés de DomoKlub.</p><form class="search-form" role="search" @submit.prevent="submit"><label class="sr-only" for="site-search">Votre recherche</label><input id="site-search" v-model="input" type="search" maxlength="80" autocomplete="off" placeholder="Ex. Zigbee, caméra, Home Assistant…"><button class="button button-primary" type="submit">Rechercher <span aria-hidden="true">→</span></button></form></div></header><div class="container page-body"><p v-if="!query || query.length < 2" class="status-line">Saisissez au moins deux caractères pour lancer la recherche.</p><p v-else-if="pending" role="status">Recherche en cours…</p><div v-else-if="error" class="notice" role="alert">La recherche est temporairement indisponible.</div><template v-else-if="data"><p class="status-line">Résultats pour « {{ query }} »</p><section v-if="data.articles?.length" class="search-group" aria-labelledby="search-articles"><h2 id="search-articles">Articles</h2><div class="article-grid"><ArticleCard v-for="article in data.articles" :key="article.id || article.slug" :article="article" /></div></section><section v-if="data.products?.length" class="search-group" aria-labelledby="search-products"><h2 id="search-products">Produits</h2><div class="product-grid"><NuxtLink v-for="product in data.products" :key="product.id || product.slug" :to="`/produits/${product.slug}`" class="product-card"><span class="product-icon" aria-hidden="true">◇</span><strong>{{ product.name }}</strong><small>{{ product.brand || 'Marque non renseignée' }}</small><span class="product-footer"><span>Voir la fiche</span><span aria-hidden="true">↗</span></span></NuxtLink></div></section><EmptyState v-if="!data.articles?.length && !data.products?.length" title="Aucun résultat pour le moment" description="Essayez un autre terme ou parcourez les grands thèmes. Seuls les contenus validés sont recherchables." /></template></div></div>
</template>
