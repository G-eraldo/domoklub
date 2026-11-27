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

## Pistes après le lancement

- Réévaluer Strapi 5 lorsque la cadence éditoriale ou le nombre de personnes
  qui publient rendra GitHub moins pratique.
- Vérifier chaque mois les pages Domadoo, la disponibilité, les règles du
  programme et les sources techniques.
- Enrichir le cluster Home Assistant avec les nouvelles données de Search
  Console, puis rédiger des guides originaux validés par l’éditeur.
- Tester le matériel avant de publier un avis ou une note. Activer la
  newsletter ou les publicités uniquement avec leurs circuits réels.

## Livraison du 17 novembre — contenus et ouverture

- [x] Rédiger trois guides sourcés à intentions distinctes et trois fiches produits documentaires.
- [x] Intégrer les contenus en mode de prévisualisation, avec validation humaine requise avant indexation.
- [x] Ajouter les trois liens Domadoo communiqués, avec expiration et sans prix affiché.
- [x] Renseigner les coordonnées fournies et les pages de contact.
- [x] Faire confirmer par l’éditeur le SIRET, le responsable de publication et les mentions légales avant ouverture.
- [x] Vérifier le build, les API, 22 liens internes, les pages, les trois liens marchands et les garde-fous d'indexation.
- [x] Après approbation humaine, passer les contenus et offres validés en `approved` et ajouter les dates de publication.
- [x] Vérifier le mode live après compilation finale : neuf pages indexables, douze URL dans le sitemap, trois offres, pages légales et API de santé.
- [x] Documenter le chemin GitHub → Dokploy/IONOS et la procédure de publication.
- [x] Intégrer les trois photos produits réelles autorisées par l’éditeur.
- [x] Ajouter un contrôle GitHub Actions de compilation et d’expiration des offres.
- [x] Définir un plan éditorial et de mesure pour les 90 premiers jours.

## Avant l’ouverture du domaine

- [ ] Acheter `domoklub.fr` (non encore acheté au 17 novembre), puis pointer le DNS vers le VPS IONOS.
- [ ] Pousser les changements de `main` vers GitHub, connecter le dépôt dans Dokploy, configurer le domaine/HTTPS et contrôler le site sur le VPS.
- [ ] Passer `NUXT_PUBLIC_SITE_LIVE=true` dans Dokploy après la recette sur le domaine.

- [ ] Sur le domaine public, vérifier la compression HTML, les redirections et les balises indexables.

## Reprise de la bibliothèque de prompts et des checklists SEO — 17 novembre

- [x] Lire les captures et distinguer les critères utiles des exemples, gabarits et autres modèles économiques.
- [x] Relever les écarts sur le HTML SSR et les six pages de lancement.
- [x] Corriger les titres, la réponse initiale, la transparence commerciale et les données structurées factuelles.
- [x] Ajouter des tableaux de décision sourcés et vérifier le rendu sur une largeur étroite dans le navigateur.
- [x] Documenter l’étude de marché qualitative, les critères de publication et les dépendances sur les données réelles.
- [x] Recompiler et recontrôler l’indexabilité, le maillage, les liens affiliés et les pages.

## Huit produits utilisés par l’éditeur — fiches et tests

- [x] Vérifier les huit références exactes, documentations fabricant, compatibilités et liens Domadoo.
- [x] Rassembler les huit photos produit autorisées et enregistrer leur provenance.
- [x] Rédiger huit fiches sourcées et des retours d’usage limités aux observations transmises par l’éditeur.
- [x] Intégrer les pages et offres approuvées après réception des notes personnelles de l’éditeur.
- [x] Vérifier le build, les quatorze pages, les liens, les balises SEO et le rendu du catalogue et d’une fiche.
- [x] Publier les huit notes 5/5 attribuées à l’éditeur, sans moyenne ni mesure inventée.

