import loadData from '../loadData'
import { Fragment, useState } from 'react'
import OutboundLink from '../components/OutboundLink'

const Modal = ({ point, onClose }) => {
  if (!point) {
    return null
  }
  return <div className="modal is-active">
    <div className="modal-background" onClick={onClose}></div>
    <div className="modal-content">
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">
            {point.name}
          </div>
        </div>
        <div className="card-content">
          <div className="content">
            {point.description && <div>Description: {point.description}</div>}
            {point.repo && <div>Repo: <OutboundLink href={`https://github.com/${point.repo}`} /></div>}
            {point.twitter && <div>Twitter: <OutboundLink href={point.twitter} /></div>}
            {point.homepage && <div>Homepage: <OutboundLink href={point.homepage} /></div>}
          </div>
        </div>
      </div>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
  </div>
}

const Point = ({ distance, angle, color, point, onClick }) => {
  const x = (-distance * Math.cos(angle) + 1000).toFixed(2)
  const y = (-distance * Math.sin(angle) + 1000).toFixed(2)

  return <Fragment>
    <circle cx={x} cy={y} r="20" fill={color} onClick={_ => onClick(point)}/>
    <text x={x} y={+y + 40} fill={color} fontSize="20" onClick={_ => onClick(point)}>
      {point.name}
    </text>
  </Fragment>
}

const RadarRing = ({ points, radius, title, color, onClickPoint }) => {
  const innerRadius = (2 * radius - 333) / 2
  const count = Math.ceil(points.length / 2) + 1
  const angle = Math.PI / 2 / count

  return <Fragment>
    <path d={`M ${1002 - radius} 1000 A 1 1, 0, 1, 1, ${998 + radius} 1000`} stroke={color} strokeWidth="2" fill="none"/>
    <text x="1000" y={1000 - innerRadius} fill={color} fontSize="35">
      {title}
    </text>

    {
      points.map((point, i) => {
        const pointAngle = angle * (i + (i >= (points.length / 2) ? 2 : 1))
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name} onClick={onClickPoint} />
      })
    }
  </Fragment>
}

const RadarCentralRing = ({ points, radius, title, color, onClickPoint }) => {
  const titleRadius = radius - 222
  const innerRadius = radius - 333 / 4
  const count = points.length
  const angle = Math.PI / (count + 1)

  return <Fragment>
    <path d={`M ${1002 - radius} 1000 A 1 1, 0, 1, 1, ${998 + radius} 1000`} stroke={color} strokeWidth="2" fill="none"/>
    <text x="1000" y={1000 - titleRadius} fill={color} fontSize="35">
      {title}
    </text>

    {
      points.map((point, i) => {
        const pointAngle = angle * (i + 1)
        return <Point point={point} distance={innerRadius} angle={pointAngle} color={color} key={point.name} onClick={onClickPoint}/>
      })
    }
  </Fragment>
}

const Radar = ({ name, points }) => {
  const length = Math.max(points.adopt.length, points.trial.length, points.assess.length)
  // TODO: improve this
  const [selectedPoint, onSelectedPoint] = useState(false)

  const closeModal = _ => onSelectedPoint(null)
  const fontFamily = "BlinkMacSystemFont, -apple-system, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif"

  return <div className="columns">
    <div className="column is-three-quarters">
      <Modal point={selectedPoint} onClose={closeModal}/>
      <h1 className="title">{name}</h1>

      <svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg" dominantBaseline="middle" textAnchor="middle" fontWeight="bolder" fontFamily={fontFamily}>
        <RadarRing radius={1000} points={points.assess} title="Assess" color="#6CBFAF" onClickPoint={onSelectedPoint}/>
        <RadarRing radius={666} points={points.trial} title="Trial" color="#235C6F" onClickPoint={onSelectedPoint}/>
        <RadarCentralRing radius={333} points={points.adopt} title="Adopt" color="#041087" onClickPoint={onSelectedPoint}/>
      </svg>
    </div>

    <div className="column is-three-quarters">
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
  </div>
}

export async function getStaticProps ({ params }) {
  const { radars } = await loadData()
  const props = radars.find(radar => radar.id === params.slug)
  return { props } 
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  return {
    paths: radars.map(radar => ({ params: { slug: radar.id } })),
    fallback: false
  };
}

export default Radar
