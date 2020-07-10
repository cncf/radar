import 'bulma/css/bulma.css'
import { Fragment } from 'react'
import Head from 'next/head';
import Link from 'next/link'

export default ({ Component, pageProps }) => {
  return <Fragment>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <nav className="navbar is-link" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/"><a className="navbar-item"><h1 className="title has-text-white">CNCF Radars</h1></a></Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <Link href="/overview"><a className="navbar-item">Overview</a></Link>
        </div>
      </div>
    </nav>

    <Component {...pageProps} />
  </Fragment>
}
