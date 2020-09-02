import css from 'styled-jsx/css'
import loadData from '../loadData'
import withTitle from '../components/withTitle'
import MarkdownComponent from '../components/MarkdownComponent'
import Section from '../components/Section'
import RadarTeam from '../components/RadarTeam'
import Radar from '../components/Radar'
import RadarData from '../components/RadarData'
import CompanySizeChart from '../components/CompanySizeChart'
import VideoComponent from '../components/VideoComponent'
import Companies from '../components/Companies'
import IndustriesTable from '../components/IndustriesTable'
import GlobalTextComponent from '../components/GlobalTextComponent'
import OutboundLink from '../components/OutboundLink'
import ThumbnailsList from '../components/ThumbnailsList'

const RadarSection = ({ name, points, radarKey }) => {
  return <Section title={name}>
    <style jsx>{`
      .radar-wrapper {  
        max-width: 800px;
        margin: 0 auto;
      }
      
      .download {
        margin-top: 10px;
        text-align: center;
        font-size: 0.95rem;
      }
    `}</style>

    <div className="radar-wrapper">
      <Radar points={points} />
      <div className="download">
        Download as <OutboundLink href={`/${radarKey}.svg`} title="svg" /> or <OutboundLink href={`/${radarKey}.png`} title="png" />
      </div>
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

const CompaniesSection = ({ companies }) => {
  const { className, styles } = css.resolve`
    div {
      text-align: center;
      color: #666;
      font-size: 1rem;
      font-style: italic;
    }  
  `

  return  <Section title="Participating CNCF End User Community Members">
    <style jsx>{`
      .columns {
        margin-top: 0;
      }
      
      .column {
        margin-top: 1.25rem;
      }
    `}</style>
    {styles}
    <Companies companies={companies} />
    <GlobalTextComponent name="hidden_companies" className={className} />

    {companies && <div className="columns is-desktop">
      <div className="column is-half-desktop">
        <CompanySizeChart companies={companies} />
      </div>

      <div className="column is-half-desktop">
        <IndustriesTable companies={companies} />
      </div>
    </div>}
  </Section>
}

const DataSection = ({ points }) => {
  return <Section title="CNCF End User Community Member Recommendations">
    <RadarData points={points}/>
  </Section>
}

const renderSection = ({ title, content }) => {
  return <Section title={title} key={title}>
    <MarkdownComponent value={content} />
  </Section>
}

const OtherRadarsSection = ({ radars }) => {
  return <Section title="Other Radars">
    <ThumbnailsList radars={radars} />
  </Section>
}

const RadarPage = ({ radar, otherRadars = [] }) => {
  const { name, points, team, video, companies, key, sections = [] } = radar
  const defaultSections = [
    <RadarSection name={name} points={points} radarKey={key} key="radar" />,
    video && <WebinarSection video={video} key="video" />,
    <TeamSection team={team} key="team" />,
    <CompaniesSection companies={companies} key="companies" />,
    <DataSection points={points} companies={companies} key="data" />
  ].filter(_ => _).map((section, i) => [i + 1, section])

  const positionedSections = sections.filter(section => section.position)
    .sort((a, b) => a.position - b.position)
    .map(section => [section.position, renderSection(section)])

  const additionalSections = sections.filter(section => !section.position)
    .map(section => renderSection(section))

  const sortedSections = [...positionedSections, ...defaultSections]
    .sort((a, b) => a[0] - b[0])
    .map(([_, section]) => section)

  return <>
    {sortedSections}
    {additionalSections}
    {otherRadars.length > 0 && <OtherRadarsSection radars={otherRadars} />}
  </>
}

export async function getStaticProps ({ params }) {
  const { radars } = await loadData()
  const radar = radars.find(({ key, draft }) => params ? key === params.radar : !draft)
  const otherRadars = radars.filter(r => !r.draft && r.key !== radar.key)
    .map(({ key, name }) => ({ key, name }))
  return { props: { radar, otherRadars } }
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  return {
    paths: radars.map(({ key }) => ({ params: { radar: key } })),
    fallback: false
  };
}

export default withTitle(RadarPage, props => props.radar.name)
