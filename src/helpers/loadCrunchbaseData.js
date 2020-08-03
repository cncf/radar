import path from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import querystring from 'querystring'
import YAML from 'yaml'

const downloadImage = async (imageId, imagePath) => {
  const url = `https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,w_120,h_120,b_white,f_png,q_100/${imageId}`
  const content = await (await fetch(url)).buffer()
  const destination = path.join(process.cwd(), 'public', imagePath)
  writeFileSync(destination, content)
}

const fetchCrunchbase = async crunchbaseId => {
  const url = `https://api.crunchbase.com/api/v4/entities/organizations/${crunchbaseId}`
  const params = {
    user_key: process.env.CRUNCHBASE_API_KEY,
    field_ids: 'name,num_employees_enum,categories'
  }
  const response = await (await fetch(`${url}?${querystring.stringify(params)}`)).json()
  const { name, num_employees_enum, identifier, categories } = response.properties
  const industry = (categories && categories[0].value) || 'N/A'
  const imagePath = `logos/${crunchbaseId}.png`
  await downloadImage(identifier.image_id, imagePath)

  return { name, industry, employeesCount: num_employees_enum || 'N/A', imagePath }
}

export default async function loadCrunchbaseData(radar) {
  const dataPath = path.join(process.cwd(), 'data', radar.key)

  const data = existsSync(dataPath) ? YAML.parse(readFileSync(dataPath, 'utf-8')) : { crunchbase: [] }
  const companiesDict = data.crunchbase.reduce((dict, company) => {
    const { id, ...rest } = company
    dict[id] = rest
    return dict
  }, {})

  const companies = await Promise.all((radar.companies || []).map(async companyId => {
    const companyAttrs = companiesDict[companyId] || await fetchCrunchbase(companyId)
    return { ...companyAttrs, id: companyId }
  }))

  writeFileSync(dataPath, YAML.stringify({ crunchbase: companies }))

  return companies
}
