// Guides de choix rédigés le 27 novembre 2026 à partir des documentations officielles listées
// dans chaque contenu et des retours d'usage déjà transmis par Gérald François (experiencedProducts.js).
// Aucun essai comparatif ni mesure n'est revendiqué.
const publishedAt = '2026-11-27T12:00:00+01:00'
const haZha = 'https://www.home-assistant.io/integrations/zha/'
const z2mStart = 'https://www.zigbee2mqtt.io/guide/getting-started/'
const z2mAdapters = 'https://www.zigbee2mqtt.io/guide/adapters/'
const z2mFaq = 'https://www.zigbee2mqtt.io/guide/faq/'
const z2mRange = 'https://www.zigbee2mqtt.io/advanced/zigbee/02_improve_network_range_and_stability.html'
const haInstall = 'https://www.home-assistant.io/installation/'
const haGreen = 'https://www.home-assistant.io/green/'
const haRpi = 'https://www.home-assistant.io/installation/raspberrypi'
const haX86 = 'https://www.home-assistant.io/installation/generic-x86-64'
const orbManual = 'https://support.sonoff.tech/zbminil2-e-usermanual/'
const relayManual = 'https://support.sonoff.tech/zbminir2-usermanual/'
const blindManual = 'https://support.sonoff.tech/mini-zbrbs-usermanual/'
const sensorManual = 'https://support.sonoff.tech/snzb-04p-usermanual/'
const nodonDoc = 'https://support.nodon.fr/support/solutions/articles/150000192111-module-multifonction-zigbee-sin-4-1-20-'

const base = { editorialStatus: 'approved', publishedAt, updatedAt: publishedAt }

