import { radar_levels } from "../settings"

const groupPoints = points => {
  return Object.assign({},
    ...radar_levels.map(
      level => ({[level]: points.filter(point => point.level === level)})
    )
  )
}

export default groupPoints
