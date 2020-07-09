import stripUrl from './helpers/stripUrl'
import loadJSON from './helpers/loadJSON'
import fetchLandscapeData from './helpers/fetchLandscapeData'

const projectMatches = ({ project, point }) => {
  if (point.repo) {
    return project.repo_url === `https://github.com/${point.repo}`
  }

  return stripUrl(project.homepage_url) === stripUrl(point.homepage)
}

const formatDate = (date, format) => {
  const dateTimeFormat = new Intl.DateTimeFormat('en', format)
  return dateTimeFormat.format(date)
}

export default async () => {
  const data = loadJSON('radars.json')
  const landscapeData = await fetchLandscapeData()

  const radars = data.radars
    .filter(radar => process.env.SHOW_DRAFTS ? true : !radar.draft)
    .map(radar => {
      const radarKey = `${radar.id}-${radar.date.replace(/-\d+$/, '')}`
      const pointsWithData = radar.points.map(point => {
        const key = point.name.toLowerCase().replace(/\W/g, '-')
        const extraData = landscapeData.find(project => projectMatches({ project, point }))
        if (!extraData) {
          return { ...point, key, radarKey }
        }
        const { homepage_url, twitter, github_data } = extraData
        const description = extraData.description || (github_data && github_data.description)

        return { description, twitter, homepage: homepage_url, ...point, radarKey, key }
      })

      const points = {
        adopt: pointsWithData.filter(point => point.level === 'adopt'),
        trial: pointsWithData.filter(point => point.level === 'trial'),
        assess: pointsWithData.filter(point => point.level === 'assess')
      }

      const date = new Date(radar.date)
      const name = `${radar.name} (${(formatDate(date, { month: 'long', year: 'numeric' }))})`

      return { ...radar, key: radarKey, name, points }
    })

  return { radars }
}
