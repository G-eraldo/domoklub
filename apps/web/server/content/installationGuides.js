// Guides pratiques fondés sur les documentations officielles consultées le 18 novembre 2026.
const publishedAt = '2026-11-18T12:00:00+01:00'

export const installationGuides = [
  {
    documentId: 'local-guide-installer-home-assistant', editorialStatus: 'approved',
    publishedAt, updatedAt: publishedAt, type: 'guide', topic: 'home-assistant', slug: 'installer-home-assistant',
    title: 'Installer Home Assistant : Green, Raspberry Pi, mini PC, VM ou Docker',
    seoTitle: 'Installer Home Assistant : toutes les méthodes · DomoKlub',
    excerpt: 'Home Assistant OS ou Container ? Choisissez selon votre matériel, suivez les étapes de la bonne installation et terminez la configuration commune.',
    intro: 'Il existe plusieurs façons de faire tourner Home Assistant. Le choix décisif est entre Home Assistant OS, conseillé pour la plupart des foyers, et Home Assistant Container, destiné aux personnes qui gèrent déjà un hôte Docker. Une fois le système lancé, la création du compte, les intégrations et les sauvegardes suivent le même parcours.',
    decisionTable: { title: 'Quelle installation choisir ?', columns: ['Votre situation', 'Méthode', 'Ce que vous gérez'], rows: [
      ['Vous voulez une box prête à l’emploi', 'Home Assistant Green avec OS préinstallé', 'Branchement réseau et configuration initiale'],
      ['Vous avez un Raspberry Pi, un Odroid ou un mini PC dédié', 'Home Assistant OS installé sur ce matériel', 'Image système, stockage et démarrage'],
      ['Vous avez un Mac, un PC Windows ou un serveur de virtualisation', 'Home Assistant OS dans une machine virtuelle', 'VM, réseau et éventuel passage USB'],
      ['Vous administrez déjà Docker sur Linux ou un NAS', 'Home Assistant Container', 'Hôte, mises à jour et services annexes']
    ] },
    sections: [
      { id: 'os-ou-container', title: 'Comprendre les deux types d’installation', paragraphs: [
        'Home Assistant OS comprend le système, Home Assistant et le Supervisor. Il propose les applications complémentaires depuis son interface, notamment celles utiles à MQTT. Green arrive avec OS installé ; sur Raspberry Pi, Odroid ou mini PC, vous installez une image adaptée ; sur Mac ou Windows, vous utilisez une machine virtuelle.',
        'Home Assistant Container exécute Home Assistant dans un conteneur sur un système que vous administrez. Il n’a pas de magasin d’applications Home Assistant. Si vous voulez Mosquitto ou Zigbee2MQTT, installez et maintenez ces services séparément. Les anciens guides « Core » ou « Supervised » ne décrivent plus les deux méthodes d’installation proposées par Home Assistant.'
      ] },
      { id: 'green', title: 'Avec Home Assistant Green ou Yellow', paragraphs: [
        'Sur Green, reliez le port Ethernet à votre réseau, puis branchez l’alimentation. Home Assistant OS est préinstallé : attendez la préparation et passez directement au premier accès décrit plus bas. Aucun ordinateur dédié ni image à écrire n’est nécessaire.',
        'Home Assistant Yellow Kit demande un module Compute Module 4 et un montage selon sa notice ; l’ancien Yellow Standard arrivait avec OS préinstallé. Une fois OS démarré, le parcours dans le navigateur est le même. Yellow intègre une radio Zigbee : vérifiez son usage avant d’acheter un autre coordinateur.'
      ] },
      { id: 'materiel-dedie', title: 'Sur Raspberry Pi, Odroid ou mini PC dédié', paragraphs: [
        'Raspberry Pi : prenez un Pi 4 ou 5 avec alimentation adaptée et stockage suffisant. Dans Raspberry Pi Imager, choisissez l’image Home Assistant OS correspondant exactement au modèle, écrivez-la sur le support, insérez-le, branchez Ethernet puis démarrez. L’écriture efface le support choisi.',
        'Odroid : téléchargez l’image destinée à votre modèle, écrivez-la sur microSD ou eMMC selon la notice officielle, puis démarrez avec réseau et alimentation. Mini PC x86-64 : vérifiez le démarrage UEFI, écrivez l’image Generic x86-64 sur le disque cible et redémarrez. Cette opération efface le disque cible : identifiez-le avant l’écriture.',
        'Dans ces trois cas, laissez l’appareil alimenté en permanence et suivez ensuite la même configuration initiale. Si le premier démarrage échoue, contrôlez d’abord l’image choisie, le support, l’alimentation et la connexion réseau.'
      ] },
      { id: 'machine-virtuelle', title: 'Dans une machine virtuelle sur Mac, Windows ou Linux', paragraphs: [
        'Téléchargez le disque Home Assistant OS au format prévu par votre hyperviseur, créez une VM 64 bits avec démarrage UEFI, au moins 2 Go de RAM et 2 processeurs virtuels, puis attachez ce disque. Configurez un réseau qui permette au navigateur de joindre la VM, démarrez-la et relevez son adresse locale.',
        'Sur Mac ou Windows, suivez la page officielle propre à votre système pour choisir le format et l’hyperviseur. Si vous prévoyez une clé Zigbee USB, vérifiez que l’hyperviseur sait la transmettre à la VM : elle doit être visible dans Home Assistant OS, pas seulement sur l’ordinateur hôte.'
      ] },
      { id: 'container', title: 'Avec Home Assistant Container sur Linux ou un NAS', paragraphs: [
        'Installez Docker sur l’hôte et suivez le fichier Compose de la documentation Home Assistant correspondant à votre plateforme. Préparez un dossier persistant pour la configuration, choisissez le fuseau horaire et un mode réseau adapté à la découverte de vos appareils. Démarrez le service, puis ouvrez l’adresse de l’hôte sur le port 8123.',
        'Conservez la configuration hors du conteneur et prévoyez les mises à jour de l’image, du système hôte et de vos autres services. Pour un dongle USB, la documentation explique comment exposer le périphérique au conteneur. Les applications Home Assistant OS ne sont pas disponibles sur cette méthode.'
      ] },
      { id: 'premiere-configuration', title: 'Premier accès et mise en route commune', paragraphs: [
        'Après un démarrage Home Assistant OS, ouvrez généralement http://homeassistant.local/ puis, si nécessaire, http://homeassistant.local:8123/ ou l’adresse IP locale de l’appareil. Pour Container, ouvrez http://ADRESSE-DE-L-HOTE:8123. La préparation initiale d’OS peut prendre plusieurs minutes.',
        'Dans l’écran d’accueil, créez le compte propriétaire ou restaurez une sauvegarde existante. Enregistrez les identifiants dans un endroit sûr. Renseignez ensuite l’emplacement, le pays et le fuseau horaire : ils servent notamment aux automatisations et aux unités affichées.'
      ], bullets: [
        'Ouvrez Paramètres → Appareils et services : examinez les intégrations détectées, puis ajoutez le modèle exact de votre premier appareil.',
        'Créez un premier tableau de bord simple et vérifiez qu’une commande ou une mesure remonte réellement avant d’ajouter d’autres équipements.',
        'Configurez une sauvegarde depuis Paramètres → Système → Sauvegardes et gardez une copie hors de l’appareil ; conservez la clé de chiffrement si elle est demandée.'
      ] },
      { id: 'zigbee-suite', title: 'Si vos appareils utilisent Zigbee', paragraphs: [
        'Home Assistant ne crée pas un réseau Zigbee direct sans coordinateur compatible, sauf si le matériel qui l’héberge en fournit déjà un. Choisissez ensuite ZHA ou Zigbee2MQTT pour ce réseau : les deux ne pilotent pas simultanément le même coordinateur.',
        'ZHA s’ajoute comme intégration Home Assistant. Zigbee2MQTT demande aussi un broker MQTT ; il peut être installé comme application sur Home Assistant OS ou séparément avec Container. Notre guide Zigbee2MQTT détaille ces parcours.'
      ] },
      { id: 'depannage', title: 'Vérifier que tout fonctionne', paragraphs: [
        'Si l’interface ne répond pas, vérifiez que l’appareil ou la VM a terminé son démarrage, qu’il est sur le même réseau local et que le port 8123 est accessible. Sur VM, vérifiez le mode réseau ; sur Container, contrôlez l’état du conteneur, ses journaux et son port.',
        'Si une intégration ne découvre aucun appareil, vérifiez sa fiche officielle et la connectivité locale de l’appareil. N’ouvrez pas le port 8123 sur Internet pour résoudre un problème local. Terminez par une sauvegarde et notez la méthode d’installation utilisée avant de passer à Zigbee ou Matter.'
      ] }
    ],
    relatedProducts: ['home-assistant-green'],
    relatedArticles: ['demarrer-home-assistant-green', 'installer-zigbee2mqtt', 'choisir-coordinateur-zigbee-home-assistant'],
    sources: [
      { label: 'Home Assistant — choisir une méthode d’installation', url: 'https://www.home-assistant.io/installation/' },
      { label: 'Home Assistant — Yellow et ses variantes', url: 'https://www.home-assistant.io/yellow/' },
      { label: 'Home Assistant — Raspberry Pi', url: 'https://www.home-assistant.io/installation/raspberrypi/' },
      { label: 'Home Assistant — mini PC x86-64 et Container', url: 'https://www.home-assistant.io/installation/generic-x86-64/' },
      { label: 'Home Assistant — machine virtuelle sur macOS', url: 'https://www.home-assistant.io/installation/macos/' },
      { label: 'Home Assistant — machine virtuelle sur Windows', url: 'https://www.home-assistant.io/installation/windows/' },
      { label: 'Home Assistant — première configuration', url: 'https://www.home-assistant.io/getting-started/onboarding/' },
      { label: 'Home Assistant — sauvegardes', url: 'https://www.home-assistant.io/common-tasks/general/backups/' }
    ]
  },
  {
    documentId: 'local-guide-installer-zigbee2mqtt', editorialStatus: 'approved',
    publishedAt, updatedAt: publishedAt, type: 'guide', topic: 'zigbee', slug: 'installer-zigbee2mqtt',
    title: 'Installer Zigbee2MQTT : Home Assistant OS, Docker, Linux ou Windows',
    seoTitle: 'Installer Zigbee2MQTT : les méthodes · DomoKlub',
    excerpt: 'Application Home Assistant, Docker ou installation directe : choisissez le bon parcours, reliez MQTT et le coordinateur, puis associez un premier appareil.',
    intro: 'Zigbee2MQTT peut tourner sur le même appareil que Home Assistant ou sur une autre machine. Dans tous les cas, il lui faut un coordinateur Zigbee compatible et un broker MQTT accessible. L’installation change selon l’hôte ; la configuration du réseau Zigbee et son lien avec Home Assistant restent communs.',
    decisionTable: { title: 'Où installer Zigbee2MQTT ?', columns: ['Votre installation', 'Méthode', 'À prévoir'], rows: [
      ['Home Assistant OS, y compris Green ou VM', 'Application Zigbee2MQTT', 'Broker MQTT et accès au coordinateur'],
      ['Home Assistant Container ou serveur Docker', 'Conteneur Zigbee2MQTT séparé', 'Broker, stockage persistant, port web et périphérique USB'],
      ['Machine Linux sans Docker', 'Installation native Linux', 'Node.js, service au démarrage, broker et droits série'],
      ['PC Windows dédié', 'Installation native Windows', 'Broker, port COM et démarrage automatique']
    ] },
    sections: [
      { id: 'prerequis', title: 'Préparer les trois éléments indispensables', paragraphs: [
        'Choisissez un coordinateur dans la liste officielle Zigbee2MQTT et vérifiez son firmware ainsi que son type de pilote, par exemple zstack ou ember. Une clé déjà utilisée par ZHA doit être libérée : un seul logiciel peut ouvrir le même port série à la fois. Un câble prolongateur USB aide à éloigner la radio des interférences.',
        'Installez un broker MQTT, par exemple Mosquitto, puis vérifiez son adresse et ses identifiants. Home Assistant et Zigbee2MQTT doivent pouvoir joindre ce broker. Notez aussi où sera conservé le dossier de données Zigbee2MQTT : il contient la configuration et les informations du réseau.'
      ] },
      { id: 'application-ha', title: 'Méthode 1 : application sur Home Assistant OS', paragraphs: [
        'Dans Paramètres → Applications → Boutique d’applications, installez et démarrez d’abord Mosquitto broker si aucun broker MQTT n’existe. Ajoutez ensuite le dépôt officiel https://github.com/zigbee2mqtt/hassio-zigbee2mqtt dans les dépôts de la boutique. Installez l’application Zigbee2MQTT stable, démarrez-la et ouvrez son interface web.',
        'L’écran de démarrage propose normalement le coordinateur détecté. Sélectionnez le bon port et le bon type d’adaptateur, puis renseignez MQTT et validez. Si l’interface affiche 502 juste après le démarrage, patientez et rechargez ; si l’erreur persiste, consultez les journaux de l’application. Ce parcours n’existe pas dans Home Assistant Container, qui ne gère pas les applications.'
      ] },
      { id: 'docker', title: 'Méthode 2 : conteneur Docker', paragraphs: [
        'Sur un hôte Docker, lancez l’image officielle Zigbee2MQTT dans un conteneur séparé de Home Assistant et du broker MQTT. Dans votre configuration Docker, montez un dossier persistant sur /app/data, exposez le port de l’interface web 8080 et transmettez le coordinateur USB au conteneur. Utilisez le chemin stable /dev/serial/by-id/ sur l’hôte lorsque Linux le fournit.',
        'Démarrez le broker avant Zigbee2MQTT, ouvrez l’interface d’initialisation sur le port 8080 et renseignez l’adresse MQTT joignable depuis le conteneur. « localhost » à l’intérieur du conteneur désigne ce conteneur, pas forcément l’hôte ni le broker. Si le coordinateur est relié par Ethernet, utilisez son adresse réseau selon la documentation de l’adaptateur.'
      ] },
      { id: 'natif', title: 'Méthodes 3 et 4 : Linux ou Windows sans conteneur', paragraphs: [
        'Sous Linux, suivez le guide natif officiel pour installer Node.js et les dépendances, puis Zigbee2MQTT. Assurez l’accès de l’utilisateur au port série, démarrez une première fois pour ouvrir l’assistant et configurez ensuite un service qui le relance au démarrage. Le projet recommande Docker si vous pouvez l’utiliser, car il évite une partie de la maintenance Node.js.',
        'Sous Windows, installez d’abord le broker MQTT et, si nécessaire, le pilote du port COM de la clé. Suivez le guide Windows pour installer et démarrer Zigbee2MQTT, puis choisissez le port COM dans l’assistant. Prévoyez un démarrage automatique et une sauvegarde du dossier de données. D’autres voies officielles existent pour openHABian, FreeBSD jail et Kubernetes : utilisez leurs guides spécialisés.'
      ] },
      { id: 'assistant-initial', title: 'Configuration commune dans l’assistant initial', paragraphs: [
        'Au premier lancement, l’assistant Zigbee2MQTT s’ouvre dans l’interface web, généralement sur le port 8080 hors application Home Assistant. Il peut détecter le coordinateur ; sinon, indiquez son chemin et le type d’adaptateur selon la fiche officielle. Sur Linux, privilégiez /dev/serial/by-id/ pour éviter qu’un changement de numéro ttyUSB ou ttyACM casse le démarrage.',
        'Renseignez l’adresse du broker MQTT et ses identifiants, activez l’interface web si vous voulez l’utiliser, puis activez l’intégration Home Assistant. Validez et attendez que les journaux confirment la connexion au coordinateur et au broker. La configuration est enregistrée dans configuration.yaml ; arrêtez Zigbee2MQTT avant toute modification manuelle de ce fichier.'
      ], bullets: [
        'Si le broker tourne dans l’application Mosquitto de Home Assistant OS, la documentation Zigbee2MQTT donne core-mosquitto comme nom de serveur ; dans un autre montage, utilisez l’adresse réellement joignable depuis Zigbee2MQTT.',
        'Le port et le pilote dépendent de la référence exacte du coordinateur. Ne recopiez pas les valeurs d’un autre modèle.',
        'Gardez le réseau Zigbee fermé après les associations ; ouvrez-le seulement pendant l’ajout d’un appareil.'
      ] },
      { id: 'home-assistant', title: 'Faire apparaître les appareils dans Home Assistant', paragraphs: [
        'Dans Home Assistant, ajoutez ou vérifiez l’intégration MQTT et connectez-la au même broker. Dans Zigbee2MQTT, activez la découverte Home Assistant. Une fois les deux connectés, les appareils associés à Zigbee2MQTT apparaissent automatiquement dans Home Assistant via MQTT discovery.',
        'Ouvrez temporairement « Autoriser l’appairage » dans Zigbee2MQTT, mettez un appareil compatible en mode association selon sa fiche, puis attendez l’entretien réussi dans les journaux. Renommez-le, fermez l’appairage et vérifiez qu’une entité réagit dans Home Assistant. Les fonctions disponibles dépendent du modèle exact.'
      ] },
      { id: 'maintenance', title: 'Sauvegarder et résoudre les pannes courantes', paragraphs: [
        'Sauvegardez le dossier de données Zigbee2MQTT ainsi que la configuration du broker. Pour une application Home Assistant OS, incluez ses données dans la sauvegarde Home Assistant et conservez une copie externe. Avant de remplacer le coordinateur, lisez la procédure de migration : certains changements imposent de réassocier les appareils.',
        'Si Zigbee2MQTT ne démarre pas, lisez les journaux dans cet ordre : accès au port série, modèle et pilote, puis connexion MQTT. Si le port est occupé, arrêtez ZHA ou l’autre processus qui utilise la clé. Si les appareils s’associent puis décrochent, vérifiez la position de la clé, les interférences USB et Wi-Fi, ainsi que les routeurs Zigbee alimentés sur secteur.'
      ] }
    ],
    relatedProducts: ['sonoff-zbdongle-p', 'home-assistant-connect-zbt-2'],
    relatedArticles: ['installer-home-assistant', 'choisir-coordinateur-zigbee-home-assistant', 'demarrer-home-assistant-green'],
    sources: [
      { label: 'Zigbee2MQTT — démarrer et configurer le premier lancement', url: 'https://www.zigbee2mqtt.io/guide/getting-started/' },
      { label: 'Zigbee2MQTT — méthodes d’installation', url: 'https://www.zigbee2mqtt.io/guide/installation/' },
      { label: 'Zigbee2MQTT — application Home Assistant', url: 'https://www.zigbee2mqtt.io/guide/installation/03_ha_addon.html' },
      { label: 'Zigbee2MQTT — dépôt officiel de l’application', url: 'https://github.com/zigbee2mqtt/hassio-zigbee2mqtt' },
      { label: 'Zigbee2MQTT — installation Docker', url: 'https://www.zigbee2mqtt.io/guide/installation/02_docker.html' },
      { label: 'Zigbee2MQTT — installation Linux', url: 'https://www.zigbee2mqtt.io/guide/installation/01_linux.html' },
      { label: 'Zigbee2MQTT — installation Windows', url: 'https://www.zigbee2mqtt.io/guide/installation/05_windows.html' },
      { label: 'Zigbee2MQTT — adaptateurs compatibles', url: 'https://www.zigbee2mqtt.io/guide/adapters/' },
      { label: 'Zigbee2MQTT — paramètres de l’adaptateur', url: 'https://www.zigbee2mqtt.io/guide/configuration/adapter-settings.html' },
      { label: 'Zigbee2MQTT — découverte Home Assistant', url: 'https://www.zigbee2mqtt.io/guide/usage/integrations/home_assistant.html' },
      { label: 'Zigbee2MQTT — autoriser l’association', url: 'https://www.zigbee2mqtt.io/guide/usage/pairing_devices.html' },
      { label: 'Zigbee2MQTT — FAQ et migration', url: 'https://www.zigbee2mqtt.io/guide/faq/' }
    ]
  }
]
