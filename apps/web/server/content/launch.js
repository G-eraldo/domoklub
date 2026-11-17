// Contenus de lancement : brouillons documentaires soumis à validation humaine.
// Les URLs de produits viennent de l'éditeur ; les faits techniques des fabricants.
const checkedAt = '2026-11-17T10:00:00+01:00'
const haGreen = 'https://www.home-assistant.io/green/'
const haInstall = 'https://www.home-assistant.io/installation/'
const haZigbee = 'https://www.home-assistant.io/connectivity/zigbee/'
const haZha = 'https://www.home-assistant.io/integrations/zha/'
const haMatter = 'https://www.home-assistant.io/integrations/matter/'
const haThread = 'https://www.home-assistant.io/connectivity/thread/'
const haZbt2 = 'https://www.home-assistant.io/connect/zbt-2/'
const sonoffPp10 = 'https://dongle.sonoff.tech/guide/dongle-pp10/introduction-dongle-pp10/'

export const launchArticles = [
  {
    documentId: 'local-guide-demarrer-home-assistant-green', editorialStatus: 'approved',
    publishedAt: checkedAt, type: 'guide', topic: 'home-assistant', slug: 'demarrer-home-assistant-green',
    title: 'Démarrer avec Home Assistant Green : ce qu’il faut prévoir',
    excerpt: 'La box est prête à démarrer, mais le choix des appareils et des radios mérite quelques vérifications. Voici un premier parcours sans achat inutile.',
    updatedAt: checkedAt,
    intro: 'Home Assistant Green simplifie le démarrage : le système est déjà installé. Le vrai choix se situe ensuite dans les appareils que vous souhaitez relier et les protocoles qu’ils utilisent.',
    sections: [
      { id: 'avant-achat', title: 'Avant d’acheter : vérifier le besoin', paragraphs: [
        'Si vous voulez surtout centraliser des appareils déjà présents sur votre réseau, Home Assistant Green est une entrée simple dans l’écosystème Home Assistant. Il faut une prise électrique et un port Ethernet disponible sur le réseau local. Le fabricant précise qu’une connexion Internet est nécessaire lors de la configuration initiale.',
        'Si vous possédez déjà un ordinateur ou un Raspberry Pi adapté, Home Assistant propose aussi ces voies d’installation. Green évite le montage et l’installation du système ; il n’est pas indispensable à tout projet domotique. Vérifiez d’abord les intégrations de vos appareils existants dans la documentation officielle.'
      ] },
      { id: 'installation', title: 'Le premier démarrage, étape par étape', paragraphs: [
        'Branchez le câble Ethernet fourni entre la box et votre réseau, puis connectez son alimentation. Laissez le système démarrer, puis ouvrez l’application mobile Home Assistant ou l’interface web indiquée dans la notice officielle. Suivez l’assistant de création du compte local et de découverte des appareils.',
        'Ce parcours reprend la documentation du fabricant ; DomoKlub n’a pas encore réalisé d’installation sur ce matériel. Les écrans peuvent évoluer avec les versions de Home Assistant. En cas de difficulté, privilégiez la notice et les instructions officielles avant de modifier la configuration réseau.'
      ] },
      { id: 'zigbee', title: 'Pour Zigbee, prévoir une radio séparée', paragraphs: [
        'Home Assistant Green ne possède pas de radio Zigbee intégrée. Pour associer directement des capteurs ou ampoules Zigbee, il faut un coordinateur compatible, par exemple Home Assistant Connect ZBT-2 configuré en Zigbee. Une autre possibilité consiste à conserver une passerelle existante si son intégration Home Assistant répond à votre besoin.',
        'Le ZBT-2 peut être dédié à Zigbee ou à Thread, mais pas aux deux simultanément. Ne comptez donc pas sur un seul adaptateur pour créer deux réseaux radio en parallèle. Pour un appareil Matter sur Wi-Fi, la question est différente : il n’a pas besoin de radio Zigbee.'
      ] },
      { id: 'choix', title: 'Le choix raisonnable pour un premier achat', paragraphs: [
        'Commencez par lister trois appareils que vous voulez réellement piloter et notez leur protocole : Wi-Fi, Zigbee, Thread ou autre. Vérifiez leur intégration précise dans Home Assistant. Achetez Green seule si vos premiers appareils fonctionnent déjà via le réseau local ; ajoutez un coordinateur seulement lorsque votre projet Zigbee le demande.',
        'Home Assistant Green convient surtout à qui veut une installation dédiée et prête à l’emploi. Il convient moins à qui cherche un ordinateur polyvalent ou souhaite bricoler le matériel. Le choix d’un coordinateur dépend ensuite du logiciel Zigbee et du mode de maintenance que vous préférez.'
      ] }
    ],
    relatedProducts: ['home-assistant-green', 'home-assistant-connect-zbt-2'],
    relatedArticles: ['choisir-coordinateur-zigbee-home-assistant', 'matter-thread-zigbee-differences'],
    sources: [
      { label: 'Home Assistant — Green : contenu et limites matérielles', url: haGreen },
      { label: 'Home Assistant — modes d’installation', url: haInstall },
      { label: 'Home Assistant — Connect ZBT-2', url: haZbt2 },
      { label: 'Home Assistant — Matter', url: haMatter }
    ]
  },
  {
    documentId: 'local-guide-coordinateur-zigbee', editorialStatus: 'approved',
    publishedAt: checkedAt, type: 'guide', topic: 'zigbee', slug: 'choisir-coordinateur-zigbee-home-assistant',
    title: 'Quel coordinateur Zigbee choisir pour Home Assistant ?',
    excerpt: 'Pour créer un réseau Zigbee, il faut une radio compatible et choisir son logiciel. Les critères qui comptent avant de comparer les dongles.',
    updatedAt: checkedAt,
    intro: 'Un coordinateur Zigbee relie vos appareils radio à Home Assistant. Le nom du dongle ne suffit pas : il faut aussi vérifier le logiciel choisi, le firmware, la portée réelle chez vous et la possibilité de maintenir le réseau.',
    sections: [
      { id: 'besoin', title: 'Avez-vous vraiment besoin d’un coordinateur ?', paragraphs: [
        'Si vos appareils utilisent déjà une passerelle intégrée à Home Assistant et que ses fonctions vous suffisent, un dongle supplémentaire n’est pas obligatoire. Un coordinateur devient utile lorsque vous souhaitez créer et administrer directement votre propre réseau Zigbee depuis Home Assistant.',
        'La box Home Assistant Green ne contient pas cette radio. Un ordinateur qui héberge Home Assistant a lui aussi besoin d’un adaptateur Zigbee compatible pour un réseau direct. Les appareils Matter sur Wi-Fi et les appareils Thread relèvent d’autres choix réseau.'
      ] },
      { id: 'logiciel', title: 'ZHA ou Zigbee2MQTT : choisir avant le matériel', paragraphs: [
        'ZHA est l’intégration Zigbee de Home Assistant. Sa documentation explique les adaptateurs compatibles, la création du réseau et les conseils contre les interférences. Home Assistant recommande son adaptateur Connect ZBT-2 pour un nouveau réseau ZHA.',
        'Zigbee2MQTT est une autre voie. Avant de choisir un dongle pour cette configuration, consultez sa liste officielle des adaptateurs supportés et la procédure de migration éventuelle. Une compatibilité générale Zigbee ne garantit pas les mêmes fonctions ou la même facilité de mise à jour dans chaque logiciel.'
      ] },
      { id: 'comparaison', title: 'Deux produits à examiner sans les confondre', paragraphs: [
        'Home Assistant Connect ZBT-2 est conçu par l’équipe Home Assistant. Il prend en charge Zigbee 3.0 ou Thread selon le firmware et le mode choisi. Il ne fait pas fonctionner ces deux protocoles en même temps. Sa page officielle décrit aussi un câble USB et une antenne externe.',
        'SONOFF Dongle-PP10 utilise une puce CC2674P10. La documentation SONOFF le présente pour Home Assistant, Zigbee2MQTT et OpenThread Border Router. Vérifiez la version du firmware et le guide du logiciel retenu avant de l’acheter. DomoKlub n’a pas mesuré la portée ni comparé la stabilité de ces deux adaptateurs.'
      ] },
      { id: 'installation', title: 'Les critères qui évitent les mauvaises surprises', paragraphs: [
        'Vérifiez le support exact de l’adaptateur dans votre logiciel, la procédure de mise à jour du firmware et la disponibilité d’une méthode de sauvegarde ou de migration. Prévoyez un emplacement qui éloigne la radio des sources d’interférences, notamment les ports USB 3.0 et les équipements Wi-Fi proches, comme l’explique Home Assistant.',
        'Ne déduisez pas une portée en mètres d’une fiche commerciale : murs, position, canaux radio et appareils routeurs changent le résultat. Si vous remplacez un réseau existant, lisez d’abord la procédure de migration du logiciel utilisé : une simple substitution de clé peut nécessiter de réassocier des appareils.'
      ] },
      { id: 'verdict', title: 'Par quoi commencer ?', paragraphs: [
        'Pour un premier réseau ZHA et une intégration officielle, Connect ZBT-2 est le point de départ recommandé par Home Assistant. Pour une configuration Zigbee2MQTT ou une préférence de matériel différente, le Dongle-PP10 mérite un examen de compatibilité à jour. Ce repère repose sur les documentations publiées, pas sur un test comparatif DomoKlub.',
        'Choisissez enfin un seul protocole radio pour chaque dongle. Si votre projet prévoit à la fois Zigbee et Thread, vérifiez si un routeur de bordure Thread existe déjà chez vous avant d’acheter un second adaptateur.'
      ] }
    ],
    relatedProducts: ['home-assistant-connect-zbt-2', 'sonoff-dongle-pp10', 'home-assistant-green'],
    relatedArticles: ['matter-thread-zigbee-differences', 'demarrer-home-assistant-green'],
    sources: [
      { label: 'Home Assistant — choisir un adaptateur Zigbee', url: haZigbee },
      { label: 'Home Assistant — intégration ZHA', url: haZha },
      { label: 'Home Assistant — Connect ZBT-2', url: haZbt2 },
      { label: 'SONOFF — documentation Dongle-PP10', url: sonoffPp10 },
      { label: 'Zigbee2MQTT — adaptateurs supportés', url: 'https://www.zigbee2mqtt.io/guide/adapters/' }
    ]
  },
  {
    documentId: 'local-guide-matter-thread-zigbee', editorialStatus: 'approved',
    publishedAt: checkedAt, type: 'guide', topic: 'matter', slug: 'matter-thread-zigbee-differences',
    title: 'Matter, Thread et Zigbee : quelles différences chez vous ?',
    excerpt: 'Matter décrit une façon de faire communiquer les appareils ; Thread et Zigbee sont des réseaux radio. Ce que ces mots changent dans vos achats.',
    updatedAt: checkedAt,
    intro: 'Les emballages mélangent souvent trois noms. Pourtant, ils ne répondent pas à la même question : Matter concerne l’interopérabilité des appareils ; Thread et Zigbee désignent des réseaux utilisés pour les relier.',
    sections: [
      { id: 'trois-roles', title: 'Trois rôles à distinguer', paragraphs: [
        'Matter est un standard de communication pour la maison connectée. Dans Home Assistant, un appareil Matter peut communiquer sur le réseau Wi-Fi ou sur Thread. Le logo Matter, seul, ne dit donc pas quel équipement réseau il vous faut.',
        'Thread est un réseau maillé radio à faible consommation. Pour joindre des appareils Matter sur Thread depuis le réseau domestique, il faut un routeur de bordure Thread. Zigbee est un autre réseau radio maillé : dans Home Assistant, un réseau Zigbee direct demande un coordinateur compatible et une intégration comme ZHA.'
      ] },
      { id: 'materiel', title: 'Quel matériel prévoir selon l’étiquette ?', paragraphs: [
        'Pour un appareil Matter sur Wi-Fi, vérifiez d’abord la compatibilité Matter de votre installation et suivez la procédure officielle d’ajout. Pour un appareil Matter sur Thread, vérifiez la présence d’un routeur de bordure Thread. Il peut déjà exister sur votre réseau ; un achat supplémentaire n’est pas systématique.',
        'Pour un appareil Zigbee que vous voulez associer directement à Home Assistant, il faut un coordinateur Zigbee. Home Assistant Green seule ne fournit pas cette radio. Connect ZBT-2 peut servir à Zigbee ou à Thread selon son réglage, sans assurer les deux en parallèle.'
      ] },
      { id: 'compatibilite', title: 'Une étiquette ne garantit pas toutes les fonctions', paragraphs: [
        'Avant l’achat, relevez le modèle exact et consultez son intégration officielle ainsi que les fonctions exposées. Un même type de produit peut présenter des capacités différentes selon le firmware, l’application et le protocole utilisé.',
        'Si vous possédez déjà une passerelle et des appareils en service, leur remplacement peut entraîner une reconfiguration. Faites l’inventaire de l’existant avant de décider de créer un nouveau réseau. La meilleure solution est celle qui couvre vos usages réels avec le moins de complexité supplémentaire.'
      ] },
      { id: 'repere', title: 'Le repère d’achat en une minute', paragraphs: [
        'Lisez toujours la mention complète : « Matter over Wi-Fi », « Matter over Thread » ou « Zigbee ». Puis cherchez le matériel correspondant : réseau Wi-Fi et contrôleur Matter ; routeur de bordure Thread ; ou coordinateur Zigbee. Enfin, contrôlez la compatibilité du modèle exact avec Home Assistant.',
        'Ce guide présente des règles de lecture générales à partir des documentations officielles. Il ne garantit pas la compatibilité d’un appareil particulier et ne remplace pas sa fiche technique à jour.'
      ] }
    ],
    relatedProducts: ['home-assistant-green', 'home-assistant-connect-zbt-2', 'sonoff-dongle-pp10'],
    relatedArticles: ['choisir-coordinateur-zigbee-home-assistant', 'demarrer-home-assistant-green'],
    sources: [
      { label: 'Home Assistant — intégration Matter', url: haMatter },
      { label: 'Home Assistant — réseau Thread', url: haThread },
      { label: 'Home Assistant — réseau Zigbee', url: haZigbee },
      { label: 'Home Assistant — Connect ZBT-2', url: haZbt2 }
    ]
  }
]

