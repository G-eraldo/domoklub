// Retours d'usage transmis par Gérald François le 17 novembre 2026.
// Les caractéristiques viennent des sources indiquées ; aucun score chiffré n’est publié.
const checkedAt = '2026-11-17T13:00:00+01:00'
const spec = (value, sourceUrl) => ({ value, sourceUrl, checkedAt })
const compatible = (status, sourceUrl) => ({ status, sourceUrl, checkedAt })
const sonoffP = 'https://dongle.sonoff.tech/guide/zbdongle-p/hardware_specification-2/'
const z2mP = 'https://www.zigbee2mqtt.io/guide/adapters/zstack.html'
const orbManual = 'https://support.sonoff.tech/zbminil2-e-usermanual/'
const orbBundle = 'https://www.domadoo.fr/fr/produits-de-domotique/8412-sonoff-module-zigbee-sans-neutre-interrupteur-zbminil2-e-orb-zbw1l.html'
const socketManual = 'https://support.sonoff.tech/ws01tpe-e-usermanual/'
const nodonDoc = 'https://nodon.fr/wp-content/uploads/2021/04/NodOn_Zigbee_MultifunctionRelaySwitch_SIN-4-1-20-Datasheet_FR.pdf'
const nodonZ2m = 'https://www.zigbee2mqtt.io/devices/SIN-4-1-20.html'
const aqaraProduct = 'https://www.aqara.com/en/product/doorbell-camera-hub-g410/'
const aqaraSpecs = 'https://www.aqara.com/en/product/doorbell-camera-hub-g410-specs/'
const sensorManual = 'https://support.sonoff.tech/snzb-04p-usermanual/'
const sensorZ2m = 'https://www.zigbee2mqtt.io/devices/SNZB-04P.html'
const blindManual = 'https://support.sonoff.tech/mini-zbrbs-usermanual/'
const blindZ2m = 'https://www.zigbee2mqtt.io/devices/MINI-ZBRBS.html'
const relayManual = 'https://support.sonoff.tech/zbminir2-usermanual/'
const relayZ2m = 'https://www.zigbee2mqtt.io/devices/ZBMINIR2.html'
const usage = (context, observation, caveat = 'Aucune mesure instrumentée ni comparaison directe n’a été fournie pour ce produit.') => ({
  author: 'Gérald François', context, observations: [observation], caveat
})
const base = (slug, name, brand, category, seoTitle, seoDescription, summary, buyerNote, limitations, review, specs, compatibilities, relatedArticles, sources) => ({
  documentId: `local-${slug}`, editorialStatus: 'approved', slug, name, brand, category,
  seoTitle, seoDescription, summary, buyerNote, limitations,
  evidenceLevel: 'experienced', usageEvidenceApproved: true, personalReview: review,
  updatedAt: checkedAt, specs, compatibilities, relatedArticles, sources
})

