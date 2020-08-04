import cache from '../cache'

export default async path => {
  let data = await cache.get(path)

  if (!data) {
    data = await (await fetch(`https://landscape.cncf.io/${path}`)).text()
    await cache.set(path, data)
  }

  return data
}
