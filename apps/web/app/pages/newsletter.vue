<script setup>
import { canonicalPath } from '~/data/site.js'
definePageMeta({ layout: 'default' })

const description = 'La future newsletter DomoKlub : des contenus approuvés, sans compte lecteur et avec désinscription possible.'
useSeoMeta({ title: 'Newsletter · DomoKlub', description, ogTitle: 'Newsletter · DomoKlub', ogDescription: description, robots: 'noindex,follow' })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/newsletter') }] })
</script>

<template>
  <div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Newsletter</span></nav><span class="eyebrow">Garder les bons repères</span><h1>La domotique, en clair<br>dans votre boîte mail<span style="color:var(--orange)">.</span></h1><p>Une sélection de contenus validés, lorsque la newsletter sera prête.</p></div></header><div class="container page-body"><div class="reading-width"><h2>Un rendez-vous utile, sans bruit.</h2><p>La newsletter ne reprendra que des articles déjà approuvés et publiés. L’inscription demandera un consentement explicite et chaque message offrira une désinscription.</p><div class="notice">Les inscriptions sont fermées pendant la préparation du service. Aucun e-mail n’est collecté sur cette page.</div><p><NuxtLink to="/guides" class="text-link">Explorer les guides <span aria-hidden="true">↗</span></NuxtLink></p></div></div></div>
</template>
