import Head from 'next/head'
import Link from 'next/link'
import loadData from '../loadData'

export default function Home({ radars }) {
  return (
    <div>
      <Head>
        <title>Radar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Radar Homepage</h1>

        { 
          radars.map(({ id, name }) => {
            return <Link href="/[slug]" as={`/${id}`} key={id}><a>{name}</a></Link>
          })
        }
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const { radars } = await loadData()

  return { props: { radars } }
}
