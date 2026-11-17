import { useRuntimeConfig } from '#imports'

export const navigation = [
  { label: 'Guides', to: '/guides' },
  { label: 'Produits', to: '/produits' },
  { label: 'Comparer', to: '/comparer' },
  { label: 'Méthode', to: '/methodologie' }
]

export const topics = [
  { slug: 'home-assistant', name: 'Home Assistant', short: 'HA', number: '01', description: 'Comprendre la plateforme, ses intégrations et les choix de départ.', accent: 'peach' },
  { slug: 'zigbee', name: 'Zigbee', short: 'Z', number: '02', description: 'Réseau, coordinateurs, capteurs et compatibilités à vérifier.', accent: 'lime' },
  { slug: 'matter', name: 'Matter', short: 'M', number: '03', description: 'Faire le point sur le standard et ses limites selon les appareils.', accent: 'blue' },
  { slug: 'securite', name: 'Sécurité', short: 'S', number: '04', description: 'Caméras, accès et protection des données dans la maison.', accent: 'violet' },
  { slug: 'eclairage', name: 'Éclairage', short: 'E', number: '05', description: 'Ampoules, interrupteurs et scénarios adaptés à votre logement.', accent: 'yellow' },
  { slug: 'energie', name: 'Énergie', short: 'É', number: '06', description: 'Suivi de consommation, prises et automatismes utiles.', accent: 'mint' }
]

export const sections = {
  tests: { title: 'Tests', eyebrow: 'SUR LE TERRAIN', description: 'Des essais expliqués avec méthode, contexte, mesures et limites.', type: 'test' },
  guides: { title: 'Guides', eyebrow: 'POUR BIEN CHOISIR', description: 'Les critères utiles pour choisir un équipement adapté à votre besoin.', type: 'guide' },
  tutoriels: { title: 'Tutoriels', eyebrow: 'PAS À PAS', description: 'Des procédures claires à suivre à votre rythme.', type: 'tutorial' },
  comparatifs: { title: 'Comparatifs', eyebrow: 'DÉCIDER AVEC CLARTÉ', description: 'Des sélections éditoriales avec des critères et des sources visibles.', type: 'comparison' },
  'bons-plans': { title: 'Bons plans', eyebrow: 'OFFRES VÉRIFIÉES', description: 'Des offres publiées uniquement lorsqu’elles sont contrôlées.', type: 'deal' }
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