export const experiencedProducts = [
  base(
    'sonoff-zbdongle-p', 'SONOFF ZBDongle-P CC2652P', 'SONOFF', 'Coordinateur Zigbee',
    'SONOFF ZBDongle-P : avis et Zigbee2MQTT · DomoKlub',
    'Avis personnel sur le SONOFF ZBDongle-P utilisé avec Zigbee2MQTT depuis juin 2025 : installation, limites et caractéristiques vérifiées avant achat.',
    'Clé USB Zigbee 3.0 avec puce CC2652P et antenne externe. Gérald l’utilise avec Zigbee2MQTT depuis juin 2025.',
    'Un choix concret pour créer un réseau Zigbee sous Zigbee2MQTT. Vérifiez que vous achetez le modèle P, à distinguer du ZBDongle-E.',
    ['Dongle Zigbee : il ne remplace pas un routeur de bordure Thread.', 'La portée réelle dépend du logement et du placement USB ; elle n’a pas été mesurée ici.'],
    usage('Coordinateur de tout le réseau Zigbee2MQTT de Gérald depuis juin 2025 : une vingtaine de modules, capteurs et prises répartis dans la maison.', 'Mise en service jugée « plug and play » ; aucun problème rencontré depuis l’installation.', 'Aucun relevé de portée ni de version de firmware n’a été communiqué.'),
    { 'Puce': spec('Texas Instruments CC2652P', sonoffP), 'Radio': spec('Zigbee 3.0', sonoffP), 'Connexion': spec('USB avec interface série CP2102(N)', sonoffP), 'Antenne': spec('Externe', sonoffP) },
    { 'Zigbee2MQTT / adaptateur zStack': compatible('confirmed', z2mP) },
    ['zha-ou-zigbee2mqtt', 'choisir-coordinateur-zigbee-home-assistant', 'ameliorer-portee-reseau-zigbee', 'modules-zigbee-pour-debuter'],
    [{ label: 'SONOFF — fiche matérielle ZBDongle-P', url: sonoffP }, { label: 'Zigbee2MQTT — adaptateurs zStack', url: z2mP }]
  ),
  base(
    'sonoff-zbminil2-e', 'SONOFF Orb-ZBW1L / ZBMINIL2-E', 'SONOFF', 'Interrupteur Zigbee',
    'SONOFF ZBMINIL2-E : avis sans neutre · DomoKlub',
    'Avis personnel sur le SONOFF Orb-ZBW1L ZBMINIL2-E : interrupteur Zigbee sans neutre, charge minimale et contenu de l’offre Domadoo à vérifier.',
    'Interrupteur mural Zigbee sans neutre, référence ZBMINIL2-E. L’offre Domadoo décrit un module ZBMINIL2 avec boîtier E1GSL.',
    'Pour rendre un point lumineux pilotable sans neutre au niveau de l’interrupteur. Vérifiez le modèle exact, la charge et le contenu du colis.',
    ['Charge minimale de 3 W selon SONOFF : contrôler les petits éclairages LED.', 'Installation sur secteur : suivre la notice et faire intervenir un professionnel compétent si nécessaire.', 'La description du lot Domadoo et son visuel commercial doivent être rapprochés avant commande.'],
    usage('Module ZBMINIL2 utilisé pour l’éclairage du garage, sous Zigbee2MQTT ; puissance de la charge raccordée non communiquée.', 'Fonctionne bien dans son installation ; aucun problème rencontré à ce jour.'),
    { 'Référence': spec('Orb-ZBW1L / ZBMINIL2-E', orbManual), 'Radio': spec('Zigbee 3.0', orbManual), 'Neutre': spec('Non requis', orbManual), 'Charge': spec('6 A max. résistif ; charge minimale 3 W', orbManual), 'Contenu du lot Domadoo': spec('Module ZBMINIL2 et boîtier E1GSL selon la fiche marchande', orbBundle) },
    {}, ['interrupteur-zigbee-avec-ou-sans-neutre', 'modules-zigbee-pour-debuter', 'zha-ou-zigbee2mqtt'],
    [{ label: 'SONOFF — manuel ZBMINIL2-E', url: orbManual }, { label: 'Domadoo — description du lot ZBMINIL2-E', url: orbBundle }]
  ),
  base(
    'sonoff-orb-socket', 'SONOFF Orb Socket WS01TPE-E', 'SONOFF', 'Prise Matter',
    'SONOFF Orb Socket : avis Matter Wi-Fi · DomoKlub',
    'Avis personnel sur la prise encastrée SONOFF Orb Socket WS01TPE-E : Matter sur Wi-Fi, charge électrique et points à vérifier avec Home Assistant.',
    'Prise murale de type E compatible Matter sur Wi-Fi 2,4 GHz. Elle ne crée pas de réseau Thread et ne nécessite pas de dongle Zigbee.',
    'Pour ajouter une prise Matter à une installation compatible. Vérifiez la place dans la boîte d’encastrement et la présence du Wi-Fi 2,4 GHz.',
    ['Il s’agit de Matter sur Wi-Fi, pas de Matter sur Thread.', 'Charge maximale de 16 A résistifs selon SONOFF ; la nature de la charge compte.', 'Installation sur secteur : respecter la notice et les règles électriques applicables.'],
    usage('Utilisée personnellement ; durée, contrôleur Matter et type de charge non communiqués.', 'Fonctionne bien dans son installation ; aucun problème rencontré à ce jour.'),
    { 'Modèle': spec('WS01TPE-E, prise de type E', socketManual), 'Connexion': spec('Matter sur Wi-Fi 2,4 GHz', socketManual), 'Charge': spec('16 A max. résistif', socketManual), 'Format': spec('86 × 86 × 39,3 mm', socketManual) },
    {}, ['matter-thread-zigbee-differences'],
    [{ label: 'SONOFF — manuel Orb Socket WS01TPE-E', url: socketManual }]
  ),
  base(
    'nodon-sin-4-1-20', 'NodOn SIN-4-1-20', 'NodOn', 'Module Zigbee',
    'NodOn SIN-4-1-20 : avis contact sec · DomoKlub',
    'Avis personnel sur le NodOn SIN-4-1-20 : relais Zigbee à contact sec, usages possibles, limites électriques et compatibilité Zigbee2MQTT documentée.',
    'Micromodule Zigbee à sortie contact sec pour piloter un équipement adapté, par exemple un portail ou une chaudière selon son entrée de commande.',
    'Pour commander un appareil qui accepte un contact sec. Avant achat, vérifiez le schéma de commande et les caractéristiques de l’équipement piloté.',
    ['La compatibilité d’un portail ou d’une chaudière dépend de son entrée de commande, pas du seul mot « contact sec ».', 'Module alimenté sur secteur : installation électrique à confier à une personne compétente.'],
    usage('Utilisé pour commander le portail de Gérald, sous Zigbee2MQTT.', 'Fonctionne bien dans son installation ; aucun problème rencontré à ce jour.'),
    { 'Radio': spec('Zigbee 3.0', nodonDoc), 'Sortie': spec('Contact sec', nodonDoc), 'Alimentation': spec('230 V AC', nodonDoc), 'Dimensions': spec('40 × 44 × 16,9 mm', nodonDoc) },
    { 'Zigbee2MQTT': compatible('confirmed', nodonZ2m) },
    ['modules-zigbee-pour-debuter', 'interrupteur-zigbee-avec-ou-sans-neutre'],
    [{ label: 'NodOn — fiche technique SIN-4-1-20', url: nodonDoc }, { label: 'Zigbee2MQTT — SIN-4-1-20', url: nodonZ2m }]
  ),
  base(
    'aqara-g410-select', 'Aqara Doorbell Camera Hub G410 Select', 'Aqara', 'Sonnette vidéo',
    'Aqara G410 Select : avis et portée · DomoKlub',
    'Avis personnel sur la sonnette Aqara G410 Select utilisée avec HomeKit : liaison avec le carillon, alimentation, vidéo et limites observées.',
    'Sonnette vidéo 2K avec carillon et fonctions de hub. Gérald l’utilise avec HomeKit et signale une limite de distance dans son logement.',
    'Pour une entrée équipée de HomeKit. Prévoyez une position du carillon qui conserve une liaison fiable avec la sonnette.',
    ['Dans l’installation de Gérald, la liaison avec le carillon devient problématique vers 10 m ; ce n’est pas une portée maximale universelle.', 'Le flux RTSP annoncé par Aqara exige une alimentation filaire de la sonnette.', 'Les fonctions disponibles dans Home Assistant diffèrent de celles de HomeKit et dépendent du mode d’intégration.'],
    usage('Utilisée avec HomeKit ; distance évaluée dans son logement, sans protocole de mesure standardisé.', 'Fonctionnement jugé bon. Il a rencontré un problème de liaison entre la sonnette et le hub carillon lorsque leur distance approche 10 m dans son installation.', 'La distance observée dépend des murs, de l’emplacement et de l’environnement radio. Elle ne doit pas être lue comme une spécification Aqara.'),
    { 'Modèle': spec('G410 Select, série CH-C09D', aqaraSpecs), 'Vidéo': spec('2K, angle de vue de 175° selon Aqara', aqaraProduct), 'Alimentation sonnette': spec('6 piles AA ou 12–24 V AC/DC', aqaraSpecs), 'Réseau du carillon': spec('Wi-Fi 2,4 ou 5 GHz', aqaraSpecs), 'Vidéo locale RTSP': spec('Alimentation filaire nécessaire', aqaraProduct) },
    {}, ['matter-thread-zigbee-differences'],
    [{ label: 'Aqara — G410 : fonctions et limites', url: aqaraProduct }, { label: 'Aqara — caractéristiques G410', url: aqaraSpecs }]
  ),
  base(
    'sonoff-snzb-04p', 'SONOFF SNZB-04P', 'SONOFF', 'Capteur Zigbee',
    'SONOFF SNZB-04P : avis capteur porte · DomoKlub',
    'Avis personnel sur le capteur de porte SONOFF SNZB-04P : détection ouverture et fermeture, pile, compatibilité Zigbee2MQTT et limites à connaître.',
    'Capteur d’ouverture de porte ou fenêtre Zigbee alimenté par pile. Zigbee2MQTT documente aussi l’état de sabotage et la batterie.',
    'Pour déclencher des automatisations à l’ouverture d’une porte ou fenêtre, après vérification de la place disponible pour les deux parties du capteur.',
    ['L’écart entre les deux parties doit respecter la notice SONOFF.', 'La durée de pile annoncée par le fabricant n’a pas été mesurée ici.'],
    usage('Utilisé comme détecteur d’ouverture dans l’installation Zigbee2MQTT de Gérald.', 'Fonctionne bien dans son installation ; aucun problème rencontré à ce jour.'),
    { 'Radio': spec('Zigbee 3.0', sensorManual), 'Pile': spec('CR2477', sensorManual), 'Écart de pose': spec('20 mm maximum selon SONOFF', sensorManual) },
    { 'Zigbee2MQTT': compatible('confirmed', sensorZ2m) },
    ['modules-zigbee-pour-debuter', 'ameliorer-portee-reseau-zigbee'],
    [{ label: 'SONOFF — manuel SNZB-04P', url: sensorManual }, { label: 'Zigbee2MQTT — SNZB-04P', url: sensorZ2m }]
  ),
  base(
    'sonoff-mini-zbrbs', 'SONOFF MINI-ZBRBS', 'SONOFF', 'Module volet roulant',
    'SONOFF MINI-ZBRBS : avis volet Zigbee · DomoKlub',
    'Avis personnel sur le module volet roulant SONOFF MINI-ZBRBS : commande Zigbee, calibration, compatibilité Zigbee2MQTT et limites électriques.',
    'Micromodule Zigbee pour motorisation de volet roulant. Zigbee2MQTT expose ouverture, fermeture et position après calibration.',
    'Pour piloter un volet motorisé avec Zigbee. Vérifiez le type de moteur, sa charge et la place disponible avant achat.',
    ['Commande de position en pourcentage : calibration du trajet nécessaire dans Zigbee2MQTT.', 'Charge moteur maximale de 1 A selon SONOFF.', 'Module secteur : installation électrique à réaliser selon la notice.'],
    usage('Douze modules installés : ils pilotent tous les volets roulants de la maison de Gérald (chambre, cuisine, salon, bureau, salle de bain, cellier, baies et fenêtres coulissantes), sous Zigbee2MQTT.', 'Fonctionne bien dans son installation ; aucun problème rencontré à ce jour.'),
    { 'Radio': spec('Zigbee 3.0', blindManual), 'Charge moteur': spec('1 A max.', blindManual), 'Dimensions': spec('39,5 × 33 × 16,8 mm', blindManual) },
    { 'Zigbee2MQTT': compatible('confirmed', blindZ2m) },
    ['modules-zigbee-pour-debuter', 'interrupteur-zigbee-avec-ou-sans-neutre', 'zha-ou-zigbee2mqtt'],
    [{ label: 'SONOFF — manuel MINI-ZBRBS', url: blindManual }, { label: 'Zigbee2MQTT — MINI-ZBRBS', url: blindZ2m }]
  ),
  base(
    'sonoff-zbmini-r2', 'SONOFF ZBMINIR2', 'SONOFF', 'Module Zigbee',
    'SONOFF ZBMINIR2 : avis module Zigbee · DomoKlub',
    'Avis personnel sur le SONOFF ZBMINIR2 : module Zigbee avec neutre, charge de 10 A, fonctions Zigbee2MQTT et points à vérifier avant achat.',
    'Micromodule Zigbee de commutation avec neutre. À distinguer du ZBMINIL2 sans neutre ; Zigbee2MQTT documente ses réglages.',
    'Pour piloter un circuit compatible lorsqu’un neutre est disponible dans le boîtier. Vérifiez la charge et l’espace d’encastrement.',
    ['Neutre requis : ne convient pas à une boîte où seul le retour lampe est présent.', 'Charge maximale de 10 A résistifs selon SONOFF.', 'Module secteur : installation électrique à réaliser selon la notice.'],
    usage('Quatre modules installés pour l’éclairage de la cuisine, de l’îlot, de la salle à manger et du salon, sous Zigbee2MQTT.', 'Fonctionne bien dans son installation ; aucun problème rencontré à ce jour.'),
    { 'Radio': spec('Zigbee 3.0', relayManual), 'Neutre': spec('Requis', relayManual), 'Charge': spec('10 A max. résistif', relayManual), 'Dimensions': spec('39,5 × 33 × 16,8 mm', relayManual) },
    { 'Zigbee2MQTT': compatible('confirmed', relayZ2m) },
    ['interrupteur-zigbee-avec-ou-sans-neutre', 'modules-zigbee-pour-debuter', 'ameliorer-portee-reseau-zigbee'],
    [{ label: 'SONOFF — manuel ZBMINIR2', url: relayManual }, { label: 'Zigbee2MQTT — ZBMINIR2', url: relayZ2m }]
  )
]

