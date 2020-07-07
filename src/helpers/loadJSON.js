import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

module.exports = path => {
  const fullPath = join(process.cwd(), path)
  if (existsSync(fullPath)) {
    return JSON.parse(readFileSync(fullPath))
  }
}
