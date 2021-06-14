import { writeFileSync } from 'fs'
import cache from '../src/cache'

(async () => {
  const data = JSON.parse(await cache.get('data'))
  const feed = data.map(radar => {
    const image = `${process.env.URL || 'http://localhost:3000'}/${radar.subradars[0].key}-raw.svg`
    const { name, date, key, video } = radar
    return { image, video, name, date, key }
  })

  writeFileSync('out/radars.json', JSON.stringify(feed))
})()
