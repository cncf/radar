import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Radar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Radar Homepage</h1>
      </main>
    </div>
  )
}