// Cinq appareils ajoutés le 27 novembre 2026 depuis l'inventaire Zigbee2MQTT de l'éditeur.
const zlinkyZ2m = 'https://www.zigbee2mqtt.io/devices/ZLinky_TIC.html'
const zlinkyDoc = 'https://github.com/fairecasoimeme/Zlinky_TIC'
const zlinkyShop = 'https://www.domadoo.fr/fr/eco-energie/7492-lixee-module-tic-vers-zigbee-30-pour-compteur-linky-v2-zlinky-v4000-0014-3770014375179.html'
const dimmerZ2m = 'https://www.zigbee2mqtt.io/devices/929002398602.html'
const dimmerShop = 'https://www.domadoo.fr/fr/telecommandes-badges-claviers-a-code/6848-philips-hue-telecommande-zigbee-dimmer-switch-8719514274617.html'
const motionZ2m = 'https://www.zigbee2mqtt.io/devices/9290012607.html'
const motionShop = 'https://www.domadoo.fr/fr/objets-communicants/3889-philips-detecteur-de-mouvement-intelligent-hue-motion-sensor-8718696595190.html'
const bulbZ2m = 'https://www.zigbee2mqtt.io/devices/9290012573A.html'
const bulbShop = 'https://www.domadoo.fr/fr/objets-communicants/3991-philips-ampoule-philips-hue-white-and-color-10w-e27-8718696592984.html'
const plugZ2m = 'https://www.zigbee2mqtt.io/devices/A7Z.html'
const plugShop = 'https://www.domadoo.fr/fr/produits-zigbee/8059-nous-a7z-prise-zigbee-tuya-16a-avec-mesure-de-consommation-5905072800891.html'

