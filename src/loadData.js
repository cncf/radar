import cache from './cache'

export default async (filterFn) => {
  const radarsData = JSON.parse(await cache.get('data'))

  const radars = radarsData.filter(radar => filterFn ? filterFn(radar) : true)
  const points = radars.flatMap(radar => {
    return radar.points.map(point => ({ ...point, radar }))
  })

  return { radars, points }
}
