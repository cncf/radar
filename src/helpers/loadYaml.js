const { join } = require('path')
const { readFileSync } = require('fs')
const YAML = require('yaml')

module.exports = (...path) => {
  const fullPath = join(process.cwd(), 'content', ...path)
  return YAML.parse(readFileSync(fullPath, 'utf-8'))
}
