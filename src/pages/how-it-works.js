import Section from '../components/Section'
import loadYaml from '../helpers/loadYaml'
import MarkdownComponent from '../components/MarkdownComponent'
import withTitle from '../components/withTitle'

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
        <MarkdownComponent value={content} className="page-section" />
      </Section>
    })}
  </>
}

export async function getStaticProps() {
  const sections = loadYaml('pages', 'how-it-works.yml')

  return { props: { sections } }
}

export default withTitle(HowItWorks, _ => 'How It Works')
