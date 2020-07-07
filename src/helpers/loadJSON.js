const { readFileSync, existsSync } = require('fs')
const { join } = require('path')

module.exports = path => {
  const fullPath = join(process.cwd(), path)
  if (existsSync(fullPath)) {
    return JSON.parse(readFileSync(fullPath))
  }
}
