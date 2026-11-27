# Mise en ligne depuis GitHub vers Dokploy / VPS IONOS

Le dépôt Git local est sur la branche `main`, avec `origin` :
`https://github.com/G-eraldo/domoklub.git`. Le `Dockerfile` à la racine
compile Nuxt 4 et lance le serveur sur le port interne `3000`.
`/api/health` répond pour la supervision.

## Publier la version du dépôt

Les changements locaux doivent être enregistrés puis poussés vers `main` par
le propriétaire du dépôt. Aucun secret ne doit être ajouté à GitHub. Le
répertoire `.env`, `node_modules`, `.nuxt` et `.output` sont ignorés.

La vérification GitHub Actions `.github/workflows/site-checks.yml` contrôle
le build et les dates des onze offres sur chaque push et chaque lundi. Elle
ne remplace pas une visite mensuelle des fiches marchandes. Sur un dépôt
public inactif, GitHub peut désactiver les exécutions planifiées après
60 jours ; surveiller l’onglet Actions.

## Configurer l’application Dokploy

1. Connecter GitHub à Dokploy, puis donner accès au dépôt
   `G-eraldo/domoklub`. Créer une application depuis ce dépôt et sélectionner
   la branche `main`, avec chemin de build `/`.
2. Choisir le type de build `Dockerfile`, chemin `Dockerfile`, contexte
   `.` et port interne `3000`.
3. Pour vérifier le site avant l’achat du nom de domaine, générer un domaine
   provisoire dans Dokploy. Définir dans l’onglet des variables :

   ```text
   NUXT_PUBLIC_SITE_URL=http://<domaine-provisoire-Dokploy>
   NUXT_PUBLIC_SITE_LIVE=false
   ```

   Remplacer la valeur entre chevrons par l’hôte réellement fourni. Le
   domaine gratuit `sslip.io` de Dokploy fonctionne en HTTP seulement.
4. Déployer, puis vérifier sur l’hôte provisoire `/api/health`, `/guides`,
   `/produits/home-assistant-green`, les photos, les liens Domadoo,
   `/robots.txt` et `/sitemap.xml`. Le sitemap doit être vide et
   `robots.txt` doit contenir `Disallow: /`.

## Ouvrir domoklub.fr

Le propriétaire a confirmé le 17 novembre 2026 que le domaine n’est pas
encore acheté ; le DNS renvoie `NXDOMAIN`. L’achat reste à faire, sous réserve
de disponibilité chez le registraire.

1. Après achat, créer un enregistrement DNS `A` pour la racine vers l’IPv4
   publique du VPS IONOS. Attendre que le DNS pointe vers le VPS **avant**
   d’ajouter le domaine dans Dokploy.
2. Dans l’application Dokploy, créer le domaine avec hôte
   `domoklub.fr`, chemin `/`, port conteneur `3000`, HTTPS activé et
   certificat Let's Encrypt. Pour `www`, créer un `CNAME` vers
   `domoklub.fr`, puis configurer la redirection vers le domaine sans
   `www` dans Dokploy.
3. Après activation du DNS et du HTTPS, modifier les variables dans
   Dokploy. Activer NUXT_PUBLIC_SITE_LIVE uniquement sur le domaine définitif :

   ```text
   NUXT_PUBLIC_SITE_URL=https://domoklub.fr
   NUXT_PUBLIC_SITE_LIVE=true
   AMAZON_PARTNER_TAG=<votre-identifiant>-21
   ```

4. Redéployer, puis contrôler `https://domoklub.fr/api/health`, les
   guides, fiches, photos et liens marchands, le sitemap, `robots.txt` et
   les balises `index,follow`. Les contenus et mentions de lancement ont été
   approuvés par l’éditeur le 17 novembre 2026.

Avant de considérer l’ouverture terminée, contrôler sur le domaine HTTPS :

- robots.txt contient Allow: / et Sitemap: https://domoklub.fr/sitemap.xml ;
- l’accueil porte index,follow et son canonical est https://domoklub.fr/ ;
- /produits/sonoff-zbdongle-p/ répond 301 vers la version sans slash ;
- le sitemap contient les 21 URL attendues et les trois images WebP répondent 200 ;
- le proxy renvoie Content-Encoding: gzip ou br sur le HTML si le navigateur
  envoie Accept-Encoding: gzip, br. Contrôler aussi HTTP et www.

Le certificat HTTPS et le routage VPS restent à confirmer sur le serveur réel.
Dokploy peut déclencher les déploiements suivants à chaque push GitHub une fois
le fournisseur et le webhook configurés.

## Après ouverture

- Vérifier mensuellement les onze pages Domadoo, l’attribution des liens,
  les disponibilités et les sources techniques.
- Les offres locales expirent le 17 mai 2027. Le contrôle GitHub Actions
  échoue 30 jours avant cette date pour demander une nouvelle revue.
- Soumettre `https://domoklub.fr/sitemap.xml` dans Search Console après
  activation du domaine et suivre les requêtes, clics et conversions réels.
- Les pages de recherche et comparaison restent `noindex`. Aucun prix
  marchand n’est affiché sur DomoKlub.

Avant publication, exécuter `npm run build && npm run check:seo` localement ou vérifier le résultat du workflow GitHub Actions. Après branchement du domaine, refaire les contrôles sur l’URL HTTPS réelle : redirection HTTP et www vers le domaine canonique, sitemap, Search Console, Bing Webmaster Tools et performance mobile.


## Amazon Partenaires

Les liens Amazon sont construits à partir des ASIN de `apps/web/server/content/amazonOffers.js`
et de la variable `AMAZON_PARTNER_TAG` (identifiant se terminant par `-21`). Sans cette
variable, aucun bouton Amazon n'est affiché. Après la mise en ligne, déclarer le domaine
dans le compte Partenaires Amazon (Compte > Sites web et applications).

## Newsletter (Resend)

1. Dans Resend, ajouter et vérifier le domaine `domoklub.fr` (enregistrements DNS chez OVH).
2. Créer une clé API (droit d'envoi + contacts) et, si souhaité, un segment « Newsletter ».
3. Dans Dokploy, définir `RESEND_API_KEY`, `NEWSLETTER_FROM` (ex. `DomoKlub <newsletter@domoklub.fr>`),
   `NEWSLETTER_SECRET` (générer avec `openssl rand -hex 32`) et éventuellement `RESEND_SEGMENT_ID`, puis redéployer.
4. Tant qu'une variable manque, le formulaire affiche « Les inscriptions ouvrent très bientôt ».
5. Envoyer les newsletters depuis Resend (Broadcasts) : le lien de désinscription y est ajouté par Resend.
