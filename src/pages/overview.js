import { useContext } from 'react'
import loadData from '../loadData'
import LinkToPoint from '../components/LinkToPoint'
import LinkToRadar from '../components/LinkToRadar'
import LevelTag from '../components/LevelTag'
import SearchContext from '../contexts/SearchContext'
import withTitle from '../components/withTitle'

const Overview = ({ groupedPoints }) => {
  const { searchQuery } = useContext(SearchContext)
  const filteredPoints = groupedPoints.filter(points => {
    const firstPoint = points[0]
    const text = [firstPoint.name, firstPoint.description].join(' ').toLowerCase()
    return !searchQuery || text.indexOf(searchQuery.toLowerCase()) > -1
  })

  return <section className="section">
    <div className="container">
      <h1 className="title">Overview</h1>

      <table className="table is-fullwidth">
        <tbody>
        { filteredPoints.map(points => {
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
  const { points } = await loadData()

  const groupedPoints = points.sort((a, b) => a.key.localeCompare(b.key))
    .reduce((acc, point) => {
      const points = acc[point.key] || []
      return { ...acc, [point.key]: [...points, point] }
    }, {})


  return { props: { groupedPoints: Object.values(groupedPoints) } }
}

export default withTitle(Overview, _ => 'Overview')
