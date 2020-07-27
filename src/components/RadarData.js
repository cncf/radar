import groupPoints from '../helpers/groupPoints'
import { colors } from '../styles.config'

export default ({ points }) => {
  const groupedPoints = groupPoints(points)

  return <div className="wrapper">
    <style jsx>{`
      .wrapper {
        overflow-x: auto;
      }
      
      table {
        border: 1px solid ${colors.darkPurple};
      }

      td, th {
        vertical-align: middle;
        border: 1px solid ${colors.darkPurple};
        padding: 5px 10px;
      }
      
      th.vote {
        text-align: center;
      }
      
      td.vote {
        text-align: center;
        color: white;
        text-transform: capitalize;
      }
      
      td.name {
        white-space: nowrap;
      }
      
      tr:nth-child(odd) td.name {
        background: white;
      }
      
      tr:nth-child(even) td.name {
        background: #f0f5f7;
      }
    `}
    </style>
    <table className="data">
      <thead>
        <th className="vote">Level</th>
        <th>Name</th>
        <th colspan={1000} className="vote">Votes</th>
      </thead>

      <tbody>
        {
          ['adopt', 'trial', 'assess'].map(level => {
            return groupedPoints[level].map((point, i) => {
              return <tr key={`point-${level}-${point.key}`}>
                { i === 0 && <td rowSpan={groupedPoints[level].length} style={{background: colors[level]}} className="vote">
                  {level}
                </td> }
                <td className="name">{point.name}</td>

                {
                  ['adopt', 'trial', 'assess', 'hold'].map(voteKey => {
                    const votes = point.votes[voteKey]

                    return [...Array(votes || 0).keys()].map(i => {
                      const key = `vote-${level}-${point.key}-${voteKey}-${i}`
                      return <td key={key} style={{background: colors[voteKey]}} className="vote">
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
