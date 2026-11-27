import { useRuntimeConfig } from '#imports'

export const navigation = [
  { label: 'Guides', to: '/guides' },
  { label: 'Comparatifs', to: '/comparatifs' },
  { label: 'Produits', to: '/produits' },
  { label: 'Comparer', to: '/comparer' },
  { label: 'Méthode', to: '/methodologie' }
]

export const topics = [
  { slug: 'home-assistant', name: 'Home Assistant', short: 'HA', number: '01', description: 'Comprendre la plateforme, ses intégrations et les choix de départ.', accent: 'peach', intro: ['Home Assistant est un logiciel libre qui centralise les appareils connectés de la maison, quelle que soit leur marque, et les fait fonctionner en local. Il tourne sur une box dédiée comme Home Assistant Green, un Raspberry Pi, un mini PC ou une machine virtuelle.', 'Nos guides vous aident à choisir la machine, à installer le système et à ajouter vos premiers appareils. Commencez par comparer les méthodes d’installation, puis choisissez une radio Zigbee si vos appareils l’utilisent.'] },
  { slug: 'zigbee', name: 'Zigbee', short: 'Z', number: '02', description: 'Réseau, coordinateurs, capteurs et compatibilités à vérifier.', accent: 'lime', intro: ['Zigbee est un protocole radio maillé, sobre en énergie, utilisé par des milliers de capteurs, modules et ampoules. Avec Home Assistant, il faut un coordinateur USB et un logiciel : ZHA, intégré, ou Zigbee2MQTT.', 'Les appareils branchés sur secteur relaient le signal et étendent le réseau ; les capteurs à pile, non. Nos guides couvrent le choix du dongle, du logiciel, des modules et la stabilité du réseau, avec les appareils que l’éditeur utilise chez lui.'] },
  { slug: 'matter', name: 'Matter', short: 'M', number: '03', description: 'Faire le point sur le standard et ses limites selon les appareils.', accent: 'blue', intro: ['Matter est un standard qui permet aux appareils de différentes marques de fonctionner ensemble. Il circule soit sur le Wi-Fi, soit sur Thread, un réseau radio maillé qui demande un routeur de bordure.', 'Avant d’acheter un appareil Matter, vérifiez donc s’il utilise le Wi-Fi ou Thread, et si votre installation possède déjà un routeur de bordure. Notre guide explique les différences avec Zigbee.'] },
  { slug: 'securite', name: 'Sécurité', short: 'S', number: '04', description: 'Caméras, accès et protection des données dans la maison.', accent: 'violet', intro: ['La sécurité de la maison connectée couvre les sonnettes vidéo, les caméras, les détecteurs d’ouverture et la protection de vos données. Les contenus de ce thème sont en préparation.'] },
  { slug: 'eclairage', name: 'Éclairage', short: 'E', number: '05', description: 'Ampoules, interrupteurs et scénarios adaptés à votre logement.', accent: 'yellow', intro: ['Rendre l’éclairage pilotable passe par des ampoules connectées ou des modules installés derrière les interrupteurs. Le choix dépend surtout de la présence d’un fil neutre dans la boîte d’encastrement.'] },
  { slug: 'energie', name: 'Énergie', short: 'É', number: '06', description: 'Suivi de consommation, prises et automatismes utiles.', accent: 'mint', intro: ['Suivre sa consommation électrique est possible avec des prises qui mesurent l’énergie ou un module branché sur le compteur Linky. Les contenus de ce thème sont en préparation.'] }
]

export const sections = {
  tests: { title: 'Tests', eyebrow: 'SUR LE TERRAIN', description: 'Des essais expliqués avec méthode, contexte, mesures et limites.', type: 'test', intro: 'Les tests demandent un protocole et des mesures reproductibles. Aucun n’est encore publié : nos fiches produits contiennent pour l’instant des retours d’usage personnels.' },
  guides: { seoTitle: 'Guides Home Assistant et Zigbee · DomoKlub', title: 'Guides', eyebrow: 'POUR BIEN CHOISIR', description: 'Les critères utiles pour choisir un équipement adapté à votre besoin.', type: 'guide', intro: 'Nos guides répondent aux questions qui précèdent un achat ou une installation : quelle machine pour Home Assistant, quel dongle Zigbee, ZHA ou Zigbee2MQTT, module avec ou sans neutre, portée du réseau. Chaque guide commence par la réponse courte, détaille les options avec un tableau de décision et cite ses sources officielles. Les produits recommandés sont ceux que l’éditeur utilise chez lui ou des références documentées, toujours signalées comme telles.' },
  tutoriels: { title: 'Tutoriels', eyebrow: 'PAS À PAS', description: 'Des procédures claires à suivre à votre rythme.', type: 'tutorial', intro: 'Les tutoriels pas à pas sont en préparation. En attendant, nos guides d’installation de Home Assistant et de Zigbee2MQTT détaillent chaque étape.' },
  comparatifs: { seoTitle: 'Comparatifs domotique Zigbee · DomoKlub', title: 'Comparatifs', eyebrow: 'DÉCIDER AVEC CLARTÉ', description: 'Des sélections éditoriales avec des critères et des sources visibles.', type: 'comparison', intro: 'Nos comparatifs classent les appareils par usage plutôt que par note abstraite : éclairage, volets, prises, détection, compteur. Les produits retenus sont utilisés dans l’installation Zigbee2MQTT de l’éditeur ; leurs limites et conditions d’installation sont indiquées pour chacun.' },
  'bons-plans': { title: 'Bons plans', eyebrow: 'OFFRES VÉRIFIÉES', description: 'Des offres publiées uniquement lorsqu’elles sont contrôlées.', type: 'deal', intro: 'Les bons plans ne sont publiés qu’après vérification du prix et de la disponibilité chez le marchand. Aucun n’est actif pour le moment.' }
}

export function canonicalPath(path = '/') {
  const config = useRuntimeConfig()
  return new URL(path, config.public.siteUrl).toString()
}

export function publicRobots(indexable = true) {
  return isSiteLive() && indexable ? 'index,follow' : 'noindex,follow'
}

export function isSiteLive() {
  const value = useRuntimeConfig().public.siteLive
  return value === true || value === 'true'
}

export function safeJsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\u003c').replaceAll('>', '\u003e').replaceAll('&', '\u0026')
}

export const defaultOgImage = { path: '/og-default.jpg', width: 1200, height: 630, alt: 'DomoKlub, la maison connectée simplement' }

// Résolveur d'URL absolue lié à la config dès le setup : utilisable ensuite dans un computed,
// évalué par unhead hors du contexte Nuxt (où useRuntimeConfig() échoue).
export function useAbsoluteUrl() {
  const base = useRuntimeConfig().public.siteUrl
  return (path = '/') => new URL(path, base).toString()
}

// Fil d'Ariane schema.org : items = [{ name, path }], le dernier élément est la page courante.
export function breadcrumbJsonLd(items, toUrl) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: toUrl(item.path) }))
  }
}
