import loadData from '../loadData'

const Radar = ({ name }) => {
  return <h1>{name}</h1>
}

export async function getStaticProps ({ params }) {
  const { radars } = loadData()
  const props = radars.find(radar => radar.id === params.slug)
  return { props } 
}

export async function getStaticPaths() {
  const { radars } = loadData()

  return {
    paths: radars.map(radar => ({ params: { slug: radar.id } })),
    fallback: false
  };
}

export default Radar
