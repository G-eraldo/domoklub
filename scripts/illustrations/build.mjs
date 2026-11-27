// Génère les visuels produits génériques de DomoKlub (rendus « studio » sans marque ni logo).
// Sources SVG dans scripts/illustrations/svg/, rendus WebP 800 × 800 dans apps/web/public/products/illustrations/.
// Usage : node scripts/illustrations/build.mjs  (nécessite rsvg-convert et cwebp)
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const svgDir = join(root, 'scripts/illustrations/svg')
const outDir = join(root, 'apps/web/public/products/illustrations')

const defs = `
<defs>
  <radialGradient id="bg" cx="50%" cy="36%" r="78%"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#ffffff"/><stop offset="1" stop-color="#f3f4f7"/></radialGradient>
  <linearGradient id="top" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f3f5f8"/><stop offset="1" stop-color="#e3e7ec"/></linearGradient>
  <linearGradient id="side" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4e8ee"/><stop offset="1" stop-color="#c4cad3"/></linearGradient>
  <linearGradient id="sideH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfd4db"/><stop offset=".25" stop-color="#eef1f4"/><stop offset=".8" stop-color="#e2e6eb"/><stop offset="1" stop-color="#bfc5ce"/></linearGradient>
  <linearGradient id="face" x1="0" y1="0" x2=".2" y2="1"><stop offset="0" stop-color="#fdfdfe"/><stop offset="1" stop-color="#e6e9ee"/></linearGradient>
  <linearGradient id="dark" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#4a5260"/><stop offset=".5" stop-color="#262c36"/><stop offset="1" stop-color="#14181f"/></linearGradient>
  <linearGradient id="darkH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#101318"/><stop offset=".3" stop-color="#3b424e"/><stop offset=".55" stop-color="#262b34"/><stop offset="1" stop-color="#0e1116"/></linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".35" stop-color="#b9c0c9"/><stop offset=".55" stop-color="#e9edf1"/><stop offset="1" stop-color="#8d96a2"/></linearGradient>
  <linearGradient id="metalH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a929d"/><stop offset=".3" stop-color="#eef1f4"/><stop offset=".55" stop-color="#b4bcc6"/><stop offset="1" stop-color="#7d8692"/></linearGradient>
  <radialGradient id="glass" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f6f4f1"/><stop offset=".85" stop-color="#e6e3df"/><stop offset="1" stop-color="#d5d2ce"/></radialGradient>
  <radialGradient id="lens" cx="40%" cy="35%" r="65%"><stop offset="0" stop-color="#5c6b80"/><stop offset=".45" stop-color="#1b2230"/><stop offset="1" stop-color="#06080c"/></radialGradient>
  <radialGradient id="dome" cx="42%" cy="35%" r="65%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eceef1"/><stop offset="1" stop-color="#cfd3d9"/></radialGradient>
  <radialGradient id="hole" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#2a2f37"/><stop offset="1" stop-color="#0b0d10"/></radialGradient>
  <radialGradient id="ledG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#e9fff1"/><stop offset=".4" stop-color="#4ade80"/><stop offset="1" stop-color="#4ade80" stop-opacity="0"/></radialGradient>
  <radialGradient id="ledB" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#eef6ff"/><stop offset=".4" stop-color="#60a5fa"/><stop offset="1" stop-color="#60a5fa" stop-opacity="0"/></radialGradient>
  <radialGradient id="warm" cx="50%" cy="45%" r="50%"><stop offset="0" stop-color="#ffd9a8" stop-opacity=".75"/><stop offset="1" stop-color="#ffd9a8" stop-opacity="0"/></radialGradient>
  <filter id="floor" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="contact" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="drop" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#1e293b" flood-opacity=".18"/></filter>
  <filter id="inset" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.4"/></filter>
</defs>`

// Ombre portée au sol : un halo large et une ombre de contact plus dense.
const floor = (cx, cy, rx, ry = rx * 0.16) => `
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry * 1.9}" fill="#0f172a" opacity=".16" filter="url(#floor)"/>
  <ellipse cx="${cx}" cy="${cy - 2}" rx="${rx * 0.86}" ry="${ry * 0.7}" fill="#0f172a" opacity=".22" filter="url(#contact)"/>`