export const choiceGuides = [
  {
    "documentId": "local-guide-suivre-consommation-electrique-home-assistant",
    "editorialStatus": "approved",
    "type": "guide",
    "topic": "energie",
    "slug": "suivre-consommation-electrique-home-assistant",
    "title": "Suivre sa consommation électrique dans Home Assistant",
    "seoTitle": "Consommation électrique dans Home Assistant",
    "excerpt": "Suivre sa consommation électrique dans Home Assistant avec le compteur Linky ou une prise à mesure : ce que chaque méthode donne, et ce qu'elle ne dit pas.",
    "intro": "Deux moyens suffisent, et ils ne mesurent pas la même chose : le module ZLinky TIC lit les index du compteur Linky sans électricien et donne le total du logement ; une prise à mesure isole un appareil à l'intérieur de ce total, elle ne s'y ajoute pas. Le prix du kWh sert à convertir ces kilowattheures en euros. Aucun des deux ne remplace le relevé de votre facture. Ce guide contient des liens vers des fiches qui proposent des liens affiliés. Un achat après un clic peut rémunérer DomoKlub, sans surcoût pour vous.",
    "sections": [
      {
        "id": "section-1",
        "title": "1. Ce que chaque méthode mesure vraiment",
        "paragraphs": [
          "Le choix se joue sur la question que vous vous posez. « Combien coûte la maison ce mois-ci ? » → compteur. « Combien coûte le sèche-linge ? » → prise. « Combien coûte le chauffage ? » → prise par radiateur, ou pince sur le circuit dédié si vous en avez un.",
          "Une réserve sur la référence de prise citée : le catalogue du site associe le NOUS A7Z à un lot de deux, sans offre unitaire trouvée, et cette correspondance n'a pas pu être confirmée sur Amazon.fr. Lisez la ligne « prise à mesure » comme un moyen de mesure, pas comme le prix d'une prise seule : vérifiez le conditionnement sur la page du marchand avant de comparer."
        ]
      },
      {
        "id": "section-2",
        "title": "2. Le Linky : ce qu'il donne, et ce qu'il ne donne pas",
        "paragraphs": [
          "Le compteur Linky expose une téléinformation client (TIC), une liaison série destinée à l'origine aux boîtiers des fournisseurs. Le ZLinky se clipse dessus et s'alimente par cette même liaison : pas de pile, pas de câblage, pas de coupure de courant à prévoir.",
          "Les valeurs disponibles dépendent du mode TIC du compteur, historique ou standard. C'est le point à vérifier avant d'acheter : deux compteurs voisins peuvent ne pas exposer les mêmes informations.",
          "Ce que Zigbee2MQTT publie, d'après la documentation du convertisseur ZLinky :",
          "les index de consommation en kWh (par exemple l'index 01, EASF01) ;",
          "la puissance apparente en VA ;",
          "la période tarifaire en cours (PTEC), donc le repérage heures pleines / heures creuses quand le contrat en a.",
          "Trois limites à connaître :",
          "Puissance apparente ≠ puissance réelle. Le compteur donne des VA, pas des watts. L'écart dépend du facteur de puissance de vos appareils. Pour un suivi de facture, ce sont les index en kWh qui comptent.",
          "Pas de détail par appareil. Le compteur voit la maison entière. Un talon de 300 W à 3 h du matin est une information, pas une identification : il faut ensuite isoler.",
          "Le compteur doit être à portée du réseau Zigbee. En maison, le Linky est souvent en limite de propriété ou dans un coffret extérieur : c'est le principal échec d'installation. Un routeur Zigbee intermédiaire, ou un module alimenté plus proche, règle parfois le problème ; sinon la méthode ne vaut pas.",
          "La fiche produit documente aussi un point de dépannage : après une mise à jour du Linky ou une coupure, si la LED du module reste éteinte, LiXee conseille de le débrancher au moins 30 minutes."
        ]
      },
      {
        "id": "section-3",
        "title": "3. Brancher le compteur dans le tableau de bord Énergie",
        "paragraphs": [
          "Associer le module au réseau Zigbee, dans Zigbee2MQTT (la compatibilité confirmée est celle de Zigbee2MQTT ; pour ZHA, vérifiez votre version avant d'acheter).",
          "Vérifier les entités : les index doivent apparaître en kWh et évoluer. Un index figé est un problème de portée ou de mode TIC, pas un problème Home Assistant.",
          "Déclarer le capteur dans le tableau de bord Énergie, côté « consommation du réseau ». Home Assistant attend un capteur d'énergie en kWh ; la documentation officielle précise qu'un capteur de puissance en W doit d'abord être converti (intégrale).",
          "Laisser tourner quelques jours. Les statistiques long terme se construisent dans la durée : le premier graphe n'a aucune valeur de référence."
        ]
      },
      {
        "id": "section-4",
        "title": "4. Chiffrer en euros",
        "paragraphs": [
          "Home Assistant convertit des kWh en euros si vous lui donnez le prix du kWh, en prix fixe ou via une entité qui suit votre tarif. Sans ce prix, vous avez un compteur, pas un budget.",
          "Repère de calcul, à adapter à votre contrat :",
          "coût = énergie (kWh) × prix du kWh",
          "2 000 W pendant 2 h = 4 kWh",
          "4 kWh × 0,25 €/kWh = 1,00 €",
          "(0,25 € est un exemple, pas un tarif)",
          "En heures pleines / heures creuses, le prix change selon la période. Le module expose la période tarifaire, ce qui permet de séparer les deux dans les automatisations ; le tableau de bord Énergie, lui, reste juste si vous lui fournissez le bon prix au bon moment."
        ]
      },
      {
        "id": "section-5",
        "title": "5. Mesurer un appareil précis",
        "paragraphs": [
          "La prise à mesure donne la puissance, le courant, la tension et l'énergie de l'appareil branché dessus, et Zigbee2MQTT la reconnaît sans passer par l'application du fabricant. Trois usages typiques :",
          "Un radiateur d'appoint : la prise 16 A suffit pour un appareil de 2 000 W (environ 8,7 A). Un modèle de 2 500 W approche 11 A : la marge se réduit, et un chauffage qui consomme autant mérite une vérification de la prise et de la ligne.",
          "Un appareil à cycle (lave-linge, sèche-linge) : vous obtenez l'énergie du cycle, pas son coût exact si le tarif change en cours de route.",
          "Le talon de consommation : la somme des prises installées sur les veilles et le réseau, à comparer avec le chiffre du compteur.",
          "Les deux méthodes se complètent : le compteur valide le total, les prises expliquent les postes."
        ]
      },
      {
        "id": "section-6",
        "title": "6. Trois erreurs qui faussent le suivi",
        "paragraphs": [
          "Confondre VA et W. Un onduleur, un moteur ou une alimentation à découpage affichent une puissance apparente supérieure à la puissance réelle. Ne comparez pas une mesure en VA avec la puissance inscrite sur la plaque d'un appareil.",
          "Oublier le prix. Un tableau de bord en kWh ne dit rien de la facture. Le prix du kWh, l'abonnement et les taxes restent hors du calcul.",
          "Comparer un index à une facture sans tenir compte du décalage. Le relevé du fournisseur, la date de facturation et les estimations ne tombent pas au même moment. Un écart de quelques jours est normal ; un écart structurel mérite de vérifier le mode TIC."
        ]
      },
      {
        "id": "section-7",
        "title": "7. Questions fréquentes",
        "paragraphs": [
          "Faut-il un électricien pour le ZLinky ? Non : il se clipse sur la prise TIC, si le compteur est accessible. Le second point est la vraie contrainte, pas le raccordement.",
          "Mon compteur est en limite de propriété, est-ce rédhibitoire ? Souvent, oui, à cause de la portée Zigbee. Testez avec un routeur intermédiaire avant d'acheter, ou partez sur une prise à mesure pour les appareils qui vous intéressent.",
          "Le ZLinky fonctionne-t-il avec ZHA ? La compatibilité confirmée par la fiche est Zigbee2MQTT. Pour ZHA, vérifiez la version et le convertisseur avant l'achat : DomoKlub ne l'affirme pas pour ce module.",
          "Peut-on suivre le chauffage sans Linky ? Oui, avec une prise à mesure par appareil : voir la réserve sur le conditionnement de la référence citée en §1. Vous perdez la vue d'ensemble, vous gagnez le détail.",
          "Pourquoi mon total diffère de la facture ? Parce que la facture inclut l'abonnement et les taxes, et parce que les dates de relevé diffèrent. Le compteur mesure des kWh, pas des euros."
        ]
      },
      {
        "id": "section-8",
        "title": "Sources",
        "paragraphs": [
          "LiXee — documentation ZLinky TIC, reprise de la fiche produit DomoKlub vérifiée le 17/11/2026.",
          "Zigbee2MQTT — page du convertisseur ZLinky_TIC (index en kWh, PTEC, linky_mode historique/standard), consultée le 28/11/2026.",
          "Home Assistant — documentation « Home energy management » (capteur d'énergie en kWh, conversion d'un capteur de puissance), consultée le 28/11/2026.",
          "Fiches DomoKlub LiXee ZLinky TIC V2 et NOUS A7Z, vérifiées le 17/11/2026.",
          "Fiche documentaire : DomoKlub n'a pas réalisé de mesure comparative pour ce guide. Les valeurs de consommation citées sont des calculs, pas des relevés."
        ]
      }
    ],
    "relatedProducts": [
      "lixee-zlinky-tic",
      "nous-a7z"
    ],
    "publishedAt": "2026-11-28",
    "updatedAt": "2026-11-28",
    "decisionTable": {
      "title": "1. Ce que chaque méthode mesure vraiment",
      "columns": [
        "Méthode",
        "Ce qu'elle mesure",
        "Installation",
        "Ce qu'elle ne dit pas",
        "Produit DomoKlub"
      ],
      "rows": [
        [
          "Module sur la prise TIC du Linky",
          "Index de consommation (kWh), puissance apparente, période tarifaire",
          "Se clipse sur le compteur, aucun câblage",
          "Le détail par appareil",
          "LiXee ZLinky TIC V2"
        ],
        [
          "Prise connectée à mesure",
          "Puissance, courant, tension, énergie d'un seul appareil",
          "Se branche entre la prise murale et l'appareil",
          "Rien de ce qui n'est pas branché dessus",
          "NOUS A7Z"
        ],
        [
          "Pince ampèremétrique",
          "Courant sur un circuit, souvent au tableau",
          "Ouverture du tableau, donc électricien",
          "La tension et le facteur de puissance sans second capteur",
          "Hors sélection DomoKlub"
        ]
      ]
    }
  },
  {
    ...base,
    documentId: 'local-guide-zha-ou-zigbee2mqtt', type: 'guide', topic: 'zigbee', slug: 'zha-ou-zigbee2mqtt',
    title: 'ZHA ou Zigbee2MQTT : lequel choisir pour Home Assistant ?',
    seoTitle: 'ZHA ou Zigbee2MQTT : que choisir ? · DomoKlub',
    excerpt: 'ZHA est intégré à Home Assistant, Zigbee2MQTT passe par MQTT et son interface. Les différences qui comptent vraiment avant d’acheter un dongle Zigbee.',
    intro: 'Pour débuter simplement, ZHA suffit souvent : il est intégré à Home Assistant et se configure depuis l’interface, sans autre logiciel. Zigbee2MQTT demande un broker MQTT en plus, mais offre une interface dédiée, une large base d’appareils documentés et peut fonctionner indépendamment de Home Assistant. Décidez avant d’acheter votre dongle : changer de logiciel plus tard impose en général de réassocier les appareils.',
    decisionTable: { title: 'ZHA ou Zigbee2MQTT selon votre profil', columns: ['Votre situation', 'Logiciel conseillé', 'Pourquoi'], rows: [
      ['Première installation, peu d’appareils', 'ZHA', 'Intégré, aucun broker MQTT à installer'],
      ['Appareils Tuya, Aqara ou peu courants', 'Zigbee2MQTT', 'Base d’appareils et convertisseurs très fournie, à vérifier modèle par modèle'],
      ['Zigbee utilisé hors de Home Assistant', 'Zigbee2MQTT', 'Fonctionne avec tout système qui parle MQTT'],
      ['Envie de tout gérer dans une seule interface', 'ZHA', 'Appareils, groupes et migration de dongle dans Home Assistant'],
      ['Réglages fins par appareil, mises à jour OTA', 'Zigbee2MQTT', 'Interface web dédiée avec options détaillées']
    ] },
    sections: [
      { id: 'reponse-courte', title: 'La réponse courte', paragraphs: [
        'Les deux logiciels pilotent le même type de matériel : un coordinateur Zigbee branché sur la machine Home Assistant, et vos appareils Zigbee associés à ce coordinateur. La différence se situe dans la façon de gérer le réseau et la compatibilité des appareils.',
        'ZHA (Zigbee Home Automation) est l’intégration Zigbee native de Home Assistant. Zigbee2MQTT est un projet séparé qui traduit les messages Zigbee en messages MQTT ; Home Assistant les récupère ensuite grâce à son intégration MQTT. Un même dongle ne peut pas servir aux deux en même temps.'
      ] },
      { id: 'zha', title: 'ZHA : l’option la plus simple à démarrer', paragraphs: [
        'ZHA s’ajoute comme n’importe quelle intégration. Home Assistant détecte en général le dongle, crée le réseau et vous propose d’associer les appareils depuis Paramètres, Appareils et services. Il n’y a ni broker MQTT ni second tableau de bord à maintenir.',
        'Pour les appareils qui ne respectent pas parfaitement le standard Zigbee, ZHA s’appuie sur des « quirks » (projet ZHA Device Handlers) qui corrigent leur comportement. Si un appareil n’est pas encore pris en charge, la documentation explique comment demander son ajout. ZHA propose aussi une procédure de migration vers un nouvel adaptateur, avec sauvegarde automatique, pour certains types de radio.'
      ], bullets: [
        'Points forts : installation intégrée, sauvegarde et migration de dongle depuis l’interface.',
        'Limites : moins de réglages avancés par appareil ; la prise en charge d’un modèle rare peut demander d’attendre un quirk.'
      ] },
      { id: 'zigbee2mqtt', title: 'Zigbee2MQTT : plus d’appareils et de réglages', paragraphs: [
        'Zigbee2MQTT nécessite trois éléments : le logiciel lui-même, un broker MQTT (Mosquitto est recommandé par le projet) et un adaptateur pris en charge. Sur Home Assistant OS, tout s’installe sous forme d’applications ; notre guide d’installation détaille les étapes.',
        'Son site publie une fiche par appareil supporté, avec les fonctions exposées : c’est le meilleur moyen de vérifier un modèle avant de l’acheter. Son interface web permet de gérer l’association, les mises à jour OTA et des options propres à chaque appareil. Comme il communique en MQTT, il peut aussi alimenter d’autres plateformes que Home Assistant.'
      ], bullets: [
        'Points forts : base d’appareils documentée, interface dédiée, indépendance vis-à-vis de Home Assistant.',
        'Limites : un composant de plus (broker MQTT) à maintenir et à sauvegarder.'
      ] },
      { id: 'materiel', title: 'Quel dongle pour chaque logiciel ?', paragraphs: [
        'Vérifiez la liste officielle du logiciel choisi avant tout achat. Home Assistant recommande son Connect ZBT-2 pour un nouveau réseau ZHA. Côté Zigbee2MQTT, les adaptateurs Texas Instruments de type zStack, comme le SONOFF ZBDongle-P, figurent dans la documentation des adaptateurs pris en charge.',
        'Chez l’éditeur, le ZBDongle-P fonctionne avec Zigbee2MQTT depuis juin 2025 sans problème signalé. Ce retour d’usage ne vaut pas test comparatif : il confirme seulement une configuration réelle qui fonctionne.'
      ] },
      { id: 'changer', title: 'Peut-on changer d’avis plus tard ?', paragraphs: [
        'Oui, mais ce n’est pas transparent. La FAQ de Zigbee2MQTT détaille ce qui exige ou non une nouvelle association des appareils ; passer d’un logiciel à l’autre implique en pratique de reconstruire le réseau et de revoir les automatisations qui utilisent les noms d’entités.',
        'Avec une dizaine d’appareils, l’opération reste gérable en une soirée. Avec cinquante, mieux vaut bien choisir dès le départ. Notre conseil : ZHA si vous débutez et utilisez des marques courantes, Zigbee2MQTT si vous savez déjà que vous aurez des appareils variés ou si vous voulez un contrôle fin.'
      ] }
    ],
    relatedProducts: ['home-assistant-connect-zbt-2', 'sonoff-zbdongle-p', 'sonoff-dongle-pp10'],
    relatedArticles: ['installer-zigbee2mqtt', 'choisir-coordinateur-zigbee-home-assistant', 'ameliorer-portee-reseau-zigbee'],
    sources: [
      { label: 'Home Assistant — intégration ZHA', url: haZha },
      { label: 'Zigbee2MQTT — prise en main', url: z2mStart },
      { label: 'Zigbee2MQTT — adaptateurs pris en charge', url: z2mAdapters },
      { label: 'Zigbee2MQTT — FAQ, migration et réassociation', url: z2mFaq }
    ]
  },
  {
    ...base,
    documentId: 'local-guide-machine-home-assistant', type: 'guide', topic: 'home-assistant', slug: 'home-assistant-green-raspberry-pi-ou-mini-pc',
    title: 'Home Assistant Green, Raspberry Pi ou mini PC : quelle machine choisir ?',
    seoTitle: 'Green, Raspberry Pi ou mini PC ? · DomoKlub',
    excerpt: 'Box prête à l’emploi, Raspberry Pi à préparer ou mini PC plus puissant : comment choisir la machine qui fera tourner Home Assistant OS chez vous.',
    intro: 'Pour la plupart des foyers, Home Assistant Green est le choix le plus simple : le système est préinstallé et le matériel est conçu pour lui. Un Raspberry Pi 4 ou 5 convient si vous en avez déjà un. Un mini PC x86-64 se justifie si vous prévoyez des usages lourds, comme l’analyse vidéo locale ou de nombreuses applications.',
    decisionTable: { title: 'Quelle machine pour Home Assistant OS ?', columns: ['Votre priorité', 'Machine', 'À prévoir'], rows: [
      ['Démarrer sans bricoler', 'Home Assistant Green', 'Câble Ethernet ; dongle séparé pour Zigbee ou Thread'],
      ['Réutiliser du matériel existant', 'Raspberry Pi 4 ou 5 (2 Go de RAM minimum)', 'Carte microSD A2 ou SSD, alimentation, flashage'],
      ['Puissance et évolutivité', 'Mini PC x86-64 avec démarrage UEFI', 'Installation du système, éviter les SSD 4Kn'],
      ['Déjà un ordinateur allumé en permanence', 'Machine virtuelle', 'Ressources réservées et passage du dongle USB à la VM']
    ] },
    sections: [
      { id: 'green', title: 'Home Assistant Green : la voie la plus directe', paragraphs: [
        'La Green est fabriquée pour Home Assistant par Nabu Casa. Selon le fabricant, elle embarque un processeur Rockchip RK3566 quadricœur à 1,8 GHz, 4 Go de RAM et 32 Go de stockage eMMC. On la branche au réseau en Ethernet et sur secteur ; une connexion Internet est nécessaire pour la configuration initiale.',
        'Elle n’a pas de radio Zigbee ni Thread intégrée : prévoyez un coordinateur USB si vous utilisez ces protocoles. Son intérêt principal est l’absence de préparation : pas de carte à flasher, pas de boîtier ni d’alimentation à choisir.'
      ] },
      { id: 'raspberry', title: 'Raspberry Pi : intéressant si vous l’avez déjà', paragraphs: [
        'Home Assistant documente l’installation sur Raspberry Pi 5 ou 4, avec au moins 2 Go de RAM. Il faut flasher l’image du système sur une carte microSD, de préférence de classe A2, plus performante pour les petites lectures et écritures. Un câble Ethernet est requis pour l’installation.',
        'Acheté neuf avec son alimentation, son boîtier et un stockage de qualité, un Raspberry Pi n’est plus forcément moins cher que la Green. Il garde l’avantage de la polyvalence si vous l’avez déjà ou si vous aimez le matériel modulaire.'
      ] },
      { id: 'mini-pc', title: 'Mini PC x86-64 : pour les installations ambitieuses', paragraphs: [
        'Home Assistant OS s’installe sur la plupart des machines Intel ou AMD 64 bits capables de démarrer en UEFI, ce qui concerne la majorité des ordinateurs des dix dernières années selon la documentation. Certains SSD NVMe ou disques en secteurs natifs de 4K (4Kn) ne permettent pas le démarrage : évitez-les comme support système.',
        'Un mini PC apporte plus de puissance pour la vidéosurveillance locale, l’assistant vocal local ou de nombreuses applications. En contrepartie, l’installation demande de préparer le BIOS et d’écrire l’image du système sur le disque.'
      ] },
      { id: 'vm', title: 'Et une machine virtuelle ?', paragraphs: [
        'Si un serveur ou un ordinateur tourne déjà en permanence chez vous, Home Assistant OS peut fonctionner dans une machine virtuelle. C’est la configuration de l’éditeur, qui utilise Home Assistant OS sur un Mac avec un dongle Zigbee. Il faut alors transmettre le port USB du dongle à la machine virtuelle et s’assurer que l’ordinateur hôte reste allumé.'
      ] },
      { id: 'verdict', title: 'Notre recommandation', paragraphs: [
        'Vous débutez et voulez que ça marche : Home Assistant Green, plus un dongle Zigbee si vos appareils l’exigent. Vous avez un Raspberry Pi 4 ou 5 dans un tiroir : commencez avec lui, vous pourrez migrer plus tard grâce aux sauvegardes. Vous visez la vidéo locale ou un grand nombre d’intégrations : un mini PC x86-64.',
        'Dans tous les cas, Home Assistant OS reste le type d’installation recommandé par le projet pour la plupart des utilisateurs, car il gère les mises à jour et les applications.'
      ] }
    ],
    relatedProducts: ['home-assistant-green', 'home-assistant-connect-zbt-2', 'sonoff-zbdongle-p'],
    relatedArticles: ['installer-home-assistant', 'demarrer-home-assistant-green', 'zha-ou-zigbee2mqtt'],
    sources: [
      { label: 'Home Assistant — choisir son installation', url: haInstall },
      { label: 'Home Assistant — Green : caractéristiques', url: haGreen },
      { label: 'Home Assistant — installation sur Raspberry Pi', url: haRpi },
      { label: 'Home Assistant — installation sur x86-64', url: haX86 }
    ]
  },
  {
    ...base,
    documentId: 'local-guide-interrupteur-zigbee-neutre', type: 'guide', topic: 'eclairage', slug: 'interrupteur-zigbee-avec-ou-sans-neutre',
    title: 'Interrupteur Zigbee avec ou sans neutre : comment choisir ?',
    seoTitle: 'Module Zigbee avec ou sans neutre ? · DomoKlub',
    excerpt: 'Pas de fil neutre derrière votre interrupteur ? Il faut un module adapté. Comment vérifier votre boîtier et choisir entre ZBMINIL2 et ZBMINIR2.',
    intro: 'Tout se joue dans la boîte d’encastrement : si un fil neutre (en général bleu) y est présent, un module avec neutre comme le SONOFF ZBMINIR2 est le plus polyvalent. Sans neutre, il faut un modèle conçu pour, comme le SONOFF ZBMINIL2-E, en tenant compte d’une charge minimale de 3 W. Coupez toujours le courant au disjoncteur avant d’ouvrir, et faites appel à un électricien en cas de doute.',
    decisionTable: { title: 'Quel module selon votre boîtier ?', columns: ['Dans la boîte d’interrupteur', 'Module adapté', 'Point de vigilance'], rows: [
      ['Phase, retour lampe et neutre', 'SONOFF ZBMINIR2 (neutre requis)', 'Charge maximale 10 A résistifs'],
      ['Phase et retour lampe uniquement', 'SONOFF ZBMINIL2-E (sans neutre)', 'Charge minimale 3 W : attention aux petites LED'],
      ['Volet roulant motorisé', 'SONOFF MINI-ZBRBS', 'Moteur 1 A maximum, calibration du trajet'],
      ['Portail, chaudière, VMC (contact sec)', 'NodOn SIN-4-1-20', 'Vérifier l’entrée de commande de l’équipement']
    ] },
    sections: [
      { id: 'pourquoi', title: 'Pourquoi le neutre change tout', paragraphs: [
        'Un module connecté doit rester alimenté en permanence pour écouter le réseau Zigbee, même lumière éteinte. Avec un neutre, il s’alimente directement entre phase et neutre. Sans neutre, il doit faire passer un très faible courant à travers l’ampoule : c’est pour cela que les modèles sans neutre imposent une charge minimale.',
        'Dans beaucoup de logements anciens, seuls la phase et le retour lampe arrivent à l’interrupteur ; le neutre est au plafond. Avant d’acheter, ouvrez le boîtier (courant coupé) ou consultez votre schéma électrique.'
      ] },
      { id: 'avec-neutre', title: 'Avec neutre : SONOFF ZBMINIR2', paragraphs: [
        'Le ZBMINIR2 est un micromodule Zigbee 3.0 qui se loge derrière l’interrupteur existant. SONOFF indique une charge maximale de 10 A résistifs et des dimensions de 39,5 × 33 × 16,8 mm. Le neutre est obligatoire.',
        'Alimenté en permanence, il agit aussi comme routeur Zigbee : comme la plupart des appareils Zigbee branchés sur secteur, il relaie le signal des autres appareils et renforce le maillage. Gérald l’utilise chez lui sans problème signalé.'
      ] },
      { id: 'sans-neutre', title: 'Sans neutre : SONOFF ZBMINIL2-E', paragraphs: [
        'Le ZBMINIL2-E (vendu aussi sous le nom Orb-ZBW1L) est un interrupteur Zigbee 3.0 qui ne nécessite pas de neutre. SONOFF annonce 6 A maximum en charge résistive et une charge minimale de 3 W. Sous ce seuil, de petites ampoules LED peuvent scintiller ou rester faiblement allumées.',
        'Gérald l’utilise également sans problème signalé, mais il n’a pas précisé la puissance des ampoules raccordées. Si votre point lumineux consomme très peu, vérifiez la notice avant d’acheter.'
      ] },
      { id: 'installation', title: 'Avant l’installation', paragraphs: [
        'Ces modules se raccordent au 230 V. Coupez le disjoncteur du circuit, vérifiez l’absence de tension et suivez la notice du fabricant. Si vous n’êtes pas à l’aise avec l’électricité, faites intervenir un professionnel : une erreur de câblage peut endommager le module ou créer un risque d’incendie.',
        'Côté domotique, il vous faut un coordinateur Zigbee et Home Assistant (avec ZHA ou Zigbee2MQTT). Les deux modules SONOFF sont documentés sur le site de Zigbee2MQTT.'
      ] }
    ],
    relatedProducts: ['sonoff-zbmini-r2', 'sonoff-zbminil2-e', 'philips-hue-dimmer-switch', 'sonoff-mini-zbrbs'],
    relatedArticles: ['modules-zigbee-pour-debuter', 'zha-ou-zigbee2mqtt', 'ameliorer-portee-reseau-zigbee'],
    sources: [
      { label: 'SONOFF — manuel ZBMINIR2', url: relayManual },
      { label: 'SONOFF — manuel ZBMINIL2-E', url: orbManual },
      { label: 'SONOFF — manuel MINI-ZBRBS', url: blindManual },
      { label: 'NodOn — fiche technique SIN-4-1-20', url: nodonDoc }
    ]
  },
  {
    ...base,
    documentId: 'local-guide-portee-zigbee', type: 'guide', topic: 'zigbee', slug: 'ameliorer-portee-reseau-zigbee',
    title: 'Améliorer la portée Zigbee : placement du dongle, routeurs et interférences',
    seoTitle: 'Améliorer la portée de son réseau Zigbee · DomoKlub',
    excerpt: 'Appareils qui se déconnectent, appairage difficile ? Rallonge USB, ports USB 3, canal Wi-Fi et routeurs : les correctifs recommandés par la documentation.',
    intro: 'La plupart des problèmes de portée Zigbee viennent du placement du coordinateur et du manque de routeurs. Branchez le dongle sur une rallonge USB, loin des ports USB 3 et du routeur Wi-Fi, puis ajoutez des appareils Zigbee sur secteur, qui relaient le signal. Ce sont les deux premiers conseils des documentations ZHA et Zigbee2MQTT.',
    decisionTable: { title: 'Symptôme et premier correctif', columns: ['Symptôme', 'Cause fréquente', 'À essayer d’abord'], rows: [
      ['Appareils proches du dongle instables', 'Interférences USB 3 ou boîtier métallique', 'Rallonge USB blindée sur un port USB 2.0'],
      ['Appareils éloignés qui décrochent', 'Pas assez de routeurs', 'Ajouter un module ou une prise Zigbee sur secteur'],
      ['Coupures aux heures d’usage du Wi-Fi', 'Chevauchement Wi-Fi / Zigbee à 2,4 GHz', 'Fixer le canal Wi-Fi du routeur'],
      ['Appareil à pile qui ne répond plus', 'Pile faible ou routeur parent disparu', 'Remplacer la pile, réappairer près d’un routeur']
    ] },
    sections: [
      { id: 'dongle', title: 'Placer le dongle : la rallonge USB avant tout', paragraphs: [
        'La documentation de Home Assistant cite les ports USB 3.x, les périphériques et câbles USB 3 non blindés comme sources d’interférences bien connues pour les radios 2,4 GHz. Elle recommande d’éloigner l’adaptateur Zigbee avec une rallonge USB blindée suffisamment longue, branchée sur un port USB 2.0 ou un hub USB 2.0 alimenté.',
        'Zigbee2MQTT ajoute qu’orienter l’adaptateur tout en surveillant la valeur de qualité de liaison (linkquality) peut aider. Placez le dongle à l’écart des boîtiers métalliques, des disques durs et, si possible, à une position centrale du logement.'
      ] },
      { id: 'routeurs', title: 'Ajouter des routeurs : le maillage fait la portée', paragraphs: [
        'Zigbee est un réseau maillé : la plupart des appareils alimentés sur secteur jouent le rôle de routeurs et répètent le signal. Les capteurs à pile, eux, ne relaient rien. Un réseau composé surtout de capteurs à pile éloignés du coordinateur sera donc fragile.',
        'Un micromodule d’éclairage comme le SONOFF ZBMINIR2 ou une prise Zigbee comme la NOUS A7Z placée à mi-chemin suffit souvent à stabiliser une pièce difficile. Après l’ajout d’un routeur, il peut être utile de réappairer à proximité les appareils à pile qui décrochaient.'
      ] },
      { id: 'wifi', title: 'Cohabiter avec le Wi-Fi', paragraphs: [
        'Zigbee et le Wi-Fi 2,4 GHz partagent la même bande de fréquences. La documentation ZHA conseille de commencer par fixer un canal Wi-Fi statique sur votre box ou vos points d’accès, plutôt que de changer immédiatement le canal Zigbee.',
        'Changer le canal Zigbee est possible, mais Zigbee2MQTT prévient que cela peut obliger à réappairer certains appareils. Les autres équipements 2,4 GHz (Bluetooth, récepteurs de souris sans fil) peuvent aussi perturber le réseau.'
      ] },
      { id: 'diagnostic', title: 'Diagnostiquer avant d’acheter', paragraphs: [
        'ZHA et Zigbee2MQTT proposent une carte du réseau qui montre les liaisons entre appareils et leur qualité. Repérez les appareils isolés ou reliés directement au coordinateur malgré la distance : c’est là qu’un routeur supplémentaire aura le plus d’effet.',
        'Si votre coordinateur est ancien, la documentation de Zigbee2MQTT recommande d’utiliser un adaptateur de la liste conseillée. Un dongle avec antenne externe, comme le SONOFF ZBDongle-P, est une option courante, mais le placement reste plus déterminant que la référence.'
      ] }
    ],
    relatedProducts: ['sonoff-zbdongle-p', 'nous-a7z', 'sonoff-zbmini-r2', 'lixee-zlinky-tic'],
    relatedArticles: ['zha-ou-zigbee2mqtt', 'choisir-coordinateur-zigbee-home-assistant', 'modules-zigbee-pour-debuter'],
    sources: [
      { label: 'Home Assistant — ZHA : interférences et bonnes pratiques', url: haZha },
      { label: 'Zigbee2MQTT — améliorer la portée et la stabilité', url: z2mRange },
      { label: 'Zigbee2MQTT — adaptateurs pris en charge', url: z2mAdapters }
    ]
  },
  {
    ...base,
    documentId: 'local-comparatif-modules-zigbee', type: 'comparison', topic: 'zigbee', slug: 'modules-zigbee-pour-debuter',
    title: 'Modules et capteurs Zigbee pour débuter avec Home Assistant : notre sélection',
    seoTitle: 'Modules Zigbee pour débuter : sélection · DomoKlub',
    excerpt: 'Éclairage, volets, portail, prises, compteur Linky, détecteurs : neuf appareils Zigbee utilisés chez l’éditeur, classés par usage, avec leurs limites.',
    intro: 'Pour équiper une maison en Zigbee, commencez par un bon coordinateur, puis choisissez chaque module selon l’usage et le câblage disponible. Les appareils ci-dessous sont utilisés par l’éditeur dans son installation Home Assistant et fonctionnent sans problème signalé. Il s’agit de retours d’usage, pas d’un banc d’essai comparatif : les caractéristiques citées viennent des fabricants.',
    decisionTable: { title: 'Quel appareil pour quel usage ?', columns: ['Usage', 'Appareil', 'Condition principale'], rows: [
      ['Réseau Zigbee (indispensable)', 'SONOFF ZBDongle-P', 'Compatible ZHA et Zigbee2MQTT ; rallonge USB conseillée'],
      ['Lumière avec neutre', 'SONOFF ZBMINIR2', 'Neutre requis, 10 A max.'],
      ['Lumière sans neutre', 'SONOFF ZBMINIL2-E', 'Charge minimale 3 W'],
      ['Volet roulant', 'SONOFF MINI-ZBRBS', 'Moteur 1 A max., calibration'],
      ['Portail, chaudière, VMC', 'NodOn SIN-4-1-20', 'Entrée contact sec sur l’équipement'],
      ['Ouverture de porte ou fenêtre', 'SONOFF SNZB-04P', 'Pile CR2477, écart de pose 20 mm max.'],
      ['Consommation d’un appareil', 'NOUS A7Z', '16 A max., sert aussi de routeur'],
      ['Consommation de la maison', 'LiXee ZLinky TIC', 'Compteur Linky à portée du réseau'],
      ['Présence et luminosité', 'Philips Hue Motion Sensor', 'Usage intérieur, 2 piles AAA']
    ] },
    sections: [
      { id: 'coordinateur', title: '1. Le coordinateur : SONOFF ZBDongle-P', paragraphs: [
        'Rien ne fonctionne sans coordinateur. Le ZBDongle-P (puce Texas Instruments CC2652P, antenne externe) est utilisé par l’éditeur avec Zigbee2MQTT depuis juin 2025, avec une mise en service jugée « plug and play ». Le Home Assistant Connect ZBT-2, recommandé par Home Assistant pour ZHA, est l’autre option à considérer.'
      ] },
      { id: 'eclairage', title: '2. L’éclairage : ZBMINIR2 ou ZBMINIL2-E', paragraphs: [
        'Le choix dépend du fil neutre dans la boîte d’interrupteur. Avec neutre, le ZBMINIR2 (10 A résistifs) se glisse derrière l’interrupteur existant et sert aussi de routeur Zigbee. Sans neutre, le ZBMINIL2-E remplace l’interrupteur ; prévoyez au moins 3 W de charge pour éviter le scintillement des petites LED.'
      ] },
      { id: 'volets', title: '3. Les volets : SONOFF MINI-ZBRBS', paragraphs: [
        'Ce micromodule commande un moteur de volet roulant jusqu’à 1 A selon SONOFF. Dans Zigbee2MQTT, il expose ouverture, fermeture et position en pourcentage après une calibration du trajet. Vérifiez la place disponible derrière l’interrupteur de volet.'
      ] },
      { id: 'contact-sec', title: '4. Portail, chaudière ou VMC : NodOn SIN-4-1-20', paragraphs: [
        'Ce module NodOn fournit un contact sec, c’est-à-dire un simple interrupteur sans tension que l’équipement interprète comme un ordre. Il convient aux portails, chaudières ou VMC qui disposent d’une entrée de commande prévue pour cela : vérifiez la notice de l’équipement avant d’acheter.'
      ] },
      { id: 'capteur', title: '5. Les ouvertures : SONOFF SNZB-04P', paragraphs: [
        'Ce capteur à pile CR2477 détecte l’ouverture d’une porte ou d’une fenêtre et signale aussi le sabotage selon Zigbee2MQTT. C’est la base d’automatisations simples : couper le chauffage fenêtre ouverte, allumer l’entrée, recevoir une alerte. Comme tout appareil à pile, il ne relaie pas le signal Zigbee.'
      ] },
      { id: 'prises', title: '6. Les prises et la consommation : NOUS A7Z et LiXee ZLinky', paragraphs: [
        'La prise NOUS A7Z (16 A) mesure la consommation de l’appareil branché et renforce le maillage, comme tout appareil Zigbee sur secteur. Pour la consommation de toute la maison, le LiXee ZLinky se branche sur la téléinformation du compteur Linky et alimente le tableau de bord Énergie de Home Assistant. Gérald utilise les deux sans problème rencontré.'
      ] },
      { id: 'presence', title: '7. La présence : Philips Hue Motion Sensor', paragraphs: [
        'Les produits Hue sont des appareils Zigbee : le détecteur de mouvement Hue fonctionne avec Zigbee2MQTT sans pont Hue et remonte aussi luminosité et température. Gérald l’utilise pour éclairer son garage.'
      ] },
      { id: 'ordre', title: 'Dans quel ordre équiper la maison ?', paragraphs: [
        'Commencez par le coordinateur et deux ou trois modules sur secteur répartis dans le logement : ils forment l’ossature du maillage. Ajoutez ensuite les capteurs à pile. Cet ordre évite la plupart des problèmes de portée décrits dans notre guide dédié.',
        'Pour les modules raccordés au 230 V, coupez le disjoncteur et suivez la notice ; en cas de doute, confiez l’installation à un électricien.'
      ] }
    ],
    relatedProducts: ['sonoff-zbdongle-p', 'sonoff-zbmini-r2', 'sonoff-zbminil2-e', 'sonoff-mini-zbrbs', 'nodon-sin-4-1-20', 'sonoff-snzb-04p', 'nous-a7z', 'philips-hue-motion-sensor', 'lixee-zlinky-tic'],
    relatedArticles: ['interrupteur-zigbee-avec-ou-sans-neutre', 'ameliorer-portee-reseau-zigbee', 'zha-ou-zigbee2mqtt'],
    sources: [
      { label: 'SONOFF — manuel ZBMINIR2', url: relayManual },
      { label: 'SONOFF — manuel ZBMINIL2-E', url: orbManual },
      { label: 'SONOFF — manuel MINI-ZBRBS', url: blindManual },
      { label: 'SONOFF — manuel SNZB-04P', url: sensorManual },
      { label: 'NodOn — fiche technique SIN-4-1-20', url: nodonDoc },
      { label: 'Zigbee2MQTT — adaptateurs pris en charge', url: z2mAdapters }
    ]
  }
]
