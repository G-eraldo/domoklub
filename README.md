# DomoKlub

Site Nuxt 4 d’affiliation éditoriale consacré à la maison connectée. La
version actuelle contient cinq guides sourcés, trois fiches produits
documentaires et huit avis d’usage personnel attribués à Gérald François.
Les fiches ont une photo produit Domadoo (droits à confirmer, voir `docs/editorial/ASSETS.md`) et un lien affilié
fourni par l’éditeur. Les huit avis d’usage personnels précisent leur contexte
et leurs limites, sans note chiffrée ; aucun prix n’est publié.

## Démarrer localement

Prérequis : Node.js 24 et pnpm 11.

```sh
pnpm install --frozen-lockfile
npm run dev
```

Pour vérifier les offres, compiler puis contrôler le HTML SEO :

```sh
npm run check:offers
npm run build
npm run check:seo
npm run preview
```

## Contenus et validation

Les contenus de lancement sont dans
`apps/web/server/content/launch.js`. Ils portent
`editorialStatus: 'approved'` après la validation du propriétaire le
17 novembre 2026. En prévisualisation (`NUXT_PUBLIC_SITE_LIVE=false`),
les pages sont `noindex`, `robots.txt` interdit l’exploration et le sitemap
est vide. Quand `NUXT_PUBLIC_SITE_LIVE=true`, seuls les contenus et offres
`approved` restent accessibles. Les futurs brouillons en `review` ne seront
pas exposés en mode public.

Pour chaque nouveau contenu ou changement substantiel, le responsable de
publication doit relire faits, sources, liens marchands, limites et mentions.
La procédure est dans `docs/editorial/REVIEW.md`. Les offres actuelles
expirent le 17 mai 2027 ; une vérification mensuelle reste nécessaire.
GitHub Actions vérifie les offres, compile le site et contrôle son HTML SEO
sur chaque push et chaque lundi.

Les photos des onze produits proviennent des fiches Domadoo fournies par
l’éditeur. Leur droit de réutilisation reste à confirmer (voir `docs/editorial/ASSETS.md`).
Leurs URLs sources figurent dans `docs/editorial/ASSETS.md`.

Le lien Home Assistant Green menait lors du contrôle initial à une fiche
Domadoo signalant une rupture temporaire. La disponibilité peut changer ;
le site ne la garantit pas et ne donne aucun prix.

## Architecture

- `apps/web/app/` : pages Nuxt, navigation, design, SEO.
- `apps/web/public/products/` : photos des onze produits.
- `apps/web/server/content/launch.js` : contenus de démarrage approuvés.
- `apps/web/server/api/public/` : données filtrées et recherche.
- `apps/web/server/utils/content.js` : catalogue local ; adaptateur Strapi
  prévu si `NUXT_STRAPI_URL` est configurée.
- `docs/seo/` : application de la formation SEO, hypothèses éditoriales et
  plan de travail sur 90 jours.
- `docs/deploy/DOKPLOY.md` : déploiement GitHub → Dokploy → IONOS.

Le CMS Strapi 5 est une phase ultérieure. Il servira lorsque les contenus et
offres devront être rédigés, approuvés et mis à jour depuis une interface
sans modifier le code. La formation SEO fournie traite de stratégie,
rédaction, technique et affiliation ; elle ne met pas en place un CMS.
Pour le lancement avec cinq guides et onze produits, les modifications
passent par GitHub et déclenchent un nouveau déploiement.

## Déploiement

Le dépôt Git est connecté à
`https://github.com/G-eraldo/domoklub.git` sur `main`. La configuration
Dokploy est détaillée dans `docs/deploy/DOKPLOY.md`. Ne placer aucun secret
dans le dépôt. Les variables de mise en ligne sont à configurer dans
Dokploy :

```text
NUXT_PUBLIC_SITE_URL=https://domoklub.fr
NUXT_PUBLIC_SITE_LIVE=true
```

Utiliser `false` et le domaine provisoire Dokploy pour la recette. Le nom
`domoklub.fr` n’était pas encore acheté au 17 novembre 2026. Aucun accès
Dokploy/VPS n’est stocké dans le projet. Aucun commit ou push des changements
courants n’a été effectué par Codex.

Un site d’affiliation ne garantit ni trafic, ni achat, ni revenu. Le suivi
réel nécessite Search Console et les rapports du programme partenaire.

Le suivi des critères de la formation SEO est dans [`docs/seo/CHECKLIST_FORMATION_2026-11-17.md`](docs/seo/CHECKLIST_FORMATION_2026-11-17.md). `check:seo` démarre le serveur de production compilé et vérifie les pages SSR en mode indexable.
