// Offres Amazon.fr : ASIN vérifiés sur amazon.fr le 27 novembre 2026 (titre et référence du produit).
// L'identifiant Partenaire n'est pas stocké ici : il vient de la variable AMAZON_PARTNER_TAG au démarrage
// du serveur. Sans identifiant valide, aucune offre Amazon n'est affichée.
const checkedAt = '2026-11-27T10:00:00+01:00'
const expiresAt = '2027-05-27T10:00:00+02:00'

export const amazonOffers = [
  ['sonoff-zbdongle-p', 'B09KXTCMSC'],
  ['sonoff-dongle-pp10', 'B0H5HYZ3LP'],
  ['home-assistant-connect-zbt-2', 'B0G34ZTW51'],
  ['home-assistant-green', 'B0CXVKSG19'],
  ['sonoff-zbminil2-e', 'B0FMJCCJPZ'],
  ['sonoff-zbmini-r2', 'B0D73LL1T3'],
  ['sonoff-orb-socket', 'B0GKNSSD4C'],
  ['nodon-sin-4-1-20', 'B09B7TBSP1'],
  ['aqara-g410-select', 'B0F6CJ93GS'],
  ['sonoff-snzb-04p', 'B0C1G7W72B'],
  ['sonoff-mini-zbrbs', 'B0FDB663JN'],
  ['lixee-zlinky-tic', 'B0DKLDR69T'],
  ['philips-hue-dimmer-switch', 'B08PKMT2DV'], // modèle 929002398602 confirmé sur la fiche Amazon
  ['nous-a7z', 'B0FB4ZSW3D'] // lot de 2 (A7Z-2) : pas d'offre unitaire trouvée
].map(([slug, asin]) => ({ editorialStatus: 'approved', productDocumentId: `local-${slug}`, merchantName: 'Amazon', asin, active: true, checkedAt, expiresAt }))

// Générations actuelles qui remplacent un modèle utilisé par l'éditeur et devenu introuvable.
// La fiche reste celle du modèle de Gérald ; la note est affichée à côté du bouton.
export const amazonReplacementOffers = [
  ['philips-hue-motion-sensor', 'B09CV78GV1', 'Modèle qui remplace celui de Gérald : Hue Motion Sensor 929003067501, nouvelle génération (pris en charge par Zigbee2MQTT sous la référence 9290030675).'],
  ['philips-hue-white-color-e27', 'B0FJ8TQFGP', 'Modèle qui remplace celui de Gérald : Hue White & Color A60 E27 1100 lm (929003853501), Zigbee et Matter. Sa prise en charge par Zigbee2MQTT n’était pas confirmée dans la liste officielle au 27 novembre 2026.']
].map(([slug, asin, note]) => ({ editorialStatus: 'approved', productDocumentId: `local-${slug}`, merchantName: 'Amazon', asin, note, active: true, checkedAt, expiresAt }))
