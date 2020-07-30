import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'
import loadData from '../src/loadData'

loadData().then(({ radars }) => {
  radars.forEach(radar => {
    const inputPath = join(process.cwd(), 'out', `${radar.key}.html`)
    const svg = readFileSync(inputPath, 'utf-8').match(/<svg.*<\/svg>/)[0]

    const outputPath = join(process.cwd(), 'out', `${radar.key}.svg`)
    writeFileSync(outputPath, svg)

    sharp(outputPath)
      .png({ compressionLevel: 1 })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .toFile(outputPath.replace(/\..*/, '.png'))
  })
})
