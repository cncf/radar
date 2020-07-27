import { join } from 'path'
import { readFileSync } from 'fs'
import YAML from 'yaml'

export default (...path) => {
  const fullPath = join(process.cwd(), 'content', ...path)
  return YAML.parse(readFileSync(fullPath, 'utf-8'))
}
