<script setup>
import { productImages } from '~/data/productImages.js'

defineProps({ product: { type: Object, required: true } })
</script>

<template>
  <NuxtLink :to="`/produits/${product.slug}`" class="product-card">
    <div v-if="productImages[product.slug]" class="product-card-photo">
      <img :src="productImages[product.slug].src" :alt="productImages[product.slug].alt" loading="lazy" width="800" height="800">
    </div>
    <span v-else class="product-icon" aria-hidden="true">◇</span>
    <strong>{{ product.name }}</strong>
    <small>{{ product.brand || 'Marque non renseignée' }} · {{ product.category || 'Catégorie non renseignée' }}</small>
    <span class="product-footer"><span>{{ product.personalReview ? '5/5 · Avis personnel' : 'Fiche documentaire' }}</span><span aria-hidden="true">↗</span></span>
  </NuxtLink>
</template>
