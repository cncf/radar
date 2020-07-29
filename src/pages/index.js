import Link from 'next/link'
import { Fragment } from 'react'
import loadData from '../loadData'
import Radar from '../components/Radar'
import Section from '../components/Section'
import loadYaml from '../helpers/loadYaml'
import MarkdownComponent from '../components/MarkdownComponent'

export default function Home({ radars, sections, development }) {
  return <Fragment>
    <style jsx global>{`
      .homepage-section dl {
        display: grid;
        grid-gap: 20px 15px;
        grid-template-columns: auto auto;
      }
    `}</style>

    <style jsx>{`
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
    `}
    </style>

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

    { sections.map(({ title, content }) => {
      return <Section title={title} key={title}>
        <MarkdownComponent value={content} className="homepage-section" />
      </Section>
    })}
  </Fragment>
}

export async function getStaticProps() {
  const { radars } = await loadData()
  const sections = loadYaml('homepage.yml')

  return { props: { radars, development: !!process.env.DEVELOPMENT, sections } }
}
