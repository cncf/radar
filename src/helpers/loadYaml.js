import { join } from 'path'
import { basename } from 'path'
import { readFileSync } from 'fs'
import YAML, { LineCounter } from 'yaml'
import Logger from './logger'
import stringToPath from './stringToPath'
import pathToString from './pathToString'


class YamlFile {
  constructor(path, schema) {
    const fullPath = join(process.cwd(), 'content', path)
    this.path = path
    this.key = basename(path, '.yml')
    this.schema = schema
    this.errors = []
    this.data = {}
    this.file = readFileSync(fullPath, 'utf-8')
    this.lineCounter = new LineCounter()
  }

  isValid() {
    return this.errors.length === 0
  }

  addError({ path, message }) {
    if (!path) {
      this.errors.push(message)
      return
    }
    const label = pathToString(path)
    const lineNumber = this.lineNumbers[label] || this.lineNumbers[pathToString(path.slice(0, -1))] || 1
    this.errors.push(`  * Line ${lineNumber}: "${label}" ${message}`)
  }

  printErrors() {
    if (!this.isValid()) {
      Logger.error(`Invalid YAML file ${this.path}`, ...this.errors, '')
    }
  }

  getLineNumbers(items, parentPath = []) {
    return items.reduce((acc, item, idx) => {
      const key = item.key ? item.key.value : idx
      const value = item.value || item
      const { line } = this.lineCounter.linePos((item.key || item).range[0])
      const path = [...parentPath, key]
      const pathStr = pathToString(path)
      return { ...acc, [pathStr]: line, ...(value.items ? this.getLineNumbers(value.items, path) : {}) }
    }, {})
  }

  validate() {
    return new Promise(resolve => {
      this.schema.validate(this.data, { abortEarly: false })
        .then(value => {
          this.data = value
          resolve()
        })
        .catch(error => {
          error.inner.forEach(err => {
            const path = stringToPath(err.path)
            const regexp = new RegExp(`^${err.path.replace('[', '\\[')}`)
            err.errors.map(msg => this.addError({ path, message: msg.replace(regexp, '').trim() }))
          })
          resolve()
        })
    })
  }

  load() {
    try {
      this.data = YAML.parse(this.file)
      const document = YAML.parseDocument(this.file, { lineCounter: this.lineCounter })
      this.lineNumbers = this.getLineNumbers(document.contents.items)

      if (this.schema) {
        return this.validate()
      }
    } catch (e) {
      const messages = [
        `  Malformed YAML file:`,
        ...e.message.split('\n').map(str => `    ${str}`)
      ]

      messages.forEach(message => this.addError({ message }))
    }
  }
}

export default async (path, options = {}) => {
  const { schema } = options
  const yamlFile = new YamlFile(path, schema)
  await yamlFile.load()
  return yamlFile
}
