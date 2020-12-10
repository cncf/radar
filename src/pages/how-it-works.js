import Section from '../components/Section'
import loadPage from '../helpers/loadPage'
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
        <div className="page-section" dangerouslySetInnerHTML={{ __html: content }} />
      </Section>
    })}
  </>
}

export async function getStaticProps() {
  const sections = await loadPage('pages', 'how-it-works.yml')

  return { props: { sections } }
}

export default withTitle(HowItWorks, _ => 'How It Works')