const led = (cx, cy, color = 'G', r = 5) => `<circle cx="${cx}" cy="${cy}" r="${r * 3}" fill="url(#led${color})"/><circle cx="${cx}" cy="${cy}" r="${r * 0.55}" fill="#fff"/>`

const scene = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">${defs}
  <rect width="800" height="800" fill="url(#bg)"/>${body}
</svg>`

// Boîtier carré à coins arrondis, vu de trois quarts haut (épaisseur visible devant).
function slab({ x, y, w, h, depth, r, extraTop = '', extraFront = '' }) {
  return `
  <rect x="${x}" y="${y + depth}" width="${w}" height="${h}" rx="${r}" fill="url(#sideH)"/>
  <rect x="${x}" y="${y + depth}" width="${w}" height="${h}" rx="${r}" fill="url(#side)" opacity=".55"/>
  ${extraFront}
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#top)"/>
  <rect x="${x + 1.5}" y="${y + 1.5}" width="${w - 3}" height="${h - 3}" rx="${r - 1.5}" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>
  <path d="M${x + r} ${y + h - 0.5} H${x + w - r}" stroke="#b7bec8" stroke-width="1.2" opacity=".6"/>
  ${extraTop}`
}

const visuals = {
  hub: {
    svg: scene(`${floor(400, 548, 230)}
  ${slab({ x: 205, y: 300, w: 390, h: 210, depth: 44, r: 46,
    extraFront: `
    <rect x="300" y="520" width="44" height="22" rx="3" fill="url(#hole)"/><rect x="306" y="524" width="32" height="6" rx="1" fill="#3a414c"/>
    <rect x="360" y="524" width="30" height="13" rx="2.5" fill="url(#hole)"/><rect x="364" y="527" width="22" height="4" rx="1" fill="#9aa3ae"/>
    <rect x="402" y="524" width="30" height="13" rx="2.5" fill="url(#hole)"/><rect x="406" y="527" width="22" height="4" rx="1" fill="#9aa3ae"/>
    <circle cx="462" cy="531" r="8" fill="url(#hole)"/><circle cx="462" cy="531" r="2.6" fill="#7c8590"/>
    ${led(500, 531, 'G', 4)}`,
    extraTop: `
    <rect x="245" y="335" width="310" height="140" rx="30" fill="none" stroke="#dfe3e9" stroke-width="2"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="300" y="${368 + i * 18}" width="200" height="5" rx="2.5" fill="#dfe3e8"/><rect x="300" y="${368 + i * 18}" width="200" height="2" rx="1" fill="#cdd2d9"/>`).join('')}`
  })}`)
  },
  'usb-antenna': {
    svg: scene(`${floor(390, 560, 260)}
  <g transform="rotate(-9 400 470)" filter="url(#drop)">
    <rect x="148" y="446" width="78" height="52" rx="4" fill="url(#metal)"/>
    <rect x="160" y="458" width="18" height="10" rx="1.5" fill="#59616c"/><rect x="194" y="458" width="18" height="10" rx="1.5" fill="#59616c"/>
    <rect x="216" y="430" width="300" height="84" rx="26" fill="url(#top)"/>
    <rect x="216" y="472" width="300" height="42" rx="21" fill="url(#side)" opacity=".7"/>
    <rect x="218" y="432" width="296" height="80" rx="24" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>
    <rect x="300" y="450" width="120" height="6" rx="3" fill="#e3e7ec"/>
    ${led(458, 452, 'B', 4.5)}
    <rect x="512" y="446" width="34" height="52" rx="6" fill="url(#metal)"/>
    <rect x="540" y="452" width="22" height="40" rx="5" fill="url(#dark)"/>
    <g transform="rotate(-58 552 472)">
      <rect x="552" y="453" width="270" height="38" rx="19" fill="url(#dark)"/>
      <rect x="560" y="458" width="250" height="8" rx="4" fill="#5b6472" opacity=".55"/>
      <rect x="590" y="453" width="4" height="38" fill="#0a0c10" opacity=".55"/>
    </g>
  </g>`)
  },
  'usb-compact': {
    svg: scene(`${floor(410, 540, 230)}
  <g transform="rotate(-14 400 470)" filter="url(#drop)">
    <rect x="160" y="444" width="76" height="50" rx="4" fill="url(#metal)"/>
    <rect x="172" y="456" width="18" height="10" rx="1.5" fill="#59616c"/><rect x="206" y="456" width="18" height="10" rx="1.5" fill="#59616c"/>
    <path d="M232 430 H560 a40 40 0 0 1 40 40 v0 a40 40 0 0 1 -40 40 H232 Z" fill="url(#top)"/>
    <path d="M232 470 H600 a40 40 0 0 1 -40 40 H232 Z" fill="url(#side)" opacity=".7"/>
    <path d="M234 433 H560 a37 37 0 0 1 37 37 a37 37 0 0 1 -37 37 H234" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>
    <rect x="232" y="430" width="14" height="80" fill="#d5dae1"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${330 + i * 34}" y="452" width="18" height="36" rx="9" fill="#e6e9ee"/>`).join('')}
    ${led(548, 470, 'B', 5)}
  </g>`)
  },
  module: {
    svg: scene(`${floor(400, 560, 200)}
  ${slab({ x: 240, y: 290, w: 320, h: 220, depth: 58, r: 34,
    extraFront: `${[0, 1, 2, 3].map(i => `<g transform="translate(${292 + i * 72} 542)"><rect x="-22" y="-16" width="44" height="34" rx="6" fill="#d3d8df"/><circle r="11" fill="url(#metalH)"/><path d="M-7 -7 L7 7" stroke="#5f6874" stroke-width="3" stroke-linecap="round"/></g>`).join('')}`,
    extraTop: `<circle cx="490" cy="350" r="20" fill="#eceff3" stroke="#d3d8df" stroke-width="2"/><circle cx="490" cy="350" r="13" fill="url(#face)"/>${led(442, 350, 'B', 4)}
    <path d="M280 470 H420" stroke="#dde1e7" stroke-width="2" stroke-linecap="round"/><path d="M280 482 H380" stroke="#dde1e7" stroke-width="2" stroke-linecap="round"/>`
  })}`)
  },
  'module-tic': {
    svg: scene(`${floor(400, 568, 180)}
  ${slab({ x: 270, y: 270, w: 260, h: 250, depth: 50, r: 40,
    extraFront: `${[0, 1].map(i => `<g transform="translate(${360 + i * 80} 548)"><rect x="-24" y="-16" width="48" height="34" rx="6" fill="#d3d8df"/><circle r="11" fill="url(#metalH)"/><path d="M-7 -7 L7 7" stroke="#5f6874" stroke-width="3" stroke-linecap="round"/></g>`).join('')}`,
    extraTop: `<circle cx="400" cy="380" r="48" fill="none" stroke="#e1e5ea" stroke-width="2"/>${led(400, 380, 'G', 5)}
    <path d="M330 470 H470" stroke="#dde1e7" stroke-width="2" stroke-linecap="round"/>`
  })}
  <path d="M340 570 C 320 640, 250 660, 170 650" stroke="#2b3039" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M460 570 C 470 650, 560 670, 640 655" stroke="#2b3039" stroke-width="9" fill="none" stroke-linecap="round"/>`)
  },
  'wall-switch': {
    svg: scene(`${floor(400, 640, 190, 18)}
  <g filter="url(#drop)">
    <rect x="215" y="165" width="370" height="450" rx="44" fill="url(#sideH)"/>
    <rect x="215" y="158" width="370" height="450" rx="44" fill="url(#face)"/>
    <rect x="217" y="160" width="366" height="446" rx="42" fill="none" stroke="#fff" stroke-width="3"/>
    <rect x="262" y="210" width="276" height="348" rx="26" fill="#eef1f4"/>
    <rect x="266" y="212" width="268" height="340" rx="24" fill="url(#top)" filter="url(#drop)"/>
    <path d="M290 384 H510" stroke="#d9dee4" stroke-width="2"/>
    ${led(400, 520, 'B', 3.5)}
  </g>`)
  },
  'wall-socket': {
    svg: scene(`${floor(400, 640, 190, 18)}
  <g filter="url(#drop)">
    <rect x="215" y="165" width="370" height="450" rx="44" fill="url(#sideH)"/>
    <rect x="215" y="158" width="370" height="450" rx="44" fill="url(#face)"/>
    <rect x="217" y="160" width="366" height="446" rx="42" fill="none" stroke="#fff" stroke-width="3"/>
    <circle cx="400" cy="372" r="128" fill="#d8dde3"/>
    <circle cx="400" cy="378" r="120" fill="url(#side)"/>
    <circle cx="400" cy="372" r="112" fill="url(#top)"/>
    <circle cx="355" cy="380" r="14" fill="url(#hole)"/><circle cx="445" cy="380" r="14" fill="url(#hole)"/>
    <rect x="391" y="292" width="18" height="34" rx="6" fill="url(#metalH)"/>
    <rect x="370" y="548" width="60" height="14" rx="7" fill="#e4e8ed"/>${led(400, 555, 'G', 3.2)}
  </g>`)
  },
  plug: {
    svg: scene(`${floor(400, 608, 190)}
  <g filter="url(#drop)">
    <rect x="250" y="226" width="300" height="360" rx="70" fill="url(#sideH)"/>
    <rect x="250" y="210" width="300" height="340" rx="70" fill="url(#face)"/>
    <rect x="252" y="212" width="296" height="336" rx="68" fill="none" stroke="#fff" stroke-width="3"/>
    <circle cx="400" cy="380" r="104" fill="#dde1e7"/>
    <circle cx="400" cy="386" r="98" fill="url(#side)"/>
    <circle cx="400" cy="380" r="92" fill="url(#top)"/>
    <circle cx="362" cy="388" r="12" fill="url(#hole)"/><circle cx="438" cy="388" r="12" fill="url(#hole)"/>
    <rect x="392" y="314" width="16" height="30" rx="5" fill="url(#metalH)"/>
  </g>
  <g transform="translate(546 330)"><rect x="-6" y="0" width="22" height="64" rx="9" fill="url(#side)"/><rect x="-2" y="6" width="12" height="52" rx="6" fill="url(#face)"/></g>
  ${led(400, 520, 'B', 3.4)}`)
  },
  doorbell: {
    svg: scene(`${floor(400, 668, 120, 16)}
  <g filter="url(#drop)">
    <rect x="300" y="128" width="200" height="530" rx="100" fill="url(#darkH)"/>
    <rect x="304" y="120" width="192" height="526" rx="96" fill="url(#dark)"/>
    <rect x="306" y="122" width="188" height="522" rx="94" fill="none" stroke="#5a6370" stroke-width="2" opacity=".7"/>
    <circle cx="400" cy="250" r="62" fill="#0c0f14"/>
    <circle cx="400" cy="250" r="44" fill="url(#lens)"/>
    <circle cx="400" cy="250" r="18" fill="#05070a"/>
    <ellipse cx="386" cy="234" rx="12" ry="7" fill="#fff" opacity=".35" transform="rotate(-30 386 234)"/>
    <circle cx="370" cy="336" r="5" fill="#0a0c10"/><circle cx="430" cy="336" r="5" fill="#0a0c10"/>
    <circle cx="400" cy="512" r="66" fill="#11151b"/>
    <circle cx="400" cy="512" r="58" fill="none" stroke="#7dd3fc" stroke-width="5" opacity=".9"/>
    <circle cx="400" cy="512" r="58" fill="none" stroke="#bae6fd" stroke-width="14" opacity=".18"/>
    <circle cx="400" cy="512" r="48" fill="url(#dark)"/>
    <ellipse cx="380" cy="180" rx="40" ry="90" fill="#fff" opacity=".05"/>
  </g>`)
  },
  'contact-sensor': {
    svg: scene(`${floor(380, 560, 240)}
  ${slab({ x: 175, y: 330, w: 300, h: 170, depth: 46, r: 40, extraTop: `${led(420, 380, 'B', 3.5)}<path d="M215 460 H330" stroke="#dde1e7" stroke-width="2" stroke-linecap="round"/>` })}
  ${slab({ x: 505, y: 360, w: 120, h: 110, depth: 38, r: 26 })}`)
  },
  'motion-sensor': {
    svg: scene(`${floor(400, 625, 170, 18)}
  <g filter="url(#drop)">
    <rect x="235" y="200" width="330" height="400" rx="72" fill="url(#sideH)"/>
    <rect x="235" y="186" width="330" height="400" rx="72" fill="url(#face)"/>
    <rect x="237" y="188" width="326" height="396" rx="70" fill="none" stroke="#fff" stroke-width="3"/>
    <circle cx="400" cy="340" r="86" fill="#dfe3e8"/>
    <circle cx="400" cy="336" r="80" fill="url(#dome)"/>
    ${[66, 52, 38, 24].map(r => `<circle cx="400" cy="336" r="${r}" fill="none" stroke="#d6dae0" stroke-width="1.6"/>`).join('')}
    <ellipse cx="378" cy="306" rx="30" ry="16" fill="#fff" opacity=".8" transform="rotate(-25 378 306)"/>
    <circle cx="400" cy="500" r="9" fill="url(#lens)" opacity=".85"/>
  </g>`)
  },
  remote: {
    svg: scene(`${floor(400, 650, 200, 18)}
  <g filter="url(#drop)">
    <rect x="205" y="150" width="390" height="480" rx="40" fill="url(#sideH)"/>
    <rect x="205" y="142" width="390" height="480" rx="40" fill="url(#face)"/>
    <rect x="207" y="144" width="386" height="476" rx="38" fill="none" stroke="#fff" stroke-width="3"/>
    <rect x="300" y="186" width="200" height="398" rx="34" fill="#d9dde3"/>
  </g>
  <g filter="url(#drop)">
    <rect x="306" y="190" width="188" height="388" rx="32" fill="url(#top)"/>
    <rect x="308" y="192" width="184" height="384" rx="30" fill="none" stroke="#fff" stroke-width="3"/>
    ${[0, 1, 2].map(i => `<path d="M320 ${282 + i * 92} H480" stroke="#e1e5ea" stroke-width="2"/>`).join('')}
    <circle cx="400" cy="236" r="16" fill="none" stroke="#9aa3ae" stroke-width="3"/><path d="M400 222 V236" stroke="#9aa3ae" stroke-width="3" stroke-linecap="round"/>
    <path d="M384 330 H416 M400 314 V346" stroke="#9aa3ae" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M384 422 H416" stroke="#9aa3ae" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="400" cy="520" r="15" fill="none" stroke="#9aa3ae" stroke-width="3"/>
  </g>`)
  },
  bulb: {
    svg: scene(`<circle cx="400" cy="300" r="300" fill="url(#warm)"/>${floor(400, 690, 90, 14)}
  <g filter="url(#drop)">
    <path d="M400 92 C 528 92 612 188 612 302 C 612 380 566 430 528 474 C 506 500 500 520 498 540 L302 540 C 300 520 294 500 272 474 C 234 430 188 380 188 302 C 188 188 272 92 400 92 Z" fill="url(#glass)"/>
    <ellipse cx="330" cy="210" rx="56" ry="94" fill="#fff" opacity=".55" transform="rotate(28 330 210)"/>
    <path d="M300 536 H500 L492 590 H308 Z" fill="url(#sideH)"/>
    <path d="M304 540 H496" stroke="#fff" stroke-width="3" opacity=".8"/>
    <rect x="308" y="588" width="184" height="10" rx="3" fill="#b8bfc8"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${314 + i * 2}" y="${598 + i * 18}" width="${172 - i * 4}" height="18" rx="9" fill="url(#metalH)"/>`).join('')}
    <path d="M330 670 H470 L452 696 H348 Z" fill="#2c3139"/>
    <ellipse cx="400" cy="702" rx="26" ry="10" fill="url(#metalH)"/>
  </g>`)
  }
}

rmSync(outDir, { recursive: true, force: true })
mkdirSync(svgDir, { recursive: true })
mkdirSync(outDir, { recursive: true })
for (const [name, { svg }] of Object.entries(visuals)) {
  const svgPath = join(svgDir, `${name}.svg`)
  const pngPath = join(svgDir, `${name}.png`)
  writeFileSync(svgPath, svg)
  execFileSync('rsvg-convert', ['-w', '800', '-h', '800', '-o', pngPath, svgPath])
  execFileSync('cwebp', ['-quiet', '-q', '88', pngPath, '-o', join(outDir, `${name}.webp`)])
  rmSync(pngPath)
}
console.log(`${Object.keys(visuals).length} visuels générés dans ${outDir}`)
