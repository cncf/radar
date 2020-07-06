import loadData from '../loadData'
import { Fragment } from 'react';

const Point = ({ distance, angle, color, point }) => {
  const x = (-distance * Math.cos(angle) + 1000).toFixed(2)
  const y = (-distance * Math.sin(angle) + 1000).toFixed(2)

  return <Fragment>
    <circle cx={x} cy={y} r="20" fill={color} />
    <text x={x} y={+y + 40} dominantBaseline="middle" textAnchor="middle" fill={color} fontSize="20" fontWeight="bolder">
      {point.name}
    </text>
  </Fragment>
}

const RadarRing = ({ points, radius, title, color }) => {
  const innerRadius = (2 * radius - 333) / 2
  const count = Math.ceil(points.length / 2) + 1
  const angle = Math.PI / 2 / count

  return <Fragment>
    <path d={`M ${1002 - radius} 1000 A 1 1, 0, 1, 1, ${998 + radius} 1000`} stroke={color} strokeWidth="2" fill="none"/>
    <text x="1000" y={1000 - innerRadius} dominantBaseline="middle" textAnchor="middle" fill={color} fontSize="35" fontWeight="bolder">
      {title}
    </text>

    {
      points.map((point, i) => {
        const pointAngle = angle * (i + (i >= (points.length / 2) ? 2 : 1))
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name} />
      })
    }
  </Fragment>
}

const RadarCentralRing = ({ points, radius, title, color }) => {
  const titleRadius = radius - 222
  const innerRadius = radius - 333 / 4
  const count = points.length
  const angle = Math.PI / (count + 1)

  return <Fragment>
    <path d={`M ${1002 - radius} 1000 A 1 1, 0, 1, 1, ${998 + radius} 1000`} stroke={color} strokeWidth="2" fill="none"/>
    <text x="1000" y={1000 - titleRadius} dominantBaseline="middle" textAnchor="middle" fill={color} fontSize="35" fontWeight="bolder">
      {title}
    </text>

    {
      points.map((point, i) => {
        const pointAngle = angle * (i + 1)
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name}/>
      })
    }
  </Fragment>
}

const Radar = ({ name, points }) => {
  const length = Math.max(points.adopt.length, points.trial.length, points.assess.length)

  return <div>
    <h1 className="title">{name}</h1>

    <svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
      <RadarRing radius={1000} points={points.assess} title="Assess" color="#6CBFAF"/>
      <RadarRing radius={666} points={points.trial} title="Trial" color="#235C6F"/>
      <RadarCentralRing radius={333} points={points.adopt} title="Adopt" color="#041087" />
    </svg>

    <table className="table">
      <thead>
        <tr>
          <th><span className="tag adopt-bg">Adopt</span></th>
          <th><span className="tag trial-bg">Trial</span></th>
          <th><span className="tag assess-bg">Assess</span></th>
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
}

export async function getStaticProps ({ params }) {
  const { radars } = loadData()
  const props = radars.find(radar => radar.id === params.slug)
  return { props } 
}

export async function getStaticPaths() {
  const { radars } = loadData()

  return {
    paths: radars.map(radar => ({ params: { slug: radar.id } })),
    fallback: false
  };
}

export default Radar
