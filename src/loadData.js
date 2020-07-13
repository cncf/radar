import path from 'path'
import { readdirSync, readFileSync } from 'fs'
import YAML from 'yaml'
import stripUrl from './helpers/stripUrl'
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

const makePoint = (attrs, landscapeAttrs) => {
  const key = attrs.name.toLowerCase().replace(/\W/g, '-')
  const { homepage_url, twitter, github_data } = landscapeAttrs || {}

  if (!landscapeAttrs) {
    return { ...attrs, key }
  }

  const description = (landscapeAttrs || {}).description || (github_data || {}).description
  return { description, twitter, homepage: homepage_url, ...attrs, key }
}

const makeRadar = attrs => {
  const key = `${attrs.id}-${attrs.date.replace(/-\d+$/, '')}`
  const date = new Date(attrs.date)
  const name = `${attrs.name} (${(formatDate(date, { month: 'long', year: 'numeric' }))})`

  return { ...attrs, key, name }
}

const loadRadarData = _ => {
  const expandPath = (...args) => path.join(process.cwd(), ...args)
  return readdirSync(expandPath('radars'))
    .map(path => YAML.parse(readFileSync(expandPath('radars', path), 'utf-8')))
}

export default async () => {
  const data = loadRadarData()
  const landscapeData = await fetchLandscapeData()

  const radars = data
    .filter(radar => process.env.SHOW_DRAFTS ? true : !radar.draft)
    .sort((a, b) => -a.date.localeCompare(b.date))
    .map(radarAttrs => {
      const radar = makeRadar(radarAttrs)

      const points = radar.points.map(pointAttrs => {
        const landscapeAttrs = landscapeData.find(project => projectMatches({ project, point: pointAttrs }))
        const point = makePoint(pointAttrs, landscapeAttrs)
        return { ...point, fullKey: `${radar.key}/${point.key}`, radarKey: radar.key }
      })

      return { ...radar, points }
    })

  const points = radars.flatMap(radar => {
    return radar.points.map(point => ({ ...point, radar }))
  })

  return { radars, points }
}
