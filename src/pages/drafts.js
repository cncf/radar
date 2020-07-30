import { Fragment } from 'react'
import loadData from '../loadData'
import Section from '../components/Section'
import ThumbnailsList from '../components/ThumbnailsList'

export default function Home({ radars, sections, embedThumbnails }) {
  return <Fragment>
    <Section title="Draft Radars">
      <ThumbnailsList radars={radars} embedThumbnails={embedThumbnails} />
    </Section>
  </Fragment>
}

export async function getStaticProps() {
  const radars = (await loadData()).radars.filter(radar => radar.draft)

  return { props: { radars, embedThumbnails: !!process.env.DEVELOPMENT } }
}
