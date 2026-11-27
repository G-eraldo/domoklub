// Questions fréquentes par contenu (slug). Réponses courtes, reprises des faits déjà sourcés
// dans chaque guide ; aucune donnée nouvelle n'est introduite ici.
export const faqs = {
  'zha-ou-zigbee2mqtt': [
    { q: 'ZHA ou Zigbee2MQTT : lequel est le plus simple pour débuter ?', a: 'ZHA. Il est intégré à Home Assistant et se configure depuis l’interface, sans broker MQTT ni second logiciel à maintenir.' },
    { q: 'Zigbee2MQTT est-il compatible avec plus d’appareils que ZHA ?', a: 'Zigbee2MQTT publie une fiche par appareil pris en charge et dispose d’une base très fournie, notamment pour les marques Tuya et Aqara. ZHA couvre aussi beaucoup d’appareils grâce à ses « quirks ». Vérifiez toujours le modèle exact sur le site du logiciel choisi.' },
    { q: 'Peut-on utiliser ZHA et Zigbee2MQTT avec le même dongle ?', a: 'Pas en même temps. Un coordinateur Zigbee ne peut être piloté que par un seul logiciel à la fois.' },
    { q: 'Peut-on passer de ZHA à Zigbee2MQTT plus tard ?', a: 'Oui, mais il faut en pratique reconstruire le réseau, réassocier les appareils et revoir les automatisations qui utilisent leurs noms. Mieux vaut choisir avant d’équiper toute la maison.' }
  ],
  'home-assistant-green-raspberry-pi-ou-mini-pc': [
    { q: 'Home Assistant Green suffit-il pour une maison entière ?', a: 'Pour la plupart des foyers, oui : il embarque un processeur quadricœur, 4 Go de RAM et 32 Go de stockage selon Nabu Casa. Un mini PC devient utile pour la vidéo locale ou de nombreuses applications.' },
    { q: 'Home Assistant Green a-t-il le Zigbee intégré ?', a: 'Non. Il faut ajouter un coordinateur USB, comme le Home Assistant Connect ZBT-2 ou un dongle SONOFF, pour créer un réseau Zigbee.' },
    { q: 'Quel Raspberry Pi pour Home Assistant ?', a: 'Home Assistant documente l’installation sur Raspberry Pi 5 ou 4, avec au moins 2 Go de RAM et une carte microSD de classe A2.' },
    { q: 'Peut-on installer Home Assistant dans une machine virtuelle ?', a: 'Oui. Home Assistant OS fonctionne dans une machine virtuelle sur un ordinateur allumé en permanence ; il faut transmettre le port USB du dongle Zigbee à la machine virtuelle.' }
  ],
  'interrupteur-zigbee-avec-ou-sans-neutre': [
    { q: 'Comment savoir si j’ai un neutre dans ma boîte d’interrupteur ?', a: 'Coupez le disjoncteur, ouvrez le boîtier et repérez un fil généralement bleu en plus de la phase et du retour lampe. En cas de doute, faites appel à un électricien.' },
    { q: 'Pourquoi un module sans neutre impose-t-il une charge minimale ?', a: 'Sans neutre, le module s’alimente en faisant passer un faible courant à travers l’ampoule. Sous la charge minimale, 3 W pour le SONOFF ZBMINIL2-E, de petites LED peuvent scintiller.' },
    { q: 'Un module Zigbee avec neutre renforce-t-il le réseau ?', a: 'Oui. Comme la plupart des appareils Zigbee branchés sur secteur, un module comme le ZBMINIR2 peut relayer le signal des autres appareils.' }
  ],
  'ameliorer-portee-reseau-zigbee': [
    { q: 'Pourquoi brancher le dongle Zigbee sur une rallonge USB ?', a: 'Les ports et périphériques USB 3 perturbent la bande 2,4 GHz. Home Assistant recommande une rallonge USB blindée sur un port USB 2.0 pour éloigner l’adaptateur.' },
    { q: 'Les capteurs à pile répètent-ils le signal Zigbee ?', a: 'Non. Seuls les appareils alimentés en permanence, comme les prises et modules sur secteur, jouent le rôle de routeurs.' },
    { q: 'Faut-il changer le canal Zigbee en cas d’interférences Wi-Fi ?', a: 'Commencez par fixer le canal de votre Wi-Fi. Changer le canal Zigbee peut obliger à réassocier certains appareils, selon Zigbee2MQTT.' }
  ],
  'modules-zigbee-pour-debuter': [
    { q: 'Quel matériel acheter en premier pour une maison Zigbee ?', a: 'Un coordinateur, puis deux ou trois modules ou prises sur secteur répartis dans le logement pour former le maillage. Les capteurs à pile viennent ensuite.' },
    { q: 'Quel module pour un volet roulant Zigbee ?', a: 'Le SONOFF MINI-ZBRBS, utilisé sur les douze volets de l’éditeur. Il accepte un moteur jusqu’à 1 A et demande une calibration du trajet.' },
    { q: 'Comment suivre la consommation électrique avec Zigbee ?', a: 'Une prise comme la NOUS A7Z mesure un appareil ; le LiXee ZLinky branché sur le compteur Linky suit toute la maison dans Home Assistant.' },
    { q: 'Les produits Philips Hue fonctionnent-ils sans pont Hue ?', a: 'Oui. Ce sont des appareils Zigbee : l’éditeur utilise un détecteur, une télécommande et une ampoule Hue directement avec Zigbee2MQTT.' }
  ],
  'choisir-coordinateur-zigbee-home-assistant': [
    { q: 'Quel dongle Zigbee pour Home Assistant ?', a: 'Pour ZHA, Home Assistant recommande son Connect ZBT-2. Pour Zigbee2MQTT, le SONOFF ZBDongle-P est un choix éprouvé, utilisé par l’éditeur depuis juin 2025.' },
    { q: 'Un dongle peut-il gérer Zigbee et Thread en même temps ?', a: 'Non pour le ZBT-2 : il fonctionne en Zigbee ou en Thread, pas les deux simultanément. Prévoyez deux radios ou un routeur Thread existant.' },
    { q: 'Ai-je besoin d’un coordinateur si j’ai déjà une passerelle ?', a: 'Pas forcément : si votre passerelle est intégrée à Home Assistant et vous suffit, un dongle n’est utile que pour créer votre propre réseau Zigbee.' }
  ],
  'matter-thread-zigbee-differences': [
    { q: 'Matter remplace-t-il Zigbee ?', a: 'Non. Matter définit comment les appareils communiquent ; il circule sur le Wi-Fi ou sur Thread. Zigbee reste un réseau radio distinct, avec son propre coordinateur.' },
    { q: 'Faut-il un routeur de bordure pour Matter ?', a: 'Seulement pour les appareils Matter sur Thread. Un appareil Matter sur Wi-Fi rejoint directement votre réseau domestique.' },
    { q: 'Un dongle Zigbee sert-il pour Matter ?', a: 'Non pour Matter sur Wi-Fi. Pour Thread, certains adaptateurs comme le ZBT-2 peuvent servir de radio Thread, mais pas en même temps que Zigbee.' }
  ],
  'demarrer-home-assistant-green': [
    { q: 'Que faut-il pour démarrer Home Assistant Green ?', a: 'Une prise électrique, un port Ethernet sur votre box ou routeur et une connexion Internet pour la configuration initiale.' },
    { q: 'Faut-il acheter un dongle avec Home Assistant Green ?', a: 'Seulement si vous créez un réseau Zigbee ou Thread. Pour des appareils déjà pilotables sur le réseau local, Green seule peut suffire.' }
  ],
  'installer-home-assistant': [
    { q: 'Quelle installation de Home Assistant choisir ?', a: 'Home Assistant OS, recommandé pour la plupart des utilisateurs : il gère les mises à jour et les applications. Home Assistant Container convient si vous gérez déjà Docker.' },
    { q: 'Peut-on installer Home Assistant sur un Mac ou un PC Windows ?', a: 'Oui, dans une machine virtuelle. L’ordinateur doit rester allumé en permanence.' }
  ],
  'installer-zigbee2mqtt': [
    { q: 'Zigbee2MQTT a-t-il besoin d’un broker MQTT ?', a: 'Oui. Mosquitto est le broker recommandé par le projet ; sur Home Assistant OS, il s’installe comme application.' },
    { q: 'Quel dongle pour Zigbee2MQTT ?', a: 'Un adaptateur de la liste officielle de Zigbee2MQTT. Le SONOFF ZBDongle-P (zStack) fonctionne chez l’éditeur depuis juin 2025.' }
  ]
}
