<script setup>
defineProps({ title: { type: String, default: 'Les contenus arrivent bientôt' }, description: { type: String, default: 'Chaque publication sera vérifiée avant d’apparaître ici.' } })
</script>

<template>
  <div class="empty-state" role="status">
    <div class="empty-orbit" aria-hidden="true"><span>◈</span></div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <NuxtLink to="/methodologie" class="text-link">Découvrir notre méthode <span aria-hidden="true">↗</span></NuxtLink>
  </div>
</template>