experiencedProducts.push(
  base(
    'lixee-zlinky-tic', 'LiXee ZLinky TIC V2', 'LiXee', 'Module énergie',
    'LiXee ZLinky : avis compteur Linky Zigbee · DomoKlub',
    'Avis personnel sur le LiXee ZLinky TIC branché sur un compteur Linky : données de consommation dans Home Assistant via Zigbee2MQTT, modes TIC et limites.',
    'Module Zigbee 3.0 qui se branche sur la prise de téléinformation (TIC) du compteur Linky et transmet index, puissance et tarifs à votre domotique.',
    'Pour suivre sa consommation électrique dans Home Assistant sans pince ni électricien : le module se clipse sur le compteur et s’alimente par la téléinformation.',
    ['Le compteur doit être accessible et à portée du réseau Zigbee ; un compteur en limite de propriété est souvent trop loin.', 'Les données disponibles dépendent du mode TIC du compteur (historique ou standard).', 'Si la LED reste éteinte après une mise à jour du Linky ou une coupure, LiXee conseille de débrancher le module au moins 30 minutes.'],
    usage('Branché sur le compteur Linky de Gérald et intégré à son réseau Zigbee2MQTT, où il apparaît sous le nom « Compteur ».', 'Les données du compteur remontent dans Home Assistant sans problème rencontré.', 'Aucune comparaison avec les index de la facture ni mesure de fréquence de remontée n’a été fournie.'),
    { 'Radio': spec('Zigbee 3.0', zlinkyShop), 'Alimentation': spec('Par la téléinformation du compteur, sans pile', zlinkyDoc), 'Modes TIC': spec('Historique et standard', zlinkyDoc), 'Rôle Zigbee': spec('Routeur par défaut à partir du firmware V7 (5 appareils au plus)', zlinkyDoc) },
    { 'Zigbee2MQTT': compatible('confirmed', zlinkyZ2m) },
    ['ameliorer-portee-reseau-zigbee', 'zha-ou-zigbee2mqtt'],
    [{ label: 'LiXee — documentation ZLinky TIC', url: zlinkyDoc }, { label: 'Zigbee2MQTT — ZLinky_TIC', url: zlinkyZ2m }, { label: 'Domadoo — fiche ZLinky V2', url: zlinkyShop }]
  ),
  base(
    'nous-a7z', 'NOUS A7Z', 'NOUS', 'Prise Zigbee',
    'NOUS A7Z : avis prise Zigbee 16 A · DomoKlub',
    'Avis personnel sur la prise Zigbee NOUS A7Z : 16 A, mesure de consommation, fonctionnement sous Zigbee2MQTT sans application cloud et limites à connaître.',
    'Prise Zigbee 3.0 de 16 A avec mesure de puissance, courant, tension et énergie. Zigbee2MQTT la prend en charge sans passer par l’application NOUS.',
    'Pour piloter un appareil et suivre sa consommation dans Home Assistant. Branchée sur secteur, elle renforce aussi le maillage Zigbee.',
    ['16 A selon le fabricant : vérifiez la puissance des appareils de chauffage branchés.', 'Fabriquée sur une base Tuya : les options exposées dépendent de la version de Zigbee2MQTT.'],
    usage('Plusieurs prises utilisées dans l’installation Zigbee2MQTT de Gérald.', 'Fonctionnent bien, avec la mesure de consommation disponible dans Home Assistant ; aucun problème rencontré.', 'La précision de la mesure d’énergie n’a pas été comparée à un appareil de référence.'),
    { 'Radio': spec('Zigbee 3.0', plugShop), 'Intensité maximale': spec('16 A', plugShop), 'Mesures': spec('Puissance, courant, tension, énergie', plugZ2m), 'Options Zigbee2MQTT': spec('Mémoire après coupure, verrouillage enfant, mises à jour OTA', plugZ2m) },
    { 'Zigbee2MQTT': compatible('confirmed', plugZ2m) },
    ['ameliorer-portee-reseau-zigbee', 'modules-zigbee-pour-debuter', 'zha-ou-zigbee2mqtt'],
    [{ label: 'Zigbee2MQTT — NOUS A7Z', url: plugZ2m }, { label: 'Domadoo — fiche NOUS A7Z', url: plugShop }]
  ),
  base(
    'philips-hue-motion-sensor', 'Philips Hue Motion Sensor', 'Philips Hue', 'Capteur Zigbee',
    'Hue Motion Sensor : avis sans pont Hue · DomoKlub',
    'Avis personnel sur le détecteur de mouvement Philips Hue utilisé sans pont Hue, avec Zigbee2MQTT : présence, luminosité, température et limites.',
    'Détecteur de mouvement intérieur à piles qui remonte aussi la luminosité et la température. Il fonctionne avec Zigbee2MQTT sans pont Hue.',
    'Pour allumer automatiquement une pièce de passage comme un garage ou un couloir, avec un seuil de luminosité pour éviter d’éclairer en plein jour.',
    ['Usage intérieur selon le marchand.', 'Fonctionne sur deux piles AAA ; leur autonomie n’a pas été mesurée ici.', 'Domadoo signale cette référence indisponible lors de notre contrôle ; Philips commercialise une génération plus récente.'],
    usage('Installé dans le garage de Gérald (« Détecteur garage » dans Zigbee2MQTT), relié directement à son coordinateur, sans pont Hue.', 'Détection fiable pour l’éclairage du garage ; aucun problème rencontré.'),
    { 'Modèle': spec('9290012607', motionZ2m), 'Piles': spec('2 × AAA', motionZ2m), 'Mesures': spec('Mouvement, luminosité, température', motionZ2m), 'Usage': spec('Intérieur', motionShop) },
    { 'Zigbee2MQTT': compatible('confirmed', motionZ2m) },
    ['zha-ou-zigbee2mqtt', 'ameliorer-portee-reseau-zigbee'],
    [{ label: 'Zigbee2MQTT — Hue motion sensor 9290012607', url: motionZ2m }, { label: 'Domadoo — fiche Hue Motion Sensor', url: motionShop }]
  ),
  base(
    'philips-hue-dimmer-switch', 'Philips Hue Dimmer Switch', 'Philips Hue', 'Télécommande Zigbee',
    'Hue Dimmer Switch : avis sans pont Hue · DomoKlub',
    'Avis personnel sur la télécommande Philips Hue Dimmer Switch (929002398602) utilisée sans pont Hue avec Zigbee2MQTT : boutons, pile et automatisations.',
    'Télécommande murale à quatre boutons, aimantée sur son support. Avec Zigbee2MQTT, chaque appui devient une action utilisable dans Home Assistant.',
    'Pour garder une commande physique simple dans une pièce pilotée par Home Assistant, sans percer ni tirer de câble.',
    ['Pile CR2032 : la télécommande ne relaie pas le signal Zigbee.', 'Sans pont Hue, les actions des boutons se programment dans Home Assistant.', 'Domadoo signale cette référence indisponible lors de notre contrôle.'],
    usage('Utilisée dans le réseau Zigbee2MQTT de Gérald (« Télécommande »), sans pont Hue.', 'Fonctionne bien comme commande d’éclairage ; aucun problème rencontré.'),
    { 'Modèle': spec('929002398602 (2e génération)', dimmerZ2m), 'Pile': spec('CR2032', dimmerZ2m), 'Boutons': spec('4', dimmerZ2m) },
    { 'Zigbee2MQTT': compatible('confirmed', dimmerZ2m) },
    ['zha-ou-zigbee2mqtt', 'interrupteur-zigbee-avec-ou-sans-neutre'],
    [{ label: 'Zigbee2MQTT — Hue dimmer switch gen 2', url: dimmerZ2m }, { label: 'Domadoo — fiche Hue Dimmer Switch', url: dimmerShop }]
  ),
  base(
    'philips-hue-white-color-e27', 'Philips Hue White and Color Ambiance E27', 'Philips Hue', 'Ampoule connectée',
    'Ampoule Hue E27 couleur : avis Zigbee2MQTT · DomoKlub',
    'Avis personnel sur l’ampoule Philips Hue White and Color Ambiance E27 pilotée sans pont Hue par Zigbee2MQTT : couleurs, blancs, effets et limites.',
    'Ampoule E27 couleur et blancs réglables. Reliée directement à Zigbee2MQTT, elle expose luminosité, température de blanc, couleurs et effets.',
    'Pour un lampadaire ou une lampe d’ambiance pilotée par Home Assistant. Restez alimenté en permanence : un interrupteur coupé la rend injoignable.',
    ['Couper l’alimentation au mur coupe aussi la radio : préférez une télécommande ou un module adapté.', 'La référence Domadoo (10 W) est une ancienne génération signalée indisponible ; les modèles actuels diffèrent.'],
    usage('Installée dans le lampadaire de Gérald, reliée sans pont Hue à son réseau Zigbee2MQTT.', 'Rendu des couleurs et pilotage jugés excellents ; aucun problème rencontré.'),
    { 'Culot': spec('E27', bulbShop), 'Puissance': spec('10 W', bulbShop), 'Fonctions': spec('Luminosité, blancs réglables, couleurs, effets', bulbZ2m) },
    { 'Zigbee2MQTT': compatible('confirmed', bulbZ2m) },
    ['zha-ou-zigbee2mqtt', 'ameliorer-portee-reseau-zigbee'],
    [{ label: 'Zigbee2MQTT — Hue White and Color Ambiance E27', url: bulbZ2m }, { label: 'Domadoo — fiche ampoule Hue E27', url: bulbShop }]
  )
)

