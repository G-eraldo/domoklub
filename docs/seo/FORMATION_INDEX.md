# Formation SEO et affiliation — index de travail

Source : 125 captures `SCR-*.png` dans `/Users/geraldo/Documents/formation seo/`.
L'inventaire exhaustif des noms de fichiers est dans `SUPPORTS_INVENTAIRE.txt`.
Les captures contiennent une formation de 12 modules. Cet index résume les
passages consultés utiles à DomoKlub ; il ne reproduit pas le cours.

| Module | Captures (ordre de l'inventaire) | Notions repérées | Usage DomoKlub |
| --- | --- | --- | --- |
| 1. Les fondations | 1–9 | Chaîne recherche → page → clic → achat → commission ; modèles économiques, attentes et cadre légal | Transparence sur l'affiliation ; pas de promesse de revenus ni de trafic. |
| 2. Trouver une niche rentable | 10–21 | Grille de niche, intention, faisabilité, angle éditorial et go/no-go | Cadrage de la domotique et choix d'un angle « choix éclairé » ; métriques à établir avec données réelles. |
| 3. Espionner la concurrence | 22–29 | Lecture des SERP, concurrents, pages qui rapportent, programmes, liens et failles | Future analyse concurrentielle sourcée ; aucun chiffre concurrent inventé. |
| 4. Mots-clés, plan & arborescence | 30–38 | Graines, modificateurs, intention, clustering par SERP, formats de pages, topical map, silos et maillage | Hubs thématiques et formats distincts ; travail de mots-clés bloqué tant que les données et choix éditoriaux ne sont pas validés. |
| 5. Rédiger avec l'IA | 39–53 | Qualité, preuves, comparatifs, gabarits, rythme et contrôle avant publication | États éditoriaux, méthode de preuve et structure des futurs comparatifs ; aucun test simulé. |
| 6. SEO on-page & technique | 54–65 | Pages de confiance, title/meta, données structurées fidèles, vitesse, recette technique et Search Console | Métadonnées, canonical, robots, sitemap, pages de confiance ; contrôle manuel avant indexation. |
| 7. Lancer & encaisser | 66–77 | Indexation, Search Console, liens, programmes partenaires, sous-ID et diagnostic | Aucun suivi ou gain affiché sans comptes, données et consentement ; intégrations ultérieures. |
| 8. Monétiser & optimiser | 78–86 | Placement des liens, composants de conversion, prix, EPC et amélioration de pages | Offres masquées avant accès partenaire et contrôle de fraîcheur ; futur suivi par page. |
| 9. GEO : être cité par les IA | 87–97 | Sources citées, entités, mentions hors site, mesure et limites des promesses GEO | Sources et provenance ; aucune garantie de citation ou de trafic IA. |
| 10. Durer : sécuriser et diversifier | 98–105 | Mises à jour, dépendance Amazon, trafic, e-mail, revenus et sauvegardes | Architecture extensible ; newsletter et publicité non activées sans conformité. |
| 11. Passer à l'échelle | 106–115 | SOP, délégation, portefeuille, revenus annexes et risques | Processus et validation documentés avant automatisation. |
| 12. Micro-niches et vente de leads | 116–125 | Acquisition de leads, prix, location, cadre légal et plan de 90 jours | Hors périmètre initial : DomoKlub est un média d'affiliation, pas un site de vente de leads. |

## Traçabilité des décisions SEO de la partie publique

| Passage consulté | Enseignement retenu | Implémentation | Vérification prévue |
| --- | --- | --- | --- |
| `SCR-20261116-qkjq.png`, module 4, leçon « Clustering : de 1 000 requêtes à 80 pages » | Une page sert une intention ; vérifier les regroupements dans les résultats avant de créer plusieurs URL. | Les rubriques ont des rôles distincts. Aucune page par mot-clé ou filtre n'est générée ; les listes vides sont `noindex`. | Contrôler les futures pages et mots-clés en Search Console avant d'ouvrir l'indexation. |
| `SCR-20261116-qkqu.png`, module 4, leçon « Architecture, silos et maillage interne » | Hubs et liens contextuels servent la navigation et évitent les pages orphelines ; profondeur limitée. | Accueil → six thèmes et six formats ; fil d'Ariane sur chaque page ; liens vers méthode, affiliation et comparateur. | Vérifier les parcours au clavier et les liens internes. |
| `SCR-20261116-qnpy.png`, module 5, leçon « Prouver ton expérience » | Différencier mesure personnelle, usage et documentation ; ne jamais inventer un essai. | Fiches documentaires explicitement « Non testé » ; aucune note ou mesure sans rapport d'essai. | Vérifier les fiches publiées et les preuves avant activation. |
| `SCR-20261116-qnyw.png`, module 5, leçon « Anatomie d'un comparatif qui convertit » | Répondre vite, exposer un verdict, tableau, critères, méthode et FAQ si elles répondent à des questions réelles. | Comparateur libre avec tableau de critères et valeurs manquantes ; comparatifs éditoriaux réservés au CMS approuvé. | Vérifier le comparateur de 2 à 4 produits et la présence de la méthode sur les futurs comparatifs. |
| `SCR-20261116-qqwo.png`, module 6, leçon « pages de confiance » | Expliquer auteur, méthode, financement et contact. | Pages À propos, Méthodologie, Affiliation et Contact. Le contact et les mentions restent provisoires et bloquent l'ouverture. | Compléter les identités et coordonnées réelles, puis revue avant publication. |
| `SCR-20261116-qqyk.png` et `SCR-20261116-qrfw.png`, module 6, leçons optimisation on-page et données structurées | Métadonnées et balisage doivent décrire le contenu réel ; pas de balisage enrichi fictif. | Titres, descriptions, canonical ; aucun `Product` ou `Review` JSON-LD sans données vérifiées. | Inspecter HTML SSR, canonical et éventuels schémas après publication réelle. |
| `SCR-20261116-qrwp.png`, module 6, leçon recette technique | Vérifier canonicals, indexation, liens, rendu et données avant ouverture. | `siteLive=false` par défaut, `robots.txt` bloquant, comparateur/recherche `noindex`, sitemap vide avant ouverture. | Contrôles HTTP et revue du propriétaire avant de passer `siteLive=true`. |
| `SCR-20261117-idue.png` et `SCR-20261117-iedd.png`, modules 8, leçons placement des liens et prix | Placer des liens là où la décision se fait ; les prix non vérifiés nuisent à la confiance et peuvent contrevenir aux règles marchands. | Aucun prix ni lien affilié fictif dans la version de préparation ; politique d'affiliation visible. | Vérifier comptes, règles de chaque programme, liens `rel=sponsored` et fraîcheur des prix avant activation. |

## Adaptations et dépendances

- Le cours montre parfois des seuils ou exemples de revenus : ce ne sont pas des
  prévisions DomoKlub. Aucun volume, classement ou EPC n'est créé sans données datées.
- Le cahier des charges impose Strapi, validation humaine et des tests réels pour
  les notes : ces contraintes prévalent sur tout gabarit commercial du cours.
- Les captures de la formation ne sont pas copiées dans le projet ; seuls leurs
  noms et résumés nécessaires à la traçabilité sont conservés ici.
- Avant les workflows de recherche de mots-clés, briefs, audit et suivi SEO,
  relire les leçons détaillées des modules 3, 4, 6, 7 et 9 avec les données réelles.
