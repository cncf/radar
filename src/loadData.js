import path from 'path'
import { readdirSync, writeFileSync, unlinkSync } from 'fs'
import imageSize from 'image-size'
import stripUrl from './helpers/stripUrl'
import loadYaml from './helpers/loadYaml'
import fetchUrl from './helpers/fetchUrl'

const getExtension = buffer => {
  return imageSize(buffer).type
}

const industries = loadYaml('industries.yml')

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

const buildCompany = async attrs => {
  const { id, flatName, href, crunchbaseData } = attrs
  const employeesRange = [crunchbaseData.numEmployeesMin, crunchbaseData.numEmployeesMax]
  const logo = `${id}.svg`
  const industry = industries[id]
  await downloadLogo(href, logo)
  return { key: id, name: flatName, employeesRange, logo, industry }
}

const buildMember = async (attrs) => {
  const url = attrs.photo
  const content = await fetchUrl(url)
  const memberSlug = attrs.name.toLowerCase().replace(/\W/g, '-')
  const photo = [memberSlug, getExtension(content)].join('.')
  const destination = path.join(process.cwd(), 'public', 'photos', photo)
  writeFileSync(destination, content)
  return { ...attrs, photo }
}

const loadRadarData = _ => {
  return readdirSync(path.join(process.cwd(), 'content', 'radars')).map(path => {
    const radar = loadYaml('radars', path)
    const key = path.replace(/\.yml/, '')
    return { ...radar, key }
  })
}

const deleteUnusedFiles = (directoryName, usedFiles) => {
  const directory = path.join(process.cwd(), 'public', directoryName)
  const storedFiles = readdirSync(directory)

  storedFiles.forEach(file => {
    if (usedFiles.indexOf(file) === -1) {
      unlinkSync(path.join(directory, file))
    }
  })
}

const deleteUnusedData = radars => {
  const logos = radars.flatMap(radar => {
    return radar.companies.map(company => company.logo)
  })

  deleteUnusedFiles('logos', logos)

  const photos = radars.flatMap(radar => {
    return radar.team.map(member => member.photo)
  })

  deleteUnusedFiles('photos', photos)
}

export default async (filterFn) => {
  const data = loadRadarData()
  const landscapeData = await fetchLandscapeData()

  const radarPromises = data
    .sort((a, b) => -a.key.localeCompare(b.key))
    .map(async radarAttrs => {
      const radar = buildRadar(radarAttrs)

      const points = radar.points.map(pointAttrs => {
        const landscapeAttrs = landscapeData.find(project => projectMatches({ project, point: pointAttrs }))
        const point = buildPoint(pointAttrs, landscapeAttrs)
        return { ...point, fullKey: `${radar.key}/${point.key}`, radarKey: radar.key }
      })

      const companyPromises = (radar.companies || []).map(async landscapeId => {
        const landscapeAttrs = landscapeData.find(({ id }) => id === landscapeId) || {}
        return await buildCompany(landscapeAttrs)
      })

      const teamPromises = radar.team.map(async attrs => await buildMember(attrs))

      const companies = await Promise.all(companyPromises)
      const team = await Promise.all(teamPromises)
      return { ...radar, points, companies, team }
    })

  const radarsData = await Promise.all(radarPromises)
  deleteUnusedData(radarsData)

  const radars = radarsData.filter(radar => filterFn ? filterFn(radar) : true)
  const points = radars.flatMap(radar => {
    return radar.points.map(point => ({ ...point, radar }))
  })

  return { radars, points }
}
