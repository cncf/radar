const { join } = require('path')
const { readFileSync } = require('fs')
const YAML = require('yaml')
const pathToString = require('./pathToString').default

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

export default (...path) => {
  const relativePath = join('content', ...path)
  const fullPath = join(process.cwd(), relativePath)
  const file = readFileSync(fullPath, 'utf-8')
  const document = YAML.parseDocument(file, { keepCstNodes: true })
  return getLineNumbers(document.contents.items)
}
