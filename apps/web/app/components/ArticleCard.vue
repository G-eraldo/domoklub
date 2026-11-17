<script setup>
defineProps({ article: { type: Object, required: true } })
const typeLabels = { test: 'Test', guide: 'Guide', tutorial: 'Tutoriel', comparison: 'Comparatif', deal: 'Bon plan' }
</script>

<template>
  <NuxtLink :to="`/${article.section}/${article.slug}`" class="article-card">
    <span class="article-card-top"><span class="article-type">{{ typeLabels[article.type] || 'Article' }}</span><span class="article-card-arrow" aria-hidden="true">↗</span></span>
    <strong>{{ article.title }}</strong>
    <span class="article-excerpt">{{ article.excerpt }}</span>
    <span class="article-card-bottom"><span>{{ article.updatedAt ? new Date(article.updatedAt).toLocaleDateString('fr-FR') : 'Date non renseignée' }}</span><span>Lire l’article</span></span>
  </NuxtLink>
</template>
