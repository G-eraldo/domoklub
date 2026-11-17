<script setup>
defineProps({ topic: { type: Object, required: true } })
</script>

<template>
  <NuxtLink :to="`/themes/${topic.slug}`" class="topic-card" :class="`topic-${topic.accent}`">
    <span class="topic-top"><span class="topic-mark" aria-hidden="true">{{ topic.short }}</span><span class="topic-number">{{ topic.number }} / 06</span></span>
    <span class="topic-bottom"><span><strong>{{ topic.name }}</strong><small>{{ topic.description }}</small></span><span class="round-arrow" aria-hidden="true">↗</span></span>
  </NuxtLink>
</template>
