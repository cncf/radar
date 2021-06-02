import { useContext } from 'react'
import loadData from '../loadData'
import LinkToPoint from '../components/LinkToPoint'
import LinkToRadar from '../components/LinkToRadar'
import LevelTag from '../components/LevelTag'
import SearchContext from '../contexts/SearchContext'
import withTitle from '../components/withTitle'
import Section from '../components/Section'
import ThumbnailsList from '../components/ThumbnailsList'

const Overview = ({ groupedPoints, radars }) => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext)
  const filteredPoints = groupedPoints.filter(points => {
    const firstPoint = points[0]
    const text = [firstPoint.name, firstPoint.description].join(' ').toLowerCase()
    return !searchQuery || text.indexOf(searchQuery.toLowerCase()) > -1
  })

  return <>
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
      
      .table td {
        border-bottom: 2px solid #f0f5f7;
      }
      
      .table tr:last-child td {
        border: none;
      }
      
      .radar:not(:first-child) {
        margin-top: 10px;
      }
    `}</style>

    <Section title="All Radars" background="blue">
      <ThumbnailsList radars={radars} />
    </Section>

    <Section title="Technologies Overview" background="white">
      { searchQuery && <div className="notification is-info is-light">
        Filtering by <strong>{searchQuery}</strong>. <a onClick={_ => setSearchQuery('')}>Clear</a> search.
      </div>}

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
  </>
}

export const getStaticProps = async _ => {
  const data = await loadData(radar => !radar.draft)

  const groupedPoints = data.points.sort((a, b) => a.key.localeCompare(b.key))
    .reduce((acc, point) => {
      const points = acc[point.key] || []
      return { ...acc, [point.key]: [...points, point] }
    }, {})

  const radars = data.radars.map(radar => {
    const subradars = radar.subradars.map(({ name, key }) => ({ name: name || null, key }))
    return { key: radar.key, name: radar.name, subradars }
  })

  return { props: { groupedPoints: Object.values(groupedPoints), radars } }
}

export default withTitle(Overview, _ => 'Technologies Overview')
