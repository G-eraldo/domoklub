<script setup>
import { sections, canonicalPath, isSiteLive } from '~/data/site.js'

definePageMeta({ layout: 'default' })

const route = useRoute()
const siteLive = isSiteLive()
const section = sections[String(route.params.section)]
if (!section) throw createError({ statusCode: 404, statusMessage: 'Rubrique introuvable' })

const page = ref(1)
const { data, pending, error } = await useAsyncData(
  () => `articles-${section.type}-${page.value}`,
  () => $fetch('/api/public/articles', { query: { type: section.type, page: page.value } }),
  { watch: [page] }
)

const description = section.description
useSeoMeta({
  title: section.seoTitle || `${section.title} · DomoKlub`, description,
  ogTitle: section.seoTitle || `${section.title} · DomoKlub`, ogDescription: description,
  robots: computed(() => siteLive && Boolean(data.value?.items?.length) ? 'index,follow' : 'noindex,follow')
})
useHead({ link: [{ rel: 'canonical', href: canonicalPath(route.path) }] })
</script>

<template>
  <div>
    <header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">{{ section.title }}</span></nav><span class="eyebrow">{{ section.eyebrow }}</span><h1>{{ section.title }}<span style="color:var(--orange)">.</span></h1><p>{{ section.description }}</p></div></header>
    <div class="container page-body">
      <p v-if="section.intro" class="lead reading-width" style="margin-bottom:2rem">{{ section.intro }}</p>
      <p v-if="pending" class="status-line" role="status">Chargement des contenus…</p>
      <div v-else-if="error" class="notice" role="alert">Les contenus sont temporairement indisponibles. Réessayez plus tard.</div>
      <div v-else-if="data?.items?.length"><p class="status-line">{{ data.pagination?.total || data.items.length }} contenu{{ (data.pagination?.total || data.items.length) > 1 ? 's' : '' }}</p><div class="article-grid"><ArticleCard v-for="article in data.items" :key="article.id || article.slug" :article="article" /></div><div v-if="data.pagination?.pageCount > 1" class="pagination"><button class="button button-outline" type="button" :disabled="page <= 1" @click="page--">Précédent</button><span>Page {{ page }} / {{ data.pagination.pageCount }}</span><button class="button button-outline" type="button" :disabled="page >= data.pagination.pageCount" @click="page++">Suivant</button></div></div>
      <EmptyState v-else title="Cette rubrique se prépare" description="Les contenus seront visibles ici après recherche, vérification et validation éditoriale." />
    </div>
  </div>
</template>
