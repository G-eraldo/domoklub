# ADR 0002 — Contenus locaux pour l’ouverture éditoriale

Date : 17 novembre 2026. Statut : décidé pour le lancement initial.

## Contexte

L’ADR 0001 préparait le site public Nuxt pour Strapi 5, sans contenu. L’éditeur
a demandé une mise en ligne possible le même jour et a transmis trois liens
Domadoo, son hébergement Dokploy/IONOS et ses coordonnées professionnelles.
Un CMS complet avec base, rôles et approbations ne peut être considéré comme
opérationnel sans installation, comptes et recette propres.

## Décision

Ajouter dans `apps/web/server/content/launch.js` trois guides et trois fiches
sourcées, plus trois offres sans prix. Chaque objet porte `editorialStatus`.
En mode prévisualisation (`NUXT_PUBLIC_SITE_LIVE=false`), les objets `review`
sont visibles pour relecture et les pages restent `noindex`. En mode live,
seuls les objets `approved` sont renvoyés. L’API Strapi reste prioritaire si
`NUXT_STRAPI_URL` est configurée ; le catalogue local prend le relais lorsque
cette variable est vide.

Cette décision permet une ouverture éditoriale contrôlée sans simuler un CMS.
Les contenus ne deviennent pas publiés par le seul déploiement. L’approbation
humaine doit porter sur le texte, les sources, les liens et les mentions.

## Conséquences

La mise à jour demande pour l’instant une modification de fichier et un
redéploiement. Strapi 5 reste nécessaire pour éditer, relire et publier depuis
une interface, gérer les rôles et maintenir les offres à grande échelle.
Le circuit local est volontairement petit et inspectable ; il n’est pas un
substitut à une administration multi-utilisateur. Les offres expirent et sont
masquées automatiquement après leur date limite.
