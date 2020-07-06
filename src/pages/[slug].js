import loadData from '../loadData'

const Radar = ({ name, points }) => {
  const length = Math.max(points.adopt.length, points.trial.length, points.assess.length)

  return <div>
    <h1 className="title">{name}</h1>

    <table className="table">
      <thead>
        <tr>
          <th><span className="tag adopt-bg">Adopt</span></th>
          <th><span className="tag trial-bg">Trial</span></th>
          <th><span className="tag assess-bg">Assess</span></th>
        </tr>
      </thead>

      <tbody>
        {
          [...Array(length).keys()].map(i => {
            return <tr key={`tr-${i}`}>
              {
                ['adopt', 'trial', 'assess'].map(level => {
                  const point = points[level][i]
                  return <td key={`td-${level}-${i}`}>{point && point.name}</td>
                })
              }
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
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