const usedProductOffers = [
  ['lixee-zlinky-tic', zlinkyShop], ['nous-a7z', plugShop], ['philips-hue-motion-sensor', motionShop],
  ['philips-hue-dimmer-switch', dimmerShop], ['philips-hue-white-color-e27', bulbShop]
].map(([slug, url]) => ({ editorialStatus: 'approved', productDocumentId: `local-${slug}`, merchantName: 'Domadoo', url: `${url}?domid=159`, active: true, checkedAt: '2026-11-27T12:00:00+01:00', expiresAt: '2027-05-27T10:00:00+02:00' }))

const editorialSections = {
  'sonoff-zbdongle-p': [
    { title: 'Pourquoi choisir le modèle P ?', paragraphs: [
      'La référence P utilise une puce TI CC2652P. Dans Zigbee2MQTT, elle figure parmi les adaptateurs zStack. Le nom ZBDongle désigne aussi d’autres variantes : contrôlez la lettre du modèle avant de suivre un tutoriel de firmware ou de migration.',
      'Chez Gérald, ce dongle coordonne depuis juin 2025 un réseau Zigbee2MQTT d’une vingtaine d’appareils, dont douze modules de volets ; il lui attribue la note de 5/5. Ce retour ne permet pas de conclure sur la portée ou la capacité maximale du réseau. Pour un réseau existant, préparez une sauvegarde et consultez la procédure de migration du logiciel avant de changer de coordinateur.'
    ] },
    { title: 'Le bon usage dans Home Assistant', paragraphs: [
      'Ce dongle sert de coordinateur Zigbee relié au serveur. Il ne remplace ni Home Assistant lui-même ni un routeur Thread. Le placement de la clé et les interférences USB ou Wi-Fi peuvent compter davantage que la portée annoncée sur une fiche commerciale.'
    ] }
  ],
  'sonoff-zbminil2-e': [
    { title: 'Le point décisif : pas de neutre', paragraphs: [
      'SONOFF documente l’Orb-ZBW1L sous la référence ZBMINIL2-E comme interrupteur mural Zigbee sans neutre. La charge minimale annoncée est de 3 W : vérifiez le type d’éclairage utilisé, en particulier avec une LED de faible puissance. Ce n’est pas un variateur de lumière.',
      'La fiche Domadoo indique un lot composé du module ZBMINIL2 et du boîtier mural E1GSL, tandis que le visuel présente l’Orb-ZBW1L. Avant de commander pour une rénovation, comparez la référence sur le colis, le contenu du lot et la notice du fabricant.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald utilise le module ZBMINIL2 pour l’éclairage de son garage avec Zigbee2MQTT, sans incident signalé, et lui attribue la note de 5/5. Il n’a pas fourni la puissance de la lampe : l’avis ne vaut pas validation de toutes les combinaisons d’ampoules, en particulier sous la charge minimale de 3 W.'
    ] }
  ],
  'sonoff-orb-socket': [
    { title: 'Matter sur Wi-Fi, concrètement', paragraphs: [
      'La prise WS01TPE-E rejoint un contrôleur Matter via le réseau Wi-Fi 2,4 GHz. Elle n’a pas besoin d’un coordinateur Zigbee ni d’un routeur de bordure Thread. Vérifiez la disponibilité du Wi-Fi à l’emplacement prévu et la prise en charge du modèle par votre contrôleur.',
      'SONOFF annonce une charge résistive maximale de 16 A. Cette limite ne dispense pas de vérifier le circuit, le câblage et la place dans la boîte murale. Une installation encastrée sur secteur exige les précautions indiquées dans la notice.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald rapporte un fonctionnement satisfaisant sans incident. Le contrôleur Matter employé, la charge raccordée et la durée d’utilisation ne sont pas renseignés ; les fonctions disponibles chez chaque contrôleur doivent être vérifiées séparément.'
    ] }
  ],
  'nodon-sin-4-1-20': [
    { title: 'À quoi sert le contact sec ?', paragraphs: [
      'Le SIN-4-1-20 fournit une commande par contact sec. Cette caractéristique est utile lorsque l’équipement à piloter accepte une entrée de commande externe, par exemple certaines motorisations de portail ou certaines chaudières. Elle ne garantit pas la compatibilité avec tous les modèles de ces appareils.',
      'Le module lui-même demande une alimentation secteur. Vérifiez le schéma électrique de l’équipement piloté et la nature de l’entrée attendue avant de choisir ce relais. La fiche Zigbee2MQTT confirme le modèle et expose notamment son état de commutation.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald commande son portail avec ce module sous Zigbee2MQTT, sans dysfonctionnement rapporté, et lui attribue la note de 5/5. Le modèle de motorisation n’est pas précisé : l’avis ne constitue pas une preuve de compatibilité avec un portail ou une chaudière précise.'
    ] }
  ],
  'aqara-g410-select': [
    { title: 'Vidéo, HomeKit et Home Assistant', paragraphs: [
      'Aqara présente la G410 comme une sonnette vidéo 2K avec carillon et hub. Gérald l’utilise avec HomeKit. Pour un projet Home Assistant, il faut distinguer la fonction de pont Matter de la vidéo : Aqara annonce un flux RTSP local seulement lorsque la sonnette est alimentée par câble.',
      'La sonnette peut fonctionner sur piles ou alimentation filaire, mais les modes d’enregistrement et de diffusion ne sont pas identiques. Vérifiez les fonctions réellement utiles avant de choisir son alimentation et l’emplacement du carillon.'
    ] },
    { title: 'Distance observée chez l’éditeur', paragraphs: [
      'Dans la maison de Gérald, la liaison entre la sonnette et le hub carillon a posé problème vers 10 m. C’est la seule limite qu’il a signalée dans son retour d’usage. Murs, matériaux et interférences peuvent changer ce résultat ; il ne s’agit pas d’une portée officielle.'
    ] }
  ],
  'sonoff-snzb-04p': [
    { title: 'Ce que remonte le capteur', paragraphs: [
      'Le SNZB-04P sert à signaler l’ouverture ou la fermeture d’un ouvrant. Zigbee2MQTT documente également l’état de pile et le sabotage. Les entités visibles peuvent varier selon le logiciel et sa version ; relevez le modèle exact avant de bâtir une automatisation.',
      'La pose dépend de l’alignement des deux éléments et de leur écart. SONOFF indique 20 mm au maximum dans la notice. Vérifiez la géométrie de la porte ou de la fenêtre et évitez de juger l’autonomie de la pile sur une simple promesse commerciale.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald l’utilise sous Zigbee2MQTT sans problème rencontré et lui attribue la note de 5/5. La durée d’utilisation et le nombre de cycles ne sont pas renseignés ; aucune autonomie de pile n’a été mesurée pour cet avis.'
    ] }
  ],
  'sonoff-mini-zbrbs': [
    { title: 'Calibration avant commande en pourcentage', paragraphs: [
      'Zigbee2MQTT documente les commandes ouvrir, fermer, arrêter et la position du volet. Le contrôle précis en pourcentage suppose d’abord une calibration du trajet du moteur. Vérifiez que le moteur utilisé entre dans la limite de charge indiquée par SONOFF.',
      'Le module est compact, mais il faut aussi prendre en compte les conducteurs et l’espace dans la boîte. Comme pour tout équipement de volet alimenté sur secteur, l’installation doit suivre la notice du fabricant.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Avec douze exemplaires installés, c’est l’appareil le plus représenté chez Gérald : tous ses volets roulants passent par un MINI-ZBRBS piloté par Zigbee2MQTT, sans incident signalé. Il lui attribue la note de 5/5. Les moteurs et la précision de position obtenue ne sont pas documentés.'
    ] }
  ],
  'lixee-zlinky-tic': [
    { title: 'Ce que le module apporte à Home Assistant', paragraphs: [
      'Le ZLinky lit la téléinformation client (TIC) du Linky : index de consommation, puissance apparente, période tarifaire et, selon le mode du compteur, de nombreuses autres valeurs. Zigbee2MQTT liste ces données, que Home Assistant peut ensuite utiliser dans son tableau de bord Énergie.',
      'Il s’alimente par la prise TIC du compteur : pas de pile à changer ni de câblage. D’après la documentation LiXee, il fonctionne par défaut en routeur à partir du firmware V7 et peut relayer jusqu’à cinq appareils Zigbee.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald utilise ce module sur son compteur avec Zigbee2MQTT, sans problème rencontré, et lui attribue la note de 5/5. Les valeurs n’ont pas été comparées aux relevés du fournisseur.'
    ] }
  ],
  'nous-a7z': [
    { title: 'Une prise qui sert aussi de répéteur', paragraphs: [
      'Comme la plupart des appareils Zigbee branchés sur secteur, une prise joue le rôle de routeur et relaie le signal des capteurs voisins. Quelques prises bien réparties suffisent souvent à stabiliser un réseau.',
      'Zigbee2MQTT expose l’état marche/arrêt, la puissance instantanée, le courant, la tension et l’énergie cumulée, ainsi qu’un comportement après coupure de courant réglable.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald utilise plusieurs A7Z sous Zigbee2MQTT sans problème rencontré et leur attribue la note de 5/5. Les appareils branchés et la précision des mesures ne sont pas documentés.'
    ] }
  ],
  'philips-hue-motion-sensor': [
    { title: 'Sans pont Hue, avec Zigbee2MQTT', paragraphs: [
      'Le capteur s’associe directement à un coordinateur Zigbee. Zigbee2MQTT expose la présence, la luminosité, la température, la sensibilité et le délai de retour à l’état inoccupé : de quoi écrire une automatisation qui n’allume que lorsqu’il fait sombre.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald l’utilise dans son garage sans problème rencontré et lui attribue la note de 5/5. L’autonomie des piles n’a pas été mesurée.'
    ] }
  ],
  'philips-hue-dimmer-switch': [
    { title: 'Une télécommande qui pilote Home Assistant', paragraphs: [
      'Associée à Zigbee2MQTT, la télécommande remonte chaque appui (court, long, relâché) comme une action. On peut ainsi lui faire piloter n’importe quel appareil de Home Assistant, pas seulement des ampoules Hue.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald l’utilise sans pont Hue, sans problème rencontré, et lui attribue la note de 5/5.'
    ] }
  ],
  'philips-hue-white-color-e27': [
    { title: 'Une ampoule Hue sans pont Hue', paragraphs: [
      'Les ampoules Hue sont des appareils Zigbee : elles peuvent rejoindre directement un réseau Zigbee2MQTT ou ZHA. Branchées en permanence, elles servent aussi de routeur pour les appareils voisins.',
      'Une ampoule déjà associée à un pont Hue doit être réinitialisée avant de rejoindre un autre réseau ; Zigbee2MQTT décrit plusieurs méthodes de réinitialisation.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Gérald l’utilise dans son lampadaire et lui attribue la note de 5/5. Son retour porte sur l’usage quotidien, pas sur une mesure du flux lumineux ou de la fidélité des couleurs.'
    ] }
  ],
  'sonoff-zbmini-r2': [
    { title: 'Ne pas confondre avec le modèle sans neutre', paragraphs: [
      'Le ZBMINIR2 demande un neutre. Il convient lorsque la boîte d’encastrement dispose des conducteurs nécessaires et que la charge respecte la limite de 10 A résistifs donnée par SONOFF. Si le neutre manque, cette référence n’est pas interchangeable avec le ZBMINIL2.',
      'Zigbee2MQTT documente notamment la commande marche/arrêt et le comportement après une coupure de courant. Ce sont des capacités du logiciel ; le retour de Gérald ne porte pas sur chacune de ces options.'
    ] },
    { title: 'Ce que couvre l’avis', paragraphs: [
      'Quatre ZBMINIR2 commandent l’éclairage de la cuisine, de l’îlot, de la salle à manger et du salon de Gérald, sous Zigbee2MQTT, sans problème rencontré. Il leur attribue la note de 5/5. Les charges raccordées ne sont pas précisées.'
    ] }
  ]
}

