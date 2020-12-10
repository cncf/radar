import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import loadData from '../src/loadData'
import puppeteer from'puppeteer'

const injectSvg = svg => `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body>
    ${svg}
  </body>
  </html>
`

const takeScreenshot = async (svg, destination) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'], defaultViewport: {width: 1200, height: 675} })
  const page = await browser.newPage()
  const htmlBase64 = Buffer.from(injectSvg(svg)).toString('base64')
  await page.goto(`data:text/html;base64,${htmlBase64}`)
  const element = await page.$('svg')
  await element.screenshot({path: destination})

  await browser.close();
}

const exportImages = async (target, destination) => {
  const inputPath = join(process.cwd(), 'out', target)
  const svg = readFileSync(inputPath, 'utf-8').match(/<svg.*<\/svg>/)[0]

  const outputPath = join(process.cwd(), 'out', destination)
  writeFileSync(outputPath, svg)

  await takeScreenshot(svg, outputPath.replace(/\..*/, '.png'))
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
