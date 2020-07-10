import Link from 'next/link'
import loadData from '../loadData'
import LinkToPoint from '../components/LinkToPoint'
import LinkToRadar from '../components/LinkToRadar'
import LevelTag from "../components/LevelTag";

export default ({ groupedPoints }) => {
  return <section className="section">
    <div className="container">
      <h1 className="title">Overview</h1>

      <table className="table is-fullwidth">
        <tbody>
        { groupedPoints.map(points => {
          const firstPoint = points[0]

          return <tr key={firstPoint.key}>
            <td><LinkToPoint point={firstPoint} /></td>

            <td className="has-text-right">
              <LinkToRadar radar={firstPoint.radar} />
              <LevelTag level={firstPoint.level} style={{marginLeft: 10}} />

              { points.length > 1 && <span className="tag is-warning" style={{marginLeft: 10}}>+{points.length - 1} More</span>}
            </td>
          </tr>
        })}
        </tbody>
      </table>
    </div>
  </section>
}

export const getStaticProps = async _ => {
  const { radars, points } = await loadData()

  const radarsMap = radars.reduce((acc, radar) => ({ ...acc, [radar.key]: radar }), {})

  const groupedPoints = points.sort((a, b) => a.key.localeCompare(b.key))
    .reduce((acc, point) => {
      const points = acc[point.key] || []
      return { ...acc, [point.key]: [...points, { ...point, radar: radarsMap[point.radarKey] }] }
    }, {})


  return { props: { groupedPoints: Object.values(groupedPoints) } }
}
