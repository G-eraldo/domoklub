<script setup>
import { canonicalPath } from '~/data/site.js'
definePageMeta({ layout: 'default' })
const description = 'Cookies et traceurs actuellement utilisés sur DomoKlub.'
useSeoMeta({ title: 'Cookies · DomoKlub', description, ogTitle: 'Cookies · DomoKlub', ogDescription: description, robots: 'noindex,follow' })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/cookies') }] })
</script>
<template><div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Cookies</span></nav><span class="eyebrow">Traceurs</span><h1>Cookies<span style="color:var(--orange)">.</span></h1><p>État des traceurs sur DomoKlub.</p></div></header><div class="container page-body"><div class="reading-width"><p>La version actuelle du site n’intègre pas de traceur publicitaire ni d’outil tiers de mesure d’audience. Aucun bandeau de consentement n’est donc affiché pour ces finalités.</p><p>Des éléments techniques strictement nécessaires au fonctionnement du site peuvent être utilisés par le navigateur ou l’hébergement. Si nous ajoutons un service nécessitant votre consentement, nous mettrons à jour cette page et le mécanisme de choix avant son activation.</p><p>Les sites marchands ouverts depuis un lien affilié appliquent leurs propres règles de cookies. Consultez leur politique avant de poursuivre votre navigation chez eux.</p></div></div></div></template>
