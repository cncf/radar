import path from 'path'
import { readdirSync, writeFileSync } from 'fs'
import stripUrl from './helpers/stripUrl'
import fetchLandscapeData from './helpers/fetchLandscapeData'
import fetchLogo from './helpers/fetchLogo'
import loadYaml from './helpers/loadYaml'

const downloadLogo = async (sourcePath, destinationPath) => {
  const content = await fetchLogo(sourcePath)
  const destination = path.join(process.cwd(), 'public', destinationPath)
  writeFileSync(destination, content)
}

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
  const { github_data } = landscapeAttrs || {}

  if (!landscapeAttrs) {
    return { ...attrs, key }
  }

  const description = (landscapeAttrs || {}).description || (github_data || {}).description
  return { description, landscapeId: landscapeAttrs.id, ...attrs, key }
}

const makeRadar = attrs => {
  const date = new Date(attrs.key.match(/\d{4}-\d{2}/)[0])
  const name = `${attrs.name}, ${(formatDate(date, { month: 'long', year: 'numeric' }))}`

  return { ...attrs, name }
}

const loadRadarData = _ => {
  return readdirSync(path.join(process.cwd(), 'content', 'radars')).map(path => {
    const radar = loadYaml('radars', path)
    const key = path.replace(/\.yml/, '')
    return { ...radar, key }
  })
}

export default async (filterFn) => {
  const data = loadRadarData()
  const landscapeData = await fetchLandscapeData()
  const industries = loadYaml('industries.yml')

  const radarPromises = data
    .sort((a, b) => -a.key.localeCompare(b.key))
    .filter(radar => filterFn ? filterFn(radar) : true)
    .map(async radarAttrs => {
      const radar = makeRadar(radarAttrs)

      const points = radar.points.map(pointAttrs => {
        const landscapeAttrs = landscapeData.find(project => projectMatches({ project, point: pointAttrs }))
        const point = makePoint(pointAttrs, landscapeAttrs)
        return { ...point, fullKey: `${radar.key}/${point.key}`, radarKey: radar.key }
      })

      const companyPromises = (radar.companies || []).map(async landscapeId => {
        const { id, flatName, href, crunchbaseData } = landscapeData.find(({ id }) => id === landscapeId) || {}
        const employeesRange = [crunchbaseData.numEmployeesMin, crunchbaseData.numEmployeesMax]
        const logoPath = `logos/${id}.svg`
        const industry = industries[landscapeId]
        await downloadLogo(href, logoPath)
        return { key: id, name: flatName, employeesRange, logoPath, industry }
      })

      const companies = await Promise.all(companyPromises)
      return { ...radar, points, companies }
    })

  const radars = await Promise.all(radarPromises)

  const points = radars.flatMap(radar => {
    return radar.points.map(point => ({ ...point, radar }))
  })

  return { radars, points }
}
