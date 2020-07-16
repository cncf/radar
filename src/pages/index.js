import Link from 'next/link'
import { Fragment } from 'react'
import loadData from '../loadData'
import Section from '../components/Section'

export default function Home({ radars }) {
  return <Fragment>
    <Section>
      <h2>Published Radars</h2>
      <ul>
        { radars.map(({ key, name }) => <li key={key}><Link href="/[radar]" as={`/${key}`}><a>{name}</a></Link></li>) }
      </ul>
    </Section>

    <Section>
      <h2>Definitions</h2>
      <h3>TODO: Add definitions for Adopt, Trial, Assess</h3>
    </Section>

    <Section>
      <h2 className="title is-4">Methodology</h2>
      <h3 className="subtitle is-5 is-italic">TODO: Explain how it was built</h3>
    </Section>

    <Section>
      <h2 className="title is-4">FAQs</h2>
      <h3 className="subtitle is-5 is-italic">TODO: Fill out FAQs</h3>
    </Section>
  </Fragment>
}

export async function getStaticProps() {
  const { radars } = await loadData()

  return { props: { radars } }
}
