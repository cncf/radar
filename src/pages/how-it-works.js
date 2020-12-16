import Section from '../components/Section'
import withTitle from '../components/withTitle'
import loadYaml from '../helpers/loadYaml'
import PageSchema from '../schemas/PageSchema'

const HowItWorks = ({ sections }) => {
  return <>
    <style jsx global>{`
      .page-section dl {
        display: grid;
        grid-gap: 20px 15px;
        grid-template-columns: auto auto;
      }
    `}</style>

    { sections.map(({ title, content }) => {
      return <Section title={title} key={title}>
        <div className="page-section" dangerouslySetInnerHTML={{ __html: content }} />
      </Section>
    })}
  </>
}

export async function getStaticProps() {
  // TODO: see if we can make generic page
  const { data, valid } = await loadYaml('pages/how-it-works.yml', { schema: PageSchema })

  if (!valid) {
    throw 'Invalid page!!'
  }

  return { props: { sections: data } }
}

export default withTitle(HowItWorks, _ => 'How It Works')
