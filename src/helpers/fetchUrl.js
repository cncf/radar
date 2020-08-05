import cache from '../cache'

export default async url => {
  let data = await cache.get(url)

  if (!data) {
    data = await (await fetch(url)).text()
    await cache.set(url, data)
  }

  return data
}
