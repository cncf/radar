import { tmpdir } from 'os'
import { join } from 'path'
import cacache from 'cacache'

const cachePath = join(tmpdir(), 'radar-cache')

const get = key => {
  return new Promise(resolve => {
    cacache.get(cachePath, key)
      .then(({ data, ...rest }) => resolve(data.toString()))
      .catch(_ => resolve())
  })
}
const set = async (key, data) => await cacache.put(cachePath, key, data)
const clear = async _ => await cacache.rm.all(cachePath)

export default { get, set, clear }
