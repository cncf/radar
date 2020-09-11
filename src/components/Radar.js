import { useContext } from 'react'
import { colors, typography } from '../styles.config'
import groupPoints from '../helpers/groupPoints'
import SelectedPointContext from '../contexts/SelectedPointContext'

const { fontFamily } = typography

const Title = ({ text, y }) => {
  return <text x="0" y={y} fill="#202020" fontSize={50}>
    {text}
  </text>
}

const Point = ({ distance, angle, point }) => {
  const x = (-distance * Math.cos(angle)).toFixed(2)
  const y = (-distance * Math.sin(angle)).toFixed(2) * (Math.abs(x) < 0.01 && distance <= 500 ? 1.1 : 1)
  const { setSelectedPoint } = useContext(SelectedPointContext)
  const onClick = _ => setSelectedPoint(point.landscapeId)

  return <>
    <style jsx>{`
      circle, text {
        cursor: pointer;
      }
    `}
    </style>
    <text x={x} y={+y} fill="#202020" fontSize={30} onClick={onClick}>{point.name}</text>
  </>
}

const PointCollection = ({ points, distance, minAngle }) => {
  const angle = (Math.PI - 2 * minAngle) / (points.length)

  const sortedPoints = points.sort((a, b) => a.name.length - b.name.length)
  const leftPoints = sortedPoints.filter((_, i) => i % 2 === 1)
  const rightPoints = sortedPoints.filter((_, i) => i % 2 === 0).reverse()
  const displayPoints = leftPoints.concat(rightPoints)

  return displayPoints.map((point, i) => {
    const pointAngle = angle * (i + 0.5) + minAngle
    return <Point point={point} distance={distance} angle={pointAngle} key={point.name}/>
  })
}

const Ring = ({ points, radius, minRadius, title, color }) => {
  const innerRadius = radius <= 500 ? (3 * radius + minRadius) / 4 : (2 * radius + minRadius) / 3
  const smallerRadius = (radius + 3 * minRadius) / 4

  const x = -radius * Math.cos(Math.PI / 6)
  const y = -radius * Math.sin(Math.PI / 6)

  return <>
    <path d={`M 0 0 L ${x} ${y} A ${radius} ${radius}, 0, 0, 1, ${-x} ${y} Z`} fill={color} strokeWidth="5" stroke="#202020" />
    <Title y={-smallerRadius} text={title.toUpperCase()} />
    <PointCollection points={points} distance={innerRadius} minAngle={Math.PI / 6} />
  </>
}

const Header = props => {
  return <text text-anchor="start" x="0" fontSize="50" dominantBaseline="hanging" fill={colors.blueTitle} {...props}>
    {props.children}
  </text>
}

export default function Radar({ points, name, showHeader = false }) {
  const groupedPoints = groupPoints(points)

  const padding = showHeader ? 30 : 0
  const width = 1740 + padding * 2
  const height = 1006 + (showHeader ? 90 : 0) + padding * 2

  return <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" dominantBaseline="central" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
    { showHeader && <Header text-anchor="start" x={padding} y={padding}>CNCF Technology Radar</Header> }
    { showHeader && <Header text-anchor="end" x={width - padding} y={padding}>{name}</Header> }
    <g transform={`translate(${width / 2} ${height - padding - 3})`}>
      <Ring radius={1000} minRadius={750} points={groupedPoints.assess} title="Assess" color={colors.assessBg} />
      <Ring radius={750} minRadius={500} points={groupedPoints.trial} title="Trial" color={colors.trialBg} />
      <Ring radius={500} minRadius={0} points={groupedPoints.adopt} title="Adopt" color={colors.adoptBg} />
    </g>
  </svg>
}
