import { Fragment } from 'react'
import loadData from '../loadData'
import withTitle from '../components/withTitle'
import MarkdownComponent from '../components/MarkdownComponent'
import Section from '../components/Section'
import RadarTeam from '../components/RadarTeam'
import Radar from '../components/Radar'
import RadarData from '../components/RadarData'

const RadarPage = ({ name, themes, points, team, video }) => {
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
      <RadarData points={points}/>
    </Section>
  </Fragment>
}

export async function getStaticProps ({ params }) {
  const { radars } = await loadData()
  const radar = radars.find(({ key }) => key === params.radar)
  return { props: radar }
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  return {
    paths: radars.map(({ key }) => ({ params: { radar: key } })),
    fallback: false
  };
}

export default withTitle(RadarPage, props => props.name)
