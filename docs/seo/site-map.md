# Carte des routes DomoKlub

| Route | Gabarit ou gestionnaire | Indexation en mode live |
| --- | --- | --- |
| / | apps/web/app/pages/index.vue | Oui |
| /guides, /tests, /tutoriels, /comparatifs, /bons-plans | apps/web/app/pages/[section]/index.vue | Seulement si la rubrique contient des articles |
| /guides/:slug et autres rubriques /:section/:slug | apps/web/app/pages/[section]/[slug].vue | Contenus approuvés seulement |
| /produits | apps/web/app/pages/produits/index.vue | Oui si catalogue non vide |
| /produits/:slug | apps/web/app/pages/produits/[slug].vue | Fiches approuvées seulement |
| /themes/:slug | apps/web/app/pages/themes/[slug].vue | Seulement si le thème contient des articles |
| /comparer | apps/web/app/pages/comparer.vue | Non |
| /recherche | apps/web/app/pages/recherche.vue | Non |
| /methodologie | apps/web/app/pages/methodologie.vue | Oui |
| /affiliation | apps/web/app/pages/affiliation.vue | Oui |
| /a-propos | apps/web/app/pages/a-propos.vue | Oui |
| /contact | apps/web/app/pages/contact.vue | Non |
| /mentions-legales | apps/web/app/pages/mentions-legales.vue | Non |
| /confidentialite | apps/web/app/pages/confidentialite.vue | Non |
| /cookies | apps/web/app/pages/cookies.vue | Non |
| /newsletter | apps/web/app/pages/newsletter.vue | Non tant que le service est inactif |
| /robots.txt | apps/web/server/routes/robots.txt.get.js | Piloté par NUXT_PUBLIC_SITE_LIVE |
| /sitemap.xml | apps/web/server/routes/sitemap.xml.get.js | Vide hors mode live |
| /api/public/* | apps/web/server/api/public/*.get.js | Données pour les pages |
| /api/health | apps/web/server/api/health.get.js | Supervision |

Les URL avec slash final, sauf la racine, sont redirigées en 301 par
apps/web/server/middleware/normalize-trailing-slash.js. Le sitemap utilise les
routes canoniques sans slash final. Avant l’ouverture, toutes les pages sont
noindex et robots.txt interdit l’exploration.
