import cache from '../cache'

export default async url => {
  let data = await cache.get(url)

  if (!data) {
    const response = await fetch(url)
    if (response.status !== 200) {
      throw new Error(`Could not fetch URL ${url}. Response status: ${response.status}`)
    }
    data = await response.buffer()
    await cache.set(url, data)
  }

  return data
}
