import loadYaml from './loadYaml'
import PageSchema from '../schemas/PageSchema'

const loadPage = async (...path) => {
  const content = loadYaml(...path)
  return await PageSchema.validate(content)
}

export default loadPage
