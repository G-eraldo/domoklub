# ADR 0001 — Site public de préparation

Date : 17 novembre 2026. Statut : préparation initiale, remplacée pour le lancement par l’ADR 0002.

L’ADR 0002 autorise désormais les contenus locaux approuvés et prévaut sur
la condition initiale d’attendre Strapi pour ouvrir le site.

## Contexte

Le cahier des charges prévoit un média Nuxt/Strapi avec publication validée par
un humain. Les supports SEO sont présents, mais aucun contenu, compte marchand,
identité légale ou API de production n'a été fourni.

## Décision

Créer le site public Nuxt 4 avec Tailwind 4, sans contenu de démonstration
indexable. Les pages lisent une API Nuxt côté serveur. Cette API ne renvoie que
des documents Strapi `status=published` et `approvalState=approved` ; si
`NUXT_STRAPI_URL` n'est pas configuré, elle renvoie une liste vide. Le jeton de lecture
`NUXT_STRAPI_TOKEN` reste côté serveur. Une panne du CMS
configuré produit une erreur explicite.

Champs attendus d'`Article` : `title`, `slug`, `type`, `topic`, `excerpt`,
`body` (texte), `sources` (liste URL/libellé), `approvalState`, dates de
publication et modification. Les valeurs de `type` sont `test`, `guide`,
`tutorial`, `comparison`, `deal`.

Champs attendus de `Product` : `name`, `slug`, `brand`, `category`, `summary`,
`evidenceLevel`, `testEvidenceApproved`, `personalReview`, `specs`, `compatibilities`,
`approvalState`, date de modification. Les valeurs `specs` et
`compatibilities` exigent chacune une source HTTPS et une date de vérification ;
les entrées incomplètes sont omises. Le statut « testé » n'est exposé que si
`evidenceLevel=tested` **et** `testEvidenceApproved=true` ; le futur CMS doit
exiger un retour d’usage de première main approuvé, avec auteur, contexte,
observations et limites, pour ce dernier champ. Un test comparatif complet
exigerait en plus un protocole reproductible.

L'API de comparaison vérifie les identifiants, l'unicité, le nombre (2–4) et
une catégorie identique côté serveur. La comparaison libre reste `noindex`.
La recherche actuelle est une recherche simple Strapi, sans promesse de
tolérance aux fautes ; Meilisearch reste une décision ultérieure.

Champs attendus d'`Offer` : `merchantName`, `url`, `productDocumentId`,
`active`, `checkedAt`, `expiresAt`, `approvalState`. Le lien n'est affiché que
si le document est publié/approuvé, actif, avec une URL HTTPS directe et une
date d'expiration future. Aucun prix n'est affiché à ce stade. Le lien porte
`rel="sponsored noopener noreferrer"` et une mention visible.

## Conséquences

Le front est consultable immédiatement et ne montre aucune donnée inventée.
Le CMS doit être créé et testé avant d'activer les contenus. Les schémas Strapi
et l'administration ne sont pas maquettés comme opérationnels. Aucun prix ou
lien marchand n'est affiché tant que les contrats et règles de fraîcheur ne
sont pas définis.
