import { useState, useEffect, createRef } from 'react'
import Link from 'next/link'
import loadData from '../loadData'
import withTitle from '../components/withTitle'
import Section from '../components/Section'
import RadarTeam from '../components/RadarTeam'
import Radar from '../components/Radar'
import RadarData from '../components/RadarData'
import CompanySizeChart from '../components/CompanySizeChart'
import VideoComponent from '../components/VideoComponent'
import Companies from '../components/Companies'
import IndustriesTable from '../components/IndustriesTable'
import OutboundLink from '../components/OutboundLink'
import ThumbnailsList from '../components/ThumbnailsList'

const Columns = ({ children, className }) => {
  return <div className={`columns is-desktop is-4 ${className}`}>
    <style jsx>{`
      .columns {
        margin-top: 0;
      }
    `}</style>

    {children}
  </div>
}

const Column = ({ children, title }) => {
  return <div className="column is-half-desktop">
    <style jsx>{`
      h2 {
        margin-bottom: 1rem;
        text-align: center;
      }

      .column {
        margin-top: 1.25rem;
      }
    `}</style>

    {title && <h2>{title}</h2>}

    {children}
  </div>
}

const Banner = _ => {
  return <div>
    <style jsx>{`
      div {
        background-color: #EEE;
      }
      
      .inner {
        margin: 0 auto;
        max-width: 1050px;
        text-align: center;
        padding: 10px 15px;
      }
    `}</style>

    <div className="inner">
      The CNCF End User Technology Radar is a guide for evaluating  cloud native technologies, on behalf of the CNCF
      End User Community. <Link href="/how-it-works"><a>Read more</a></Link>
    </div>
  </div>
}

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
      
      h4 {
        color: #202020;
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

const Theme = ({ theme, idx }) => {
  const [collapsed, setCollapsed] = useState(true)
  const toggleCollapsed = _ => setCollapsed(!collapsed)
  const parentRef = createRef()

  const tag = '</p>'
  const content = collapsed ? theme.content.slice(0, theme.content.indexOf(tag) + tag.length) : theme.content
  const multipleParagraphs = theme.content.match(new RegExp(tag, 'g')).length > 1
  const toggle = multipleParagraphs ? `<a class="toggle">Show ${collapsed ? 'More' : 'Less'}</a>` : ''
  const contentWithToggle = content.replace(new RegExp(`${tag}$`), `&nbsp;${toggle}${tag}`)

  useEffect(() => {
    const toggle = parentRef.current.querySelector('.toggle')
    toggle.addEventListener('click', toggleCollapsed)
    return () => toggle.removeEventListener('click', toggleCollapsed())
  }, [collapsed])

  return <div className="theme" key={idx}>
    <style jsx>{`
      .theme {
        margin: 0 10px 30px;
      }
      
      .theme .content {
        margin-top: 10px;
      }
      
      .theme h4 {
        text-align: center;
        color: #202020;
      }
    `}
    </style>

    <h4>{idx + 1}. {theme.headline}</h4>

    <div className="content" dangerouslySetInnerHTML={{ __html: contentWithToggle }} ref={parentRef} />
  </div>
}

const ThemesSection = ({ themes }) => {
  return <Section title="The Themes">
    {themes.map((theme, idx) => <Theme theme={theme} idx={idx} key={idx} />)}
  </Section>
}

const WebinarAndTeamSection = ({ video, team }) => {
  return <Section title="The Radar Team">
    <style jsx>{`
      .team-section {
        margin-top: 40px;
        margin-bottom: -40px;
      }
    `}</style>

    {video && <VideoComponent src={video} />}
    <div className="team-section">
      <RadarTeam team={team}/>
    </div>
  </Section>
}

const CompaniesSection = ({ companies }) => {
  return  <Section title="The End User companies">
    <style jsx>{`
      div {
        text-align: center;
        color: #666;
        font-size: 1rem;
        font-style: italic;
      }  
    `}
    </style>
    <Companies companies={companies} />
    <div>Not all companies are shown</div>
  </Section>
}

const DataSection = ({ points, companies }) => {
  return <Section title="The data">
    <p>
      The CNCF End User Community was asked to describe what their companies recommend for different solutions:
      Adopt, Trial, Assess or Hold. This table shows how the End User companies rated each technology.
    </p>
    <RadarData points={points}/>

    {companies && <Columns>
      <Column title="The industries">
        <IndustriesTable companies={companies} />
      </Column>

      <Column title="Total number of employees">
        <CompanySizeChart companies={companies} />
      </Column>
    </Columns>}
  </Section>
}

const renderSection = ({ title, content }) => {
  return <Section title={title} key={title}>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </Section>
}

const OtherRadarsSection = ({ radars }) => {
  return <Section title="Other Radars">
    <ThumbnailsList radars={radars} />
  </Section>
}

const RadarPage = ({ radar, otherRadars = [] }) => {
  const { name, points, team, video, companies, key, sections = [], themes } = radar
  const defaultSections = [
    <RadarSection name={name} points={points} radarKey={key} key="radar" />,
    <ThemesSection themes={themes} key="themes" />,
    <CompaniesSection companies={companies} key="companies" />,
    <WebinarAndTeamSection video={video} team={team} key="webinar-and-team" />,
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
    <Banner />
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
  return { props: { radar, otherRadars, home: !params } }
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  return {
    paths: radars.map(({ key }) => ({ params: { radar: key } })),
    fallback: false
  };
}

export default withTitle(RadarPage, props => props.home ? 'Home' : props.radar.name)
