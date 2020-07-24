import LevelTag from './LevelTag'
import groupPoints from '../helpers/groupPoints'

export default ({ points }) => {
  const groupedPoints = groupPoints(points)
  const length = Math.max(groupedPoints.adopt.length, groupedPoints.trial.length, groupedPoints.assess.length)

  return <table className="table">
    <style jsx>{`
      table {
        background: transparent;
      }

      th, td {
        text-align: center !important;
        border: none !important;
      }
    `}</style>

    <thead>
      <tr>
        <th><LevelTag level="adopt"/></th>
        <th><LevelTag level="trial"/></th>
        <th><LevelTag level="assess"/></th>
      </tr>
    </thead>

    <tbody>
      {
        [...Array(length).keys()].map(i => {
          return <tr key={`tr-${i}`}>
            {
              ['adopt', 'trial', 'assess'].map(level => {
                const point = groupedPoints[level][i]
                return <td key={`td-${level}-${i}`}>{point && point.name}</td>
              })
            }
          </tr>
        })
      }
    </tbody>
  </table>
}
