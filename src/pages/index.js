import loadData from '../loadData'
import Section from '../components/Section'
import loadYaml from '../helpers/loadYaml'
import MarkdownComponent from '../components/MarkdownComponent'
import ThumbnailsList from '../components/ThumbnailsList'

export default function Home({ radars, sections, embedThumbnails }) {
  return <>
    <style jsx global>{`
      .homepage-section dl {
        display: grid;
        grid-gap: 20px 15px;
        grid-template-columns: auto auto;
      }
    `}</style>

    <Section title="Published Radars">
      <ThumbnailsList radars={radars} embedThumbnails={embedThumbnails} />
    </Section>

    { sections.map(({ title, content }) => {
      return <Section title={title} key={title}>
        <MarkdownComponent value={content} className="homepage-section" />
      </Section>
    })}
  </>
}

export async function getStaticProps() {
  const isDevelopment = !!process.env.DEVELOPMENT
  const { radars } = await loadData(radar => isDevelopment || !radar.draft)
  const sections = loadYaml('homepage.yml')

  return { props: { radars, sections, embedThumbnails: isDevelopment } }
}