for (const product of experiencedProducts) product.editorialSections = editorialSections[product.slug] || []

// Notes personnelles attribuées par Gérald François le 27 novembre 2026, motivées par son usage réel
// (appareils visibles dans son installation Zigbee2MQTT). Orb Socket et Aqara G410 restent sans note.
const ratings = {
  'sonoff-zbdongle-p': 'Coordinateur de tout le réseau depuis juin 2025, mise en service immédiate et aucun incident.',
  'sonoff-mini-zbrbs': 'Douze volets pilotés au quotidien, sans incident signalé.',
  'sonoff-zbmini-r2': 'Quatre circuits d’éclairage pilotés au quotidien, sans incident signalé.',
  'sonoff-zbminil2-e': 'Éclairage du garage piloté sans neutre, sans incident signalé.',
  'nodon-sin-4-1-20': 'Commande du portail fiable, sans dysfonctionnement rapporté.',
  'sonoff-snzb-04p': 'Détection d’ouverture fiable, sans problème rencontré.',
  'lixee-zlinky-tic': 'Données du Linky disponibles dans Home Assistant sans câblage ni incident.',
  'nous-a7z': 'Plusieurs prises fiables avec mesure de consommation, sans incident.',
  'philips-hue-motion-sensor': 'Détection fiable dans le garage, sans pont Hue.',
  'philips-hue-dimmer-switch': 'Commande physique simple et fiable, sans pont Hue.',
  'philips-hue-white-color-e27': 'Rendu des couleurs et pilotage excellents dans le lampadaire.'
}
for (const product of experiencedProducts) {
  if (ratings[product.slug]) product.personalReview.rating = { value: 5, best: 5, motivation: ratings[product.slug], ratedAt: '2026-11-27T12:00:00+01:00' }
}

