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

    <div className="container is-fluid">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/"><a className="navbar-item"><h1 className="title">CNCF Radars</h1></a></Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <Link href="/overview"><a>Overview</a></Link>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <Component {...pageProps} />
  </Fragment>
}
