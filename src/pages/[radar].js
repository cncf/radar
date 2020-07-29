import { Fragment } from 'react'
import loadData from '../loadData'
import withTitle from '../components/withTitle'
import MarkdownComponent from '../components/MarkdownComponent'
import Section from '../components/Section'
import RadarTeam from '../components/RadarTeam'
import Radar from '../components/Radar'
import RadarData from '../components/RadarData'
import VideoComponent from '../components/VideoComponent'

const RadarSection = ({ name, points}) => {
  return <Section title={name}>
    <style jsx>{`
      .radar-wrapper {  
        max-width: 800px;
        margin: 0 auto;
      }
    `}</style>

    <div className="radar-wrapper">
      <Radar points={points} />
    </div>
  </Section>
}

const WebinarSection = ({ video }) => {
  return <Section title="Webinar">
    <VideoComponent src={video} />
  </Section>
}

const TeamSection = ({ team }) => {
  return <Section title="Team">
    <RadarTeam team={team}/>
  </Section>
}

const DataSection = ({ points }) => {
  return <Section title="Data">
    <RadarData points={points}/>
  </Section>
}
const renderSection = ({ title, content }) => {
  return <Section title={title} key={title}>
    <MarkdownComponent value={content} />
  </Section>
}

const RadarPage = ({ name, points, team, video, sections = [] }) => {
  const defaultSections = [
    <RadarSection name={name} points={points} key="radar" />,
    video && <WebinarSection video={video} key="video" />,
    <TeamSection team={team} key="team" />,
    <DataSection points={points} key="data" />
  ].filter(_ => _).map((section, i) => [i + 1, section])

  const positionedSections = sections.filter(section => section.position)
    .sort((a, b) => a.position - b.position)
    .map(section => [section.position, renderSection(section)])

  const additionalSections = sections.filter(section => !section.position)
    .map(section => renderSection(section))

  const sortedSections = [...positionedSections, ...defaultSections]
    .sort((a, b) => a[0] - b[0])
    .map(([_, section]) => section)

  return <Fragment>
    {sortedSections}
    {additionalSections}
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
