# Formation SEO et affiliation — index de travail

Source : 125 captures `SCR-*.png` dans `/Users/geraldo/Documents/formation seo/`.
L'inventaire exhaustif des noms de fichiers est dans `SUPPORTS_INVENTAIRE.txt`.
Les captures contiennent une formation de 12 modules. Cet index résume les
passages consultés utiles à DomoKlub ; il ne reproduit pas le cours.

| Module | Captures (ordre de l'inventaire) | Notions repérées | Usage DomoKlub |
| --- | --- | --- | --- |
| 1. Les fondations | 1–9 | Chaîne recherche → page → clic → achat → commission ; modèles économiques, attentes et cadre légal | Transparence sur l'affiliation ; pas de promesse de revenus ni de trafic. |
| 2. Trouver une niche rentable | 10–21 | Grille de niche, intention, faisabilité, angle éditorial et go/no-go | Cadrage de la domotique et choix d'un angle « choix éclairé » ; métriques à établir avec données réelles. |
| 3. Espionner la concurrence | 22–29 | Lecture des SERP, concurrents, pages qui rapportent, programmes, liens et failles | Trois pages concurrentes examinées et dix formulations de recherche observées ; aucun volume ou rang inventé. |
| 4. Mots-clés, plan & arborescence | 30–38 | Graines, modificateurs, intention, clustering par SERP, formats de pages, topical map, silos et maillage | Hubs thématiques et formats distincts ; dix formulations examinées qualitativement, carte de 30 intentions candidates ; volumes et difficulté non mesurés. |
| 5. Rédiger avec l'IA | 39–53 | Qualité, preuves, comparatifs, gabarits, rythme et contrôle avant publication | États éditoriaux, méthode de preuve, tableaux de décision et relecture des contenus ; aucun test simulé. |
| 6. SEO on-page & technique | 54–65 | Pages de confiance, title/meta, données structurées fidèles, vitesse, recette technique et Search Console | Métadonnées SSR, canonical, robots, sitemap, pages de confiance et contrôle automatique avant indexation. |
| 7. Lancer & encaisser | 66–77 | Indexation, Search Console, liens, programmes partenaires, sous-ID et diagnostic | Liens partenaires vérifiés ; suivi des ventes et des requêtes à connecter après mise en ligne, sans chiffres inventés. |
| 8. Monétiser & optimiser | 78–86 | Placement des liens, composants de conversion, prix, EPC et amélioration de pages | Onze offres Domadoo approuvées, sans prix ; CTA en haut des fiches et suivi à connecter après lancement. |
| 9. GEO : être cité par les IA | 87–97 | Sources citées, entités, mentions hors site, mesure et limites des promesses GEO | Sources et provenance ; aucune garantie de citation ou de trafic IA. |
| 10. Durer : sécuriser et diversifier | 98–105 | Mises à jour, dépendance Amazon, trafic, e-mail, revenus et sauvegardes | Architecture extensible ; newsletter et publicité non activées sans conformité. |
| 11. Passer à l'échelle | 106–115 | SOP, délégation, portefeuille, revenus annexes et risques | Processus et validation documentés avant automatisation. |
| 12. Micro-niches et vente de leads | 116–125 | Acquisition de leads, prix, location, cadre légal et plan de 90 jours | Hors périmètre initial : DomoKlub est un média d'affiliation, pas un site de vente de leads. |

## Traçabilité des décisions SEO de la partie publique

| Passage consulté | Enseignement retenu | Implémentation | Vérification prévue |
| --- | --- | --- | --- |
| `SCR-20261116-qkjq.png`, module 4, leçon « Clustering : de 1 000 requêtes à 80 pages » | Une page sert une intention ; vérifier les regroupements dans les résultats avant de créer plusieurs URL. | Les rubriques ont des rôles distincts. Aucune page par mot-clé ou filtre n'est générée ; les listes vides sont `noindex`. | Comparer les intentions avant de rédiger ; exploiter Search Console après la mise en ligne. |
| `SCR-20261116-qkqu.png`, module 4, leçon « Architecture, silos et maillage interne » | Hubs et liens contextuels servent la navigation et évitent les pages orphelines ; profondeur limitée. | Accueil → six thèmes et six formats ; fil d'Ariane sur chaque page ; liens vers méthode, affiliation et comparateur. | Vérifier les parcours au clavier et les liens internes. |
| `SCR-20261116-qnpy.png`, module 5, leçon « Prouver ton expérience » | Différencier mesure personnelle, usage et documentation ; ne jamais inventer un essai. | Trois fiches « Non testé » ; huit avis d’usage attribués à Gérald avec note personnelle sur 5, contexte et limites. Aucune mesure de portée inventée. | Demander versions, photos personnelles et mesures pour de futurs tests comparatifs. |
| `SCR-20261116-qnyw.png`, module 5, leçon « Anatomie d'un comparatif qui convertit » | Répondre vite, exposer un verdict, tableau, critères, méthode et FAQ si elles répondent à des questions réelles. | Comparateur libre avec valeurs manquantes ; guides de lancement dotés de tableaux de décision ; nouveaux comparatifs soumis à validation éditoriale. | Vérifier le comparateur de 2 à 4 produits et la présence de la méthode sur les futurs comparatifs. |
| `SCR-20261116-qqwo.png`, module 6, leçon « pages de confiance » | Expliquer auteur, méthode, financement et contact. | Pages À propos, Méthodologie, Affiliation et Contact ; identité et mentions légales validées par l’éditeur. | Contrôler les coordonnées après le déploiement sur le domaine réel. |
| `SCR-20261116-qqyk.png` et `SCR-20261116-qrfw.png`, module 6, leçons optimisation on-page et données structurées | Métadonnées et balisage doivent décrire le contenu réel ; pas de balisage enrichi fictif. | Titres, descriptions, canonical ; Article, Organization et Person JSON-LD fidèles au contenu ; pas de `Review` ni note fictive. | Contrôle `check:seo` du HTML SSR, puis test des URL en production et Search Console. |
| `SCR-20261116-qrwp.png`, module 6, leçon recette technique | Vérifier canonicals, indexation, liens, rendu et données avant ouverture. | `siteLive=false` par défaut, `robots.txt` bloquant, comparateur/recherche `noindex`, sitemap vide avant ouverture. | Contrôles HTTP automatisés ; garder `siteLive=false` sur l’hôte provisoire puis activer sur le domaine. |
| `SCR-20261117-idue.png` et `SCR-20261117-iedd.png`, modules 8, leçons placement des liens et prix | Placer des liens là où la décision se fait ; les prix non vérifiés nuisent à la confiance et peuvent contrevenir aux règles marchands. | Onze liens Domadoo fournis par l’éditeur, sans prix affiché ; politique d’affiliation visible. | Contrôler attribution et disponibilité dans Domadoo ; les liens `rel=sponsored` sont vérifiés automatiquement. |

## Adaptations et dépendances

- Le cours montre parfois des seuils ou exemples de revenus : ce ne sont pas des
  prévisions DomoKlub. Aucun volume, classement ou EPC n'est créé sans données datées.
- Le cahier des charges prévoit Strapi ; pour le lancement, l’éditeur a choisi
  un catalogue local validé et un déploiement GitHub. La validation humaine
  reste nécessaire pour publier. Une note de test exige une manipulation réelle
  documentée : ces contraintes prévalent sur tout gabarit commercial du cours.
- Les captures de la formation ne sont pas copiées dans le projet ; seuls leurs
  noms et résumés nécessaires à la traçabilité sont conservés ici.
- Avant les workflows de recherche de mots-clés, briefs, audit et suivi SEO,
  consulter `CHECKLIST_FORMATION_2026-11-17.md` et compléter les données réelles de Search Console et Domadoo.

## Reprise des captures « prompts » et « checklists » du 17 novembre

La grille de couverture, les dix requêtes examinées, les trois pages concurrentes, la carte de 30 sujets et les données économiques manquantes sont consignées dans `CHECKLIST_FORMATION_2026-11-17.md`. Les prompts de la formation ont été utilisés comme **méthodes de travail** : lecture de la SERP, regroupement par intention, rédaction contrainte aux sources, relecture critique, fiche produit maître et diagnostic de conversion. Leurs exemples chiffrés et injonctions de format ne sont pas des faits DomoKlub.
