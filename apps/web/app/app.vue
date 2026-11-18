<script setup>
import { canonicalPath, safeJsonLd } from '~/data/site.js'
const identity = safeJsonLd({
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': canonicalPath('/#website'), name: 'DomoKlub', url: canonicalPath('/'), publisher: { '@id': canonicalPath('/#organization') } },
    { '@type': 'Organization', '@id': canonicalPath('/#organization'), name: 'La Fabrique du Code', url: canonicalPath('/a-propos'), founder: { '@id': canonicalPath('/a-propos#gerald-francois') } },
    { '@type': 'Person', '@id': canonicalPath('/a-propos#gerald-francois'), name: 'Gérald François', url: canonicalPath('/a-propos') }
  ]
})
useHead({ script: [{ type: 'application/ld+json', innerHTML: identity }] })
</script>
<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
