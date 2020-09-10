import { useContext } from 'react'
import { colors, typography } from '../styles.config'
import groupPoints from '../helpers/groupPoints'
import SelectedPointContext from '../contexts/SelectedPointContext'

const { fontFamily } = typography

const Title = ({ color, text, y }) => {
  return <text x="0" y={y} fill={color} fontSize={50}>
    {text}
  </text>
}

const Point = ({ distance, angle, color, point }) => {
  const x = (-distance * Math.cos(angle)).toFixed(2)
  const y = (-distance * Math.sin(angle)).toFixed(2)
  const { setSelectedPoint } = useContext(SelectedPointContext)
  const onClick = _ => setSelectedPoint(point.landscapeId)

  return <>
    <style jsx>{`
      circle, text {
        cursor: pointer;
      }
    `}
    </style>
    <circle cx={x} cy={y} r={10} fill={color} onClick={onClick} />
    <text x={x} y={+y + 40} fill={color} fontSize={30} onClick={onClick}>{point.name}</text>
  </>
}

const PointCollection = ({ points, distance, smallerDistance, color, minAngle, maxAngle = null, additional = 0, smallMinAngle = 0 }) => {
  const angle = ((maxAngle || Math.PI - minAngle) - minAngle) / (points.length + 1)

  if (points.length >= 8) {
    const firstHalf = points.slice(0, Math.ceil(points.length / 2))
    const thirdQuarter = points.slice(Math.ceil(points.length / 2), Math.ceil(3 * points.length / 4))
    const fourthQuarter = points.slice(Math.ceil(3 * points.length / 4))
    return <>
      <PointCollection points={firstHalf} distance={distance} minAngle={minAngle} color={color} />
      <PointCollection points={thirdQuarter} distance={smallerDistance} minAngle={smallMinAngle || minAngle} maxAngle={Math.PI / 2} color={color} additional={1} />
      <PointCollection points={fourthQuarter} distance={smallerDistance} minAngle={Math.PI / 2} maxAngle={Math.PI - (smallMinAngle || minAngle)} color={color} additional={1} />
    </>
  }

  return points.map((point, i) => {
    const pointAngle = angle * (i + 1) + minAngle
    return <Point point={point} distance={distance} angle={pointAngle} color={color} key={point.name}/>
  })
}

const Ring = ({ points, radius, title, color }) => {
  const smallRadius = radius - 333
  const cutOff = (radius + smallRadius) / 2
  const innerRadius = (radius + cutOff) / 2
  const smallerRadius = (smallRadius + 2 * cutOff) / 3
  const titleRadius = (cutOff + smallRadius) / 2

  const x = -radius * Math.cos(Math.PI / 6)
  const y = -radius * Math.sin(Math.PI / 6)

  return <>
    <path d={`M 0 0 L ${x} ${y} A ${radius} ${radius}, 0, 0, 1, ${-x} ${y} Z`} stroke={color} strokeWidth="5" fill="none"/>
    <Title y={- titleRadius} color={color} text={title.toUpperCase()} />
    <PointCollection points={points} distance={innerRadius} smallerDistance={smallerRadius} minAngle={Math.PI / 6} color={color} />
  </>
}

const Header = props => {
  return <text text-anchor="start" x="0" fontSize="50" fill={colors.blueTitle} {...props}>
    {props.children}
  </text>
}

export default function Radar({ points, name, showHeader = false }) {
  const groupedPoints = groupPoints(points)

  const padding = showHeader ? 30 : 0
  const width = 1740 + padding * 2
  const height = 1006 + (showHeader ? 60 : 0) + padding * 2

  return <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" dominantBaseline="central" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
    { showHeader && <Header text-anchor="start" x={padding} y={padding + 30}>CNCF Technology Radar</Header> }
    { showHeader && <Header text-anchor="end" x={width - padding} y={padding + 30}>{name}</Header> }
    <g transform={`translate(${width / 2} ${height - padding - 3})`}>
      <Ring radius={1000} points={groupedPoints.assess} title="Assess" color={colors.assess} />
      <Ring radius={666} points={groupedPoints.trial} title="Trial" color={colors.trial} />
      <Ring radius={333} points={groupedPoints.adopt} title="Adopt" color={colors.adopt} />
    </g>
  </svg>
}
