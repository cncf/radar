import loadData from '../loadData'
import Section from '../components/Section'
import ThumbnailsList from '../components/ThumbnailsList'

export default function Home({ radars, embedThumbnails }) {
  return <Section title="Draft Radars">
    <ThumbnailsList radars={radars} embedThumbnails={embedThumbnails}/>
  </Section>
}

export async function getStaticProps() {
  const isDevelopment = !!process.env.DEVELOPMENT
  const { radars } = await loadData(radar => radar.draft)

  return { props: { radars, embedThumbnails: isDevelopment } }
}
