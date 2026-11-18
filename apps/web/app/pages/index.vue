<script setup>
import { topics, canonicalPath, publicRobots } from '~/data/site.js'

definePageMeta({ layout: 'default' })

const description = 'DomoKlub aide à choisir sa maison connectée avec des guides sourcés et des fiches produits documentaires sur Home Assistant, Zigbee et Matter.'
const { data: guideData, pending: guidesPending, error: guidesError } = await useAsyncData('home-guides', () => $fetch('/api/public/articles', { query: { type: 'guide' } }))
const featuredGuides = computed(() => guideData.value?.items?.slice(0, 3) || [])
const { data: productData, pending: productsPending, error: productsError } = await useAsyncData('home-products', () => $fetch('/api/public/products'))
const featuredProducts = computed(() => productData.value?.items?.slice(0, 3) || [])
useSeoMeta({
  title: 'DomoKlub · La maison connectée, simplement',
  description,
  ogTitle: 'DomoKlub · La maison connectée, simplement',
  ogDescription: description,
  ogType: 'website',
  robots: publicRobots()
})
useHead({ link: [{ rel: 'canonical', href: canonicalPath('/') }] })

const formats = [
  { number: '01', name: 'Guides', description: 'Comprendre les protocoles et choisir son premier équipement.', to: '/guides' },
  { number: '02', name: 'Produits', description: 'Lire des fiches sourcées, avec leurs limites et liens marchands.', to: '/produits' },
  { number: '03', name: 'Comparateur', description: 'Mettre côte à côte les caractéristiques documentées.', to: '/comparer' }
]
</script>

