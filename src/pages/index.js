import Link from 'next/link'
import { Fragment } from 'react'
import loadData from '../loadData'
import Radar from '../components/Radar'
import Section from '../components/Section'
import LevelTag from '../components/LevelTag'
import loadYaml from '../helpers/loadYaml'
import MarkdownComponent from "../components/MarkdownComponent";

export default function Home({ radars, sections, development }) {
  return <Fragment>
    <style jsx>{`
      td {
        padding-right: 20px;
        padding-bottom: 20px;
      }
      
      .thumbnails {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 40px;
      }
      
      .thumbnail {
        width: 400px;
        text-align: center;
      }
    `}</style>
    <Section title="Published Radars">
      <div className="thumbnails">
        { radars.map(({ key, name, points }) => {
          return <div key={key} className="thumbnail">
            <Link href="/[radar]" as={`/${key}`}>
              <a>
                {development ? <Radar points={points} /> : <img src={`${key}.svg`} />}
                <h5>{name}</h5>
              </a>
            </Link>
          </div>
        }) }
      </div>
    </Section>

    <Section title="Definitions">
      <table>
        <tbody>
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
        </tbody>
      </table>
    </Section>

    { sections.map(({ title, content }) => {
      return <Section title={title} key={title}>
        <MarkdownComponent value={content} />
      </Section>
    })}
  </Fragment>
}

export async function getStaticProps() {
  const { radars } = await loadData()
  const sections = loadYaml('homepage.yml')

  return { props: { radars, development: !!process.env.DEVELOPMENT, sections } }
}
