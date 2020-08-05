import path from 'path'
import { readdirSync, writeFileSync, unlinkSync } from 'fs'
import stripUrl from './helpers/stripUrl'
import loadYaml from './helpers/loadYaml'
import fetchUrl from './helpers/fetchUrl'

const fetchLandscapeData = async _ => JSON.parse(await fetchUrl('https://landscape.cncf.io/data.json'))

const downloadLogo = async (sourcePath, name) => {
  const content = await fetchUrl(`https://landscape.cncf.io/${sourcePath}`)
  const destination = path.join(process.cwd(), 'public', 'logos', name)
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

const buildPoint = (attrs, landscapeAttrs) => {
  const key = attrs.name.toLowerCase().replace(/\W/g, '-')
  const { github_data } = landscapeAttrs || {}

  if (!landscapeAttrs) {
    return { ...attrs, key }
  }

  const description = (landscapeAttrs || {}).description || (github_data || {}).description
  return { description, landscapeId: landscapeAttrs.id, ...attrs, key }
}

const buildRadar = attrs => {
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

const deleteUnusedData = radars => {
  const logos = radars.flatMap(radar => {
    return radar.companies.map(company => company.logo)
  })

  const logosDir = path.join(process.cwd(), 'public', 'logos')
  const savedLogos = readdirSync(logosDir)

  savedLogos.forEach(logo => {
    if (logos.indexOf(logo) === -1) {
      unlinkSync(path.join(logosDir, logo))
    }
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
      const radar = buildRadar(radarAttrs)

      const points = radar.points.map(pointAttrs => {
        const landscapeAttrs = landscapeData.find(project => projectMatches({ project, point: pointAttrs }))
        const point = buildPoint(pointAttrs, landscapeAttrs)
        return { ...point, fullKey: `${radar.key}/${point.key}`, radarKey: radar.key }
      })

      const companyPromises = (radar.companies || []).map(async landscapeId => {
        const { id, flatName, href, crunchbaseData } = landscapeData.find(({ id }) => id === landscapeId) || {}
        const employeesRange = [crunchbaseData.numEmployeesMin, crunchbaseData.numEmployeesMax]
        const logo = `${id}.svg`
        const industry = industries[landscapeId]
        await downloadLogo(href, logo)
        return { key: id, name: flatName, employeesRange, logo, industry }
      })

      const companies = await Promise.all(companyPromises)
      return { ...radar, points, companies }
    })

  const radars = await Promise.all(radarPromises)

  const points = radars.flatMap(radar => {
    return radar.points.map(point => ({ ...point, radar }))
  })

  deleteUnusedData(radars)

  return { radars, points }
}