<template>
  <div>
    <section class="hero" aria-labelledby="home-heading">
      <div class="container hero-inner">
        <div class="hero-text">
          <span class="eyebrow">La domotique en toute clarté</span>
          <h1 id="home-heading" class="display">Une maison <span class="soft">plus intelligente.</span><br><span class="accent">Des choix plus simples.</span></h1>
          <p class="hero-lead">Comprendre les technologies, comparer ce qui compte et avancer à votre rythme. DomoKlub rassemble des repères clairs pour construire une maison connectée qui vous ressemble.</p>
          <div class="hero-actions">
            <NuxtLink to="#guides" class="button button-primary">Lire les guides <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></NuxtLink>
            <NuxtLink to="/methodologie" class="button button-outline">Notre méthode <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></NuxtLink>
          </div>
          <div class="hero-trust" aria-label="Engagements éditoriaux"><span>Sources visibles</span><span>Avis personnels contextualisés</span><span>Affiliation signalée</span></div>
        </div>
        <div class="hero-visual">
          <div class="visual-glow" aria-hidden="true" />
          <div class="visual-ring" aria-hidden="true" />
          <NuxtLink class="house-card hero-product-card" to="/produits/home-assistant-green" aria-label="Voir la fiche Home Assistant Green">
            <img src="/products/home-assistant-green.jpg" alt="Home Assistant Green avec sa boîte" width="800" height="800" fetchpriority="high">
          </NuxtLink>
          <div class="scene-chip top" aria-hidden="true"><span class="chip-icon">✳</span><span>Éclairage<small>Une ambiance à votre rythme</small></span></div>
          <div class="scene-chip left" aria-hidden="true"><span class="chip-icon">⌁</span><span>Énergie<small>Des usages plus lisibles</small></span></div>
          <div class="scene-chip bottom" aria-hidden="true"><span class="chip-icon">◇</span><span>Sécurité<small>Garder le contrôle</small></span></div>
        </div>
      </div>
    </section>

    <section id="themes" class="section topics-section" aria-labelledby="topics-heading">
      <div class="container">
        <div class="section-header"><div><span class="eyebrow">Les grands sujets</span><h2 id="topics-heading" class="section-heading" style="margin-top:1rem">Commencer par le bon sujet.</h2><p class="section-copy">Un chemin clair dans un univers qui change vite. Choisissez le sujet qui répond à votre question du moment.</p></div><NuxtLink to="/recherche" class="text-link">Rechercher sur le site <span aria-hidden="true">↗</span></NuxtLink></div>
        <div class="topic-grid"><TopicCard v-for="topic in topics.slice(0, 3)" :key="topic.slug" :topic="topic" /></div>
      </div>
    </section>

    <section id="guides" class="section featured-section" aria-labelledby="featured-heading"><div class="container"><div class="section-header"><div><span class="eyebrow">Premiers repères</span><h2 id="featured-heading" class="section-heading" style="margin-top:1rem">Des guides pour commencer.</h2><p class="section-copy">Installer Home Assistant et Zigbee2MQTT, puis choisir le matériel adapté à votre réseau.</p></div><NuxtLink to="/guides" class="text-link">Tous les guides <span aria-hidden="true">↗</span></NuxtLink></div><p v-if="guidesPending" role="status">Chargement des guides…</p><p v-else-if="guidesError" class="notice" role="alert">Les guides sont temporairement indisponibles.</p><div v-else-if="featuredGuides.length" class="article-grid"><ArticleCard v-for="article in featuredGuides" :key="article.id || article.slug" :article="article" /></div><EmptyState v-else title="Les guides sont en préparation" /></div></section>

    <section class="section featured-products-section" aria-labelledby="featured-products-heading"><div class="container"><div class="section-header"><div><span class="eyebrow">Matériel de l’éditeur</span><h2 id="featured-products-heading" class="section-heading" style="margin-top:1rem">Des produits utilisés au quotidien.</h2><p class="section-copy">Les avis personnels de Gérald sont séparés des caractéristiques issues des fabricants. Chaque fiche précise le contexte d’usage, les limites connues et ses sources.</p></div><NuxtLink to="/produits" class="text-link">Toutes les fiches <span aria-hidden="true">↗</span></NuxtLink></div><p v-if="productsPending" role="status">Chargement des produits…</p><p v-else-if="productsError" class="notice" role="alert">Les fiches sont temporairement indisponibles.</p><div v-else-if="featuredProducts.length" class="product-grid"><ProductCard v-for="product in featuredProducts" :key="product.id || product.slug" :product="product" /></div></div></section>

    <section class="section manifesto-section" aria-labelledby="manifesto-heading"><div class="container manifesto-grid"><div><span class="eyebrow">Notre ligne éditoriale</span><h2 id="manifesto-heading" class="section-heading" style="margin-top:1rem">La clarté avant le catalogue.</h2><p class="section-copy">Un bon conseil commence par une vraie question. Nous séparons ce qui a été essayé, ce qui est documenté et ce qui reste à vérifier.</p><p class="manifesto-note">Les retours d’usage personnels précisent le contexte communiqué par l’auteur et les limites de ses observations.</p></div><div class="method-list"><div class="method-row"><span class="number">01</span><div><h3>Comprendre le besoin</h3><p>Identifier l’usage, le contexte et les critères qui changent réellement la décision.</p></div></div><div class="method-row"><span class="number">02</span><div><h3>Vérifier les informations</h3><p>Indiquer les sources, la date et le niveau de preuve de chaque affirmation utile.</p></div></div><div class="method-row"><span class="number">03</span><div><h3>Choisir librement</h3><p>Présenter les limites et alternatives. Un lien affilié ne décide jamais du verdict.</p></div></div><NuxtLink to="/methodologie" class="text-link">Lire notre méthode complète <span aria-hidden="true">↗</span></NuxtLink></div></div></section>

    <section class="section formats-section" aria-labelledby="formats-heading"><div class="container"><div class="section-header"><div><span class="eyebrow">À chaque question son format</span><h2 id="formats-heading" class="section-heading" style="margin-top:1rem">Explorer DomoKlub.</h2><p class="section-copy">De la première idée au choix d’un équipement, avancez avec les contenus qui vous conviennent.</p></div></div><div class="formats-grid"><NuxtLink v-for="format in formats" :key="format.to" :to="format.to" class="format-card"><span class="format-index">{{ format.number }} / 03</span><span class="format-arrow" aria-hidden="true">↗</span><span><h3>{{ format.name }}</h3><p>{{ format.description }}</p></span></NuxtLink></div></div></section>

    <div class="container"><section class="compare-banner" aria-labelledby="compare-heading"><div><span class="eyebrow">Le bon choix, côte à côte</span><h2 id="compare-heading">Comparez ce qui compte vraiment.</h2><p>Placez de deux à quatre produits d’une même catégorie face à face. Les inconnues restent visibles et chaque donnée publiée conserve sa source.</p></div><NuxtLink to="/comparer" class="button button-primary">Ouvrir le comparateur <span aria-hidden="true">↗</span></NuxtLink></section></div>

    <section class="newsletter-teaser" aria-labelledby="newsletter-heading"><div class="container"><span class="eyebrow">La suite, sans le bruit</span><h2 id="newsletter-heading" class="section-heading">Une newsletter pour garder les bons repères.</h2><p class="section-copy">Les contenus validés, les méthodes utiles et les nouveautés éditoriales, une fois le service activé.</p><NuxtLink to="/newsletter" class="button button-outline">En savoir plus <span aria-hidden="true">↗</span></NuxtLink></div></section>
  </div>
</template>
