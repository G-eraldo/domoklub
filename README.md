# DomoKlub

Site Nuxt 4 d’affiliation éditoriale consacré à la maison connectée. Le projet
contient une version de lancement **approuvée par l’éditeur**, prévisualisable
par défaut : trois guides sourcés, trois fiches produits documentaires et trois liens Domadoo transmis
par l’éditeur. Aucun produit n’est présenté comme testé ; aucun prix n’est
publié.

## Démarrer localement

Prérequis : Node.js 24 et pnpm 11.

```sh
pnpm install --frozen-lockfile
npm run dev
```

Le site est servi sur l’adresse indiquée par Nuxt, généralement
`http://localhost:3000`. Pour la version de production locale :

```sh
npm run build
npm run preview
```

## Contenus et validation

Les contenus de lancement sont dans
`apps/web/server/content/launch.js`. Ils portent désormais
`editorialStatus: 'approved'` après la validation du propriétaire le
17 novembre 2026. En prévisualisation (`NUXT_PUBLIC_SITE_LIVE=false`), les
pages sont `noindex`, `robots.txt` interdit l’exploration et le sitemap est
vide. **Quand `NUXT_PUBLIC_SITE_LIVE=true`, seuls les contenus et offres
`approved` restent accessibles.** Les futurs brouillons en `review` ne seront
pas exposés en mode public.

Pour chaque nouveau contenu ou changement substantiel, le responsable de
publication doit relire les faits, sources, liens marchands, limites et
mentions, puis approuver la version concernée. La procédure est dans
`docs/editorial/REVIEW.md`. Les offres ont une expiration
au 24 novembre 2026 ; leur validité doit être revue avant cette date.

Le lien Home Assistant Green mène actuellement à une fiche Domadoo signalant
une rupture temporaire. Le site ne garantit pas la disponibilité et ne donne
aucun prix. Les liens affiliés portent `rel="sponsored"`.

## Architecture

- `apps/web/app/` : pages Nuxt, navigation, design, SEO.
- `apps/web/server/content/launch.js` : contenus de démarrage validables.
- `apps/web/server/api/public/` : données filtrées et recherche.
- `apps/web/server/utils/content.js` : lecture du catalogue local ou de Strapi,
  si `NUXT_STRAPI_URL` est configurée.
- `docs/seo/` : application de la formation SEO et hypothèses éditoriales.
- `docs/deploy/DOKPLOY.md` : déploiement Docker sur Dokploy/IONOS.

Le CMS Strapi 5 reste une phase suivante. Il servira à rédiger, sourcer,
approuver et tenir à jour contenus et offres sans modifier le code. La formation
SEO fournie traite de stratégie, rédaction, technique et affiliation ; elle
n’impose pas un produit CMS. La présente version permet un lancement éditorial
sans attendre l’administration Strapi.

## Déploiement

Un `Dockerfile` et l’archive
`/Users/geraldo/Developer/domoklub-deploy-2026-11-17.zip` préparent
l’import direct dans Dokploy. Réglez dans Dokploy :

```text
NUXT_PUBLIC_SITE_URL=https://domoklub.fr
NUXT_PUBLIC_SITE_LIVE=false
```

N’utilisez `true` qu’après la recette du domaine et du déploiement ; la revue
initiale des contenus et mentions a été validée le 17 novembre 2026. Aucune clé partenaire n’est requise pour les
liens Domadoo déjà fournis. Ne placez jamais de secret dans le dépôt.

Un site d’affiliation ne garantit ni trafic, ni achat, ni revenu. Le suivi réel
nécessitera Search Console et les rapports du programme partenaire.
