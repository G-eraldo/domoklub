<script setup>
import { canonicalPath, safeJsonLd, defaultOgImage, useAbsoluteUrl } from '~/data/site.js'
const route = useRoute()
const absoluteUrl = useAbsoluteUrl()
const identity = safeJsonLd({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': canonicalPath('/#website'), name: 'DomoKlub', url: canonicalPath('/'), inLanguage: 'fr-FR', publisher: { '@id': canonicalPath('/#organization') } },
    { '@type': 'Organization', '@id': canonicalPath('/#organization'), name: 'La Fabrique du Code', url: canonicalPath('/a-propos'), logo: canonicalPath('/favicon.svg'), founder: { '@id': canonicalPath('/a-propos#gerald-francois') } },
    { '@type': 'Person', '@id': canonicalPath('/a-propos#gerald-francois'), name: 'Gérald François', url: canonicalPath('/a-propos') }
  ]
})
// Valeurs par défaut : chaque page peut les remplacer (og:image produit, etc.).
useSeoMeta({
  ogSiteName: 'DomoKlub',
  ogLocale: 'fr_FR',
  ogUrl: computed(() => absoluteUrl(route.path)),
  ogImage: canonicalPath(defaultOgImage.path),
  ogImageWidth: defaultOgImage.width,
  ogImageHeight: defaultOgImage.height,
  ogImageAlt: defaultOgImage.alt,
  twitterCard: 'summary_large_image'
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: identity }] })
</script>
<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
