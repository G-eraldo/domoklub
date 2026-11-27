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
const description = 'Dongles Zigbee, modules, capteurs, prises et box Home Assistant : avis d’usage de l’éditeur, caractéristiques sourcées et liens marchands vérifiés.'
useSeoMeta({ title: 'Produits Zigbee et Home Assistant : avis · DomoKlub', description, ogTitle: 'Produits Zigbee et Home Assistant : avis · DomoKlub', ogDescription: description, robots: computed(() => siteLive && Boolean(data.value?.items?.length) ? 'index,follow' : 'noindex,follow') })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/produits') }] })
</script>

<template>
  <div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Produits</span></nav><span class="eyebrow">Le catalogue documenté</span><h1>Produits<span style="color:var(--orange)">.</span></h1><p>Des fiches utiles, avec des informations sourcées et un niveau de preuve explicite.</p></div></header><div class="container page-body"><div class="reading-width" style="margin-bottom:2rem"><p class="lead">Ce catalogue réunit le matériel que l’éditeur utilise dans sa propre installation Home Assistant et Zigbee2MQTT : coordinateur, modules d’éclairage et de volets, prises, détecteurs, télécommande et module pour compteur Linky. Treize fiches contiennent un avis d’usage personnel, dont onze avec une note sur 5 motivée.</p><p>Trois fiches restent documentaires : elles résument les informations du fabricant pour des produits que DomoKlub n’a pas encore utilisés, sans note. Chaque fiche précise à qui le produit convient, ses limites, ses caractéristiques avec leur source et les marchands où le trouver. Pour comparer deux références d’une même catégorie, utilisez le <NuxtLink to="/comparer">comparateur</NuxtLink> ; pour choisir par usage, lisez notre <NuxtLink to="/comparatifs/modules-zigbee-pour-debuter">sélection de modules Zigbee</NuxtLink>.</p></div><p v-if="pending" class="status-line" role="status">Chargement des produits…</p><div v-else-if="error" class="notice" role="alert">Le catalogue est temporairement indisponible.</div><div v-else-if="data?.items?.length"><div class="product-grid"><ProductCard v-for="product in data.items" :key="product.id || product.slug" :product="product" /></div><div v-if="data.pagination?.pageCount > 1" class="pagination"><button class="button button-outline" type="button" :disabled="page <= 1" @click="page--">Précédent</button><span>Page {{ page }} / {{ data.pagination.pageCount }}</span><button class="button button-outline" type="button" :disabled="page >= data.pagination.pageCount" @click="page++">Suivant</button></div></div><EmptyState v-else title="Le catalogue est en préparation" description="Aucune fiche ne sera visible avant vérification des caractéristiques et validation éditoriale." /></div></div>
</template>
