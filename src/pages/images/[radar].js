import loadData from '../../loadData'
import Radar from '../../components/Radar'

const RadarImage = ({ radar }) => {
  return <Radar points={radar.points} name={radar.name} showHeader={true} />
}

export async function getStaticProps ({ params }) {
  const { radars } = await loadData()
  const radar = radars.find(({ key }) => key === params.radar)
  return { props: { radar } }
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  return {
    paths: radars.map(({ key }) => ({ params: { radar: key } })),
    fallback: false
  };
}

export default RadarImage
