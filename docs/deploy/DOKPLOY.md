# Mise en ligne sur Dokploy / VPS IONOS

Ce dépôt contient un `Dockerfile` pour Nuxt 4 en rendu serveur. Le conteneur
écoute le port 3000 et expose `/api/health` pour la supervision.

## Préparer la source

Le dossier local est `/Users/geraldo/Developer/domoklub`. Une archive prête
à importer est disponible à
`/Users/geraldo/Developer/domoklub-deploy-2026-11-17.zip`. Dokploy accepte
l’import d’un ZIP pour une application. Le projet ne comporte pas de dépôt Git :
le ZIP permet le premier déploiement sans commit ni push.

Le fichier `.dockerignore` exclut `node_modules`, les sorties de build et les
fichiers d’environnement. Ne transférer aucune clé ou donnée personnelle
inutile. Le build Docker utilise Node 24 et pnpm 11.25.0.

## Application Dokploy

1. Créer une application dans Dokploy, choisir le fournisseur « Drag and Drop .zip » et importer l’archive ci-dessus.
2. Choisir le type de build `Dockerfile`, chemin `Dockerfile`, contexte `.` et port interne `3000`.
3. Pour la recette sur le domaine provisoire généré par Dokploy, définir :

   ```text
   NUXT_PUBLIC_SITE_URL=http://<domaine-provisoire-Dokploy>
   NUXT_PUBLIC_SITE_LIVE=false
   ```

   Remplacer la valeur entre chevrons par l’hôte réellement affiché dans Dokploy.
   Le domaine gratuit `sslip.io` de Dokploy fonctionne en HTTP seulement.
4. Déployer, puis vérifier sur ce domaine provisoire `/api/health`, `/guides`,
   une fiche produit, `/robots.txt` et `/sitemap.xml`. Le sitemap doit être
   vide et `robots.txt` doit contenir `Disallow: /`.
5. Après achat de `domoklub.fr`, créer chez le registraire un enregistrement
   `A` pour la racine vers l’IPv4 publique du VPS IONOS. Attendre que le DNS
   pointe vers le VPS **avant** d’ajouter le domaine dans Dokploy. Dans
   l’application Dokploy, créer le domaine avec hôte `domoklub.fr`, chemin
   `/`, port conteneur `3000`, HTTPS activé et certificat Let's Encrypt.
   Pour `www`, créer un `CNAME` vers `domoklub.fr`, puis le domaine et la
   redirection `www` vers l’hôte sans `www` dans Dokploy.
6. Modifier les variables dans Dokploy :

   ```text
   NUXT_PUBLIC_SITE_URL=https://domoklub.fr
   NUXT_PUBLIC_SITE_LIVE=true
   ```

   Les contenus et mentions de lancement ont été approuvés le 17 novembre.
   Redéployer, puis vérifier `https://domoklub.fr/api/health`, les guides,
   fiches et liens affiliés, le sitemap, `robots.txt` et `index,follow`.

Aucun accès Dokploy ni identifiant VPS n’est stocké dans le projet. L’éditeur a confirmé le 17 novembre 2026 que `domoklub.fr` n’est pas encore acheté ; le DNS renvoie `NXDOMAIN`. L’enregistrement du nom reste à faire, sous réserve de sa disponibilité au moment de l’achat. Le certificat HTTPS et le routage du VPS ne
peuvent pas être confirmés depuis le build local.

## Contrôles de lancement

- Les guides et fiches affichent des sources et le niveau de preuve.
- Les liens Domadoo s’ouvrent avec `rel="sponsored noopener noreferrer"`.
- Les prix ne sont pas affichés ; les stocks se vérifient chez le marchand.
- Les pages de recherche et comparaison restent `noindex`.
- Les pages légales affichent les informations confirmées par l’éditeur.
- Les offres expirées disparaissent automatiquement de l’API ; prévoir une
  révision régulière.
