# DomoKlub — plan de travail

- [x] Inspecter le cahier des charges et inventorier les supports SEO présents.
- [x] Documenter les enseignements SEO consultés et leurs conséquences concrètes.
- [x] Construire le site public Nuxt 4 : design, navigation, pages, états vides et SEO technique.
- [x] Brancher une lecture serveur de contenus approuvés, avec erreurs explicites.
- [x] Vérifier le build, les routes et le rendu dans le navigateur disponible.
- [x] Documenter les dépendances restantes avant monétisation et ouverture publique.

## Limites de cette unité

Le cahier décrit un programme de plusieurs phases (CMS, moteur de recherche, n8n,
newsletter, publicités, exploitation). Cette unité rend la partie publique
inspectable et testable sans inventer des contenus, prix, tests ni revenus.

## Dépendances relevées avant réception des informations de lancement

- Créer le CMS Strapi 5 et son circuit d'approbation vérifié, puis raccorder le
  site à une API privée de lecture.
- Renseigner identité de l’éditeur, hébergeur, contact et politique RGPD réels : coordonnées reçues et pages approuvées le 17 novembre.
- Obtenir les accès et règles contractuelles des programmes partenaires : liens Domadoo reçus, contrat et attribution à vérifier par l’éditeur.
- Produire et faire approuver les premiers contenus et fiches produits sourcés : trois guides et trois fiches approuvés le 17 novembre.
- Tester les comparaisons réelles, la newsletter, les publicités et l'ouverture.

## Livraison du 17 novembre — contenus et ouverture

- [x] Rédiger trois guides sourcés à intentions distinctes et trois fiches produits documentaires.
- [x] Intégrer les contenus en mode de prévisualisation, avec validation humaine requise avant indexation.
- [x] Ajouter les trois liens Domadoo communiqués, avec expiration et sans prix affiché.
- [x] Renseigner les coordonnées fournies et les pages de contact.
- [x] Faire confirmer par l’éditeur le SIRET, le responsable de publication et les mentions légales avant ouverture.
- [x] Vérifier le build, les API, 22 liens internes, les pages, les trois liens marchands et les garde-fous d'indexation.
- [x] Après approbation humaine, passer les contenus et offres validés en `approved` et ajouter les dates de publication.
- [x] Vérifier le mode live après compilation finale : neuf pages indexables, douze URL dans le sitemap, trois offres, pages légales et API de santé.
- [x] Documenter le chemin de déploiement Dokploy/IONOS et la procédure de publication.

## Avant l’ouverture du domaine

- [ ] Acheter `domoklub.fr` (non encore acheté au 17 novembre), puis pointer le DNS vers le VPS IONOS.
- [ ] Importer l’archive ZIP dans Dokploy, configurer le domaine/HTTPS et contrôler le site sur le VPS.
- [ ] Passer `NUXT_PUBLIC_SITE_LIVE=true` dans Dokploy après la recette sur le domaine.