const spec = (value, sourceUrl) => ({ value, sourceUrl, checkedAt })
const compatible = (status, sourceUrl) => ({ status, sourceUrl, checkedAt })

export const launchProducts = [
  {
    documentId: 'local-home-assistant-green', editorialStatus: 'approved',
    slug: 'home-assistant-green', name: 'Home Assistant Green', brand: 'Nabu Casa', category: 'Box domotique',
    summary: 'Une box dédiée avec Home Assistant OS préinstallé. Ethernet obligatoire pour le premier parcours ; un adaptateur séparé est nécessaire pour créer directement un réseau Zigbee.',
    evidenceLevel: 'documentary', updatedAt: checkedAt,
    buyerNote: 'Pour démarrer avec Home Assistant sans installer un système sur un ordinateur. Vérifiez d’abord vos appareils et le besoin d’une radio Zigbee.',
    limitations: ['Pas de radio Zigbee ou Thread intégrée.', 'Port Ethernet et alimentation requis.', 'Aucun essai matériel DomoKlub à ce jour.'],
    specs: {
      'Processeur': spec('Rockchip RK3566, quatre cœurs Arm Cortex-A55 à 1,8 GHz', haGreen),
      'Mémoire vive': spec('4 Go LPDDR4X', haGreen),
      'Stockage': spec('32 Go eMMC', haGreen),
      'Réseau': spec('Ethernet Gigabit', haGreen),
      'Ports USB': spec('2 ports USB 2.0 Type-A', haGreen),
      'Système': spec('Home Assistant OS préinstallé', haInstall)
    },
    compatibilities: {
      'Zigbee sans accessoire': compatible('incompatible', haGreen),
      'Zigbee avec Connect ZBT-2': compatible('confirmed', haGreen),
      'Matter sur Wi-Fi': compatible('confirmed', haGreen)
    },
    relatedArticles: ['demarrer-home-assistant-green', 'choisir-coordinateur-zigbee-home-assistant'],
    sources: [{ label: 'Home Assistant — fiche officielle Green', url: haGreen }, { label: 'Home Assistant — installation', url: haInstall }]
  },
  {
    documentId: 'local-home-assistant-connect-zbt-2', editorialStatus: 'approved',
    slug: 'home-assistant-connect-zbt-2', name: 'Home Assistant Connect ZBT-2', brand: 'Nabu Casa', category: 'Coordinateur Zigbee',
    summary: 'Adaptateur USB officiel pour créer un réseau Zigbee ou Thread dans Home Assistant. Il faut choisir un protocole à la fois.',
    evidenceLevel: 'documentary', updatedAt: checkedAt,
    buyerNote: 'Pour ajouter une radio à Home Assistant Green ou à une autre installation compatible. La documentation Home Assistant le recommande pour un nouveau réseau ZHA.',
    limitations: ['Zigbee et Thread ne fonctionnent pas simultanément sur le même adaptateur.', 'La portée réelle dépend du logement et du placement.', 'Aucun test de portée DomoKlub à ce jour.'],
    specs: {
      'Puce radio': spec('Silicon Labs MG24', haZbt2),
      'Connexion': spec('USB-C, 5 V / 500 mA', haZbt2),
      'Protocoles': spec('Zigbee 3.0 ou Thread', haZbt2),
      'Antenne': spec('Antenne externe', haZbt2)
    },
    compatibilities: {
      'Home Assistant / ZHA': compatible('confirmed', haZha),
      'Zigbee2MQTT': compatible('confirmed', haZbt2),
      'Zigbee et Thread simultanés': compatible('incompatible', haZbt2)
    },
    relatedArticles: ['choisir-coordinateur-zigbee-home-assistant', 'matter-thread-zigbee-differences'],
    sources: [{ label: 'Home Assistant — fiche officielle ZBT-2', url: haZbt2 }, { label: 'Home Assistant — ZHA', url: haZha }]
  },
  {
    documentId: 'local-sonoff-dongle-pp10', editorialStatus: 'approved',
    slug: 'sonoff-dongle-pp10', name: 'SONOFF Dongle-PP10', brand: 'SONOFF', category: 'Coordinateur Zigbee',
    summary: 'Dongle USB à puce CC2674P10 présenté par SONOFF pour Zigbee ou Thread. Vérifier le firmware et le logiciel prévus avant l’achat.',
    evidenceLevel: 'documentary', updatedAt: checkedAt,
    buyerNote: 'Une option à examiner pour Home Assistant ou Zigbee2MQTT si vous acceptez de vérifier la configuration et le firmware requis.',
    limitations: ['Les fonctions exactes dépendent du firmware et du logiciel choisi.', 'Aucun essai de compatibilité ou de portée DomoKlub à ce jour.'],
    specs: {
      'Puce radio': spec('Texas Instruments CC2674P10', sonoffPp10),
      'Connexion': spec('USB', sonoffPp10),
      'Protocoles': spec('Zigbee ou Thread selon configuration', sonoffPp10)
    },
    compatibilities: {
      'Home Assistant': compatible('confirmed', sonoffPp10),
      'Zigbee2MQTT': compatible('confirmed', sonoffPp10)
    },
    relatedArticles: ['choisir-coordinateur-zigbee-home-assistant', 'matter-thread-zigbee-differences'],
    sources: [{ label: 'SONOFF — documentation Dongle-PP10', url: sonoffPp10 }]
  }
]

