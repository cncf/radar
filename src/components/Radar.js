import { useContext } from 'react'
import { colors, typography } from '../styles.config'
import groupPoints from '../helpers/groupPoints'
import SelectedPointContext from '../contexts/SelectedPointContext'
import { level_names, radar_levels, short_ident } from '../settings'

const { fontFamily } = typography

const Title = ({ text, y }) => {
  return <text x="0" y={y} fill="#202020" fontSize={50} fontWeight={500}>
    {text}
  </text>
}

const PointText = ({ x, y, onClick, text }) => {
  return <>
    <style jsx>{`
      text {
        cursor: ${onClick ? 'pointer' : 'default' };
      }
    `}</style>
    <text x={x} y={+y + 20} fill="#202020" fontSize={35} onClick={onClick}>{text}</text>
  </>
}

const Point = ({ x, y, point }) => {
  const { setSelectedPoint } = useContext(SelectedPointContext)
  const onClick = point.landscapeId ? _ => setSelectedPoint(point.landscapeId) : null

  const { name } = point
  const mid = name.length / 2
  const splitAt = name.split(' ')
    .reduce((arr, str) => [...arr, (arr[arr.length - 1] || 0) + arr.length + str.length], [])
    .sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid))[0]

  if (name.length < 15 || splitAt === name.length) {
    return <PointText x={x} y={+y} onClick={onClick} text={name} />
  }

  return <>
    <PointText x={x} y={+y - 30} onClick={onClick} text={name.slice(0, splitAt)} />
    <PointText x={x} y={+y + 5} onClick={onClick} text={name.slice(splitAt + 1)} />
  </>
}

const PointCollection = ({ points, distance, minAngle }) => {
  const minHeight = distance * Math.sin(minAngle)
  const sortedPoints = points.sort((a, b) => a.name.length - b.name.length)
  const leftPoints = sortedPoints.filter((_, i) => i % 2 === 1)
  const rightPoints = sortedPoints.filter((_, i) => i % 2 === 0).reverse()
  const displayPoints = leftPoints.concat(rightPoints)

  return displayPoints.map((point, i) => {
    const y2 = (1 - Math.abs(points.length - 2 * i - 1) / (points.length + 1)) * (distance - minHeight) + minHeight
    const x2 = 2 * (distance - y2) * (i < Math.floor(points.length / 2) ? -1 : 1)
    const x3 = Math.sqrt(distance ** 2 - y2 ** 2) * (i < Math.floor(points.length / 2) ? -1 : 1)
    const x = (x2 + x3) / 2
    const y = y2

    return <Point point={point} x={x} y={-y} key={point.name}/>
  })
}

const Ring = ({ points, radius, minRadius, title, color }) => {
  const innerRadius = radius - (radius <= 500 ? 100 : 75)
  const titleY = minRadius + (radius <= 500 ? 120 : 60)

  const x = -radius * Math.cos(Math.PI / 6)
  const y = -radius * Math.sin(Math.PI / 6)

  return <>
    <path d={`M 0 0 L ${x} ${y} A ${radius} ${radius}, 0, 0, 1, ${-x} ${y} Z`} fill={color} strokeWidth="5" stroke="#202020" />
    <Title y={-titleY} text={title.toUpperCase()} />
    <PointCollection points={points} distance={innerRadius} minAngle={Math.PI / 6} />
  </>
}

const Header = props => {
  return <text textAnchor="start" x="0" fontSize={50} fontWeight={500} dominantBaseline="hanging" fill={colors.darkPurple} {...props}>
    {props.children}
  </text>
}

export default function Radar({ points, title, subtitle, showHeader = false }) {
  const groupedPoints = groupPoints(points)

  const radarHeight = 250 * (radar_levels.length + 1)
  const radarWidth = radarHeight * Math.cos(Math.PI / 6) * 2

  const padding = showHeader ? 30 : 0
  const width = radarWidth + padding * 2
  const height = radarHeight + 6 + (showHeader ? 90 : 0) + (showHeader && subtitle ? 20 : 0) + padding * 2

  const rings = [...radar_levels].reverse().map((level, idx) => {
    const radius = 500 + (idx * 250)
    const inner = radius == 500 ? 0 : (radius - 250)
    return <Ring radius={radius} minRadius={inner} points={groupedPoints[level]} title={level_names[level]} color={colors[level + 'Bg']} />
  }).reverse()

  return <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" dominantBaseline="central" textAnchor="middle" fontFamily={fontFamily}>
    { showHeader && <Header textAnchor="start" x={padding} y={padding}>{ short_ident } Technology Radar</Header> }
    { showHeader && <Header textAnchor="end" x={width - padding} y={padding}>{title}</Header> }
    { showHeader && subtitle && <Header textAnchor="end" x={width - padding} y={padding + 60}>{subtitle}</Header> }
    <g transform={`translate(${width / 2} ${height - padding - 3})`}>
      {rings}
    </g>
  </svg>
}
