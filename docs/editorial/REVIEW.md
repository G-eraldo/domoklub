# Validation éditoriale de lancement

Responsable de publication : Gérald François. Préparé et approuvé par
l’éditeur le 17 novembre 2026. Les contenus ont été rédigés à partir des documentations
citées et n’ont pas été testés sur le matériel.

## Guides à relire

| URL | Intention | Sources principales | Statut |
| --- | --- | --- | --- |
| `/guides/demarrer-home-assistant-green` | Préparer et commencer avec Green | Home Assistant Green, installation, Matter | `approved` |
| `/guides/choisir-coordinateur-zigbee-home-assistant` | Choisir un coordinateur | Home Assistant Zigbee/ZHA/ZBT-2, SONOFF, Zigbee2MQTT | `approved` |
| `/guides/matter-thread-zigbee-differences` | Comprendre les protocoles | Home Assistant Matter/Thread/Zigbee | `approved` |

## Fiches à relire

| URL | Nature | Lien communiqué | Statut |
| --- | --- | --- | --- |
| `/produits/home-assistant-green` | Fiche documentaire, non testée | Domadoo `domid=159` | `approved` |
| `/produits/home-assistant-connect-zbt-2` | Fiche documentaire, non testée | Domadoo `domid=159` | `approved` |
| `/produits/sonoff-dongle-pp10` | Fiche documentaire, non testée | Domadoo `domid=159` | `approved` |

## Avant d’approuver

1. Lire chaque guide et chaque fiche affichés dans la prévisualisation ;
   corriger les formulations, sources et limites inexactes.
2. Vérifier sur les pages des fabricants les points techniques sensibles :
   Green sans radio Zigbee intégrée, ZBT-2 dédié à Zigbee **ou** Thread,
   configuration et firmware du Dongle-PP10.
3. Vérifier les trois URLs Domadoo et l’attribution du paramètre `domid=159`
   dans le compte partenaire. Vérifier les règles du programme, la disponibilité
   et les conditions d’utilisation des liens. Green est signalé en rupture
   temporaire sur la page marchande consultée le 17 novembre.
4. Valider identité, SIRET, responsable de publication, adresse, contact,
   hébergeur et politique de confidentialité. Le SIREN, l’immatriculation R.C.S., l’adresse, le responsable et le contact
   figurent sur lafabriqueducode.fr/mentions-legales ; le SIRET complet a été
   trouvé dans les mentions d’un site client. L’éditeur doit confirmer leur
   usage pour DomoKlub.
5. Contrôler les titres, les intentions et la concurrence dans les résultats
   de recherche français ; les mots-clés ne sont pas des volumes mesurés.
6. Passer **individuellement** les objets approuvés de `review` à `approved`
   dans `apps/web/server/content/launch.js`. Ajouter `publishedAt` aux guides
   approuvés et mettre `updatedAt` à la date de vérification. Ne jamais marquer
   un test matériel sans protocole et observations réels.
7. Construire, contrôler les routes, le sitemap et `robots.txt` en mode live,
   puis mettre `NUXT_PUBLIC_SITE_LIVE=true` dans Dokploy et redéployer.

## Maintenance

Les offres locales expirent le 24 novembre 2026 à 10 h, heure de Paris. Une
révision doit confirmer le lien, le marchand et les règles avant de repousser
`checkedAt` et `expiresAt`. Les caractéristiques peuvent changer avec les
versions : revoir leurs sources lors des mises à jour éditoriales.

Validation de l’éditeur reçue dans la conversation le 17 novembre 2026 pour les trois guides, les trois fiches, les liens Domadoo et les mentions légales.
