import loadData from '../../loadData'
import Radar from '../../components/Radar'

const RadarImage = ({ radar, title }) => {
  return <>
    <div>
      <Radar points={radar.points} title={title} subtitle={radar.name} showHeader={true} />
    </div>
    <div>
      <Radar points={radar.points} />
    </div>
  </>
}

export async function getStaticProps ({ params }) {
  const subradarKey = params.radar
  const radarKey = subradarKey.split('--')[0]
  const { radars } = await loadData()
  const radar = radars.find(({ key }) => key === radarKey)
  const subradar = radar.subradars.find(({ key }) => key === subradarKey)
  return { props: { radar: subradar, title: radar.longName } }
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  const keys = radars.flatMap(radar => radar.subradars.flatMap(subradar => subradar.key))

  return {
    paths: keys.map(key => ({ params: { radar: key } })),
    fallback: false
  };
}

export default RadarImage
