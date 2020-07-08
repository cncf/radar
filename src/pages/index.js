import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import loadData from '../loadData'

export default function Home({ radars }) {
  return <Fragment>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <section className="section main">
      <div className="container">
        <h1 className="title">CNCF Radars</h1>
      </div>
    </section>

    <section className="section main">
      <div className="container">
        <h2 className="title is-4">Published Radars:</h2>
        { radars.map(({ id, key, name }) => <Link href="/[radar]" as={`/${key}`} key={id}><a>{name}</a></Link>) }
      </div>
    </section>

    <section className="section main">
      <div className="container">
        <h2 className="title is-4">Definitions</h2>
        <h3 className="subtitle is-5 is-italic">TODO: Add definitions for Adopt, Trial, Assess</h3>
      </div>
    </section>

    <section className="section main">
      <div className="container">
        <h2 className="title is-4">Methodology</h2>
        <h3 className="subtitle is-5 is-italic">TODO: Explain how it was built</h3>
      </div>
    </section>

    <section className="section main">
      <div className="container">
        <h2 className="title is-4">FAQs</h2>
        <h3 className="subtitle is-5 is-italic">TODO: Fill out FAQs</h3>
      </div>
    </section>
  </Fragment>
}

export async function getStaticProps() {
  const { radars } = await loadData()

  return { props: { radars } }
}
