<script setup>
defineProps({ compact: { type: Boolean, default: false } })
const { data: status } = await useAsyncData('newsletter-status', () => $fetch('/api/newsletter/status'))
const email = ref('')
const consent = ref(false)
const website = ref('')
const state = ref('idle')
const message = ref('')

async function submit() {
  message.value = ''
  if (!consent.value) { state.value = 'error'; message.value = 'Cochez la case de consentement pour vous inscrire.'; return }
  state.value = 'sending'
  try {
    await $fetch('/api/newsletter/subscribe', { method: 'POST', body: { email: email.value, consent: consent.value, website: website.value } })
    state.value = 'sent'
  } catch (error) {
    state.value = 'error'
    message.value = error?.data?.statusMessage || error?.statusMessage || 'L’inscription a échoué. Réessayez plus tard.'
  }
}
</script>

<template>
  <div class="newsletter-form-wrap">
    <p v-if="!status?.enabled" class="notice">Les inscriptions ouvrent très bientôt.</p>
    <p v-else-if="state === 'sent'" class="notice" role="status">Presque fini : un e-mail de confirmation vient de partir. Cliquez sur le lien qu’il contient pour valider votre inscription (pensez à vérifier les indésirables).</p>
    <form v-else class="newsletter-form" :class="{ compact }" @submit.prevent="submit">
      <label class="sr-only" for="newsletter-email">Adresse e-mail</label>
      <div class="newsletter-row">
        <input id="newsletter-email" v-model="email" type="email" required maxlength="320" autocomplete="email" placeholder="votre@email.fr">
        <button class="button button-primary" type="submit" :disabled="state === 'sending'">{{ state === 'sending' ? 'Envoi…' : 'Je m’inscris' }}</button>
      </div>
      <!-- Champ piège anti-robots, masqué aux lecteurs -->
      <input v-model="website" class="newsletter-trap" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <label class="newsletter-consent"><input v-model="consent" type="checkbox" required><span>J’accepte de recevoir la newsletter DomoKlub par e-mail. Désinscription possible à tout moment depuis chaque message. <NuxtLink to="/confidentialite">Données personnelles</NuxtLink>.</span></label>
      <p v-if="message" class="notice" role="alert">{{ message }}</p>
    </form>
  </div>
</template>
