const { join } = require('path')
const { readFileSync } = require('fs')
const YAML = require('yaml')

module.exports = (...path) => {
  const relativePath = join('content', ...path)
  const fullPath = join(process.cwd(), relativePath)
  try {
    return YAML.parse(readFileSync(fullPath, 'utf-8'))
  } catch(e) {
    throw new Error(`Malformed YAML file ${relativePath}`)
  }
}
