<script setup>
const props = defineProps({ error: { type: Object, required: true } })
const notFound = computed(() => props.error?.statusCode === 404)
useSeoMeta({ title: computed(() => notFound.value ? 'Page introuvable · DomoKlub' : 'Erreur · DomoKlub'), robots: 'noindex,follow' })
const links = [
  { label: 'Retour à l’accueil', to: '/' },
  { label: 'Les guides', to: '/guides' },
  { label: 'Les fiches produits', to: '/produits' },
  { label: 'Rechercher sur le site', to: '/recherche' }
]
</script>

<template>
  <NuxtLayout>
    <header class="page-hero"><div class="container"><span class="eyebrow">{{ notFound ? 'Erreur 404' : `Erreur ${error.statusCode || 500}` }}</span><h1>{{ notFound ? 'Cette page n’existe pas' : 'Un problème est survenu' }}<span style="color:var(--orange)">.</span></h1><p>{{ notFound ? 'Le lien est peut-être ancien ou mal saisi. Ces pages devraient vous aider à retrouver votre chemin.' : 'Réessayez dans quelques instants. Si le problème continue, écrivez-nous.' }}</p></div></header>
    <div class="container page-body"><div class="related-links"><a v-for="link in links" :key="link.to" :href="link.to" @click.prevent="clearError({ redirect: link.to })">{{ link.label }} <span aria-hidden="true">↗</span></a></div></div>
  </NuxtLayout>
</template>
