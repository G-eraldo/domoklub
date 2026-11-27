# Leçons durables

- Quand des photos produit sont demandées, utiliser des visuels authentiques des références exactes et vérifier leur provenance et leur droit de réutilisation avant intégration.
- Aligner le guide de déploiement sur le flux GitHub choisi par l’utilisateur dès que ce choix est connu.
- Ne jamais supposer qu’un accord donné pour un lot d’images couvre un nouveau lot : demander explicitement, et distinguer « image trouvable en ligne » de « droit de réutilisation ».
- Nuxt : ne jamais appeler `useRuntimeConfig()` (donc `canonicalPath`, `publicRobots`, `isSiteLive`) dans un `computed` ou un `useHead(() => …)` ; précalculer la valeur dans le setup, sinon erreur 500 « nuxt instance unavailable ».
