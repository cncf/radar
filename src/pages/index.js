import Head from 'next/head'
import Link from 'next/link'
import loadData from '../loadData'

export default function Home({ radars }) {
  return (
    <div className="container">
      <Head>
        <title>Radar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Radar Homepage</h1>

        { 
          radars.map(radar => {
            return <Link href="/[slug]" as={`/${radar.id}`}><a>{radar.name}</a></Link>
          })
        }
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const { radars } = loadData()

  return { props: { radars } }
}
