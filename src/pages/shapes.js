import { Fragment, useContext } from 'react'
import { useRouter } from 'next/router'
import { colors, fontFamily } from '../styles.config'
import loadData from '../loadData'
import withTitle from '../components/withTitle'
import Section from "../components/Section";

const ScaleContext = React.createContext(1);

const Title = ({ color, text, y }) => {
  const scale = useContext(ScaleContext);

  return <text x="0" y={y} fill={color} fontSize={scale * 50}>
    {text.toUpperCase()}
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
    <circle cx={x} cy={y} r={scale * 12} fill={color} onClick={onClick} />
    <text x={x} y={+y + 40 * scale} fill={color} fontSize={scale * 35} onClick={onClick}>{point.name}</text>
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

const RadarRing = ({ points, radius, title, color }) => {
  const innerRadius = (2 * radius - 333) / 2
  const angle = Math.PI / (2 * Math.ceil(points.length / 2) + 1)

  return <Fragment>
    <path d={`M 0 0 L ${- radius} 0 A 1 1, 0, 1, 1, ${radius} 0 Z`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={- innerRadius} color={color} text={title} />

    {
      points.map((point, i) => {
        const pointAngle = angle * (i + (i >= (points.length / 2) ? 2 : 1)) - angle / 2
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name} />
      })
    }
  </Fragment>
}

const SquareRadarRing = ({ points, radius, title, color }) => {
  const intersectionY = radius > 500 ? -Math.sqrt(radius ** 2 - 500 ** 2) : 0
  const intersectionX = Math.sqrt(radius ** 2 - intersectionY ** 2)
  const smallRadius = radius - 333
  const innerRadius = (3 * radius + smallRadius) / 4
  const titleRadius = (radius + 3 * smallRadius) / 4
  const offset = Math.acos(intersectionX / radius)
  const angle = (Math.PI - 2 * offset) / points.length

  return <Fragment>
    <path d={`M 0 0 H ${Math.max(-radius, -500)} V ${intersectionY} A ${radius} ${radius}, 0, 0, 1, ${intersectionX} ${intersectionY} V 0 Z`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={-titleRadius} color={color} text={title} />

    {
      points.map((point, i) => {
        const pointAngle = angle * i + angle / 2 + offset
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name}/>
      })
    }
  </Fragment>
}

const RectangleRadarRing = ({ points, radius, title, color }) => {
  const intersectionY = radius > 666 ? -Math.sqrt(radius ** 2 - 666 ** 2) : 0
  const intersectionX = Math.sqrt(radius ** 2 - intersectionY ** 2)
  const smallRadius = radius - 333
  const innerRadius = (3 * radius + smallRadius) / 4
  const titleRadius = (radius + 3 * smallRadius) / 4
  const offset = Math.acos(intersectionX / radius)
  const angle = (Math.PI - 2 * offset) / points.length

  return <Fragment>
    <path d={`M 0 0 H ${Math.max(-radius, -666)} V ${intersectionY} A ${radius} ${radius}, 0, 0, 1, ${intersectionX} ${intersectionY} V 0 Z`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={-titleRadius} color={color} text={title} />

    {
      points.map((point, i) => {
        const pointAngle = angle * i + angle / 2 + offset
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name}/>
      })
    }
  </Fragment>
}

const FullCircleRadarRing = ({ points, radius, title, color }) => {
  const smallRadius = radius - 333
  const centralRing = smallRadius <= 1
  const innerRadius = centralRing ? 0.66 * (radius + smallRadius) : (radius + smallRadius) / 2
  const angle = 2 * Math.PI / (points.length + (centralRing ? 0 : 1))

  return <Fragment>
    <path d={`M ${-radius} 0 A ${radius} ${radius}, 0, 0, 1, ${radius} 0 A ${radius} ${radius}, 0, 1, 1, ${-radius} 0`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={centralRing ? 0 : -innerRadius} color={color} text={title} />

    {
      points.map((point, i) => {
        const pointAngle = angle * i + Math.PI / 2 + angle
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name}/>
      })
    }
  </Fragment>
}

const QuarterRadarRing = ({ points, radius, title, color }) => {
  const smallRadius = radius - 333
  const cutOff = (radius + smallRadius) / 2
  const innerRadius = (radius + cutOff) / 2
  const titleRadius = Math.max(20 + (cutOff + smallRadius) / 2, 120)

  const x = -radius * Math.cos(Math.PI / 4)
  const y = -radius * Math.sin(Math.PI / 4)

  return <Fragment>
    <path d={`M 0 0 L ${x} ${y} A ${radius} ${radius}, 0, 0, 1, ${-x} ${y} Z`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={- titleRadius} color={color} text={title} />
    <PointCollection points={points} distance={innerRadius} smallerDistance={titleRadius} minAngle={Math.PI / 4} color={color} />
  </Fragment>
}

const RadarRing135 = ({ points, radius, title, color }) => {
  const smallRadius = radius - 333
  const cutOff = (radius + smallRadius) / 2
  const innerRadius = (radius + cutOff) / 2
  const titleRadius = Math.max(20 + (cutOff + smallRadius) / 2, 120)

  const x = -radius * Math.cos(Math.PI / 8)
  const y = -radius * Math.sin(Math.PI / 8)

  return <Fragment>
    <path d={`M 0 0 L ${x} ${y} A ${radius} ${radius}, 0, 0, 1, ${-x} ${y} Z`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={- titleRadius} color={color} text={title} />
    <PointCollection points={points} distance={innerRadius} smallerDistance={titleRadius} minAngle={Math.PI / 8} color={color} />
  </Fragment>
}

const RadarRing120 = ({ points, radius, title, color }) => {
  const smallRadius = radius - 333
  const cutOff = (radius + smallRadius) / 2
  const innerRadius = (radius + cutOff) / 2
  const titleRadius = Math.max(20 + (cutOff + smallRadius) / 2, 120)

  const x = -radius * Math.cos(Math.PI / 6)
  const y = -radius * Math.sin(Math.PI / 6)

  return <Fragment>
    <path d={`M 0 0 L ${x} ${y} A ${radius} ${radius}, 0, 0, 1, ${-x} ${y} Z`} stroke={color} strokeWidth="2" fill="none"/>
    <Title y={- titleRadius} color={color} text={title} />
    <PointCollection points={points} distance={innerRadius} smallerDistance={titleRadius} minAngle={Math.PI / 6} color={color} />
  </Fragment>
}

const RadarCentralRing = ({ points, radius, title, color }) => {
  const titleRadius = radius - 222
  const innerRadius = radius - 333 / 4
  const count = points.length
  const angle = Math.PI / count

  return <Fragment>
    <path d={`M 0 0 L ${- radius} 0 A 1 1, 0, 1, 1, ${radius} 0 Z`} stroke={color} strokeWidth="2" fill="none"/>
    <Title text={title} color={color} y={- titleRadius} />

    {
      points.map((point, i) => {
        const pointAngle = angle * (i + 1) - angle / 2
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name}/>
      })
    }
  </Fragment>
}

const Radar = ({ radars }) => {
  return <div className="shapes">
    <style jsx global>{`
      .shapes {
        text-align: center; 
      }
      
      svg {
        max-width: max(50%, 800px);
      }
    `}
    </style>

    { radars.map(({ points, ...radar}) => {
      return <Section title={radar.name} key={radar.key}>
        <div className="columns">
          <div className="column">
            <h2>Semi-circle</h2>

            <svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg" dominantBaseline="middle" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
              <g transform="translate(1000 1000)">
                <RadarRing radius={1000} points={points.assess} title="Assess" color={colors.assess} />
                <RadarRing radius={666} points={points.trial} title="Trial" color={colors.trial} />
                <RadarCentralRing radius={333} points={points.adopt} title="Adopt" color={colors.adopt} />
              </g>
            </svg>
          </div>

          <div className="column">
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
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <h2>135° Circle</h2>

            <ScaleContext.Provider value={1 / 1.404}>
              <svg viewBox="0 0 1850 1002" xmlns="http://www.w3.org/2000/svg" dominantBaseline="middle" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
                <g transform="translate(925 1001)">
                  <RadarRing135 radius={1000} points={points.assess} title="Assess" color={colors.assess} />
                  <RadarRing135 radius={666} points={points.trial} title="Trial" color={colors.trial} />
                  <RadarRing135 radius={333} points={points.adopt} title="Adopt" color={colors.adopt} />
                </g>
              </svg>
            </ScaleContext.Provider>
          </div>

          <div className="column">
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
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <h2>Intersection with square</h2>

            <ScaleContext.Provider value={0.5}>
              <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" dominantBaseline="middle" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
                <g transform="translate(500 1000)">
                  <SquareRadarRing radius={1000} points={points.assess} title="Assess" color={colors.assess} />
                  <SquareRadarRing radius={666} points={points.trial} title="Trial" color={colors.trial} />
                  <SquareRadarRing radius={333} points={points.adopt} title="Adopt" color={colors.adopt} />
                </g>
              </svg>
            </ScaleContext.Provider>
          </div>

          <div className="column">
            <h2>Intersection with rectangle</h2>

            <ScaleContext.Provider value={1 / 1.5}>
              <svg viewBox="0 0 1334 1002" xmlns="http://www.w3.org/2000/svg" dominantBaseline="middle" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
                <g transform="translate(667 1001)">
                  <RectangleRadarRing radius={1000} points={points.assess} title="Assess" color={colors.assess} />
                  <RectangleRadarRing radius={666} points={points.trial} title="Trial" color={colors.trial} />
                  <RectangleRadarRing radius={333} points={points.adopt} title="Adopt" color={colors.adopt} />
                </g>
              </svg>
            </ScaleContext.Provider>
          </div>
        </div>
      </Section>
    })}
  </div>
}

export async function getStaticProps () {
  const data = await loadData()
  const filterAndSort = (points, level) => {
    const sortedPoints =  points.filter(point => point.level === level)
      .sort((a, b) => a.name.length - b.name.length)

    const left = sortedPoints.filter((_, idx) => idx % 2 === 0).reverse()
    const right = sortedPoints.filter((_, idx) => idx % 2 === 1)

    return left.concat(right)
  }

  const radars = data.radars.filter((radar, idx) => idx === 0 || !radar.draft)
    .map(radar => {
      const points = {
        adopt: filterAndSort(radar.points, 'adopt'),
        trial: filterAndSort(radar.points, 'trial'),
        assess: filterAndSort(radar.points, 'assess')
      }

      return { ...radar, points }

    })

  return { props: { radars } }
}

export default withTitle(Radar, props => props.name)
