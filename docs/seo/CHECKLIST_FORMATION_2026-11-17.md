# DomoKlub — application des prompts et checklists SEO de la formation

État au 17 novembre 2026. Les six captures fournies par l'éditeur sont des supports de travail : prompts à remplir avec des données réelles et checklists de plusieurs modèles économiques. Ce document suit les points applicables à un média **Nuxt d'affiliation domotique**. Les parcours WordPress, Next.js, achat de sites, vente de leads et recrutement ne sont pas des exigences du projet.

## Verdict de préparation

Le socle technique et commercial de lancement est en place : trois guides, onze fiches approuvées dont huit avis d’usage, onze liens Domadoo, photos produits autorisées, sources, identité, pages de confiance, métadonnées SSR, sitemap, robots et contrôle automatisé. Les avis personnels restent brefs : seules les observations communiquées par l’éditeur sont publiées. Le volume éditorial, la profondeur des essais et la mesure des ventes sont encore insuffisants pour prédire une rentabilité. La publication peut démarrer comme **première version**, puis la valeur du site devra être établie avec des données de recherche, de clic et de commission. Aucune méthode SEO ne garantit un classement ou des revenus.

| Axe du cours | État vérifiable | Écart / action |
| --- | --- | --- |
| Niche, public et offre | Home Assistant / Zigbee / Matter, lecteurs francophones qui choisissent leur matériel ; un programme Domadoo avec onze URL fournies par l'éditeur. | Taux de conversion, second partenaire et coûts d'exploitation non fournis : ne pas produire de prévision chiffrée. |
| SERP et concurrence | Dix formulations examinées qualitativement le 17/11 ; trois pages concurrentes lues. Trois intentions de guides distinctes en ligne. | Vérifier manuellement la SERP française et la saisonnalité avant chaque nouveau contenu. Les résultats observés ne prouvent ni volume ni facilité de classement. |
| Architecture et maillage | Accueil → guides/produits/thèmes ; guides → fiches pertinentes ; fiches → guides ; pages vides hors sitemap. | Trois guides et onze fiches sont publiables. Les guides de choix propres aux nouveaux appareils doivent être ajoutés selon les intentions observées, sans pages redondantes. |
| Preuve éditoriale | Sources fabricant reliées aux faits, date de vérification, tableaux de choix, limites ; trois fiches « non testé » et huit retours personnels dont les notes 5/5 ont été retirées le 18/11 à la demande de révision. Le ZBDongle-P est utilisé depuis juin 2025 avec Zigbee2MQTT ; la G410 a été utilisée avec HomeKit et une limite locale de liaison vers 10 m est signalée. | Aucun essai des Green, ZBT-2, PP10. Pas de photos personnelles ni de mesures normalisées ; les huit avis restent des observations individuelles et non des comparatifs. |
| SEO on-page et GEO | Réponse dès l'introduction, titles uniques de moins de 60 caractères sur les quatorze pages, descriptions, un H1, canonicals, dates, Article JSON-LD pour les guides, Organization/Person cohérents. | Les notes personnelles sont visibles dans le HTML mais aucun balisage `Review` ou `AggregateRating` n’est ajouté. Mesurer l'affichage réel dans Search Console après indexation. |
| Technique | Nuxt SSR, 404 réel, photos produits 800 × 800, `alt`, robots/sitemap conditionnés au mode live, `lastmod` sur les contenus. `npm run check:seo` vérifie le HTML SSR et le service des images. | Acheter le domaine, tester HTTPS et redirections HTTP/www sur Dokploy, puis Lighthouse mobile et données réelles de Core Web Vitals. |
| Transparence et conversion | Signalement de l'affiliation avant le premier lien ; liens `rel="sponsored"`, CTA haut de fiche, autre CTA dans les offres, pas de prix non vérifié. | Vérifier l'attribution Domadoo dans le compte partenaire et ajouter un second marchand seulement après accord et lien réel. |
| Exploitation | Contrôle hebdomadaire GitHub Actions de compilation, SEO SSR et expiration des offres ; plan 90 jours. | Connecter Search Console et Bing Webmaster Tools après domaine, sauvegardes VPS, surveillance disponibilité et contrôle mensuel des sources/stocks. |

