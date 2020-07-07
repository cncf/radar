import { readFileSync } from 'fs'
import { join } from 'path'
import stripUrl from './helpers/stripUrl'

const projectMatches = ({ project, point }) => {
  if (point.repo) {
    return project.repo_url === `https://github.com/${point.repo}`
  }

  return stripUrl(project.homepage_url) === stripUrl(point.homepage)
}

export default async () => {
  const data = JSON.parse(readFileSync(join(process.cwd(), 'radars.json')))

  // TODO: only fetch landscape data when radar changes...
  const landscapeData = await (await fetch('https://landscape.cncf.io/data.json')).json()

  const radars = data.radars.map(radar => {
    const pointsWithData = radar.points.map(point => {
      const extraData = landscapeData.find(project => projectMatches({ project, point }))
      if (!extraData) {
        return point
      }
      const { homepage_url, twitter, github_data } = extraData
      const description = extraData.description || (github_data && github_data.description)

      return { description, twitter, homepage: homepage_url, ...point  }
    })

    const points = {
      adopt: pointsWithData.filter(point => point.level === 'adopt'),
      trial: pointsWithData.filter(point => point.level === 'trial'),
      assess: pointsWithData.filter(point => point.level === 'assess')
    }

    return { ...radar, points }
  })

  return { radars }
}
