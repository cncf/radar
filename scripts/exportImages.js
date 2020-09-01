import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'
import loadData from '../src/loadData'

const exportImages = (target, destination) => {
  const inputPath = join(process.cwd(), 'out', target)
  const svg = readFileSync(inputPath, 'utf-8').match(/<svg.*<\/svg>/)[0]

  const outputPath = join(process.cwd(), 'out', destination)
  writeFileSync(outputPath, svg)

  sharp(outputPath)
    .png({ compressionLevel: 1 })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .toFile(outputPath.replace(/\..*/, '.png'))
}

loadData().then(({ radars }) => {
  radars.forEach(radar => {
    exportImages(`${radar.key}.html`, `${radar.key}-raw.svg`)
    exportImages(`images/${radar.key}.html`, `${radar.key}.svg`)
  })
}).catch(error => {
  console.log('ERROR EXPORTING SVG!!!')
  console.log('Exception ===>', error.message)
  process.exit(1)
})
