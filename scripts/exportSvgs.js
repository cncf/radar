import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import loadData from '../src/loadData'

loadData('radars.json').then(({ radars }) => {
  radars.forEach(radar => {
    const inputPath = join(process.cwd(), 'out', `${radar.key}.html`)
    const svg = readFileSync(inputPath, 'utf-8').match(/<svg.*<\/svg>/)[0]

    const outputPath = join(process.cwd(), 'out', `${radar.key}.svg`)
    writeFileSync(outputPath, svg)
  })
})
