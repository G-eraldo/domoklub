<script setup>
import { canonicalPath, publicRobots } from '~/data/site.js'
definePageMeta({ layout: 'default' })

const description = 'La newsletter DomoKlub : nouveaux guides Home Assistant et Zigbee, comparatifs et retours d’usage, un ou deux e-mails par mois et désinscription en un clic.'
useSeoMeta({ title: 'Newsletter domotique Home Assistant · DomoKlub', description, ogTitle: 'Newsletter · DomoKlub', ogDescription: description, robots: publicRobots() })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/newsletter') }] })
</script>

<template>
  <div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Newsletter</span></nav><span class="eyebrow">Garder les bons repères</span><h1>La domotique, en clair<br>dans votre boîte mail<span style="color:var(--orange)">.</span></h1><p>Les nouveaux guides et retours d’usage, sans bruit.</p></div></header><div class="container page-body"><div class="reading-width"><h2>Ce que vous recevrez</h2><ul><li>Les nouveaux guides Home Assistant, Zigbee et Matter dès leur publication.</li><li>Les retours d’usage sur le matériel que j’installe chez moi, avec leurs limites.</li><li>Pas plus d’un ou deux messages par mois, sans revente de votre adresse.</li></ul><NewsletterForm /><p class="status-line" style="margin-top:1rem">Un e-mail de bienvenue confirme votre inscription. Chaque newsletter contient un lien de désinscription.</p></div></div></div>
</template>
