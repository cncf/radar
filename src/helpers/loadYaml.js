import { join } from 'path'
import { readFileSync } from 'fs'
import YAML from 'yaml'
import Logger from './logger'
import stringToPath from './stringToPath'
import pathToString from './pathToString'

const getLineNumbers = (items, parentPath = []) => {
  return items.reduce((acc, item, idx) => {
    const key = item.key ? item.key.value : idx
    const value = item.value || item
    const cstNode = (item.key && item.key.cstNode) || item.cstNode
    const { line } = cstNode.rangeAsLinePos.start
    const path = [...parentPath, key]
    return { ...acc, [pathToString(path)]: line, ...(value.items ? getLineNumbers(value.items, path) : {}) }
  }, {})
}

const validateYaml = (yaml, schema, filePath, file) => {
  return new Promise(resolve => {
    schema.validate(yaml, { abortEarly: false })
      .then(value => resolve({ data: value, valid: true }))
      .catch(error => {
        const document = YAML.parseDocument(file, { keepCstNodes: true })
        const lineNumbers = getLineNumbers(document.contents.items)
        const messages = error.inner.flatMap(err => {
          const path = stringToPath(err.path)
          const label = pathToString(path)
          const lineNumber = lineNumbers[label] || lineNumbers[pathToString(path.slice(0, -1))] || 1
          const regexp = new RegExp(`^${err.path.replace('[', '\\[')}`)
          return err.errors.map(msg => `  * Line ${lineNumber}: "${label}" ${msg.replace(regexp, '').trim()}`)
        })
        Logger.error(`Invalid File ${filePath}`, ...messages, '')
        resolve({ data: {}, valid: false })
      })
  })
}

export default (path, options = {}) => {
  const { schema } = options
  const relativePath = join('content', path)
  const fullPath = join(process.cwd(), relativePath)
  try {
    const file = readFileSync(fullPath, 'utf-8')
    const yaml = YAML.parse(file)

    if (!schema) {
      return { data: yaml, valid: true }
    }

    return validateYaml(yaml, schema, path, file)
  } catch(e) {
    const messages = e.message.split('\n').map(str => `  ${str}`)
    Logger.error(`Malformed YAML file ${relativePath}`, ...messages)
    throw "\nProcessing stopped\n"
  }
}