## Avis Openbot — 18 novembre
- [x] Rediriger les URL avec slash final et vérifier le code HTTP.
- [x] Corriger les promesses de test et retirer les huit notes chiffrées sans nouvelle évaluation.
- [x] Optimiser les trois visuels PNG et vérifier le rendu.
- [x] Actualiser la carte des routes et la procédure de mise en ligne.
- [x] Recompiler et contrôler le SEO SSR, les offres et les images.
- [x] Ouvrir les onze liens Domadoo dans un navigateur et vérifier les fiches correspondantes.

## Guides Home Assistant et Zigbee2MQTT — 18 novembre

- [x] Vérifier les méthodes d’installation et la mise en route dans les documentations officielles.
- [x] Ajouter deux guides complets et les relier aux guides et produits existants.
- [x] Vérifier la compilation, le contenu rendu, les liens internes et les contrôles SEO.

## Audit avant lancement — 27 novembre

- [x] Page 404/erreur HTML avec navigation (avant : page Nuxt brute sans lien interne).
- [x] Balises Open Graph globales (site_name, locale, url, image 1200 × 630 `og-default.jpg`, twitter:card).
- [x] Fil d'Ariane `BreadcrumbList` sur guides et fiches ; image et langue dans `Article`.
- [x] Guides : produits liés affichés en cartes avec photo (avant : libellés codés en dur, slug brut pour les produits non listés).
- [x] Fiches : bloc « même catégorie » + lien vers le comparateur pré-rempli (les fiches n'étaient liées que depuis le catalogue).
- [x] Sitemap : pages thème ayant des contenus.
- [x] Mentions légales : retrait de l'avertissement « en cours de vérification ».
- [x] `check:seo` étendu (fil d'Ariane, 404 HTML, image de partage, thèmes au sitemap) : OK.

### Reste à faire (hors code ou décision éditeur)
- [ ] Compression gzip/brotli du HTML et redirection `www` → apex à configurer dans Dokploy/Traefik.
- [ ] Mesure : Search Console + Bing Webmaster, analytics sans cookie (Umami auto-hébergé) et suivi des clics affiliés.
- [ ] Volume de contenu à intention d'achat (comparatifs, « X ou Y », alternatives) et second marchand.

## Amazon et contenus de choix — 27 novembre

- [x] 11 ASIN amazon.fr vérifiés (titre et référence) ; lien construit avec `AMAZON_PARTNER_TAG`.
- [x] Mention obligatoire « Partenaire Amazon » (pied de page, affiliation, fiches, confidentialité).
- [x] 5 contenus sourcés : ZHA ou Zigbee2MQTT, Green/Raspberry Pi/mini PC, interrupteur avec ou sans neutre, portée Zigbee, comparatif modules Zigbee.
- [x] Maillage fiches ↔ nouveaux guides ; rubrique Comparatifs dans le menu ; thème Éclairage alimenté.
- [x] `check:offers` (22 offres) et `check:seo` (21 pages) OK ; rendu vérifié.
- [ ] Relecture éditeur des 5 nouveaux contenus avant `NUXT_PUBLIC_SITE_LIVE=true`.
- [ ] Vérifier que l'ASIN B0F6CJ93GS correspond bien à la variante « G410 Select » achetée.

## Notes personnelles — 27 novembre
- [x] Notes 5/5 attribuées par Gérald à six produits utilisés (ZBDongle-P, MINI-ZBRBS ×12, ZBMINIR2 ×4, ZBMINIL2, NodOn portail, SNZB-04P), motivées et datées ; Orb Socket et G410 sans note.
- [x] Contextes d'usage enrichis depuis l'inventaire Zigbee2MQTT de l'éditeur.
- [x] Balisage Product + Review (sans prix) sur les fiches notées ; `check:seo` vérifie note visible et JSON-LD.
- [x] Relecture des 5 guides du 27/11 faite par l'éditeur.
- [ ] Fiches à créer après identification des modèles : compteur, détecteur garage, lampadaire, télécommande, prises Zigbee.
