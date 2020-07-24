import { Fragment } from 'react'
import loadData from '../loadData'
import withTitle from '../components/withTitle'
import LevelTag from '../components/LevelTag'
import MarkdownComponent from '../components/MarkdownComponent'
import Section from '../components/Section'
import RadarTeam from '../components/RadarTeam'
import Radar from '../components/radar'

const RadarPage = ({ name, themes, points, team, video }) => {
  const length = Math.max(points.adopt.length, points.trial.length, points.assess.length)

  return <Fragment>
    <style jsx>{`
      .video-container {
        overflow: hidden;
        position: relative;
        width:100%;
        max-width: 800px;
        margin: auto;
      }
      
      .video-container::after {
        padding-top: 56.25%;
        display: block;
        content: '';
      }
      
      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      table {
        background: transparent;
      }

      th, td {
        text-align: center !important;
        border: none !important;
      }
      
      .radar-wrapper {  
        max-width: 800px;
        margin: 0 auto;
      }
    `}</style>

    <Section title={name}>
      <div className="radar-wrapper">
        <Radar points={points} />
      </div>
    </Section>

    <Section title="Themes">
      <div className="content">
        <MarkdownComponent value={themes}/>
      </div>
    </Section>

    { video && <Section title="Webinar">
      <div className="content video-container">
        <iframe src={video} frameBorder="0" allowFullScreen
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
      </div>
    </Section>}

    <Section title="Team">
      <RadarTeam team={team}/>
    </Section>

    <Section title="Data">
      <table className="table">
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
                  const point = points[level][i]
                  return <td key={`td-${level}-${i}`}>{point && point.name}</td>
                })
              }
            </tr>
          })
        }
        </tbody>
      </table>
    </Section>
  </Fragment>
}

export async function getStaticProps ({ params }) {
  const { radars } = await loadData()
  const radar = radars.find(({ key }) => key === params.radar)
  const points = {
    adopt: radar.points.filter(point => point.level === 'adopt'),
    trial: radar.points.filter(point => point.level === 'trial'),
    assess: radar.points.filter(point => point.level === 'assess')
  }
  return { props: { ...radar, points } }
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  return {
    paths: radars.map(({ key }) => ({ params: { radar: key } })),
    fallback: false
  };
}

export default withTitle(RadarPage, props => props.name)
