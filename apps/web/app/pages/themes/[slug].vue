<script setup>
import { topics, canonicalPath, isSiteLive } from '~/data/site.js'

definePageMeta({ layout: 'default' })

const route = useRoute()
const siteLive = isSiteLive()
const topic = topics.find(item => item.slug === route.params.slug)
if (!topic) throw createError({ statusCode: 404, statusMessage: 'Thème introuvable' })

const { data, pending, error } = await useAsyncData(
  `theme-${topic.slug}`,
  () => $fetch('/api/public/articles', { query: { topic: topic.slug } })
)
const items = computed(() => (data.value?.items || []).filter(item => item.topic === topic.slug))
useSeoMeta({
  title: `${topic.name} : guides et repères · DomoKlub`,
  description: topic.description,
  ogTitle: `${topic.name} · DomoKlub`, ogDescription: topic.description,
  robots: computed(() => siteLive && items.value.length > 0 ? 'index,follow' : 'noindex,follow')
})
useHead({ link: [{ rel: 'canonical', href: canonicalPath(route.path) }] })
</script>

<template>
  <div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">{{ topic.name }}</span></nav><span class="eyebrow">Un sujet, les bons repères</span><h1>{{ topic.name }}<span style="color:var(--orange)">.</span></h1><p>{{ topic.description }}</p></div></header><div class="container page-body"><div class="reading-width"><h2>Avancer sans se perdre.</h2><p>Ce thème rassemblera les guides, tutoriels, tests et comparatifs validés par la rédaction. Chaque page indiquera ce qui est vérifié, ce qui est documenté et ce qui reste incertain.</p></div><p v-if="pending" class="status-line" role="status">Chargement…</p><div v-else-if="error" class="notice" role="alert">Les contenus sont temporairement indisponibles.</div><div v-else-if="items.length" class="article-grid" style="margin-top:2rem"><ArticleCard v-for="article in items" :key="article.id || article.slug" :article="article" /></div><div v-else style="margin-top:2rem"><EmptyState title="Les contenus de ce thème arrivent" /></div></div></div>
</template>
