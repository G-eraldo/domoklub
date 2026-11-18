<script setup>
import { canonicalPath, isSiteLive } from '~/data/site.js'
definePageMeta({ layout: 'default' })

const siteLive = isSiteLive()
const page = ref(1)
const { data, pending, error } = await useAsyncData(
  () => `products-${page.value}`,
  () => $fetch('/api/public/products', { query: { page: page.value } }),
  { watch: [page] }
)
const description = 'Catalogue de produits pour la maison connectée, avec caractéristiques sourcées et statut de test clairement indiqué.'
useSeoMeta({ title: 'Produits · DomoKlub', description, ogTitle: 'Produits · DomoKlub', ogDescription: description, robots: computed(() => siteLive && Boolean(data.value?.items?.length) ? 'index,follow' : 'noindex,follow') })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/produits') }] })
</script>

<template>
  <div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Produits</span></nav><span class="eyebrow">Le catalogue documenté</span><h1>Produits<span style="color:var(--orange)">.</span></h1><p>Des fiches utiles, avec des informations sourcées et un niveau de preuve explicite.</p></div></header><div class="container page-body"><p v-if="pending" class="status-line" role="status">Chargement des produits…</p><div v-else-if="error" class="notice" role="alert">Le catalogue est temporairement indisponible.</div><div v-else-if="data?.items?.length"><div class="product-grid"><ProductCard v-for="product in data.items" :key="product.id || product.slug" :product="product" /></div><div v-if="data.pagination?.pageCount > 1" class="pagination"><button class="button button-outline" type="button" :disabled="page <= 1" @click="page--">Précédent</button><span>Page {{ page }} / {{ data.pagination.pageCount }}</span><button class="button button-outline" type="button" :disabled="page >= data.pagination.pageCount" @click="page++">Suivant</button></div></div><EmptyState v-else title="Le catalogue est en préparation" description="Aucune fiche ne sera visible avant vérification des caractéristiques et validation éditoriale." /></div></div>
</template>
