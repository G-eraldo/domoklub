<script setup>
import { canonicalPath } from '~/data/site.js'
definePageMeta({ layout: 'default' })
const description = 'Contacter DomoKlub pour une question, une correction ou une demande relative à vos données.'
useSeoMeta({ title: 'Contact · DomoKlub', description, ogTitle: 'Contact · DomoKlub', ogDescription: description, robots: 'noindex,follow' })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/contact') }] })
</script>
<template><div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Contact</span></nav><span class="eyebrow">Une question ou une correction</span><h1>Nous contacter<span style="color:var(--orange)">.</span></h1><p>Écrivez directement à la rédaction.</p></div></header><div class="container page-body"><div class="reading-width"><p class="lead">Pour signaler une information à corriger, proposer une précision ou poser une question sur DomoKlub, écrivez à <a class="text-link" href="mailto:contact@lafabriqueducode.fr">contact@lafabriqueducode.fr <span aria-hidden="true">↗</span></a>.</p><p>Indiquez l’adresse de la page concernée et, si possible, une source qui permet de vérifier votre demande. Aucun formulaire ni compte lecteur n’est actif sur ce site.</p><p>Pour comprendre nos critères de publication, consultez notre <NuxtLink to="/methodologie" class="text-link">méthodologie <span aria-hidden="true">↗</span></NuxtLink>.</p></div></div></div></template>
