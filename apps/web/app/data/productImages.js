// Visuels des fiches produits.
// Seule la photo NodOn provient d'un kit marketing officiel public. Les autres fiches utilisent
// des rendus génériques créés par DomoKlub (scripts/illustrations/build.mjs) : sans marque ni logo,
// ils représentent le type d'appareil, pas le modèle exact. Voir docs/editorial/ASSETS.md.
const generic = 'Visuel générique DomoKlub, ce n’est pas une photo du produit'
const visual = (name, alt) => ({ src: `/products/illustrations/${name}.webp`, alt, credit: generic, generic: true })

const hub = visual('hub', 'Visuel générique d’une box domotique compacte')
const usbAntenna = visual('usb-antenna', 'Visuel générique d’une clé USB Zigbee avec antenne externe')
const usbCompact = visual('usb-compact', 'Visuel générique d’un adaptateur USB Zigbee et Thread compact')
const module = visual('module', 'Visuel générique d’un micromodule Zigbee à encastrer avec son bornier')

export const productImages = {
  'home-assistant-green': hub,
  'home-assistant-connect-zbt-2': usbCompact,
  'sonoff-dongle-pp10': usbAntenna,
  'sonoff-zbdongle-p': usbAntenna,
  'sonoff-zbminil2-e': visual('wall-switch', 'Visuel générique d’un interrupteur mural connecté'),
  'sonoff-orb-socket': visual('wall-socket', 'Visuel générique d’une prise murale connectée à encastrer'),
  'nodon-sin-4-1-20': {
    src: '/products/nodon-sin-4-1-20.webp', alt: 'Micromodule Zigbee NodOn SIN-4-1-20', credit: 'Photo du produit : NodOn (kit marketing officiel)',
    sourceUrl: 'https://support.nodon.fr/support/solutions/articles/150000207634-sin-4-1-20-zigbee-multifonction-module'
  },
  'aqara-g410-select': visual('doorbell', 'Visuel générique d’une sonnette vidéo connectée'),
  'sonoff-snzb-04p': visual('contact-sensor', 'Visuel générique d’un détecteur d’ouverture et de son aimant'),
  'sonoff-mini-zbrbs': module,
  'sonoff-zbmini-r2': module,
  'lixee-zlinky-tic': visual('module-tic', 'Visuel générique d’un module pour la prise TIC d’un compteur électrique'),
  'nous-a7z': visual('plug', 'Visuel générique d’une prise connectée avec mesure de consommation'),
  'philips-hue-motion-sensor': visual('motion-sensor', 'Visuel générique d’un détecteur de mouvement sans fil'),
  'philips-hue-dimmer-switch': visual('remote', 'Visuel générique d’une télécommande murale à quatre boutons'),
  'philips-hue-white-color-e27': visual('bulb', 'Visuel générique d’une ampoule connectée à culot E27')
}
