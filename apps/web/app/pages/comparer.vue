<script setup>
import { canonicalPath } from '~/data/site.js'
definePageMeta({ layout: 'default' })

const route = useRoute()
const router = useRouter()
const { data: catalog, pending, error } = await useAsyncData('comparison-catalog', () => $fetch('/api/public/products'))
const selectedSlugs = ref([])
const productQuery = ref('')
const nextSlug = ref('')
const onlyDifferences = ref(false)
const compareError = ref('')

watch(() => route.query.produits, value => {
  const slugs = String(value || '').split(',').filter(Boolean)
  selectedSlugs.value = slugs.length <= 4 && slugs.every(slug => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) ? [...new Set(slugs)] : []
}, { immediate: true })

const { data: comparison, error: comparisonFetchError } = await useAsyncData(
  () => `comparison-${selectedSlugs.value.join(',')}`,
  () => selectedSlugs.value.length >= 2 ? $fetch('/api/public/compare', { query: { slugs: selectedSlugs.value.join(',') } }) : Promise.resolve({ products: [] }),
  { watch: [selectedSlugs] }
)
const selected = computed(() => selectedSlugs.value.length >= 2 && comparison.value?.products?.length ? comparison.value.products : (catalog.value?.items || []).filter(product => selectedSlugs.value.includes(product.slug)))
const category = computed(() => selected.value[0]?.category || '')
const { data: searchResults, pending: searchPending, error: searchError } = await useAsyncData(
  () => `compare-search-${productQuery.value}-${category.value}`,
  () => productQuery.value.trim().length >= 2 ? $fetch('/api/public/product-search', { query: { q: productQuery.value.trim(), category: category.value } }) : Promise.resolve({ items: catalog.value?.items || [] }),
  { watch: [productQuery, category, catalog] }
)
const available = computed(() => (productQuery.value.trim().length >= 2 ? searchResults.value?.items || [] : catalog.value?.items || []).filter(product => !selectedSlugs.value.includes(product.slug) && (!category.value || product.category === category.value)))
const specKeys = computed(() => [...new Set(selected.value.flatMap(product => Object.keys(product.specs || {})))])
const visibleSpecKeys = computed(() => onlyDifferences.value ? specKeys.value.filter(key => new Set(selected.value.map(product => String(product.specs?.[key] ?? 'Non renseigné'))).size > 1) : specKeys.value)

function syncUrl() {
  router.replace({ path: '/comparer', query: selectedSlugs.value.length ? { produits: selectedSlugs.value.join(',') } : {} })
}

function addProduct() {
  compareError.value = ''
  if (!nextSlug.value) return
  const product = available.value.find(item => item.slug === nextSlug.value)
  if (!product) { compareError.value = 'Produit introuvable.'; return }
  if (selectedSlugs.value.length >= 4) { compareError.value = 'Quatre produits maximum.'; return }
  if (selected.value.length && product.category !== selected.value[0].category) { compareError.value = 'Choisissez des produits de la même catégorie.'; return }
  selectedSlugs.value = [...selectedSlugs.value, product.slug]
  nextSlug.value = ''
  productQuery.value = ''
  syncUrl()
}

function removeProduct(slug) {
  selectedSlugs.value = selectedSlugs.value.filter(item => item !== slug)
  compareError.value = ''
  syncUrl()
}

useSeoMeta({ title: 'Comparer des produits · DomoKlub', description: 'Comparez de deux à quatre produits de la même catégorie, avec des valeurs manquantes signalées.', ogTitle: 'Comparer des produits · DomoKlub', ogDescription: 'Comparez les caractéristiques vérifiées des produits connectés.', robots: 'noindex,follow' })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/comparer') }] })
</script>

<template>
  <div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Comparer</span></nav><span class="eyebrow">Comparer avec méthode</span><h1>Les différences<br>qui comptent<span style="color:var(--orange)">.</span></h1><p>Choisissez de deux à quatre produits de la même catégorie. Une donnée absente reste « Non renseigné ».</p></div></header><div class="container page-body"><p v-if="pending" role="status">Chargement du catalogue…</p><div v-else-if="error" class="notice" role="alert">Le comparateur est temporairement indisponible.</div><template v-else><div v-if="!catalog?.items?.length && !selected.length" class="notice">Le comparateur sera disponible dès que des fiches produits auront été vérifiées et publiées.</div><div v-else><div class="compare-controls"><div><label for="product-query">Rechercher un produit</label><input id="product-query" v-model="productQuery" class="compare-search-input" type="search" maxlength="80" placeholder="Marque ou modèle"><label for="product-select" style="margin-top:1rem">Ajouter un produit</label><select id="product-select" v-model="nextSlug"><option value="">Choisir dans le catalogue</option><option v-for="product in available" :key="product.slug" :value="product.slug">{{ product.name }} · {{ product.category }}</option></select><p v-if="searchPending" class="status-line">Recherche de produits…</p><p v-if="searchError" class="notice" role="alert">La recherche de produits est indisponible.</p></div><button type="button" class="button button-primary" :disabled="!nextSlug || selectedSlugs.length >= 4" @click="addProduct">Ajouter <span aria-hidden="true">＋</span></button></div><p v-if="compareError" class="notice" role="alert">{{ compareError }}</p><p v-if="comparisonFetchError" class="notice" role="alert">Cette comparaison est invalide ou temporairement indisponible.</p><div class="selected-products"><span v-for="product in selected" :key="product.slug" class="selected-chip">{{ product.name }}<button type="button" :aria-label="`Retirer ${product.name}`" @click="removeProduct(product.slug)">×</button></span></div><p v-if="selected.length < 2" class="status-line">Choisissez encore {{ 2 - selected.length }} produit{{ 2 - selected.length > 1 ? 's' : '' }} pour afficher la comparaison.</p><div v-else-if="!comparisonFetchError && comparison?.products?.length >= 2"><label class="status-line"><input v-model="onlyDifferences" type="checkbox"> Montrer seulement les différences</label><div class="comparison-scroll"><table class="comparison-table"><thead><tr><th scope="col">Critère</th><th v-for="product in selected" :key="product.slug" scope="col">{{ product.name }}</th></tr></thead><tbody><tr><th scope="row">Statut</th><td v-for="product in selected" :key="product.slug">{{ product.evidenceLevel === 'tested' ? 'Testé par DomoKlub' : 'Non testé par DomoKlub' }}</td></tr><tr v-for="key in visibleSpecKeys" :key="key"><th scope="row">{{ key }}</th><td v-for="product in selected" :key="product.slug">{{ product.specs?.[key] ?? 'Non renseigné' }}<a v-if="product.specSources?.[key]" class="source-note" :href="product.specSources[key].url" target="_blank" rel="noopener noreferrer">Source · {{ new Date(product.specSources[key].checkedAt).toLocaleDateString('fr-FR') }}</a></td></tr></tbody></table></div><p class="status-line" style="margin-top:1rem">L’adresse de cette comparaison peut être partagée. Les comparaisons libres ne sont pas indexées.</p></div></div></template></div></div>
</template>
