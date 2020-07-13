import { Fragment } from 'react'
import loadData from '../loadData'
import { useRouter } from 'next/router'
import withTitle from '../components/withTitle'
import LevelTag from '../components/LevelTag'

const Point = ({ distance, angle, color, point }) => {
  const x = (-distance * Math.cos(angle) + 1000).toFixed(2)
  const y = (-distance * Math.sin(angle) + 1000).toFixed(2)
  const router = useRouter()
  const onClick = _ => router.push('/[...point]', `/${point.fullKey}`)

  return <Fragment>
    <style jsx>{`
      circle, text {
        cursor: pointer;
      }
    `}
    </style>
    <circle cx={x} cy={y} r="20" fill={color} onClick={onClick} />
    <text x={x} y={+y + 40} fill={color} fontSize="20" onClick={onClick}>{point.name}</text>
  </Fragment>
}

const RadarRing = ({ points, radius, title, color }) => {
  const innerRadius = (2 * radius - 333) / 2
  const angle = Math.PI / (2 * Math.ceil(points.length / 2) + 1)

  return <Fragment>
    <path d={`M ${1002 - radius} 1000 A 1 1, 0, 1, 1, ${998 + radius} 1000`} stroke={color} strokeWidth="2" fill="none"/>
    <text x="1000" y={1000 - innerRadius} fill={color} fontSize="35">{title}</text>

    {
      points.map((point, i) => {
        const pointAngle = angle * (i + (i >= (points.length / 2) ? 2 : 1)) - angle / 2
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name} />
      })
    }
  </Fragment>
}

const RadarCentralRing = ({ points, radius, title, color }) => {
  const titleRadius = radius - 222
  const innerRadius = radius - 333 / 4
  const count = points.length
  const angle = Math.PI / count

  return <Fragment>
    <path d={`M ${1002 - radius} 1000 A 1 1, 0, 1, 1, ${998 + radius} 1000`} stroke={color} strokeWidth="2" fill="none"/>
    <text x="1000" y={1000 - titleRadius} fill={color} fontSize="35">
      {title}
    </text>

    {
      points.map((point, i) => {
        const pointAngle = angle * (i + 1) - angle / 2
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name}/>
      })
    }
  </Fragment>
}

const Radar = ({ name, points }) => {
  const length = Math.max(points.adopt.length, points.trial.length, points.assess.length)
  const fontFamily = "BlinkMacSystemFont, -apple-system, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif"

  return <section className="section">
    <div className="container is-fluid">
      <div className="columns">
        <div className="column is-three-quarters">
          <h1 className="title">{name}</h1>

          <svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg" dominantBaseline="middle" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
            <RadarRing radius={1000} points={points.assess} title="Assess" color="#6CBFAF" />
            <RadarRing radius={666} points={points.trial} title="Trial" color="#235C6F" />
            <RadarCentralRing radius={333} points={points.adopt} title="Adopt" color="#041087" />
          </svg>
        </div>

        <div className="column is-three-quarters">
          <style jsx>{`
            th, td {
              text-align: center !important;
              border: none !important;
            }
          `}</style>
          <table className="table">
            <thead>
            <tr>
              <th><LevelTag level="adopt" /></th>
              <th><LevelTag level="trial" /></th>
              <th><LevelTag level="assess" /></th>
            </tr>
            </thead>

            <tbody>
            {
              [...Array(length).keys()].map(i => {
                return <tr key={`tr-${i}`}>
                  {
                    ['adopt', 'trial', 'assess'].map(level => {
                      const point = points[level][i]
                      return <td key={`td-${level}-${i}`}>{point && point.name}</td>
                    })
                  }
                </tr>
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
}

export async function getStaticProps ({ params }) {
  const { radars } = await loadData()
  const radar = radars.find(({ key }) => key === params.radar)
  const points = {
    adopt: radar.points.filter(point => point.level === 'adopt'),
    trial: radar.points.filter(point => point.level === 'trial'),
    assess: radar.points.filter(point => point.level === 'assess')
  }
  return { props: { ...radar, points } }
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  return {
    paths: radars.map(({ key }) => ({ params: { radar: key } })),
    fallback: false
  };
}

export default withTitle(Radar, props => props.name)
