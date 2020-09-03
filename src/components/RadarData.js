import groupPoints from '../helpers/groupPoints'
import { colors } from '../styles.config'
import LinkToPoint from './LinkToPoint'

export default function RadarData({ points }) {
  const groupedPoints = groupPoints(points)

  return <div className="wrapper">
    <style jsx>{`
      .wrapper {
        overflow-x: auto;
      }
      
      table {
        border: 1px solid ${colors.blueTitle};
        font-size: 0.95rem;
      }

      td, th {
        vertical-align: middle;
        border: 1px solid ${colors.blueTitle};
        padding: 5px 10px;
      }
      
      th.vote {
        text-align: center;
      }
      
      td.vote {
        text-align: center;
        color: black;
        text-transform: capitalize;
      }
      
      td.name {
        white-space: nowrap;
      }
      
      tr td.name {
        background: white;
      }
    `}
    </style>
    <table className="data">
      <thead>
        <tr>
          <th className="vote">Level</th>
          <th>Name</th>
          <th colSpan={1000} className="vote">Votes</th>
        </tr>
      </thead>

      <tbody>
        {
          ['adopt', 'trial', 'assess'].map(level => {
            return groupedPoints[level].map((point, i) => {
              return <tr key={`point-${level}-${point.key}`}>
                { i === 0 && <td rowSpan={groupedPoints[level].length} className={`has-text-weight-semibold vote ${level}-background`}>
                  {level}
                </td> }
                <td className="name"><LinkToPoint point={point} /></td>
                {
                  ['adopt', 'trial', 'assess', 'hold'].map(voteKey => {
                    const votes = point.votes[voteKey]

                    return [...Array(votes || 0).keys()].map(i => {
                      const key = `vote-${level}-${point.key}-${voteKey}-${i}`
                      return <td key={key} className={`vote ${voteKey}-background`}>
                        {voteKey}
                      </td>
                    })
                  })
                }
              </tr>
            })
          })
        }
      </tbody>
    </table>
  </div>
}