export const experiencedOffers = [
  ...usedProductOffers,
  ...[
  ['sonoff-zbdongle-p', 'https://www.domadoo.fr/fr/french-days/9290-sonoff-dongle-plus-zigbee-30-antenne-externe-zbdongle-p-cc2652p-9888010100046.html?domid=159'],
  ['sonoff-zbminil2-e', 'https://www.domadoo.fr/fr/produits-de-domotique/8412-sonoff-module-zigbee-sans-neutre-interrupteur-zbminil2-e-orb-zbw1l.html?domid=159'],
  ['sonoff-orb-socket', 'https://www.domadoo.fr/fr/produits-matter/8829-sonoff-prise-encastree-matter-over-wifi-serie-fusion-orb-socket.html?domid=159'],
  ['nodon-sin-4-1-20', 'https://www.domadoo.fr/fr/peripheriques/5688-nodon-module-commutateur-contact-sec-zigbee-16a-portail-vmc-chaudiere-sin-4-1-20-3700313925188.html?domid=159'],
  ['aqara-g410-select', 'https://www.domadoo.fr/fr/produits-zigbee/8148-aqara-sonnette-video-intelligente-wi-fi-aqara-doorbell-camera-hub-g410-select-noir-6975833358380.html?domid=159'],
  ['sonoff-snzb-04p', 'https://www.domadoo.fr/fr/produits-de-domotique/7058-sonoff-capteur-de-porte-ou-fenetre-zigbee-30-snzb-04p.html?domid=159'],
  ['sonoff-mini-zbrbs', 'https://www.domadoo.fr/fr/produits-de-domotique/8384-sonoff-mini-zbrbs-module-volet-roulant-zigbee-compatible-home-assistant.html?domid=159'],
  ['sonoff-zbmini-r2', 'https://www.domadoo.fr/fr/peripheriques/7474-sonoff-zbmini-r2-module-zigbee-commutateur-onoff-10a-zigbee2mqtt-et-home-assistant.html?domid=159']
].map(([slug, url]) => ({ editorialStatus: 'approved', productDocumentId: `local-${slug}`, merchantName: 'Domadoo', url, active: true, checkedAt, expiresAt: '2027-05-17T10:00:00+02:00' }))]
