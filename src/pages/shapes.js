import { Fragment, useContext } from 'react'
import { useRouter } from 'next/router'
import { colors, typography } from '../styles.config'
import loadData from '../loadData'
import withTitle from '../components/withTitle'
import Section from "../components/Section";

const { fontFamily } = typography
const ScaleContext = React.createContext(1);

const Title = ({ color, text, y }) => {
  const scale = useContext(ScaleContext);

  return <text x="0" y={y} fill={color} fontSize={scale * 70}>
    {text}
  </text>
}

const Point = ({ distance, angle, color, point }) => {
  const x = (-distance * Math.cos(angle)).toFixed(2)
  const y = (-distance * Math.sin(angle)).toFixed(2)
  const router = useRouter()
  const onClick = _ => router.push('/[...point]', `/${point.fullKey}`)
  const scale = useContext(ScaleContext);

  return <Fragment>
    <style jsx>{`
      circle, text {
        cursor: pointer;
      }
    `}
    </style>
    <circle cx={x} cy={y} r={scale * 20} fill={color} onClick={onClick} />
    <text x={x} y={+y + 50 * scale} fill={color} fontSize={scale * 40} onClick={onClick}>{point.name}</text>
  </Fragment>
}

const PointCollection = ({ points, distance, smallerDistance, color, minAngle, maxAngle = null, additional = 0, smallMinAngle = 0 }) => {
  const angle = ((maxAngle || Math.PI - minAngle) - minAngle) / (points.length + 1)

  if (points.length >= 8) {
    const firstHalf = points.slice(0, Math.ceil(points.length / 2))
    const thirdQuarter = points.slice(Math.ceil(points.length / 2), Math.ceil(3 * points.length / 4))
    const fourthQuarter = points.slice(Math.ceil(3 * points.length / 4))
    return <Fragment>
      <PointCollection points={firstHalf} distance={distance} minAngle={minAngle} color={color} />
      <PointCollection points={thirdQuarter} distance={smallerDistance} minAngle={smallMinAngle || minAngle} maxAngle={Math.PI / 2} color={color} additional={1} />
      <PointCollection points={fourthQuarter} distance={smallerDistance} minAngle={Math.PI / 2} maxAngle={Math.PI - (smallMinAngle || minAngle)} color={color} additional={1} />
    </Fragment>
  }

  return points.map((point, i) => {
    const pointAngle = angle * (i + 1) + minAngle
    return <Point point={point} distance={distance} angle={pointAngle} color={color} key={point.name}/>
  })
}

const FullCircleRadarRing = ({ points, radius, title, color }) => {
  const smallRadius = radius - 333
  const innerRadius = (radius + smallRadius) / 2
  const angle = 2 * Math.PI / (points.length + 1)

  return <Fragment>
    <path d={`M ${-radius} 0 A ${radius} ${radius}, 0, 0, 1, ${radius} 0 A ${radius} ${radius}, 0, 1, 1, ${-radius} 0`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={- innerRadius} color={color} text={title} />

    {
      points.map((point, i) => {
        const pointAngle = angle * i + Math.PI / 2 + angle
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name}/>
      })
    }
  </Fragment>
}


const RadarRing120 = ({ points, radius, title, color }) => {
  const smallRadius = radius - 333
  const cutOff = (radius + smallRadius) / 2
  const innerRadius = radius < 500 ? (3 * radius + cutOff) / 4 : (radius + cutOff) / 2
  const smallerRadius = (smallRadius + 2 * cutOff) / 3
  const titleRadius = (cutOff + smallRadius) / 2

  const x = -radius * Math.cos(Math.PI / 6)
  const y = -radius * Math.sin(Math.PI / 6)

  return <Fragment>
    <path d={`M 0 0 L ${x} ${y} A ${radius} ${radius}, 0, 0, 1, ${-x} ${y} Z`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={- titleRadius} color={color} text={title} />
    <PointCollection points={points} distance={innerRadius} smallerDistance={smallerRadius} minAngle={Math.PI / 6} color={color} />
  </Fragment>
}

const Radar = ({ name, themes, points, team }) => {
  const length = Math.max(points.adopt.length, points.trial.length, points.assess.length)

  return <Fragment>
    <Section>
      <h2>Full Circle</h2>

      <ScaleContext.Provider value={1}>
        <svg viewBox="0 0 2002 2002" xmlns="http://www.w3.org/2000/svg" dominantBaseline="middle" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
          <g transform="translate(1001 1001)">
            <FullCircleRadarRing radius={1000} points={points.assess} title="Assess" color={colors.assess} />
            <FullCircleRadarRing radius={666} points={points.trial} title="Trial" color={colors.trial} />
            <FullCircleRadarRing radius={333} points={points.adopt} title="Adopt" color={colors.adopt} />
          </g>
        </svg>
      </ScaleContext.Provider>
    </Section>

    <Section>
      <h2>120° Circle</h2>

      <ScaleContext.Provider value={1 / 1.404}>
        <svg viewBox="0 0 1732 1002" xmlns="http://www.w3.org/2000/svg" dominantBaseline="middle" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
          <g transform="translate(866 1001)">
            <RadarRing120 radius={1000} points={points.assess} title="Assess" color={colors.assess} />
            <RadarRing120 radius={666} points={points.trial} title="Trial" color={colors.trial} />
            <RadarRing120 radius={333} points={points.adopt} title="Adopt" color={colors.adopt} />
          </g>
        </svg>
      </ScaleContext.Provider>
    </Section>
  </Fragment>
}

export async function getStaticProps () {
  const { radars } = await loadData()
  const radar = radars.filter(radar => !radar.draft)[0]
  const points = {
    adopt: radar.points.filter(point => point.level === 'adopt'),
    trial: radar.points.filter(point => point.level === 'trial'),
    assess: radar.points.filter(point => point.level === 'assess')
  }
  return { props: { ...radar, points } }
}

export default withTitle(Radar, props => props.name)
