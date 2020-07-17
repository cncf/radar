import Link from 'next/link'
import { Fragment } from 'react'
import loadData from '../loadData'
import Section from '../components/Section'
import LevelTag from "../components/LevelTag";

export default function Home({ radars }) {
  return <Fragment>
    <style jsx>{`
      td {
        padding-right: 20px;
        padding-bottom: 20px;
      }
    `}</style>
    <Section>
      <h2>Published Radars</h2>
      <ul>
        { radars.map(({ key, name }) => <li key={key}><Link href="/[radar]" as={`/${key}`}><a>{name}</a></Link></li>) }
      </ul>
    </Section>

    <Section>
      <h2>Definitions</h2>

      <table>
        <tr>
          <td><LevelTag level="adopt" className="is-medium" /></td>
          <td>We can clearly recommend this technology. We have used it for long periods of time in many teams and it has proven to be stable and useful</td>
        </tr>

        <tr>
          <td><LevelTag level="trial" className="is-medium" /></td>
          <td>We have used it with success and recommend to have a closer look at the technology in this ring</td>
        </tr>

        <tr>
          <td><LevelTag level="assess" className="is-medium" /></td>
          <td>We have tried it out and we find it promising. We recommend having a look at these items when you face a
            specific need for the technology in your project.</td>
        </tr>
      </table>
    </Section>

    <Section>
      <h2>Methodology</h2>
      <h3>TODO: Explain how it was built</h3>
    </Section>

    <Section>
      <h2>FAQs</h2>
      <h3>TODO: Fill out FAQs</h3>
    </Section>
  </Fragment>
}

export async function getStaticProps() {
  const { radars } = await loadData()

  return { props: { radars } }
}
