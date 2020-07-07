import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import loadJSON from '../src/helpers/loadJSON'

const { radars } = loadJSON('radars.json')

radars.forEach(radar => {
  const inputPath = join(process.cwd(), 'out', `${radar.id}.html`)
  const svg = readFileSync(inputPath, 'utf-8').match(/<svg.*<\/svg>/)[0]

  const outputPath = join(process.cwd(), 'out', `${radar.id}.svg`)
  writeFileSync(outputPath, svg)
})
