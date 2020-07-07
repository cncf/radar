import cache from '../cache'

export default async () => {
  let data = await cache.get('landscape-data')

  if (!data) {
    data = await (await fetch('https://landscape.cncf.io/data.json')).text()
    await cache.set('landscape-data', data)
  }

  return JSON.parse(data)
}

