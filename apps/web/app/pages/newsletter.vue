<script setup>
import { canonicalPath, publicRobots } from '~/data/site.js'
definePageMeta({ layout: 'default' })

const route = useRoute()
const statusMessages = {
  confirme: { type: 'ok', text: 'Inscription confirmée. Merci ! Vous recevrez les prochaines nouveautés de DomoKlub.' },
  'lien-invalide': { type: 'error', text: 'Ce lien de confirmation est invalide ou a expiré (7 jours). Inscrivez-vous à nouveau ci-dessous.' },
  erreur: { type: 'error', text: 'La confirmation n’a pas pu être enregistrée. Réessayez dans quelques minutes.' },
  indisponible: { type: 'error', text: 'Les inscriptions sont momentanément fermées.' }
}
const statusMessage = computed(() => statusMessages[String(route.query.statut || '')])
const defaultRobots = publicRobots()
const description = 'La newsletter DomoKlub : nouveaux guides Home Assistant et Zigbee, comparatifs et retours d’usage, avec double confirmation et désinscription en un clic.'
useSeoMeta({ title: 'Newsletter domotique Home Assistant · DomoKlub', description, ogTitle: 'Newsletter · DomoKlub', ogDescription: description, robots: computed(() => route.query.statut ? 'noindex,follow' : defaultRobots) })
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/newsletter') }] })
</script>

<template>
  <div><header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Fil d’Ariane"><NuxtLink to="/">Accueil</NuxtLink><span class="separator">/</span><span aria-current="page">Newsletter</span></nav><span class="eyebrow">Garder les bons repères</span><h1>La domotique, en clair<br>dans votre boîte mail<span style="color:var(--orange)">.</span></h1><p>Les nouveaux guides et retours d’usage, sans bruit.</p></div></header><div class="container page-body"><div class="reading-width"><p v-if="statusMessage" class="notice" :role="statusMessage.type === 'ok' ? 'status' : 'alert'">{{ statusMessage.text }}</p><h2>Ce que vous recevrez</h2><ul><li>Les nouveaux guides Home Assistant, Zigbee et Matter dès leur publication.</li><li>Les retours d’usage sur le matériel que j’installe chez moi, avec leurs limites.</li><li>Pas plus d’un ou deux messages par mois, sans revente de votre adresse.</li></ul><NewsletterForm /><p class="status-line" style="margin-top:1rem">Double confirmation : votre inscription n’est enregistrée qu’après le clic dans l’e-mail de confirmation.</p></div></div></div>
</template>
