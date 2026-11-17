import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-17',
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: {
    strapiUrl: '',
    strapiToken: '',
    public: {
      siteUrl: 'https://domoklub.fr',
      siteLive: false
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [{ name: 'theme-color', content: '#111827' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  }
})
