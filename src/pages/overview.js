import { useContext } from 'react'
import loadData from '../loadData'
import LinkToPoint from '../components/LinkToPoint'
import LinkToRadar from '../components/LinkToRadar'
import LevelTag from '../components/LevelTag'
import SearchContext from '../contexts/SearchContext'
import withTitle from '../components/withTitle'
import Section from '../components/Section'

const Overview = ({ groupedPoints }) => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const filteredPoints = groupedPoints.filter(points => {
    const firstPoint = points[0]
    const text = [firstPoint.name, firstPoint.description].join(' ').toLowerCase()
    return !searchQuery || text.indexOf(searchQuery.toLowerCase()) > -1
  })

  return <Section>
    <style jsx>{`
      .no-results {
        margin-top: 30px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
      }
      
      td {
        padding-left: 0.25rem;
        padding-right: 0.25rem;
      }
      
      .radar:not(:first-child) {
        margin-top: 10px;
      }
    `}
    </style>

    { searchQuery && <div className="notification is-info is-light">
      Filtering by <strong>{searchQuery}</strong>. <a onClick={_ => setSearchQuery('')}>Clear</a> search.
    </div>}

    <h2>Overview</h2>

    { searchQuery && filteredPoints.length === 0 && <div className="notification is-light no-results">
      No results found
    </div>}

    <table className="table is-fullwidth">
      <tbody>
      { filteredPoints.map(points => {
        const firstPoint = points[0]

        return <tr key={firstPoint.key}>
          <td><LinkToPoint point={firstPoint} /></td>

          <td className="has-text-right">
            {
              points.map(({ level, radar }) => {
                return <div key={radar.key} className="radar">
                  <LinkToRadar radar={radar} />
                  <LevelTag level={level} style={{marginLeft: 10}} />
                </div>
              })
            }
          </td>
        </tr>
      })}
      </tbody>
    </table>
  </Section>
}

export const getStaticProps = async _ => {
  const { points } = await loadData(radar => !radar.draft)

  const groupedPoints = points.sort((a, b) => a.key.localeCompare(b.key))
    .reduce((acc, point) => {
      const points = acc[point.key] || []
      return { ...acc, [point.key]: [...points, point] }
    }, {})


  return { props: { groupedPoints: Object.values(groupedPoints) } }
}

export default withTitle(Overview, _ => 'Overview')
