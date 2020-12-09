const { join } = require('path')
const { readFileSync } = require('fs')
const YAML = require('yaml')
const Logger = require('./logger')

module.exports = (...path) => {
  const relativePath = join('content', ...path)
  const fullPath = join(process.cwd(), relativePath)
  try {
    return YAML.parse(readFileSync(fullPath, 'utf-8'))
  } catch(e) {
    const messages = e.message.split('\n').map(str => `  ${str}`)
    Logger.error(`Malformed YAML file ${relativePath}`, ...messages)
    throw "\nProcessing stopped\n"
  }
}
