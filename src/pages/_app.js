import 'bulma/css/bulma.css'
import { Fragment, useState } from 'react'
import Head from 'next/head';
import Link from 'next/link'
import Search from '../components/Search'
import SearchContext from '../contexts/SearchContext'

export default ({ Component, pageProps }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return <Fragment>
    <Head>
      <title>CNCF Radars</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <SearchContext.Provider value={searchQuery}>
      <nav className="navbar is-link" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/"><a className="navbar-item"><h1 className="title has-text-white">CNCF Radars</h1></a></Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <Search value={searchQuery} onSearch={setSearchQuery}/>
            <Link href="/overview"><a className="navbar-item">Overview</a></Link>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />
    </SearchContext.Provider>
  </Fragment>
}
