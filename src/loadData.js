import { readFileSync } from 'fs'
import { join } from 'path'

export default () => JSON.parse(readFileSync(join(process.cwd(), 'radars.json')))
