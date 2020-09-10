import groupPoints from '../helpers/groupPoints'
import LinkToPoint from './LinkToPoint'
import { Fragment } from "react";

export default function RadarData({ points }) {
  const groupedPoints = groupPoints(points)

  const votes = points.map(point => Object.values(point.votes).reduce((sum, vote) => sum + vote))
  const maxVotes = Math.max(...votes)

  return <>
    <style jsx>{`
      .data {
        display: grid;
        grid-template-columns: max-content max-content 1fr;
        grid-gap: 0;
        font-size: 0.95rem;
        border-top: 1px solid #dbdbdb;
        border-left: 1px solid #dbdbdb;
      }
      
      .header, .item {
        border-bottom: 1px solid #dbdbdb;
        border-right: 1px solid #dbdbdb;
        padding: 4px;
      }
      
      .item-level {
        padding: 0 4px;
        text-transform: capitalize;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      
      .header {
        font-weight: bold;
      }
      
      .vote {
        display: inline-block;
        height: 100%;
        text-align: center;
      }
    `}
    </style>
    <div className="data">
      <div className="header item-level">Level</div>
      <div className="header">Name</div>
      <div className="header item-level">Votes</div>

      {
        ['adopt', 'trial', 'assess'].map(level => {
          return groupedPoints[level].map((point, i) => {
            return <Fragment key={`point-${level}-${point.key}`}>
              { i === 0 && <div style={{gridRowEnd: `span ${groupedPoints[level].length}`}} className={`item`}>
                <div className={`item-level ${level}-background`}>
                  {level}
                </div>
              </div> }
              <div className="item"><LinkToPoint point={point} /></div>
              <div className="item">
                {
                  ['adopt', 'trial', 'assess', 'hold'].map(voteKey => {
                    const votes = point.votes[voteKey]

                    if (!votes) {
                      return null
                    }

                    const key = `vote-${level}-${point.key}-${voteKey}`
                    const width = `${100 * votes / maxVotes}%`
                    return <div key={key} className={`vote ${voteKey}-background`} style={{width}} />
                  })
                }
              </div>
            </Fragment>
          })
        })
      }
    </div>
  </>
}
