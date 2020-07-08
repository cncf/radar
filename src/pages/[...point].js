import loadData from '../loadData'
import OutboundLink from '../components/OutboundLink'
import Link from "next/link";

const Point = point => {
  return <section className="section">
    <div className="container">
      <h2 className="title is-4">{point.name}</h2>
      {point.description && <div>Description: {point.description}</div>}
      {point.repo && <div>Repo: <OutboundLink href={`https://github.com/${point.repo}`}/></div>}
      {point.twitter && <div>Twitter: <OutboundLink href={point.twitter}/></div>}
      {point.homepage && <div>Homepage: <OutboundLink href={point.homepage}/></div>}

      <h5 className="mb-2 mt-5 title is-5">Votes</h5>
      <div>Adopt: {point.votes.adopt || 0}</div>
      <div>Trial: {point.votes.trial || 0}</div>
      <div>Assess: {point.votes.assess || 0}</div>
      <div className="mt-5">
        <Link href="/[radar]" as={`/${point.radarKey}`}><a>Back to Radar</a></Link>
      </div>
    </div>
  </section>
}

export async function getStaticProps ({ params }) {
  const { radars } = await loadData()
  const [radarKey, pointKey] = params.point
  const radar = radars.find(({ key }) => key === radarKey)
  const props = Object.values(radar.points).flat().find(({ key }) => key === pointKey)
  return { props }
}

export async function getStaticPaths() {
  const { radars } = await loadData()

  return {
    paths: radars.flatMap(({ key, points }) => {
      // TODO: radar structure seems quite painful to deal with
      return Object.values(points).flat().map(point => ({ params: { point: [key, point.key] }}))
    }),
    fallback: false
  };
}

export default Point
