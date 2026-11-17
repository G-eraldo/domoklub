<script setup>
import { navigation } from '~/data/site.js'
import { isSiteLive } from '~/data/site.js'

const route = useRoute()
const menuOpen = ref(false)
const siteLive = isSiteLive()
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Aller au contenu</a>
    <div v-if="!siteLive" class="preview-strip">
      <span class="preview-dot" aria-hidden="true" />
      Prévisualisation · Les guides, fiches et liens marchands attendent une validation éditoriale
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <NuxtLink to="/" class="brand" aria-label="DomoKlub, accueil">
          <span class="brand-symbol" aria-hidden="true"><span /></span>
          <span>Domo<span class="brand-accent">Klub</span><span class="brand-period">.</span></span>
        </NuxtLink>
        <nav class="desktop-nav" aria-label="Navigation principale">
          <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to" :aria-current="route.path === item.to ? 'page' : undefined">{{ item.label }}</NuxtLink>
        </nav>
        <div class="header-actions">
          <NuxtLink to="/recherche" class="icon-button search-button" aria-label="Rechercher sur DomoKlub">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.6"/><path d="m16 16 5 5"/></svg>
          </NuxtLink>
          <button class="icon-button menu-button" type="button" :aria-expanded="menuOpen" aria-controls="mobile-navigation" :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'" @click="menuOpen = !menuOpen">
            <svg v-if="!menuOpen" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg>
          </button>
        </div>
      </div>
      <nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="Navigation mobile">
        <NuxtLink v-for="item in navigation" :key="item.to" :to="item.to">{{ item.label }} <span aria-hidden="true">↗</span></NuxtLink>
        <NuxtLink to="/recherche">Rechercher <span aria-hidden="true">↗</span></NuxtLink>
      </nav>
    </header>
    <main id="main-content"><slot /></main>
    <footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-brand">
          <NuxtLink to="/" class="brand" aria-label="DomoKlub, accueil"><span class="brand-symbol" aria-hidden="true"><span /></span><span>Domo<span class="brand-accent">Klub</span><span class="brand-period">.</span></span></NuxtLink>
          <p>La maison connectée, simplement.<br>Des choix éclairés, des sources visibles.</p>
        </div>
        <div class="footer-column"><h2>Explorer</h2><NuxtLink to="/guides">Guides</NuxtLink><NuxtLink to="/produits">Produits</NuxtLink><NuxtLink to="/comparer">Comparer</NuxtLink><NuxtLink to="/themes/zigbee">Zigbee</NuxtLink></div>
        <div class="footer-column"><h2>DomoKlub</h2><NuxtLink to="/methodologie">Méthodologie</NuxtLink><NuxtLink to="/a-propos">À propos</NuxtLink><NuxtLink to="/affiliation">Affiliation</NuxtLink><NuxtLink to="/contact">Contact</NuxtLink></div>
        <div class="footer-column"><h2>Informations</h2><NuxtLink to="/mentions-legales">Mentions légales</NuxtLink><NuxtLink to="/confidentialite">Confidentialité</NuxtLink><NuxtLink to="/cookies">Cookies</NuxtLink><NuxtLink to="/newsletter">Newsletter</NuxtLink></div>
      </div>
      <div class="container footer-bottom"><span>© {{ new Date().getFullYear() }} DomoKlub</span><span>Conçu pour mieux comprendre avant de choisir.</span></div>
    </footer>
  </div>
</template>
