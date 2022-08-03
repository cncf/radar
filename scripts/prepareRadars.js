import path from 'path'
import { mkdirSync, readdirSync, writeFileSync } from 'fs'
import imageSize from 'image-size'
import stripUrl from '../src/helpers/stripUrl'
import loadYaml from '../src/helpers/loadYaml'
import fetchUrl from '../src/helpers/fetchUrl'
import RadarSchema from '../src/schemas/RadarSchema'
import Logger from '../src/helpers/logger'
import cache from '../src/cache'
import settings from '../content/settings'

const getExtension = buffer => {
  return imageSize(buffer).type
}

const fetchLandscapeData = async _ => JSON.parse(await fetchUrl(settings.landscape_base + '/data/items.json'))

const downloadLogo = async (sourcePath, name) => {
  const content = await fetchUrl(`${settings.landscape_base}${sourcePath}`)
  const destination = path.join(process.cwd(), 'public', 'logos', name)
  writeFileSync(destination, content)
}

const projectMatches = ({ project, point }) => {
  if (!point.repo && !point.homepage) {
    return false
  }

  if (point.repo) {
    return project.repo_url === `${settings.points.link_prefix}${point.repo}`
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
  const date = formatDate(new Date(attrs.key.match(/\d{4}-\d{2}/)[0]), { month: 'long', year: 'numeric' })
  const longName = `${attrs.name}, ${date}`

  return { ...attrs, date, longName }
}

const fetchPhoto = async url => {
  try {
    return await fetchUrl(url)
  } catch(e) {
    return false
  }
}

const buildCompany = async attrs => {
  const { id, flatName, href, crunchbaseData, homepage_url, industry } = attrs
  const employeesRange = [crunchbaseData.numEmployeesMin, crunchbaseData.numEmployeesMax]
  const homepage = homepage_url
  const logo = `${id}.svg`
  await downloadLogo(href, logo)
  return { key: id, name: flatName, employeesRange, logo, industry, homepage }
}

const buildMember = async (attrs, radarKey) => {
  const url = attrs.photo
  const dirPath = path.join(process.cwd(), 'public', 'photos', radarKey)
  mkdirSync(dirPath, { recursive: true })
  const memberSlug = attrs.name.toLowerCase().replace(/\W/g, '-')
  let fileName = readdirSync(dirPath).find(f => f.split('.')[0] === memberSlug)

  if (!fileName) {
    const content = await fetchPhoto(url)
    if (!content) {
      throw `Member ${attrs.name} has invalid photo URL: ${url}`
    }
    fileName = [memberSlug, getExtension(content)].join('.')
    const destination = path.join(dirPath, fileName)
    writeFileSync(destination, content)
  }

  return { ...attrs, photo: `/photos/${radarKey}/${fileName}` }
}

const loadRadarData = async _ => {
  const radars = readdirSync(path.join(process.cwd(), 'content', 'radars'))
  return await Promise.all(radars.map(async path => {
    if (!path.match(/^\d{4}\-\d{2}\-[\w|\-]+\.yml$/)) {
      Logger.error(`${path} is not a valid radar name, it should look like YYYY-DD-\$\{radar-name\}.yml`)
      return { valid: false }
    }
    return await loadYaml(`radars/${path}`, { schema: RadarSchema })
  }))
}

const enhanceCompanyInfo = (radars, landscapeData) => {
  radars.filter(radar => radar.isValid()).forEach(radar => {
    radar.data.companies = (radar.data.companies || []).map((company, idx) => {
      const { landscapeId } = company
      const landscapeAttrs = landscapeData.find(({ id }) => id === landscapeId)

      if (!landscapeAttrs) {
        const path = ['companies', idx, 'landscapeId']
        const message = `${landscapeId} does not appear on the landscape`
        radar.addError({ path, message })
      }

      return { ...landscapeAttrs, ...company }
    })
  })
}

const fetchData = async _ => {
  const landscapeData = await fetchLandscapeData()
  const data = await loadRadarData()

  enhanceCompanyInfo(data, landscapeData)

  const invalidRadars = data.filter(radar => !radar.isValid())

  if (invalidRadars.length > 0) {
    invalidRadars.forEach(radar => radar.printErrors())
    throw 'One or more radars are invalid. Processing stopped'
  }

  const radarPromises = data
    .sort((a, b) => -a.key.localeCompare(b.key))
    .map(async ({ data:radarAttrs, key }) => {
      const radar = buildRadar({ ...radarAttrs, key })

      const subradars = (radar.subradars || [{ single: true, points: radar.points }]).map(subradar => {
        const radarKey = subradar.single ? radar.key : [radar.key, subradar.name.toLowerCase().replace(/(\W+)/g, '-')].join('--')
        const points = subradar.points.map(pointAttrs => {
          const landscapeAttrs = landscapeData.find(project => projectMatches({ project, point: pointAttrs }))
          const point = buildPoint(pointAttrs, landscapeAttrs)
          return { ...point, fullKey: `${radarKey}/${point.key}`, radarKey: radar.key }
        })

        return { ...subradar, points, key: radarKey }
      })

      const companyPromises = (radar.companies || []).map(async attrs => await buildCompany(attrs))
      const teamPromises = radar.team.map(async attrs => await buildMember(attrs, radar.key))

      const companies = await Promise.all(companyPromises)
      const team = await Promise.all(teamPromises)
      return { ...radar, subradars, companies, team }
    })

  const radars = await Promise.all(radarPromises)

  await cache.set('data', JSON.stringify(radars))
}

fetchData()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