export const launchOffers = [
  { editorialStatus: 'approved', productDocumentId: 'local-home-assistant-green', merchantName: 'Domadoo', url: 'https://www.domadoo.fr/fr/produits-compatibles-home-assistant/7046-nabu-casa-box-domotique-home-assistant-green-0860011789703.html?domid=159', active: true, checkedAt, expiresAt: '2026-11-24T10:00:00+01:00' },
  { editorialStatus: 'approved', productDocumentId: 'local-home-assistant-connect-zbt-2', merchantName: 'Domadoo', url: 'https://www.domadoo.fr/fr/dongle-zigbee/8542-nabu-casa-home-assistant-connect-zbt-2-adaptateur-usb-zigbee-ou-matter-thread-0860011789741.html?domid=159', active: true, checkedAt, expiresAt: '2026-11-24T10:00:00+01:00' },
  { editorialStatus: 'approved', productDocumentId: 'local-sonoff-dongle-pp10', merchantName: 'Domadoo', url: 'https://www.domadoo.fr/fr/produits-de-domotique/9773-sonoff-dongle-pp10-dongle-usb-zigbee-ou-matter-thread-cc2674p10-6979033600850.html?domid=159', active: true, checkedAt, expiresAt: '2026-11-24T10:00:00+01:00' }
]