Les recommandations de Google qui fondent les choix techniques sont : [contenu utile et original](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [avis de qualité et preuve de première main](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews), [liens sponsorisés](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links), [Article structuré](https://developers.google.com/search/docs/appearance/structured-data/article), [conditions des extraits Produit](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) et [URLs canoniques](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Requêtes examinées, sans volumes ni classement revendiqué

Observation qualitative des résultats accessibles le 17/11/2026. Les pages concurrentes citées servent à constater des formats et angles, pas à reprendre leurs chiffres ou leurs affirmations techniques.

| Formulation | Intention observée | Page DomoKlub / décision |
| --- | --- | --- |
| Home Assistant Green installation | Procédure officielle et démarrage | Guide de démarrage publié ; une procédure illustrée sur matériel réel attend un essai. |
| Home Assistant Green Zigbee intégré | Vérifier la radio et l'achat utile | Guide Green + fiche Green ; réponse immédiate : radio séparée pour réseau Zigbee direct. |
| Home Assistant Green avis | Avis et alternatives avec retours d'usage | Ne pas promettre un avis : fiche documentaire et limites affichées. |
| Home Assistant Green alternatives | Comparaison box, Raspberry Pi, mini PC | Hypothèse d'une page d'arbitrage dédiée, à sourcer et valider. |
| ZHA ou Zigbee2MQTT Home Assistant | Choix de logiciel Zigbee | Sujet prioritaire distinct du choix du dongle ; guide dédié après vérification de la SERP. |
| Quel dongle Zigbee Home Assistant | Sélection de matériel | Guide coordinateur publié ; éviter le mot « meilleur » sans mesure comparative. |
| Connect ZBT-2 Zigbee2MQTT | Compatibilité et firmware | Fiche ZBT-2 + sources officielles. |
| SONOFF Dongle-PP10 ZHA Zigbee2MQTT | Compatibilité et configuration | Fiche PP10 + documentation SONOFF. |
| Matter Thread Zigbee différences | Compréhension des protocoles | Guide publié avec tableau du matériel requis. |
| ZBT-2 vs SONOFF PP10 | Arbitrage entre deux références | D'abord vérifier si cette intention mérite une URL séparée du guide coordinateur ; pas de duel de portée sans mesures. |

Trois pages concurrentes consultées : [Domocraft, guide Green](https://domocraft.fr/infrastructure/home-assistant-green-avis/) (verdict, alternatives, deux marchands), [Domotique Store, guide Green](https://www.domotique-store.fr/guide/home-assistant-green) (accessoires et nombreux produits), [Robot Éducatif, ZHA ou Zigbee2MQTT](https://robot-educatif.info/domotique/home-assistant-zigbee2mqtt-ou-zha/) (choix logiciel et tableau). Ces observations suggèrent un besoin de réponses ciblées et de preuves propres ; elles ne démontrent aucune opportunité de classement. Les prix, stocks, notes ou portées de ces pages ne sont pas repris comme faits.

## Carte de 30 sujets : hypothèses à valider, pas pages promises

Chaque ligne représente une intention candidate. Avant rédaction : relever résultats français, questions réelles, source primaire, produit disponible et risque de chevauchement. Statut « publié » ne signifie pas position acquise.

| # | Sujet / intention | Statut | Lien commercial pertinent seulement si besoin réel |
| --- | --- | --- | --- |
| 1 | Démarrer avec Home Assistant Green | Publié | Green, puis dongle si Zigbee. |
| 2 | Choisir un coordinateur Zigbee Home Assistant | Publié | ZBT-2 ou PP10. |
| 3 | Distinguer Matter, Thread et Zigbee | Publié | Radio uniquement selon l'équipement. |
| 4 | ZHA ou Zigbee2MQTT : lequel choisir ? | Priorité 1 | Dongle compatible avec le logiciel choisi. |
| 5 | Home Assistant Green ou ordinateur existant ? | Priorité 1 | Green si machine dédiée souhaitée. |
| 6 | Home Assistant Green : accessoires vraiment nécessaires | Priorité 1 | Dongle/rallonge selon le cas. |
| 7 | Vérifier la compatibilité Zigbee d'un modèle précis | Priorité 1 | Fiche du matériel vérifié. |
| 8 | Où placer un coordinateur Zigbee et réduire les interférences | Priorité 1 | Adaptateur/rallonge si utile et documentée. |
| 9 | Sauvegarder un réseau ZHA avant un changement de clé | Priorité 1 | Aucun lien forcé ; aide d'abord. |
| 10 | Migrer un réseau Zigbee2MQTT vers un autre adaptateur | Priorité 1 | Nouveau dongle si migration nécessaire. |
| 11 | Routeur de bordure Thread : en avez-vous déjà un ? | Priorité 1 | ZBT-2 seulement s'il manque une radio adaptée. |
| 12 | Matter sur Wi-Fi ou Matter sur Thread : quoi acheter ? | Priorité 1 | Produits aux protocoles exacts, après réception de liens. |
| 13 | Green ou Raspberry Pi 5 pour Home Assistant OS | À qualifier | Green si avantages confirmés pour l'usage. |
| 14 | Green ou mini PC pour Home Assistant OS | À qualifier | Green pour installation dédiée simple. |
| 15 | Connect ZBT-2 ou Dongle-PP10 | À qualifier : cannibalisation possible avec #2 | Une offre par produit si distinction de page justifiée. |
| 16 | Faut-il deux radios pour Zigbee et Thread ? | À qualifier : proche de #3 et #11 | Deux équipements seulement si réseau existant ne suffit pas. |
| 17 | Clé Zigbee USB ou coordinateur Ethernet/PoE | À qualifier | Liens après produit et preuves d'usage. |
| 18 | Passerelle de marque ou réseau Zigbee direct | À qualifier | Dongle uniquement si besoin de réseau direct. |
| 19 | Vérifier un firmware avant d'acheter un dongle | À qualifier | Fiche et notice officielles. |
| 20 | Remplacer une clé Zigbee sans réappairer | À qualifier | Aucun achat promis ; procédure dépend du logiciel. |
| 21 | Choisir un capteur Zigbee de température | Futur hub capteurs | Produits et photos à fournir. |
| 22 | Choisir un détecteur d'ouverture Zigbee | Futur hub capteurs | Produits et photos à fournir. |
| 23 | Choisir une prise Zigbee avec mesure de consommation | Futur hub énergie | Produits et photos à fournir. |
| 24 | Prise Wi-Fi locale ou prise Zigbee pour Home Assistant | Futur hub énergie | Produits aux intégrations exactes. |
| 25 | Suivre la consommation électrique dans Home Assistant | Futur hub énergie | Capteurs seulement s'ils résolvent le besoin. |
| 26 | Ampoule Zigbee ou interrupteur connecté | Futur hub éclairage | Vérifier contraintes électriques avant recommandation. |
| 27 | Automatiser l'éclairage d'un couloir | Futur hub éclairage | Capteur/éclairage après validation d'un scénario réel. |
| 28 | Caméra locale sans abonnement : critères de choix | Futur hub sécurité | Produits après vérification confidentialité/stockage. |
| 29 | Home Assistant local : qu'est-ce qui fonctionne sans Internet ? | Support | Liens seulement vers les fonctions réellement utiles. |
| 30 | Vérifier une intégration Home Assistant avant achat | Support | Renvoi vers la fiche approuvée du modèle exact. |

Prioriser #4 à #12 après vérification : ce sont des problèmes plus précis que les listes génériques et reliés aux offres actuelles. Les #13 à #20 doivent être fusionnés ou séparés selon recouvrement réel des résultats ; les #21 à #28 peuvent s’appuyer sur les nouvelles fiches quand le produit correspond, mais exigent encore une intention et un guide propres. Pas de publication de 30 textes générés en série.

## Mesure du revenu : remplir avec les comptes, sans projection inventée

Revenu attribué = visites des pages de décision × taux de clic sur offre × taux de commande chez le marchand × commission moyenne confirmée. Le nombre de clics seul n'est pas un revenu. À chaque fin de mois, relever par page : sessions organiques, impressions/clics Google, clics sortants, ventes validées, ventes annulées, commissions nettes, offre indisponible et date de contrôle. Conserver les exports des comptes comme preuve. Calculer l'EPC sur **commissions confirmées / clics partenaires comptés** et comparer avec les clics du site si un suivi consenti est installé.

Les valeurs manquantes sont : pourcentage ou barème de commission Domadoo, rapport des clics et ventes, coût mensuel VPS/domaine, disponibilité actuelle de chaque produit, deuxième programme et ses liens, ainsi que données Search Console. Le guide de lancement indique déjà les étapes DNS, HTTPS, indexation et attribution.

## Portes de validation d'un nouveau contenu

1. Une question de lecteur et une intention distincte ; regarder les résultats avant de créer une URL.
2. Une réponse utile dans les premières lignes et un titre qui annonce exactement la réponse.
3. Un dossier de sources primaires datées ; chaque spécification et compatibilité importante remonte à sa source.
4. Niveau de preuve visible : documentaire, usage personnel du matériel concerné ou test avec protocole et mesures. Ne pas confondre photo marchand et photo d'essai.
5. Limites, alternatives, tableau ou procédure réellement utile ; pas de prix, stock, note ou promesse non vérifié.
6. Liens internes à la page qui aide ensuite le lecteur, puis offre partenaire seulement au moment utile et clairement signalée.
7. Relecture humaine, page mobile, HTML SSR, title/description, canonical, images, 404 et vérification automatique avant indexation.
8. Contrôle après publication : Search Console, liens, retours des lecteurs, ventes et mise à jour datée. Réserver du temps aux corrections autant qu'aux nouveaux articles.
