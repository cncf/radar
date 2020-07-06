import { readFileSync } from 'fs'
import { join } from 'path'

export default () => {
  const data = JSON.parse(readFileSync(join(process.cwd(), 'radars.json')))

  const radars = data.radars.map(radar => {
    const points = {
      adopt: radar.points.filter(point => point.level === 'adopt'),
      trial: radar.points.filter(point => point.level === 'trial'),
      assess: radar.points.filter(point => point.level === 'assess')
    }

    return { ...radar, points }
  })

  return { radars }
}
